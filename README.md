## 🚀 nest-url-shortener

This API provides a powerful and scalable solution for managing shortened URLs, built with [NestJS](https://nestjs.com/) and PostgreSQL, and designed for modularity, performance, and maintainability.

### 📦 Features

- 🔗 Convert long URLs into shareable short links with unique `shortCode`;
- 📥 Automatic redirection from the shortened URL to the original URL;
- 📊 The API tracks the number of times each shortened URL has been accessed, providing simple usage analytics;
- 🔐 Authenticated users can list, update, and delete shortened URLs they have created, ensuring secure and personalized control over their links;
- 🗃️ Implements soft deletion to logically remove data without permanently delete, allowing for easy recovery and data integrity;
- 🛡️ Parameter validation using DTOs;
- 🧪 Unit tests with coverage;
- 🧰 CI/CD with GitHub Actions and Git Hooks with Husky;
- 🏷️ Automatic generation of tags and changelogs from commit history;
- 🏗️ Designed with a modular and scalable architecture, ready to handle increased traffic and new features;
- 🔧 Quick local setup using Makefile scripts and docker compose;

---

### 📦 Dependencies

To run this project smoothly, make sure you have the following tools installed:

| Tool     | Description                                      | Recommended Version |
|----------|--------------------------------------------------|---------------------|
| **nvm**  | Node Version Manager to handle multiple Node.js versions | `>= 0.39.0`          |
| **npm**  | Node Package Manager for installing dependencies | `>= 8.x`             |
| **Docker** | Containerization platform for running PostgreSQL and other services | `>= 20.x`            |

---

### 🛠️ Installation

```bash
$ git clone https://github.com/fa-biano/nest-url-shortener.git
$ cd nest-url-shortener
$ make local-setup
```

Running `make local-setup` will execute the scripts below to make the local setup process easier.
<br>Alternatively, you can run each command manually if you prefer:

* `cp .env.example .env` to copy the environment variables. Edit the <strong>.env</strong> file if you need to change the values;
* `nvm use` to ensure node <strong>LTS</strong> version is in use;
* `npm install` to install the project dependencies;
* `docker compose up -d db` will raise a PostgreSQL container to persist app data;

---

### ⚙️ Configuration

Ensure you have an .env file with the following variables:

```bash
NODE_ENV="dev"
API_HOST="http://localhost:3001"
JWT_SECRET="superSecret"
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_NAME=mydatabase
DB_POOL_MAX=20
```
---

### 📁 Modular Architecture Structure
#### Core benefits:
* **Clear Organization**: The folder structure follows a functional logic, making the project more readable and easier to maintain;
* **Module Separation**: Each feature is isolated in its own directory, containing its controller, service, and entities;
* **High Cohesion and Low Coupling**: Modules are independent and can be reused or tested separately without affecting others;
* **Scalability**: Facilitates project growth by allowing new modules to be added without impacting existing ones;

```bash
nest-url-shortener/
├── .github/             # GitHub Actions workflows and templates
├── .husky/              # Git hooks
├── src/
│   ├── auth/
│   │   ├── decorators/
│   │   ├── dtos/
│   │   ├── guards/
│   │   ├── interfaces/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── url/
│   │   ├── dtos/        # Data Transfer Objects
│   │   ├── entities/    # TypeORM entities
│   │   ├── tests/
│   │   ├── url.controller.ts
│   │   ├── url.service.ts
│   │   └── url.module.ts
│   ├── user/
│   │   ├── dtos/        # Data Transfer Objects
│   │   ├── entities/    # TypeORM entities
│   │   ├── tests/
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── user.module.ts
│   ├── app.module.ts
│   └── main.ts
├── .nvmrc
├── docker-compose.yml
├── Makefile
├── README.md
├── CHANGELOG.md
└── ... other NestJS config files
```
---

## ▶️ How to Use

To easily test the available routes in the project, you can import the provided HTTP collection file into your API client (such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/)).

### 🔄 HTTP Collection for Route Testing

1. Open your API client.
2. Import the file `http_collection_request.json` located in the root of the project.
3. Use the pre-configured requests to test endpoints like:
   - `POST /auth/login`
   - `GET /:shortCode`
   - `POST /urls`
   - `PUT /urls/:shortCode`
   - `DELETE /urls/:shortCode`
   - `POST /users`
   - `GET /users/:id`
   - `GET /users/:id/urls`

This collection includes headers, body examples, and authentication flows to streamline your testing process.

---

### 🧭 ToDo — Upcoming Improvements

Here are some planned enhancements for the next updates:

- 🌐 Add Swagger/OpenAPI documentation for all endpoints
- 🧪 Improve test coverage for Auth and User modules
- 🧰 Infrastructure provisioning with Terraform
- 📈 Add observability tools (e.g., logging, metrics, tracing)
- 🕵️‍♂️ Create method to anonymize user data upon deletion
