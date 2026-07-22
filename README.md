# Shanvai Website Development

Monorepo for the **Shanvai Technologies** marketing site and supporting microservices.

**GitHub:** https://github.com/paranthamanms/Shanvai-Website-Development

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
| `apps/shell` | Next.js 14 host — landing, products, demo, contact, presence |
| `apps/chatbot` | Vite React remote MFE exposing `<ChatbotRemote />` |
| `services/analytics-lead` | Express + TypeScript API (`/api/v1/leads`, `/chat/message`, `/health`) |
| `db/init_schema.sql` | PostgreSQL schema |
| `Dockerfile` | **Single production container** for `www.shanvai.com` |
| `infrastructure/terraform/web/` | AWS scaffold (same account as Credit Bureau, isolated prefix) |
| `docs/AWS-COEXISTENCE.md` | Coexistence guidance vs Credit Bureau |

## Quick start (local)

```bash
npm install
npm run db:up          # Postgres on host :5433
npm run dev:api        # :4000
npm run dev:chatbot    # :5173
npm run dev:shell      # :3000
```

## Production (www.shanvai.com — one container)

```bash
docker build -t shanvai/www:local -f Dockerfile .
docker compose -f docker-compose.web.yml up --build
# http://localhost:3080
```

Same AWS account as Credit Bureau is effective when Shanvai is a parallel stack (`shanvai-*`). See [docs/AWS-COEXISTENCE.md](docs/AWS-COEXISTENCE.md).

## Key API endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/leads` | Enterprise demo inquiry |
| `POST` | `/api/v1/chat/message` | Chatbot turn + history |
| `GET` | `/api/v1/health` | API + DB health |

## Brand

Light enterprise UI — logo sky (`#0284C7`), slate neutrals, Space Grotesk + IBM Plex Sans.
