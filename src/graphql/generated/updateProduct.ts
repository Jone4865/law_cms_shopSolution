/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductTag } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateProduct
// ====================================================

export interface updateProduct {
  /**
   * 상품 수정 (관리자)
   */
  updateProduct: boolean;
}

export interface updateProductVariables {
  updateProductId: string;
  position: number;
  productTags: ProductTag[];
  isVisible: boolean;
  name: string;
  pointRate: number;
  sellingPrice: number;
  salePrice: number;
  hashTagNames: string[];
  productCategoryId: string;
}
