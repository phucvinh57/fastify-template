ARG NODE_VERSION=18.13.0

################## Stage 1 ##################
FROM node:${NODE_VERSION}-alpine as development
WORKDIR /app

COPY package.json yarn.lock tsconfig.json tsconfig.compile.json jest.config.js ./
COPY ./src ./src
COPY ./prisma ./prisma

RUN yarn install --prod && yarn db:generate
RUN yarn add -D jest @types/jest ts-jest
RUN yarn test

RUN yarn build

COPY ./prisma ./dist/prisma
COPY package.json ./dist/

################## Stage 2 ##################
FROM node:${NODE_VERSION}-alpine as production
WORKDIR /app

ENV NODE_ENV=production

COPY --chown=node:node --from=development /app/dist .
COPY --chown=node:node --from=development /app/node_modules node_modules

EXPOSE 8080
CMD yarn db:deploy && node index.js