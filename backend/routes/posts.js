import express from 'express';
import Post from '../models/post.js';
import multer from 'multer';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Multer config to save images in 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // folder to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // make filename unique
  }
});
const upload = multer({ storage });

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE new post with optional image
router.post('/', upload.single('image'), async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author || 'Admin',
    image: req.file ? req.file.filename : null
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE a post by id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Post.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE a post
router.put('/:id', upload.single('image'), async (req, res) => {
  const updateData = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  if (req.file) {
    updateData.image = req.file.filename;
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post('/', verifyToken, async (req, res) => { /* ... */ });
router.put('/:id', verifyToken, async (req, res) => { /* ... */ });
router.delete('/:id', verifyToken, async (req, res) => { /* ... */ });


export default router;
