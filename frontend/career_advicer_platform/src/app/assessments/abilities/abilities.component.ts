import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-abilities',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.css']
})
export class AbilitiesComponent implements OnInit {
  cognitiveAbilities = {
    selectiveAttention: 10,
    timeSharing: 10,
    memorization: 10,
    fluencyOfIdeas: 10
  };

  physicalAttributes = {
    stamina: 10,
    flexibility: 10,
    staticStrength: 10
  };

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { }

  redo(): void {
    this.cognitiveAbilities = {
      selectiveAttention: 10,
      timeSharing: 10,
      memorization: 10,
      fluencyOfIdeas: 10
    };

    this.physicalAttributes = {
      stamina: 10,
      flexibility: 10,
      staticStrength: 10
    };
  }

  continue(): void {
    const assessmentData = {
      cognitiveAbilities: this.cognitiveAbilities,
      physicalAttributes: this.physicalAttributes
    };

    // Save the data temporarily (e.g., local storage, service, etc.)
    localStorage.setItem('abilitiesData', JSON.stringify(assessmentData));

    // Proceed to the next subcomponent
    this.router.navigate(['../school-work'], { relativeTo: this.route });
  }
}
