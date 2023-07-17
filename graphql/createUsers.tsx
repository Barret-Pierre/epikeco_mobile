// Créer une requête GraphQL

import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      email
      id
      password
    }
  }
`;
