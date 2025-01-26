# Etapa 1: Construcción de la aplicación Angular
FROM node:20.17.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --prod

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/tu-aplicacion-angular /usr/share/nginx/html
EXPOSE 80
