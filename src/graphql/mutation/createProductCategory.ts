import { gql } from '@apollo/client';

export const CREATE_PRODUCT_CATEGORY = gql`
  mutation createProductCategory(
    $name: String!
    $isVisible: Boolean!
    $parentId: String
  ) {
    createProductCategory(
      name: $name
      isVisible: $isVisible
      parentId: $parentId
    )
  }
`;
