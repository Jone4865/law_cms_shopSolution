import { gql } from '@apollo/client';

export const FIND_MANY_PRODUCT_CATEGORY = gql`
  query findManyProductCategory($parentId: String) {
    findManyProductCategory(parentId: $parentId) {
      productCategories {
        id
        name
        isVisible
        createdAt
        children {
          id
          name
          isVisible
          createdAt
        }
      }
    }
  }
`;
