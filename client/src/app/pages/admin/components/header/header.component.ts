import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
      <button class="btn btn-primary" id="menu-toggle" (click)="toggled()">
        <i class="fas fa-bars"></i>
      </button>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <a class="nav-link" href="#"
              >Inicio <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Juan Pablo
            </a>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown"
            >
              <a class="dropdown-item">Salir de la sesión</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [
    `
      @import 'src/styles/admin';

      #menu-toggle {
        color: $admin-primary-color;
        background-color: transparent;
        border-color: transparent;
        font-size: large;
      }

      .shadow {
        -webkit-box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.25);
      }

      .dropdown-item:hover {
        cursor: pointer;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  @Output() public toggleChange: EventEmitter<boolean>;

  private _toggledValue: boolean;

  constructor() {
    this.toggleChange = new EventEmitter<boolean>();

    this._toggledValue = true;
  }

  ngOnInit(): void {}

  public toggled(): void {
    this._toggledValue = !this._toggledValue;

    this.toggleChange.emit(this._toggledValue);
  }
}
