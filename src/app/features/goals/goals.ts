import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-goals',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './goals.html',
  styleUrl: './goals.css',
})
export class Goals implements OnInit {
  goalForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  
  // Conteneur pour accueillir le verdict prescriptif de l'algorithme Back-End
  evaluationResult: {
    status: string;
    safeWeeklyRateKg: number;
    caloricDeficitTarget: number;
    warningMessage: string;
  } | null = null;

  private apiUrl = 'http://localhost:5000/api/goals/evaluate';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.goalForm = this.fb.group({
      objective: ['perte', [Validators.required]],
      targetWeightKg: [null, [Validators.required, Validators.min(40), Validators.max(250)]],
      durationWeeks: [null, [Validators.required, Validators.min(1), Validators.max(52)]]
    });
  }

  onSubmit(): void {
    if (this.goalForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.evaluationResult = null;

    // Soumission à l'API. L'intercepteur HTTP injectera automatiquement le jeton JWT
    this.http.post(this.apiUrl, this.goalForm.value).subscribe({
      next: (response: any) => {
        this.isSubmitting = false;
        this.evaluationResult = response;
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || "Erreur lors de l'évaluation métabolique de votre objectif.";
      }
    });
  }

  onConfirmGoal(): void {
    // Une fois l'analyse acceptée par l'utilisateur, direction le tableau de bord de suivi quotidien
    this.router.navigate(['/dashboard']);
  }
}
