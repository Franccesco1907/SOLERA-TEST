# Solera user lookup

NestJS/MySQL API that returns a user's full name after verifying their password.

1. Run `npm ci`.
2. Configure `.env`: `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `USER`, `PASSWORD`. `NODE_ENV=test` selects `.test.env`; `NODE_ENV=prod` selects `.prod.env`.
3. Provision the MySQL `Users` table matching `src/users/entities/user.entity.ts`, with bcrypt password hashes. Schema synchronization is disabled; no migrations or seed users are provided.
4. Run `npm run start:dev`. Swagger: `http://localhost:3000/docs`.

Send `POST http://localhost:3000/users` with `{"username":"your-user","password":"your-password"}`. The earlier `admin/admin` example was not a seeded account.

Production: `npm run build`, then `npm run start:prod`. Checks: `npm test -- --runInBand`, `npm run test:e2e -- --runInBand` (requires the configured database), `npm run test:cov`.
