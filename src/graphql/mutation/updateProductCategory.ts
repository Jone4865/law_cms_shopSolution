import { gql } from '@apollo/client';

export const UPDATE_PRODUCT_CATEGORY = gql`
  mutation updateProductCategory(
    $updateProductCategoryId: String!
    $name: String!
    $isVisible: Boolean!
  ) {
    updateProductCategory(
      id: $updateProductCategoryId
      name: $name
      isVisible: $isVisible
    )
  }
`;
