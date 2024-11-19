import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students-details',
  // standalone: true,
  // imports: [],
  templateUrl: './students-details.component.html',
  styleUrl: './students-details.component.css'
})

export class StudentDetailsComponent implements OnInit {
  studentId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id'); // Récupère l'ID depuis l'URL
  }
}
