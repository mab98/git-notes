import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Subject, takeUntil } from 'rxjs';
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

  private destroy$ = new Subject<void>();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userWithProfile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ user, githubUrl }) => {
        this.user = user;
        this.githubProfileUrl = githubUrl;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this.authService
      .getGithubUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          window.open(user.html_url, '_blank', 'noopener,noreferrer');
        },
        error: (err) => {
          console.error('Failed to fetch GitHub user:', err);
        },
      });
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
