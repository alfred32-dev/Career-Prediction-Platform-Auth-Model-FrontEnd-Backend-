// Import necessary modules and components for routing
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JoblistingsComponent } from './joblistings/joblistings.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AbilitiesComponent } from './assessments/abilities/abilities.component';
import { SpecializationsComponent } from './assessments/specializations/specializations.component';
import { SkillsComponent } from './assessments/skills/skills.component';
import { ResultsComponent } from './assessments/results/results.component';
import { SchoolWorkComponent } from './assessments/school-work/school-work.component';
import { AuthGuard } from './auth/auth.guard';
 
// Define application routes
export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'assessments',
        component: AssessmentsComponent,
        canActivate: [AuthGuard], // Protect the route with AuthGuard
        children: [

            { path: 'abilities', component: AbilitiesComponent },
            { path: 'school-work', component: SchoolWorkComponent },
            { path: 'specializations', component: SpecializationsComponent },
            { path: 'skills', component: SkillsComponent },
            { path: 'results', component: ResultsComponent }
        ]
    },
    {
        path: 'joblistings',
        component: JoblistingsComponent,
        canActivate: [AuthGuard], // Protect the route with AuthGuard
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full', // Redirect to '/home' on empty path
    },
];
