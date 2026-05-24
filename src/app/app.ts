import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './services/services'; // шлях до твоєї папки з сервісом

@Component({
  selector: 'app-root',
  standalone: true,
  // Обов'язково імпортуємо директиви роутера, щоб працювали посилання і <router-outlet>
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'] // або .css, залежно від проєкту
})
export class AppComponent {
  // protected дозволяє використовувати authService прямо в HTML-шаблоні
  constructor(protected authService: AuthService, private router: Router) {}

  logout() {
    // 1. Скидаємо прапорці авторизації в сервісі
    this.authService.logout();
    
    // 2. Перенаправляємо користувача назад на сторінку входу
    this.router.navigate(['/login']);
  }
}