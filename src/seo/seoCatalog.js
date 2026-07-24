const SITE_URL =
  process.env.REACT_APP_SITE_URL ||
  process.env.SEO_SITE_URL ||
  'https://portfolio-edvam-santos.vercel.app';

const AUTHOR = {
  name: 'Edvam Santos',
  role: 'Desenvolvedor Full Stack',
  city: 'São Paulo',
  region: 'SP',
  country: 'BR',
  linkedin: 'https://www.linkedin.com/in/mycosmus/',
  github: 'https://www.github.com/MitoCoder',
};

const clusters = [
  {
    slug: 'desenvolvimento-de-sites-profissionais',
    title: 'Desenvolvimento de sites profissionais',
    keyword: 'desenvolvimento de sites profissionais',
    solution: 'sites rápidos, acessíveis e orientados à conversão',
    problem: 'uma presença digital genérica, lenta ou difícil de encontrar',
    result: 'transformar visitas em contatos qualificados',
    audience: 'empresas e profissionais que precisam apresentar valor com clareza',
    technologies: ['React', 'HTML semântico', 'CSS responsivo', 'SEO técnico'],
  },
  {
    slug: 'criacao-de-landing-pages',
    title: 'Criação de landing pages',
    keyword: 'criação de landing pages',
    solution: 'páginas de campanha objetivas, rápidas e mensuráveis',
    problem: 'campanhas que recebem cliques, mas não conduzem o visitante à ação',
    result: 'aumentar a qualidade dos leads e a eficiência da mídia',
    audience: 'negócios que validam ofertas, lançam produtos ou captam oportunidades',
    technologies: ['React', 'Analytics', 'Core Web Vitals', 'testes de conversão'],
  },
  {
    slug: 'desenvolvimento-de-sistemas-web',
    title: 'Desenvolvimento de sistemas web',
    keyword: 'desenvolvimento de sistemas web',
    solution: 'sistemas web seguros, responsivos e simples de operar',
    problem: 'processos importantes espalhados entre planilhas, mensagens e retrabalho',
    result: 'centralizar a operação e dar visibilidade para as decisões',
    audience: 'equipes que precisam controlar rotinas, usuários, prazos e dados',
    technologies: ['React', 'Node.js', 'APIs REST', 'SQL'],
  },
  {
    slug: 'software-sob-medida',
    title: 'Software sob medida',
    keyword: 'software sob medida',
    solution: 'produtos digitais alinhados às regras reais de cada negócio',
    problem: 'ferramentas genéricas que obrigam a empresa a adaptar sua operação',
    result: 'reduzir limitações e criar uma base preparada para evoluir',
    audience: 'operações com fluxos, permissões ou integrações específicas',
    technologies: ['arquitetura modular', 'React', 'Node.js', 'bancos de dados'],
  },
  {
    slug: 'automacao-de-processos',
    title: 'Automação de processos',
    keyword: 'automação de processos',
    solution: 'automações confiáveis para rotinas repetitivas e sensíveis a erro',
    problem: 'tempo perdido com cópias, conferências, avisos e atualizações manuais',
    result: 'ganhar produtividade, rastreabilidade e consistência operacional',
    audience: 'equipes administrativas, financeiras, comerciais e operacionais',
    technologies: ['webhooks', 'Node.js', 'filas', 'integrações'],
  },
  {
    slug: 'integracao-de-apis',
    title: 'Integração de APIs',
    keyword: 'integração de APIs',
    solution: 'conexões documentadas e observáveis entre sistemas e serviços',
    problem: 'dados duplicados, integrações frágeis e informações desencontradas',
    result: 'fazer os dados circularem com segurança e menos intervenção manual',
    audience: 'empresas que usam diferentes plataformas na mesma operação',
    technologies: ['APIs REST', 'webhooks', 'OAuth', 'serverless'],
  },
  {
    slug: 'dashboards-e-indicadores',
    title: 'Dashboards e indicadores',
    keyword: 'desenvolvimento de dashboards',
    solution: 'painéis objetivos que transformam dados operacionais em decisões',
    problem: 'relatórios demorados e pouca clareza sobre gargalos ou resultados',
    result: 'acompanhar o que importa sem depender de consolidações manuais',
    audience: 'gestores que precisam de KPIs confiáveis e atualizados',
    technologies: ['React', 'visualização de dados', 'SQL', 'APIs'],
  },
  {
    slug: 'modernizacao-de-sistemas-legados',
    title: 'Modernização de sistemas legados',
    keyword: 'modernização de sistemas legados',
    solution: 'evolução técnica gradual, mensurável e compatível com a operação',
    problem: 'sistemas lentos, inseguros ou difíceis de manter sem interromper o negócio',
    result: 'reduzir risco técnico e recuperar a capacidade de evolução',
    audience: 'empresas que dependem de software antigo em processos críticos',
    technologies: ['migração incremental', 'APIs', 'testes', 'monitoramento'],
  },
  {
    slug: 'ecommerce-e-funis-de-vendas',
    title: 'E-commerce e funis de vendas',
    keyword: 'desenvolvimento de e-commerce',
    solution: 'jornadas de compra rápidas, claras e conectadas ao negócio',
    problem: 'lojas e funis com atrito, baixa confiança ou manutenção difícil',
    result: 'facilitar a decisão de compra e acompanhar cada etapa da conversão',
    audience: 'marcas, produtores e operações que vendem produtos ou serviços online',
    technologies: ['checkout', 'analytics', 'SEO', 'integrações de pagamento'],
  },
  {
    slug: 'aplicativos-web-pwa',
    title: 'Aplicativos web e PWA',
    keyword: 'desenvolvimento de aplicativo web',
    solution: 'aplicações instaláveis e responsivas com experiência consistente',
    problem: 'fluxos que precisam funcionar bem em campo, no celular e no desktop',
    result: 'entregar acesso rápido sem aumentar desnecessariamente a complexidade',
    audience: 'operações móveis, equipes externas e produtos digitais',
    technologies: ['PWA', 'React', 'cache offline', 'APIs'],
  },
  {
    slug: 'seo-tecnico-e-performance',
    title: 'SEO técnico e performance',
    keyword: 'SEO técnico e performance',
    solution: 'sites rastreáveis, rápidos e semanticamente compreensíveis',
    problem: 'conteúdo relevante que não ganha visibilidade por falhas técnicas',
    result: 'melhorar descoberta, indexação e experiência de navegação',
    audience: 'sites que precisam crescer de forma orgânica e sustentável',
    technologies: ['Schema.org', 'Core Web Vitals', 'sitemaps', 'HTML semântico'],
  },
  {
    slug: 'consultoria-e-arquitetura-de-software',
    title: 'Consultoria e arquitetura de software',
    keyword: 'consultoria em arquitetura de software',
    solution: 'decisões técnicas conectadas ao risco, custo e momento do produto',
    problem: 'crescimento sem direção, retrabalho e escolhas difíceis de sustentar',
    result: 'priorizar investimentos e construir uma evolução tecnicamente coerente',
    audience: 'times e negócios que precisam validar ou reorganizar sua base técnica',
    technologies: ['arquitetura', 'discovery', 'roadmap', 'qualidade de software'],
  },
];

