## 🚀 nest-url-shortener

A modern and efficient URL shortener built with [NestJS](https://nestjs.com/), using TypeScript, PostgreSQL, and best development practices.

### 📦 Features

- 🔗 Generate short URLs with unique `shortCode`
- 📥 Automatic redirection to the original URL
- 📊 Access logging (optional)
- 🛡️ Parameter validation and security with pipes
- 🧪 Unit and e2e tests with coverage
- 🧰 CI/CD with GitHub Actions and Husky

---

### 📦 Dependencies

To run this project smoothly, make sure you have the following tools installed:

| Tool     | Description                                      | Recommended Version |
|----------|--------------------------------------------------|---------------------|
| **nvm**  | Node Version Manager to handle multiple Node.js versions | `>= 0.39.0`          |
| **npm**  | Node Package Manager for installing dependencies | `>= 8.x`             |
| **Docker** | Containerization platform for running PostgreSQL and other services | `>= 20.x`            |


### 🛠️ Installation

```bash
$ git clone https://github.com/fa-biano/nest-url-shortener.git
$ cd nest-url-shortener
$ make local-setup
```

### ⚙️ Configuration

Create a .env file with the following variables:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=shortener
ENV=dev
```

### 📁 Folder Structure

```bash
nest-url-shortener/
├── .github/             # GitHub Actions workflows
├── .husky/              # Git hooks
├── src/
│   ├── url/
│   │   ├── dtos/        # Data Transfer Objects
│   │   ├── entities/    # TypeORM entities
│   │   ├── url.service.ts
│   │   ├── url.service.spec.ts
│   │   ├── url.controller.ts
│   │   └── url.module.ts
│   └── app.module.ts
├── .gitignore
├── .nvmrc
├── .prettierrc
├── docker-compose.yml
├── eslint.config.mjs
├── Makefile
├── nest-cli.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

### ▶️ Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### 🧪 Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
