import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { Course, Student, StudentSubject } from '../../../../../shared/models/student.model';
import { StudentService } from '../../../../../core/services/student.service';



function birthDateRangeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const year = new Date(control.value).getFullYear();
    return (year >= 1980 && year <= 2020) ? null : {outOfRange: true};
}

@Component({
    selector: 'app-student-form',
    imports: [ReactiveFormsModule, InputTextModule, DatePickerModule, SelectModule, ButtonModule],
    templateUrl: './student-form.html',
    styleUrl: './student-form.scss'
})
export class StudentForm {
    studentForm!: FormGroup;
    courses: Course[] = [];
    selectedCourse?: Course;
    scores: number[] = [5, 6, 7, 8, 9, 10];

    objectKeys = Object.keys;

    nameErrorMessages: Record<string, string> = {
        required: 'Name is required',
        minlength: 'Name must be at least 4 characters',
        maxlength: 'Name must be at most 40 characters'
    };


    constructor(
        private studentService: StudentService, 
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(){
        this.loadCourses();

        this.studentForm = this.fb.group({
            name: ['Agent Smith', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(40)
            ]],
            email: ['demo.account@domain.com', [
                Validators.required, 
                Validators.email
            ]],
            birthDate: [new Date(2000, 0, 1), [
                Validators.required,
                birthDateRangeValidator
            ]],
            course: ['', Validators.required],
            subjects: this.fb.array([])
        });

        this.studentForm.get('course')?.valueChanges.subscribe(course => {
            this.selectedCourse = course;
            this.setSubjectControls();
        })
    }

    setSubjectControls() {
        const subjectsArray = this.studentForm.get('subjects') as FormArray;
        subjectsArray.clear();

        if (this.selectedCourse) {
            this.selectedCourse.subjects.forEach(() => {
                subjectsArray.push(this.fb.control(''));
            })
        }
    }

    loadCourses() {
        this.studentService.getCourses().subscribe({
            next: courses => { this.courses = courses },
            error: err => { console.log('Error fetching courses', err) },
        })
    }

    onSubmit() {
        if (this.studentForm.valid) {
            const formValue = this.studentForm.value;

            const date = formValue.birthDate;
            const formatted = `${date.getFullYear()}-${('0'+(date.getMonth()+1)).slice(-2)}-${('0'+date.getDate()).slice(-2)}`;

            let subjects: StudentSubject[] = [];

            if (this.selectedCourse) {
                subjects = this.selectedCourse.subjects.map((name, i) => ({
                    name,
                    score: formValue.subjects[i]
                }))
            }

            const newStudent: Student = {
                name: formValue.name,
                email: formValue.email,
                birthDate: formatted,
                course: formValue.course,
                subjects
            }

            this.studentService.addStudent(newStudent).subscribe({
                next: () => { this.router.navigate(['/dashboard']) },
                error: err => console.log('Failed to add student', err)
            });
        }
    }

}
