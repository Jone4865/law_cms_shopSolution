/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findManyProductOptionByProduct
// ====================================================

export interface findManyProductOptionByProduct_findManyProductOptionByProduct_children {
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

export interface findManyProductOptionByProduct_findManyProductOptionByProduct {
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
  children: findManyProductOptionByProduct_findManyProductOptionByProduct_children[] | null;
}

export interface findManyProductOptionByProduct {
  /**
   * 상품별 옵션 목록 조회 (관리자)
   */
  findManyProductOptionByProduct: findManyProductOptionByProduct_findManyProductOptionByProduct[];
}

export interface findManyProductOptionByProductVariables {
  productId: string;
}
