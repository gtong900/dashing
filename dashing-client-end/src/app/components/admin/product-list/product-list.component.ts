import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Product } from '../../../model/product';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../../template/dialog/dialog.component';
import { DeleteDialogComponent } from '../../template/delete-dialog/delete-dialog.component';

declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Array<Product>;
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'price', 'action'];
  selectedProduct: Product = new Product();
  newProduct: Product = new Product
  errorMessage: string;
  infoMessage: string;

  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;

  constructor(private adminService: AdminService, private dialog: MatDialog) { }

  ngOnInit() {
    this.findAllProducts();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Product Details',
      selectedProduct: this.selectedProduct
    }
    
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (typeof data !== 'undefined') {
          this.selectedProduct.name = data.name;
          this.selectedProduct.price = data.price;
          this.selectedProduct.description = data.price;
          this.saveProduct();
        }
      }
    );
  }
  
  openDeleteDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      selectedProduct: this.selectedProduct
    }

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log(data);
        if (data == true) {
          this.deleteProduct();
        }
      }
    );
  }

  findAllProducts() {
    this.adminService.findAllProducts().subscribe(data => {
      this.productList = data;
      this.dataSource.data = data;
    });
  }

  createNewProductRequest() {
    this.selectedProduct = new Product();
    this.openDialog();
    //$('#productModal').modal('show');
  }

  editProductRequest(product: Product) {
    this.selectedProduct = product;
    this.openDialog();
    //$('#productModal').modal('show');
  }

  saveProduct() {
    if (!this.selectedProduct.id) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  createProduct() {
    this.adminService.createProduct(this.selectedProduct).subscribe(data => {
      this.productList.push(data);
      this.dataSource = new MatTableDataSource(this.productList);
      this.infoMessage = "Mission is completed";
      //$('#productModal').modal('hide');
    }, err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  updateProduct() {
    this.adminService.updateProduct(this.selectedProduct).subscribe(data => {
      let itemIndex = this.productList.findIndex(item => item.id == this.selectedProduct.id);
      this.productList[itemIndex] = this.selectedProduct;
      this.dataSource = new MatTableDataSource(this.productList);
      this.infoMessage = "Mission is completed";
      //$('#productModal').modal('hide');
    }, err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  deleteProductRequest(product: Product) {
    this.selectedProduct = product;
    this.openDeleteDialog();
  }

  deleteProduct() {
    this.adminService.deleteProduct(this.selectedProduct).subscribe(data => {
      let itemIndex = this.productList.findIndex(item => item.id == this.selectedProduct.id);
      if (itemIndex !== -1) {
        this.productList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.productList);
      this.infoMessage = "Mission is completed";
    }, err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }
}

