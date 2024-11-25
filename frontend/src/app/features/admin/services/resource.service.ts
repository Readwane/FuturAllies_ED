// services/resource.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource , ResourceFieldConfig} from '../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = 'https://localhost/fapi';

  constructor(private http: HttpClient) {}

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

  getResourceFieldConfigs(resourceType: string): Observable<ResourceFieldConfig[]> {
    return this.http.get<ResourceFieldConfig[]>(`${this.apiUrl}/${resourceType}/field-configs`);
  }
}
