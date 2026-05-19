import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Sidebar } from './sidebar/sidebar';
import { MainContentComponent } from './main-content/main-content';
import { ResumeData } from './models/resume.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Sidebar, MainContentComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  protected readonly title = signal('angular-client');
  isEditing = signal<boolean>(false);

  // Твоє резюме — ТЕПЕР ПОВНЕ ТА З ВСІМА ЕЛЕМЕНТАМИ
  resumeInfo = signal<ResumeData>({
    name: 'Jhon',
    lastName: 'Parker',
    role: 'UX Designer',
    phone: '+000 123 456 789',
    email: 'yourname@gmail.com',
    address: 'Town/City, Your Street Address',
    about: 'I\'m Parker consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
    education: [
      { years: '2005-2007', degree: 'Degree / Major Name 1', college: 'Your College name here' },
      { years: '2007-2009', degree: 'Degree / Major Name 2', college: 'Your College name here' } // Виправлено роки навчання!
    ],
    skills: [
      { name: 'Adobe Photoshop', level: 85 }, // Значення у відсотках для прогрес-барів
      { name: 'Adobe Illustrator', level: 90 },
      { name: 'Adobe Indesign', level: 75 },
      { name: 'Microsoft Office', level: 95 },
      { name: 'MS Powerpoint', level: 80 }
    ],
    experience: [
      { 
        role: 'Senior UX Designer', 
        company: 'Company Name/Location', 
        period: '2019 - present', 
        description: 'Lorem ipsum dolor sit amet, this is a theana consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magand na aliqua. Ut enim ad minim' 
      },
      { 
        role: 'Junior UX Designer', 
        company: 'Company Name/Location', 
        period: '2015 - 2019', 
        description: 'Lorem ipsum dolor sit amet, this is a theana consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magand na aliqua. Ut enim ad minim' 
      }
    ],
    references: [
      { name: 'Jhon Smith', title: 'Company name/Title', phone: '0123 456 7890' },
      { name: 'Jhon Anderson', title: 'Company name/Title', phone: '0123 456 7890' }
    ]
  });

  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.profileForm = this.fb.group({
      firstName: [this.resumeInfo().name, [Validators.required, Validators.minLength(2)]],
      lastName: [this.resumeInfo().lastName, [Validators.required, Validators.minLength(2)]],
      phone: [this.resumeInfo().phone, [Validators.required]],
      email: [this.resumeInfo().email, [Validators.required, Validators.email]],
      address: [this.resumeInfo().address, [Validators.required]] // Можливість редагувати адресу вручну
    }, { 
      validators: this.uniqueNamesValidator 
    });
  }

  uniqueNamesValidator(control: AbstractControl): ValidationErrors | null {
    const first = control.get('firstName')?.value;
    const last = control.get('lastName')?.value;
    if (first && last && first.trim().toLowerCase() === last.trim().toLowerCase()) {
      return { namesMatch: true };
    }
    return null;
  }

  // ШАБЛОННА ФОРМА: Вводиш email/адресу — вони автоматично міняються в резюме!
  onSubmitTemplate(form: any) {
    if (form.valid) {
      const formValue = form.value;
      
      this.resumeInfo.update(info => ({
        ...info,
        email: formValue.regEmail,   // Оновлюємо пошту
        address: formValue.regAddress // Оновлюємо адресу
      }));

      alert('Успішно зареєстровано! Email та адресу в резюме оновлено автоматом.');
      form.resetForm();
    }
  }

  // РЕАКТИВНА ФОРМА: Редагування та збереження змін усіх полів через POST
  saveProfile() {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.value;
      const url = 'https://jsonplaceholder.typicode.com/posts';

      this.http.post(url, updatedData).subscribe({
        next: (response) => {
          alert('Дані профілю успішно оновлено через POST-запит!');

          this.resumeInfo.update(info => ({
            ...info,
            name: updatedData.firstName,
            lastName: updatedData.lastName,
            phone: updatedData.phone,
            email: updatedData.email,
            address: updatedData.address // Зберігаємо ручні правки адреси
          }));

          this.isEditing.set(false);
        },
        error: (err) => console.error('Помилка POST:', err)
      });
    }
  }

  onSkillSelected(event: any) {
    console.log('Подія вибору навички:', event);
  }
 // Нова додаткова логіка: перевіряє формат "Слово Слово Число" (наприклад: Львів Бандери 12)
isAddressValid(address: string): boolean {
  if (!address) return true;
  
  // Регулярний вираз: шукає слова, розділені між собою, і число в самому кінці
  const addressRegex = /^.+?\s+.+?\s+\d+.*$/;
  
  return addressRegex.test(address.trim());
}
}