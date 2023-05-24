import { gql } from '@apollo/client';

export const FIND_MANY_PRODUCT_OPTION_BY_PRODUCT = gql`
  query findManyProductOptionByProduct($productId: String!) {
    findManyProductOptionByProduct(productId: $productId) {
      id
      name
      extraPrice
      finalPrice
      stock
      createdAt
      children {
        id
        name
        extraPrice
        finalPrice
        stock
        createdAt
      }
    }
  }
`;
