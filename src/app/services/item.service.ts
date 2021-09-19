import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ItemService extends HttpService {

    constructor(http: HttpClient) {
        super(http);
    }

    addNewItem(id: string, item: Item): Observable<ItemInventory> {
        return this.post(item, `inventories/${id}/items`)
    };

    modifyQuantityItem(quantity:number,invItemID: string): Observable<any> {
      return this.patch({quantity: quantity}, `items/${invItemID}`)
  };
}

export interface Item {
    upc?: string;
    title?: string;
    quantity: number;
    expiration?: Date
}
export interface ItemInventory {
    id: string,
    title: string,
    image: string
}
