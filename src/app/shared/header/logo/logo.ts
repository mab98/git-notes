import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: false,
  templateUrl: './logo.html',
  styleUrl: './logo.css',
})
export class Logo {
  @Output() logoClick = new EventEmitter<void>();

  handleClick() {
    this.logoClick.emit();
  }
}
