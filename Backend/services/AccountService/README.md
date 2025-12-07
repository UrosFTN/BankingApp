# Account Service

Node.js + TypeScript gRPC service for account management (create, list, get, deposit, withdraw, transfer).

## Scripts

- `npm run dev` — start with ts-node-dev
- `npm run build` — compile to dist
- `npm run start` — run compiled code
- `npm run proto:generate` — generate TS defs from `proto/account.proto`
- `npm run migrate:up` — apply migrations
- `npm run migrate:down` — rollback migrations

## Env

See `.env.example` for defaults.
