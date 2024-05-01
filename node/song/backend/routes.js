
const router = require("express").Router();

const Song = require("./model/SongSchema.js");

router.get("/Pran", async (req, res) => {
  try {
    res.status(200).json({ msg: "From Pranav" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server ERROR in Pran" });
  }
});

// Songname,Film,Music_director,singer,Actor,Actress

router.post("/insert", async (req, res) => {
  try {
    const { Songname, Film, Music_director, singer } = req.body;

    console.log(req.body);

    const data = await Song.create({
      Songname,
      Film,
      Music_director,
      singer,
    });

    //   await data.save();

    res.status(200).json({ msg: "Song Added successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server ERROR in insert" });
  }
});

// Display total count and list all documents
router.get("/list", async (req, res) => {
  try {
    // const count = await StudentMarks.countDocuments();
    const songs = await Song.find();

    // console.log(count, students);

    res.status(200).json({ songs });
  } catch (err) {
    res.status(500).send("Error listing documents in list");
  }
});

//   List specified Music Director songs

router.get("/specific/:dir", async (req, res) => {
  try {
    const { dir: director } = req.params;

    const songs = await Song.find({ Music_director: director });
    // console.log(songs);

    res.status(200).json({ songs });
  } catch (err) {
    res.status(500).send("Error listing documents in list");
  }
});

//   List specified Music Director songs sung by specified Singer
router.post("/dirandsong", async (req, res) => {
  try {
    const songs = await Song.find({
      Music_director: req.body.dirname,
      singer: req.body.singerName,
    });
    console.log(songs)

    res.status(200).json({songs});
  } catch (err) {
    console.log(err);
    res.status(500).send("Error listing documents in list");
  }
});

// Delete a song
router.delete("/delete/:Songname", async (req, res) => {
  try {
    const { Songname } = req.params;
    console.log(Songname);

    await Song.deleteMany({ Songname });
    res.send("Song deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//   Add newsong whichis your favourite

router.post("/add-favourite", async (req, res) => {
  try {
    const { Songname, Film, Music_director, singer } = req.body;

    console.log(req.body);

    const data = await Song.create({
      Songname,
      Film,
      Music_director,
      singer,
    });

    //   await data.save();

    res.status(200).json({ msg: "Song Added successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server ERROR in insert" });
  }
});

//   List Songs sung by Specified Singer from specified film
router.get("/getsong/:singer", async (req, res) => {
  try {
    const { singer } = req.params;

    const { flim } = req.query;

    // console.log(singer,flim);

    const songs = await Song.find({
      singer: singer,
      Film: flim,
    });
    // console.log(songs);

    if (songs.length == 0) {
      return res.status(404).json({ msg: "song not found" });
    } else {
      res.status(200).json({ songs });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error listing documents in list");
  }
});

router.patch('/update/:Songname', async (req, res) => {
    
    try {
    const {Songname}=req.params;
    const {actorname, actressname}=req.body;
      await Song.updateOne({Songname},{Actor:actorname,Actress:actressname});

      res.status(200).json({ msg:"song updated successfully"});
    } catch (err) {
      res.status(500).send(err.message);
    }
  });


  module.exports = router;
