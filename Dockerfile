# syntax=docker/dockerfile:1

# Étape 1 : build Next.js en production
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml* ./

RUN npm install

COPY . .

RUN npm run build

# Étape 2 : image légère pour exécuter Next.js
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Installer uniquement les dépendances de production
COPY package*.json ./
RUN npm install --omit=dev

# Copier uniquement le nécessaire pour l'exécution
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/.env.local ./

EXPOSE 3000

CMD ["npm", "start"]
