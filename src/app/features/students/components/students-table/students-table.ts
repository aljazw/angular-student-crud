import { Component  } from '@angular/core';
import { Student } from '../../../../shared/models/student.model';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { StudentService } from '../../../../core/services/student.service';
import { PaginatorModule } from 'primeng/paginator';
import { Button } from "primeng/button";
import { ConfirmationService } from 'primeng/api';

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
    latestTableEvent: TableLazyLoadEvent = { first: 0, rows: 20} as TableLazyLoadEvent;

    constructor(private studentService: StudentService, private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.loadStudents(this.latestTableEvent);
        this.fetchTotalRecords();
    }

    loadStudents(event: TableLazyLoadEvent) {
        this.loading = true;
        const start = event.first ?? 0;
        const limit = event.rows ?? 20;
    
        this.studentService.getStudents({ start, limit }).subscribe({
            next: students => {
                this.students = students;
                this.latestTableEvent = event;
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

    confirmDelete(event: Event, student: Student, tableEvent: TableLazyLoadEvent) {
        this.confirmationService.confirm({
            target: event.target as EventTarget, // anchor to the clicked button
            header: '⚠️ Critical Action',
            message: `
                <strong>Do you really want to delete this record?</strong>
                <p/>
                Student ID: ${student.id}<br>
                Name: ${student.name}
            `,
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-secondary',
            accept: () => {
                this.studentService.deleteStudent(student.id!).subscribe({
                    next: () => {
                        this.loadStudents(tableEvent);
                        this.fetchTotalRecords();
                    },
                    error: (err) => console.error('Error deleting student', err),
                });
            },
        });
    }

}
