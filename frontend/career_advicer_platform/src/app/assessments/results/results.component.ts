import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentService } from '../../services/assessment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  loading = false;
  assessmentStarted: boolean = false;

  loadingMessage = 'Submitting your assessment data...';
  jobFamilies: string[] = [];  // Array to hold job families

  constructor(
    private router: Router,
    private assessmentService: AssessmentService
  ) {}

  ngOnInit(): void {}

  confirm(): void {
    this.loading = true;

    // Step 1: Get the transformed data and save it to local storage
    this.assessmentService.getAssessmentData();

    // Step 2: Retrieve the saved data from local storage
    const finalData = JSON.parse(localStorage.getItem('final') || '{}');

    // Step 3: Send the final object to the backend
    this.assessmentService.submitAssessmentData(finalData).subscribe(
      (response: any) => {
        console.log('Data submitted successfully:', response);
        this.loading = false;
        
        // Extracting careers from the response
        this.jobFamilies = response.careers || [];  // Assuming 'careers' is the key in the response

        // Handle successful response, e.g., show recommendations in the UI
      },
      error => {
        console.error('Error submitting data:', error);
        this.loading = false;
        // Handle error response, e.g., show an error message
      }
    );
  }

  redo(): void {
    this.router.navigate(['/assessments']);
    this.assessmentStarted = true;


  }
}
