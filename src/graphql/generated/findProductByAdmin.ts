/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductTag, FileKind } from "./graphql-global-types";

// ====================================================
// GraphQL query operation: findProductByAdmin
// ====================================================

export interface findProductByAdmin_findProductByAdmin_hashTags {
  /**
   * ID
   */
  id: string;
  /**
   * 상품명
   */
  name: string;
  /**
   * 생성일
   */
  createdAt: any;
}

export interface findProductByAdmin_findProductByAdmin_productCategories {
  /**
   * ID
   */
  id: string;
  /**
   * 카테고리명
   */
  name: string;
  /**
   * 노출 여부
   */
  isVisible: boolean;
  /**
   * 생성일
   */
  createdAt: any;
}

export interface findProductByAdmin_findProductByAdmin_productFiles {
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

export interface findProductByAdmin_findProductByAdmin {
  /**
   * ID
   */
  id: string;
  /**
   * 상품 코드
   */
  code: number;
  /**
   * 노출 순위
   */
  position: number;
  /**
   * 상품 태그
   */
  productTags: ProductTag[];
  /**
   * 노출 여부
   */
  isVisible: boolean;
  /**
   * 상품명
   */
  name: string;
  /**
   * 적립률
   */
  pointRate: number;
  /**
   * 판매가
   */
  sellingPrice: number;
  /**
   * 할인가
   */
  salePrice: number;
  /**
   * 생성일
   */
  createdAt: any;
  /**
   * 해시 태그
   */
  hashTags: findProductByAdmin_findProductByAdmin_hashTags[];
  /**
   * 상품 카테고리
   */
  productCategories: findProductByAdmin_findProductByAdmin_productCategories[];
  /**
   * 상품 파일
   */
  productFiles: findProductByAdmin_findProductByAdmin_productFiles[];
}

export interface findProductByAdmin {
  /**
   * 상품 상세 조회 (관리자)
   */
  findProductByAdmin: findProductByAdmin_findProductByAdmin;
}

export interface findProductByAdminVariables {
  findProductByAdminId: string;
}
