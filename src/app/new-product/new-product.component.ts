import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  public productForm!:FormGroup;


  constructor(private fb:FormBuilder,private ps:ProductService) {
  }
  ngOnInit(): void {
    this.productForm=this.fb.group({
      name:this.fb.control('',[Validators.required,Validators.minLength(10),Validators.maxLength(30)]),
      price:this.fb.control(0,[Validators.required,Validators.min(300),Validators.max(30000)]),
      checked:this.fb.control(false),
    })
  }

  saveProduct() {
    let product:Product=this.productForm.value;
    this.ps.saveProduct(product).subscribe({
      next:data=>{
        alert(JSON.stringify(data))
      },
      error:err=>{
        console.log(err)
    }
    });
  }
}
