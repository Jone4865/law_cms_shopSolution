/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileKind } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: createProductFileByAdmin
// ====================================================

export interface createProductFileByAdmin_createProductFileByAdmin {
  /**
   * ID
   */
  id: string;
  /**
   * 파일 종류
   */
  kind: FileKind;
  /**
   * 파일명
   */
  name: string;
  /**
   * 생성일
   */
  createdAt: any;
}

export interface createProductFileByAdmin {
  /**
   * 상품 파일 생성 (관리자)
   */
  createProductFileByAdmin: createProductFileByAdmin_createProductFileByAdmin;
}

export interface createProductFileByAdminVariables {
  productId: string;
  file: any;
}
