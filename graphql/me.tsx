// Créer une requête GraphQL

import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      email
      id
    }
  }
`;
