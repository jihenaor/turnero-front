import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-black h-full">
      <iframe [src]="videoUrl"
              class="w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
      </iframe>
    </div>
  `
})
export class VideoDisplayComponent {
  @Input() videoUrl: SafeResourceUrl = '';
} 