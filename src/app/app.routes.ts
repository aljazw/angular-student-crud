import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () =>
            import(
                './features/students/dashboard/dashboard-page/dashboard-page'
            ).then((m) => m.DashboardPage),
    },
    {
        path: 'students/add',
        loadComponent: () =>
            import(
                './features/students/add/student-add-page/student-add-page'
            ).then((m) => m.StudentAddPage),
    },
    {
        path: 'students/:id',
        loadComponent: () =>
            import(
                './features/students/details/student-details-page/student-details-page'
            ).then((m) => m.StudentDetailsPage),
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
