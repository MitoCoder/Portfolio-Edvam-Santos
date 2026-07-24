import React, { useEffect, useState } from 'react';
import {
  ApiOutlined,
  ArrowDownOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
  CodeOutlined,
  FileSearchOutlined,
  GithubOutlined,
  GlobalOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MenuOutlined,
  MobileOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  UpOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import './Home.css';

const whatsappLink =
  'https://wa.me/5511957207168?text=Ol%C3%A1%2C%20Edvam.%20Vi%20seu%20portf%C3%B3lio%20e%20quero%20conversar%20sobre%20um%20projeto.';

const navItems = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Cases', href: '#projetos' },
  { label: 'Negócio', href: '#negocio' },
  { label: 'Contato', href: '#contato' },
  {
    label: 'Mapa do Site',
    href: '/mapa-do-site-e-seo/',
    className: 'nav-map-link',
    icon: <FileSearchOutlined />,
  },
];

const sectionNavItems = [
  { label: 'Início', shortLabel: 'Início', href: '#inicio' },
  { label: 'Sobre', shortLabel: 'Sobre', href: '#sobre' },
  { label: 'Negócio', shortLabel: 'Neg.', href: '#negocio' },
  { label: 'Serviços', shortLabel: 'Serv.', href: '#servicos' },
  { label: 'Projetos', shortLabel: 'Proj.', href: '#projetos' },
  { label: 'Contato', shortLabel: 'Contato', href: '#contato' },
];

const services = [
  {
    number: '01',
    title: 'Experiências digitais',
    description:
      'Sites e landing pages com identidade forte, carregamento rápido e estrutura pensada para transformar atenção em conversa.',
    icon: <GlobalOutlined />,
    tags: ['UI/UX', 'React', 'Performance'],
    promise:
      'Uma presença digital que transmite confiança antes mesmo da primeira conversa.',
    deliverables: [
      'Estratégia de conteúdo e arquitetura das páginas',
      'Interface responsiva com identidade visual própria',
      'Otimização de performance, SEO técnico e conversão',
      'Integração com formulários, WhatsApp e ferramentas de análise',
    ],
    outcomes: [
      'Mais credibilidade para apresentar sua empresa',
      'Jornada mais clara até o pedido de orçamento',
      'Base preparada para campanhas e crescimento',
    ],
    idealFor:
      'Empresas, profissionais e novos produtos que precisam causar uma primeira impressão forte e transformar visitas em oportunidades.',
  },
  {
    number: '02',
    title: 'Produtos & sistemas',
    description:
      'Dashboards, portais, áreas administrativas e ferramentas sob medida para organizar operações e reduzir trabalho manual.',
    icon: <CodeOutlined />,
    tags: ['SaaS', 'Dashboards', 'Full Stack'],
    promise:
      'Um sistema desenhado ao redor da sua operação, e não o contrário.',
    deliverables: [
      'Mapeamento de usuários, regras e fluxos do negócio',
      'Painéis administrativos e indicadores relevantes',
      'Controle de permissões e organização dos dados',
      'Arquitetura preparada para manutenção e novos módulos',
    ],
    outcomes: [
      'Menos planilhas e controles paralelos',
      'Mais visibilidade para decisões rápidas',
      'Processos padronizados e fáceis de acompanhar',
    ],
    idealFor:
      'Operações que cresceram além das ferramentas genéricas e precisam de controle, rastreabilidade e produtividade em um só lugar.',
  },
  {
    number: '03',
    title: 'Integrações inteligentes',
    description:
      'APIs, webhooks e automações que conectam seus serviços, eliminam tarefas repetitivas e fazem os dados circularem.',
    icon: <ApiOutlined />,
    tags: ['APIs', 'Serverless', 'Automação'],
    promise:
      'Tecnologia trabalhando em segundo plano para sua equipe ganhar tempo e precisão.',
    deliverables: [
      'Diagnóstico de tarefas repetitivas e pontos de integração',
      'Conexão entre sistemas, bancos de dados e serviços externos',
      'Automação de notificações, cadastros, validações e relatórios',
      'Monitoramento de falhas e documentação do fluxo',
    ],
    outcomes: [
      'Redução de retrabalho e erros manuais',
      'Dados consistentes entre diferentes áreas',
      'Equipe livre para atividades de maior valor',
    ],
    idealFor:
      'Empresas com processos logísticos, financeiros, comerciais ou administrativos que dependem de cópias, conferências e atualizações manuais.',
  },
  {
    number: '04',
    title: 'Evolução técnica',
    description:
      'Modernização de projetos antigos, correção de gargalos e criação de uma base segura para o produto continuar crescendo.',
    icon: <ThunderboltOutlined />,
    tags: ['Migração', 'Segurança', 'Escala'],
    promise:
      'Evoluir um sistema importante sem perder o que já funciona no negócio.',
    deliverables: [
      'Diagnóstico técnico e priorização dos riscos',
      'Modernização gradual de interface e arquitetura',
      'Correções de performance, segurança e estabilidade',
      'Plano de evolução com entregas controladas',
    ],
    outcomes: [
      'Menor risco operacional durante a mudança',
      'Experiência mais rápida para usuários e equipe',
      'Código mais simples de manter e expandir',
    ],
    idealFor:
      'Negócios que dependem de sites ou sistemas antigos, lentos ou difíceis de manter, mas não podem interromper a operação.',
  },
];

