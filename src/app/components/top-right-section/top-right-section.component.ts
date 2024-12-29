import { Component , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-top-right-section',
  standalone: true,
  imports: [],
  templateUrl: './top-right-section.component.html',
  styleUrl: './top-right-section.component.scss'
})
export class TopRightSectionComponent {
  @Input() qrCode!: string; // L'URL du QR code
  @Output() downloadClicked = new EventEmitter<void>();
  @Output() userIconClicked = new EventEmitter<void>();

  onDownload() {
    this.downloadClicked.emit();
  }

  onUserIconClick() {
    this.userIconClicked.emit();
  }
}
