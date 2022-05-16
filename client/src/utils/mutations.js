// test
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// export const ADD_THOUGHT = gql`
//   mutation addThought($thoughtText: String!) {
//     addThought(thoughtText: $thoughtText) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//       }
//     }
//   }
// `;

// export const ADD_COMMENT = gql`
//   mutation addComment($thoughtId: ID!, $commentText: String!) {
//     addComment(thoughtId: $thoughtId, commentText: $commentText) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         createdAt
//       }
//     }
//   }
// `;
export const ADD_COLOUR_WITH_CODE = gql`
mutation Mutation($colourCode: Int!) {
  addColourWithColourCode(colourCode: $colourCode) {
    _id
    colourName
    colourCode
    colourDesc
  }
}
`;

export const UPSERT_COLOUR_WITH_CODE = gql`
mutation Mutation($colourCode: Int!) {
  addColourWithColourCodeNotPresent(colourCode: $colourCode) {
    _id
    colourName
    colourCode
    colourDesc
  }
}
`;

export const ADD_STYLE_WITH_CODE = gql`

mutation Mutation($styleCode: Int!, $colours: [ID]!) {
  addStyleWithStyleCode(styleCode: $styleCode, colours: $colours) {
    _id
    styleName
    styleCode
    styleDesc
    colours {
      _id
      colourName
      colourCode
      colourDesc
    }
  }
}
`;
export const ADD_STYLE_CODE_COLOUR_IF_NOT_PRESENT = gql`
mutation Mutation($styleCode: Int!, $colours: [ID]!) {
  addStyleWithStyleCodeIfNotPresent(styleCode: $styleCode, colours: $colours) {
    _id
    styleName
    styleCode
    styleDesc
    colours {
      _id
      colourName
      colourCode
      colourDesc
    }
  }
}
`;

export const ADD_IMAGE = gql`
mutation Mutation($imageName: String!, $imageURL: String!, $style: ID!, $colour: ID!) {
  addImage(imageName: $imageName, imageURL: $imageURL, style: $style, colour: $colour) {
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
`;

export const ADD_IMAGE_AGAINST_USER = gql `
mutation Mutation($imageId: [ID]!) {
  addImageAgainstUser(imageId: $imageId) {
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
        styleCode
      }
      colour {
        _id
        colourCode
      }
    }
  }
}
`;

export const REMOVE_IMAGE = gql `
mutation Mutation($imageId: ID!) {
  removeImage(imageId: $imageId) {
    _id
    imageName
    imageURL
    createdAt
    style {
      _id
      styleName
    }
    colour {
      _id
      colourCode
    }
  }
}
`;

