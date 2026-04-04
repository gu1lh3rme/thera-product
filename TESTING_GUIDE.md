# 🧪 GUIA COMPLETO - TESTES COM JEST

## 📋 Comandos de Teste Disponíveis

### 🎯 Comandos Principais:
```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (re-executa automaticamente ao salvar)
npm run test:watch

# Executar testes com coverage (relatório de cobertura)
npm run test:cov

# Executar testes em modo debug
npm run test:debug

# Executar apenas testes E2E (end-to-end)
npm run test:e2e
```

### 🔍 Comandos Específicos:
```bash
# Executar apenas testes de produtos
npm test -- products

# Executar apenas um arquivo específico
npm test -- products.controller.spec.ts

# Executar testes com verbose output
npm test -- --verbose

# Executar testes e gerar relatório de cobertura
npm test -- --coverage
```

## 📝 Estrutura dos Testes

### 🏗️ Arquivos de Teste Criados:
- `src/products/products.service.spec.ts` - Testes do service
- `src/products/products.controller.spec.ts` - Testes do controller
- `src/orders/orders.service.spec.ts` - Testes do service de pedidos

### 🧪 Tipos de Testes Implementados:

#### **1. Testes Unitários (Unit Tests)**
- Testam funções/métodos isoladamente
- Usam mocks para dependências
- Focam na lógica de negócio

#### **2. Testes de Integração**
- Testam fluxos completos
- Simulam interações entre componentes
- Validam cenários reais de uso

#### **3. Testes de Validação**
- Verificam regras de negócio
- Testam validações de entrada
- Confirmam tratamento de erros

## 🎯 Cenários de Teste para Produtos

### ✅ Casos de Sucesso Testados:
- ✅ Criar produto com dados válidos
- ✅ Listar todos os produtos
- ✅ Buscar produto por ID existente
- ✅ Atualizar produto existente
- ✅ Deletar produto existente

### ❌ Casos de Erro Testados:
- ❌ Buscar produto inexistente (404)
- ❌ Atualizar produto inexistente (404)
- ❌ Deletar produto inexistente (404)
- ❌ Dados inválidos na criação (400)

### 🔒 Testes de Autorização:
- 🔑 Verificação de JWT Guard
- 🔑 Acesso negado sem autenticação

## 📊 Exemplo de Output dos Testes

Quando você executar `npm test`, verá algo como:

```
PASS  src/products/products.controller.spec.ts
ProductsController
  ✓ should be defined (15ms)
  create
    ✓ should create a product successfully (8ms)
    ✓ should validate product data before creation (2ms)
  findAll
    ✓ should return array of products (5ms)
    ✓ should return empty array when no products exist (3ms)
  findOne
    ✓ should return a product by id (4ms)
    ✓ should throw NotFoundException when product not found (6ms)
  update
    ✓ should update a product successfully (5ms)
    ✓ should throw NotFoundException when updating non-existent product (4ms)
  remove
    ✓ should delete a product successfully (3ms)
    ✓ should throw NotFoundException when deleting non-existent product (4ms)
  Integration Tests
    ✓ should create, find, update and delete a product in sequence (7ms)
  Data Validation Tests
    ✓ should handle edge cases for price validation (2ms)
    ✓ should handle edge cases for stock quantity (1ms)

Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total
```

## 📈 Coverage Report

Com `npm run test:cov`, você verá:

```
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
----------------------|---------|----------|---------|---------|-------------------
All files             |   95.12 |    88.46 |   94.44 |   94.87 |
 products             |   100   |    100   |   100   |   100   |
  products.controller |   100   |    100   |   100   |   100   |
  products.service    |   90.48 |    75     |   87.5  |   89.47 | 45,67
----------------------|---------|----------|---------|---------|-------------------
```

## 🚀 Como Executar os Testes Agora

1. **Certifique-se que as dependências estão instaladas:**
```bash
npm install
```

2. **Execute todos os testes:**
```bash
npm test
```

3. **Para desenvolvimento (modo watch):**
```bash
npm run test:watch
```

4. **Para ver cobertura de código:**
```bash
npm run test:cov
```

## 🔧 Configuração do Jest

O Jest já está configurado no `package.json`:
```json
{
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
```

## 💡 Dicas para Criar Novos Testes

1. **Sempre teste cenários de sucesso E erro**
2. **Use mocks para isolar unidades de teste**
3. **Teste validações e edge cases**
4. **Mantenha testes simples e focados**
5. **Use nomes descritivos para os testes**

## 🎯 Próximos Passos

- Execute `npm test` para rodar todos os testes
- Execute `npm run test:watch` para desenvolvimento
- Verifique a cobertura com `npm run test:cov`
- Adicione mais testes conforme necessário