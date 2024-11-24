import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  private apiUrl = '/api/predict'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Method to fetch and transform assessment data
  getAssessmentData(): any {
    const abilitiesData = JSON.parse(localStorage.getItem('assessmentData') || '{}');
    const schoolWorkData = JSON.parse(localStorage.getItem('schoolWorkData') || '[]');
    const skillsData = JSON.parse(localStorage.getItem('skillsData') || '{}');
    const specializationsData = JSON.parse(localStorage.getItem('specializationsData') || '[]');

    const transformedData = this.transformData(abilitiesData, schoolWorkData, skillsData, specializationsData);

    this.saveTransformedData(transformedData);

    return transformedData;
  }

  private transformData(
    abilitiesData: any,
    schoolWorkData: any[],
    skillsData: any,
    specializationsData: any[]
  ): any {
    const transformed: any = {};

    if (abilitiesData) {
      const cognitiveAbilities = abilitiesData.cognitiveAbilities || {};
      const physicalAttributes = abilitiesData.physicalAttributes || {};

      transformed['Selective_Attention'] = parseInt(cognitiveAbilities.selectiveAttention) || 0;
      transformed['Time_Sharing'] = parseInt(cognitiveAbilities.timeSharing) || 0;
      transformed['Memorization'] = parseInt(cognitiveAbilities.memorization) || 0;
      transformed['Fluency_of_Ideas'] = parseInt(cognitiveAbilities.fluencyOfIdeas) || 0;
      transformed['Stamina'] = parseInt(physicalAttributes.stamina) || 0;
      transformed['Flexibility'] = parseInt(physicalAttributes.flexibility) || 0;
      transformed['Static_Strength'] = parseInt(physicalAttributes.staticStrength) || 0;
    }

    schoolWorkData.forEach((subject: any) => {
      const subjectName = this.formatSubjectName(subject.name);
      transformed[subjectName] = parseInt(subject.score) || 0;
    });

    if (skillsData) {
      Object.keys(skillsData).forEach((key: string) => {
        const formattedKey = this.formatSkillName(key);
        transformed[formattedKey] = parseInt(skillsData[key]) || 0;
      });
    }

    specializationsData.forEach((specialization: any) => {
      const formattedName = this.formatSpecializationName(specialization.name);
      transformed[formattedName] = parseInt(specialization.proficiency) || 0;
    });

    return transformed;
  }

  private formatSubjectName(name: string): string {
    return name.replace(/ /g, '_').replace(/[^a-zA-Z0-9_]/g, '');
  }

  private formatSkillName(name: string): string {
    return name.replace(/ /g, '_').replace(/[^a-zA-Z0-9_]/g, '');
  }

  private formatSpecializationName(name: string): string {
    
    return name.replace(/ /g, '_').replace(/[^a-zA-Z0-9_]/g, '');
  }

  private saveTransformedData(data: any): void {
    localStorage.setItem('final', JSON.stringify(data));
  }

  submitAssessmentData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
