import { Component, inject, OnInit } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { Button } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Student } from '../../../../../shared/models/student.model';
import { StudentService } from '../../../../../core/services/student.service';
import { StudentTableService } from '../../services/student-table.service';

@Component({
    selector: 'app-students-table',
    imports: [TableModule, PaginatorModule, Button],
    templateUrl: './students-table.html',
    styleUrl: './students-table.scss',
})
export class StudentsTable implements OnInit {
    private studentService = inject(StudentService);
    private confirmationService = inject(ConfirmationService);
    private router = inject(Router);
    protected studentTableService = inject(StudentTableService);

    students: Student[] = [];
    loading = true;
    totalRecords = 0;

    private reloadTable() {
        this.loadStudents(this.studentTableService.lastTableEvent);
        this.fetchTotalRecords();
    }

    private fetchTotalRecords() {
        this.studentService.countStudents().subscribe({
            next: (count) => {
                this.totalRecords = count;
            },
            error: (err) => {
                console.log('Error fetching student count', err);
            },
        });
    }

    ngOnInit() {
        this.reloadTable();
    }

    loadStudents(event: TableLazyLoadEvent) {
        this.loading = true;
        const start = event.first ?? 0;
        const limit = event.rows ?? 20;

        this.studentService.getStudents({ start, limit }).subscribe({
            next: (students) => {
                this.students = students;
                this.studentTableService.lastTableEvent = event;
                this.loading = false;
            },
            error: (err) => console.error('Error fetching students', err),
        });
    }

    confirmDelete(event: Event, student: Student) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
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
                    next: () => this.reloadTable(),
                    error: (err) =>
                        console.error('Error deleting student', err),
                });
            },
        });
    }

    viewDetails(student: Student) {
        this.router.navigate(['/students', student.id]);
    }
}
