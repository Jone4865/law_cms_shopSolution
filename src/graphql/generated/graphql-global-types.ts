/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * 상품 파일
 */
export enum FileKind {
  IMAGE = "IMAGE",
}

/**
 * 상품 태그
 */
export enum ProductTag {
  BEST = "BEST",
  NEW = "NEW",
}

/**
 * 회원상태
 */
export enum UserStatus {
  BLACKLIST = "BLACKLIST",
  REST = "REST",
  WITHDRAWAL = "WITHDRAWAL",
}

/**
 * [상품 생성] 상품 옵션 input
 */
export interface OptionsByCreateProductArgs {
  name: string;
  stock?: number | null;
  children?: ProductOptionByCreateProductArgs[] | null;
}

/**
 * [상품 생성] 상품 옵션 input
 */
export interface ProductOptionByCreateProductArgs {
  name: string;
  stock?: number | null;
  children?: ProductOptionByCreateProductArgs[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