const sectors = [
  { slug: 'logistica-e-transportes', name: 'logística e transportes', context: 'prazos, movimentações, ocorrências, OTIF, SLA e rastreabilidade' },
  { slug: 'industria', name: 'indústria', context: 'produção, ordens, capacidade, qualidade, estoque e manutenção' },
  { slug: 'varejo', name: 'varejo', context: 'catálogo, vendas, estoque, atendimento, margem e recorrência' },
  { slug: 'servicos-profissionais', name: 'serviços profissionais', context: 'propostas, agenda, entregas, clientes, documentos e faturamento' },
  { slug: 'construcao-civil', name: 'construção civil', context: 'obras, medições, materiais, equipes, prazos e custos' },
  { slug: 'clinicas-e-saude', name: 'clínicas e saúde', context: 'agendamentos, jornadas de atendimento, permissões e proteção de dados' },
  { slug: 'educacao', name: 'educação', context: 'conteúdo, matrículas, acompanhamento, comunicação e experiência do aluno' },
  { slug: 'financeiro', name: 'financeiro', context: 'aprovações, cobranças, conciliações, vencimentos e auditoria' },
  { slug: 'recursos-humanos', name: 'recursos humanos', context: 'jornadas, documentos, solicitações, históricos e indicadores' },
  { slug: 'locacao-de-equipamentos', name: 'locação de equipamentos', context: 'disponibilidade, contratos, retiradas, devoluções, manutenção e cobrança' },
  { slug: 'industria-grafica', name: 'indústria gráfica', context: 'orçamentos, planos de corte, produção, materiais e aproveitamento' },
  { slug: 'startups-e-saas', name: 'startups e SaaS', context: 'validação, onboarding, métricas, escala, integrações e evolução do produto' },
];

