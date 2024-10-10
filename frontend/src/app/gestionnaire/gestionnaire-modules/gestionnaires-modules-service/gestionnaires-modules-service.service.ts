import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GestionnairesModulesServiceService {

  constructor(private http:HttpClient ) { 

  } 
   private domainesUrl = 'http://localhost:9999/Domaines';
   private matieresUrl = 'http://localhost:9999/matieres';

   getDomaines(): Observable<any[]> {
    return this.http.get<any[]>(this.domainesUrl);
  }

  addDomaine(domaine: any): Observable<any> {
    return this.http.post(`${this.domainesUrl}/`, domaine);
  }

  


}
