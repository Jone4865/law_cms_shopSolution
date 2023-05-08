import { gql } from '@apollo/client';

export const DELETE_PRODUCT_CATEGORY = gql`
  mutation deleteProductCategory($deleteProductCategoryId: String!) {
    deleteProductCategory(id: $deleteProductCategoryId)
  }
`;
