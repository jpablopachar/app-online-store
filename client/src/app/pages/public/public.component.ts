import { Component, OnInit } from '@angular/core'
import { AuthService } from '@app/services'

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
  constructor(private readonly _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.start();
  }
}
