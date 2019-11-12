import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  ifDelete: Boolean;
  selectedProduct: Product = new Product();

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) { 
      this.selectedProduct = data.selectedProduct;
    }

  ngOnInit() {
  }

  close() {
    this.ifDelete = false;
    this.dialogRef.close(this.ifDelete);
  }

  deleteProduct() {
    this.ifDelete = true;
    this.dialogRef.close(this.ifDelete);
  }

}
