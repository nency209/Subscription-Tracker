import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD, EMAIL } from './env.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

export default transporter;