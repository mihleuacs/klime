import { Component, Input } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  student: Student | undefined;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudent().subscribe(student => {
      this.student = student;
    });
  }
}