const guideAngles = [
  { slug: 'planejamento-do-projeto', label: 'planejamento do projeto', intent: 'planejar', focus: 'objetivos, usuários, escopo e critérios de sucesso' },
  { slug: 'quanto-custa', label: 'custos e orçamento', intent: 'estimar o investimento em', focus: 'complexidade, riscos, integrações e manutenção' },
  { slug: 'quanto-tempo-leva', label: 'prazo de desenvolvimento', intent: 'estimar o prazo de', focus: 'etapas, dependências, validações e entregas incrementais' },
  { slug: 'como-escolher-um-fornecedor', label: 'escolha do fornecedor', intent: 'contratar', focus: 'experiência, comunicação, processo e capacidade técnica' },
  { slug: 'checklist-de-requisitos', label: 'checklist de requisitos', intent: 'especificar', focus: 'regras, perfis, dados, integrações e cenários de exceção' },
  { slug: 'erros-mais-comuns', label: 'erros mais comuns', intent: 'evitar erros em', focus: 'atalhos frágeis, falta de validação e decisões sem contexto' },
  { slug: 'boas-praticas-de-ux', label: 'boas práticas de UX', intent: 'melhorar a experiência de', focus: 'clareza, acessibilidade, feedback e redução de atrito' },
  { slug: 'seguranca-e-lgpd', label: 'segurança e LGPD', intent: 'proteger', focus: 'acessos, minimização de dados, registros e responsabilidades' },
  { slug: 'seo-e-descoberta', label: 'SEO e descoberta', intent: 'aumentar a descoberta de', focus: 'semântica, intenção de busca, indexação e autoridade' },
  { slug: 'performance-e-core-web-vitals', label: 'performance e Core Web Vitals', intent: 'acelerar', focus: 'carregamento, estabilidade visual, interação e eficiência' },
  { slug: 'manutencao-e-evolucao', label: 'manutenção e evolução', intent: 'manter e evoluir', focus: 'monitoramento, prioridades, documentação e dívida técnica' },
  { slug: 'metricas-e-resultados', label: 'métricas e resultados', intent: 'medir o resultado de', focus: 'indicadores, eventos, qualidade, adoção e retorno' },
];

const faqAngles = [
  { slug: 'vale-a-pena-investir', question: 'Vale a pena investir?', decision: 'o impacto esperado e o custo de continuar com o problema atual' },
  { slug: 'como-funciona-o-projeto', question: 'Como funciona o projeto?', decision: 'descoberta, definição, construção, validação e evolução' },
  { slug: 'qual-e-o-investimento', question: 'Qual é o investimento necessário?', decision: 'escopo, complexidade, integrações e nível de acabamento' },
  { slug: 'qual-e-o-prazo', question: 'Qual é o prazo médio?', decision: 'tamanho do escopo, disponibilidade para validar e riscos técnicos' },
  { slug: 'quais-tecnologias-usar', question: 'Quais tecnologias usar?', decision: 'necessidade real, maturidade do ecossistema e custo de manutenção' },
  { slug: 'como-criar-um-briefing', question: 'Como preparar um briefing?', decision: 'objetivo, público, contexto, restrições e resultado esperado' },
  { slug: 'como-medir-o-retorno', question: 'Como medir o retorno?', decision: 'métricas ligadas a receita, tempo, qualidade, adoção ou redução de risco' },
  { slug: 'pode-integrar-com-outros-sistemas', question: 'É possível integrar com outros sistemas?', decision: 'documentação, autenticação, limites e qualidade dos dados disponíveis' },
  { slug: 'como-garantir-seguranca', question: 'Como garantir segurança?', decision: 'privilégio mínimo, validações, registros, atualizações e monitoramento' },
  { slug: 'funciona-no-celular', question: 'Funciona bem no celular?', decision: 'prioridade mobile, testes reais, acessibilidade e performance' },
  { slug: 'precisa-de-manutencao', question: 'Precisa de manutenção?', decision: 'criticidade, dependências, uso, mudanças do negócio e segurança' },
  { slug: 'como-comecar', question: 'Como começar?', decision: 'uma conversa objetiva sobre problema, prioridade, usuários e restrições' },
];

