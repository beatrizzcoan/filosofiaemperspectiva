# pbe-agenda

### Rodando

- Subir banco de dados: `docker-compose up -d`
- Instalar dependências: `npm install`
- Rodar node: `npm run dev`
- Pronto, está rodando em `http://localhost:8080`

### Endpoints da API

#### Users

- `POST /users`: Cria um novo usuário.
  - **Body**:
    ```json
    {
      "name": "string",
      "email": "string"
    }
    ```
- `GET /users`: Retorna uma lista de todos os usuários.
- `GET /users/:id`: Retorna um usuário pelo seu ID.

#### Calendars

- `POST /calendars`: Cria um novo calendário.
  - **Body**:
    ```json
    {
      "name": "string",
      "ownerId": "number"
    }
    ```
- `GET /calendars`: Retorna uma lista de todos os calendários.
- `GET /calendars/:id`: Retorna um calendário pelo seu ID.
- `GET /calendars/owner/:ownerId`: Retorna uma lista de calendários de um usuário específico.
- `PUT /calendars/:id`: Atualiza um calendário.
  - **Body**:
    ```json
    {
      "name": "string"
    }
    ```
- `DELETE /calendars/:id`: Deleta um calendário pelo seu ID.

#### Events

- `POST /events`: Cria um novo evento.
  - **Body**:
    ```json
    {
      "description": "string",
      "startDateTime": "Date",
      "duration": "number",
      "frequency": "string",
      "calendarId": "number"
    }
    ```
- `GET /events`: Retorna uma lista de todos os eventos.
- `GET /events/:id`: Retorna um evento pelo seu ID.
- `PUT /events/:id`: Atualiza um evento.
  - **Body**:
    ```json
    {
      "description": "string",
      "startDateTime": "Date",
      "duration": "number",
      "frequency": "string"
    }
    ```

#### Notifications

- `GET /notifications/:id`: Retorna as notificações de um usuário.

### Modelos de Dados

#### User

| Campo | Tipo   | Descrição        |
| ----- | ------ | ---------------- |
| id    | number | ID do usuário    |
| name  | string | Nome do usuário  |
| email | string | Email do usuário |

#### Calendar

| Campo   | Tipo   | Descrição                |
| ------- | ------ | ------------------------ |
| id      | number | ID do calendário         |
| name    | string | Nome do calendário       |
| ownerId | number | ID do dono do calendário |

#### Event

| Campo         | Tipo   | Descrição                                                   |
| ------------- | ------ | ----------------------------------------------------------- |
| id            | number | ID do evento                                                |
| description   | string | Descrição do evento                                         |
| startDateTime | Date   | Data e hora de início do evento                             |
| duration      | number | Duração do evento em minutos                                |
| frequency     | string | Frequência do evento (NONE, DAILY, WEEKLY, MONTHLY, YEARLY) |
| calendarId    | number | ID do calendário ao qual o evento pertence                  |
