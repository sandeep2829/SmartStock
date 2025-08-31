import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../shared/models/item.interface';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InventoryService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/Product/GetAll`);
  }

  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/Product/GetById?id=${id}`);
  }

  addItem(product: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/Product/Add`, product);
  }

  updateItem(id: number, product: Item): Observable<any> {
    return this.http.put(`${this.baseUrl}/Product/Update?id=${id}`, product);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Product/Delete?id=${id}`);
  }

}