const comparisons = [
  { slug: 'solucao-pronta-ou-sob-medida', label: 'solução pronta ou sob medida', left: 'solução pronta', right: 'desenvolvimento sob medida' },
  { slug: 'equipe-interna-ou-especialista', label: 'equipe interna ou especialista', left: 'equipe interna', right: 'especialista externo' },
  { slug: 'projeto-fechado-ou-evolucao-continua', label: 'projeto fechado ou evolução contínua', left: 'projeto com escopo fechado', right: 'evolução contínua' },
];

const caseAngles = [
  { slug: 'reducao-de-retrabalho', label: 'redução de retrabalho', before: 'tarefas duplicadas, conferências manuais e informação dispersa', after: 'um fluxo centralizado, verificável e mais simples de acompanhar' },
  { slug: 'crescimento-com-controle', label: 'crescimento com controle', before: 'uma solução que já não acompanhava o volume e a complexidade da operação', after: 'uma base modular com indicadores e prioridades de evolução claras' },
];

const cleanSentence = (value) => value.charAt(0).toUpperCase() + value.slice(1);
const pagePath = (path) => (path.endsWith('/') ? path : `${path}/`);
const toUrl = (path) => `${SITE_URL.replace(/\/$/, '')}${pagePath(path)}`;
const trimMetaDescription = (value, limit = 158) => {
  if (value.length <= limit) return value;
  const shortened = value.slice(0, limit - 1);
  return `${shortened.slice(0, shortened.lastIndexOf(' '))}…`;
};

function commonFaq(cluster, subject) {
  return [
    {
      question: `Como saber se ${subject} é prioridade agora?`,
      answer: `O melhor sinal é a existência de um impacto observável: ${cluster.problem}. Antes de definir tecnologia, vale medir frequência, custo, risco e quem é afetado pelo problema.`,
    },
    {
      question: `O que deve ser definido antes de começar ${subject}?`,
      answer: `Objetivo, usuários, regras críticas, dados disponíveis, integrações e critérios de sucesso. Essa definição reduz retrabalho sem transformar o início do projeto em uma documentação interminável.`,
    },
    {
      question: `Como avaliar a qualidade da entrega?`,
      answer: `A avaliação combina experiência de uso, acessibilidade, segurança, desempenho, estabilidade e resultado para o negócio. Código é parte da entrega; adoção e impacto também precisam ser acompanhados.`,
    },
  ];
}

function pillarPage(cluster) {
  const subject = cluster.keyword;
  return {
    slug: cluster.slug,
    path: `/conteudos/${cluster.slug}/`,
    clusterSlug: cluster.slug,
    type: 'service',
    typeLabel: 'Serviço',
    title: `${cluster.title}: estratégia, desenvolvimento e evolução`,
    h1: cluster.title,
    description: `${cluster.title} com foco em ${cluster.result}. Conheça abordagem, etapas, tecnologias e critérios para uma entrega sustentável.`,
    keyword: subject,
    secondaryKeywords: [cluster.solution, cluster.result, ...cluster.technologies],
    intro: [
      `${cleanSentence(cluster.solution)} não começam pela ferramenta. O trabalho começa entendendo o contexto, as pessoas envolvidas e o resultado que precisa mudar.`,
      `A abordagem de Edvam Santos para ${subject} conecta produto, design e engenharia. O objetivo é resolver ${cluster.problem} e criar uma base que continue útil depois da primeira publicação.`,
    ],
    sections: [
      {
        title: `Quando investir em ${subject}`,
        paragraphs: [
          `O projeto faz sentido para ${cluster.audience}. Os sinais mais comuns são perda de tempo, dificuldade para medir resultados, experiência inconsistente e limitações que se repetem à medida que o negócio cresce.`,
          `A decisão deve considerar o custo do problema atual, o risco de permanecer como está e o ganho possível com ${cluster.result}. Esse diagnóstico evita escopos inflados e ajuda a priorizar o que entrega valor primeiro.`,
        ],
      },
      {
        title: 'Como a solução é construída',
        paragraphs: [
          `O processo passa por descoberta, arquitetura, prototipação, desenvolvimento, validação e publicação. Cada etapa produz decisões verificáveis e reduz incertezas antes que elas se tornem retrabalho.`,
          `Tecnologias como ${cluster.technologies.join(', ')} são escolhidas pelo contexto. A solução precisa ser compreensível para quem usa, sustentável para quem mantém e mensurável para quem decide.`,
        ],
      },
      {
        title: 'Qualidade técnica e resultado',
        paragraphs: [
          `A entrega considera acessibilidade, segurança, SEO quando aplicável, estabilidade visual, tempo de resposta e comportamento em dispositivos reais. Performance não é uma correção no fim; faz parte das escolhas desde o início.`,
          `Depois da publicação, eventos e indicadores ajudam a verificar adoção, erros e oportunidades. Assim, ${subject} evolui com evidências, sem depender apenas de opiniões ou tendências.`,
        ],
      },
    ],
    bullets: [
      'Diagnóstico do problema, usuários e resultado esperado',
      'Arquitetura de informação, dados e integrações',
      'Interface responsiva, acessível e validada por etapas',
      'Publicação, medição e plano de evolução',
    ],
    faq: commonFaq(cluster, subject),
  };
}

