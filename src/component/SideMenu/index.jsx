import React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router';

const { Sider } = Layout;

export const SideMenu = ({ logout }) => {
  const history = useHistory();
  return (
    <>
      <Sider
        theme='light'
        style={{
          overflow: 'auto',
          position: 'fixed',
          height: '50vh',
          left: 0,
        }}>

        <Menu theme='light' mode='inline'>
          <Menu.Item
            onClick={() => history.push('/history')} key="1"
          >
            プロフィール画面
          </Menu.Item>
          <Menu.Item
            onClick={() => history.push('/')} key="2">
            レストラン一覧
          </Menu.Item>
          <Menu.Item onClick={() => history.push('/order')} key="3">
            仮注文一覧
          </Menu.Item>
          <Menu.Item onClick={logout} key="4">
            ログアウト
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  )
}
