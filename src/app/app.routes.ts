import { Routes } from '@angular/router';
import { StudentsOverview } from './features/students/pages/students-overview/students-overview';

export const routes: Routes = [
    { path: 'overview', component: StudentsOverview },
    { path: '', redirectTo: 'overview', pathMatch: 'full'}
];
