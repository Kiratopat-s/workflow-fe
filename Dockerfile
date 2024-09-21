FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

ENV PORT=8000

EXPOSE 8000

CMD ["pnpm", "start"]