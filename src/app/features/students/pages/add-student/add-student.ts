import { Component } from '@angular/core';
import { StudentForm } from '../../components/student-form/student-form';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  imports: [StudentForm, ButtonModule],
  templateUrl: './add-student.html',
  styleUrl: './add-student.scss'
})
export class AddStudent {

    constructor(private router: Router) {}

    goBack() {
        this.router.navigate(['/students']);
    }
    
}
