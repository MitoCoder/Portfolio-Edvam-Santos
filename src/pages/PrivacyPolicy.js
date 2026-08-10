import React, { useEffect } from 'react';
import {
  ArrowLeftOutlined,
  CheckOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import seoCatalog from '../seo/seoCatalog';
import './SeoExperience.css';
import './PrivacyPolicy.css';

const policyPath = '/politica-de-privacidade/';
const canonical = seoCatalog.toUrl(policyPath);
const title = "Política de Privacidade | Ed's Plugin WhatsApp";
const description =
  "Política de Privacidade da extensão Ed's Plugin | WhatsApp, com informações sobre dados locais, licença, permissões e contato.";

function ensureMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
}

function usePrivacyMetadata() {
  useEffect(() => {
    document.title = title;
    ensureMeta('meta[name="description"]', { name: 'description', content: description });
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    ensureMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    ensureMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });
    ensureMeta('meta[name="robots"]', { name: 'robots', content: 'noindex, follow' });

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    window.scrollTo({ top: 0, left: 0 });
  }, []);
}

const storedData = [
  'Identificadores da instalação e da licença, como installId e clientKey.',
  'Datas de instalação, período de teste e status de ativação.',
  'Configurações criadas pelo usuário, como atendentes, frases prontas, etiquetas, ficha de cliente, follow-ups, modo privado, wallpaper e preferências do menu.',
  'Dados exportados ou importados pelo próprio usuário para backup de configurações.',
];

const permissions = [
  'storage: salvar localmente as configurações e dados de uso da extensão no navegador.',
  'tabs: identificar a aba do WhatsApp Web e aplicar a interface da extensão no contexto correto.',
  'alarms: executar verificações e rotinas internas relacionadas à ativação e funcionamento.',
  'https://web.whatsapp.com/*: inserir a interface e os recursos da extensão no WhatsApp Web.',
  'Serviço próprio de licenciamento: registrar instalação e consultar status de licença.',
];

