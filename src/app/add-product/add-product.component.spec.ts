import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add-product.component';
import { FormControl, FormGroup } from '@angular/forms';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let dialogRef: MatDialogRef<AddProductComponent>;
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'updateProduct',
    'saveProduct',
  ]);

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: ProductsService, useValue: mockProductService },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    matSnackBar = TestBed.inject(MatSnackBar);
    dialogRef = TestBed.inject(MatDialogRef);
    mockProductService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form', () => {
    const formMock = {
      title: '',
      description: '',
      price: '',
      category: '',
    };

    component.ngOnInit();

    expect(component.productForm.value).toEqual(formMock);
  });

  describe('should test add product functionality', () => {
    it('should call the saveProduct to add new product', () => {
      const productMock: Product = {
        title: 'Test Product',
        description: 'Test description',
        price: 'test price',
        category: 'Test category',
      };

      mockProductService.saveProduct.and.returnValue(of({}));
      component.productForm.patchValue(productMock);

      component.saveProduct();

      expect(mockProductService.saveProduct).toHaveBeenCalledWith(productMock);
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Added Successfully!...',
        '',
        {
          duration: 3000,
        }
      );
      expect(dialogRef.close).toHaveBeenCalled();
    });

    it('should test the saveProduct for failure while add a new product', () => {
      const productMock: Product = {
        title: 'Test Product',
        description: 'Test description',
        price: 'test price',
        category: 'Test category',
      };

      const errorMock = new Error('Error at saving product.');

      mockProductService.saveProduct.and.returnValue(
        throwError(() => errorMock)
      );

      component.productForm.patchValue(productMock);

      component.saveProduct();

      expect(mockProductService.saveProduct).toHaveBeenCalledWith(productMock);
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Something went wrong!...',
        '',
        {
          duration: 3000,
        }
      );
    });
  });

  describe('should test edit product functionality', () => {
    it('should set the form controls to the correct values when data is provided', () => {
      const data: Product = {
        id: '1',
        category: 'test category',
        description: 'test description',
        title: 'test title',
        price: 'test price',
      };

      const formMock = new FormGroup({
        title: new FormControl('test title'),
        description: new FormControl('test description'),
        price: new FormControl('test price'),
        category: new FormControl('test category'),
      });

      component.data = data;

      component.ngOnInit();

      expect(component.productForm.value).toEqual(formMock.value);
    });

    it('should call the saveProduct while editing the product', () => {
      const previousProduct: Product = {
        id: '1',
        title: 'previous',
        price: '10,90',
        description: 'that was the previous product',
        category: 'old',
      };
      const productMock: Product = {
        title: 'Test Product',
        description: 'Test description',
        price: 'test price',
        category: 'Test category',
      };

      mockProductService.updateProduct.and.returnValue(of({}));
      component.data = previousProduct;
      component.productForm.patchValue(productMock);

      component.saveProduct();

      expect(mockProductService.updateProduct).toHaveBeenCalledWith({
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: 'test price',
        category: 'Test category',
      });
    });

    it('should test the saveProduct for failure while update a product', () => {
      const data: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category',
      };
      const error = new Error('Error while update a product');
      component.data = data;

      mockProductService.updateProduct.and.returnValue(throwError(() => error));
      component.productForm.patchValue(data);
      component.saveProduct();
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Something went wrong!...',
        '',
        {
          duration: 3000,
        }
      );
    });
  });
});
