import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-blue-900 p-4">
      <img src="assets/images/serviciudad-logo.png"
           alt="Serviciudad Logo"
           class="mx-auto h-16">
    </div>
  `
})
export class LogoHeaderComponent {
}
