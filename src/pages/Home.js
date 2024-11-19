import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Divider, Image } from 'antd';
import { GithubOutlined, LinkedinOutlined, FacebookOutlined, WhatsAppOutlined, InstagramOutlined } from '@ant-design/icons';
import Typewriter from 'typewriter-effect'; // Importa a biblioteca para o efeito de digitação
import './Home.css'; // Arquivo de CSS para o design personalizado

const { Title, Paragraph } = Typography;

const projects = [
  {
    id: 'serverless',
    title: 'Serverless no Vercel',
    description: 'Desenvolvi um projeto utilizando Serverless na plataforma Vercel, separando o backend do frontend para uma arquitetura mais escalável e eficiente (2024).',
    projectLink: 'https://github.com/MitoCoder/Serverless-Build-Client',
  },
  {
    id: 'gestao',
    title: 'Sistema de Locação Gestão',
    description: 'Criei um sistema de locação chamado Sistema Gestão, com funcionalidades avançadas para gerenciamento de aluguel de equipamentos (2024).',
    projectLink: 'https://sistemagestao.vercel.app/',
  },
  {
    id: 'patchii',
    title: 'Patchii Decorações',
    description: 'Desenvolvi em conjunto com a equipe diversas melhorias no sistema IMPACTO para atender as necessidades do PCP utilizando JavaScript, focado em proporcionar uma experiência única para os usuários interessados em decoração (2019).',
    projectLink: 'https://trssistemas.com.br/sistema-impacto/',
  },
  {
    id: 'america',
    title: 'America Rental',
    description: 'Desenvolvi o site America Rental em colaboração com Murilo Cardoso. Inicialmente feito em PHP pela 4Up, migrei o site para React e depois para Wordpress (2021 a 2024).',
    projectLink: 'https://americarental.com.br/',
  },
  {
    id: 'atos',
    title: 'Atos Technology SA',
    description: 'Desenvolvi mais de 25 sites diversos e criei sistemas desktop em C# e JavaScript, além de trabalhar com Android Studio para criar aplicativos. Fui pioneiro em melhorias de segurança nos sistemas e sites criados (2017).',
    projectLink: '',
  },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/mycosmus",
    icon: <FacebookOutlined />,
    key: "facebook",
    label: "Facebook",
  },
  {
    href: "https://wa.me/5511957207168",
    icon: <WhatsAppOutlined />,
    key: "whatsapp",
    label: "WhatsApp",
  },
  {
    href: "https://www.github.com/MitoCoder",
    icon: <GithubOutlined />,
    key: "github",
    label: "GitHub",
  },
  {
    href: "https://www.instagram.com/mycosmus",
    icon: <InstagramOutlined />,
    key: "instagram",
    label: "Instagram",
  },
];

