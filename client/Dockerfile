FROM node:latest as build

ENV VITE_REACT_API_URL=http://localhost:5000

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

USER node

CMD ["nginx", "-g", "daemon off;"]