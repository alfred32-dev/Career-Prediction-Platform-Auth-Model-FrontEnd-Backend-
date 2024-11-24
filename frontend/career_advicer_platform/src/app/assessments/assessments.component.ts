import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-assessments',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css']
})


export class AssessmentsComponent {
  assessmentStarted: boolean = false;
  buttonText: string = "Get Started";

  constructor(private router: Router) { }

  startAssessment(): void {
    this.assessmentStarted = true;
    this.buttonText = "Continue";
    this.router.navigate(['/assessments/abilities']);
  }
}