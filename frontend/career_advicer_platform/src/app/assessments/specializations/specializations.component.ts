import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-abilities',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './specializations.component.html',
  styleUrls: ['./specializations.component.css']
})




export class SpecializationsComponent implements OnInit {
  specializations = [
    { name: "English", selected: false, proficiency: 0 },
    { name: "Fine Arts", selected: false, proficiency: 0 },
    { name: "Foreign Language", selected: false, proficiency: 0 },
    { name: "Economics and Accounting", selected: false, proficiency: 0 },
    { name: "Telecommunication", selected: false, proficiency: 0 },
    { name: "Production and Processing", selected: false, proficiency: 0 },
    { name: "Design", selected: false, proficiency: 0 },
    { name: "Computers and Electronics", selected: false, proficiency: 0 },
    { name: "Medicine & Dentistry", selected: false, proficiency: 0 },
    { name: "Law and Government", selected: false, proficiency: 0 }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  redo(): void {
    this.specializations.forEach(spec => {
      spec.selected = false;
      spec.proficiency = 0;
    });
  }

  continue(): void {
    const specializationsData = this.specializations.map(spec => ({
      name: spec.name,
      proficiency: spec.selected ? spec.proficiency : 0
    }));

    // Save the data temporarily (e.g., local storage, service, etc.)
    localStorage.setItem('specializationsData', JSON.stringify(specializationsData));

    // Proceed to the next subcomponent
    this.router.navigate(['/assessments/skills']);
  }
}

