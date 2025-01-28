import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TurnListComponent } from './turn-list/turn-list.component';
import { VideoDisplayComponent } from './video-display/video-display.component';
import { LogoHeaderComponent } from '../shared/logo-header/logo-header.component';

@Component({
  selector: 'app-called-turns',
  templateUrl: './called-turns.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TurnListComponent,
    VideoDisplayComponent,
    LogoHeaderComponent
  ]
})
export class CalledTurnsComponent {
  safeVideoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // Reemplaza esta URL con la URL de tu video
    const videoUrl = 'https://www.youtube.com/embed/tu-video-id';
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
} 