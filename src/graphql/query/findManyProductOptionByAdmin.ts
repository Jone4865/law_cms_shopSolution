import { gql } from '@apollo/client';

export const FIND_MANY_PRODUCT_OPTION_BY_ADMIN = gql`
  query findManyProductOptionByAdmin(
    $take: Int!
    $skip: Int!
    $searchText: String
    $productCategoryId: String
    $isVisible: Boolean
    $stock: Int
  ) {
    findManyProductOptionByAdmin(
      take: $take
      skip: $skip
      searchText: $searchText
      productCategoryId: $productCategoryId
      isVisible: $isVisible
      stock: $stock
    ) {
      totalCount
      productOptions {
        id
        name
        extraPrice
        finalPrice
        stock
        createdAt
        product {
          id
          code
          isVisible
          name
          pointRate
          sellingPrice
          salePrice
        }
        parents {
          id
          name
          extraPrice
          finalPrice
          stock
          createdAt
        }
      }
    }
  }
`;
