# Etapa 1: Construcción de la aplicación Angular
FROM node:20.17.0 AS build
WORKDIR /app

# Copiar archivos y descargar dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar código fuente y construir la aplicación
COPY . .
RUN npm run build --prod

# Exportar los archivos estáticos (dist/)
CMD ["cp", "-r", "/app/dist/turnero/browser", "/app/build-output"]
