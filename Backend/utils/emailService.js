import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a transporter using nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
  port: process.env.EMAIL_PORT || 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send an email using nodemailer
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text email content
 * @param {string} options.html - HTML email content (optional)
 * @returns {Promise} - Resolves with info about the sent email or rejects with error
 */
export const sendEmail = async (options) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'mcinet@notification.com',
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

/**
 * Generate HTML content for mission reminder email
 * @param {Object} mission - Mission details
 * @param {string} type - Type of reminder ('before' or 'after')
 * @returns {string} - HTML content for the email
 */
export const generateMissionEmailHTML = (mission, type) => {
  const { mission_id, departure_date, Destination, Object_type, cadre_nom, cadre_prenom } = mission;
  
  // Format date for display
  const formattedDate = new Date(departure_date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (type === 'before') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #0056b3; color: white; padding: 10px 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
          .important { color: #d9534f; font-weight: bold; }
          .button { display: inline-block; background-color: #0056b3; color: white; padding: 10px 20px; 
                   text-decoration: none; border-radius: 4px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Rappel de Mission - Demain</h2>
          </div>
          <div class="content">
            <p>Bonjour ${cadre_prenom} ${cadre_nom},</p>
            <p>Nous vous rappelons que vous avez une mission prévue pour <strong>demain, ${formattedDate}</strong>.</p>
            
            <h3>Détails de la mission:</h3>
            <ul>
              <li><strong>Numéro de mission:</strong> ${mission_id}</li>
              <li><strong>Destination:</strong> ${Destination}</li>
              <li><strong>Objet:</strong> ${Object_type}</li>
              <li><strong>Date de départ:</strong> ${formattedDate}</li>
            </ul>
            
            <p class="important">Veuillez vous assurer que vous êtes prêt(e) pour cette mission.</p>
            
            <p>Pour plus de détails, veuillez vous connecter à votre compte sur la plateforme MCINET.</p>
            
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" class="button">Accéder à la plateforme</a>
          </div>
          <div class="footer">
            <p>Ce message est généré automatiquement. Merci de ne pas y répondre.</p>
            <p>© ${new Date().getFullYear()} Ministère de l'Industrie et du Commerce</p>
          </div>
        </div>
      </body>
      </html>
    `;
  } else if (type === 'after') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #d9534f; color: white; padding: 10px 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
          .important { color: #d9534f; font-weight: bold; }
          .button { display: inline-block; background-color: #d9534f; color: white; padding: 10px 20px; 
                   text-decoration: none; border-radius: 4px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Mission à Clôturer</h2>
          </div>
          <div class="content">
            <p>Bonjour ${cadre_prenom} ${cadre_nom},</p>
            <p>Votre mission du <strong>${formattedDate}</strong> est maintenant terminée.</p>
            
            <h3>Détails de la mission:</h3>
            <ul>
              <li><strong>Numéro de mission:</strong> ${mission_id}</li>
              <li><strong>Destination:</strong> ${Destination}</li>
              <li><strong>Objet:</strong> ${Object_type}</li>
              <li><strong>Date de départ:</strong> ${formattedDate}</li>
            </ul>
            
            <p class="important">Veuillez clôturer cette mission dès que possible en complétant le rapport de mission.</p>
            
            <p>Pour clôturer la mission, veuillez vous connecter à votre compte sur la plateforme MCINET.</p>
            
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/missions/${mission_id}" class="button">Clôturer la mission</a>
          </div>
          <div class="footer">
            <p>Ce message est généré automatiquement. Merci de ne pas y répondre.</p>
            <p>© ${new Date().getFullYear()} Ministère de l'Industrie et du Commerce</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  return '';
};
