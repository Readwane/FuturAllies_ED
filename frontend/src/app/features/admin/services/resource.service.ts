// services/resource.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource} from '../models/resource.model';
import { SelectOption } from '../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = 'http://localhost:3000/fapi';

  constructor(private http: HttpClient) {}

  //  // Exemple de méthode pour obtenir les options de type de contrat
  //  getContractOptions(): Promise<SelectOption[]> {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve([
  //         { value: 'Full-Time', label: 'Full-Time' },
  //         { value: 'Part-Time', label: 'Part-Time' },
  //         { value: 'Internship', label: 'Internship' },
  //         { value: 'Freelance', label: 'Freelance' },
  //         { value: 'Temporary', label: 'Temporary' }
  //       ]);
  //     }, 1000);
  //   });
  // }

  // // Exemple de méthode pour obtenir les options de statut
  // getStatusOptions(): Promise<SelectOption[]> {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve([
  //         { value: 'Open', label: 'Open' },
  //         { value: 'Closed', label: 'Closed' },
  //         { value: 'Pending', label: 'Pending' }
  //       ]);
  //     }, 1000);
  //   });
  // }


  getResources(resourceType: string): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/${resourceType}`);
  }

  getResource(resourceType: string, id: string): Observable<Resource> {
    return this.http.get<Resource>(`${this.apiUrl}/${resourceType}/${id}`);
  }

  createResource(resourceType: string, resource: Partial<Resource>): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}/${resourceType}`, resource);
  }

  updateResource(resourceType: string, id: string, resource: Partial<Resource>): Observable<Resource> {
    return this.http.put<Resource>(`${this.apiUrl}/${resourceType}/${id}`, resource);
  }

  deleteResource(resourceType: string, id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${resourceType}/${id}`);
  }
}
