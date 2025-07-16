import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  user: firebase.User | null = null;
  githubProfileUrl: string | null = null;
  searchQuery = '';

  private userSubscription?: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.userWithProfile$.subscribe(
      ({ user, githubUrl }) => {
        this.user = user;
        this.githubProfileUrl = githubUrl;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  openYourGists(): void {
    console.log('Your gists clicked');
  }

  openStarredGists(): void {
    console.log('Starred gists clicked');
  }

  openGithubProfile(): void {
    if (this.githubProfileUrl) {
      window.open(this.githubProfileUrl, '_blank', 'noopener');
    } else {
      console.warn('GitHub profile URL is not available.');
    }
  }

  openHelp(): void {
    window.open('https://support.github.com/', '_blank', 'noopener');
  }

  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
  }

  login(): void {
    this.authService.loginWithGitHub();
  }

  logout(): void {
    this.searchQuery = '';
    this.authService.logout();
  }
}
