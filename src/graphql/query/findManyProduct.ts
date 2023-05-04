import { gql } from '@apollo/client';

export const FIND_MANY_PRODUCT = gql`
  query findManyProduct($take: Int!, $cursorId: String) {
    findManyProduct(take: $take, cursorId: $cursorId) {
      totalCount
      products {
        id
        code
        position
        isVisible
        name
        stock
        pointRate
        sellingPrice
        salePrice
        createdAt
        productOptions {
          id
          name
          stock
          pointRate
          createdAt
        }
        productFiles {
          id
          kind
          name
          createdAt
        }
      }
    }
  }
`;
