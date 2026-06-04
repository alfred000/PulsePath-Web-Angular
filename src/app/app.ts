import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DailyLogDto, PulsePathService } from './core/services/pulse-path';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Structure vide pour lier les champs du formulaire html
  formLog: DailyLogDto = {
    weight: 84.5,
    caloriesIn: 1600,
    steps: 10000,
    sleepHours: 7.5,
    proteinsIn: 140,
    fastingValidated: true,
    workoutsDone: 1
  };

  dashboard: any = null;

  constructor(private pulsePathService: PulsePathService) {}

  onSaveLog() {
    this.pulsePathService.submitLog(this.formLog).subscribe({
      next: (response) => {
        this.dashboard = response; // Hydrate le dashboard et affiche instantanément les 3 blocs
      },
      error: (err) => console.error("Erreur lors de l'appel API", err)
    });
  }
}
