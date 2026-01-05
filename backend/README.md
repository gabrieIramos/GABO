# HubBra Backend API

Backend da aplicação HubBra - Loja de Produtos de Futebol, desenvolvido com NestJS, TypeORM e PostgreSQL.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js progressivo
- **TypeORM** - ORM para TypeScript e JavaScript
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação com JSON Web Tokens
- **Swagger** - Documentação automática da API
- **Class Validator** - Validação de dados
- **Bcrypt** - Criptografia de senhas

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL (v14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. **Clone o repositório e navegue até a pasta backend:**
```bash
cd backend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**

Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Application
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_aqui
DB_DATABASE=hubbra_db

# JWT
JWT_SECRET=sua_chave_secreta_jwt_aqui
JWT_EXPIRATION=7d

# CORS
CORS_ORIGIN=http://localhost:5173
```

4. **Crie o banco de dados PostgreSQL:**

Conecte-se ao PostgreSQL e crie o banco de dados:
```sql
CREATE DATABASE hubbra_db;
```

5. **Execute as migrations (o TypeORM criará as tabelas automaticamente em modo development):**
```bash
npm run start:dev
```

## 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Inicia o servidor em modo watch

# Build
npm run build              # Compila o projeto

# Produção
npm run start:prod         # Inicia o servidor em produção

# Testes
npm run test               # Executa os testes
npm run test:watch         # Executa os testes em modo watch
npm run test:cov           # Executa os testes com cobertura

# Linting e Formatação
npm run lint               # Executa o linter
npm run format             # Formata o código com Prettier
```

## 📚 Documentação da API

Após iniciar o servidor, acesse a documentação Swagger em:
```
http://localhost:3000/api/docs
```

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

- **users** - Usuários do sistema
- **products** - Produtos da loja
- **reviews** - Avaliações dos produtos
- **orders** - Pedidos realizados
- **order_items** - Itens de cada pedido

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar endpoints protegidos:

1. Faça login através do endpoint `POST /auth/login`
2. Use o token recebido no header `Authorization: Bearer {token}`

### Exemplo de Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "senha123"
  }'
```

## 📡 Endpoints Principais

### Auth
- `POST /auth/login` - Fazer login
- `GET /auth/me` - Obter dados do usuário autenticado (requer token)

### Users
- `POST /users` - Criar novo usuário
- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Buscar usuário por ID
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Products
- `POST /products` - Criar novo produto
- `GET /products` - Listar todos os produtos
- `GET /products?category=Seleções` - Filtrar por categoria
- `GET /products?team=Brasil` - Filtrar por time
- `GET /products/:id` - Buscar produto por ID
- `PATCH /products/:id` - Atualizar produto
- `DELETE /products/:id` - Deletar produto
- `POST /products/:id/reviews` - Adicionar avaliação
- `GET /products/:id/reviews` - Listar avaliações

### Orders
- `POST /orders` - Criar novo pedido
- `GET /orders` - Listar todos os pedidos
- `GET /orders?status=pending` - Filtrar por status
- `GET /orders/user/:userId` - Listar pedidos de um usuário
- `GET /orders/:id` - Buscar pedido por ID
- `PATCH /orders/:id` - Atualizar pedido (status, tracking)
- `DELETE /orders/:id` - Deletar pedido

## 🌐 CORS

O CORS está configurado para aceitar requisições do frontend em `http://localhost:5173` por padrão. Para alterar, modifique a variável `CORS_ORIGIN` no arquivo `.env`.

## 🔨 Desenvolvimento

### Adicionar um novo módulo

```bash
nest generate module nome-do-modulo
nest generate controller nome-do-modulo
nest generate service nome-do-modulo
```

### Criar uma nova migration

```bash
npm run typeorm migration:generate -- src/migrations/NomeDaMigration
npm run typeorm migration:run
```

## 🚀 Deploy

### Preparação para Produção

1. Configure as variáveis de ambiente de produção
2. Desabilite o `synchronize` no TypeORM (já está configurado)
3. Use migrations para gerenciar o schema do banco
4. Configure um servidor proxy reverso (Nginx)
5. Use PM2 ou similar para gerenciar o processo Node.js

### Build para Produção

```bash
npm run build
NODE_ENV=production npm run start:prod
```

## 📝 Notas Importantes

- Em **desenvolvimento**, o TypeORM está configurado para criar/atualizar tabelas automaticamente (`synchronize: true`)
- Em **produção**, use migrations para gerenciar alterações no banco de dados
- Sempre altere as senhas e secrets padrão antes de colocar em produção
- Mantenha o `.env` fora do controle de versão (já está no `.gitignore`)

## 🤝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
2. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
3. Push para a branch (`git push origin feature/MinhaFeature`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Equipe

Desenvolvido pela equipe HubBra

---

**HubBra** - A paixão do brasileiro em cada produto! ⚽💚💛
