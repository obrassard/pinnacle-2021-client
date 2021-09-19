import { HttpClient } from '@angular/common/http';
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

    getItemDetail(inventoryId: string, itemId: string): Observable<ItemInventoryDetail> {
        return this.get(`inventories/${inventoryId}/items/${itemId}`);
    }
}

export interface Item {
    upc?: string;
    title?: string;
    quantity: number;
    expiration?: Date
}
export interface ItemInventory {
    itemId: string,
    title: string,
    image: string,
    inventory: ItemInstance[]
}

export interface ItemInstance {
    invItemID: string,
    quantity: number,
    addedAt: string,
    expiration?: string
    expiredSoon: boolean
}

export interface ItemInventoryDetail {
    itemId: string,
    title: string,
    image: string,
    inventory: ItemInstance[]
}
