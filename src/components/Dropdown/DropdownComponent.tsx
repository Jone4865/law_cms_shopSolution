import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space, message } from 'antd';
type Props = {
  menus: string[];
  saveName: string;
  changeHandle: (key: string, serchCategory: string) => void;
  width?: number;
};

export function DropdownComponent({
  menus,
  width,
  saveName,
  changeHandle,
}: Props) {
  const [able, setAble] = useState('전체');

  const handleMenuClick: MenuProps['onClick'] = (e: any) => {
    setAble(e.key);
    changeHandle(saveName, e.key);
  };

  const items = menus.map((item) => ({
    label: item,
    key: item,
  }));

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  useEffect(() => {}, [able]);

  return (
    <Dropdown menu={menuProps}>
      <Button style={{ width: width ? width : '80px', marginRight: '10px' }}>
        <Space>
          {able}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}
