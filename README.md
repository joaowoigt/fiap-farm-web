# 🌱 FIAP Farm - Sistema de Gestão Agrícola Digital

Bem-vindo ao **FIAP Farm**, um sistema completo de gestão agrícola digital desenvolvido como resultado do Hackathon do curso de Engenharia de Frontend da FIAP + Alura. Este projeto demonstra a aplicação de conceitos modernos de desenvolvimento frontend, arquitetura de microfrontends e práticas avançadas de segurança.

## 📋 Introdução

O FIAP Farm é uma plataforma digital inovadora que permite aos produtores rurais gerenciar de forma eficiente suas operações agrícolas. O sistema oferece funcionalidades completas para:

- **Controle de Produção**: Gerencie e monitore toda a produção agrícola com acompanhamento em tempo real
- **Gestão de Vendas**: Registre e acompanhe todas as vendas realizadas com controle de estoque integrado
- **Definição de Metas**: Estabeleça objetivos de produção e vendas com acompanhamento visual do progresso
- **Dashboard Analítico**: Visualize dados importantes através de gráficos e métricas relevantes
- **Autenticação Segura**: Sistema robusto de login e registro com criptografia avançada

A aplicação foi desenvolvida utilizando uma arquitetura de microfrontends com Next.js Zones, proporcionando escalabilidade, manutenibilidade e uma experiência de usuário fluida e moderna.

## 🚀 Como Inicializar o Projeto em sua Máquina

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Docker (opcional, para execução via container)

### Opção 1: Execução via Terminal

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

**Resolução de problemas:**
Se encontrar problemas com o TurboRepo, instale-o globalmente:

```bash
npm install turbo --global
```

## 🛠️ Tecnologias Utilizadas e Arquitetura

### Stack Principal

- **Next.js 15**: Framework React com renderização híbrida e otimizações avançadas
- **TypeScript**: Tipagem estática para maior robustez e manutenibilidade
- **Tailwind CSS**: Framework CSS utilitário para estilização eficiente
- **Firebase**: Plataforma completa para autenticação e banco de dados em tempo real

### Arquitetura de Microfrontends

- **Next.js Zones**: Implementação de microfrontends com roteamento inteligente
- **TurboRepo**: Monorepo moderno para gerenciamento de múltiplas aplicações
- **Design System**: Componentes reutilizáveis centralizados no pacote `@repo/ui`

### Tecnologias Complementares

- **Redux Toolkit**: Gerenciamento de estado global simplificado
- **Axios**: Cliente HTTP para comunicação com APIs
- **ESLint + Prettier**: Ferramentas de qualidade de código

### Padrões Arquiteturais Implementados

**Clean Architecture:**

- **Domain Layer**: Modelos de negócio, casos de uso e interfaces
- **Data Layer**: Repositórios, mappers e integrações externas
- **Presentation Layer**: Componentes React e controllers

**Design Patterns:**

- **Repository Pattern**: Abstração de acesso a dados
- **Use Case Pattern**: Encapsulamento da lógica de negócio
- **Observer Pattern**: Validação reativa de formulários
- **Factory Pattern**: Criação de objetos complexos

**Segurança:**

- Criptografia de dados sensíveis
- Validação de entrada em tempo real
- Sanitização de dados
- Autenticação robusta com Firebase Auth

### Estrutura do Monorepo

```
fiap-farm-web/
├── apps/
│   ├── dashboard/    # Aplicação principal de gestão
│   └── login/        # Sistema de autenticação
├── packages/
│   ├── ui/           # Design system compartilhado
│   ├── config-*/     # Configurações ESLint, TypeScript, Tailwind

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

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do Hackathon FIAP + Alura.

**Desenvolvido com ❤️ para o Hackathon FIAP + Alura 2025**
