# 📦 TESTE DE PRODUTOS - POSTMAN & JEST

## 🚀 JSON para Postman (POST /products)

**URL:** `http://localhost:4000/products`
**Método:** `POST`
**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer SEU_JWT_TOKEN_AQUI"
}
```

**Body (raw JSON):**
```json
{
  "name": "iPhone 15 Pro Max",
  "category": "Electronics",
  "description": "O mais avançado iPhone da Apple com chip A17 Pro, sistema de câmera Pro com 5x zoom óptico e tela Super Retina XDR de 6.7 polegadas",
  "price": 1299.99,
  "stockQuantity": 25
}
```

## 📱 Outros Exemplos de Produtos:

### Notebook Gaming:
```json
{
  "name": "Notebook Gamer Acer Nitro 5",
  "category": "Computers",
  "description": "Notebook gamer com processador Intel Core i7, 16GB RAM, SSD 512GB, GPU NVIDIA RTX 4060",
  "price": 4599.90,
  "stockQuantity": 10
}
```

### Produto de Casa:
```json
{
  "name": "Smart TV Samsung 55\" 4K",
  "category": "Home & Garden",
  "description": "Smart TV LED 55 polegadas 4K UHD com HDR, Tizen OS, WiFi integrado e controle de voz",
  "price": 2399.99,
  "stockQuantity": 15
}
```

### Livro:
```json
{
  "name": "Clean Code - Código Limpo",
  "category": "Books",
  "description": "Habilidades Práticas do Agile Software por Robert C. Martin. Um guia essencial para desenvolvedores",
  "price": 89.90,
  "stockQuantity": 100
}
```

## ⚠️ Validações Implementadas:
- `name`: string obrigatória (1-100 caracteres)
- `category`: string obrigatória (1-50 caracteres)  
- `description`: string obrigatória (1-500 caracteres)
- `price`: número positivo obrigatório (mínimo 0.01)
- `stockQuantity`: número inteiro ≥ 0

## 🔐 Como Obter o JWT Token:

**URL:** `http://localhost:4000/auth/login`
**Método:** `POST`
**Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

Copie o valor de `access_token` e use como `Bearer TOKEN` nos headers.