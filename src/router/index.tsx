import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Layout from '../components/Layout';
import { Admin } from '../pages/Admin';
import { Inquiry, Faq, Notice } from '../pages/Customer';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { Policy } from '../pages/Policy';
import { UserDelete, UserSleep, Users } from '../pages/Users';
import { Review } from '../pages/Customer/Review';
import { ProductInquiry } from '../pages/Customer/ProductInquiry';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/atoms/userToken';
import {
  ProductList,
  ProductsSetting,
  ProductCategory,
} from '../pages/Product';

function Root() {
  const tokenInfo = useRecoilValue(userTokenState);
  return (
    <BrowserRouter>
      <Routes>
        {tokenInfo.hasToken && (
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<Navigate to="/" />} />
            <Route index element={<Dashboard />} />
            <Route path="admin" element={<Admin />} />
            <Route path="/product">
              <Route path="list" element={<ProductList />} />
              <Route path="setting" element={<ProductsSetting />} />
              <Route path="category" element={<ProductCategory />} />
            </Route>

            <Route path="/user">
              <Route path="normal" element={<Users />} />
              <Route path="sleep" element={<UserSleep />} />
              <Route path="delete" element={<UserDelete />} />
            </Route>

            <Route path="/customer">
              <Route path="inquiry" element={<Inquiry />} />
              <Route path="faq" element={<Faq />} />

              <Route path="notice" element={<Notice />} />
              <Route path="review" element={<Review />} />
              <Route path="product" element={<ProductInquiry />} />
            </Route>
            <Route path="policy" element={<Policy />} />
          </Route>
        )}
        {!tokenInfo.hasToken && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
