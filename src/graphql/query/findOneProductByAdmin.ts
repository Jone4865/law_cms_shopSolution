import { gql } from '@apollo/client';

export const FIND_ONE_PRODUCT_BY_ADMIN = gql`
  query findOneProductByAdmin($findOneProductByAdminId: String!) {
    findOneProductByAdmin(id: $findOneProductByAdminId) {
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
