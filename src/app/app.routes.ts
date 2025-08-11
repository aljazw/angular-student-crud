import { Routes } from '@angular/router';
import { StudentsOverview } from './features/students/pages/students-overview/students-overview';
import { AddStudent } from './features/students/pages/add-student/add-student';

export const routes: Routes = [
    { path: 'students', component: StudentsOverview },
    { path: 'students/add', component: AddStudent },
    { path: '', redirectTo: 'students', pathMatch: 'full'}
];
