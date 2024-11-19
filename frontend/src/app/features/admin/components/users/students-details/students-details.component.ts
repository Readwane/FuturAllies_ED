import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  studentId: string | null = null;
  student: any;

  students = [
    { id: 1, name: 'Alice Doe', email: 'alice@example.com', age: 20, major: 'Mathematics' },
    // ...autres étudiants
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.loadStudent();
  }

  loadStudent() {
    this.student = this.students.find(student => student.id === Number(this.studentId));
    if (!this.student) {
      this.router.navigate(['/students']); // Redirige si l'ID est invalide
    }
  }

  editStudent(student: any) {
    console.log('Modifier étudiant', student);
  }

  deleteStudent(student: any) {
    console.log('Supprimer étudiant', student);
  }
}
