import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AppStateService} from "../services/app-state.service";

@Injectable({
  providedIn:'root'
})
export class AuthorizationGuard implements CanActivate{

  constructor(private appState:AppStateService,private router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    if(this.appState.authState.roles.includes(route.data['roles'])){
      return true;
    }
    else {
      this.router.navigateByUrl("/admin/notAuth")
      return false;
    }
  }

}
