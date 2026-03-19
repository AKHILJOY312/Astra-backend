# Astra Backend

A Node.js + TypeScript backend for the Astra platform, built with Clean Architecture principles. It provides authentication, project and task management, channels and messaging, subscriptions and billing, meetings, and file uploads, with both HTTP APIs and WebSocket events.

**Highlights**
- Modular Clean Architecture layering with DI (Inversify).
- REST APIs under `/api` and a Socket.IO server for real-time features.
- Integrations for MongoDB, Razorpay, AWS S3, LiveKit, Google OAuth, and Nodemailer.

**Core Capabilities**
- Auth and user management (JWT, refresh tokens, Google OAuth, email verification, password reset).
- Projects, members, tasks, comments, and attachments.
- Channels and messages with WebSocket support.
- Meetings with token generation (LiveKit integration).
- Subscription plans, payments, invoices, and admin analytics.

**Tech Stack**
- Node.js, TypeScript, Express
- MongoDB + Mongoose
- Socket.IO for WebSockets
- Inversify for dependency injection
- Zod for validation, Jest for tests, ESLint for linting
- Integrations: Razorpay, AWS S3, LiveKit, Google OAuth, Nodemailer

**Architecture**
- `src/domain`: Core business entities.
- `src/application`: DTOs, ports, use-cases, and application services.
- `src/infra`: External adapters (DB, email, payment, files, web, websocket).
- `src/interface-adapters`: Controllers, validators, HTTP constants.
- `src/config`: DI container, environment, routes, and DB config.

**API Modules (Base: /api)**
- Auth: `/auth`
- Admin: `/admin`, `/admin/auth`, `/admin/users`, `/admin/plans`
- Users: `/user`
- Projects: `/projects` (members, tasks, channels)
- Channels: `/projects/:projectId/channels`
- Attachments: `/attachments`
- Subscriptions: `/subscription`
- Meetings: `/meetings`

**WebSockets**
- Socket server is created in `src/infra/websocket/SocketServer.ts` and wired in `src/infra/web/server.ts`.
- Handlers exist for channels, messages, and meetings in `src/infra/websocket/handlers`.

**Environment Variables**
Create a `.env` file at the project root. Required keys (see `src/config/env.config.ts`):
- `NODE_ENV`, `LOG_LEVEL`, `PORT`, `CLIENT_URL`
- `MONGO_URI`
- `ACCESS_TOKEN_SECRET`, `ACCESS_TOKEN_EXPIRY`
- `REFRESH_TOKEN_SECRET`, `REFRESH_TOKEN_EXPIRY`, `REFRESH_TOKEN_EXPIRY_MS`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`
- `NODEMAILER_EMAIL`, `NODEMAILER_PASSWORD`
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET`, `AWS_S3_BASE_URL`
- `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`

Notes:
- The server currently allows CORS from `http://localhost:5173` and `https://solofashion.shop` in `src/infra/web/server.ts`.
- The app will throw on startup if `MONGO_URI` or `ACCESS_TOKEN_SECRET` is missing.

**Scripts**
- `npm run dev`: Start dev server with nodemon.
- `npm run start`: Start server with ts-node.
- `npm run build`: Compile to `dist/` (tsc + tsc-alias).
- `npm run lint`: Lint sources.
- `npm run test`: Run all tests.
- `npm run test:unit`: Unit tests.
- `npm run test:integration`: Integration tests.

**Local Development**
1. Install dependencies: `npm install`
2. Create `.env`
3. Start: `npm run dev`

**Production**
1. Build: `npm run build`
2. Run: `node dist/infra/web/server.js`

**Docker**
- Build: `docker build -t astra-backend .`
- Run: `docker run --env-file .env -p 3000:3000 astra-backend`

**Tests**
- Test config: `jest.config.ts`
- Test folders: `test/unit`, `test/integration`
