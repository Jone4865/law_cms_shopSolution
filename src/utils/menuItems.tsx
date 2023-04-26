import { ItemType } from 'antd/lib/menu/hooks/useItems';
import {
  CustomerServiceOutlined,
  SecurityScanOutlined,
  LineChartOutlined,
  FormOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  GiftOutlined,
  DollarOutlined,
  CarOutlined,
} from '@ant-design/icons';

export const menuItems: ItemType[] = [
  {
    label: '대시보드',
    key: 'dashboard',
    icon: <LineChartOutlined />,
  },
  {
    label: '관리자 계정',
    key: 'admin',
    icon: <SecurityScanOutlined />,
  },
  {
    label: '회원 관리',
    key: 'users',
    icon: <UserOutlined />,
    children: [
      {
        label: '회원 목록',
        key: 'users-normal',
      },
      {
        label: '휴면 회원 목록',
        key: 'users-sleep',
      },
      {
        label: '탈퇴 회원 목록',
        key: 'users-delete',
      },
    ],
  },
  {
    label: '상품 관리',
    key: 'product',

    icon: <ShoppingCartOutlined />,
    children: [
      {
        label: '상품 목록',
        key: 'product-list',
      },
      {
        label: '상품 일괄 설정',
        key: 'product-setting',
      },
      {
        label: '상품 카테고리',
        key: 'product-category',
      },
    ],
  },
  {
    label: '주문 관리',
    key: 'order',
    icon: <CarOutlined />,
    children: [
      {
        label: '전체 주문',
        key: 'order-all',
      },
      {
        label: '입금대기 주문',
        key: 'order-wait',
      },
      {
        label: '교환/반품 신청 목록',
        key: 'order-change',
      },
      {
        label: '환불 신청 목록',
        key: 'order-refund',
      },
      {
        label: '실시간 입금 확인 내역',
        key: 'order-deposit',
      },
    ],
  },
  {
    label: '배송 관리',
    key: 'delivery',
    icon: <GiftOutlined />,
    children: [
      {
        label: '주문 별 배송처리',
        key: 'delivery-order',
      },
      {
        label: '상품 별 배송처리',
        key: 'delivery-product',
      },
    ],
  },

  {
    label: '고객센터 관리',
    key: 'customer',
    icon: <CustomerServiceOutlined />,
    children: [
      {
        label: '1:1 문의',
        key: 'customer-inquiry',
      },
      {
        label: 'FAQ',
        key: 'customer-faq',
      },
      {
        label: '상품 문의',
        key: 'customer-product-inquiry',
      },
      {
        label: '상품 리뷰',
        key: 'customer-review',
      },
    ],
  },
  {
    label: '현금영수증 관리',
    key: 'bill',
    icon: <DollarOutlined />,
    children: [
      {
        label: '발급 내역',
        key: 'bill-list',
      },
      {
        label: '개별 발급',
        key: 'bill-issue',
      },
    ],
  },
  {
    label: '약관 관리',
    key: 'policy',
    icon: <FormOutlined />,
  },

  {
    label: '로그아웃',
    key: 'logout',
    icon: <LogoutOutlined />,
  },
];
