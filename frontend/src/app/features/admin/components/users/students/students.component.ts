import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {

  constructor(private router: Router) {}

  students = [
    { id: 1, name: 'Alice Doe', email: 'alice@example.com', age: 20, major: 'Mathematics', selected: false },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 22, major: 'Physics', selected: false },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', age: 23, major: 'Engineering', selected: false },
    { id: 4, name: 'David Clark', email: 'david@example.com', age: 21, major: 'Chemistry', selected: false },
    { id: 5, name: 'Eve Johnson', email: 'eve@example.com', age: 20, major: 'Biology', selected: false },
    { id: 6, name: 'Frank Lee', email: 'frank@example.com', age: 24, major: 'Computer Science', selected: false },
    { id: 7, name: 'Grace Hall', email: 'grace@example.com', age: 19, major: 'History', selected: false },
    { id: 8, name: 'Hank Moore', email: 'hank@example.com', age: 25, major: 'Philosophy', selected: false },
    { id: 9, name: 'Ivy Walker', email: 'ivy@example.com', age: 22, major: 'Psychology', selected: false },
    { id: 10, name: 'Jack White', email: 'jack@example.com', age: 21, major: 'Sociology', selected: false },
    { id: 11, name: 'Kara Black', email: 'kara@example.com', age: 23, major: 'Architecture', selected: false },
    { id: 12, name: 'Liam Grey', email: 'liam@example.com', age: 20, major: 'Art', selected: false },
    { id: 13, name: 'Mia Scott', email: 'mia@example.com', age: 22, major: 'Design', selected: false },
    { id: 14, name: 'Noah Green', email: 'noah@example.com', age: 24, major: 'Environmental Science', selected: false },
    { id: 15, name: 'Olivia Blue', email: 'olivia@example.com', age: 21, major: 'Physics', selected: false },
    { id: 16, name: 'Paul Red', email: 'paul@example.com', age: 20, major: 'Political Science', selected: false },
    { id: 17, name: 'Quinn Brown', email: 'quinn@example.com', age: 23, major: 'Economics', selected: false },
    { id: 18, name: 'Ryan Black', email: 'ryan@example.com', age: 25, major: 'Music', selected: false },
    { id: 19, name: 'Sophia White', email: 'sophia@example.com', age: 22, major: 'Medicine', selected: false },
    { id: 20, name: 'Tom Grey', email: 'tom@example.com', age: 21, major: 'Astronomy', selected: false },
    { id: 21, name: 'Uma Hall', email: 'uma@example.com', age: 23, major: 'Statistics', selected: false },
    { id: 22, name: 'Victor Moore', email: 'victor@example.com', age: 20, major: 'Theology', selected: false },
    { id: 23, name: 'Wendy Scott', email: 'wendy@example.com', age: 22, major: 'Public Health', selected: false },
    { id: 24, name: 'Xavier Green', email: 'xavier@example.com', age: 24, major: 'Anthropology', selected: false },
    { id: 25, name: 'Yara Brown', email: 'yara@example.com', age: 21, major: 'Linguistics', selected: false },
  ];
  

  filteredStudents = [...this.students];
  paginatedStudents = [...this.students.slice(0, 5)]; // Données de la première page
  pageSize = 5; // Nombre d'éléments par page
  currentPage = 0; // Page actuelle
  searchQuery = '';
  displayedColumns: string[] = ['select', 'name', 'email', 'age', 'major', 'actions'];

  // Filtrer les étudiants
  applyFilter() {
    this.filteredStudents = this.students.filter(student =>
      student.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.updatePaginatedStudents(); // Actualiser les données paginées après le filtrage
  }

  updatePaginatedStudents() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedStudents = this.filteredStudents.slice(startIndex, endIndex);
  }

  // Vérifie si toutes les lignes sont sélectionnées
  isAllSelected(): boolean {
    return this.filteredStudents.every(student => student.selected);
  }

  // Vérifie si certaines lignes sont sélectionnées (indéterminé)
  isIndeterminate(): boolean {
    return this.filteredStudents.some(student => student.selected) && !this.isAllSelected();
  }

  // Sélectionne ou désélectionne toutes les lignes
  toggleAllRows(isChecked: boolean) {
    this.filteredStudents.forEach(student => (student.selected = isChecked));
  }

  // Vérifie s'il y a des lignes sélectionnées
  hasSelectedRows(): boolean {
    return this.filteredStudents.some(student => student.selected);
  }
  
  getDisplayedColumns(): string[] {
    // Retirer la colonne "actions" si des lignes sont sélectionnées
    return this.hasSelectedRows()
      ? this.displayedColumns.filter(column => column !== 'actions')
      : this.displayedColumns;
  }

  // Supprime les lignes sélectionnées
  deleteSelectedRows() {
    this.filteredStudents = this.filteredStudents.filter(student => !student.selected);
    this.students = this.students.filter(student => !student.selected); // Mise à jour des données principales
  }

  // Appelé lorsqu'une ligne est sélectionnée/désélectionnée
  onRowSelectionChange() {
    // Peut être utilisé pour des actions conditionnelles sur la sélection
  }

  // Ajouter un étudiant
  addStudent() {
    console.log('Add Student');
  }

  // Modifier un étudiant
  editStudent(student: any) {
    console.log('Edit Student', student);
  }

  // Supprimer un étudiant
  deleteStudent(student: any) {
    console.log('Delete Student', student);
  }

  // Méthode appelée lors de la pagination
  changePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedStudents(); // Actualiser les données paginées lors du changement de page
  }

   // Méthode pour naviguer vers les détails d'un étudiant
   goToDetails(student: any) {
    this.router.navigate(['/students', student.id]); // Navigue vers '/students/:id'
  }
  
}
