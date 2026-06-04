import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css',
})
export class Onboarding implements OnInit { // 🔥 Classe épurée "Onboarding"
  profileForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  // URL ajustée pour pointer vers l'endpoint profil de votre API .NET
  private apiUrl = 'http://localhost:5000/api/profile';

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Application stricte des bornes de sécurité (CA-02.1)
    this.profileForm = this.fb.group({
      age: [null, [Validators.required, Validators.min(15), Validators.max(90)]],
      isMale: [true, [Validators.required]],
      heightCm: [null, [Validators.required, Validators.min(100), Validators.max(250)]],
      currentWeightKg: [null, [Validators.required, Validators.min(40), Validators.max(250)]],
      activityFactor: [1.2, [Validators.required, Validators.min(1.2), Validators.max(2.5)]]
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Envoi des données. L'intercepteur HTTP JWT injectera automatiquement le jeton (CA-02.2)
    this.http.post(this.apiUrl, this.profileForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = 'Profil métabolique initialisé avec succès !';
        // Redirection vers l'étape suivante : Définition d'objectifs (US-03)
        setTimeout(() => this.router.navigate(['/goals']), 2000);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || "Erreur lors de l'enregistrement. Vérifiez les contraintes.";
      }
    });
  }
}
