import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  image: String,
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Post', PostSchema);
