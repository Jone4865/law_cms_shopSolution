/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserStatus } from "./graphql-global-types";

// ====================================================
// GraphQL query operation: findManyUser
// ====================================================

export interface findManyUser_findManyUser_users {
  /**
   * 접속일
   */
  connectionDate: any | null;
  /**
   * 생성일
   */
  createdAt: any;
  /**
   * 이메일
   */
  email: string | null;
  /**
   * ID
   */
  id: string;
  /**
   * 이름
   */
  name: string;
  /**
   * 휴대전화
   */
  phone: string | null;
}

export interface findManyUser_findManyUser {
  /**
   * 총 개수
   */
  totalCount: number;
  /**
   * 회원 목록
   */
  users: findManyUser_findManyUser_users[];
}

export interface findManyUser {
  /**
   * 회원 목록 조회 (관리자)
   */
  findManyUser: findManyUser_findManyUser;
}

export interface findManyUserVariables {
  take: number;
  cursorId?: string | null;
  userStatus?: UserStatus | null;
}
