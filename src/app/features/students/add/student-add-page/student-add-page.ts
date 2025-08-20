import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { StudentForm } from '../components/student-form/student-form';

@Component({
  selector: 'app-student-add-page',
  imports: [StudentForm, ButtonModule],
  templateUrl: './student-add-page.html',
  styleUrl: './student-add-page.scss'
})
export class StudentAddPage {
    constructor(private router: Router) {}

    goBack() {
        this.router.navigate(['/dashboard']);
    }

}
