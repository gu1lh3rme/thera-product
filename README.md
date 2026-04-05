# 🛍️ Thera Product - API de Gerenciamento de Produtos e Pedidos

Uma API REST robusta construída com NestJS para gerenciamento completo de produtos e pedidos, com autenticação JWT, documentação Swagger e integração com PostgreSQL via Prisma.

## 🚀 Tecnologias Utilizadas

- **Framework:** NestJS (Node.js)
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Autenticação:** JWT (JSON Web Tokens)
- **Documentação:** Swagger/OpenAPI
- **Testes:** Jest (Unit & E2E)
- **Containerização:** Docker & Docker Compose
- **Validação:** Class-validator & Class-transformer

## 🏗️ Arquitetura do Projeto

```
src/
├── auth/           # Módulo de autenticação (JWT)
├── products/       # Módulo de produtos (CRUD)
├── orders/         # Módulo de pedidos (CRUD)
├── prisma/         # Configuração e service do Prisma
├── middleware/     # Middlewares customizados
├── app.module.ts   # Módulo principal
└── main.ts         # Ponto de entrada da aplicação
```

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Node.js** (v18 ou superior)
- **npm** ou **yarn**
- **PostgreSQL** (v13 ou superior)
- **Docker** e **Docker Compose** (opcional)

## ⚙️ Configuração do Ambiente

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd thera-product
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Database
DATABASE_URL="postgresql://postgres:admin@localhost:5432/thera_product"

# JWT
JWT_SECRET="supersecretjwt"

# Application
PORT=4000
```

### 4. Configure o banco de dados

#### Opção A: PostgreSQL Local
```bash
# Instale o PostgreSQL e crie o banco
createdb thera_product
```

#### Opção B: Docker (Recomendado)
```bash
# Inicia PostgreSQL via Docker Compose
docker-compose up -d db
```

### 5. Execute as migrações do Prisma
```bash
# Gera o cliente Prisma
npx prisma generate

# Aplica as migrações
npx prisma migrate dev

# (Opcional) Visualiza o banco no Prisma Studio
npx prisma studio
```

## 🚀 Como Executar a Aplicação

### Modo Desenvolvimento (Recomendado)
```bash
# Inicia a aplicação em modo de desenvolvimento com hot-reload
npm run start:dev
```

### Modo Produção
```bash
# Build da aplicação
npm run build

# Executa em produção
npm run start:prod
```

### Com Docker
```bash
# Inicia toda a aplicação (API + PostgreSQL)
docker-compose up -d

# Para acompanhar os logs
docker-compose logs -f
```

### ✅ Verificação de Funcionamento
- **API rodando:** http://localhost:4000
- **Health check:** http://localhost:4000/health
- **Swagger UI:** http://localhost:4000/api

## 🧪 Como Executar os Testes

### Testes Unitários
```bash
# Executa todos os testes
npm test

# Testes em modo watch (re-executa automaticamente)
npm run test:watch

# Testes com relatório de cobertura
npm run test:cov
```

### Testes E2E (End-to-End)
```bash
# Executa testes de integração
npm run test:e2e
```

### Comandos Específicos
```bash
# Testa apenas módulo de produtos
npm test -- products

# Testa arquivo específico
npm test -- products.controller.spec.ts

# Testes com output detalhado
npm test -- --verbose
```

## 📖 Documentação da API (Swagger)

A documentação completa da API está disponível via Swagger UI:

- **URL:** http://localhost:4000/api
- **Porta:** 4000 (configurável via PORT no .env)

### Recursos Documentados:
- ✅ **Produtos** - CRUD completo com validações
- ✅ **Pedidos** - Gerenciamento de pedidos com itens
- ✅ **Autenticação** - Sistema JWT para acesso seguro
- ✅ **Esquemas** - Modelos de dados detalhados
- ✅ **Códigos de resposta** - Status HTTP e mensagens de erro

## 🔐 Autenticação

### Como Obter Token JWT:
```bash
# POST http://localhost:4000/auth/login
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

### Como Usar o Token:
```bash
# Adicione o token no header Authorization
Authorization: Bearer SEU_TOKEN_AQUI
```

## 🧸 Testes no Postman

### Collection de Exemplo
Para facilitar os testes, você pode importar nossa collection do Postman:

#### 1. Autenticação
```http
POST http://localhost:4000/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

#### 2. Criar Produto
```http
POST http://localhost:4000/products
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI

