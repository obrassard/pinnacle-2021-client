import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UPCObject } from './UPCObject';


@Injectable({
  providedIn: 'root'
})
export class UPCapiService {
  //https://api.upcitemdb.com/prod/trial/lookup?upc=0885881000512
  constructor(private http: HttpClient) { }

  getUPCdata(upcCode: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.post<UPCObject>("https://api.upcitemdb.com/prod/trial/lookup", {"upc": upcCode}, httpOptions);
  }
}
