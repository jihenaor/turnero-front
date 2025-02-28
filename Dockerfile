# Etapa 1: Construcción de la aplicación Angular
FROM node:20.17.0 AS build
WORKDIR /app

# Copiar dependencias y código fuente
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

# Compilar la aplicación Angular
RUN npm run build --prod

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/turnero/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
