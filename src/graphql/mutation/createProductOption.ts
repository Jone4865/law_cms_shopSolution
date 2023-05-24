import { gql } from '@apollo/client';

export const CREATE_PRODUCT_OPTION = gql`
  mutation createProductOption(
    $productId: String!
    $name: String!
    $parentId: String
    $extraPrice: Int
    $finalPrice: Int
    $stock: Int
  ) {
    createProductOption(
      productId: $productId
      name: $name
      parentId: $parentId
      extraPrice: $extraPrice
      finalPrice: $finalPrice
      stock: $stock
    )
  }
`;
