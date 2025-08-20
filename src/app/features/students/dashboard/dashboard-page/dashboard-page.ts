import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { StudentsTable } from '../components/students-table/students-table';

@Component({
    selector: 'app-dashboard-page',
    imports: [StudentsTable, ButtonModule],
    templateUrl: './dashboard-page.html',
    styleUrl: './dashboard-page.scss'
})
export class DashboardPage {
    constructor(private router: Router) {}

    goToAddStudent() {
        this.router.navigate(['/students/add']);
    }

}