const Home = () => {
  const [language, setLanguage] = useState('pt'); // Estado para controlar o idioma
  const [photoUrl, setPhotoUrl] = useState(null); // Estado para armazenar a URL da foto

  // Função para alternar entre idiomas
  useEffect(() => {
    const interval = setInterval(() => {
      setLanguage((prev) => (prev === 'pt' ? 'en' : prev === 'en' ? 'es' : 'pt'));
    }, 5000); // Alterna o idioma a cada 5 segundos
    return () => clearInterval(interval); // Limpeza do intervalo
  }, []);

  // Função para buscar a foto do GitHub
  useEffect(() => {
    const storedPhoto = localStorage.getItem('githubPhoto'); // Verifica se a foto já foi salva

    if (storedPhoto) {
      setPhotoUrl(storedPhoto); // Se já existe, usa a foto do localStorage
    } else {
      // Caso contrário, faz a requisição à API do GitHub
      fetch('https://api.github.com/users/MitoCoder') // Alterando para "users" para pegar a foto
        .then(response => response.json())
        .then(data => {
          const photo = data.avatar_url; // Foto do usuário do GitHub
          localStorage.setItem('githubPhoto', photo); // Armazena a foto no localStorage
          setPhotoUrl(photo); // Atualiza o estado da foto
        })
        .catch(err => console.error('Erro ao buscar foto do GitHub:', err));
    }
  }, []);

  const titleText = {
    pt: 'Port. Edvam',
    en: 'Hii, I am Edvam',
    es: 'Hola, Soy Edvam'
  };

  const descriptionText = {
    pt: 'Desenvolvedor Full Stack com foco em React, JavaScript, e sistemas escaláveis. Com experiência em mais de 25 projetos ao longo dos anos, sou apaixonado por transformar ideias em soluções digitais incríveis.',
    en: 'Full Stack Developer focused on React, JavaScript, and scalable systems. With experience in over 25 projects over the years, I am passionate about turning ideas into amazing digital solutions.',
    es: 'Desarrollador Full Stack enfocado en React, JavaScript y sistemas escalables. Con experiencia en más de 25 proyectos a lo largo de los años, me apasiona convertir ideas en soluciones digitales increíbles.'
  };

  const sectionTitleText = {
    pt: 'Vamos Conversar?',
    en: 'Let\'s Talk?',
    es: 'Hablemos?'
  };

  return (
    <div className="home-container">
      <div className="content">
        {/* Seção de Introdução */}
        <section className="intro-section">
          {/* Exibição da foto do GitHub no topo */}
          {photoUrl && (
            <div className="profile-info">
              <div className="profile-photo">
                <Image src={photoUrl} alt="Foto do GitHub" width={120} height={120} style={{ borderRadius: '50%' }} />
              </div>
              <div className="divider-vertical"></div> {/* Barra de separação vertical */}
              <div className="profile-text">
                {/* Título com efeito de digitação */}
                <Title level={2} className="title" style={{ color: 'white' }}>
                  <Typewriter
                    options={{
                      strings: [titleText.pt, titleText.en, titleText.es], // Alterna entre os idiomas
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 50,
                      delay: 110,
                    }}
                  />
                </Title>

                {/* Descrição com animação */}
                <Paragraph className="description">
                  {descriptionText[language]}
                </Paragraph>
                <Button className="btn-contact" icon={<GithubOutlined />} href="https://github.com/MitoCoder" target="_blank">
                  Visite meu GitHub
                </Button>
              </div>
            </div>
          )}
        </section>

        <Divider />

        {/* Seção de Projetos */}
        <section className="projects-section">
          <Title level={3} style={{ color: 'white' }} className="section-title">Projetos Recentes</Title>
          <Row gutter={[16, 16]} justify="center">
            {projects.map((project) => (
              <Col key={project.id} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  className="card"
                  title={project.title}
                  extra={project.projectLink ? <a href={project.projectLink} target="_blank" rel="noopener noreferrer">Ver Projeto</a> : null}
                >
                  <Paragraph>{project.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <Divider />

        {/* Seção de Contato */}
        <section className="contact-section">
          <Title level={2} className="section-title" style={{ color: 'white' }}>
            <Typewriter
              options={{
                strings: [sectionTitleText.pt, sectionTitleText.en, sectionTitleText.es], // Alterna entre os idiomas
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 100
              }}
            />
          </Title>
          {/* Botão de LinkedIn dentro do grupo de botões sociais */}
          <div className="social-buttons">
            <Button
              className="btn-contact"
              icon={<LinkedinOutlined />}
              href="https://www.linkedin.com/in/edvamdosantos/"
              target="_blank"
              style={{ marginRight: '1px' }}
            >
              Conectar no LinkedIn
            </Button>

            {/* Botões das redes sociais em linha com espaçamento de 1px */}
            {socialLinks.map((link) => (
              <Button
                key={link.key}
                icon={link.icon}
                href={link.href}
                target="_blank"
                style={{ marginRight: '1px' }}
              >
                {link.label}
              </Button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
