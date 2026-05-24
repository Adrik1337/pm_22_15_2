import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/services'; // перевір, чи такий шлях до сервісу

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Перевіряємо через наш сервіс, чи користувач залогінений
  if (authService.isLoggedIn()) {
    return true; // Дозволяємо перейти на резюме
  } else {
    alert('Доступ заборонено! Спочатку потрібно авторизуватися.');
    router.navigate(['/login']); // Силком повертаємо на сторінку входу
    return false;
  }
};