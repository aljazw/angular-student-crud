import { Component } from '@angular/core';
import { Course, Subject } from '../../../../models/student.model';
import { StudentService } from '../../../../core/services/student.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';



function birthDateRangeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const year = new Date(control.value).getFullYear();
    return (year >= 1980 && year <= 2020) ? null : {outOfRange: true};
}

@Component({
  selector: 'app-student-form',
  imports: [ReactiveFormsModule],
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
        maxlength: 'Name muse be at most 40 characters'
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
                Validators.required, Validators.email
            ]],
            birthDate: ['2000-01-01', [
                Validators.required,
                birthDateRangeValidator
            ]],
            course: ['', Validators.required],
            subjects: this.fb.array([])
        });

        this.studentForm.get('course')?.valueChanges.subscribe(selectedCourseName => {
            this.selectedCourse = this.courses.find(c => c.name === selectedCourseName);
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
            complete: ()=> console.log('Courses: ', this.courses)
        })
    }

    onSubmit() {
        if (this.studentForm.valid) {
            const formValue = this.studentForm.value;

            let subjects: Subject[] = [];

            if (this.selectedCourse) {
                for(let i = 0; i < this.selectedCourse.subjects.length; i++) {
                    subjects.push({
                        name: this.selectedCourse.subjects[i], 
                        score: formValue.subjects[i]})
                }
            }

            const newStudent = {
                name: formValue.name,
                email: formValue.email,
                birthDate: formValue.birthDate,
                course: formValue.course,
                subjects: subjects
            }

            this.studentService.addStudent(newStudent).subscribe({
                complete: () => { this.router.navigate(['/students']) },
                error: err => console.log('Failed to add student', err)
            });
        }
    }
}
