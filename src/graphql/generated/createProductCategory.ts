/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createProductCategory
// ====================================================

export interface createProductCategory {
  /**
   * 상품 카테고리 생성 (관리자)
   */
  createProductCategory: boolean;
}

export interface createProductCategoryVariables {
  name: string;
  isVisible: boolean;
  parentId?: string | null;
}
