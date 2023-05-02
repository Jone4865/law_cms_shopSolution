import { gql } from '@apollo/client';

export const SIGN_IN_BY_ADMIN = gql`
  query signInByAdmin($email: String!, $password: String!, $code: String!) {
    signInByAdmin(email: $email, password: $password, code: $code) {
      accessToken
      refreshToken
    }
  }
`;
