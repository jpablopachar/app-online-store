import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-title',
  template: `
    <h1 class="mt-4">Titulo</h1>
  `,
  styles: [
    `
      @import 'src/styles/admin';

      h1 {
        color: $admin-primary-color;
        font-size: larger !important;
      }
    `
  ]
})
export class TitleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
