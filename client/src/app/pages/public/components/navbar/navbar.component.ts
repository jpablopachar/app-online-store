import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MenuItem } from '@app/models/client'
import { MeData } from '@app/models/server'
import { AuthService } from '@app/services'
import shopMenuItems from 'assets/data/menu/shop.json'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      .custom-bg {
        background-color: #2b2f33;
      }

      .dropdown-item,
      .fas {
        cursor: pointer;
      }

      .badge.badge-success.notification {
        position: relative;
        top: -12px;
        left: -2px;
        border-radius: 10px;
      }
    `,
  ],
})
export class NavbarComponent implements OnInit {
  public menuItems: MenuItem[];
  public session: MeData;
  public access: boolean;
  public userLabel: string | undefined;
  public role!: string;

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {
    this.menuItems = shopMenuItems;
    this.session = { status: false };
    this.access = false;
    this.userLabel = '';
    this._authService.accessVar$.subscribe((res: MeData): void => {
      this.session = res;
      this.access = res.status;
      this.userLabel = res.user?.role;
      this.role = `${res.user?.name} ${res.user?.lastName}`;
    });
  }

  ngOnInit(): void {
  }

  public open(): void {
    console.log('open');
  }

  public async logout() {
    this._authService.resetSession(this._router.url);
  }
}
