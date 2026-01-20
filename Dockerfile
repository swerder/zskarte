FROM node:22.14.0-slim AS build

# Create app directory
WORKDIR /app

# npm install
ADD ./package.json /app/package.json
ADD ./package-lock.json /app/package-lock.json
ADD ./packages/server/package.json /app/packages/server/package.json
RUN npm ci 

# Copy all files
ADD . /app

# npm lint
RUN npm run lint:server
# npm build
RUN  npm run build:types && npm run build:common && NODE_ENV=production npm run build:server && rm -rf /app/packages/server/src

#throw away dependencies not needed for run
RUN npm prune --omit=dev

FROM node:22.14.0-slim AS release
# switzerchees: Optimize for alpine again fix sharp install issue first
# FROM node:22.14.0-alpine AS release
# RUN apk update && apk add --no-cache tzdata

WORKDIR /app
ENV HOST=0.0.0.0
USER node
EXPOSE 1337

# start command
CMD ["npm", "run", "start:server:prod"] 

LABEL org.opencontainers.image.source=https://github.com/swerder/zskarte
LABEL org.opencontainers.image.description="Zivilschutz Karte Server (fork by swerder)"
LABEL org.opencontainers.image.licenses=MIT
COPY --from=build --chown=node:node /app/package.json /app/package.json
COPY --from=build --chown=node:node /app/node_modules /app/node_modules
COPY --from=build --chown=node:node /app/packages/server /app/packages/server
