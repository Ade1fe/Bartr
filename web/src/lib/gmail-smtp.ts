import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export async function sendViaGmail({ to, subject, html }: SendEmailParams) {
  return transporter.sendMail({
    from: `"Swapwell" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
}