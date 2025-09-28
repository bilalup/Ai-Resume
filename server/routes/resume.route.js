import express from 'express';
import { createResume, getResumes, downloadResume } from '../controllers/resume.controller.js';

const router = express.Router();

router.post('/create', createResume);
router.get('/', getResumes);
router.get('/download/:id', downloadResume);

export default router;
