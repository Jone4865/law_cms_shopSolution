/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProductOption
// ====================================================

export interface updateProductOption {
  /**
   * 상품 옵션 수정 (관리자)
   */
  updateProductOption: boolean;
}

export interface updateProductOptionVariables {
  updateProductOptionId: string;
  name: string;
  extraPrice?: number | null;
  finalPrice?: number | null;
  stock?: number | null;
}
