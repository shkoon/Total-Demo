import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingServiceService} from "../services/loading-service.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public appState:AppStateService,
              public loadingService:LoadingServiceService,
              public auth:AuthService,
              private router:Router) {
  }
  actions:Array<any>=[
    {title:"Home",route:"/admin/home",icon:"house"},
    {title:"Products",route:"/admin/products",icon:"search"},
    {title:"New Products",route:"/admin/newProduct",icon:"plus-circle"}
  ];
  currentAction:any;


  setCurrentAction(action:any){
    this.currentAction=action;
  }

  login() {

  }

  logout() {
    this.appState.authState={}
    this.router.navigateByUrl("/login");
  }
}
