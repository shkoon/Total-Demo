import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent  implements OnInit{
  public productForm!:FormGroup;
  productId!:number;
  product!:Product;

  constructor(private fb:FormBuilder,private ps:ProductService,private route:ActivatedRoute,private router:Router) {
  }
  ngOnInit(): void {
    this.productId=this.route.snapshot.params['id'];
    this.ps.getProductById(this.productId).subscribe({
      next:(product)=> {
        this.productForm=this.fb.group({
          id:this.fb.control(product.id),
          name:this.fb.control(product.name,[Validators.required,Validators.minLength(10),Validators.maxLength(30)]),
          price:this.fb.control(product.price,[Validators.required,Validators.min(300),Validators.max(30000)]),
          checked:this.fb.control(product.checked),
        })


      },
      error:err => console.log(err)
    })

  }
  editProduct() {
    this.product=this.productForm.value;
    this.ps.editProduct(this.product).subscribe({
      next:value => {
        this.router.navigateByUrl("/products");
      },
      error:err => console.log(err)
    })
  }
}
