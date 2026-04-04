# 🐳 GUIA COMPLETO - DOCKER PARA SALVAR O AMBIENTE

## 🎯 **Por que usar Docker?**

✅ **Ambiente Consistente:** Funciona igual em qualquer máquina  
✅ **Fácil Deploy:** Um comando para subir tudo  
✅ **Isolamento:** Não interfere com outras aplicações  
✅ **Compartilhamento:** Outros desenvolvedores têm o mesmo ambiente  
✅ **Backup Completo:** Salva aplicação + banco + configurações  

---

## 🏗️ **Estrutura Docker do Projeto**

### **📁 Arquivos Docker Existentes:**
- `Dockerfile` - Imagem da aplicação NestJS
- `docker-compose.yml` - Orquestração (app + banco)

### **🔧 Configuração Atual:**
- **App:** Roda na porta 3000 (dentro do container)
- **Banco:** PostgreSQL na porta 5432
- **Dados:** Persistidos em volume Docker

---

## 🚀 **Como Usar Docker - Passo a Passo**

### **1. 📦 Construir e Executar (Primeira vez)**

```bash
# Subir toda a aplicação (app + banco)
docker-compose up --build -d

# Verificar se os containers estão rodando
docker-compose ps
```

**O que acontece:**
- 🏗️ Constrói a imagem da aplicação
- 🗄️ Cria container PostgreSQL
- 🔄 Executa migrations automaticamente
- 🌐 App fica disponível em http://localhost:3000

### **2. ⚡ Executar (próximas vezes)**

```bash
# Subir os serviços (sem rebuild)
docker-compose up -d

# Parar os serviços
docker-compose down

# Parar e remover volumes (CUIDADO: apaga dados!)
docker-compose down -v
```

### **3. 🔍 Monitorar e Debug**

```bash
# Ver logs da aplicação
docker-compose logs app

# Ver logs do banco
docker-compose logs db

# Ver logs em tempo real
docker-compose logs -f app

# Acessar terminal do container da app
docker-compose exec app sh

# Acessar terminal do PostgreSQL
docker-compose exec db psql -U postgres -d thera_product
```

---

## 💾 **Salvando o Ambiente Completo**

### **📤 Exportar Imagem Docker**

```bash
# 1. Criar a imagem
docker-compose build app

# 2. Exportar para arquivo
docker save thera-product-app > thera-product-backup.tar

# 3. Exportar banco (dump dos dados)
docker-compose exec db pg_dump -U postgres thera_product > database-backup.sql
```

### **📥 Restaurar em Outra Máquina**

```bash
# 1. Carregar a imagem
docker load < thera-product-backup.tar

# 2. Subir os serviços
docker-compose up -d

# 3. Restaurar dados (se necessário)
docker-compose exec db psql -U postgres thera_product < database-backup.sql
```

---

## 🔧 **Configurações Importantes**

### **⚙️ Variáveis de Ambiente no Docker**

No `docker-compose.yml`, as variáveis já estão configuradas:
```yaml
environment:
  DATABASE_URL: postgresql://postgres:postgres@db:5432/thera_product
  JWT_SECRET: supersecretjwt
```

### **📊 Portas Mapeadas**
- **App:** `localhost:3000` → Container `3000`
- **Banco:** `localhost:5432` → Container `5432`

### **💾 Volume Persistente**
```yaml
volumes:
  - postgres_data:/var/lib/postgresql/data
```
**Dados do banco ficam salvos** mesmo se o container for removido.

---

## 🛠️ **Comandos Úteis para Desenvolvimento**

### **🔄 Rebuild Após Mudanças no Código**
```bash
# Rebuild e restart
docker-compose up --build app

# Ou rebuild sem cache
docker-compose build --no-cache app
docker-compose up -d
```

### **🗄️ Gerenciar Banco de Dados**
```bash
# Acessar PostgreSQL
docker-compose exec db psql -U postgres -d thera_product

# Executar migrations
docker-compose exec app npx prisma migrate deploy

# Ver status das migrations
docker-compose exec app npx prisma migrate status

# Gerar cliente Prisma
docker-compose exec app npx prisma generate
```

### **🧪 Executar Testes no Container**
```bash
# Testes unitários
docker-compose exec app npm test

# Testes com coverage
docker-compose exec app npm run test:cov

# Testes E2E
docker-compose exec app npm run test:e2e
```

---

## 📋 **Cenários Comuns de Uso**

### **🎯 Desenvolvimento Local**
```bash
# Subir apenas o banco (desenvolver app fora do Docker)
docker-compose up db -d

# Usar variável de ambiente local
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/thera_product
```

### **🚀 Deploy em Produção**
```bash
# Build otimizado para produção
docker-compose -f docker-compose.prod.yml up --build -d
```

### **👥 Compartilhar com Equipe**
```bash
# 1. Commit os arquivos Docker
git add Dockerfile docker-compose.yml
git commit -m "Add Docker configuration"

# 2. Outros desenvolvedores executam
git pull
docker-compose up --build -d
```

### **💾 Backup Completo**
```bash
# Script de backup completo
docker-compose exec db pg_dump -U postgres thera_product > backup-$(date +%Y%m%d).sql
docker save thera-product-app > app-backup-$(date +%Y%m%d).tar
```

---

## 🎯 **Vantagens do Docker para Seu Projeto**

| **Sem Docker** | **Com Docker** |
|----------------|----------------|
| ❌ Precisa instalar PostgreSQL | ✅ Banco já incluído |
| ❌ Configurar variáveis manualmente | ✅ Configuração automática |
| ❌ Problemas de compatibilidade | ✅ Funciona igual em qualquer lugar |
| ❌ Setup complexo para novos devs | ✅ Um comando para subir tudo |
| ❌ Conflitos de versão | ✅ Ambiente isolado |

---

## 🚀 **Comando Rápido para Começar**

```bash
# Clone o projeto e execute:
docker-compose up --build -d

# Acesse:
# API: http://localhost:3000
# Swagger: http://localhost:3000/api
# Banco: localhost:5432
```

**Pronto! Seu ambiente está salvo e portável! 🎉**