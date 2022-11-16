import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-public',
  template: `
    <app-header></app-header>
    <app-navbar></app-navbar>
    <div id="main">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
  styles: [
  ]
})
export class PublicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
