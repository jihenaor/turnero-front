# Xx

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

docker compose build
docker compose up -d


docker run -d -p 8080:80 angular-app


pitar y/o hablar
Incluir correo electronico y celular en la atencion
Quitar numero de factura
Trasladar un turno de servicio
Hacer una pausa de fuera de servicio por receso
Historia de recesos y motivo de receso e ingreso
si no hay que asesores para el servicio en los servicios no deberia verse
Cuando el tiempo de atencion a un usuario se acerque al limite que muestre una alarma
Filtros de consulta de encuesta
citas por area
Imprimir factura con codigo de barras


4. Cómo Desplegar Todo
Construir Angular y copiar los archivos:

🚀 Esto ejecutará la compilación de Angular y guardará los archivos en el volumen compartido.

Iniciar Nginx para servir Angular:

docker-compose up -d nginx
🚀 Ahora Nginx servirá la aplicación Angular desde /usr/share/nginx/html/.

Probar la Aplicación

Abre en el navegador:

http://localhost/turnero-web/
Si tienes Nginx reverse proxy en otro contenedor, usa:

http://localhost:80/turnero-web/


ng serve --proxy-config proxy.conf.json
