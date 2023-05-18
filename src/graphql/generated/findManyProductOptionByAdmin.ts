/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findManyProductOptionByAdmin
// ====================================================

export interface findManyProductOptionByAdmin_findManyProductOptionByAdmin_productOptions_product {
  /**
   * ID
   */
  id: string;
  /**
   * 상품 코드
   */
  code: number;
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
}

export interface findManyProductOptionByAdmin_findManyProductOptionByAdmin_productOptions_parents {
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

export interface findManyProductOptionByAdmin_findManyProductOptionByAdmin_productOptions {
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
   * 상품
   */
  product: findManyProductOptionByAdmin_findManyProductOptionByAdmin_productOptions_product;
  /**
   * 상위 상품 옵션
   */
  parents: findManyProductOptionByAdmin_findManyProductOptionByAdmin_productOptions_parents[];
}

export interface findManyProductOptionByAdmin_findManyProductOptionByAdmin {
  /**
   * 총 개수
   */
  totalCount: number;
  /**
   * 상품 옵션 목록
   */
  productOptions: findManyProductOptionByAdmin_findManyProductOptionByAdmin_productOptions[];
}

export interface findManyProductOptionByAdmin {
  /**
   * 상품 일괄 조회 (관리자)
   */
  findManyProductOptionByAdmin: findManyProductOptionByAdmin_findManyProductOptionByAdmin;
}

export interface findManyProductOptionByAdminVariables {
  take: number;
  skip: number;
  searchText?: string | null;
  productCategoryId?: string | null;
  isVisible?: boolean | null;
  stock?: number | null;
}
