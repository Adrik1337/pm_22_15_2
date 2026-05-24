import { Routes } from '@angular/router';
import { authGuard } from './auth.guard'; // Перевір, чи файл auth.guard.ts лежить в src/app/

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    // Перевір, чи папка називається саме login і файл login.component.ts всередині неї
    loadComponent: () => import('./login/login').then(m => m.LoginComponent)
  },
  {
    path: 'resume',
    loadComponent: () => import('./resume/resume').then(m => m.ResumeComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];