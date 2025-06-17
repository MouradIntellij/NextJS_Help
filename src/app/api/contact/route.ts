import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, email, phone, subject, message, token } = body;

  if (!token) {
    return NextResponse.json({ success: false, message: 'No reCAPTCHA token provided' }, { status: 400 });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await fetch(verificationUrl, { method: 'POST' });
    const data = await response.json();

    if (!data.success || data.score < 0.5) {
      return NextResponse.json({ success: false, message: 'Failed reCAPTCHA verification' }, { status: 400 });
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return NextResponse.json({ success: false, message: 'reCAPTCHA verification failed' }, { status: 500 });
  }

  // ✅ Transporteur SMTP avec typage
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER || "677200e2654607",
      pass: process.env.MAILTRAP_PASS || "7ce8bcbbeee257"
    }
  } as SMTPTransport.Options);

  try {
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER || 'no-reply@example.com'}>`,
      to: 'info@marcosrodrigues.ca',
      subject: `New Contact Form Submission - ${subject}`,
      html: `
        <h3>Contact Form</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, message: 'Email failed to send' }, { status: 500 });
  }
}
