import asyncHandler from 'express-async-handler';
import Song from '../models/Song.js';

const getStats = asyncHandler(async (req, res) => {
  const totalSongs = await Song.countDocuments();
  const totalArtists = (await Song.distinct('artist')).length;
  const totalAlbums = (await Song.distinct('album')).length;
  const totalGenres = (await Song.distinct('genre')).length;

  const songsPerGenre = await Song.aggregate([
    { $group: { _id: '$genre', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);

  const songsPerArtist = await Song.aggregate([
    {
      $group: {
        _id: '$artist',
        count: { $sum: 1 },
        albums: { $addToSet: '$album' }
      }
    },
    {
      $project: {
        _id: 1,
        count: 1,
        albumCount: { $size: '$albums' }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const songsPerAlbum = await Song.aggregate([
    { $group: { _id: '$album', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);

  res.json({
    totalSongs,
    totalArtists,
    totalAlbums,
    totalGenres,
    songsPerGenre,
    songsPerArtist,
    songsPerAlbum
  });
});

export { getStats };