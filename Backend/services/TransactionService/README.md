# Transaction Service

Node.js + TypeScript gRPC service for handling account transactions (deposit, withdraw, transfer) and recording transaction history.

## Scripts

- `npm run dev` — start with ts-node-dev
- `npm run build` — compile to dist
- `npm run start` — run compiled code
- `npm run proto:generate` — generate TS defs from `proto/transaction.proto` and `proto/account.proto`
- `npm run migrate:up` — apply migrations
- `npm run migrate:down` — rollback migrations

## Env

See `.env.example` for defaults.
