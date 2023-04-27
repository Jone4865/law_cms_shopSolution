import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Layout from '../components/Layout';
import { Admin } from '../pages/Admin';
import { Inquiry, Faq, Notice } from '../pages/Customer';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { Policy } from '../pages/Policy';
import { Users } from '../pages/Users';
import { Review } from '../pages/Customer/Review';
import { ProductInquiry } from '../pages/Customer/ProductInquiry';
import { ProductList, ProductsSetting, ProductCategory } from '../pages/Gift';

function Root() {
  const accessToken = localStorage.getItem('accessToken') ?? '';

  return (
    <BrowserRouter>
      <Routes>
        {accessToken?.length && (
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
        {!accessToken?.length && (
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
