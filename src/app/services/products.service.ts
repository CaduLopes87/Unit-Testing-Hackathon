import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseAPI = environment.baseAPI;
  constructor(private http: HttpClient) {}

  /**
   * 
   * @returns a list with all the products from the API
   */
  getProducts() {
    return this.http.get<Product[]>(`${this.baseAPI}products`);
  }

  /**
   * 
   * @param product receive the data sent by the user
   * @returns send the product to the API to be saved and returns a response    */
  saveProduct(product: Product) {
    return this.http.post<Product>(
      `${this.baseAPI}products`,
      product
    );
  }

  /**
   * 
   * @param id receive the product id selected by the user
   * @returns send the product id to the API to be deleted and returns a response
   */
  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.baseAPI}products/${id}`);
  }

  /**
   * 
   * @param product receive the data sent by the user
   * @returns send the specified product to the API to be updated and returns a response
   */
  updateProduct(product: Product) {
    return this.http.put<Product>(
      `${this.baseAPI}products/${product.id}`,
      product
    );
  }
}
