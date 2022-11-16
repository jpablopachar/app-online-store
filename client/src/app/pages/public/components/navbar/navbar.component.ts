import { Component } from '@angular/core'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      .custom-bg {
        background-color: #2b2f33;
      }

      .dropdown-item, .fas {
        cursor: pointer;
      }

      .badge.badge-success.notification {
        position: relative;
        top: -12px;
        left: -2px;
        border-radius: 10px;
      }
    `
  ]
})
export class NavbarComponent {
  public open(): void {
    console.log('open')
  }

  public logout(): void {
    console.log('logout')
  }
}
