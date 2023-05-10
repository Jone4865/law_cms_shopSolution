/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductTag, FileKind } from "./graphql-global-types";

// ====================================================
// GraphQL query operation: findManyProduct
// ====================================================

export interface findManyProduct_findManyProduct_products_productOptions {
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

export interface findManyProduct_findManyProduct_products_productFiles {
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

export interface findManyProduct_findManyProduct_products {
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
   * 상품 옵션
   */
  productOptions: findManyProduct_findManyProduct_products_productOptions[];
  /**
   * 상품 파일
   */
  productFiles: findManyProduct_findManyProduct_products_productFiles[];
}

export interface findManyProduct_findManyProduct {
  /**
   * 총 개수
   */
  totalCount: number;
  /**
   * 상품 목록
   */
  products: findManyProduct_findManyProduct_products[];
}

export interface findManyProduct {
  /**
   * 상품 목록 조회
   */
  findManyProduct: findManyProduct_findManyProduct;
}

export interface findManyProductVariables {
  take: number;
  productCategoryId?: string | null;
  cursorId?: string | null;
}
