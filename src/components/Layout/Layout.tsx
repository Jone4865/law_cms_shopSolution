import React, { useState } from 'react';

import * as S from './style';
import Main from '../Main';
import { AsideMenu } from '../AsideMenu';
import { Badge, Button } from 'antd';
import TransformBox from '../TransformBox';

export type BadgeType = {
  [index: string]: number;
  inquiryCount: number;
  orderCount: number;
  productInquiryCount: number;
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
    path: '/customer/partner',
    keyword: 'productInquiryCount',
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
  });

  return (
    <S.Layout>
      <AsideMenu />

      <S.Layout $marginLeft={200}>
        <S.Content>
          <S.StatusBar>
            <TransformBox>
              {statusText.map((v, i) => {
                return (
                  <S.StatusWrap key={i}>
                    <Badge count={badgeData ? badgeData[v.keyword] : 0}>
                      <Button
                        key={i}
                        type="primary"
                        style={{
                          fontWeight: 'bold',
                        }}
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
