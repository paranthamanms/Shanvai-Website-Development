# syntax=docker/dockerfile:1.7
# Single production container for www.shanvai.com (Next.js shell + embedded chatbot fallback)

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/shell/package.json apps/shell/
COPY apps/chatbot/package.json apps/chatbot/
COPY services/analytics-lead/package.json services/analytics-lead/
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/shell/node_modules ./apps/shell/node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
WORKDIR /app/apps/shell
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S shanvai && adduser -S shanvai -G shanvai

COPY --from=builder /app/apps/shell/public ./apps/shell/public
COPY --from=builder --chown=shanvai:shanvai /app/apps/shell/.next/standalone ./
COPY --from=builder --chown=shanvai:shanvai /app/apps/shell/.next/static ./apps/shell/.next/static

USER shanvai
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ > /dev/null || exit 1

CMD ["node", "apps/shell/server.js"]
