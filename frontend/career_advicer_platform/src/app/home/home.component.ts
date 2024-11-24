import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  careers: string[] = [
    "Accounting", "IT", "Customer Services", "Engineering",
    "HR & Recruitment", "Healthcare & Nursing", "Hospitality & Catering",
    "PR, Advertising & Marketing", "Logistics & Warehouse", "Teaching",
    "Trade & Construction", "Admin", "Legal", "Creative & Design",
    "Retail", "Consultancy", "Manufacturing", "Scientific & QA", "Social Work",
    "Energy, Oil & Gas", "Property", "Charity & Voluntary",
    "Domestic Help & Cleaning"
  ];

  selectedCareers: string[] = [];
  currentIndex: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.selectedCareers = this.getRandomCareers();
  }

  getRandomCareers(): string[] {
    const shuffled = [...this.careers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 9);
  }

  scrollLeft(): void {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.selectedCareers.length - 1;
  }

  scrollRight(): void {
    this.currentIndex = (this.currentIndex < this.selectedCareers.length - 1) ? this.currentIndex + 1 : 0;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
