import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  imageSrc!: string;

  constructor(
    private productService: ProductsService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private _data: Product,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {}

  /**
   * returns the data of the private variable
   */
  public get data(): Product {
    return this._data;
  }

  /**
   * set the data of the private variable
   */
  public set data(d: Product) {
    this._data = d;
  }
  /**
   * On initialization
   * Identify if it has data to edit or is a new addition
   * If has data to edit, add products data to the produc form
   * If has no data, set empty value to the product form 
   */
  ngOnInit(): void {
    const hasData = this.data && Object.keys(this.data).length;
    this.productForm = new FormGroup({
      title: new FormControl(hasData ? this.data.title : ''),
      description: new FormControl(hasData ? this.data.description : ''),
      price: new FormControl(hasData ? this.data.price : ''),
      category: new FormControl(hasData ? this.data.category : ''),
    });
  }

  /**
   * Verify if has an existing data
   * On true case, it gets the previous id and tries to update the product
   * On false case, it tries to create a new product
   */
  saveProduct() {
    const product = this.productForm.value as Product;
    if (Object.keys(this.data).length) {
      product.id = this.data.id;
      this.productService.updateProduct(product).subscribe({
        next: (res) => {
          this.snackbar.open('Updated Successfully!...', '', {
            duration: 3000,
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackbar.open('Something went wrong!...', '', {
            duration: 3000,
          });
        },
      });
    } else {
      this.productService.saveProduct(product).subscribe({
        next: (res) => {
          this.snackbar.open('Added Successfully!...', '', {
            duration: 3000,
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackbar.open('Something went wrong!...', '', {
            duration: 3000,
          });
        },
      });
    }
  }
}
