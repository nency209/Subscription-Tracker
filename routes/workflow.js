import express from 'express';
import { sendReminders } from '../controller/workflow.js';
const router = express.Router();
router.get('/reminders', sendReminders);
export default router;