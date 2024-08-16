import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, throwError } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';
import { compileNgModule } from '@angular/compiler';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let addProductComponent: AddProductComponent;

  let dialog = jasmine.createSpyObj('MatDialog', ['open']);
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'getProducts',
    'deleteProduct',
  ]);

  mockProductService.getProducts.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, AddProductComponent],
      imports: [SharedModule],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: MatDialog, useValue: dialog },
        { provide: ProductsService, useValue: mockProductService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    matSnackBar = TestBed.inject(MatSnackBar);
    mockProductService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should test get products initially', () => {
    it('should get product data initially', () => {
      const dataMock: Product[] = [
        {
          category: 'test category',
          title: 'test title',
          price: 'test price',
          description: 'test description',
        },
      ];

      const spyComponentGetProducts = spyOn(
        component,
        'getProducts'
      ).and.callThrough();

      mockProductService.getProducts.and.returnValue(of(dataMock));

      component.ngOnInit();

      fixture.detectChanges();

      expect(spyComponentGetProducts).toHaveBeenCalled();
      expect(mockProductService.getProducts).toHaveBeenCalled();
      expect(component.productData).toEqual(dataMock);
      expect(component.showSpinner).toEqual(false);
    });

    it('should get product data initially on failure', () => {
      const errorMock = new Error('error test');

      const spyComponentGetProducts = spyOn(
        component,
        'getProducts'
      ).and.callThrough();

      mockProductService.getProducts.and.returnValue(
        throwError(() => errorMock)
      );

      component.ngOnInit();

      fixture.detectChanges();

      expect(spyComponentGetProducts).toHaveBeenCalled();
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Something went wrong!...',
        '',
        {
          duration: 3000,
        }
      );
      expect(mockProductService.getProducts).toHaveBeenCalled();
      expect(component.showSpinner).toEqual(false);
    });
  });

  it('should test openDialog', () => {
    component.openDialog();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should test editDialog', () => {
    const productMock: Product = {
      title: '',
      price: '',
      description: '',
      category: '',
    };

    component.editProduct(productMock);

    expect(dialog.open).toHaveBeenCalled();
  });

  describe('should test deleteProduct', () => {
    it('should test deleteProduct on success', () => {
      const productMock: Product = {
        id: '',
        title: '',
        price: '',
        description: '',
        category: '',
      };

      mockProductService.deleteProduct.and.returnValue(of(productMock));

      component.deleteProduct(productMock);

      fixture.detectChanges();

      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(
        productMock.id
      );
      expect(matSnackBar.open).toHaveBeenCalledWith('Deleted Successfully!...', '', {
          duration: 3000
        });
    });

    it('should test deleteProduct on failure', () => {
      const productMock: Product = {
        id: '',
        title: '',
        price: '',
        description: '',
        category: '',
      };

      const errorMock = new Error('error test');

      mockProductService.deleteProduct.and.returnValue(
        throwError(() => errorMock)
      );

      component.deleteProduct(productMock);

      fixture.detectChanges();

      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(
        productMock.id
      );
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
          duration: 3000
        });
    });
  });
});
