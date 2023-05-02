/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: signInByAdmin
// ====================================================

export interface signInByAdmin_signInByAdmin {
  /**
   * Access Token
   */
  accessToken: string;
  /**
   * Refresh Token
   */
  refreshToken: string;
}

export interface signInByAdmin {
  /**
   * 로그인 (관리자)
   */
  signInByAdmin: signInByAdmin_signInByAdmin;
}

export interface signInByAdminVariables {
  email: string;
  password: string;
  code: string;
}
