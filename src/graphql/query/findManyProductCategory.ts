import { gql } from '@apollo/client';

export const FIND_MANY_PRODUCT_CATEGORY = gql`
  query findManyProductCategory(
    $take: Int!
    $cursorId: String
    $parentId: String
  ) {
    findManyProductCategory(
      take: $take
      cursorId: $cursorId
      parentId: $parentId
    ) {
      totalCount
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
