import {Component, OnInit} from '@angular/core';

import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  constructor(private ps:ProductService,private router:Router,
              public appState:AppStateService) {
  }


  handleCheck(product: Product) {
    this.ps.checkProduct(product).subscribe({
      next:updatedProduct=>{
      this.getProducts();
      },
      error:err => console.log(err)
    })
  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.ps.getProducts(this.appState.productState.keyword,this.appState.productState.currentPage,
      this.appState.productState.pageSize).subscribe({
      next:(response)=> {
        let products= response.body as Product[];

        let totalProducts:number=parseInt(response.headers.get('x-total-count')!);
        //this.appState.productState.totalProducts=totalProducts;
        let totalPages=Math.floor(totalProducts/this.appState.productState.pageSize);
        if(totalProducts % this.appState.productState.pageSize!=0){
          totalPages++;

        }
        this.appState.setProductState({
          products:products,
          totalPages:totalPages,
          totalProducts:totalProducts,
          status:"LOADED"
        })
      },
      error:err => {
        this.appState.setProductState({
          status:"ERROR",
          errorMessage:err
        })
      }
    })
  }
  handleDelete(product:Product){
    this.ps.deleteProduct(product).subscribe({
      next:value => {
        this.appState.productState.products=this.appState.productState.products.filter((p:any)=>p.id!=product.id)
        this.appState.productState.totalProducts--;
      },
      error:err => console.log(err)
    })

  }


  setCurrentPage(page: number) {
    this.appState.productState.currentPage=page;
    this.getProducts();
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`)
  }
}
