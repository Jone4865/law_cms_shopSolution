import { gql } from '@apollo/client';

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($deleteProductId: String!) {
    deleteProduct(id: $deleteProductId)
  }
`;