function sectorPage(cluster, sector) {
  const subject = `${cluster.keyword} para ${sector.name}`;
  return {
    slug: `para-${sector.slug}`,
    path: `/conteudos/${cluster.slug}/para-${sector.slug}/`,
    clusterSlug: cluster.slug,
    type: 'service',
    typeLabel: 'Solução por segmento',
    title: `${cluster.title} para ${sector.name}`,
    h1: `${cluster.title} para ${sector.name}`,
    description: `${cluster.title} para operações de ${sector.name}, considerando ${sector.context}. Veja abordagem, etapas e resultados esperados.`,
    keyword: subject,
    secondaryKeywords: [cluster.result, sector.context, ...cluster.technologies],
    intro: [
      `Em ${sector.name}, uma solução digital precisa respeitar rotinas, responsabilidades e exceções que já existem no trabalho. Nesse contexto, ${sector.context} não podem ser tratados como detalhes.`,
      `${cleanSentence(cluster.solution)} ajudam a enfrentar ${cluster.problem}. O projeto transforma necessidades operacionais em fluxos claros, dados confiáveis e decisões que podem ser acompanhadas.`,
    ],
    sections: [
      {
        title: `Desafios de ${sector.name}`,
        paragraphs: [
          `Projetos neste segmento costumam reunir diferentes perfis, prazos e fontes de informação. Sem uma arquitetura clara, pequenas inconsistências viram retrabalho, perda de histórico e decisões tardias.`,
          `O diagnóstico mapeia como ${sector.context} se relacionam, onde estão os gargalos e quais controles realmente precisam existir. A prioridade é resolver a causa, e não apenas digitalizar uma rotina confusa.`,
        ],
      },
      {
        title: `Como aplicar ${cluster.keyword}`,
        paragraphs: [
          `A construção começa com um recorte de alto valor e evolui em ciclos curtos. Regras críticas, permissões, integrações e cenários de exceção são testados com quem participa da operação.`,
          `${cluster.technologies.join(', ')} podem fazer parte da solução, desde que contribuam para ${cluster.result}. A arquitetura permanece proporcional ao volume, ao risco e à capacidade de manutenção do negócio.`,
        ],
      },
      {
        title: 'Resultados que devem ser medidos',
        paragraphs: [
          `Os indicadores variam conforme o projeto, mas podem incluir tempo de execução, erros, adoção, conversão, disponibilidade, satisfação e redução de tarefas manuais.`,
          `O resultado esperado é ${cluster.result}, preservando clareza para a equipe e rastreabilidade para a gestão. A evolução passa a seguir dados reais do uso, não uma lista genérica de funcionalidades.`,
        ],
      },
    ],
    bullets: [
      `Mapeamento de ${sector.context}`,
      'Definição de usuários, responsabilidades e permissões',
      'Integrações e automações priorizadas por impacto',
      'Indicadores para acompanhar adoção e resultado',
    ],
    faq: commonFaq(cluster, subject),
  };
}

