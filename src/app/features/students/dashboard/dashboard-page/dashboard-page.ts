import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { StudentsTable } from '../components/students-table/students-table';
import { ThemeSwitchButton } from '../components/theme-switch-button/theme-switch-button';

@Component({
    selector: 'app-dashboard-page',
    imports: [StudentsTable, ButtonModule, ThemeSwitchButton],
    templateUrl: './dashboard-page.html',
    styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
    private router = inject(Router);

    goToAddStudent() {
        this.router.navigate(['/students/add']);
    }
}
