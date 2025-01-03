import { Component , Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent  {
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
