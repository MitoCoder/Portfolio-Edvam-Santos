import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { GithubOutlined, LinkedinOutlined, FacebookOutlined, WhatsAppOutlined, InstagramOutlined } from '@ant-design/icons';

const { Header } = Layout;

const MeuHeader = () => {
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [hoveredKey, setHoveredKey] = useState(null);

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



  return (
    <Header style={{ background: '#001529', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '20px' }}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
        {profileImageUrl && (
          <img src={profileImageUrl} alt="Minha Foto de Perfil" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
        )}
        <h1 style={{ color: '#fff', margin: 0 }}>Meu Portfólio</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#fff', marginRight: '20px' }}>Redes Sociais:</span>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <a href="https://www.linkedin.com/in/mycosmus/" 
             target="_blank" 
             rel="noopener noreferrer" 
             style={{ 
               color: '#fff', 
               display: 'flex', 
               alignItems: 'center', 
               marginRight: '10px', 
               position: 'relative',
               paddingBottom: hoveredKey === 'linkedin' ? '4px' : '0',
               borderBottom: hoveredKey === 'linkedin' ? '4px solid white' : 'none'
             }}
             onMouseEnter={() => setHoveredKey('linkedin')}
             onMouseLeave={() => setHoveredKey(null)}
          >
            <LinkedinOutlined style={{ fontSize: '18px', marginRight: '4px' }} />
            LinkedIn
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <a href="https://www.facebook.com/mycosmus" 
             target="_blank" 
             rel="noopener noreferrer" 
             style={{ 
               color: '#fff', 
               display: 'flex', 
               alignItems: 'center', 
               marginRight: '10px', 
               position: 'relative',
               paddingBottom: hoveredKey === 'facebook' ? '4px' : '0',
               borderBottom: hoveredKey === 'facebook' ? '4px solid white' : 'none'
             }}
             onMouseEnter={() => setHoveredKey('facebook')}
             onMouseLeave={() => setHoveredKey(null)}
          >
            <FacebookOutlined style={{ fontSize: '18px', marginRight: '4px' }} />
            Facebook
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <a href="https://wa.me/5511957207168" 
             target="_blank" 
             rel="noopener noreferrer" 
             style={{ 
               color: '#fff', 
               display: 'flex', 
               alignItems: 'center', 
               marginRight: '10px', 
               position: 'relative',
               paddingBottom: hoveredKey === 'whatsapp' ? '4px' : '0',
               borderBottom: hoveredKey === 'whatsapp' ? '4px solid white' : 'none'
             }}
             onMouseEnter={() => setHoveredKey('whatsapp')}
             onMouseLeave={() => setHoveredKey(null)}
          >
            <WhatsAppOutlined style={{ fontSize: '18px', marginRight: '4px' }} />
            WhatsApp
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <a href="https://www.github.com/MitoCoder" 
             target="_blank" 
             rel="noopener noreferrer" 
             style={{ 
               color: '#fff', 
               display: 'flex', 
               alignItems: 'center', 
               marginRight: '10px', 
               position: 'relative',
               paddingBottom: hoveredKey === 'github' ? '4px' : '0',
               borderBottom: hoveredKey === 'github' ? '4px solid white' : 'none'
             }}
             onMouseEnter={() => setHoveredKey('github')}
             onMouseLeave={() => setHoveredKey(null)}
          >
            <GithubOutlined style={{ fontSize: '18px', marginRight: '4px' }} />
            GitHub
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="https://www.instagram.com/mycosmus" 
             target="_blank" 
             rel="noopener noreferrer" 
             style={{ 
               color: '#fff', 
               display: 'flex', 
               alignItems: 'center', 
               position: 'relative',
               paddingBottom: hoveredKey === 'instagram' ? '4px' : '0',
               borderBottom: hoveredKey === 'instagram' ? '4px solid white' : 'none'
             }}
             onMouseEnter={() => setHoveredKey('instagram')}
             onMouseLeave={() => setHoveredKey(null)}
          >
            <InstagramOutlined style={{ fontSize: '18px', marginRight: '4px' }} />
            Instagram
          </a>
        </div>
      </div>
    </Header>
  );
}

export default MeuHeader;
