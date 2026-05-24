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
    // 1. Дістаємо поточний список користувачів або створюємо порожній масив, якщо ще нікого немає
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // 2. Створюємо об'єкт з даними нового користувача
    const newUser = {
      name: form.value.regName,
      email: form.value.regEmail,
      password: form.value.regPassword,
      address: form.value.regAddress
    };

    // 3. Перевіряємо, чи такий емейл вже не зайнятий
    const userExists = users.some((u: any) => u.email === newUser.email);
    if (userExists) {
      alert('Користувач з такою поштою вже зареєстрований!');
      return;
    }

    // 4. Пушимо нового користувача в масив і зберігаємо весь список у вигляді рядка
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    // Тимчасово зберігаємо поточного для відображення в резюме
    localStorage.setItem('userEmail', newUser.email);
    localStorage.setItem('userAddress', newUser.address);

    alert('Реєстрація успішна!');
    this.isSignUp.set(false);
  }
}

  // Метод для Входу
 onSubmitLogin(form: any) {
  if (form.valid) {
    // 1. Дістаємо масив усіх користувачів
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // 2. Шукаємо користувача, у якого збігаються і пошта, і пароль
    const foundUser = users.find((u: any) => 
      u.email === form.value.loginEmail && u.password === form.value.loginPassword
    );

    if (foundUser) {
      // Якщо знайшли — записуємо його дані як поточну сесію
      localStorage.setItem('userEmail', foundUser.email);
      localStorage.setItem('userAddress', foundUser.address);

      this.authService.login();
      this.router.navigate(['/resume']);
    } else {
      alert('Неправильний емейл або пароль!');
    }
  }
}
}