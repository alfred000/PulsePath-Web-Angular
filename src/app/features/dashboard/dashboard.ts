import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, DecimalPipe, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  // Objet d'envoi calqué sur la nomenclature anglaise de vos APIs
  formLog = {
    weight: null,
    caloriesIn: null,
    steps: null,
    sleepHours: null,
    proteinsIn: null,
    workoutsDone: 0,
    fastingValidated: false
  };

  dashboard: any = null;
  private apiUrl = 'http://localhost:5000/api/pulsepath';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Récupération de l'historique et de l'état du tableau de bord
    this.http.get(`${this.apiUrl}/history`).subscribe({
      next: (data) => this.dashboard = data,
      error: (err) => console.error('Erreur de chargement du dashboard', err)
    });
  }

  onSaveLog(): void {
    // Soumission protégée automatiquement par l'intercepteur HTTP JWT
    this.http.post(`${this.apiUrl}/log`, this.formLog).subscribe({
      next: (response: any) => {
        this.dashboard = response.updatedDashboard;
        this.resetForm();
      },
      error: (err) => console.error('Erreur lors de la journalisation', err)
    });
  }

  private resetForm(): void {
    this.formLog = {
      weight: null,
      caloriesIn: null,
      steps: null,
      sleepHours: null,
      proteinsIn: null,
      workoutsDone: 0,
      fastingValidated: false
    };
  }
}
