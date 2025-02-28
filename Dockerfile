# Etapa 1: Construcción de Angular
FROM node:20.17.0 AS build
WORKDIR /app

# Copiar dependencias y código fuente
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

# Compilar la aplicación Angular
RUN npm run build --prod

# Exportar los archivos compilados a una carpeta accesible
CMD ["sh", "-c", "cp -r /app/dist/turnero/browser/* /output/"]
