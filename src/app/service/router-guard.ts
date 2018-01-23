import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras
} from '@angular/router';
import { DeepBlueService } from 'app/service/deepblue';

@Injectable()
export class RouterGuard implements CanActivate {

  constructor(private deepBlueService: DeepBlueService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.deepBlueService.dataToDiveSource.getValue() === null) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}