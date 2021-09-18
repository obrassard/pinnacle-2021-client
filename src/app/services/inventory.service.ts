import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InventoryService extends HttpService {
    constructor(http: HttpClient, private userService: UserService) {
        super(http);
    }

    createInventory(title: string): Observable<Inventory> {
        return this.userService.userId$().pipe(switchMap(
            userId => this.post({ title }, `users/${userId}/inventories`)
        )).pipe(map((res: any) => ({
            id: res.id,
            title,
            countOfItems: 0
        })));
    }

    getUsersInventories(): Observable<Inventory[]> {
        return this.userService.userId$().pipe(switchMap(
            userId => this.getAll<Inventory>(`users/${userId}/inventories`)
        ));
    }
}

export interface Inventory {
    id: string;
    title: string;
    countOfItems: number;
}
