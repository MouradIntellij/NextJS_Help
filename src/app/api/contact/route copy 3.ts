import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Champs manquants' },
        { status: 400 }
      );
    }

    // Création du transporteur SMTP avec Mailtrap
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Préparation du mail
    const mailOptions = {
      from: `"${name}" <${email}>`, // Expéditeur
      to: process.env.EMAIL_RECEIVER, // Destinataire
      subject: `Nouveau message de ${name} via le formulaire de contact`,
      text: message,
      html: `<p>${message}</p><p>Contact: ${email}</p>`,
    };

    // Envoi du mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur envoi mail:', error);
    return NextResponse.json(
      { error: 'Erreur serveur, échec de l\'envoi' },
      { status: 500 }
    );
  }
}
