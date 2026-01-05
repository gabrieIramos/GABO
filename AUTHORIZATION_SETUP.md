# Sistema de Autorização por Roles (Admin e Cliente)

## Estrutura Implementada

### 1. **Enum de Roles** (`src/auth/enums/role.enum.ts`)
```typescript
export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
}
```

### 2. **Decorator @Roles** (`src/auth/decorators/roles.decorator.ts`)
- Usado para marcar quais roles podem acessar cada endpoint
- Exemplo: `@Roles(UserRole.ADMIN, UserRole.CLIENT)`

### 3. **Guard de Roles** (`src/auth/guards/roles.guard.ts`)
- Valida se o usuário tem permissão para acessar o endpoint
- Funciona em conjunto com o `JwtAuthGuard`
- Lança `ForbiddenException` se o usuário não tem a role necessária

### 4. **Entidade User Atualizada** (`src/users/entities/user.entity.ts`)
- Campo `role` agora usa o enum `UserRole`
- Valor padrão: `UserRole.CLIENT`

## Permissões por Endpoint

### **Products**
| Endpoint | Método | Roles | Descrição |
|----------|--------|-------|-----------|
| `/products` | POST | ADMIN | Criar produto (apenas admin) |
| `/products` | GET | Público | Listar produtos (sem autenticação) |
| `/products/:id` | GET | Público | Ver detalhes do produto |
| `/products/:id` | PATCH | ADMIN | Atualizar produto |
| `/products/:id` | DELETE | ADMIN | Deletar produto |
| `/products/:id/reviews` | POST | ADMIN, CLIENT | Adicionar avaliação |
| `/products/:id/reviews` | GET | Público | Listar avaliações |

### **Orders**
| Endpoint | Método | Roles | Descrição |
|----------|--------|-------|-----------|
| `/orders` | POST | ADMIN, CLIENT | Criar pedido |
| `/orders` | GET | ADMIN | Listar todos os pedidos |
| `/orders/user/:userId` | GET | ADMIN, CLIENT | Ver pedidos (clientes veem apenas seus próprios) |
| `/orders/:id` | GET | ADMIN, CLIENT | Ver detalhes do pedido |
| `/orders/:id` | PATCH | ADMIN | Atualizar pedido |
| `/orders/:id` | DELETE | ADMIN | Deletar pedido |

### **Users**
| Endpoint | Método | Roles | Descrição |
|----------|--------|-------|-----------|
| `/users` | POST | ADMIN | Criar usuário |
| `/users` | GET | ADMIN | Listar todos os usuários |
| `/users/:id` | GET | ADMIN, CLIENT | Ver usuário (clientes veem apenas seus dados) |
| `/users/:id` | PATCH | ADMIN, CLIENT | Atualizar usuário (clientes atualizam apenas seus dados) |
| `/users/:id` | DELETE | ADMIN | Deletar usuário |

## Regras de Negócio

### **Admin**
- ✅ Acesso total a todos os endpoints protegidos
- ✅ Pode criar, editar e deletar produtos
- ✅ Pode visualizar todos os pedidos
- ✅ Pode gerenciar usuários

### **Client**
- ✅ Pode ver produtos e adicionar avaliações
- ✅ Pode criar e visualizar seus próprios pedidos
- ✅ Pode visualizar e editar seus próprios dados
- ❌ Não pode: criar outros usuários, deletar contas, acessar dados de outros usuários

## Como Usar

### 1. **Fazer Login**
```bash
POST /auth/login
Body: { "email": "user@example.com", "password": "senha123" }
```

### 2. **Usar o Token JWT**
```bash
Authorization: Bearer {token}
```

### 3. **Criar Usuário Admin** (apenas na primeira vez)
- Será necessário usar SQL diretamente ou criar endpoint específico:
```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

## Próximos Passos

1. Criar middleware para logar acessos não autorizados
2. Implementar soft-delete para usuários
3. Adicionar verificação de propriedade em endpoints de pedidos
4. Criar endpoint específico para changear role (apenas admin)
5. Adicionar rate limiting por role

