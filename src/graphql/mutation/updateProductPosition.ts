import { gql } from '@apollo/client';

export const UPDATE_PRODUCT_POSITION = gql`
  mutation updateProductPosition(
    $updateProductPositionId: String!
    $position: Int!
  ) {
    updateProductPosition(id: $updateProductPositionId, position: $position)
  }
`;
