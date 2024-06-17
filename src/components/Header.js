import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Menu } from 'antd';
import { GithubOutlined, LinkedinOutlined, FacebookOutlined, WhatsAppOutlined, InstagramOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { SubMenu } = Menu;

const MeuHeader = () => {
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [hoveredKey, setHoveredKey] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Define se a tela é considerada mobile

  useEffect(() => {
    fetch('https://api.github.com/repos/MitoCoder/MitoCoder')
      .then(response => response.json())
      .then(data => {
        setProfileImageUrl(data.owner.avatar_url); // Obtém a URL da imagem de perfil do GitHub
      })
      .catch(error => {
        console.error('Erro ao obter dados do GitHub:', error);
      });
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Atualiza o estado de acordo com o tamanho da tela
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const socialLinks = [
    {
      href: 'https://www.linkedin.com/in/mycosmus/',
      icon: <LinkedinOutlined />,
      key: 'linkedin',
      label: 'LinkedIn',
    },
    {
      href: 'https://www.facebook.com/mycosmus',
      icon: <FacebookOutlined />,
      key: 'facebook',
      label: 'Facebook',
    },
    {
      href: 'https://wa.me/5511957207168',
      icon: <WhatsAppOutlined />,
      key: 'whatsapp',
      label: 'WhatsApp',
    },
    {
      href: 'https://www.github.com/MitoCoder',
      icon: <GithubOutlined />,
      key: 'github',
      label: 'GitHub',
    },
    {
      href: 'https://www.instagram.com/mycosmus',
      icon: <InstagramOutlined />,
      key: 'instagram',
      label: 'Instagram',
    },
  ];

  return (
    <>
      <Header style={headerStyle}>
        <div style={logoStyle}>
          {profileImageUrl && <Avatar src={profileImageUrl} size="large" style={{ marginRight: '6px' }} />} {/* Margem de 6px à direita do avatar */}
          <h1 style={{ ...titleStyle, fontSize: '22px' }}>Portfólio</h1> 
        </div>
        {isMobile ? (
          <Menu mode="horizontal" style={{ background: '#001529' }}>
            <SubMenu title={<span style={{ color: '#fff', marginRight: '4px' }}>Redes Sociais</span>} popupClassName="customSubMenu">
              {socialLinks.map(({ href, icon, key, label }) => (
                <Menu.Item key={key}>
                  <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#001529', marginLeft: '4px' }}>
                    {icon}
                    <span style={{ marginLeft: '4px' }}>{label}</span> {/* Espaçamento de 4px entre o ícone e o texto */}
                  </a>
                </Menu.Item>
              ))}
            </SubMenu>
          </Menu>
        ) : (
          <div style={socialLinksContainer}>
            {socialLinks.map(({ href, icon, key, label }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...socialLinkStyle, borderBottom: hoveredKey === key ? '4px solid white' : 'none', margin: '0 2px' }}
                onMouseEnter={() => setHoveredKey(key)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                {icon}
                <span style={{ marginLeft: '4px' }}>{label}</span> {/* Espaçamento de 4px entre o ícone e o texto */}
              </a>
            ))}
          </div>
        )}
      </Header>
      <div style={lineStyle}></div>
    </>
  );
};

const headerStyle = {
  background: '#001529',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
  height: '64px',
  boxSizing: 'border-box',
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
};

const titleStyle = {
  color: '#fff',
  margin: 0,
  whiteSpace: 'nowrap',
  fontSize: '1.5rem', // Tamanho de fonte ajustado para versão mobile
};

const socialLinksContainer = {
  display: 'flex',
  gap: '20px', // Espaçamento entre os ícones de redes sociais
};

const socialLinkStyle = {
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
};

const lineStyle = {
  height: '10px',
  background: '#000', // Cor da linha alterada para dark (#000)
};

export default MeuHeader;
