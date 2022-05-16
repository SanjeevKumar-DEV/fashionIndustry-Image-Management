import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      images {
        _id
        imageName
        imageURL
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      images {
        _id
        imageName
        imageURL
      }
    }
  }
`;

export const QUERY_IMAGE = gql`
  query Query {
    images {
      _id
      imageName
      imageURL
      createdAt
      colour {
        _id
        colourName
        colourCode
        colourDesc
      }
      style {
        _id
        styleName
        styleCode
        styleDesc
      }
    }
  }
`;

export const USER_UPLOADED_IMAGES = gql`
query Query($username: String!) {
  userImages(username: $username) {
    _id
    username
    email
    images {
      _id
      imageName
      imageURL
      createdAt
      style {
        _id
        styleName
        styleCode
        styleDesc
      }
      colour {
        _id
        colourName
        colourCode
        colourDesc
      }
    }
  }
}
`;

export const QUERY_STYLE_BY_STYLE_CODE = gql`
  query Query($styleCode: Int!) {
    getStyleCode(styleCode: $styleCode) {
      _id
    }
  }
`;

export const QUERY_COLOUR_BY_COLOUR_CODE = gql`
query Query($colourCode: Int!) {
  getColourCode(colourCode: $colourCode) {
    _id
  }
}
`;

export const QUERY_IMAGE_BY_IMAGE_NAME = gql`
query Query($imageName: String!) {
  getImage(imageName: $imageName) {
    _id
  }
}
`;