import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-public',
  template: `
    <p>Soy public</p>
    <div id="main">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
  ]
})
export class PublicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
