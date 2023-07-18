// Créer une requête GraphQL

import { gql } from "@apollo/client";

export const READ_POSTS = gql`
  query ReadPosts {
    readPosts {
      id
      comments {
        id
        createdBy {
          email
        }
        comment
      }
      createdBy {
        email
      }
      createdAt
      content
    }
  }
`;
