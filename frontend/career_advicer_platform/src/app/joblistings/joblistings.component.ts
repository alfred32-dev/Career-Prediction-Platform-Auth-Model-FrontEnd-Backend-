import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-joblistings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './joblistings.component.html',
  styleUrls: ['./joblistings.component.css']
})
export class JoblistingsComponent implements OnInit {
  searchTerm: string = '';
  jobs: any[] = [];
  careerResults: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const savedCareers = localStorage.getItem('careerResults');
    if (savedCareers) {
      this.careerResults = JSON.parse(savedCareers);
      this.searchJobs();
    }
  }

  searchJobs(): void {
    const keywords = this.searchTerm || this.careerResults.join(' ');
    this.http.get<any>(`http://localhost:5500/api/jobs`, {
      params: { keywords }
    }).subscribe(response => {
      this.jobs = response;
    });
  }
}
