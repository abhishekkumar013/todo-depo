FROM oven/bun:1

WORKDIR /app

COPY . .

RUN bun install

RUN bun run generate:db

EXPOSE 3002

CMD ["bun"," start:ws"]