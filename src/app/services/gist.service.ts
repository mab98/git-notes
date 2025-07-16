import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Gist } from '../models/gist.model';

@Injectable({
  providedIn: 'root',
})
export class GistService {
  private readonly apiUrl = 'https://api.github.com/gists/public';

  constructor(private http: HttpClient) {}

  getPublicGists(): Observable<Gist[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.githubToken}`,
      Accept: 'application/vnd.github+json',
    });

    return this.http.get<Gist[]>(this.apiUrl, { headers });
  }
}
