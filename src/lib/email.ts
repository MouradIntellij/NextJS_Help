import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST || "sandbox.smtp.mailtrap.io",
  port: parseInt(process.env.MAILTRAP_PORT || "2525"),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

// Test de connexion SMTP (optionnel)
transporter.verify((error) => {
  if (error) {
    console.error('Erreur SMTP:', error);
  } else {
    console.log('SMTP configuré avec succès');
  }
});