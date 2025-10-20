# Guia de Deploy - Sistema Eu Sou Ninja

Este documento explica como fazer o deploy do sistema em diferentes plataformas de hospedagem gratuita.

## Pré-requisitos

Antes de fazer o deploy, você precisa:

1. **Conta GitHub** - Para hospedar o código
2. **Banco de Dados MySQL** - Configurado e acessível via internet
3. **Variáveis de Ambiente** - Configuradas na plataforma de hospedagem

## Variáveis de Ambiente Necessárias

O sistema precisa das seguintes variáveis de ambiente:

```
DATABASE_URL=mysql://usuario:senha@host:porta/database
JWT_SECRET=sua-chave-secreta-muito-forte
NODE_ENV=production
PORT=3000
```

### Como gerar JWT_SECRET

Execute no terminal:
```bash
openssl rand -base64 32
```

Ou use um gerador online: https://generate-secret.vercel.app/32

---

## Opção 1: Deploy no Vercel (Recomendado)

### Vantagens
- ✅ Deploy automático via GitHub
- ✅ SSL grátis
- ✅ CDN global
- ✅ Fácil configuração

### Limitações
- ⚠️ Precisa de banco de dados externo (PlanetScale, Railway, etc.)

### Passo a Passo

#### 1. Preparar Banco de Dados

**Opção A: PlanetScale (Recomendado)**

1. Acesse https://planetscale.com
2. Crie uma conta gratuita
3. Crie um novo database
4. Copie a connection string (formato MySQL)

**Opção B: Railway**

1. Acesse https://railway.app
2. Crie um novo projeto
3. Adicione MySQL database
4. Copie a connection string

#### 2. Fazer Deploy no Vercel

1. Acesse https://vercel.com e faça login
2. Clique em "Add New Project"
3. Importe seu repositório do GitHub
4. Configure as variáveis de ambiente:
   - `DATABASE_URL`: Cole a connection string do banco
   - `JWT_SECRET`: Cole o secret gerado
   - `NODE_ENV`: `production`
5. Configure Build Settings:
   - Build Command: `pnpm build`
   - Output Directory: `dist/public`
   - Install Command: `pnpm install`
6. Clique em "Deploy"

#### 3. Aplicar Migrações

Após o primeiro deploy:

1. Vá em Settings → Functions
2. Abra o terminal
3. Execute: `pnpm db:push`

#### 4. Acessar o Sistema

Seu sistema estará disponível em: `https://seu-projeto.vercel.app`

---

## Opção 2: Deploy no Railway

### Vantagens
- ✅ Banco de dados incluído
- ✅ Deploy automático
- ✅ Configuração simples

### Limitações
- ⚠️ Plano gratuito limitado a 500 horas/mês
- ⚠️ Banco de dados pequeno no plano gratuito

### Passo a Passo

#### 1. Criar Projeto no Railway

1. Acesse https://railway.app
2. Faça login com GitHub
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Escolha seu repositório

#### 2. Adicionar Banco de Dados

1. No projeto, clique em "New"
2. Selecione "Database" → "MySQL"
3. Railway criará o banco automaticamente
4. A variável `DATABASE_URL` será configurada automaticamente

#### 3. Configurar Variáveis de Ambiente

1. Clique no serviço web
2. Vá em "Variables"
3. Adicione:
   - `JWT_SECRET`: Cole o secret gerado
   - `NODE_ENV`: `production`

#### 4. Configurar Build

Railway detecta automaticamente, mas você pode ajustar:

1. Build Command: `pnpm build`
2. Start Command: `pnpm start`

#### 5. Aplicar Migrações

1. Abra o terminal do serviço
2. Execute: `pnpm db:push`

#### 6. Acessar o Sistema

Railway gerará uma URL pública automaticamente.

---

## Opção 3: Deploy no Render

### Vantagens
- ✅ Banco de dados PostgreSQL incluído
- ✅ SSL grátis
- ✅ Plano gratuito permanente

### Limitações
- ⚠️ Serviço hiberna após 15 minutos de inatividade
- ⚠️ Usa PostgreSQL (precisa ajustar código)

### Passo a Passo

#### 1. Criar Banco de Dados

1. Acesse https://render.com
2. Faça login
3. New → PostgreSQL
4. Copie a Internal Database URL

#### 2. Criar Web Service

1. New → Web Service
2. Conecte seu repositório GitHub
3. Configure:
   - Name: `eusouninja`
   - Environment: `Node`
   - Build Command: `pnpm install && pnpm build`
   - Start Command: `pnpm start`

#### 3. Configurar Variáveis de Ambiente

1. Vá em Environment
2. Adicione:
   - `DATABASE_URL`: Cole a database URL
   - `JWT_SECRET`: Cole o secret gerado
   - `NODE_ENV`: `production`

#### 4. Deploy

Render fará o deploy automaticamente.

#### 5. Aplicar Migrações

