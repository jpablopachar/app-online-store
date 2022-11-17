import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router'
import { AuthService } from '@app/services'
import jwtDecode from 'jwt-decode'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {
  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._authService.getSession() !== null) {
      const dataDecode = this._decodeToken();

      if (dataDecode.exp < new Date().getTime() / 1000) {
        console.log('Sesión caducada');

        return this._redirect();
      }
      // El role del usuario es ADMIN
      if (dataDecode.user.role === 'ADMIN') {
        console.log('Somos administradores');

        return true;
      }

      console.log('NO somos administradores');
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
