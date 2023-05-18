import { gql } from '@apollo/client';

export const FIND_PRODUCT_BY_ADMIN = gql`
  query findProductByAdmin($findProductByAdminId: String!) {
    findProductByAdmin(id: $findProductByAdminId) {
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
      hashTags {
        id
        name
        createdAt
      }
      productCategories {
        id
        name
        isVisible
        createdAt
      }
      productFiles {
        id
        kind
        name
        createdAt
      }
    }
  }
`;
