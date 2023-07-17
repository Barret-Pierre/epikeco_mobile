// Créer une requête GraphQL

import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation Signin($password: String!, $email: String!) {
    signin(password: $password, email: $email)
  }
`;
