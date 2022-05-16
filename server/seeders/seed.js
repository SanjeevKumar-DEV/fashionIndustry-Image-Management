const db = require("../config/connection");
const { User, Colour, Style, Image } = require("../models");
const userSeeds = require("./userSeeds.json");
const colourSeeds = require("./colourSeeds.json");
const styleSeeds = require("./styleSeeds.json");
const imageSeeds = require("./imageSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Image.deleteMany({});
    await Colour.deleteMany({});
    await Style.deleteMany({});

    await User.create(userSeeds);
    await Colour.create(colourSeeds);
    await Style.create(styleSeeds);
    await Image.create(imageSeeds);

    // for (let i = 0; i < thoughtSeeds.length; i++) {
    //   const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: thoughtAuthor },
    //     {
    //       $addToSet: {
    //         thoughts: _id,
    //       },
    //     }
    //   );
    // }

    // for (let i = 0; i < colourSeeds.length; i++) {
    //   const {_id } = await Colour.create(colourSeeds[i]);
    // }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
