import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Déclaration de l'interface pour typer la requête (DTO)
export interface DailyLogDto {
  weight: number;
  caloriesIn: number;
  steps: number;
  sleepHours: number;
  proteinsIn: number;
  fastingValidated: boolean;
  workoutsDone: number;
}

@Injectable({
  providedIn: 'root'
})
export class PulsePathService {
  // URL de ton API REST (.NET ou Node.js)
  private apiUrl = 'http://localhost:5000/api/pulsepath'; 

  constructor(private http: HttpClient) { }

  // Envoyer la journalisation et obtenir le diagnostic à 3 blocs
  submitLog(log: DailyLogDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/log`, log);
  }

  // Récupérer l'historique SQLite
  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/history`);
  }
}

