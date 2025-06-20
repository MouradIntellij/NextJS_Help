import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, message, subject } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail', // ✅ Utiliser 'gmail' simplifie la config avec Gmail SMTP
      auth: {
        user: process.env.EMAIL_USER, // ✅ Ton adresse Gmail (dans .env.local)
        pass: process.env.EMAIL_PASS, // ✅ Mot de passe d'application généré (pas ton vrai mot de passe)
      },
    });

    const fullName = `${firstName} ${lastName}`;

    const mailOptions = {
      from: `"${fullName}" <${process.env.EMAIL_USER}>`, // ✅ Email authentifié (Gmail), pas celui de l'expéditeur
      to: process.env.EMAIL_RECEIVER,                   // ✅ Celui que tu veux recevoir (Gmail ou Hotmail ou autre)
      subject: `New Contact Request - ${subject}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <h4>Message:</h4>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: '✅ Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ message: '❌ Failed to send email', error }, { status: 500 });
  }
}
