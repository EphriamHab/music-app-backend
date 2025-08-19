import asyncHandler from "express-async-handler";
import Song from "../models/Song.js";
import cloudinary from "../config/cloudinary.js";

const createSong = asyncHandler(async (req, res) => {
  const { title, artist, album, genre } = req.body;

  if (!title || !artist || !album || !genre) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  let audioUrl = null;

  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      folder: "mern-music-app/songs",
    });

    audioUrl = uploadResult.secure_url;
  }

  const song = await Song.create({
    title,
    artist,
    album,
    genre,
    audioUrl,
  });

  res.status(201).json(song);
});

const getSongs = asyncHandler(async (req, res) => {
  const { genre, artist, search, page = 1, limit = 12 } = req.query;
  let query = {};

  if (genre) {
    query.genre = { $regex: genre, $options: "i" };
  }
  if (artist) {
    query.artist = { $regex: artist, $options: "i" };
  }
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { artist: { $regex: search, $options: "i" } },
      { album: { $regex: search, $options: "i" } },
      { genre: { $regex: search, $options: "i" } },
    ];
  }
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const totalSongs = await Song.countDocuments(query);
  const totalPages = Math.ceil(totalSongs / limitNum);
  const songs = await Song.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  res.json({
    songs,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalSongs,
      limit: limitNum,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  });
});

const updateSong = asyncHandler(async (req, res) => {
  const { title, artist, album, genre } = req.body;

  const song = await Song.findById(req.params.id);

  if (!song) {
    res.status(404);
    throw new Error("Song not found");
  }

  let audioUrl = song.audioUrl;

  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      resource_type: "audio",
      folder: "mern-music-app/songs",
    });

    audioUrl = uploadResult.secure_url;
  }

  song.title = title || song.title;
  song.artist = artist || song.artist;
  song.album = album || song.album;
  song.genre = genre || song.genre;
  song.audioUrl = audioUrl;

  const updatedSong = await song.save();
  res.json(updatedSong);
});

const deleteSong = asyncHandler(async (req, res) => {
  const song = await Song.findById(req.params.id);

  if (!song) {
    res.status(404);
    throw new Error("Song not found");
  }

  await Song.deleteOne({ _id: song._id });
  res.json({ message: "Song deleted successfully" });
});

export { createSong, getSongs, getSong, updateSong, deleteSong };