const businessAreas = [
  {
    title: 'Logística',
    text: 'Estoque, compras, locação, movimentações, expedição, transporte, rastreabilidade e indicadores.',
  },
  {
    title: 'Financeiro',
    text: 'Faturamento, cobranças, aprovações, conciliações, contas a pagar e receber e geração de relatórios.',
  },
  {
    title: 'Operações',
    text: 'Padronização de rotinas, responsáveis, prazos, alertas, documentos e redução de tarefas manuais.',
  },
  {
    title: 'Gestão',
    text: 'Dashboards e dados confiáveis para enxergar gargalos, acompanhar desempenho e decidir com segurança.',
  },
];

const projects = [
  {
    id: 'rental',
    number: '01',
    title: 'Sistema Gestão',
    category: 'Locação / Vendas / Gestão',
    description:
      'Sistema desenvolvido sob medida para centralizar locações de equipamentos e pedidos de venda. Uma operação completa para o cliente comercializar, locar e acompanhar seus equipamentos em um único ambiente.',
    tags: ['Locação', 'Pedidos', 'Gestão'],
  },
  {
    id: 'serverless',
    number: '02',
    title: 'Serverless Build',
    category: 'Arquitetura / Integração',
    description:
      'Arquitetura desenvolvida para melhorar a comunicação entre frontend e backend desacoplados, criando integrações mais organizadas, escaláveis e fáceis de manter.',
    tags: ['Frontend', 'Backend', 'Serverless'],
  },
  {
    id: 'america',
    number: '03',
    title: 'Site America Rental',
    category: 'Site corporativo / SEO',
    description:
      'Site corporativo desenvolvido a partir do design fornecido pelo cliente, com estrutura técnica de SEO, busca orgânica e desempenho para fortalecer a presença digital da empresa.',
    tags: ['Web Design', 'SEO', 'Performance'],
  },
  {
    id: 'control',
    number: '04',
    title: 'Sistema Control Tower',
    category: 'Logística / Torre de controle',
    description:
      'Sistema de gerenciamento logístico para torre de controle, com indicadores, gráficos e relatórios de OTIF, SLA, performance e termômetros operacionais para acompanhar a operação em tempo real.',
    tags: ['Logística', 'OTIF & SLA', 'Indicadores'],
  },
  {
    id: 'grafica',
    number: '05',
    title: 'Sistema Less Gráfica',
    category: 'Indústria gráfica / Otimização',
    description:
      'Ferramenta de desenho em Canvas e HTML5 para gráficas, capaz de calcular planos de corte inteligentes para guilhotinas industriais a partir das medidas das folhas e dos materiais.',
    tags: ['Canvas', 'HTML5', 'Plano de corte'],
  },
  {
    id: 'pitoco',
    number: '06',
    title: 'Site Pitoco Magazine',
    category: 'E-commerce / Conversão',
    description:
      'Site de vendas completo com funil direcionado à Kiwify, estrutura de SEO e performance preparada para receber tráfego e cliques de campanhas no Google Ads.',
    tags: ['Funil de vendas', 'Kiwify', 'Google Ads'],
  },
  {
    id: 'ponto',
    number: '07',
    title: 'Super Ponto Manual',
    category: 'RH / Controle empresarial',
    description:
      'Sistema de dataponto empresarial sob medida para controle interno, apoio a auditorias, rastreabilidade de alterações e manutenção de históricos duradouros relacionados à jornada de trabalho.',
    tags: ['Dataponto', 'Auditoria', 'Históricos'],
  },
  {
    id: 'pcp',
    number: '08',
    title: 'Sistema de PCP',
    category: 'Engenharia de produção',
    description:
      'Controle completo para planejamento e acompanhamento da produção, com KPIs, hora-máquina, hora-homem, planejamento automático, ordens de produção e integração com a gestão de estoque.',
    tags: ['PCP', 'Produção', 'Estoque'],
  },
];

