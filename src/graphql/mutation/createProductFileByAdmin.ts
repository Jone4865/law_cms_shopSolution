import { gql } from '@apollo/client';

export const CREATE_PRODUCT_FILE_BY_ADMIN = gql`
  mutation createProductFileByAdmin($productId: ID!, $file: Upload!) {
    createProductFileByAdmin(productId: $productId, file: $file) {
      id
      kind
      name
      createdAt
    }
  }
`;
