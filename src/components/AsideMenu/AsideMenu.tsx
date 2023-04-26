import { useLayoutEffect, useState } from 'react';
import { Menu } from 'antd';

import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './style';
import { menuItems } from '../../utils/menuItems';
import { logoB, logoW } from '../../assets/images';

type MenuInfo = {
  key: string;
  keyPath: string[];
};

type MenuData = {
  subMenu?: string;
  item: string;
};

export function AsideMenu() {
  const handleLogout = () => {
    localStorage.setItem('accessToken', '');
    window.location.reload();
  };

  const [menu, setMenu] = useState<MenuData>({
    subMenu: '',
    item: '',
  });

  const navigator = useNavigate();
  const { pathname } = useLocation();

  const handleMoveHome = () => {
    navigator('/');
  };

  const handleClickMenu = (e: MenuInfo) => {
    const [item, subMenu] = e.keyPath;
    if (subMenu) {
      const [, path] = item.split('-');
      setMenu({
        item,
        subMenu,
      });
      return navigator(`/${subMenu}/${path}`);
    } else {
      if (item === 'dashboard') {
        return handleMoveHome();
      }
      if (item === 'logout') {
        return handleLogout();
      }
      setMenu({
        item,
        subMenu: '',
      });
      return navigator(`/${item}`);
    }
  };

  const handleChangeSubMenu = (openKeys: string[]) => {
    if (openKeys.length < 1) {
      return setMenu((prev) => ({ ...prev, subMenu: '' }));
    }

    const [, subMenu] = openKeys;
    setMenu((prev) => ({ ...prev, subMenu }));
  };

  useLayoutEffect(() => {
    const [, subMenu, item] = pathname.split('/');
    if (!subMenu.length) {
      return setMenu({ item: 'dashboard', subMenu: '' });
    }
    if (!item) {
      return setMenu({ item: subMenu, subMenu: '' });
    }

    setMenu({ item: `${subMenu}-${item}`, subMenu });
  }, [pathname]);

  return (
    <S.Sider>
      <S.ImageWrap onClick={handleMoveHome}>
        <S.Image alt="logo" src={logoW} />
      </S.ImageWrap>

      <Menu
        theme="dark"
        mode="inline"
        onClick={handleClickMenu}
        onOpenChange={handleChangeSubMenu}
        openKeys={[menu.subMenu ?? '']}
        selectedKeys={[menu.item]}
        items={menuItems}
      />
    </S.Sider>
  );
}
