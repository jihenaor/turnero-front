import { Injectable } from '@angular/core';
import { Turn } from '../models/turn.model';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  constructor() {}

  printTurn(turn: Turn, companyConfig: { companyName: string; logoPath: string }) {
    // Crear el contenido HTML del ticket
    const ticketHtml = `
      <div class="print-ticket" style="font-family: Arial, sans-serif; font-size: 14px; padding: 1rem; width: 80mm;">
        <!-- Logo -->
        <div style="text-align: center; margin-bottom: 1rem;">
          <img src="${companyConfig.logoPath}" alt="Logo" style="height: 48px; margin: 0 auto;">
        </div>

        <!-- Información del turno -->
        <div style="text-align: center; margin-bottom: 1rem;">
          <div style="font-weight: bold;">TURNO</div>
          <div style="font-size: 2rem; font-weight: bold;">${turn.turnNumber}</div>
        </div>

        <!-- Detalles -->
        <div style="margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="font-weight: bold;">Servicio:</span>
            <span>${turn.service}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="font-weight: bold;">Módulo:</span>
            <span>${turn.module}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="font-weight: bold;">Fecha:</span>
            <span>${new Date(turn.createdAt).toLocaleString()}</span>
          </div>
        </div>

        <!-- Mensaje final -->
        <div style="text-align: center;">
          <p style="margin-bottom: 0.5rem;">Gracias por su visita</p>
          <p style="font-weight: bold;">${companyConfig.companyName}</p>
        </div>
      </div>
    `;

    // Crear un iframe oculto para manejar la impresión
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'absolute';
    printFrame.style.top = '-10000px';
    printFrame.style.left = '-10000px';

    // Inyectar el iframe en el DOM
    document.body.appendChild(printFrame);

    // Acceder al contenido del iframe y escribir el HTML del ticket
    const printDocument = printFrame.contentWindow?.document || printFrame.contentDocument;
    if (printDocument) {
      printDocument.open();
      printDocument.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print Ticket</title>
            <style>
              /* Estilos adicionales para asegurar la correcta impresión */
              body {
                margin: 0;
                padding: 0;
                width: 80mm; /* Tamaño típico de ticket */
              }
              .print-ticket {
                width: 100%;
              }
            </style>
          </head>
          <body>${ticketHtml}</body>
        </html>
      `);
      printDocument.close();
    }

    // Esperar un momento para que el contenido se cargue, luego imprimir
    printFrame.onload = () => {
      printFrame.contentWindow?.focus();
      printFrame.contentWindow?.print();

      // Eliminar el iframe después de imprimir
      setTimeout(() => {
        document.body.removeChild(printFrame);
      }, 1000);
    };
  }
}
