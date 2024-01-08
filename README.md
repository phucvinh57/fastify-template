# Fastify Template

[![formatter: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) ![CI](https://github.com/phucvinh57/fastify-template/actions/workflows/ci.yml/badge.svg) ![Deploy](https://github.com/phucvinh57/fastify-template/actions/workflows/release.yml/badge.svg)

Using [fastify](https://www.fastify.io), this template includes:

- API Docs: `Swagger UI`
- Input definition: [`Typebox`](https://github.com/sinclairzx81/typebox)
- ORM: `Prisma`
- Deployment:
  - Dockerfile & docker-compose files
  - Script CI/CD in `.github/workflows`
- Testing: `jest`
- Code linting & styling: `husky` + `prettier`
- Precommit hook: `lint-staged`

For applying conventional commits, refer [commitizen](https://github.com/commitizen/cz-cli).

## 1. Prerequisites

- `docker` v20.10.22
- `docker-compose` v1.29.2
- `node` v18.13.0
- `npm` 8.19.3

## 2. Commands

Note: Fill in `.env` file (use template from `.env.example`) before starts.

- `yarn bootstrap`: Set up development
- `yarn barrels`: Gather export objects from many files in a folder and re-export in `index.ts` file. See configs in `.barrelsby.json`.
- `yarn start`: Start application in dev mode
- `yarn db:migrate`: Apply new migration to current database
- `yarn db:reset`: Reset database and run seed
- `yarn db:deploy`: Deploy all migrations without confirmations (use in production)
- `yarn db:generate`: Just generate prisma client library
- `yarn db:studio`: Interact with database by a web UI
- `yarn lint`: Check linting
- `yarn format`: Format code
- `yarn start:docker`: Run `docker-compose.dev.yml` file to set up local database
- `yarn clean:docker`: Remove local database instance include its data.
- `yarn clean:git`: Clean local branches which were merged on remote
- `yarn test <test_label>`: Run test with label `<test_label>`. For example: `yarn test auth` will run all tests in `auth.test.ts` or `auth.spec.ts` file.

## 3. Project structure

```py
📦prisma
 ┣ 📂migrations     # All SQL migration scripts go here
 ┣ 📜schema.prisma  # Database schema declaration
 ┗ 📜seed.ts        # Generate sample data script
📦src
 ┣ 📂configs        # Contain environment variables & other app configurations
 ┣ 📂constants      # Constants and enums go here
 ┣ 📂dtos           # Schema for input (from requests) & output (from responses)
 ┃ ┣ 📂in
 ┃ ┣ 📂out
 ┃ ┗ 📂common           # Reusable schemas
 ┣ 📂handlers       # Handlers, which are responsible for handling core business logic
 ┣ 📂interfaces     # Interfaces
 ┣ 📂plugins        # Plugin, in charge of organizing api routings & registering middleware
 ┣ 📂repositories   # Datasource configurations & connections. Could have more than one datasource.
 ┣ 📂services       # 3rd-party services or business logic services
 ┣ 📂types          # Types
 ┣ 📂utils          # Helping classes and functions
 ┣ 📜Server.ts      # Server setting & binding modules
 ┗ 📜index.ts       # Program entry
```

## 4. Appendix

This section contains some useful information for development.

### Testing

These are some best practices for testing and overall quality:

1. At the very least, write API (component) testing.
2. Include 3 parts in each test name
3. Structure tests by the AAA pattern
4. Ensure Node version is unified
5. Avoid global test fixtures and seeds, add data per-test
6. Check your test coverage, it helps to identify wrong test patterns
7. Refactor regularly using static analysis tools
8. Mock responses of external HTTP services
9. Test your middlewares in isolation
10. Specify a port in production, randomize in testing
11. Test the five possible outcomes

### Code linting & formating

We use [`eslint`](https://eslint.org/) to find and fix problem in code, such as:

- Unused variables
- Use `var` declaration
- Loosely comparation using `==`
- ...

You can run this command to test eslint script:

```bash
yarn lint
```

To maintain only one style coding across members, we use [`prettier`](https://prettier.io/). Try:

```bash
yarn format
```

You don't need to run these scripts regularly or before commiting code. They are run automatically before `git commit` command by setting as a precommit script. In some circumstances, precommit script is not enabled by default, just type two commands below to fix it:

```bash
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

For a tip, two plugins above could be installed in `VSCode`'s extensions.

### Barrelsby & Path alias

```py
............
 ┣ 📂controllers
 ┃ ┗ 📜user.ctrler.ts
 ┣ 📂routes
 ┃ ┗ 📜user.route.ts
 ┣ 📂schemas
 ┃ ┣ 📂in
 ┃ ┃ ┣ 📜ids.schema.ts
 ┃ ┃ ┣ 📜user.schema.ts
 ┃ ┃ ┗ 📜index.ts
............
```

Imagine you are in `user.ctrler.ts` and want to import `ASchema` from `ids.schema.ts`. The code can be like this:

```typescript
import { ASchema } from '../schemas/in/ids.schema.ts'
```

The more nested folders, the more bad looking importation. It is waste time to guess how many `..` should be put in relative path.

The solution is [`barrelsby`](https://www.npmjs.com/package/barrelsby) and **path alias**. With configurations in `.barrelsby.json`, barrelsby can import your entire code base in a specific folder, and re-export them in `index.ts` file.

Try this:

```bash
yarn barrels
```

To avoid using many `..` in relative path, config path alias in `tsconfig.json`. See the guideline [here](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping).

### Git working culture

- For every updates, DO NOT push directly to `master` branch. Create a new branch, commit, publish branch and create a pull request (PR) instead.
- A branch should have prefix `feat/` for a feature update, prefix `hotf/` for a hotfix, `improv/` for an improvement ...
- A PR should be small enough to review. To split a large PR, use [stacked PRs](https://blog.logrocket.com/using-stacked-pull-requests-in-github/).

### About Prisma ORM

- [Database schema](https://www.prisma.io/docs/concepts/components/prisma-schema)
- [Type mapping Prisma & PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql#type-mapping-between-postgresql-to-prisma-schema)
- [Schema references](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
