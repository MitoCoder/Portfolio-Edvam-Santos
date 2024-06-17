import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Pagination } from 'antd';

const Home = () => {
  const headingStyle = {
    fontSize: '1.5rem',
    marginBottom: '10px',
    textAlign: 'center',
  };

  const [hoveredBlock, setHoveredBlock] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [readmeContent, setReadmeContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedRepoData = localStorage.getItem('repoData');
        const cachedReadmeContent = localStorage.getItem('readmeContent');

        if (cachedRepoData && cachedReadmeContent) {
          setRepoData(JSON.parse(cachedRepoData));
          setReadmeContent(cachedReadmeContent);
        } else {
          const response = await axios.get('https://api.github.com/repos/MitoCoder/MitoCoder');
          setRepoData({
            ...response.data,
            blocks: [
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
                description: 'Desenvolvi o site Patchii Decorações utilizando JavaScript, focado em proporcionar uma experiência única para os usuários interessados em decoração (2019).',
                projectLink: 'https://www.patchii.com.br/',
              },
              {
                id: 'america',
                title: 'America Rental',
                description: 'Anteriormente, desenvolvi o site America Rental em colaboração com Murilo Cardoso, meu parceiro em desenvolvimento. O site inicialmente foi feito em PHP pela 4Up, porém com qualidade insatisfatória, e posteriormente migrado para React após um período, e depois para Wordpress (2021 a 2024).',
                projectLink: 'https://americarental.com.br/',
              },
              {
                id: 'atos',
                title: 'Atos Technology SA',
                description: 'Desenvolvi mais de 25 sites diversos e fiz implementação e criação de diversos sistemas desktop criados em C#, JavaScript. Realizei melhorias em XML e outras formas de pagamento para empresas. Além disso, utilizei muito o Android Studio para criar aplicativos. Fui pioneiro na melhoria de segurança dos sistemas e sites criados (2017).',
                projectLink: '',
              },
            ],
          });

          const readmeResponse = await axios.get(response.data.url + '/readme');
          const decodedContent = decodeURIComponent(escape(atob(readmeResponse.data.content)));
          setReadmeContent(decodedContent);

          localStorage.setItem('repoData', JSON.stringify(repoData));
          localStorage.setItem('readmeContent', decodedContent);
        }
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, [repoData, setRepoData]); // Incluído repoData e setRepoData na lista de dependências

  const getReadmeImages = (content) => {
    const imgRegex = /<img.*?src=["'](.*?)["']/g;
    const matches = [...content.matchAll(imgRegex)];
    return matches.map(match => match[1]);
  };

  const borderStyle = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '2px solid transparent',
    position: 'relative',
    overflow: 'hidden',
  };

  const activeBorderStyle = {
    borderColor: '#007bff',
    transition: 'border-color 0.3s ease-in-out',
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderBlocks = () => {
    if (!repoData) return null;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedBlocks = repoData.blocks.slice(startIndex, endIndex);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {slicedBlocks.map((block, index) => (
          <div
            key={index}
            style={{ ...borderStyle, ...(hoveredBlock === block.id ? activeBorderStyle : null) }}
            onMouseEnter={() => setHoveredBlock(block.id)}
            onMouseLeave={() => setHoveredBlock(null)}
          >
            <h2 style={headingStyle}>{block.title}</h2>
            <p>{block.description}</p>
            <p>Link do projeto: <a href={block.projectLink}>GitHub</a></p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        gap: '20px',
      }}
    >
      <div style={{
        flex: '1 1 45%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <img src={repoData && repoData.owner.avatar_url} alt="Avatar do dono do repositório" style={{ width: '150px', height: '150px', borderRadius: '60%', marginBottom: '5px' }} />
          <h2 style={{ ...headingStyle, fontSize: '25px' }}>{'Eu sou: Edvam dos Santos'}</h2>
          <p>Sobre: <a href="https://github.com/MitoCoder">GitHub</a></p>
          <p>👨‍💻 Mestre dos commits, caçador de bugs e amante de memes. Codando com humor desde 2014.</p>
        </div>
        {renderBlocks()}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          {repoData &&
            <Pagination
              defaultCurrent={1}
              current={currentPage}
              total={repoData.blocks.length}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
            />}
        </div>
      </div>

      <div style={{
        flex: '1 1 45%',
        marginTop: '20px',
      }}>
        <div style={{ ...borderStyle }}>
          <h2 style={headingStyle}>Meu Percuso no Github:</h2>
          {readmeContent && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {getReadmeImages(readmeContent).map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`Imagem do README ${index}`} style={{ maxWidth: '100%', marginBottom: '20px' }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
