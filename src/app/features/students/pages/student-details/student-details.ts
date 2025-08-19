import { Component } from '@angular/core';
import { StudentService } from '../../../../core/services/student.service';
import { Student } from '../../../../shared/models/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, switchMap } from 'rxjs';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-student-details',
  imports: [ButtonModule],
  templateUrl: './student-details.html',
  styleUrl: './student-details.scss'
})
export class StudentDetails {

    student!: Student;
    
    constructor(private studentService: StudentService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(params => {
                const idParam = params.get('id');
                if (!idParam) return EMPTY;
                const studentId = +idParam;
                if (isNaN(studentId)) return EMPTY;
                return this.studentService.getStudent(studentId);
            })
        ).subscribe({
            next: student => this.student = student,
            error: err => console.error('Error fetching student details', err)
        });
    }

    goBack() {
        this.router.navigate(['/students']);
    }

}
