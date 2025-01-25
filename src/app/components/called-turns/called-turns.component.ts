import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnService } from '../../services/turn.service';
import { Turn } from '../../services/turn.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-called-turns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './called-turns.component.html'
})
export class CalledTurnsComponent implements OnInit {
  calledTurns: Turn[] = [];
  videoUrl: SafeResourceUrl;

  constructor(
    private turnService: TurnService,
    private sanitizer: DomSanitizer
  ) {
    // URL del video publicitario (ejemplo con un video de YouTube)
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/tu-video-id?autoplay=1&mute=1'
    );
  }

  ngOnInit() {
    this.turnService.getCalledTurns().subscribe(turns => {
      this.calledTurns = turns;
    });
  }
} 