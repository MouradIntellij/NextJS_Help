import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Vérification des champs du formulaire
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Tous les champs sont requis.' },
        { status: 400 }
      );
    }

    // Vérification des variables d'environnement nécessaires
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER;

    if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_RECEIVER) {
      console.error("Variables d'environnement EMAIL_USER, EMAIL_PASS ou EMAIL_RECEIVER manquantes");
      return NextResponse.json(
        { success: false, message: 'Erreur de configuration du serveur.' },
        { status: 500 }
      );
    }

    // Configuration de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_RECEIVER,
      subject: `Contact de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Votre message a bien été envoyé.' }
    );

  } catch (error: any) {
    console.error("Erreur serveur lors de l'envoi de l'email :", error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur : ' + error.message },
      { status: 500 }
    );
  }
}
