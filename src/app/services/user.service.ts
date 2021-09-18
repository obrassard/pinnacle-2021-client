import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService extends HttpService {

    constructor(http: HttpClient, private router: Router) {
        super(http, 'users');
    }

    userIsLoggedIn(): boolean {
        return this.getUser() !== null;
    }

    login(email: string): Observable<User> {
        return this.get<User>('', {
            params: { email }
        }).pipe(
            tap(user => this.saveUser(user))
        )
    }

    signup(user: UserForCreation): Observable<User> {
        return this.post<UserForCreation, User>(user).pipe(
            tap(user => this.saveUser(user))
        )
    }

    signout() {
        localStorage.removeItem('user:identity');
        this.router.navigateByUrl('/login')
    }


    getUser(): User | null {
        const serialUser = localStorage.getItem('user:identity');
        return serialUser ? JSON.parse(serialUser) : null;
    }

    private saveUser(user: User) {
        localStorage.setItem('user:identity', JSON.stringify(user));
        this.router.navigateByUrl('/')
    }
}

export interface User {
    id: string;
    completeName: string;
}

export interface UserForCreation {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}
