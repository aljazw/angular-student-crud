import { Routes } from '@angular/router';
import { DashboardPage } from './features/students/dashboard/dashboard-page/dashboard-page';
import { StudentDetailsPage } from './features/students/details/student-details-page/student-details-page';
import { StudentAddPage } from './features/students/add/student-add-page/student-add-page';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardPage },
    { path: 'students/add', component:  StudentAddPage},
    { path: 'students/:id', component: StudentDetailsPage },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];
