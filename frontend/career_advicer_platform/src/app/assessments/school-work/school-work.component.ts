import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school-work',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './school-work.component.html',
  styleUrls: ['./school-work.component.css']
})
export class SchoolWorkComponent implements OnInit {
  subjects = [
    { name: "Biology", grade: '', score: 0 },
    { name: "Chemistry", grade: '', score: 0 },
    { name: "Geography", grade: '', score: 0 },
    { name: "Mathematics", grade: '', score: 0 },
    { name: "Physics", grade: '', score: 0 },
    { name: "Psychology", grade: '', score: 0 }
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { }

  updateScore(subject: any): void {
    switch (subject.grade) {
      case '100':
        subject.score = 100;
        break;
      case '80':
        subject.score = 80;
        break;
      case '60':
        subject.score = 60;
        break;
      case '40':
        subject.score = 40;
        break;
      case '20':
        subject.score = 20;
        break;
      default:
        subject.score = 0;
    }
  }

  validateSubjects(): boolean {
    return this.subjects.every(subject => subject.grade !== '');
  }

  redo(): void {
    this.subjects.forEach(subject => {
      subject.grade = '';
      subject.score = 0;
    });
  }

  continue(): void {
    if (!this.validateSubjects()) {
      alert('Please fill in all grades before continuing.');
      return;
    }

    const schoolWorkData = this.subjects.map(subject => ({
      name: subject.name,
      score: subject.score
    }));

    // Save the data temporarily (e.g., local storage, service, etc.)
    localStorage.setItem('schoolWorkData', JSON.stringify(schoolWorkData));

    // Proceed to the next subcomponent
    this.router.navigate(['../specializations'], { relativeTo: this.route });
  }
}