function guidePage(cluster, guide) {
  const subject = `${guide.label} em ${cluster.keyword}`;
  return {
    slug: guide.slug,
    path: `/guias/${cluster.slug}/${guide.slug}/`,
    clusterSlug: cluster.slug,
    type: 'article',
    typeLabel: 'Guia prático',
    title: `${cleanSentence(guide.label)} em ${cluster.title}: guia prático`,
    h1: `${cleanSentence(guide.label)} em ${cluster.title}`,
    description: `Guia para ${guide.intent} ${cluster.keyword}, cobrindo ${guide.focus}. Decida com mais clareza e reduza riscos no projeto.`,
    keyword: subject,
    secondaryKeywords: [guide.focus, cluster.result, ...cluster.technologies],
    intro: [
      `${cleanSentence(guide.intent)} ${cluster.keyword} exige mais do que uma lista de ferramentas. É preciso conectar ${guide.focus} ao resultado que o negócio realmente espera.`,
      `Este guia organiza os critérios essenciais para ${cluster.audience}, especialmente quando o desafio envolve ${cluster.problem}.`,
    ],
    sections: [
      {
        title: 'Comece pelo contexto e pelo resultado',
        paragraphs: [
          `Registre o problema em linguagem observável: quem é afetado, com que frequência, qual é o impacto e como a situação é resolvida hoje. Essa base melhora a conversa entre negócio, design e desenvolvimento.`,
          `O objetivo deve permitir uma comparação antes e depois. Para este tema, o norte é ${cluster.result}, com indicadores compatíveis com o estágio e o volume da operação.`,
        ],
      },
      {
        title: `Critérios para ${guide.label}`,
        paragraphs: [
          `${cleanSentence(guide.focus)} devem ser avaliados em conjunto. Uma decisão que parece rápida pode aumentar custo de manutenção, criar dependências ou transferir o problema para outra etapa da jornada.`,
          `Use cenários reais, incluindo erros e exceções. Eles revelam requisitos que raramente aparecem em uma descrição superficial e ajudam a escolher entre ${cluster.technologies.join(', ')}.`,
        ],
      },
      {
        title: 'Transforme o plano em entregas verificáveis',
        paragraphs: [
          `Divida o trabalho em resultados pequenos que possam ser demonstrados. Cada ciclo deve responder a uma pergunta importante e produzir aprendizado para o próximo.`,
          `Antes de ampliar o escopo, valide uso, desempenho, segurança e qualidade dos dados. Esse ritmo protege o investimento e mantém a solução alinhada ao trabalho real.`,
        ],
      },
    ],
    bullets: [
      'Defina um problema observável e um responsável pela decisão',
      `Documente ${guide.focus}`,
      'Valide os cenários críticos antes de ampliar o escopo',
      'Meça resultado, qualidade técnica e experiência de uso',
    ],
    faq: commonFaq(cluster, subject),
  };
}

function faqPage(cluster, faq) {
  const subject = `${cluster.keyword}: ${faq.question.toLowerCase()}`;
  return {
    slug: faq.slug,
    path: `/perguntas/${cluster.slug}/${faq.slug}/`,
    clusterSlug: cluster.slug,
    type: 'faq',
    typeLabel: 'Pergunta frequente',
    title: `${faq.question} ${cluster.title.toLowerCase()}`,
    h1: `${faq.question} ${cluster.title.toLowerCase()}`,
    description: `Resposta direta sobre ${cluster.keyword}: critérios, riscos e próximos passos para decidir com segurança e buscar ${cluster.result}.`,
    keyword: subject,
    secondaryKeywords: [faq.decision, cluster.result, ...cluster.technologies],
    intro: [
      `A resposta curta é: depende do contexto, mas a decisão pode ser objetiva. Em ${cluster.keyword}, o ponto central é avaliar ${faq.decision}.`,
      `Para ${cluster.audience}, a análise precisa comparar o investimento com o impacto de continuar enfrentando ${cluster.problem}.`,
    ],
    sections: [
      {
        title: 'Resposta direta',
        paragraphs: [
          `${cleanSentence(cluster.solution)} fazem sentido quando existe um resultado claro, usuários identificados e disposição para validar decisões durante o projeto.`,
          `A escolha não deve ser baseada apenas em preço ou tecnologia. Prazo, risco, manutenção, segurança, experiência e capacidade de evolução fazem parte do custo total.`,
        ],
      },
      {
        title: 'O que avaliar antes de decidir',
        paragraphs: [
          `Liste o problema atual, as pessoas envolvidas, os dados disponíveis, integrações necessárias e situações que não podem falhar. Depois, defina o menor resultado que já geraria valor.`,
          `Esse recorte permite comparar caminhos e entender se ${cluster.technologies.join(', ')} são adequadas. A tecnologia entra depois que o problema e os critérios estão claros.`,
        ],
      },
      {
        title: 'Próximo passo recomendado',
        paragraphs: [
          `Organize uma conversa curta com quem vive o processo e quem responde pelo resultado. Leve exemplos reais, números aproximados e as principais restrições.`,
          `Com esse material, é possível desenhar uma primeira hipótese, estimar riscos e decidir se o caminho contribui para ${cluster.result}.`,
        ],
      },
    ],
    bullets: [
      `Avalie ${faq.decision}`,
      'Compare custo de mudança e custo de permanecer como está',
      'Comece com um resultado pequeno e verificável',
      'Inclua manutenção, segurança e evolução na decisão',
    ],
    faq: [
      {
        question: `${faq.question} ${cluster.title.toLowerCase()}?`,
        answer: `A decisão depende de ${faq.decision}. O melhor caminho é relacionar esses critérios ao problema atual e ao resultado de ${cluster.result}.`,
      },
      ...commonFaq(cluster, subject).slice(1),
    ],
  };
}

