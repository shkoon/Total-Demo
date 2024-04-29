import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productState:any={
    products:[] as Product[],
   keyword:"",
   totalPages:0,
   pageSize:3,
   currentPage:1,
    totalProducts:0,
    status:'',
    errorMessage:''
  }

  public authState:any={
    username:undefined,
    roles:undefined,
    isAuthenticated:false,
    token:undefined
  }
  constructor() { }

  setProductState(state:any):void{
    this.productState={...this.productState,...state}
  }

  setAuthState(state:any):void{
    this.authState={...this.authState,...state}
  }
}
