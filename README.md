# Shanvai Website Development

Monorepo for the **Shanvai Technologies** marketing site and supporting microservices.

## Architecture

```
[ Browser ]
    │
    ▼
Next.js Host Shell (apps/shell)  ←── Module Federation ──→  Chatbot Remote MFE (apps/chatbot)
    │
    ▼
Analytics / Lead API (services/analytics-lead)  →  PostgreSQL
```

## Repository layout

| Path | Role |
|------|------|
| `apps/shell` | Next.js 14 host — landing, products, demo video, contact form |
| `apps/chatbot` | Vite React remote MFE exposing `<ChatbotRemote />` |
| `services/analytics-lead` | Express + TypeScript API (`/api/v1/leads`, `/chat/message`, `/health`) |
| `db/init_schema.sql` | PostgreSQL schema (leads, chat, demo analytics) |
| `docker-compose.yml` | Local Postgres + API |

## Prerequisites

- Node.js 20+
- Docker Desktop (for Postgres / full stack)
- npm 10+

## Quick start

```bash
# 1. Install dependencies (from repo root)
npm install

# 2. Start Postgres and apply schema
npm run db:up
# Schema auto-loads via docker-entrypoint-initdb.d on first boot

# 3. Configure API
cp services/analytics-lead/.env.example services/analytics-lead/.env
cp apps/shell/.env.example apps/shell/.env.local
cp apps/chatbot/.env.example apps/chatbot/.env

# 4. Run services (three terminals)
npm run dev:api       # :4000
npm run dev:chatbot   # :5173 (remoteEntry.js)
npm run dev:shell     # :3000
```

Open [http://localhost:3000](http://localhost:3000).

### API health

```bash
curl http://localhost:4000/api/v1/health
```

### Docker API + Postgres

```bash
npm run stack:up
```

## Key API endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/leads` | Enterprise demo inquiry (Zod-validated) |
| `POST` | `/api/v1/chat/message` | Chatbot turn + Postgres history |
| `GET` | `/api/v1/health` | API + DB health |

AI responses default to a **stub rule engine**. Set `AI_PROVIDER=openai` or `gemini` with the matching API key for live models.

## Production notes

- Host MFEs and API on AWS ECS / EKS
- Use RDS or Supabase for PostgreSQL
- Place Kong (or equivalent) in front of microservices as the API gateway
- Point `NEXT_PUBLIC_CHATBOT_REMOTE_URL` at the published chatbot `remoteEntry.js`

## Brand

Dark deep-tech UI with electric cyan accents (`#1AE0FF`), Space Grotesk + IBM Plex Sans.
