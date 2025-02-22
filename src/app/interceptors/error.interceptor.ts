import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Interceptor capturó error:', error);

        let errorMsg = 'Ha ocurrido un error desconocido';
        let title = 'Error';

        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 0:
              title = 'Error de conexión';
              errorMsg = 'No se pudo conectar al servidor';
              break;
            case 400:
              errorMsg = error.error?.message || 'Solicitud incorrecta';
              break;
            case 401:
              errorMsg = 'No autorizado';
              this.router.navigate(['/login']);
              break;
            case 403:
              errorMsg = 'Acceso denegado';
              break;
            case 404:
              errorMsg = 'Recurso no encontrado';
              break;
            case 500:
              errorMsg = 'Error interno del servidor';
              break;
            default:
              errorMsg = `Error ${error.status}: ${error.error?.message || error.statusText}`;
          }
        }

        Swal.fire({
          title,
          text: errorMsg,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });

        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
