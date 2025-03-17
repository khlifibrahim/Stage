import cron from 'node-cron';
import { sendUpcomingMissionNotifications, sendCompletedMissionNotifications } from './utils/cronScheduler.js';

/**
 * Initialize all cron jobs for the application
 */
export const initCronJobs = () => {
  console.log('Initializing cron jobs for mission notifications...');

  // Schedule the upcoming mission notifications to run every day at 9:00 AM
  // This will send emails for missions happening tomorrow
  cron.schedule('0 9 * * *', async () => {
    console.log('Running scheduled task: Upcoming mission notifications');
    await sendUpcomingMissionNotifications();
  });

  // Schedule the completed mission notifications to run every day at 9:00 AM
  // This will send emails for missions that ended yesterday
  cron.schedule('0 9 * * *', async () => {
    console.log('Running scheduled task: Completed mission notifications');
    await sendCompletedMissionNotifications();
  });

  console.log('Cron jobs initialized successfully');
};

// Function to manually trigger the cron jobs for testing
export const runCronJobsManually = async () => {
  console.log('Manually triggering cron jobs...');
  
  try {
    await sendUpcomingMissionNotifications();
    await sendCompletedMissionNotifications();
    console.log('Manual cron job execution completed');
  } catch (error) {
    console.error('Error running cron jobs manually:', error);
  }
};
