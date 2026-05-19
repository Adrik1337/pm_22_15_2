import { Component, OnInit, inject, signal } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { MainContentComponent } from './main-content/main-content';
import { ResumeService } from './services/resume';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Sidebar, MainContentComponent, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  private resumeService = inject(ResumeService);
  
  resumeInfo = signal<any>(null);
  isEditing = signal<boolean>(false);
  
  newName = signal<string>('');
  newlastName = signal<string>(''); 

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.resumeService.getResumeData().subscribe({
      next: (data: any) => {
        this.resumeInfo.set(data);
        
        if (data && data.name) {
          const nameParts = data.name.trim().split(' ');
          this.newName.set(nameParts[0] || '');
          this.newlastName.set(nameParts.slice(1).join(' ') || '');
        }
      },
      error: (err: any) => console.error('Помилка завантаження даних:', err)
    });
  }

  saveProfile() {
    // Зберігаємо ВСІ поля з resumeInfo() і міняємо тільки name
    const updatedData = {
      ...this.resumeInfo(),
      name: `${this.newName()} ${this.newlastName()}`.trim()
    };

    this.resumeService.updateResumeData(updatedData).subscribe({
      next: (response: any) => {
        console.log('Сервер каже:', response.message);
        this.resumeInfo.set(updatedData);
        this.isEditing.set(false);
      },
      error: (err: any) => {
        alert('Помилка збереження!');
        console.error(err);
      }
    });
  }

  onSkillSelected(skillName: string) {
    console.log('Skill selected:', skillName);
  }
}