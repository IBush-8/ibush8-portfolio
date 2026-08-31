import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

export async function notifyNewContact(contact) {
  if (!env.smtp.host || !env.smtp.user || !env.smtp.pass || !env.contactTo) {
    return { sent: false, reason: 'SMTP not configured' };
  }

  const transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: { user: env.smtp.user, pass: env.smtp.pass }
  });

  await transporter.sendMail({
    from: env.contactFrom || env.smtp.user,
    to: env.contactTo,
    replyTo: contact.email,
    subject: `IBush8 portfolio contact: ${contact.name}`,
    text: `Name: ${contact.name}\nEmail: ${contact.email}\n\n${contact.message}`
  });

  return { sent: true };
}
