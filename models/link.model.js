import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
  insertedAt: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    required: true,
  },
});

const linkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: [clickSchema],
});

const Link = mongoose.model('Link', linkSchema);

export default Link;
