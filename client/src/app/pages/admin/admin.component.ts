import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-admin',
  template: `
    <div id="wrapper" class="d-flex">
      <app-sidebar *ngIf="toggledValue"></app-sidebar>
      <div id="page-content-wrapper">
        <app-header (toggleChange)="toggled($event)"></app-header>
        <div class="container-fluid">
          <app-title></app-title>
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @import 'src/styles/admin';
    `
  ]
})
export class AdminComponent implements OnInit {
  public toggledValue: boolean;

  constructor() {
    this.toggledValue = true;
  }

  ngOnInit(): void {
  }

  public toggled(event: boolean): void {
    this.toggledValue = event;
  }
}
