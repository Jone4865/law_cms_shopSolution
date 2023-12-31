import { useLayoutEffect, useState } from 'react';
import { Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './style';
import { menuItems } from '../../utils/menuItems';
import { logoB, logoW } from '../../assets/images';
import useResponsive from '../../hooks/useResponsive';
import { useRecoilState } from 'recoil';
import { userTokenState } from '../../recoil/atoms/userToken';

type MenuInfo = {
  key: string;
  keyPath: string[];
};

type MenuData = {
  subMenu?: string;
  item: string;
};

export function AsideMenu() {
  const [visible, setVisible] = useState(false);
  const [menu, setMenu] = useState<MenuData>({
    subMenu: '',
    item: '',
  });

  const navigator = useNavigate();
  const { pathname } = useLocation();
  const { isLessThanEitherMobile } = useResponsive();
  const [, setTokenInfo] = useRecoilState(userTokenState);

  const handleLogout = () => {
    setTokenInfo({
      hasToken: false,
    });
  };

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
    <>
      {visible && isLessThanEitherMobile && (
        <S.Mask
          onClick={() => {
            setVisible(false);
            window.document.body.style.overflowY = 'auto';
          }}
        />
      )}
      {isLessThanEitherMobile && (
        <S.NavTop>
          <S.MenuIcon>
            <MenuOutlined
              style={{
                fontSize: 20,
              }}
              onClick={() => {
                setVisible(true);
                window.document.body.style.overflowY = 'hidden';
              }}
            />
          </S.MenuIcon>
          <S.HeaderImage src={logoB} alt="로고" onClick={handleMoveHome} />
        </S.NavTop>
      )}
      {(!isLessThanEitherMobile || visible) && (
        <S.Sider>
          <S.ImageWrap onClick={handleMoveHome}>
            <S.Image alt="logo" src={logoW} />
          </S.ImageWrap>

          <Menu
            theme={isLessThanEitherMobile ? 'light' : 'dark'}
            mode="inline"
            onClick={handleClickMenu}
            onOpenChange={handleChangeSubMenu}
            openKeys={[menu.subMenu ?? '']}
            selectedKeys={[menu.item]}
            items={menuItems}
          />
        </S.Sider>
      )}
    </>
  );
}
