import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TYPE_ALERT } from '@app/enums'
import { RegisterForm, RegisterResult } from '@app/models/server'
import { UsersService } from '@app/services'
import { basicAlert, EMAIL_PATTERN } from '@app/shared'
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`@import 'src/styles/forms';`]
})
export class RegisterComponent implements OnInit {
  public emailPattern: RegExp;
  public register: RegisterForm;

  constructor(
    private readonly _router: Router,
    private readonly _usersService: UsersService
  ) {
    this.emailPattern = EMAIL_PATTERN
    this.register = {
      name: '',
      lastName: '',
      email: '',
      password: '',
      birthday: ''
    }
  }

  public ngOnInit(): void {
    const data: Date = new Date();

    data.setFullYear(data.getFullYear() - 18);

    this.register.birthday = (data.toISOString()).substring(0, 10);
  }

  public dataAssign(event: NgbDateStruct): void {
    const fecha: string = `${event.year}-${this._formatNumbers(event.month)}-${this._formatNumbers(event.day)}`;

    this.register.birthday = fecha;
  }

  public add(): void {
    this._usersService.register(this.register).subscribe((result: RegisterResult): void => {
      if (!result.status) {
        basicAlert(TYPE_ALERT.WARNING, result.message);

        return;
      }

      basicAlert(TYPE_ALERT.SUCCESS, result.message);

      this._router.navigateByUrl('login');
    });
  }

  private _formatNumbers(num: number | string ): string | number {
    return (+num < 10) ? `0${num}` : num;
  }
}
