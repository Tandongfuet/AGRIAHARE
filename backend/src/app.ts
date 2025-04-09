// ======= src/index.ts =======
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth';

dotenv.config();
const app = express();

app.use(cors({
  origin: ["http://localhost:8081","http://192.168.1.116:8081"],     // Your frontend origin
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(process.env.PORT || 9099, () => console.log('Server running'));
  })
  .catch(err => console.error('MongoDB connection error:', err));
