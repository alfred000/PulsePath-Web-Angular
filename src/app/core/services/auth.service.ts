import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Ajustez l'URL selon le port de votre API (.NET: 5000 ou Node.js: 3000)
  private apiUrl = 'http://localhost:5000/api/auth'; 

  constructor(private http: HttpClient) {}

  register(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }

  login(credentials: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          // Sauvegarde du jeton de session (CA-01.2)
          localStorage.setItem('pulsepath_token', response.token);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('pulsepath_token');
  }

  logout(): void {
    localStorage.removeItem('pulsepath_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
