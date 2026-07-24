import React from 'react';
import './App.css';
import { Layout } from 'antd';

import Home from './pages/Home';
import { SeoContentPage, SeoMapPage, SeoNotFound } from './pages/SeoExperience';
import seoCatalog from './seo/seoCatalog';

const { Content } = Layout;

function App() {
  const pathname = window.location.pathname;
  const seoPage = seoCatalog.getPageByPath(pathname);
  const isSeoMap = /\/mapa-do-site-e-seo\/?$/.test(pathname);
  const isHome = pathname === '/' || pathname === '/index.html';

  let pageContent = <Home />;

  if (isSeoMap) {
    pageContent = <SeoMapPage />;
  } else if (seoPage) {
    pageContent = <SeoContentPage page={seoPage} />;
  } else if (!isHome) {
    pageContent = <SeoNotFound />;
  }

  return (
    <Layout className="layout">
      <Content style={{ padding: '0' }}>
        <div className="site-layout-content">{pageContent}</div>
      </Content>
    </Layout>
  );
}

export default App;
