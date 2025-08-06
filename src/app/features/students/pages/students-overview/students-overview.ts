import { Component } from '@angular/core';
import { StudentService } from '../../../../core/services/student.service';
import { Student } from '../../../../models/student.model';
import { StudentsTable } from '../../components/students-table/students-table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students-overview',
  imports: [CommonModule, StudentsTable],
  templateUrl: './students-overview.html',
  styleUrl: './students-overview.scss'
})
export class StudentsOverview {

}