{
  "name": "iPhone 15 Pro Max",
  "category": "Electronics",
  "description": "O mais avançado iPhone da Apple",
  "price": 1299.99,
  "stockQuantity": 25
}
```

#### 3. Listar Produtos
```http
GET http://localhost:4000/products
Authorization: Bearer SEU_TOKEN_AQUI
```

#### 4. Criar Pedido
```http
POST http://localhost:4000/orders
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI

{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 1299.99
    }
  ],
  "totalPrice": 2599.98
}
```

### 📁 Mais Exemplos
Consulte o arquivo [POSTMAN_EXAMPLES.md](./POSTMAN_EXAMPLES.md) para exemplos completos de requisições.

## 🗄️ Banco de Dados - PostgreSQL com Prisma

### Modelo de Dados
```prisma
model Product {
  id             Int          @id @default(autoincrement())
  name           String
  category       String  
  description    String
  price          Decimal      @db.Decimal(10, 2)
  stockQuantity  Int
  orderItems     OrderItem[]
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}

model Order {
  id         Int         @id @default(autoincrement())
  items      OrderItem[]
  totalPrice Decimal     @db.Decimal(10, 2)
  status     OrderStatus @default(Pendente)
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt
}
```

### Comandos Prisma Úteis
```bash
# Visualizar banco no navegador
npx prisma studio

# Reset do banco (CUIDADO: apaga todos os dados)
npx prisma migrate reset

# Gerar nova migração
npx prisma migrate dev --name nome-da-migracao

# Aplicar migrações em produção
npx prisma migrate deploy

# Sincronizar schema sem criar migração
npx prisma db push
```

### Conexão Local
```bash
# String de conexão local
DATABASE_URL="postgresql://postgres:admin@localhost:5432/thera_product"
```

### Conexão Docker
```bash
# String para Docker Compose
DATABASE_URL="postgresql://postgres:postgres@db:5432/thera_product"
```

## 🐳 Docker e Containerização

### Executar com Docker Compose
```bash
# Sobe todos os serviços (API + PostgreSQL)
docker-compose up -d

# Verificar status dos containers
docker-compose ps

# Ver logs da aplicação
docker-compose logs -f app

# Parar todos os serviços
docker-compose down
```

### Build Manual
```bash
# Criar imagem da aplicação
docker build -t thera-product .

# Executar container
docker run -p 4000:4000 \
  -e DATABASE_URL="postgresql://postgres:postgres@localhost:5432/thera_product" \
  -e JWT_SECRET="supersecretjwt" \
  thera-product
```

## 📊 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| `start` | `npm start` | Inicia aplicação (modo produção) |
| `start:dev` | `npm run start:dev` | Modo desenvolvimento com hot-reload |
| `start:debug` | `npm run start:debug` | Modo debug com hot-reload |
| `build` | `npm run build` | Build para produção |
| `test` | `npm test` | Executa testes unitários |
| `test:watch` | `npm run test:watch` | Testes em modo watch |
| `test:cov` | `npm run test:cov` | Testes com cobertura |
| `test:e2e` | `npm run test:e2e` | Testes end-to-end |
| `lint` | `npm run lint` | Executa linting |
| `format` | `npm run format` | Formata código |

## 🛠️ Troubleshooting

### Problemas Comuns:

#### 1. Erro de Conexão com Banco
```bash
# Verifique se o PostgreSQL está rodando
pg_isready -h localhost -p 5432

# Ou via Docker
docker-compose up -d db
```

#### 2. Erro de Migração
```bash
# Reset e recria o banco
npx prisma migrate reset
npx prisma migrate dev
```

#### 3. Porta 4000 em uso
```bash
# Altere a porta no .env
PORT=4001

# Ou mate o processo
lsof -ti:4000 | xargs kill
```

#### 4. JWT Token Inválido
- Certifique-se que o JWT_SECRET no .env está correto
- Verifique se o token não expirou
- Use o endpoint `/auth/login` para obter novo token

## 📚 Recursos Adicionais

- [Guia de Testes](./TESTING_GUIDE.md) - Documentação completa sobre testes
- [Exemplos Postman](./POSTMAN_EXAMPLES.md) - Collection com requisições de exemplo
- [Docker Guide](./DOCKER_GUIDE.md) - Guia detalhado sobre Docker
- [NestJS Documentation](https://nestjs.com/)
- [Prisma Documentation](https://prisma.io/docs/)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença UNLICENSED. Consulte o arquivo `package.json` para mais detalhes.