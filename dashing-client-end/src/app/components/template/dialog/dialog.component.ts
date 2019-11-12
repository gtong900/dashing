import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  title: string;
  selectedProduct: Product = new Product();

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.title = data.title;
     this.selectedProduct = data.selectedProduct;
    }

  ngOnInit() {
    this.form = this.fb.group({
      name:[this.selectedProduct.name,[Validators.required]],
      price: [this.selectedProduct.price, [Validators.required]],
      description: [this.selectedProduct.description, [Validators.required]],
    });
  }

  save() {
    if (!this.form.controls['price'].hasError('required') && 
    !this.form.controls['description'].hasError('required') &&
      !this.form.controls['name'].hasError('required')) this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  getPriceErrorMessage() {
    return this.form.controls['price'].hasError('required') ? 'You must enter a price value': "Unknown Error";
  }

  getDescriptionErrorMessage() {
    return this.form.controls['description'].hasError('required') ? 'You must enter a description' : "Unknown Error";
  }

  getNameErrorMessage() {
    return this.form.controls['name'].hasError('required') ? 'You must enter a product name' : "Unknown Error";
  }

}
