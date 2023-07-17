// Créer une requête GraphQL

import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment($data: CommentInput!) {
    createComment(data: $data) {
      comment
      createdAt
      createdBy {
        email
      }
    }
  }
`;
