import express from 'express';
import { createSong, getSongs, getSong, updateSong, deleteSong } from '../controllers/songController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../utils/multerConfig.js';

const router = express.Router();

router.route('/')
  .get(getSongs)
  .post(protect, upload.single('audioFile'), createSong);

router.route('/:id')
  .get(getSong)
  .put(protect, upload.single('audioFile'), updateSong)
  .delete(protect, deleteSong);

export default router;