/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProductPosition
// ====================================================

export interface updateProductPosition {
  /**
   * 상품 순위 수정 (관리자)
   */
  updateProductPosition: boolean;
}

export interface updateProductPositionVariables {
  updateProductPositionId: string;
  position: number;
}
