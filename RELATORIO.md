# Relatório Técnico — Filosofia em Perspectiva

## 1. Identificação e Casos de Uso

### Descrição da Aplicação
"Filosofia em Perspectiva" é uma aplicação web que conecta sabedoria filosófica a desafios cotidianos, permitindo que usuários acessem histórias e reflexões.

### Atores
- **Visitante**: usuário não autenticado.  
- **Usuário Cadastrado (Membro Explorador)**: usuário autenticado no sistema.

### Casos de Uso (Descritivo)
- **Manter Conta (Auth)**
  - O ator pode se registrar (Criar conta).
  - O ator pode fazer login (Obter token JWT).
  - O ator pode atualizar seu perfil (Nome/Avatar).
  - O ator pode alterar sua senha.

- **Explorar Histórias**
  - O ator pode visualizar a lista de todas as histórias/reflexões disponíveis.
  - O ator pode ler o conteúdo detalhado de uma história específica.

---

## 2. Especificação da API

A API segue o padrão REST e utiliza JSON para comunicação. Autenticação via Bearer JWT.

### Endpoints — Autenticação (Auth)
| Método | Endpoint                | Descrição                                 | Autenticação |
|--------|-------------------------|-------------------------------------------|--------------|
| POST   | /auth/register          | Cria um novo usuário                      | Pública      |
| POST   | /auth/login             | Autentica e retorna um Token JWT          | Pública      |
| GET    | /auth/me                | Retorna dados do usuário logado           | Bearer Token |
| PATCH  | /auth/me                | Atualiza perfil (nome/avatar)             | Bearer Token |
| PUT    | /auth/change-password   | Altera a senha do usuário                 | Pública (body com credenciais) |

### Endpoints — Histórias (Stories)
| Método | Endpoint      | Descrição                                     | Autenticação |
|--------|---------------|-----------------------------------------------|--------------|
| GET    | /stories      | Lista todas as histórias disponíveis          | Pública      |
| GET    | /stories/:id  | Busca detalhes de uma história pelo ID        | Pública      |

### Documentação OpenAPI 3.0 (Swagger)
Para garantir a interoperabilidade e facilitar o consumo da API, a especificação foi formalizada utilizando o padrão OpenAPI 3.0 no arquivo `swagger.yaml`. O contrato da interface descreve os esquemas de dados (User, Story), os métodos de autenticação (Bearer JWT) e as respostas HTTP padronizadas.

A visualização desta documentação pode ser feita através do Swagger Editor colando o conteúdo YAML.

---

## 3. Arquitetura do Backend

O projeto foi desenvolvido utilizando Node.js com Express e TypeScript, seguindo uma Arquitetura em Camadas (MSC - Model, Service, Controller) para garantir a separação de responsabilidades e desacoplamento:

- **Controller** (/src/controllers): responsável por receber as requisições HTTP (Request), validar a entrada básica e devolver a resposta (Response). Não contém regras de negócio complexas.
- **Service** (/src/services): contém lógica de negócio (ex.: verificação de senhas, hashing com bcryptjs, geração de tokens com jsonwebtoken). É a camada que orquestra as operações.
- **Repository** (/src/repository): camada de acesso a dados. Abstrai as chamadas diretas ao banco, facilitando a manutenção.
- **Model** (/src/models): representação das tabelas do banco de dados utilizando o ORM Sequelize. Define os esquemas e relacionamentos (ex: User, Story).

---

## 4. Modelagem de Dados

### Diagrama de Classes (Mermaid)
```mermaid
classDiagram
    class User {
        +Long id
        +String name
        +String email
        +String password
        +String avatarUrl
    }

    class Story {
        +Long id
        +String title
        +String tag
        +String tagColor
        +String content
        +String imageUrl
    }

    class Bookmark {
        +Long id
        +Long userId
        +Long storyId
    }

    User "1" --> "N" Bookmark : hasMany
    Story "1" --> "N" Bookmark : hasMany
    Bookmark --> User : belongsTo
    Bookmark --> Story : belongsTo
````

### Diagrama Entidade-Relacionamento (Mermaid)

```mermaid
erDiagram
    USERS ||--o{ BOOKMARKS : saves
    STORIES ||--o{ BOOKMARKS : is_saved_in

    USERS {
        int id PK
        varchar name
        varchar email UK
        varchar password
        text avatarUrl
        timestamp createdAt
        timestamp updatedAt
    }

    STORIES {
        int id PK
        varchar title
        varchar tag
        text content
        varchar imageUrl
        timestamp createdAt
        timestamp updatedAt
    }

    BOOKMARKS {
        int id PK
        int userId FK
        int storyId FK
        timestamp createdAt
        timestamp updatedAt
    }
```

## 5. Documentação de Instalação e Execução

Pré-requisitos: Docker e Docker Compose.

Passo a Passo:

1. Clone o repositório e acesse a pasta:


```bash
git clone <url-do-repo>
cd filosofia-em-perspectiva
```

2. Execute o Docker Compose:

Este comando subirá o container do PostgreSQL, a API (Backend) e o Cliente (Frontend), além do Adminer para gerenciar o banco.

```bash
docker compose up --build
```

3. Acessar a Aplicação:

- Frontend: Acesse http://localhost:3000 no navegador.

- Backend (API): Rodando em http://localhost:8000.

- Adminer (Banco de Dados): Acesse http://localhost:8888 (Sistema: PostgreSQL, Servidor: postgres, Usuário: postgres, Senha: postgres, Banco: pbe).

4. Populando o Banco (Seed): 

O backend está configurado para rodar um "seed" automático ao iniciar (src/db/seeder.ts), preenchendo o banco com histórias iniciais definidas em stories.json.

## 6. Checklist de Verificação

[x] Endpoints Implementados: Sim (Auth e Stories funcionais).

[x] Arquitetura em Camadas: Sim (Controller, Service, Repository implementados em src/).

[x] Banco de Dados + ORM: Sim (PostgreSQL + Sequelize).

[x] Backend Funcional: Sim (Lógica de login, cadastro e listagem implementada).

[x] Documentação de Execução: Sim (Item 5 acima).

[x] Casos de Uso e API: Sim (Itens 1 e 2 acima).

[x] Diagramas: Sim (Item 4 acima).