import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js'; // NEW
import authColleges from './routes/colleges.js';
import admissionRoutes from './routes/admissionrout.js';
import overviewRoutes from './routes/overviewrout.js';
import cutoffRoutes from './routes/cutoffrout.js';
import locationRoutes from './routes/locationrout.js';
import heroRoutes from './routes/herorout.js';
import feesRoutes from './routes/feesrout.js';
import rankingRoutes from './routes/rankingrout.js';
import seatmatrixRoutes from './routes/seatmatrixrout.js';
import placementRoutes from './routes/placementrout.js';
import reviewRoutes from './routes/reviewrout.js';
import Post from './models/post.js';
import College from './models/college.js';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/colleges', authColleges);
app.use('/api/admission', admissionRoutes);
app.use('/api/overview', overviewRoutes);
app.use('/api/cutoff', cutoffRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/fees', feesRoutes);
app.use('/api/ranking', rankingRoutes);
app.use('/api/seatmatrix', seatmatrixRoutes);
app.use('/api/placement', placementRoutes);
app.use('/api/review', reviewRoutes);

app.get('/', (req, res) => res.send('API running'));

// Optional: /blogs route for frontend fetching
app.get('/blogs', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this route to fetch a single blog by id (not slug)
app.get('/blogs/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Server start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
