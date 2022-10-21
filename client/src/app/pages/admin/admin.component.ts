import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-admin',
  template: `
    <p>Soy admin</p>
    <div id="admin">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
  ]
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
