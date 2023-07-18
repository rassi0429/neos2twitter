FROM node:18
WORKDIR /app
COPY package.json .
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN pnpm i
COPY main.mjs .
CMD ["node","main.mjs"]