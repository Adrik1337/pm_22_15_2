import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  // true = показуємо Реєстрацію, false = показуємо Вхід
  isSignUp = signal<boolean>(false); 

  constructor(private authService: AuthService, private router: Router) {}

  isAddressValid(address: string): boolean {
    if (!address) return true;
    const addressRegex = /^.+?\s+.+?\s+\d+.*$/;
    return addressRegex.test(address.trim());
  }

 // Метод для Реєстрації
  onSubmitRegister(form: any) {
    if (form.valid && this.isAddressValid(form.value.regAddress)) {
      // Зберігаємо емейл, ім'я, адресу ТА ПАРОЛЬ
      localStorage.setItem('registeredEmail', form.value.regEmail);
      localStorage.setItem('registeredName', form.value.regName);
      localStorage.setItem('registeredPassword', form.value.regPassword); // Додали пароль
      localStorage.setItem('userAddress', form.value.regAddress);
      localStorage.setItem('userEmail', form.value.regEmail);

      alert('Реєстрація успішна! Перемикаємо на Вхід.');
      this.isSignUp.set(false);
    }
  }

  // Метод для Входу
 onSubmitLogin(form: any) {
    if (form.valid) {
      const savedEmail = localStorage.getItem('registeredEmail');
      const savedPassword = localStorage.getItem('registeredPassword');
      
      // Виведемо в консоль для діагностики
      console.log('Що ввели у форму:', form.value.loginEmail, form.value.loginPassword);
      console.log('Що лежить в пам\'яті:', savedEmail, savedPassword);

      if (form.value.loginEmail === savedEmail && form.value.loginPassword === savedPassword) {
        this.authService.login();
        this.router.navigate(['/resume']);
      } else {
        alert('Неправильний емейл або пароль! Перевірте консоль.');
      }
    }
  }
}