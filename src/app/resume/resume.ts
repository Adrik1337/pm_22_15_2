import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Sidebar } from '../sidebar/sidebar';
import { MainContentComponent } from '../main-content/main-content';
import { ResumeData } from '../models/resume.model';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Sidebar, MainContentComponent],
  templateUrl: './resume.html',
  styleUrls: ['./resume.scss']
})
export class ResumeComponent implements OnInit {
  isEditing = signal<boolean>(false);
  profileForm!: FormGroup;

  resumeInfo = signal<ResumeData>({
    name: 'Jhon',
    lastName: 'Parker',
    role: 'UX Designer',
    phone: '+000 123 456 789',
    email: 'yourname@gmail.com',
    address: 'Your Street Address, Town/City',
    about: 'I\'m Parker consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
    education: [
      { years: '2005-2007', degree: 'Degree / Major Name 1', college: 'Your College name here' },
      { years: '2007-2009', degree: 'Degree / Major Name 2', college: 'Your College name here' }
    ],
    skills: [
      { name: 'Adobe Photoshop', level: 85 },
      { name: 'Adobe Illustrator', level: 90 },
      { name: 'Adobe Indesign', level: 75 },
      { name: 'Microsoft Office', level: 95 },
      { name: 'MS Powerpoint', level: 80 }
    ],
    experience: [
      { role: 'Senior UX Designer', company: 'Company Name/Location', period: '2019 - present', description: 'Lorem ipsum dolor sit amet, this is a theana consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magand na aliqua. Ut enim ad minim' },
      { role: 'Junior UX Designer', company: 'Company Name/Location', period: '2015 - 2019', description: 'Lorem ipsum dolor sit amet, this is a theana consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magand na aliqua. Ut enim ad minim' }
    ],
    references: [
      { name: 'Jhon Smith', title: 'Company name/Title', phone: '0123 456 7890' },
      { name: 'Jhon Anderson', title: 'Company name/Title', phone: '0123 456 7890' }
    ]
  });

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    // Авто-синхронізація: дістаємо дані, які користувач ввів на сторінці логіну
    const savedEmail = localStorage.getItem('userEmail');
    const savedAddress = localStorage.getItem('userAddress');
    
    if (savedEmail || savedAddress) {
      this.resumeInfo.update(info => ({
        ...info,
        email: savedEmail || info.email,
        address: savedAddress || info.address
      }));
    }

    this.initForm();
  }

  initForm() {
    this.profileForm = this.fb.group({
      firstName: [this.resumeInfo().name, [Validators.required, Validators.minLength(2)]],
      lastName: [this.resumeInfo().lastName, [Validators.required, Validators.minLength(2)]],
      phone: [this.resumeInfo().phone, [Validators.required]],
      email: [this.resumeInfo().email, [Validators.required, Validators.email]],
      address: [this.resumeInfo().address, [Validators.required]]
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

  saveProfile() {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.value;
      const url = 'https://jsonplaceholder.typicode.com/posts';

      this.http.post(url, updatedData).subscribe({
        next: () => {
          alert('Дані профілю успішно оновлено через POST-запит!');
          this.resumeInfo.update(info => ({
            ...info,
            name: updatedData.firstName,
            lastName: updatedData.lastName,
            phone: updatedData.phone,
            email: updatedData.email,
            address: updatedData.address
          }));
          this.isEditing.set(false);
        },
        error: (err) => console.error(err)
      });
    }
  }

  onSkillSelected(event: any) {
    console.log('Skill:', event);
  }
}