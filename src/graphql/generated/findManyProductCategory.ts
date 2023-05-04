/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findManyProductCategory
// ====================================================

export interface findManyProductCategory_findManyProductCategory_productCategories_children {
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

export interface findManyProductCategory_findManyProductCategory_productCategories {
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
  /**
   * 상품 카테고리 목록
   */
  children: findManyProductCategory_findManyProductCategory_productCategories_children[];
}

export interface findManyProductCategory_findManyProductCategory {
  /**
   * 총 개수
   */
  totalCount: number;
  /**
   * 상품 카테고리 목록
   */
  productCategories: findManyProductCategory_findManyProductCategory_productCategories[];
}

export interface findManyProductCategory {
  /**
   * 상품 카테고리 목록 조회
   */
  findManyProductCategory: findManyProductCategory_findManyProductCategory;
}

export interface findManyProductCategoryVariables {
  take: number;
  cursorId?: string | null;
  parentId?: string | null;
}
