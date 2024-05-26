import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import environment from '../environment';
import { User } from '../interface/user.interface';
import { BrowserStorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  localStorageKey = 'threads_user';
  localStorage = inject(BrowserStorageService);

  createUser(name: string) {
    return this.http.post<User>(`${environment.apibaseUrl}/users`, {
      name: name
    })
  }

  saveUserToStorage(user: User) {
    this.localStorage.set(this.localStorageKey, JSON.stringify(user));
  }

  getUserFromStorage() {
    const user = this.localStorage.get(this.localStorageKey);
    return user ? JSON.parse(user) as User : null;
  }
}
