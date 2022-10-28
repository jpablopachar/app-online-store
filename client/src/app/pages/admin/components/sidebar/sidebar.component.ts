import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">
        <a [routerLink]="['/home']" routerLinkActive="router-link-active">
          Gamezonia
        </a>
      </div>
      <div class="list-group list-group-flush">
        <p>Items</p>
        <!-- <a
          [routerLink]="item.url"
          *ngFor="let item of menuItems"
          routerLinkActive="router-link-active"
          class="list-group-item list-group-item-action bg-light"
          ><i class="{{ item.icon }}"></i> {{ item.label }}</a
        > -->
      </div>
    </div>
  `,
  styles: [
    `
      @import 'src/styles/admin';

      #sidebar-wrapper {
        background-color: $admin-primary-color;
        height: 100%;
      }

      .sidebar-heading a {
        color: whitesmoke;
      }
    `,
  ],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
