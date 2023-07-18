FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm i
COPY main.mjs .
CMD ["node","main.mjs"]