function comparisonPage(cluster, comparison) {
  const subject = `${comparison.label} para ${cluster.keyword}`;
  return {
    slug: comparison.slug,
    path: `/comparativos/${cluster.slug}/${comparison.slug}/`,
    clusterSlug: cluster.slug,
    type: 'comparison',
    typeLabel: 'Comparativo',
    title: `${cleanSentence(comparison.label)} em ${cluster.title}`,
    h1: `${cleanSentence(comparison.left)} ou ${comparison.right}?`,
    description: `Compare ${comparison.left} e ${comparison.right} em projetos de ${cluster.keyword}. Entenda custos, riscos, velocidade e manutenção.`,
    keyword: subject,
    secondaryKeywords: [comparison.left, comparison.right, cluster.result],
    intro: [
      `A escolha entre ${comparison.left} e ${comparison.right} muda conforme maturidade, urgência, orçamento e risco. Não existe uma resposta universal para ${cluster.keyword}.`,
      `O comparativo abaixo considera o objetivo de ${cluster.result} sem ignorar manutenção, qualidade da experiência e capacidade de evolução.`,
    ],
    sections: [
      {
        title: `Quando ${comparison.left} faz mais sentido`,
        paragraphs: [
          `${cleanSentence(comparison.left)} tende a funcionar melhor quando os requisitos estão bem compreendidos, o contexto combina com essa abordagem e existe capacidade para sustentar as decisões no médio prazo.`,
          `O benefício precisa ser comparado ao risco de ${cluster.problem}. Uma escolha aparentemente econômica pode apenas adiar integração, personalização ou manutenção.`,
        ],
      },
      {
        title: `Quando ${comparison.right} é a melhor escolha`,
        paragraphs: [
          `${cleanSentence(comparison.right)} ganha força quando a diferenciação, as regras específicas ou a velocidade de aprendizado são decisivas. O escopo pode começar menor e evoluir com uso real.`,
          `Nesse caminho, ${cluster.technologies.join(', ')} devem ser selecionadas pela adequação ao problema, pela maturidade e pela disponibilidade de manutenção.`,
        ],
      },
      {
        title: 'Como tomar a decisão',
        paragraphs: [
          `Compare as alternativas nos mesmos critérios: tempo para gerar valor, custo total, dependências, segurança, experiência, flexibilidade e risco de continuidade.`,
          `Se a escolha contribuir para ${cluster.result} e houver uma forma objetiva de acompanhar esse resultado, a decisão deixa de ser preferência técnica e passa a ser estratégia.`,
        ],
      },
    ],
    bullets: [
      'Compare custo total, e não apenas custo inicial',
      'Considere urgência, diferenciação e dependências',
      'Verifique quem manterá a solução depois da entrega',
      'Defina indicadores para revisar a escolha',
    ],
    faq: commonFaq(cluster, subject),
  };
}

