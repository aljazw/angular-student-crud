import { Component } from '@angular/core';
import { StudentsTable } from '../../components/students-table/students-table';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Card, CardModule } from 'primeng/card';

@Component({
    selector: 'app-students-overview',
    imports: [StudentsTable, ButtonModule, CardModule],
    templateUrl: './students-overview.html',
    styleUrl: './students-overview.scss',
})
export class StudentsOverview {

    constructor(private router: Router) {}

    goToAddStudent() {
        this.router.navigate(['/students/add']);
    }
    
}
