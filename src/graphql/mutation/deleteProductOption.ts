import { gql } from '@apollo/client';

export const DELETE_PRODUCT_OPTION = gql`
  mutation deleteProductOption($deleteProductOptionId: String!) {
    deleteProductOption(id: $deleteProductOptionId)
  }
`;
