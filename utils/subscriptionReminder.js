import cron from 'node-cron';
import moment from 'moment';
import Subscription from '../models/subscription.js';
import { sendReminderEmail } from '../utils/emailService.js';

// Run every day at 9 AM
cron.schedule('0 9 * * *', async () => {
  console.log('🔍 Running subscription reminder job...');

  const today = moment().startOf('day');

  // Only fetch subscriptions that have already started
  const subscriptions = await Subscription.find({
    startDate: { $lte: today.toDate() },
  });

  for (const sub of subscriptions) {
    const { name, email, startDate, frequency } = sub;

    let expiryDate = moment(startDate);

    // Calculate next expiry
    if (frequency === 'monthly') {
      expiryDate.add(1, 'months');
    } else if (frequency === 'yearly') {
      expiryDate.add(1, 'years');
    }

    const daysLeft = expiryDate.diff(today, 'days');

    // Reminder logic: send if 14 or 7 days left
    if (daysLeft === 14 || daysLeft === 7 || daysLeft === 30) {
      await sendReminderEmail(email, name, expiryDate.toDate());
      console.log(`📩 Reminder sent to ${email} for ${name} (expiring in ${daysLeft} days)`);
    }
  }
});
