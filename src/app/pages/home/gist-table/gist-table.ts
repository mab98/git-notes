import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gist } from '../../../models/gist.model';

@Component({
  selector: 'app-gist-table',
  standalone: false,
  templateUrl: './gist-table.html',
  styleUrl: './gist-table.css',
})
export class GistTable {
  @Input() gists: Gist[] = [];
  @Input() isLoggedIn = false;
  @Input() displayedColumns: string[] = [];
  @Output() gistClick = new EventEmitter<Gist>();
  @Output() fork = new EventEmitter<string>();
  @Output() star = new EventEmitter<string>();

  getGistName(gist: Gist): string {
    return gist?.files ? Object.keys(gist.files)[0] : 'N/A';
  }
}
