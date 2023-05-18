import { gql } from '@apollo/client';

export const FIND_MANY_PRODUCT_BY_ADMIN = gql`
  query findManyProductByAdmin(
    $take: Int!
    $skip: Int!
    $searchText: String
    $productCategoryId: String
    $isVisible: Boolean
  ) {
    findManyProductByAdmin(
      take: $take
      skip: $skip
      searchText: $searchText
      productCategoryId: $productCategoryId
      isVisible: $isVisible
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
