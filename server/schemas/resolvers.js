const { AuthenticationError } = require("apollo-server-express");
const { User, Thought, Colour, Style, Image } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("thoughts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("thoughts");
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    userImages: async (parent, { username }) => {
      const params = username ? { username } : {};
      return User.find(params).sort({ createdAt: -1 });
    },
    //userImages
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("thoughts");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    styles: async () => {
      return Style.find().populate("colours");
    },
    getStyleCode: async (parent, { styleCode }) => {
      return Style.findOne({ styleCode }).populate("colours");
    },
    colours: async () => {
      return Colour.find();
    },
    getColourCode: async (parent, { colourCode }) => {
      return Colour.findOne({ colourCode });
    },
    images: async () => {
      return Image.find().populate("style").populate("colour").populate({
        path: "style",
        populate: "colours",
      });
    },
    getImage: async (parent, { imageName }) => {
      return Image.findOne({ imageName });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //addImageAgainstUser
    addImageAgainstUser: async (parent, { imageId }, context) => {
      if (context.user) {
        // const thought = await Thought.create({
        //   thoughtText,
        //   thoughtAuthor: context.user.username,
        // });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { images: imageId } },
          {
            new: true,
            runValidators: true,
          }
        );

        // return thought;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { thoughtId, commentText }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeComment: async (parent, { thoughtId, commentId }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addColour: async (parent, { colourName, colourCode, colourDesc }) => {
      const colour = await Colour.create({
        colourName,
        colourCode,
        colourDesc,
      });
      return colour;
    },
    addColourWithColourCode: async (parent, { colourCode }) => {
      const colour = await Colour.create({
        colourCode,
      });
      return colour;
    },
    addColourWithColourCodeNotPresent: async (parent, { colourCode }) => {
      const data = await Colour.findOne({ colourCode });
      if (data !== null) {
        return await Colour.findOne({ colourCode });
      } else {
        const colour = await Colour.create({
          colourCode,
        });
        return colour;
      }
    },
    addStyle: async (parent, { styleName, styleCode, styleDesc, colours }) => {
      const style = await Style.create({
        styleName,
        styleCode,
        styleDesc,
        colours,
      });
      return await style.populate("colours");
    },
    addStyleWithStyleCode: async (parent, { styleCode, colours }) => {
      const style = await Style.create({
        styleCode,
        colours,
      });
      return await style.populate("colours");
    },
    addStyleWithStyleCodeIfNotPresent: async (
      parent,
      { styleCode, colours }
    ) => {
      
      const dataWithStyle = await Style.findOne({ styleCode }).populate(
        "colours"
      );

      let colourExists = false;
      if (dataWithStyle) {
        colourExists = !!dataWithStyle.colours.find((colour) => {
          return colours[0] == colour._id;
        });
      }

      if (colourExists) {
        console.log("colour exists!");
        return dataWithStyle;
      }

      if (dataWithStyle !== null) {
        console.log("data with style != null");
        var conditions = {
          styleCode: styleCode,
        };

        var update = {
          $addToSet: { colours: colours[0] },
        };

        return await Style.findOneAndUpdate(conditions, update);
      } else {
        console.log("creating style document");
        const style = await Style.create({
          styleCode,
          colours,
        });
        return await style.populate("colours");
      }
    },
    addImage: async (parent, { imageName, imageURL, style, colour }) => {
      const data = await Image.findOne({ imageName });
      if ( data !== null) {
        return data;
      }
      const { _id } = await Image.create({
        imageName,
        imageURL,
        style,
        colour,
      });
      return Image.findOne({ _id: _id })
        .populate("style")
        .populate("colour")
        .populate({
          path: "style",
          populate: "colours",
        });
    },
    //update an image for a style
    //delete and image for a style
    //view an image for style
    //styleCode_colourCode_imageType_number
  },
};

module.exports = resolvers;
