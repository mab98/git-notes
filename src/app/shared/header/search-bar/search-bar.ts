import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  @Input() searchQuery = '';
  @Output() searchQueryChange = new EventEmitter<string>();

  onEnter() {
    this.searchQueryChange.emit(this.searchQuery);
  }
}
