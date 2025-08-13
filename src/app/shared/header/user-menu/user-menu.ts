import { Component, EventEmitter, Input, Output } from '@angular/core';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-user-menu',
  standalone: false,
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu {
  @Input() user!: firebase.User;
  @Input() githubProfileUrl!: string | null;

  @Output() yourGists = new EventEmitter<void>();
  @Output() starredGists = new EventEmitter<void>();
  @Output() githubProfile = new EventEmitter<void>();
  @Output() help = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  emit(event: EventEmitter<void>) {
    event.emit();
  }
}
