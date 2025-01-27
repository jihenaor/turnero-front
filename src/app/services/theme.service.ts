import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(this.isDarkMode());
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    // Escuchar cambios en las preferencias del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage['theme']) {
        this.setDarkMode(e.matches);
      }
    });
  }

  private isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark');
  }

  toggleDarkMode(): void {
    this.setDarkMode(!this.darkMode.value);
  }

  private setDarkMode(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage['theme'] = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage['theme'] = 'light';
    }
    this.darkMode.next(isDark);
  }
} 