const capabilities = [
  'React',
  'JavaScript',
  'Node.js',
  'APIs REST',
  'WordPress',
  'Vercel',
  'SQL',
  'C#',
  'Android',
  'GitHub',
];

const process = [
  {
    number: '01',
    title: 'Mergulho',
    text: 'Entendo o negócio, o público e o resultado que realmente importa.',
  },
  {
    number: '02',
    title: 'Direção',
    text: 'Transformo as ideias em fluxo, arquitetura, conteúdo e linguagem visual.',
  },
  {
    number: '03',
    title: 'Construção',
    text: 'Desenvolvo, testo e lapido cada interação em telas grandes e pequenas.',
  },
  {
    number: '04',
    title: 'Impulso',
    text: 'Coloco no ar e deixo a base pronta para medir, aprender e evoluir.',
  },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mycosmus/',
    icon: <LinkedinOutlined />,
  },
  {
    label: 'GitHub',
    href: 'https://www.github.com/MitoCoder',
    icon: <GithubOutlined />,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mycosmus',
    icon: <InstagramOutlined />,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

function ProjectVisual({ project }) {
  if (project.id === 'rental') {
    return (
      <div className="project-mockup rental-mockup" aria-hidden="true">
        <div className="mock-sidebar">
          <span className="mock-logo">SG</span>
          {[1, 2, 3, 4, 5].map((item) => <i key={item} />)}
        </div>
        <div className="mock-main">
          <div className="mock-topbar">
            <span>Painel de operação</span>
            <i />
          </div>
          <div className="mock-stats">
            <div><small>Contratos ativos</small><strong>148</strong><em>+12%</em></div>
            <div><small>Equipamentos</small><strong>392</strong><em>98% ok</em></div>
            <div><small>Receita mensal</small><strong>R$ 84k</strong><em>+8.4%</em></div>
          </div>
          <div className="mock-chart">
            <span>Visão do mês</span>
            <div className="chart-bars">
              {[44, 62, 48, 78, 55, 88, 72, 96, 68, 82].map((height, index) => (
                <i key={index} style={{ '--bar-height': `${height}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 'serverless') {
    return (
      <div className="project-mockup serverless-mockup" aria-hidden="true">
        <div className="terminal-bar">
          <div><i /><i /><i /></div>
          <span>edvam@cloud: ~/build</span>
        </div>
        <div className="terminal-body">
          <p><b>$</b> npm run deploy</p>
          <p><span>✓</span> Building frontend...</p>
          <p><span>✓</span> Connecting API routes...</p>
          <p><span>✓</span> Optimizing edge functions...</p>
          <p><span>✓</span> Production ready in 8.4s</p>
          <div className="architecture">
            <strong>CLIENT</strong><i /><strong>API</strong><i /><strong>EDGE</strong>
          </div>
          <p className="terminal-ready">● LIVE — global network</p>
        </div>
      </div>
    );
  }

  if (project.id === 'america') {
    return (
      <div className="project-mockup america-mockup" aria-hidden="true">
        <div className="america-nav">
          <strong>AMERICA<span>RENTAL</span></strong>
          <div><i /><i /><i /></div>
        </div>
        <div className="america-stage">
          <div className="machine-shape">
            <i className="machine-boom" />
            <i className="machine-cabin" />
            <i className="machine-wheel wheel-one" />
            <i className="machine-wheel wheel-two" />
          </div>
          <div className="america-copy">
            <small>EQUIPAMENTOS PARA ELEVAÇÃO</small>
            <strong>Vá mais alto.</strong>
            <span>Locação ágil para sua obra não parar.</span>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 'control') {
    return (
      <div className="project-mockup control-mockup" aria-hidden="true">
        <div className="control-topbar">
          <strong>CONTROL TOWER</strong>
          <span>OPERAÇÃO AO VIVO <i /></span>
        </div>
        <div className="control-grid">
          <div className="control-kpis">
            <div><small>OTIF</small><strong>96.4%</strong><span>+2.8%</span></div>
            <div><small>SLA</small><strong>98.1%</strong><span>no prazo</span></div>
            <div><small>ENTREGAS</small><strong>1.248</strong><span>este mês</span></div>
          </div>
          <div className="control-route">
            <span>FLUXO OPERACIONAL</span>
            <div className="route-line">
              {[1, 2, 3, 4, 5].map((item) => <i key={item} />)}
            </div>
          </div>
          <div className="control-thermometers">
            {[84, 68, 92, 76].map((value, index) => (
              <div key={value}>
                <span>OP {index + 1}</span>
                <i><b style={{ '--meter': `${value}%` }} /></i>
                <strong>{value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 'grafica') {
    return (
      <div className="project-mockup grafica-mockup" aria-hidden="true">
        <div className="grafica-toolbar">
          <strong>LESS / PLANO DE CORTE</strong>
          <div><span>1200 × 800 mm</span><i /><i /><i /></div>
        </div>
        <div className="grafica-stage">
          <div className="cut-sheet">
            <span className="cut-a">A</span>
            <span className="cut-b">B</span>
            <span className="cut-c">C</span>
            <span className="cut-d">D</span>
            <span className="cut-e">E</span>
          </div>
          <div className="cut-summary">
            <small>APROVEITAMENTO</small>
            <strong>94.8%</strong>
            <span>Plano otimizado</span>
            <div><i /><i /><i /></div>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 'pitoco') {
    return (
      <div className="project-mockup pitoco-mockup" aria-hidden="true">
        <div className="pitoco-nav">
          <strong>PITOCO<span>MAGAZINE</span></strong>
          <div><i /><i /><i /></div>
        </div>
        <div className="pitoco-hero">
          <div>
            <small>OFERTA ESPECIAL</small>
            <strong>Seu pet merece o melhor.</strong>
            <span>Compra segura e entrega rápida.</span>
            <b>QUERO APROVEITAR</b>
          </div>
          <div className="pet-product">
            <i /><strong>PITOCO</strong><span>premium</span>
          </div>
        </div>
        <div className="pitoco-proof">
          <span>Compra segura</span><span>Entrega rápida</span><span>Oferta exclusiva</span>
        </div>
      </div>
    );
  }

  if (project.id === 'ponto') {
    return (
      <div className="project-mockup ponto-mockup" aria-hidden="true">
        <div className="ponto-sidebar">
          <strong>SP</strong>
          {[1, 2, 3, 4].map((item) => <i key={item} />)}
        </div>
        <div className="ponto-main">
          <div className="ponto-heading"><span>Controle de jornada</span><i /></div>
          <div className="ponto-profile">
            <i /><div><strong>Equipe operacional</strong><span>128 colaboradores</span></div>
            <b>REGULAR</b>
          </div>
          <div className="ponto-week">
            {[72, 88, 64, 92, 78].map((height, index) => (
              <div key={height}><i style={{ '--point-height': `${height}%` }} /><span>{['SEG', 'TER', 'QUA', 'QUI', 'SEX'][index]}</span></div>
            ))}
          </div>
          <div className="ponto-audit"><span>Última auditoria</span><strong>Sem divergências críticas</strong></div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-mockup pcp-mockup" aria-hidden="true">
      <div className="pcp-topbar">
        <strong>PCP / PLANEJAMENTO</strong>
        <span>SEMANA 32</span>
      </div>
      <div className="pcp-layout">
        <div className="pcp-stats">
          <div><small>O.P. ABERTAS</small><strong>42</strong></div>
          <div><small>EFICIÊNCIA</small><strong>91%</strong></div>
          <div><small>HORA-MÁQUINA</small><strong>384h</strong></div>
        </div>
        <div className="pcp-schedule">
          <span>PROGRAMAÇÃO DA PRODUÇÃO</span>
          {[82, 58, 90, 66, 74].map((width, index) => (
            <div key={width}><small>OP-{1040 + index}</small><i><b style={{ '--schedule': `${width}%` }} /></i><strong>{width}%</strong></div>
          ))}
        </div>
        <div className="pcp-stock">
          <span>ESTOQUE</span>
          <div><i /><i /><i /><i /><i /><i /></div>
          <strong>Materiais sincronizados</strong>
        </div>
      </div>
    </div>
  );
}

function ServiceDetail({ service, onClose }) {
  return (
    <motion.div
      className="service-detail-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.14 }}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        className="service-detail-screen"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`service-title-${service.number}`}
      >
        <header className="service-detail-header">
          <span>E/S — SOLUÇÃO {service.number}</span>
          <button type="button" onClick={onClose} aria-label="Fechar detalhes" autoFocus>
            <CloseOutlined />
          </button>
        </header>

        <div className="service-detail-layout">
          <div className="service-detail-lead">
            <span className="service-detail-icon">{service.icon}</span>
            <p>{service.number} / 04</p>
            <h2 id={`service-title-${service.number}`}>{service.title}</h2>
            <strong>{service.promise}</strong>
            <p className="service-detail-description">{service.description}</p>
            <a href={whatsappLink} target="_blank" rel="noreferrer">
              <WhatsAppOutlined />
              <span className="button-label">Conversar sobre esta solução</span>
              <ArrowRightOutlined />
            </a>
          </div>

          <div className="service-detail-content">
            <div className="service-detail-group">
              <span>O que pode fazer parte</span>
              <ul>
                {service.deliverables.map((item) => (
                  <li key={item}><CheckOutlined /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="service-detail-group">
              <span>Impacto esperado</span>
              <ul>
                {service.outcomes.map((item) => (
                  <li key={item}><CheckOutlined /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="service-detail-group service-detail-ideal">
              <span>Faz sentido para</span>
              <p>{service.idealFor}</p>
            </div>
            <div className="service-detail-assurance">
              <SafetyCertificateOutlined />
              <p>
                Escopo claro, comunicação direta e evolução validada por etapas.
                Você acompanha as decisões e sabe o que está sendo construído.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [showFloatingContact, setShowFloatingContact] = useState(true);
  const [activeSection, setActiveSection] = useState('inicio');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 190, damping: 32 });
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 130]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.25]);
  const experienceYears = new Date().getFullYear() - 2010;

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetScroll = () => window.scrollTo({ top: 0, left: 0 });
    window.requestAnimationFrame(resetScroll);
    const scrollResetTimer = window.setTimeout(resetScroll, 120);

    return () => {
      window.clearTimeout(scrollResetTimer);

      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = previousRestoration;
      }
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!activeService) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveService(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeService]);

  useEffect(() => {
    const contactSection = document.getElementById('contato');
    if (!contactSection) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingContact(!entry.isIntersecting);
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -18% 0px',
      }
    );

    observer.observe(contactSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 520);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = sectionNavItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      {
        threshold: [0.18, 0.35, 0.55],
        rootMargin: '-22% 0px -42% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  return (
    <main className="portfolio">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Voltar ao início">
          <span className="brand-symbol">E/S</span>
          <span className="brand-name">Edvam Santos</span>
        </a>

        <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Navegação principal">
          <a className="nav-top-link" href="#inicio" onClick={closeMenu}>
            Topo
          </a>
          {navItems.map((item) => (
            <a
              key={item.href}
              className={item.className}
              href={item.href}
              onClick={closeMenu}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href={whatsappLink} target="_blank" rel="noreferrer">
            <span className="button-label">Iniciar projeto</span>
            <ArrowRightOutlined />
          </a>
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </header>

      <nav className="section-bubbles" aria-label="Navegação rápida por seções">
        <div className="section-bubbles-list">
          {sectionNavItems.map((item, index) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.href}
                className={isActive ? 'section-bubble active' : 'section-bubble'}
                href={item.href}
                aria-label={`Ir para ${item.label}`}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className="bubble-dot">{String(index + 1).padStart(2, '0')}</span>
                <span className="bubble-label">{item.label}</span>
                <span className="bubble-mobile-label">{item.shortLabel}</span>
              </a>
            );
          })}
        </div>
      </nav>

      <section id="inicio" className="hero">
        <motion.div
          className="hero-background-type"
          style={prefersReducedMotion ? undefined : { y: heroY, opacity: heroOpacity }}
          aria-hidden="true"
        >
          <span>EDVAM</span>
          <span>SANTOS</span>
        </motion.div>

        <motion.div
          className="hero-topline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.38 }}
        >
          <span>Full Stack Developer</span>
          <span>São Paulo — Brasil</span>
          <span className="available"><i /> Disponível para projetos</span>
        </motion.div>

        <motion.div className="hero-content" variants={stagger} initial="hidden" animate="visible">
          <motion.p variants={reveal} className="hero-kicker">
            Ideias ambiciosas merecem execução à altura.
          </motion.p>
          <motion.h1 variants={reveal}>
            Eu projeto e construo
            <span> experiências digitais</span>
            que ninguém ignora.
          </motion.h1>
          <motion.div variants={reveal} className="hero-bottom">
            <p>
              Sites, sistemas e automações que unem direção visual, engenharia
              e estratégia para fazer negócios avançarem.
            </p>
            <a className="magnetic-link" href="#projetos">
              <span>Ver o que eu construo</span>
              <i><ArrowDownOutlined /></i>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-portrait"
          initial={{ opacity: 0, y: 12, scale: 0.992 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="https://github.com/MitoCoder.png"
            alt="Edvam Santos"
            width="460"
            height="460"
            fetchpriority="high"
          />
          <div className="portrait-halftone" aria-hidden="true" />
          <div className="portrait-label">
            <small>CRIANDO DESDE</small>
            <strong>2010</strong>
          </div>
        </motion.div>
      </section>

      <div className="ticker" aria-label="Especialidades">
        <div className="ticker-track">
          {[...capabilities, ...capabilities].map((item, index) => (
            <React.Fragment key={`${item}-${index}`}>
              <span>{item}</span><i>✦</i>
            </React.Fragment>
          ))}
        </div>
      </div>

      <section id="sobre" className="manifesto content-width">
        <motion.div className="section-index" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <span>01</span>
          <p>O que me move</p>
        </motion.div>
        <motion.div className="manifesto-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }}>
          <h2>
            Não faço “só um site”. Eu transformo uma ideia em uma presença
            digital <em>impossível de confundir.</em>
          </h2>
          <div className="manifesto-support">
            <p>
              Minha abordagem cruza tecnologia, design e visão de produto. Cada
              escolha precisa ter uma razão: chamar atenção, facilitar uma
              decisão ou mover o negócio para frente.
            </p>
            <a href={whatsappLink} target="_blank" rel="noreferrer">
              Conte sua ideia <ArrowRightOutlined />
            </a>
          </div>
        </motion.div>
        <motion.div className="numbers" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }}>
          <motion.div variants={reveal}><strong>{experienceYears}+</strong><span>anos entre processos,<br />código e produto</span></motion.div>
          <motion.div variants={reveal}><strong>25+</strong><span>experiências<br />entregues</span></motion.div>
          <motion.div variants={reveal}><strong>360º</strong><span>da estratégia<br />ao deploy</span></motion.div>
        </motion.div>
      </section>

      <section id="negocio" className="business-section">
        <div className="content-width">
          <div className="section-index">
            <span>02</span>
            <p>Visão de negócio</p>
          </div>
          <div className="business-layout">
            <motion.div
              className="business-copy"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.14 }}
            >
              <span className="micro-label">FORMAÇÃO EM LOGÍSTICA</span>
              <h2>Eu entendo o processo antes de automatizá-lo.</h2>
              <p>
                Minha formação em Logística amplia a forma como desenvolvo
                sistemas para empresas. Antes de pensar em telas e código, eu
                consigo compreender fluxo, prazo, custo, responsabilidade,
                exceção e indicador.
              </p>
              <p>
                Essa visão facilita o diálogo com áreas operacionais e permite
                transformar rotinas logísticas, financeiras e administrativas
                em soluções digitais mais coerentes com o trabalho real.
              </p>
              <div className="business-assurance">
                <SafetyCertificateOutlined />
                <span>
                  Menos tempo explicando o básico da operação. Mais foco no que
                  precisa ser melhorado, controlado e escalado.
                </span>
              </div>
            </motion.div>

            <motion.div
              className="business-areas"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {businessAreas.map((area, index) => (
                <motion.article key={area.title} variants={reveal}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="servicos" className="services-section">
        <div className="content-width">
          <div className="section-index light-index">
            <span>03</span>
            <p>O que eu construo</p>
          </div>
          <div className="services-heading">
            <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }}>
              Código é ferramenta.<br /><span>Impacto é o objetivo.</span>
            </motion.h2>
            <p>Do primeiro pixel à infraestrutura.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <motion.article
                className="service-row"
                key={service.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="service-number">{service.number}</span>
                <div className="service-title">
                  <i>{service.icon}</i>
                  <h3>{service.title}</h3>
                </div>
                <p>{service.description}</p>
                <div className="service-tags">
                  {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <button
                  className="service-arrow"
                  type="button"
                  aria-label={`Ver detalhes sobre ${service.title}`}
                  onClick={() => setActiveService(service)}
                >
                  <span className="button-label">Detalhes</span>
                  <ArrowRightOutlined />
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="projetos" className="projects-section">
        <div className="content-width">
          <div className="section-index">
            <span>04</span>
            <p>Projetos selecionados</p>
          </div>
          <motion.div className="projects-intro" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.14 }}>
            <h2>Trabalho que<br /><em>fala por si.</em></h2>
            <p>Algumas entregas, decisões e problemas que transformei em produto.</p>
          </motion.div>
        </div>

        <div className="project-stack">
          {projects.map((project, index) => (
            <article
              className={`case-study case-${project.id}`}
              key={project.id}
            >
              <motion.div
                className="case-info"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
              >
                <span className="case-number">
                  {project.number} / {String(projects.length).padStart(2, '0')}
                </span>
                <p className="case-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="case-description">{project.description}</p>
                <div className="case-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </motion.div>
              <motion.div
                className="case-visual-wrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectVisual project={project} />
                <span className="case-watermark">{String(index + 1).padStart(2, '0')}</span>
              </motion.div>
            </article>
          ))}
        </div>
      </section>

      <section className="expertise-section">
        <div className="content-width expertise-grid">
          <motion.div className="expertise-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.14 }}>
            <span className="micro-label">TECNOLOGIA COM PROPÓSITO</span>
            <h2>Amplo o bastante para construir. Profundo o bastante para resolver.</h2>
            <p>
              Escolho tecnologia pelo problema, não pela moda. O resultado é
              uma solução mais simples de usar, manter e expandir.
            </p>
          </motion.div>
          <motion.div className="capability-cloud" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }}>
            {capabilities.map((item, index) => (
              <motion.span key={item} variants={reveal} className={index % 4 === 0 ? 'accent-capability' : ''}>
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
        <div className="expertise-proof content-width">
          <span><MobileOutlined /> Responsivo de verdade</span>
          <span><SafetyCertificateOutlined /> Base segura e sustentável</span>
          <span><ThunderboltOutlined /> Performance como padrão</span>
          <span><CheckOutlined /> Entrega pronta para uso real</span>
        </div>
      </section>

      <section id="processo" className="process-section content-width">
        <div className="section-index">
          <span>05</span>
          <p>Como acontece</p>
        </div>
        <motion.div className="process-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }}>
          <h2>Da conversa<br />ao <em>mundo real.</em></h2>
          <p>Um processo direto, colaborativo e sem caixa-preta.</p>
        </motion.div>
        <div className="process-list">
          {process.map((item) => (
            <motion.article key={item.number} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.14 }}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="contato" className="contact-section">
        <div className="contact-orbit orbit-one" aria-hidden="true" />
        <div className="contact-orbit orbit-two" aria-hidden="true" />
        <motion.div className="contact-content" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={stagger}>
          <motion.p variants={reveal}>TEM UMA IDEIA NA CABEÇA?</motion.p>
          <motion.h2 variants={reveal}>Vamos torná-la<br /><span>inesquecível.</span></motion.h2>
          <motion.a variants={reveal} className="contact-button" href={whatsappLink} target="_blank" rel="noreferrer">
            <WhatsAppOutlined />
            <span className="button-label">Começar uma conversa</span>
            <i><ArrowRightOutlined /></i>
          </motion.a>
        </motion.div>
        <footer>
          <div className="footer-identity">
            <div className="footer-brand">
              <strong className="footer-brand-symbol">E/S</strong>
              <span>Edvam Santos<br />Full Stack Developer</span>
            </div>
            <p>© {new Date().getFullYear()} — Feito com intenção e código.</p>
            <div className="footer-business-info" aria-label="Dados empresariais">
              <strong>Dados empresariais</strong>
              <span>CNPJ matriz atual: 60.604.470/0001-96</span>
              <span>CNPJ matriz antiga: 57.810.680/0001-26</span>
            </div>
          </div>
          <nav className="footer-map-section" aria-label="Mapa do site">
            <strong>Mapa do Site</strong>
            <div>
              {sectionNavItems.map((item) => (
                <a key={item.href} href={item.href}>{item.label}</a>
              ))}
              <a href="#processo">Processo</a>
            </div>
          </nav>
          <div className="footer-actions">
            <a className="footer-map-button" href="/mapa-do-site-e-seo/">
              <FileSearchOutlined />
              <span className="footer-map-full">Mapa do Site e SEO</span>
              <span className="footer-map-short">Mapa</span>
            </a>
            <div className="footer-socials" aria-label="Redes sociais">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </section>

      <AnimatePresence>
        {activeService && (
          <ServiceDetail
            service={activeService}
            onClose={() => setActiveService(null)}
          />
        )}
      </AnimatePresence>

      <a
        className={showFloatingContact ? 'floating-whatsapp' : 'floating-whatsapp is-hidden'}
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar pelo WhatsApp"
        aria-hidden={!showFloatingContact}
        tabIndex={showFloatingContact ? undefined : -1}
      >
        <WhatsAppOutlined />
        <span className="floating-label">Vamos conversar</span>
      </a>

      <button
        className={showBackToTop ? 'back-to-top visible' : 'back-to-top'}
        type="button"
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
      >
        <UpOutlined />
      </button>
    </main>
  );
};

export default Home;
