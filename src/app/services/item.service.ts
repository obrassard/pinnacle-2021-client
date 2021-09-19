import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ItemService extends HttpService {
  
  constructor(http: HttpClient, private userService: UserService) {
      super(http);
  }

  addNewItem(id:string, item: Item): Observable<ItemInventory> {
    return this.post({ item }, `inventories​/${id}​/items`)
  };
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
  inventory : ItemInstance[]
}
export interface ItemInstance{
  invItemID: string,
  quantity: 0,
  addedAt: Date,
  expiration?: Date
}