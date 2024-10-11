import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() {}

  log(message: string): void {
    console.log(`SharedService: ${message}`);
  }
}
