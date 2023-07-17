// Créer une requête GraphQL

import { gql } from "@apollo/client";

export const READ_COMMENTS = gql`
  query ReadComments {
    readComments {
      comment
      createdAt
      createdBy {
        email
      }
      id
      distanceInDays
    }
  }
`;
