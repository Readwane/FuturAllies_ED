import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { environment } from 'src/environments/environment';
import { Doc } from '../../models/doc/doc.model';

@Injectable({  
  providedIn: 'root'  
})  
export class DocService {  
  private apiUrl = `${environment.apiBaseUrl}/docs`; // Remplacez par l'URL de votre API  

  constructor(private http: HttpClient) { }  

  // Récupérer tous les documents  
  getAllDocs(): Observable<Doc> {  
    return this.http.get<Doc>(this.apiUrl);  
  }  

  // Récupérer un document par ID  
  getDocById(id: string): Observable<Doc> {  
    return this.http.get<Doc>(`${this.apiUrl}/${id}`);  
  }  

  // Créer un nouveau document  
  createDoc(formData: FormData): Observable<Doc> {  
    return this.http.post<Doc>(this.apiUrl, formData);  
  }  

  // Mettre à jour un document  
  updateDoc(id: string, docData: Doc): Observable<Doc> {  
    return this.http.put<Doc>(`${this.apiUrl}/${id}`, docData);  
  }  

  // Supprimer un document  
  deleteDoc(id: string): Observable<Doc> {  
    return this.http.delete<Doc>(`${this.apiUrl}/${id}`);  
  }  
}