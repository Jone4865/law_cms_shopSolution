import { gql } from '@apollo/client';

export const FIND_MANY_PRODUCT = gql`
  query findManyProduct(
    $take: Int!
    $productCategoryId: String
    $cursorId: String
  ) {
    findManyProduct(
      take: $take
      productCategoryId: $productCategoryId
      cursorId: $cursorId
    ) {
      totalCount
      products {
        id
        code
        position
        productTags
        isVisible
        name
        pointRate
        sellingPrice
        salePrice
        createdAt
        productOptions {
          id
          name
          extraPrice
          finalPrice
          stock
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
