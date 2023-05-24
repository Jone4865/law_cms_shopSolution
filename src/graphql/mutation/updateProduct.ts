import { gql } from '@apollo/client';

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $updateProductId: String!
    $position: Int!
    $productTags: [ProductTag!]!
    $isVisible: Boolean!
    $name: String!
    $pointRate: Float!
    $sellingPrice: Int!
    $salePrice: Int!
    $hashTagNames: [String!]!
    $productCategoryId: String!
  ) {
    updateProduct(
      id: $updateProductId
      position: $position
      productTags: $productTags
      isVisible: $isVisible
      name: $name
      pointRate: $pointRate
      sellingPrice: $sellingPrice
      salePrice: $salePrice
      hashTagNames: $hashTagNames
      productCategoryId: $productCategoryId
    )
  }
`;
