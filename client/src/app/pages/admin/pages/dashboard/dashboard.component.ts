import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4">
          <p>Informacion general</p>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
