
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const body = await request.json();
  const {
    fullName,
    email,
    phone,
    profession,
    professionOther,
    experience,
    goals,
    goalOther,
    description,
    format,
    availability,
    referral,
    comments,
    token,
  } = body;

  // Verifica se o token do reCAPTCHA foi enviado
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'No reCAPTCHA token provided' },
      { status: 400 }
    );
  }

  // Validação do token reCAPTCHA v2
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await fetch(verificationUrl, { method: 'POST' });
    const data = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { success: false, message: 'Failed reCAPTCHA verification' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return NextResponse.json(
      { success: false, message: 'reCAPTCHA verification failed' },
      { status: 500 }
    );
  }

  // Configura o Nodemailer
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '677200e2654607',
      pass: '7ce8bcbbeee257',
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Mentorship" <${process.env.EMAIL_USER}>`,
      to: 'info@marcosrodrigues.ca',
      subject: `New Mentorship Form Submission`,
      html: `
        <h3>Mentorship Form</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Profession:</strong> ${profession} ${
        profession === 'Other' ? `(${professionOther})` : ''
      }</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Goals:</strong> ${(goals || []).join(', ')} ${
        goalOther ? `, Other: ${goalOther}` : ''
      }</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Format:</strong> ${(format || []).join(', ')}</p>
        <p><strong>Availability:</strong> ${availability}</p>
        <p><strong>Referral:</strong> ${referral}</p>
        <p><strong>Comments:</strong> ${comments}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mentorship Email error:', error);
    return NextResponse.json(
      { success: false, message: 'Email failed to send' },
      { status: 500 }
    );
  }
}

