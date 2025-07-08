import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  image: String,
  category: String,
  tags: String,
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Post', PostSchema);
