import { gql } from '@apollo/client';

export const UPDATE_PRODUCT_OPTION = gql`
  mutation updateProductOption(
    $updateProductOptionId: String!
    $name: String!
    $extraPrice: Int
    $finalPrice: Int
    $stock: Int
  ) {
    updateProductOption(
      id: $updateProductOptionId
      name: $name
      extraPrice: $extraPrice
      finalPrice: $finalPrice
      stock: $stock
    )
  }
`;
