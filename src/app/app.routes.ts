import { Routes } from "@angular/router";
import { Login } from "./features/auth/login/login";
import { Onboarding } from "./features/auth/onboarding/onboarding";
import { Register } from "./features/auth/register/register";
import { Dashboard } from "./features/dashboard/dashboard";
import { Goals } from "./features/goals/goals";


export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'onboarding', component: Onboarding },
  { path: 'goals', component: Goals },       // 🔥 Nouvelle route d'analyse d'objectifs S.M.A.R.T
  { path: 'dashboard', component: Dashboard }, // 🔥 Nouvelle route cible post-connexion
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

