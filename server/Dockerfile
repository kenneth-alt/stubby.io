FROM node:latest

ENV PORT=5000
ENV DATABASE_URL=postgres://postgres:fcukcrdsa@localhost:5432/stubby_io
ENV BASE_URL=http://localhost:80

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]