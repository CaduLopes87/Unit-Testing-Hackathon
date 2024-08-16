import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productData!: Product[];
  showSpinner = false;

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  /**
   * List all the products at site initialization
   */
  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * Active the spinner in beggin
   * Call a method in productService to list all the products
   * On successful case, the products will be listed and the spinner will be hidded
   * On unsuccessful case, the spinner will be hidded and an error message will be presented for 3 seconds
   */
  getProducts() {
    this.showSpinner = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productData = res;
        this.showSpinner = false;
      },
      error: (err) => {
        this.showSpinner = false;
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000
        });
      }
    });
  }

  /**
   * An dialog box will be presented to add a new product
   */
  openDialog() {
    this.dialog.open(AddProductComponent, {
      width: '40%',
    });
  }

  /**
   * @param product receive the selected product data 
   * An dialog box will be presented to edit the selected product data
   */
  editProduct(product: Product) {
    this.dialog.open(AddProductComponent, {
      data: product,
      width: '40%',
    });
  }

  /**
   * @param product receive the selected product data
   * Call a method in productService to delete the selected product
   * On successful case, a success message will be presented for 3 seconds
   * On unsuccessful case, an error message will be presented for 3 seconds
   */
  deleteProduct(product: any) {
    this.productService.deleteProduct(product.id).subscribe({
      next: (res) => {
        this.snackbar.open('Deleted Successfully!...', '', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000
        });
      },
    });
  }
}
