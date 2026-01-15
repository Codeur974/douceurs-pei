import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@patisserie.fr',
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error };
  }
}

export async function sendReservationConfirmation({
  to,
  nom,
  date,
  prestation,
}: {
  to: string;
  nom: string;
  date: string;
  prestation: string;
}) {
  const html = `
    <h1>Réservation confirmée</h1>
    <p>Bonjour ${nom},</p>
    <p>Votre réservation pour <strong>${prestation}</strong> le ${date} a bien été enregistrée.</p>
    <p>Nous vous contacterons sous 24h pour finaliser les détails.</p>
    <p>À bientôt,<br>L'équipe Pâtisserie à Domicile</p>
  `;
  
  return sendEmail({
    to,
    subject: 'Confirmation de réservation',
    html,
  });
}
