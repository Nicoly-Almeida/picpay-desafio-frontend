import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotGuardService {

  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
      const token = localStorage.getItem('token');
      if (!token) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
  }
  
}
