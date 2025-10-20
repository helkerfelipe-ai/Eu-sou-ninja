# 🥋 Sistema Eu Sou Ninja

Sistema de Gestão de Alunos para o Projeto Social de Capoeira "Eu Sou Ninja" - Abadá Capoeira

![Logo Eu Sou Ninja](client/public/logo.jpg)

## 📋 Sobre o Projeto

O Sistema Eu Sou Ninja é uma aplicação web completa desenvolvida para gerenciar alunos e controlar a frequência do projeto social de capoeira "Eu Sou Ninja", filiado ao grupo internacional Abadá Capoeira.

### Funcionalidades Principais

- ✅ **Autenticação Segura** - Sistema de login com criptografia bcrypt
- ✅ **Cadastro de Alunos** - Nome e data de nascimento obrigatórios, demais campos opcionais
- ✅ **Responsável Legal** - Cadastro automático para menores de 18 anos
- ✅ **Controle de Presença** - Registro individual por data de aula
- ✅ **Relatórios de Frequência** - Estatísticas e taxa de presença por período
- ✅ **Edição e Exclusão** - Correção de informações cadastradas
- ✅ **Alteração de Senha** - Segurança do usuário
- ✅ **Interface Responsiva** - Funciona em desktop e mobile
- ✅ **Sobre o Projeto** - Página informativa sobre o projeto social

## 🚀 Tecnologias

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- tRPC Client
- Wouter (routing)

### Backend
- Node.js 22
- Express 4
- tRPC 11
- Drizzle ORM
- bcrypt (criptografia)
- jsonwebtoken (JWT)

### Banco de Dados
- MySQL 8

## 📦 Instalação Local

### Pré-requisitos

- Node.js 22.x ou superior
- pnpm
- MySQL 8.x

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd eusouninja
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Configure o banco de dados**
```sql
CREATE DATABASE eusouninja CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

4. **Configure as variáveis de ambiente**

Solicite as credenciais ao administrador do sistema ou configure:
- `DATABASE_URL`: Connection string do MySQL
- `JWT_SECRET`: Chave secreta para JWT (gere com `openssl rand -base64 32`)

5. **Aplique as migrações**
```bash
pnpm db:push
```

6. **Inicie o servidor de desenvolvimento**
```bash
pnpm dev
```

7. **Acesse o sistema**
```
http://localhost:5173
```

## 🌐 Deploy em Produção

Consulte o arquivo [DEPLOY.md](DEPLOY.md) para instruções detalhadas de deploy nas seguintes plataformas:

- **Vercel** (Recomendado)
- **Railway**
- **Render**
- **Fly.io**

## 📚 Documentação

- **[Manual do Usuário](Manual_Usuario_EuSouNinja.md)** - Guia completo de uso do sistema
- **[Documentação Técnica](Documentacao_Tecnica_EuSouNinja.md)** - Arquitetura e código
- **[Guia de Deploy](DEPLOY.md)** - Instruções de hospedagem

## 🛠️ Scripts Disponíveis

```bash
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Compila para produção
pnpm start        # Inicia servidor de produção
pnpm db:push      # Aplica schema ao banco de dados
pnpm check        # Verifica tipos TypeScript
pnpm format       # Formata código com Prettier
```

## 📁 Estrutura do Projeto

```
eusouninja/
├── client/              # Frontend React
│   ├── public/          # Assets estáticos
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── pages/       # Páginas da aplicação
│   │   ├── lib/         # Utilitários
│   │   └── contexts/    # Contextos React
│   └── index.html
├── server/              # Backend Node.js
│   ├── _core/           # Funcionalidades core
│   ├── db.ts            # Acesso ao banco
│   └── routers.ts       # API tRPC
├── drizzle/             # Schema do banco
│   └── schema.ts
├── shared/              # Código compartilhado
└── package.json
```

## 🔒 Segurança

- Senhas criptografadas com bcrypt (10 rounds)
- Autenticação via JWT com cookies httpOnly
- Validação de dados com Zod
- Proteção contra SQL Injection (Drizzle ORM)
- Proteção contra XSS (React)
- Cookies seguros com sameSite

## 👥 Sobre o Projeto Social

O "Eu Sou Ninja" é um projeto social de capoeira filiado ao grupo internacional **Abadá Capoeira**, que promove:

- Inclusão social através da capoeira
- Desenvolvimento físico e mental de crianças e jovens
- Valores de respeito, disciplina e cooperação
- Cultura afro-brasileira e história da capoeira

**Não há referências religiosas** - o foco é exclusivamente educacional e cultural.

## 📧 Contato

**Email:** projetoeusouninja@gmail.com

## 📄 Licença

Este projeto foi desenvolvido especificamente para o Projeto Social Eu Sou Ninja.

---

**Desenvolvido com dedicação para o Projeto Social Eu Sou Ninja**  
**Versão 1.0.0 - Outubro 2025**

🥋 **Axé, Capoeira!**

