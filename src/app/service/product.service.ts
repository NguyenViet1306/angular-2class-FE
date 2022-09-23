import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Product[]>{
  return this.httpClient.get<Product[]>("http://localhost:8080/api/products")
  }

  findOne(id?: number): Observable<Product>{
    return this.httpClient.get<Product>("http://localhost:8080/api/products/" +id)
  }

  findAllCategory() :  Observable<Category[]>{
    return this.httpClient.get<Category[]>("http://localhost:8080/api/products/category")
  }

  findOneCategory(id?: number): Observable<Category>{
    return this.httpClient.get<Category>("http://localhost:8080/api/products/category/" +id)
  }

  create(product: Product): Observable<void> {
    return this.httpClient.post<void>("http://localhost:8080/api/products", product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.httpClient.put<Product>("http://localhost:8080/api/products/" + id, product);
  }

  delete(id?: number): Observable<void> {
    return this.httpClient.delete<void>("http://localhost:8080/api/products/" + id)
  }
}
