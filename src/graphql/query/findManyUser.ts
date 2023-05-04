import { gql } from '@apollo/client';

export const FIND_MANY_USER = gql`
  query findManyUser($take: Int!, $cursorId: String, $userStatus: UserStatus) {
    findManyUser(take: $take, cursorId: $cursorId, userStatus: $userStatus) {
      totalCount
      users {
        connectionDate
        createdAt
        email
        id
        name
        phone
      }
    }
  }
`;
