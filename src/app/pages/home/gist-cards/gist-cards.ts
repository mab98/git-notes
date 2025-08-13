import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gist } from '../../../models/gist.model';

@Component({
  selector: 'app-gist-cards',
  standalone: false,
  templateUrl: './gist-cards.html',
  styleUrl: './gist-cards.css',
})
export class GistCards {
  @Input() gists: Gist[] = [];
  @Input() isLoggedIn = false;
  @Output() gistClick = new EventEmitter<Gist>();
  @Output() fork = new EventEmitter<string>();
  @Output() star = new EventEmitter<string>();

  getGistName(gist: Gist): string {
    return gist?.files ? Object.keys(gist.files)[0] : 'N/A';
  }
}
