import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, message, subject } = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const fullName = `${firstName} ${lastName}`;

    const mailOptions = {
      from: `"${fullName}" <${email}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Contact Request - ${subject}`,
      text: `
Subject: ${subject}
From: ${fullName}
Email: ${email}
Phone: ${phone || 'N/A'}

Message:
${message}
      `,
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
    return NextResponse.json({ message: '❌ Failed to send email' }, { status: 500 });
  }
}
