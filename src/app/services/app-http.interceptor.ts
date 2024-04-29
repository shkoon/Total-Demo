import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';

import {finalize, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AppStateService} from "./app-state.service";
import {LoadingServiceService} from "./loading-service.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor{
  constructor(private appState:AppStateService,private loadingService:LoadingServiceService) {


  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*this.appState.setProductState({
      status:"LOADING"
    })*/
    this.loadingService.showLoadingSpinner();
    let req=request.clone({
      headers:request.headers.set("Authorization","Bearer JWT")
    });
    return next.handle(req).pipe(finalize(()=>{
      /*t/!*his.appState.setProductState({
        status:"LOADED"
      })*!/*/
      this.loadingService.hideLoadingSpinner();
    }));
  }

}
