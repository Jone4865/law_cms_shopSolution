/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findManyProductOption
// ====================================================

export interface findManyProductOption_findManyProductOption_productOptions_children {
  /**
   * ID
   */
  id: string;
  /**
   * 상품명
   */
  name: string;
  /**
   * 추가금
   */
  extraPrice: number | null;
  /**
   * 가격
   */
  finalPrice: number | null;
  /**
   * 재고량
   */
  stock: number | null;
  /**
   * 생성일
   */
  createdAt: any;
}

export interface findManyProductOption_findManyProductOption_productOptions {
  /**
   * ID
   */
  id: string;
  /**
   * 상품명
   */
  name: string;
  /**
   * 추가금
   */
  extraPrice: number | null;
  /**
   * 가격
   */
  finalPrice: number | null;
  /**
   * 재고량
   */
  stock: number | null;
  /**
   * 생성일
   */
  createdAt: any;
  /**
   * 하위 상품 옵션
   */
  children: findManyProductOption_findManyProductOption_productOptions_children[] | null;
}

export interface findManyProductOption_findManyProductOption {
  /**
   * 총 개수
   */
  totalCount: number;
  /**
   * 상품 옵션 목록
   */
  productOptions: findManyProductOption_findManyProductOption_productOptions[];
}

export interface findManyProductOption {
  /**
   * 상품 항목 목록 조회
   */
  findManyProductOption: findManyProductOption_findManyProductOption;
}

export interface findManyProductOptionVariables {
  take: number;
  productId: string;
}
