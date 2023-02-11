import {
  MenuFoldOutlined,
  HomeOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';

const { Header, Sider, Content } = Layout;

const App = () => {

  return (
    <Layout>
      <Sider trigger={null}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          onClick={({key}) => {
            // history.push()
            window.history.pushState(null,'', key)
          }}
          items={[
            {
              key: '/',
              icon: <HomeOutlined />,
              label: '首页',
            },
            {
              key: '/react_app',
              label: 'react app',
            },
            {
              key: 'vue2_app',
              label: 'vue2 app',
            },
            {
              key: 'vue3_app',
              label: 'vue3 app',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          我是Header~~~
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <div id="microContainer">
            我是主应用的内容
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;