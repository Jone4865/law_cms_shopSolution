import { Button, Card, Col, Divider, theme, Row, Table } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Chart } from '../../components/Chart';
import {
  InquiryType,
  dashboardInquiryColumns,
  productInquiryColumns,
} from '../../utils/columns';

import * as S from './style';
import TransformBox from '../../components/TransformBox';
import useResponsive from '../../hooks/useResponsive';

type DashboardStats = {
  [index: string]: any[];
  userCount: {
    date: string;
    count: number;
  }[];
};

export function Dashboard() {
  const [inquiryData, setInquiryData] = useState<InquiryType[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardStats>();

  const navigator = useNavigate();
  const { isLessThanEitherTablet } = useResponsive();

  const chartTitle = [
    { title: '회원수', keyword: 'userCount' },
    { title: '탈퇴회원수', keyword: 'userCount' },
  ];

  const cardData = [
    {
      title: '결제완료',
    },
    {
      title: '배송완료',
    },
    {
      title: '주문취소',
    },
    {
      title: '교환/반품',
    },
  ];

  return (
    <>
      <Row gutter={[16, 24]}>
        {cardData.map((card, i) => (
          <Col span={isLessThanEitherTablet ? 12 : 6} key={i}>
            <Card
              title={card.title}
              headStyle={{
                backgroundColor: 'rgb(6 84 169)',
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              <TransformBox justifyContent="space-between">
                <S.CardTitle>오늘</S.CardTitle>
                <S.CardTitle>0</S.CardTitle>
              </TransformBox>
              <TransformBox justifyContent="space-between" marginTop="30px">
                <span>일주일</span>
                <span>0</span>
              </TransformBox>
              <Divider
                dashed
                style={{
                  margin: '8px 0',
                }}
              />
              <TransformBox justifyContent="space-between">
                <span>한달</span>
                <span>0</span>
              </TransformBox>
            </Card>
          </Col>
        ))}
      </Row>
      <Row
        style={{
          marginTop: 30,
        }}
        gutter={[16, 16]}
      >
        {chartTitle.map((v, i) => (
          <Col key={i} span={isLessThanEitherTablet ? 24 : 12}>
            <Card
              title={v.title}
              headStyle={{
                backgroundColor: '#fafafa',
              }}
            >
              <Chart data={dashboardData ? dashboardData[v.keyword] : []} />
            </Card>
          </Col>
        ))}
      </Row>

      <TransformBox marginTop="30px" flexDirection="column">
        <S.Head>
          <h3>상품 문의</h3>
          <Button
            type="link"
            style={{
              fontSize: 16,
            }}
            onClick={() => {
              navigator('/customer/inquiry');
            }}
          >
            자세히 보기 {'>'}
          </Button>
        </S.Head>

        <Table
          pagination={false}
          rowKey={(rec) => rec.id}
          columns={productInquiryColumns}
          scroll={{ x: 800 }}
          dataSource={[]}
          // loading={loading}
        />
      </TransformBox>
      <TransformBox marginTop="30px" flexDirection="column">
        <S.Head>
          <h3>1:1 문의</h3>
          <Button
            type="link"
            style={{
              fontSize: 16,
            }}
            onClick={() => {
              navigator('/customer/inquiry');
            }}
          >
            자세히 보기 {'>'}
          </Button>
        </S.Head>
        <Table
          pagination={false}
          rowKey={(rec) => rec.id}
          columns={dashboardInquiryColumns}
          scroll={{ x: 800 }}
          dataSource={inquiryData}
          // loading={loading}
        />
      </TransformBox>
    </>
  );
}
