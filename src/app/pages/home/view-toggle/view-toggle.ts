import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-toggle',
  standalone: false,
  templateUrl: './view-toggle.html',
  styleUrl: './view-toggle.css',
})
export class ViewToggle {
  @Input() viewMode: 'card' | 'table' = 'table';
  @Output() viewModeChange = new EventEmitter<'card' | 'table'>();

  onViewToggle(value: string) {
    this.viewModeChange.emit(value as 'card' | 'table');
  }
}
