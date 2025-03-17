import { connectSQL } from '../database/connectDB.js';
import { sendEmail, generateMissionEmailHTML } from './emailService.js';

/**
 * Send notification emails for missions happening tomorrow
 * Reminds cadres about their upcoming missions
 */
export const sendUpcomingMissionNotifications = async () => {
  const pool = await connectSQL();
  const connect = await pool.getConnection();
  
  try {
    console.log('Running cron job: sendUpcomingMissionNotifications');
    
    // Get tomorrow's date in YYYY-MM-DD format
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
    
    // Query to get all missions scheduled for tomorrow with cadre email information
    const query = `
      SELECT 
        m.*,
        c.cadre_id,
        c.delegation,
        u.nom AS cadre_nom,
        u.prenom AS cadre_prenom,
        u.email AS cadre_email,
        g.grade_name,
        d.Destination,
        o.Object_type
      FROM mission m
      JOIN mission_cadre mc ON m.mission_id = mc.mission_id
      JOIN cadre c ON mc.cadre_id = c.cadre_id
      JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur
      JOIN grade g ON c.grade_id = g.grade_id
      JOIN Destination d ON m.Id_des = d.id_des
      JOIN Object o ON m.Id_object = o.Id_object
      WHERE DATE(m.departure_date) = ? AND m.status = 'En Cours'
    `;
    
    const [missions] = await connect.execute(query, [tomorrowFormatted]);
    
    console.log(`Found ${missions.length} missions scheduled for tomorrow (${tomorrowFormatted})`);
    
    // Send email notification for each mission
    for (const mission of missions) {
      if (!mission.cadre_email) {
        console.log(`No email found for cadre: ${mission.cadre_prenom} ${mission.cadre_nom} (ID: ${mission.cadre_id})`);
        continue;
      }
      
      try {
        const emailHTML = generateMissionEmailHTML(mission, 'before');
        
        await sendEmail({
          to: mission.cadre_email,
          subject: `Rappel: Mission prévue pour demain - ${mission.Destination}`,
          text: `Rappel: Vous avez une mission prévue pour demain à ${mission.Destination}. Objet: ${mission.Object_type}. Numéro de mission: ${mission.mission_id}.`,
          html: emailHTML
        });
        
        console.log(`Reminder email sent to ${mission.cadre_email} for mission ${mission.mission_id}`);
      } catch (emailError) {
        console.error(`Failed to send email to ${mission.cadre_email}:`, emailError);
      }
    }
    
  } catch (error) {
    console.error('Error in sendUpcomingMissionNotifications cron job:', error);
  } finally {
    connect.release();
  }
};

/**
 * Send notification emails for missions that ended yesterday
 * Reminds cadres to close their completed missions
 */
export const sendCompletedMissionNotifications = async () => {
  const pool = await connectSQL();
  const connect = await pool.getConnection();
  
  try {
    console.log('Running cron job: sendCompletedMissionNotifications');
    
    // Get yesterday's date in YYYY-MM-DD format
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayFormatted = yesterday.toISOString().split('T')[0];
    
    // Query to get all missions that should have ended yesterday
    // This includes missions where departure_date + duration_days = yesterday
    const query = `
      SELECT 
        m.*,
        c.cadre_id,
        c.delegation,
        u.nom AS cadre_nom,
        u.prenom AS cadre_prenom,
        u.email AS cadre_email,
        g.grade_name,
        d.Destination,
        o.Object_type
      FROM mission m
      JOIN mission_cadre mc ON m.mission_id = mc.mission_id
      JOIN cadre c ON mc.cadre_id = c.cadre_id
      JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur
      JOIN grade g ON c.grade_id = g.grade_id
      JOIN Destination d ON m.Id_des = d.id_des
      JOIN Object o ON m.Id_object = o.Id_object
      WHERE DATE_ADD(m.departure_date, INTERVAL m.duration_days DAY) = ? 
        AND m.status = 'En Cours'
    `;
    
    const [missions] = await connect.execute(query, [yesterdayFormatted]);
    
    console.log(`Found ${missions.length} missions that ended yesterday (${yesterdayFormatted})`);
    
    // Send email notification for each mission
    for (const mission of missions) {
      if (!mission.cadre_email) {
        console.log(`No email found for cadre: ${mission.cadre_prenom} ${mission.cadre_nom} (ID: ${mission.cadre_id})`);
        continue;
      }
      
      try {
        const emailHTML = generateMissionEmailHTML(mission, 'after');
        
        await sendEmail({
          to: mission.cadre_email,
          subject: `Action requise: Clôturer votre mission - ${mission.Destination}`,
          text: `Votre mission à ${mission.Destination} (Objet: ${mission.Object_type}, Numéro: ${mission.mission_id}) est maintenant terminée. Veuillez la clôturer en complétant le rapport de mission.`,
          html: emailHTML
        });
        
        console.log(`Completion email sent to ${mission.cadre_email} for mission ${mission.mission_id}`);
      } catch (emailError) {
        console.error(`Failed to send email to ${mission.cadre_email}:`, emailError);
      }
    }
    
  } catch (error) {
    console.error('Error in sendCompletedMissionNotifications cron job:', error);
  } finally {
    connect.release();
  }
};
