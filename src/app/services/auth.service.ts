import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  throwError,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<firebase.User | null>;
  private githubProfileUrlSubject = new BehaviorSubject<string | null>(null);
  githubProfileUrl$ = this.githubProfileUrlSubject.asObservable();

  userWithProfile$: Observable<{
    user: firebase.User | null;
    githubUrl: string | null;
  }>;

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
    this.user$ = this.afAuth.authState;

    this.userWithProfile$ = combineLatest([
      this.user$,
      this.githubProfileUrl$,
    ]).pipe(map(([user, githubUrl]) => ({ user, githubUrl })));
  }

  async loginWithGitHub(): Promise<void> {
    const provider = new firebase.auth.GithubAuthProvider();
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      const credential = result.credential as firebase.auth.OAuthCredential;
      const token = credential?.accessToken;

      if (token) {
        localStorage.setItem('githubAccessToken', token);
      } else {
        console.warn('GitHub access token not found.');
      }
    } catch (error) {
      console.error('GitHub login error:', error);
    }
  }

  logout(): Promise<void> {
    this.githubProfileUrlSubject.next(null);
    localStorage.removeItem('githubAccessToken');
    return this.afAuth.signOut();
  }

  getGithubUser(): Observable<any> {
    const token = localStorage.getItem('githubAccessToken');

    if (!token) {
      return throwError(() => new Error('GitHub access token not available.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get('https://api.github.com/user', { headers });
  }
}
