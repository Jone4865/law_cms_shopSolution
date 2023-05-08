/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProductCategory
// ====================================================

export interface updateProductCategory {
  /**
   * 상품 카테고리 수정 (관리자)
   */
  updateProductCategory: boolean;
}

export interface updateProductCategoryVariables {
  updateProductCategoryId: string;
  name: string;
  isVisible: boolean;
}
