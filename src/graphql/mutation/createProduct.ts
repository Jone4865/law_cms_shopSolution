import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation Mutation(
    $name: String!
    $sellingPrice: Int!
    $salePrice: Int!
    $options: [OptionsByCreateProductArgs!]!
    $productTags: [ProductTag!]!
    $productCategoryId: String!
    $hashTagNames: [String!]!
    $pointRate: Float!
  ) {
    createProduct(
      name: $name
      sellingPrice: $sellingPrice
      salePrice: $salePrice
      options: $options
      productTags: $productTags
      productCategoryId: $productCategoryId
      hashTagNames: $hashTagNames
      pointRate: $pointRate
    ) {
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
    }
  }
`;
