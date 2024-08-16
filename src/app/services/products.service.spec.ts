import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getProducts', () => {
    const urlMock = `${environment.baseAPI}products`;

    const responseMock: Product[] = [
      {
        title: 'product 1',
        price: 'price 1',
        description: 'description 1',
        category: 'category 1',
      },
      {
        title: 'product 1',
        price: 'price 1',
        description: 'description 1',
        category: 'category 1',
      },
    ];

    service.getProducts().subscribe((response) => {
      expect(response.length).toEqual(2);
      expect(response[0]).toEqual(responseMock[0]);
      expect(response[1]).toEqual(responseMock[1]);
    });

    const req = httpController.expectOne(urlMock);
    expect(req.request.method).toBe('GET');

    req.flush(responseMock);
  });

  it('should test saveProducts', () => {
    const urlMock = `${environment.baseAPI}products`;

    const productMock: Product = {
      title: 'product 1',
      price: 'price 1',
      description: 'description 1',
      category: 'category 1',
    };

    service.saveProduct(productMock).subscribe((response) => {
      expect(response).toEqual(productMock);
    });

    const req = httpController.expectOne(urlMock);
    expect(req.request.method).toBe('POST');

    req.flush(productMock);
  });

  it('should test updateProduct', () => {
    const productMock: Product = {
      id: '1',
      title: 'product to update',
      price: '9,99',
      description: 'product to update',
      category: 'any',
    };

    const urlMock = `${environment.baseAPI}products/${productMock.id}`;

    service.updateProduct(productMock).subscribe((response) => {
      expect(response).toEqual(productMock);
    });

    const req = httpController.expectOne(urlMock);
    expect(req.request.method).toBe('PUT');

    req.flush(productMock);
  });

  it('should test deleteProduct', () => {
    const productMock: Product = {
      id: '2',
      title: 'product to delete',
      price: '9,99',
      description: 'product to delete',
      category: 'any'
    }

    const productIdMock = Number(productMock.id); 

    const urlMock = `${environment.baseAPI}products/${productIdMock}`;

    service.deleteProduct(productIdMock).subscribe((response) => {
      expect(response).toEqual(productMock);
    });

    const req = httpController.expectOne(urlMock);
    expect(req.request.method).toBe('DELETE');

    req.flush(productMock);
  });

  afterEach(() => {
    httpController.verify();
  });
});