1. Vá em Shell
2. Execute: `pnpm db:push`

---

## Opção 4: Deploy no Fly.io

### Vantagens
- ✅ Controle total do servidor
- ✅ Plano gratuito generoso
- ✅ Suporta MySQL

### Limitações
- ⚠️ Configuração mais técnica
- ⚠️ Requer CLI

### Passo a Passo

#### 1. Instalar Fly CLI

```bash
# macOS
brew install flyctl

# Linux
curl -L https://fly.io/install.sh | sh

# Windows
iwr https://fly.io/install.ps1 -useb | iex
```

#### 2. Login

```bash
flyctl auth login
```

#### 3. Criar App

```bash
cd /caminho/para/eusouninja
flyctl launch
```

#### 4. Criar Banco de Dados MySQL

```bash
flyctl mysql create
```

#### 5. Conectar Banco ao App

```bash
flyctl mysql attach <database-name>
```

#### 6. Configurar Secrets

```bash
flyctl secrets set JWT_SECRET="sua-chave-secreta"
flyctl secrets set NODE_ENV="production"
```

#### 7. Deploy

```bash
flyctl deploy
```

#### 8. Aplicar Migrações

```bash
flyctl ssh console
pnpm db:push
exit
```

---

## Configuração do Banco de Dados

### Formato da Connection String

```
mysql://usuario:senha@host:porta/database
```

**Exemplo:**
```
mysql://root:senha123@db.example.com:3306/eusouninja
```

### Criar Banco de Dados

Se você tem acesso ao MySQL, execute:

```sql
CREATE DATABASE eusouninja CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Aplicar Schema

Após configurar `DATABASE_URL`, execute:

```bash
pnpm db:push
```

Este comando cria todas as tabelas necessárias.

---

## Verificação Pós-Deploy

Após o deploy, verifique:

1. ✅ Sistema carrega sem erros
2. ✅ Página de login aparece
3. ✅ Consegue criar conta
4. ✅ Consegue fazer login
5. ✅ Consegue cadastrar aluno
6. ✅ Consegue registrar presença

---

## Solução de Problemas

### Erro: "Cannot connect to database"

**Causa:** Connection string incorreta ou banco inacessível

**Solução:**
1. Verifique se `DATABASE_URL` está correta
2. Teste conexão com MySQL Workbench ou DBeaver
3. Verifique firewall do banco de dados

### Erro: "JWT must be provided"

**Causa:** `JWT_SECRET` não configurado

**Solução:**
1. Gere um secret: `openssl rand -base64 32`
2. Configure na plataforma de hospedagem
3. Reinicie o serviço

### Erro: "Table doesn't exist"

**Causa:** Migrações não foram aplicadas

**Solução:**
1. Acesse terminal do servidor
2. Execute: `pnpm db:push`
3. Reinicie o serviço

### Erro: "Port already in use"

**Causa:** Porta 3000 ocupada

**Solução:**
1. Configure variável `PORT` com outro valor
2. Ou use a porta fornecida pela plataforma (geralmente automático)

### Site muito lento

**Causa:** Plano gratuito com recursos limitados

**Solução:**
1. Otimize queries do banco
2. Adicione índices nas tabelas
3. Considere upgrade do plano

---

## Domínio Personalizado

### Vercel

1. Vá em Settings → Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções

### Railway

1. Vá em Settings → Networking
2. Clique em "Generate Domain"
3. Ou adicione custom domain

### Render

1. Vá em Settings → Custom Domain
2. Adicione seu domínio
3. Configure DNS

---

## Backup e Manutenção

### Backup do Banco de Dados

**PlanetScale:** Backups automáticos incluídos

**Railway:**
```bash
railway run mysqldump -u root -p eusouninja > backup.sql
```

**Render:**
```bash
pg_dump $DATABASE_URL > backup.sql
```

### Restaurar Backup

```bash
mysql -u usuario -p eusouninja < backup.sql
```

### Atualizar Sistema

1. Faça commit das alterações no GitHub
2. Push para o repositório
3. Deploy automático será acionado

---

## Monitoramento

### Logs

**Vercel:** Dashboard → Functions → Logs

**Railway:** Service → Logs

**Render:** Service → Logs

**Fly.io:**
```bash
flyctl logs
```

### Uptime Monitoring

Configure monitoramento gratuito com:
- UptimeRobot: https://uptimerobot.com
- Pingdom: https://pingdom.com
- StatusCake: https://statuscake.com

---

## Suporte

Para dúvidas ou problemas:

**Email:** projetoeusouninja@gmail.com

**Documentação Técnica:** Consulte `Documentacao_Tecnica_EuSouNinja.md`

**Manual do Usuário:** Consulte `Manual_Usuario_EuSouNinja.md`

---

**Desenvolvido para o Projeto Social Eu Sou Ninja**  
**Versão 1.0.0 - Outubro 2025**

