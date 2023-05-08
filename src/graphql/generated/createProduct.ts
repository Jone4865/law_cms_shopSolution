/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OptionsByCreateProductArgs, ProductTag } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: createProduct
// ====================================================

export interface createProduct_createProduct {
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
   * 재고량
   */
  stock: number | null;
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
}

export interface createProduct {
  /**
   * 상품 생성 (관리자)
   */
  createProduct: createProduct_createProduct;
}

export interface createProductVariables {
  name: string;
  sellingPrice: number;
  salePrice: number;
  options: OptionsByCreateProductArgs[];
  productTags: ProductTag[];
  productCategoryId: string;
  hashTagIds: string[];
  pointRate: number;
  stock?: number | null;
  brandId?: string | null;
}
