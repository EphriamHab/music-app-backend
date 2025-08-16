import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  album: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  audioUrl: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

songSchema.index({ artist: 1 });
songSchema.index({ genre: 1 });
songSchema.index({ album: 1 });

export default mongoose.model('Song', songSchema);