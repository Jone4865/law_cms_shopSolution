import { gql } from '@apollo/client';

export const DELETE_PRODUCT_FILE_BY_ADMIN = gql`
  mutation deleteProductFileByAdmin($deleteProductFileByAdminId: String!) {
    deleteProductFileByAdmin(id: $deleteProductFileByAdminId)
  }
`;
