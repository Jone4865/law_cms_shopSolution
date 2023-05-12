import { gql } from '@apollo/client';

export const PRODUCT_IS_VISIBLE_TOGGLE = gql`
  mutation productIsVisibleToggle($productIsVisibleToggleId: String!) {
    productIsVisibleToggle(id: $productIsVisibleToggleId)
  }
`;
