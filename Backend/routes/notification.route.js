import express from 'express';
import { runCronJobsManually } from '../cron.js';
import { connectSQL } from '../database/connectDB.js';
import { sendEmail, generateMissionEmailHTML } from '../utils/emailService.js';

const router = express.Router();

// Route to manually trigger all notification cron jobs
router.post('/run-all', async (req, res) => {
  try {
    await runCronJobsManually();
    res.status(200).json({
      success: true,
      message: 'Notification jobs triggered successfully'
    });
  } catch (error) {
    console.error('Error triggering notification jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to trigger notification jobs',
      error: error.message
    });
  }
});

// Route to test email for a specific mission
router.post('/test-email/:missionId', async (req, res) => {
  const { missionId } = req.params;
  const { emailType } = req.body; // 'before' or 'after'
  
  if (!missionId || !emailType || (emailType !== 'before' && emailType !== 'after')) {
    return res.status(400).json({
      success: false,
      message: 'Missing or invalid parameters. Required: missionId and emailType (before/after)'
    });
  }
  
  const pool = await connectSQL();
  const connect = await pool.getConnection();
  
  try {
    // Get mission details with cadre information
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
      WHERE m.mission_id = ?
    `;
    
    const [missions] = await connect.execute(query, [missionId]);
    
    if (missions.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Mission with ID ${missionId} not found`
      });
    }
    
    const mission = missions[0];
    
    if (!mission.cadre_email) {
      return res.status(400).json({
        success: false,
        message: `No email found for cadre: ${mission.cadre_prenom} ${mission.cadre_nom}`
      });
    }
    
    // Generate and send test email
    const emailHTML = generateMissionEmailHTML(mission, emailType);
    const subject = emailType === 'before' 
      ? `TEST - Rappel: Mission prévue pour demain - ${mission.Destination}`
      : `TEST - Action requise: Clôturer votre mission - ${mission.Destination}`;
    
    await sendEmail({
      to: mission.cadre_email,
      subject,
      text: `Ceci est un email de test pour la mission ${missionId}.`,
      html: emailHTML
    });
    
    res.status(200).json({
      success: true,
      message: `Test email sent to ${mission.cadre_email}`,
      emailType,
      missionId
    });
    
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message
    });
  } finally {
    connect.release();
  }
});

export default router;
