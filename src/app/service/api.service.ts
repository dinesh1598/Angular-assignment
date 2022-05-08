import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  fetchedData: any;
  url = 'http://localhost:3000/products';
  postProducts(data: any) {
    return this.http.post<any>('http://localhost:3000/products', data);
  }
  getProducts() {
    return this.http.get<any>('http://localhost:3000/products');
  }
  getSingleProducts(id: any) {
    return this.http.get<any>('http://localhost:3000/products', id);
  }

  deleteProduct(id: any) {
    return this.http.delete<any>('http://localhost:3000/products/' + id);
  }
}
