import { Component, ViewEncapsulation,  } from '@angular/core';
import { Student } from '../../../../shared/models/student.model';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { StudentService } from '../../../../core/services/student.service';
import { PaginatorModule } from 'primeng/paginator';
import { Button } from "primeng/button";


@Component({
    selector: 'app-students-table',
    imports: [TableModule, PaginatorModule, Button],
    templateUrl: './students-table.html',
    styleUrl: './students-table.scss',
})
export class StudentsTable {
    students: Student[] = [];
    loading: boolean = true;
    totalRecords: number = 0;

    constructor(private studentService: StudentService) {}

    ngOnInit() {
        this.loadStudents({ first: 0, rows: 20} as TableLazyLoadEvent);
        this.fetchTotalRecords();
    }

    loadStudents(event: TableLazyLoadEvent) {
        this.loading = true;
        const start = event.first ?? 0;
        const limit = event.rows ?? 20;
    
        this.studentService.getStudents({ start, limit }).subscribe({
            next: students => {
                this.students = students;
                this.loading = false;
            },
            error: err => console.error('Error fetching students', err),
        });
    }

    fetchTotalRecords() {
        this.studentService.countStudents().subscribe({
            next: (count) => { this.totalRecords = count; },
            error: (err) => { console.log('Error fetching student count', err)},
        });
    }

    onIconClick() {
        console.log("Icon clicked");
    }

}
