import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})


export class SkillsComponent implements OnInit {
  skills = {
    activeListening: 10,
    activeLearning: 10,
    criticalThinking: 10,
    monitoring: 10,
    oralExpression: 10
  };

  constructor(private router: Router) { }

  ngOnInit(): void { }

  save(): void {
    const skillsData = this.skills;

    // Save the data temporarily (e.g., local storage, service, etc.)
    localStorage.setItem('skillsData', JSON.stringify(skillsData));

    // Navigate to results view
    this.router.navigate(['/assessments/results']);
  }
}