function casePage(cluster, caseAngle) {
  const subject = `${cluster.keyword} para ${caseAngle.label}`;
  return {
    slug: caseAngle.slug,
    path: `/estudos/${cluster.slug}/${caseAngle.slug}/`,
    clusterSlug: cluster.slug,
    type: 'case',
    typeLabel: 'Estudo aplicado',
    title: `${cluster.title}: estudo de ${caseAngle.label}`,
    h1: `Como ${cluster.keyword} apoia ${caseAngle.label}`,
    description: `Estudo aplicado de ${cluster.keyword}: do cenário com ${caseAngle.before} a uma solução voltada a ${caseAngle.after}.`,
    keyword: subject,
    secondaryKeywords: [caseAngle.before, caseAngle.after, cluster.result],
    intro: [
      `Este estudo apresenta uma situação recorrente, sem expor dados confidenciais: ${caseAngle.before}. O objetivo é mostrar como as decisões são organizadas, e não vender uma fórmula pronta.`,
      `A hipótese de trabalho usa ${cluster.solution} para chegar a ${caseAngle.after}, mantendo o foco em ${cluster.result}.`,
    ],
    sections: [
      {
        title: 'Cenário e diagnóstico',
        paragraphs: [
          `O primeiro passo é observar o fluxo atual, seus responsáveis, entradas, saídas e exceções. Problemas de tecnologia frequentemente escondem regras indefinidas ou informação que chega tarde.`,
          `O diagnóstico transforma percepções em evidências: frequência, tempo, erros, impacto e risco. Isso permite separar urgência real de funcionalidades apenas desejáveis.`,
        ],
      },
      {
        title: 'Decisões de solução',
        paragraphs: [
          `A solução prioriza o trecho do processo com melhor relação entre valor e risco. Fluxos, permissões, dados e integrações são prototipados antes da expansão.`,
          `${cluster.technologies.join(', ')} formam possibilidades, não obrigações. A arquitetura deve ser suficiente para o volume atual e deixar caminhos claros para crescimento.`,
        ],
      },
      {
        title: 'Resultado e continuidade',
        paragraphs: [
          `O estado esperado é ${caseAngle.after}. Para verificar a mudança, são acompanhados indicadores de tempo, qualidade, adoção e ocorrências.`,
          `A continuidade inclui monitoramento, documentação e uma fila de melhorias baseada no uso. Assim, o projeto avança em direção a ${cluster.result} sem perder controle técnico.`,
        ],
      },
    ],
    bullets: [
      'Diagnóstico baseado em fluxo, dados e ocorrências reais',
      'Escopo inicial priorizado por valor e risco',
      'Validação com usuários e responsáveis pelo resultado',
      'Evolução orientada por métricas de uso e qualidade',
    ],
    faq: commonFaq(cluster, subject),
  };
}

const pages = [];

clusters.forEach((cluster) => {
  pages.push(pillarPage(cluster));
  sectors.forEach((sector) => pages.push(sectorPage(cluster, sector)));
  guideAngles.forEach((guide) => pages.push(guidePage(cluster, guide)));
  faqAngles.forEach((faq) => pages.push(faqPage(cluster, faq)));
  comparisons.forEach((comparison) => pages.push(comparisonPage(cluster, comparison)));
  caseAngles.forEach((caseAngle) => pages.push(casePage(cluster, caseAngle)));
});

pages.forEach((page) => {
  page.description = trimMetaDescription(page.description);
});

const pagesByPath = Object.fromEntries(pages.map((page) => [pagePath(page.path), page]));
const pagesByCluster = Object.fromEntries(
  clusters.map((cluster) => [
    cluster.slug,
    pages.filter((page) => page.clusterSlug === cluster.slug),
  ])
);

pages.forEach((page) => {
  const siblings = pagesByCluster[page.clusterSlug];
  const pillar = siblings[0];
  const currentIndex = siblings.findIndex((item) => item.path === page.path);
  const candidates = [
    pillar,
    siblings[(currentIndex + 1) % siblings.length],
    siblings[(currentIndex + 7) % siblings.length],
    siblings[(currentIndex + 15) % siblings.length],
    siblings[(currentIndex + 26) % siblings.length],
    pagesByCluster[clusters[(clusters.findIndex((item) => item.slug === page.clusterSlug) + 1) % clusters.length].slug][0],
  ];

  page.related = Array.from(new Map(candidates.map((item) => [item.path, item])).values())
    .filter((item) => item.path !== page.path)
    .slice(0, 5)
    .map((item) => ({
      path: item.path,
      title: item.h1,
      typeLabel: item.typeLabel,
    }));
  page.canonical = toUrl(page.path);
});

function getPageByPath(pathname) {
  const normalized = pagePath(pathname.replace(/\/index\.html$/, '/'));
  return pagesByPath[normalized] || null;
}

function getCluster(slug) {
  return clusters.find((cluster) => cluster.slug === slug) || null;
}

module.exports = {
  AUTHOR,
  SITE_URL,
  clusters,
  pages,
  pagesByCluster,
  getCluster,
  getPageByPath,
  pagePath,
  toUrl,
};
