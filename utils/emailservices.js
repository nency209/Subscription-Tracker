import { EMAIL_PASSWORD,EMAIL } from "../config/env.js";
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service:"gmail",
  // true for 465, false for other ports
  auth: {
    user: EMAIL,
    pass:EMAIL_PASSWORD,
  },
});


export const sendEmail=async(useremail,username)=>
{
  const mailOptions={
    from:EMAIL,
    to: useremail,
    subject: 'Welcome back to Our App!',
    html: `<h2>Hello ${username},</h2><p>You have successfully signed in. If this wasn't you, please secure your account.</p>`,
  }

  try {
  await  transporter.sendMail(mailOptions);
  console.log('email sent successfully to:',useremail)
  
} catch (error) {
   console.log('email seending failed:',error.message)
  
}
}


export const sendSubscriptionEmail = async (email, name, price,startDate, frequency) => {
  const mailOptions = {
    from: EMAIL,
    to:email,
    subject: `Subscription Added: ${name}`,
    html: `
      <h2>Thanks for subscribing to ${name}</h2>
       <p>Price: ${price}</p>
      <p>Start Date: ${new Date(startDate).toDateString()}</p>
      <p>Frequency: ${frequency}</p>
      <p>We'll remind you before it expires!</p>
    `,
  };
  console.log(` <p>Start Date: ${new Date(startDate).toDateString()}</p>
      <p>Frequency: ${frequency}</p>`)

  await transporter.sendMail(mailOptions);
};

export const sendReminderEmail = async (email, name, expiryDate) => {
  const mailOptions = {
    from: EMAIL,
    to:email,
    subject: `⏰ Reminder: ${name} Subscription Expiring Soon`,
    html: `
      <h2>Your subscription for ${name} is expiring soon</h2>
      <p><b>Expiry Date:</b> ${new Date(expiryDate).toDateString()}</p>
      <p>Please renew before it ends to avoid interruption.</p>
      
    `,
  };

  await transporter.sendMail(mailOptions);
};
