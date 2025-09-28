import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import pdf from 'html-pdf';
import Resume from '../models/Resume.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Get user ID from JWT token
const getUserIdFromToken = (req) => {
  const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
  if (!token) throw new Error('Authentication token missing');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

// Create resume
export const createResume = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { title, name, experience, skills, education } = req.body;

    if (!title || !name) {
      return res.status(400).json({ message: "Title and name are required" });
    }

    const templatePath = path.join(process.cwd(), 'templates', 'resume.ejs');
    if (!fs.existsSync(templatePath)) {
      return res.status(500).json({ message: "Template not found at " + templatePath });
    }

    const html = await ejs.renderFile(templatePath, { title, name, experience, skills, education });

    const pdfDir = path.join(process.cwd(), 'resumes');
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

    const pdfPath = path.join(pdfDir, `${Date.now()}-${name}.pdf`);

    pdf.create(html, { format: 'A4' }).toFile(pdfPath, async (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      const newResume = new Resume({
        user: userId,
        title,
        content: result.filename
      });

      await newResume.save();
      await User.findByIdAndUpdate(userId, { $push: { resumes: newResume._id } });

      res.status(201).json({ message: "Resume created", resume: newResume, pdfPath: result.filename });
    });

  } catch (err) {
    console.error(err);
    if (err.name === 'JsonWebTokenError') return res.status(401).json({ message: 'Invalid token' });
    res.status(500).json({ message: err.message });
  }
};

// Get all resumes for user
export const getResumes = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const resumes = await Resume.find({ user: userId });
    res.status(200).json(resumes);
  } catch (err) {
    console.error(err);
    if (err.name === 'JsonWebTokenError') return res.status(401).json({ message: 'Invalid token' });
    res.status(500).json({ message: err.message });
  }
};

// Download PDF
export const downloadResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    const filePath = resume.content;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${resume.title}.pdf"`);
    res.sendFile(filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
