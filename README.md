# SISTEMA 5W2H

[![forthebadge](https://forthebadge.com/api/badges/generate?panels=2&primaryLabel=CRIADO+COM&secondaryLabel=TYPESCRIPT&primaryBGColor=%2331C4F3&primaryTextColor=%23FFFFFF&secondaryBGColor=%23389AD5&secondaryTextColor=%23FFFFFF&primaryFontSize=12&primaryFontWeight=600&primaryLetterSpacing=2&primaryFontFamily=Roboto&primaryTextTransform=uppercase&secondaryFontSize=12&secondaryFontWeight=900&secondaryLetterSpacing=2&secondaryFontFamily=Montserrat&secondaryTextTransform=uppercase&secondaryIcon=typescript&secondaryIconColor=%23FFFFFF&secondaryIconSize=16&secondaryIconPosition=left)](https://www.typescriptlang.org/)
[![forthebadge](https://forthebadge.com/api/badges/generate?panels=2&primaryLabel=CRIADO+COM&secondaryLabel=VITE&primaryBGColor=%23e356f5&primaryTextColor=%23FFFFFF&secondaryBGColor=%23ac39d5&secondaryTextColor=%23FFFFFF&primaryFontSize=12&primaryFontWeight=600&primaryLetterSpacing=2&primaryFontFamily=Roboto&primaryTextTransform=uppercase&secondaryFontSize=12&secondaryFontWeight=900&secondaryLetterSpacing=2&secondaryFontFamily=Montserrat&secondaryTextTransform=uppercase&secondaryIcon=vite&secondaryIconColor=%23FFFFFF&secondaryIconSize=16&secondaryIconPosition=left)](https://vite.dev/)
[![forthebadge](https://forthebadge.com/api/badges/generate?panels=2&primaryLabel=CRIADO+COM&secondaryLabel=LARAVEL&primaryBGColor=%23fe5c34&primaryTextColor=%23FFFFFF&secondaryBGColor=%23d63600&secondaryTextColor=%23FFFFFF&primaryFontSize=12&primaryFontWeight=600&primaryLetterSpacing=2&primaryFontFamily=Roboto&primaryTextTransform=uppercase&secondaryFontSize=12&secondaryFontWeight=900&secondaryLetterSpacing=2&secondaryFontFamily=Montserrat&secondaryTextTransform=uppercase&secondaryIcon=laravel&secondaryIconColor=%23FFFFFF&secondaryIconSize=16&secondaryIconPosition=left)](https://laravel.com/)
[![forthebadge](https://forthebadge.com/api/badges/generate?panels=2&primaryLabel=CRIADO+COM&secondaryLabel=DOCKER&primaryBGColor=%2331C4F3&primaryTextColor=%23FFFFFF&secondaryBGColor=%23389AD5&secondaryTextColor=%23FFFFFF&primaryFontSize=12&primaryFontWeight=600&primaryLetterSpacing=2&primaryFontFamily=Roboto&primaryTextTransform=uppercase&secondaryFontSize=12&secondaryFontWeight=900&secondaryLetterSpacing=2&secondaryFontFamily=Montserrat&secondaryTextTransform=uppercase&secondaryIcon=docker&secondaryIconColor=%23FFFFFF&secondaryIconSize=16&secondaryIconPosition=left)](https://www.docker.com/)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

## Sobre o Projeto

Um sistema SaaS (Software as a Service) robusto para gerenciamento de planos de ação que implementa a metodologia de gestão **5W2H** (What, Why, Where, When, Who, How, How much).

Desenvolvido com uma arquitetura moderna separando responsabilidades, o projeto utiliza **Laravel (API)** para o backend e **React com TypeScript** para o frontend. A plataforma permite que empresas se cadastrem e gerenciem suas metas, desdobrando-as em planos de ação detalhados, etapas e delegando responsáveis, tudo acompanhado através de dashboards interativos.

O ambiente de desenvolvimento é totalmente containerizado com **Docker**, garantindo consistência e facilidade na implantação.

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Backend (API)](#backend-api)
  - [Frontend (SPA)](#frontend-spa)
  - [DevOps & Infraestrutura](#devops-&-infraestrutura)
- [Funcionalidades](#funcionalidades)
  - [Módulo Administrativo](#modulo-administrativo)
  - [Módulo da Empresa (Cliente)](#modulo-da-empresa-cliente)
- [Estrutura de pastas](#estrutura-pastas)

## Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

### Backend (API)
- **PHP 8.1+**
- **Laravel 10** (Framework PHP)
- **Laravel Sanctum** (Autenticação via Token)
- **MySQL** (Banco de Dados)
- **PHPMyAdmin** (Gerenciamento de DB)

### Frontend (SPA)
- **React 18**
- **TypeScript**
- **Vite** (Build Tool)
- **TailwindCSS** (Estilização)
- **Axios** (Requisições HTTP)
- **Chart.js & React-Chartjs-2** (Visualização de Dados/Gráficos)
- **React Router DOM** (Roteamento)
- **React Auth Kit** (Gestão de Estado de Autenticação)

### DevOps & Infraestrutura
- **Docker** & **Docker Compose**

---

## Funcionalidades

### Módulo Administrativo
- Login exclusivo para administradores do sistema.
- **Gestão de Empresas (Tenants):** Cadastro, edição e remoção de empresas que utilizarão a plataforma.

### Módulo da Empresa (Cliente)
- **Dashboard Interativo:** Visão geral do status das ações e metas.
- **Gestão de Metas (Goals):** Criação de objetivos macro.
- **Planejamento 5W2H:**
  - Criação de **Ações** vinculadas a metas.
  - Detalhamento de **Etapas** para cada ação.
  - Definição de prazos e custos.
- **Gestão de Responsáveis:** Cadastro de equipe e atribuição de tarefas.
- **Gestão de Áreas:** Organização por departamentos.
- **Controle de Status:** Acompanhamento visual do progresso (A fazer, Em andamento, Concluído).

---

## Estrutura de pastas

```text
5w2h-planner/
├── backend/            # API Laravel
│   ├── app/            # Controllers, Models, Middleware
│   ├── database/       # Migrations e Seeds
│   ├── routes/         # Definição das rotas da API (api.php)
│   └── ...
├── frontend/           # Aplicação React
│   ├── src/
│   │   ├── components/ # Componentes reutilizáveis (Cards, Menus, Inputs)
│   │   ├── contexts/   # Gerenciamento de estado global
│   │   ├── pages/      # Páginas da aplicação (Dashboard, Planning, Login)
│   │   ├── services/   # Configuração do Axios e API
│   │   └── ...
└── docker-compose.yml  # Orquestração dos containers
│   │   ├── contexts/   # Gerenciamento de estado global
│   │   ├── services/   # Configuração do Axios e API
│   │   └── ...
└── docker-compose.yml  # Orquestração dos containers
```
