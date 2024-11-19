import React from 'react';
import './App.css';
import { Layout } from 'antd';

import Home from './pages/Home';

const { Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Content style={{ padding: '0' }}> {/* Removemos o padding aqui */}
        <div className="site-layout-content">
          <Home />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