function PrivacyPolicy() {
  usePrivacyMetadata();

  return (
    <div className="seo-experience privacy-policy-page">
      <header className="privacy-header">
        <a className="seo-brand" href="/" aria-label="Edvam Santos, página inicial">
          <strong>E/S</strong>
          <span>Edvam Santos</span>
        </a>
        <span className="privacy-header-label">Documento público da extensão</span>
      </header>

      <main>
        <article className="privacy-document">
          <nav className="privacy-breadcrumb" aria-label="Breadcrumb">
            <a href="/"><ArrowLeftOutlined /> Portfólio</a>
            <span>/</span>
            <span aria-current="page">Política de Privacidade</span>
          </nav>

          <header className="privacy-hero">
            <span className="seo-eyebrow">ED'S PLUGIN | WHATSAPP</span>
            <h1>Política de Privacidade</h1>
            <p>
              Esta política descreve como a extensão Ed's Plugin | WhatsApp lida
              com informações, permissões do navegador, armazenamento local e
              consulta de licença.
            </p>
            <div className="privacy-summary" aria-label="Resumo da política">
              <span><LockOutlined /> Dados operacionais salvos localmente</span>
              <span><SafetyCertificateOutlined /> Licença verificada por serviço próprio</span>
              <span><CheckOutlined /> Sem venda de dados pessoais</span>
            </div>
          </header>

          <div className="privacy-content">
            <section>
              <h2>1. Identificação</h2>
              <p>
                A extensão Ed's Plugin | WhatsApp foi desenvolvida por Edvam
                Santos para transformar o WhatsApp Web em uma central de
                atendimento com recursos de organização, produtividade,
                identificação de atendente, frases prontas, etiquetas,
                follow-ups, propostas rápidas e ferramentas auxiliares.
              </p>
              <p>
                Esta política se aplica somente ao uso da extensão no navegador
                Google Chrome ou em navegadores compatíveis com extensões
                Manifest V3.
              </p>
            </section>

            <section>
              <h2>2. Informações armazenadas pela extensão</h2>
              <p>
                A extensão utiliza o armazenamento local do navegador
                chrome.storage.local para manter dados necessários ao seu
                funcionamento. Esses dados ficam no dispositivo do usuário, salvo
                quando uma ação específica de licença exigir comunicação com a
                serviço próprio de licenciamento.
              </p>
              <ul>
                {storedData.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section>
              <h2>3. Verificação de licença</h2>
              <p>
                Para registrar a instalação e verificar o status da licença, a
                extensão se comunica com um serviço próprio de licenciamento.
              </p>
              <p>
                Nessa comunicação podem ser enviados identificadores técnicos da
                instalação, chave do cliente, versão da extensão, datas de teste
                e informações básicas do navegador necessárias para controle de
                ativação, prevenção de uso indevido e suporte ao funcionamento
                da licença.
              </p>
            </section>

            <section>
              <h2>4. Permissões usadas</h2>
              <p>
                A extensão solicita apenas permissões relacionadas ao seu
                propósito de funcionar dentro do WhatsApp Web e manter
                configurações locais:
              </p>
              <ul>
                {permissions.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section>
              <h2>5. Conteúdo do WhatsApp Web</h2>
              <p>
                A extensão roda dentro do WhatsApp Web para adicionar recursos de
                atendimento. Ela pode interagir com elementos da página para
                aplicar identificadores, etiquetas, textos prontos e recursos
                visuais solicitados pelo usuário.
              </p>
              <p>
                A extensão não tem como objetivo vender, compartilhar ou
                monetizar mensagens, conversas, contatos ou conteúdo do WhatsApp.
                O usuário é responsável pelo uso da ferramenta de acordo com as
                regras do WhatsApp, leis aplicáveis e políticas internas do seu
                atendimento.
              </p>
            </section>

            <section>
              <h2>6. Compartilhamento de dados</h2>
              <p>
                Os dados não são vendidos. O compartilhamento externo é limitado
                ao serviço próprio de licenciamento usado para registrar instalação, consultar
                ativação e manter o controle de acesso ao produto. A API pode
                registrar essas informações em infraestrutura própria para fins
                operacionais, suporte, segurança e gestão de licença.
              </p>
              <p>
                O uso das informações pela extensão observa a Política de Dados
                do Usuário da Chrome Web Store, incluindo os requisitos de
                Limited Use: os dados são usados somente para fornecer ou
                melhorar a finalidade declarada da extensão e não são usados para
                publicidade personalizada, venda de dados ou determinação de
                crédito.
              </p>
            </section>

            <section>
              <h2>7. Segurança e retenção</h2>
              <p>
                As configurações ficam armazenadas localmente no navegador e
                podem ser removidas ao limpar os dados do Chrome, desinstalar a
                extensão ou usar recursos de backup/exportação/importação
                disponíveis na própria ferramenta.
              </p>
              <p>
                Nenhum sistema é completamente imune a falhas. Por isso, o
                usuário deve evitar inserir segredos, senhas, dados bancários ou
                informações excessivamente sensíveis em campos livres da
                extensão.
              </p>
            </section>

            <section>
              <h2>8. Direitos do usuário</h2>
              <p>
                O usuário pode remover a extensão a qualquer momento, limpar os
                dados locais no navegador e solicitar informações sobre registros
                de licença vinculados à sua instalação. Solicitações podem ser
                feitas pelo canal de contato informado nesta política.
              </p>
            </section>

            <section>
              <h2>9. Alterações nesta política</h2>
              <p>
                Esta política pode ser atualizada para refletir mudanças na
                extensão, no serviço de licenciamento, nas permissões usadas ou em
                requisitos legais e de plataforma. A versão publicada nesta URL
                será considerada a versão vigente.
              </p>
            </section>

            <section>
              <h2>10. Contato</h2>
              <p>
                Para dúvidas sobre esta política ou sobre o tratamento de dados
                relacionado à extensão, entre em contato com Edvam Santos pelo
                portfólio oficial:
              </p>
              <a className="privacy-contact-link" href="/">
                portfolio-edvam-santos.vercel.app
              </a>
            </section>
          </div>

          <footer className="privacy-document-footer">
            <span>Última atualização: 7 de agosto de 2026</span>
            <span>Ed's Sistemas e Sites - CNPJ 60.604.470/0001-96</span>
          </footer>
        </article>
      </main>
    </div>
  );
}

export default PrivacyPolicy;
