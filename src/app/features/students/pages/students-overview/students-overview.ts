import { Component } from '@angular/core';
import { StudentsTable } from '../../components/students-table/students-table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-students-overview',
    imports: [CommonModule, StudentsTable],
    templateUrl: './students-overview.html',
    styleUrl: './students-overview.scss'
})
export class StudentsOverview {

    constructor(private router: Router) {}

    goToAddStudent() {
        this.router.navigate(['/students/add']);
    }
    
}
