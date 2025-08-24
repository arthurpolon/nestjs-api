FROM node:20-slim AS base
WORKDIR /app
###########################################
FROM base AS deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
###########################################
FROM deps AS build
COPY . .
RUN npm run build
###########################################
FROM deps AS prod-deps
RUN npm prune --omit=dev
###########################################
FROM base AS final
ENV NODE_ENV=production
ENV NODE_OPTIONS=--enable-source-maps
COPY --chown=node:node package.json .
COPY --chown=node:node --from=prod-deps /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]