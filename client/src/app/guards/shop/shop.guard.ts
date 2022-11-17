import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router'
import { AuthService } from '@app/services'
import jwtDecode from 'jwt-decode'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ShopGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {}

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._authService.getSession() !== null) {
      console.log('Sesion iniciada');

      const dataDecode = this._decodeToken();

      if (dataDecode.exp < new Date().getTime() / 1000) {
        console.log('Sesión caducada');

        return this._redirect();
      }

      return true;
    }

    console.log('Sesion no iniciada');

    return this._redirect();
  }

  private _redirect(): boolean {
    this._router.navigateByUrl('login');

    return false;
  }
  private _decodeToken(): any {
    return jwtDecode(this._authService.getSession().token as string);
  }
}
