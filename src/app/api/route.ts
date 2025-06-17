import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport'; // 👈 nécessaire pour le typage

// ✅ Transporteur configuré correctement
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER || "677200e2654607",
    pass: process.env.MAILTRAP_PASS || "7ce8bcbbeee257"
  }
} as SMTPTransport.Options); // 👈 forçage du bon type SMTP

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, subject, message, token } = body;

    // Validation simplifiée
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token reCAPTCHA manquant' },
        { status: 400 }
      );
    }

    // Vérification reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error('Clé reCAPTCHA manquante');
      return NextResponse.json(
        { success: false, message: 'Erreur de configuration serveur' },
        { status: 500 }
      );
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const response = await fetch(verificationUrl, { method: 'POST' });
    const data = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { success: false, message: 'Échec de la vérification reCAPTCHA' },
        { status: 400 }
      );
    }

    // Envoi d'email
    await transporter.sendMail({
      from: `"Website Contact" <${email}>`, // Utilisez l'email de l'expéditeur
      to: process.env.CONTACT_EMAIL || 'info@marcosrodrigues.ca',
      subject: `Nouveau message: ${subject}`,
      html: `
        <h3>Nouveau message de contact</h3>
        <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone || 'Non fourni'}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}