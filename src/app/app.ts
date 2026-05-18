import { Component, signal } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { MainContentComponent } from './main-content/main-content';
import { ResumeData } from './models/resume.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Sidebar, MainContentComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  resumeInfo = signal<ResumeData>({
    name: 'Jhon',
    lastName: 'Parker',
    role: 'UX Designer',
    phone: '+000 123 456 789',
    email: 'yourname@gmail.com',
    address: 'Your Street Address, Town/City, zip code',
    about: 'I\'m Parker consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
    education: [
      { years: '2005-2007', degree: 'Degree / Major Name', college: 'Your College name here' },
      { years: '2005-2007', degree: 'Degree / Major Name', college: 'Your College name here' }
    ],
    skills: [
      { name: 'Adobe Photoshop', level: 4.2 },
      { name: 'Adobe Illustrator', level: 4.4 },
      { name: 'Adobe Indesign', level: 4 },
      { name: 'Microsoft Office', level: 4.5 },
      { name: 'MS Powerpoint', level: 4 }
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

  onSkillSelected(skillName: string) {
    console.log(`Клікнуто на навичку: ${skillName}`);
  }
}