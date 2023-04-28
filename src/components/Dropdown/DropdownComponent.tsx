import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import * as S from './style';

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
  const [able, setAble] = useState(menus[0]);

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
    <S.Container>
      <Dropdown menu={menuProps}>
        <Button
          style={{
            width: width ? width : 'auto',
          }}
        >
          <Space>
            {able}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </S.Container>
  );
}
