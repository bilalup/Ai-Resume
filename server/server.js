import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
console.log("OPENAI API KEY:", process.env.OPENAI_API_KEY ? "Loaded" : "Missing");
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import resumeRoutes from './routes/resume.route.js';

const app = express();

app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
));
app.use(express.json());
app.use(cookieParser());

// check health
app.get('/', (req, res) => res.send('server is running!'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
