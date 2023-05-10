/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OptionsByCreateProductArgs, ProductTag } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: Mutation
// ====================================================

export interface Mutation_createProduct {
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
}

export interface Mutation {
  /**
   * 상품 생성 (관리자)
   */
  createProduct: Mutation_createProduct;
}

export interface MutationVariables {
  name: string;
  sellingPrice: number;
  salePrice: number;
  options: OptionsByCreateProductArgs[];
  productTags: ProductTag[];
  productCategoryId: string;
  hashTagNames: string[];
  pointRate: number;
}
