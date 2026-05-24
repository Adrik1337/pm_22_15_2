import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/services';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Перевіряємо через наш сервіс, чи користувач залогінений
  if (authService.isLoggedIn()) {
    return true; // Дозволяємо перейти на резюме
  } else {
    alert('Доступ заборонено! Спочатку потрібно авторизуватися.');
    router.navigate(['/login']);
    return false;
  }
};