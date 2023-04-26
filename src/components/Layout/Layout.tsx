import React, { useState } from 'react';

import * as S from './style';
import Main from '../Main';
import { AsideMenu } from '../AsideMenu';
import { Badge, Button } from 'antd';
import TransformBox from '../TransformBox';
import useResponsive from '../../hooks/useResponsive';
import { useNavigate } from 'react-router-dom';

export type BadgeType = {
  [index: string]: number;
  inquiryCount: number;
  orderCount: number;
  productInquiryCount: number;
  refundCount: number;
};

const statusText = [
  {
    text: '신규 주문',
    path: '/counsel/checkup',
    keyword: 'orderCount',
    role: 'READ_COUNSEL',
  },
  {
    text: '상품 문의',
    path: '/customer/product',
    keyword: 'productInquiryCount',
    role: 'READ_PARTNERSHIP_INQUIRY',
  },
  {
    text: '교환/반품',
    path: '/customer/partner',
    keyword: 'refundCount',
    role: 'READ_PARTNERSHIP_INQUIRY',
  },
  {
    text: '1:1 문의',
    path: '/customer/inquiry',
    keyword: 'inquiryCount',
    role: 'READ_INQUIRY',
  },
];

function Layout() {
  const [badgeData, setBadgeData] = useState<BadgeType>({
    inquiryCount: 1,
    orderCount: 3,
    productInquiryCount: 0,
    refundCount: 2,
  });

  const { isLessThanEitherMobile } = useResponsive();
  const navigator = useNavigate();

  const handleClick = (path: string) => () => navigator(path);

  return (
    <S.Layout>
      <AsideMenu />

      <S.Layout $marginLeft={200}>
        <S.Content>
          <S.StatusBar>
            <TransformBox
              justifyContent={
                isLessThanEitherMobile ? 'space-between' : 'flex-start'
              }
              width={isLessThanEitherMobile ? '100%' : undefined}
            >
              {statusText.map((v, i) => {
                return (
                  <S.StatusWrap key={i} onClick={handleClick(v.path)}>
                    <Badge count={badgeData ? badgeData[v.keyword] : 0}>
                      <Button
                        key={i}
                        type="primary"
                        style={{
                          fontWeight: 'bold',
                        }}
                        size={isLessThanEitherMobile ? 'small' : 'middle'}
                      >
                        {v.text}
                      </Button>
                    </Badge>
                  </S.StatusWrap>
                );
              })}
            </TransformBox>
            <TransformBox alignItems="center">
              <S.TtlBox>로그인 만료시간 : {100}초</S.TtlBox>
            </TransformBox>
          </S.StatusBar>
          <Main />
        </S.Content>
        <S.Footer>shop-solution ©2023 Created by Lawdians</S.Footer>
      </S.Layout>
    </S.Layout>
  );
}

export default Layout;
