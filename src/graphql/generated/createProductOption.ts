/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createProductOption
// ====================================================

export interface createProductOption {
  /**
   * 상품 옵션 생성 (관리자)
   */
  createProductOption: boolean;
}

export interface createProductOptionVariables {
  productId: string;
  name: string;
  parentId?: string | null;
  extraPrice?: number | null;
  finalPrice?: number | null;
  stock?: number | null;
}
