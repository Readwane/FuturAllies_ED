import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service'; // Service pour interagir avec l'API
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<{ name: string }> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<{ name: string }> {
    const userId = route.paramMap.get('id');
    if (!userId) {
      throw new Error('User ID is missing in route parameters');
    }
    return this.userService.getUserNameById(userId); // Retourne le nom de l'utilisateur
  }
}
