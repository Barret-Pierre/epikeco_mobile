// Créer une requête GraphQL

import { gql } from "@apollo/client";

export const READ_USERS = gql`
  query ReadUsers {
    readUsers {
      id
      email
    }
  }
`;
