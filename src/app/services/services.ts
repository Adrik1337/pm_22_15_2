import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root' // Це означає, що сервіс буде доступний у всьому додатку (Singleton)
})
export class AuthService {
  // 1. Стан авторизації: зчитуємо початкове значення з пам'яті браузера
  isLoggedIn = signal<boolean>(localStorage.getItem('isLoggedIn') === 'true');

  // 2. Метод для входу
  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn.set(true);
  }

  // 3. Метод для виходу
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAddress');
    this.isLoggedIn.set(false);
  }
}