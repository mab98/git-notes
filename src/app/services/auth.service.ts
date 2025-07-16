import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

type GitHubProfile = {
  html_url?: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<firebase.User | null>;
  private githubProfileUrlSubject = new BehaviorSubject<string | null>(null);
  githubProfileUrl$ = this.githubProfileUrlSubject.asObservable();

  // Move this below the constructor!
  userWithProfile$: Observable<{
    user: firebase.User | null;
    githubUrl: string | null;
  }>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;

    // Safe to use this.user$ here now
    this.userWithProfile$ = combineLatest([
      this.user$,
      this.githubProfileUrl$,
    ]).pipe(map(([user, githubUrl]) => ({ user, githubUrl })));
  }

  async loginWithGitHub(): Promise<void> {
    const provider = new firebase.auth.GithubAuthProvider();
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      const profile = result.additionalUserInfo?.profile as
        | GitHubProfile
        | undefined;
      this.setGitHubProfileUrl(profile);
    } catch (error) {
      console.error('GitHub login error:', error);
    }
  }

  logout(): Promise<void> {
    this.githubProfileUrlSubject.next(null);
    return this.afAuth.signOut();
  }

  private setGitHubProfileUrl(profile?: GitHubProfile): void {
    const url = profile?.html_url ?? null;
    this.githubProfileUrlSubject.next(url);
  }
}
