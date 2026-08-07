import React from 'react';
import './App.css';
import { Layout } from 'antd';

import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { SeoContentPage, SeoMapPage, SeoNotFound } from './pages/SeoExperience';
import seoCatalog from './seo/seoCatalog';

const { Content } = Layout;

function App() {
  const pathname = window.location.pathname;
  const decodedPathname = decodeURIComponent(pathname);
  const seoPage = seoCatalog.getPageByPath(pathname);
  const isSeoMap = /\/mapa-do-site-e-seo\/?$/.test(pathname);
  const isPrivacyPolicy =
    /\/politica-de-privacidade\/?$/.test(pathname) ||
    /\/politica de privacidade\/?$/.test(decodedPathname);
  const isHome = pathname === '/' || pathname === '/index.html';

  let pageContent = <Home />;

  if (isPrivacyPolicy) {
    pageContent = <PrivacyPolicy />;
  } else if (isSeoMap) {
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
