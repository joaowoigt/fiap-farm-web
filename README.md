# 🌱 FIAP Farm - Sistema de Gestão Agrícola Digital

Bem-vindo ao **FIAP Farm**, um sistema completo de gestão agrícola digital desenvolvido como resultado do Hackathon do curso de Engenharia de Frontend da FIAP + Alura. Este projeto demonstra a aplicação de conceitos modernos de desenvolvimento frontend, arquitetura de microfrontends e práticas avançadas de engenharia de software.

## 📋 Introdução

O FIAP Farm é uma plataforma digital inovadora que permite aos produtores rurais gerenciar de forma eficiente suas operações agrícolas. O sistema oferece funcionalidades completas para:

- **Controle de Produção**: Gerencie e monitore toda a produção agrícola com categorização por tipos (culturas, pecuária, laticínios)
- **Gestão de Vendas**: Registre e acompanhe todas as vendas realizadas com controle de estoque automatizado
- **Definição de Metas**: Estabeleça objetivos de produção e vendas com acompanhamento visual do progresso
- **Dashboard Analítico**: Visualize dados importantes através de gráficos interativos e métricas em tempo real
- **Autenticação Segura**: Sistema robusto de login e registro com criptografia avançada e validação reativa

A aplicação foi desenvolvida utilizando uma arquitetura de microfrontends com Next.js, proporcionando escalabilidade, manutenibilidade e uma experiência de usuário fluida e moderna.

## 🚀 Como Inicializar o Projeto

### 📋 Pré-requisitos

- **Node.js**: versão 18 ou superior
- **npm**: versão 10.5.2 ou superior
- **Docker**: (opcional, para execução via container)
- **Git**: para controle de versão

### 🔧 Opção 1: Execução via Terminal

1. **Clone o repositório:**

```bash
git clone [url-do-repositorio]
cd fiap-farm-web
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Execute o projeto em modo de desenvolvimento:**

```bash
npm run dev
```

O comando acima iniciará ambas as aplicações:

- **Dashboard**: http://localhost:3001
- **Login**: http://localhost:3002

4. **Scripts disponíveis:**

```bash
# Executar testes
npm run test

# Verificação de tipos
npm run type-check

# Linting
npm run lint

# Build de produção
npm run build

# Limpeza de cache
npm run clean

# Formatação de código
npm run format
```

### 🔧 Resolução de Problemas

**Se encontrar problemas com o TurboRepo:**

```bash
npm install turbo --global
```

## 🛠️ Tecnologias Utilizadas e Arquitetura

### 📱 Stack Principal

- **Next.js 15**: Framework React com renderização híbrida (SSR/SSG) e otimizações avançadas
- **TypeScript**: Tipagem estática para maior robustez e manutenibilidade do código
- **Tailwind CSS**: Framework CSS utilitário para estilização eficiente e responsiva
- **Firebase**: Plataforma completa para autenticação e banco de dados Firestore em tempo real

### 🏗️ Arquitetura de Microfrontends

- **Monorepo com TurboRepo**: Gerenciamento eficiente de múltiplas aplicações e dependências compartilhadas
- **Design System Centralizado**: Componentes reutilizáveis no pacote `@repo/ui` com CVA (Class Variance Authority)
- **Configurações Compartilhadas**: ESLint, TypeScript e Tailwind unificados entre todas as aplicações

### 🔧 Tecnologias Complementares

- **Redux Toolkit**: Gerenciamento de estado global simplificado e otimizado
- **Chart.js + React-ChartJS-2**: Visualização de dados com gráficos interativos
- **Jest + Testing Library**: Framework de testes unitários com cobertura de 80%+
- **Class Variance Authority**: Sistema de variantes para componentes
- **PostCSS**: Processamento e otimização de CSS

### 🏛️ Padrões Arquiteturais Implementados

**Clean Architecture com separação em camadas:**

- **Domain Layer**: Entidades de negócio, casos de uso e interfaces de repositório
- **Data Layer**: Implementações de repositórios, mappers e integrações com Firebase
- **Presentation Layer**: Componentes React, controllers e hooks customizados

**Design Patterns aplicados:**

- **Repository Pattern**: Abstração completa de acesso a dados com Result Pattern
- **Use Case Pattern**: Encapsulamento da lógica de negócio em casos de uso específicos
- **Observer Pattern**: Validação reativa de formulários e estado da aplicação
- **Factory Pattern**: Criação de objetos complexos com Dependency Injection
- **Singleton Pattern**: Container de injeção de dependências (DIContainer)

**Segurança e Qualidade:**

- **Criptografia de dados**: Implementação de encryption/decryption para dados sensíveis
- **Result Pattern**: Tratamento de erros tipado e funcional
- **Validação em tempo real**: Feedback imediato para entrada de dados
- **Sanitização de dados**: Limpeza e validação de inputs do usuário
- **Autenticação robusta**: Firebase Auth com criptografia avançada

### 📁 Estrutura do Monorepo

```
fiap-farm-web/
├── 📁 apps/
│   ├── 📱 dashboard/          # Aplicação principal de gestão (Porta 3001)
│   │   ├── 🧪 __tests__/     # Testes unitários com Jest
│   │   ├── 📄 src/app/       # Páginas e componentes React
│   │   ├── 💾 src/data/      # Camada de dados e Firebase
│   │   └── 🏗️ src/domain/    # Modelos, casos de uso e regras de negócio
│   └── 🔐 login/             # Sistema de autenticação (Porta 3002)
│       ├── 🧪 __tests__/     # Testes de autenticação
│       ├── 📄 src/app/       # Interface de login/registro
│       ├── 💾 src/data/      # Integração com Firebase Auth
│       └── 🏗️ src/domain/    # Modelos de usuário e autenticação
├── 📦 packages/
│   ├── 🎨 ui/                # Design system compartilhado
│   │   ├── 🔘 buttons.tsx    # Componentes de botão com variantes
│   │   ├── 📝 texts.tsx      # Sistema tipográfico
│   │   ├── 🎯 dropdown.tsx   # Componentes de seleção
│   │   ├── 🎭 icons.tsx      # Biblioteca de ícones customizada
│   │   └── 🏷️ statusTag.tsx  # Tags de status coloridas
│   ├── ⚙️ config-eslint/     # Configurações de linting
│   ├── 🎨 config-tailwind/   # Tema e configurações CSS
│   └── 📘 config-typescript/ # Configurações TypeScript compartilhadas
├── 🔄 .github/workflows/     # CI/CD com GitHub Actions
├── 🐳 docker-compose.yml     # Orquestração de containers
└── ⚡ turbo.json            # Configuração do TurboRepo
```

### 🔄 CI/CD e DevOps

- **GitHub Actions**: Pipeline automatizado com múltiplos jobs
- **Codecov Integration**: Cobertura de testes automatizada
- **Docker**: Containerização para deploy simplificado
- **Turbo**: Build system otimizado para monorepos
- **Path-based Filtering**: Builds condicionais baseados em mudanças

## 🧪 Testes e Qualidade

### 📊 Cobertura de Testes

O projeto mantém uma cobertura de testes superior a **80%** em todas as métricas:

- **Branches**: 80%+ de cobertura
- **Functions**: 80%+ de cobertura
- **Lines**: 80%+ de cobertura
- **Statements**: 80%+ de cobertura

### 🔬 Tipos de Testes Implementados

**Testes Unitários:**

- Controllers (AuthController, DashboardController)
- Result Pattern e Error Handling
- Dependency Injection Container
- Casos de uso de negócio

**Ferramentas de Teste:**

- **Jest**: Framework principal de testes
- **Testing Library**: Testes de componentes React
- **jsdom**: Ambiente de DOM simulado
- **Coverage Reports**: Relatórios detalhados de cobertura

### 🏃‍♂️ Executando os Testes

```bash
# Executar todos os testes
npm run test

