import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { TYPE_ALERT } from '@app/enums'
import { LoginForm, LoginResponse } from '@app/models/server'
import { AuthService } from '@app/services'
import { basicAlert } from '@app/shared'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`@import 'src/styles/forms';`]
})
export class LoginComponent {
  public login: LoginForm;

  constructor(private readonly _router: Router, private readonly _authService: AuthService) {
    this.login = {
      email: '',
      password: ''
    }
  }

  onSubmit(): void {
    this._authService.login(this.login.email, this.login.password).subscribe((res: LoginResponse): void => {
      if (res.status) {
        if (res.token !== null) {
          this._authService.setSession(res.token as string);
          this._authService.updateSession(res);

          if (localStorage.getItem('route_after_login')) {
            const route: (string | null)[] = [localStorage.getItem('route_after_login')];

            this._router.navigate(route);

            return;
          }

          this._router.navigateByUrl('home');

          return;
        }

        basicAlert(TYPE_ALERT.WARNING, res.message);

        return;
      }

      basicAlert(TYPE_ALERT.INFO, res.message);
    })
  }
}
