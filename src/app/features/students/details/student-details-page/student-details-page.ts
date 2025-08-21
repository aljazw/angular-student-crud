import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StudentService } from '../../../../core/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
    Course,
    Student,
    StudentSubject,
} from '../../../../shared/models/student.model';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { EMPTY, switchMap } from 'rxjs';

@Component({
    selector: 'app-student-details-page',
    imports: [ButtonModule, SelectModule, FormsModule],
    templateUrl: './student-details-page.html',
    styleUrl: './student-details-page.scss',
})
export class StudentDetailsPage implements OnInit {
    private studentService = inject(StudentService);
    private route = inject(ActivatedRoute);
    protected router = inject(Router);

    scores: number[] = [5, 6, 7, 8, 9, 10];
    courses: Course[] = [];

    student: Student | null = null;

    editingSubject: StudentSubject | null = null;
    selectedScore: number | null = null;

    editingCourse = false;
    selectedCourse: Course | null = null;

    ngOnInit() {
        this.route.paramMap
            .pipe(
                switchMap((params) => {
                    const idParam = params.get('id');
                    if (!idParam) return EMPTY;
                    const studentId = +idParam;
                    if (isNaN(studentId)) return EMPTY;
                    return this.studentService.getStudent(studentId);
                }),
            )
            .subscribe({
                next: (student) => (this.student = student),
                error: (err) =>
                    console.error('Error fetching student details', err),
            });

        this.studentService.getCourses().subscribe({
            next: (courses) => (this.courses = courses),
            error: (err) => console.log('Error fethcing courses', err),
        });
    }

    protected goBack(router: Router) {
        router.navigate(['/dashboard']);
    }

    editSubject(subject: StudentSubject) {
        this.editingSubject = subject;
        this.selectedScore = subject.score ?? null;
    }

    saveSubject(subject: StudentSubject) {
        if (!this.student || this.selectedScore === null) return;

        const subj = this.student.subjects.find((s) => s.name === subject.name);
        if (!subj) return;

        subj.score = this.selectedScore;

        this.studentService.updateStudent(this.student).subscribe({
            error: (err) => {
                console.error('Error updating student', err);
            },
        });

        this.editingSubject = null;
    }

    cancelEdit(editTarget: 'course' | 'subject') {
        switch (editTarget) {
            case 'course':
                this.editingCourse = false;
                break;
            case 'subject':
                this.editingSubject = null;
                break;
        }
    }

    editCourse(course: Course) {
        this.selectedCourse = course;
        this.editingCourse = true;
    }

    saveCourse() {
        if (!this.selectedCourse || !this.student) return;

        const prevSubjects = this.student.subjects;

        const updatedSubjects = this.selectedCourse.subjects.map(
            (newSubject) => {
                const prev = prevSubjects.find((s) => s.name === newSubject);
                return {
                    name: newSubject,
                    score: prev ? prev.score : null,
                };
            },
        );

        this.student = {
            ...this.student,
            course: this.selectedCourse,
            subjects: updatedSubjects,
        };

        this.studentService.updateStudent(this.student).subscribe({
            error: (err) => {
                console.error('Error updating student', err);
            },
        });

        this.editingCourse = false;
    }
}