# Testes com cobertura
npm run test:coverage

# Testes em modo watch
npm run test:watch

# Testes específicos por aplicação
cd apps/login && npm run test
cd apps/dashboard && npm run test
```

## 👨‍💻 Apresentação do Autor

### Olá! Eu sou João Woigt Azevedo 👋

**Desenvolvedor Android na Stone** e **Estudante de Engenharia de Frontend** na FIAP + Alura. Sou uma pessoa apaixonada tanto por educação quanto por tecnologias, com formação em Ciências Sociais pela Unicamp e transição para tecnologia durante a pandemia.

Este projeto representa a aplicação prática dos conhecimentos adquiridos em desenvolvimento frontend, combinando minha experiência em desenvolvimento móvel com as mais modernas tecnologias React Native.

### 🎓 Formação Acadêmica

- **Pós-graduação em Front-End Engineering** - FIAP (2024-2026)
- **Tecnologia da Informação** - Let's Code (2021-2022) - Bolsista Santander Universidades
- **Bacharelado e Licenciatura em Ciências Sociais** - Unicamp (2017-2021)

### 💼 Experiência Profissional

**Desenvolvedor Android Senior** com **3+ anos de experiência** no mercado:

- **Stone** (2024 - atual): Desenvolvedor Android com foco em KMP para as squads de Pix
- **CI&T** (2022-2024): Desenvolvedor Android Senior em projetos financeiros com +7mi de instalações
- **Jera** (2021-2022): Desenvolvedor Android
- **CNPq** (2018-2020): Bolsista PIBID - Programa de Introdução à Docência

### 🚀 Competências Técnicas

- **Mobile**: Android nativo, KMP (Kotlin Multiplatform), React Native
- **Frontend**: JavaScript, TypeScript, Next.js
- **Arquitetura**: MVVM, MVP, Clean Architecture, SOLID
- **Ferramentas**: Flow, Coroutines, Koin, Retrofit, JUnit, MockK

### 🏆 Certificações

- ViewModel e Lifecycle para Melhor Experiência em Aplicativos Android
- Desenvolvimento Integrado de Aplicações Android
- Building Industry-Level Multiplatform Apps With KMM
- Aplicando TDD e Padrões de Testes no Desenvolvimento de Aplicativos Android

### 📫 Contato

- **LinkedIn**: [linkedin.com/in/joaowoigt](https://www.linkedin.com/in/joaowoigt)
- **Email**: joaowoigt@gmail.com
- **Localização**: Limeira, São Paulo, Brasil

---

**💚 Desenvolvido com ❤️ para o Hackathon FIAP + Alura 2025**
