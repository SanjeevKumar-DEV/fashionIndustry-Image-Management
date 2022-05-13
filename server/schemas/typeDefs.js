const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Style {
    _id: ID
    styleName: String
    styleCode: Int
    styleDesc: String
    colours: [Colour]!
  }

  type Colour {
    _id: ID
    colourName: String
    colourCode: Int
    colourDesc: String
  }

  type Image {
    _id: ID
    imageName: String
    imageURL: String
    createdAt: String
    style: Style
    colour: Colour
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
    styles: [Style]
    getStyleCode(styleCode: Int!): Style
    colours: [Colour]
    getColourCode(colourCode: Int!): Colour
    images: [Image]
    getImage(imageName: String!): Image
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    addColour(colourName: String!, colourCode: Int!, colourDesc: String!): Colour
    addColourWithColourCode(colourCode: Int!): Colour
    addColourWithColourCodeNotPresent(colourCode: Int!): Colour
    addStyle(styleCode: Int!, colours: [ID]!): Style
    addStyleWithStyleCode(styleName: String, styleCode: Int!, styleDesc: String, colours: [ID]!): Style
    addStyleWithStyleCodeIfNotPresent(styleCode: Int!, colours: [ID]!): Style
    addImage(imageName: String!, imageURL: String!, style: ID!, colour: ID!): Image
  }
`;

module.exports = typeDefs;
