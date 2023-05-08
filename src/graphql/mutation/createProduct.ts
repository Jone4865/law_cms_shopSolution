import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $sellingPrice: Int!
    $salePrice: Int!
    $options: [OptionsByCreateProductArgs!]!
    $productTags: [ProductTag!]!
    $productCategoryId: String!
    $hashTagIds: [String!]!
    $pointRate: Float!
    $stock: Int
    $brandId: String
  ) {
    createProduct(
      name: $name
      sellingPrice: $sellingPrice
      salePrice: $salePrice
      options: $options
      productTags: $productTags
      productCategoryId: $productCategoryId
      hashTagIds: $hashTagIds
      pointRate: $pointRate
      stock: $stock
      brandId: $brandId
    ) {
      id
      code
      position
      productTags
      isVisible
      name
      stock
      pointRate
      sellingPrice
      salePrice
      createdAt
    }
  }
`;
