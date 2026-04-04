# 🛒 CRIAR PEDIDOS (ORDERS) - GUIA COMPLETO POSTMAN

## 🚀 **Passo 1: Criar Produtos Primeiro**

Antes de criar pedidos, você precisa ter produtos no sistema. Use estes JSONs:

### 📱 Produto 1 - iPhone:
**URL:** `POST http://localhost:4000/products`
```json
{
  "name": "iPhone 15 Pro",
  "category": "Electronics",
  "description": "iPhone com chip A17 Pro e câmera avançada",
  "price": 1299.99,
  "stockQuantity": 50
}
```

### 💻 Produto 2 - MacBook:
**URL:** `POST http://localhost:4000/products`
```json
{
  "name": "MacBook Pro M3",
  "category": "Computers", 
  "description": "MacBook Pro de 14 polegadas com chip M3",
  "price": 2499.99,
  "stockQuantity": 25
}
```

### 🎧 Produto 3 - AirPods:
**URL:** `POST http://localhost:4000/products`
```json
{
  "name": "AirPods Pro",
  "category": "Electronics",
  "description": "Fones sem fio com cancelamento de ruído",
  "price": 349.99,
  "stockQuantity": 100
}
```

---

## 🛒 **Passo 2: Criar Pedidos**

### 📋 **Configuração Básica:**
**URL:** `POST http://localhost:4000/orders`
**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer SEU_JWT_TOKEN"
}
```

---

## 📦 **EXEMPLO 1 - Pedido Simples (Status Pendente)**

```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 3, 
      "quantity": 1
    }
  ],
  "status": "Pendente"
}
```

**📝 O que acontece:**
- ✅ Verifica se existe estoque suficiente
- ✅ **Preço calculado AUTOMATICAMENTE** do banco de dados
- ✅ Calcula preço total: (preço_produto_1 × 2) + (preço_produto_3 × 1)
- ❌ **NÃO atualiza estoque** (status "Pendente")
- ✅ Cria o pedido com status "Pendente"

**🔍 IMPORTANTE:** Você **NÃO precisa informar o preço** no JSON! Ele é buscado automaticamente do produto cadastrado.

---

## ✅ **EXEMPLO 2 - Pedido Concluído (Atualiza Estoque)**

```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ],
  "status": "Concluido"
}
```

**📝 O que acontece:**
- ✅ Verifica se existe estoque suficiente
- ✅ **Preços buscados AUTOMATICAMENTE** do banco (preço atual dos produtos)
- ✅ Calcula preço total automaticamente
- ✅ **ATUALIZA ESTOQUE automaticamente:**
  - iPhone: estoque_atual - 1
  - MacBook: estoque_atual - 1
- ✅ Cria o pedido com status "Concluído"

---

## 🛍️ **EXEMPLO 3 - Pedido Múltiplos Produtos**

```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 3
    },
    {
      "productId": 2,
      "quantity": 1
    },
    {
      "productId": 3,
      "quantity": 5
    }
  ],
  "status": "Concluido"
}
```

**💰 Cálculo Total:** Calculado automaticamente baseado nos preços atuais dos produtos no banco

**🔍 IMPORTANTE:** O sistema busca automaticamente o preço atual de cada produto, garantindo que mesmo se os preços mudarem, o pedido usará o valor correto no momento da criação.

---

## ❌ **EXEMPLO 4 - Teste de Erro (Estoque Insuficiente)**

```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 100
    }
  ],
  "status": "Pendente"
}
```

**⚠️ Resultado Esperado:**
```json
{
  "statusCode": 400,
  "message": "Insufficient stock for product \"iPhone 15 Pro\". Available: 50, Requested: 100",
  "error": "Bad Request"
}
```

---

## 🔍 **EXEMPLO 5 - Teste de Produto Inexistente**

```json
{
  "items": [
    {
      "productId": 999,
      "quantity": 1
    }
  ]
}
```

**⚠️ Resultado Esperado:**
```json
{
  "statusCode": 404,
  "message": "Product with ID 999 not found",
  "error": "Not Found"
}
```

---

## 📊 **Status Disponíveis**

| Status | Comportamento | Estoque |
|--------|--------------|---------|
| `"Pendente"` | Pedido criado, aguardando | **NÃO atualiza** |
| `"Concluido"` | Pedido finalizado | **ATUALIZA estoque** |
| `"Cancelado"` | Pedido cancelado | **NÃO atualiza** |

---

## 🔐 **Como Obter JWT Token**

**URL:** `POST http://localhost:4000/auth/login`
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Copie o `access_token` da resposta** e use como `Bearer TOKEN`.

---

## ✅ **Regras de Validação Implementadas**

1. **🔍 Verificação de Produto:** 
   - Produto deve existir no sistema
   - Retorna 404 se não encontrar

2. **📦 Verificação de Estoque:**
   - Quantidade solicitada ≤ estoque disponível  
   - Retorna 400 se estoque insuficiente

3. **💰 Cálculo de Preço:**
   - Preço total = Σ (preço × quantidade) de cada item
   - Calcula automaticamente

4. **🔄 Atualização de Estoque:**
   - **Apenas** quando status = "Concluido"
   - Subtrai quantidade do estoque atual

5. **📋 Validação de Dados:**
   - `productId`: número inteiro positivo
   - `quantity`: número inteiro positivo  
   - `items`: array obrigatório (mínimo 1 item)

---

## 🚦 **Fluxo Recomendado para Testes**

1. **Criar produtos** com estoque suficiente
2. **Testar pedido pendente** (não atualiza estoque)
3. **Verificar estoque** permanece igual
4. **Testar pedido concluído** (atualiza estoque)
5. **Verificar estoque** foi reduzido
6. **Testar erro de estoque** insuficiente
7. **Testar produto inexistente**

**Pronto para testar! 🎉**