import React from 'react';
import './App.css';
import { Layout } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

const { Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Home />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
