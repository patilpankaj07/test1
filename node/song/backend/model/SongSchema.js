const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  Songname: String,
  Film: String,
  Music_director: String,
  singer: String,
  Actor: String,
  Actress: String,
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
