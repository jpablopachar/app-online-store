import { Component } from '@angular/core'

@Component({
  selector: 'app-header',
  template: `
    <div class="container-fluid navbar-dark bg-dark">
      <div class="d-flex justify-content-between">
        <div>
          <img
            class="logotype"
            src="assets/images/gamezonia.png"
            alt="Logotipo de la tienda"
          />
        </div>
        <div class="flex-fill">
          <span class="delivery">
            <i class="fas fa-truck"></i>&nbsp;&nbsp; Gastos de envío
            <b>GRATUITOS</b> en todos tus envíos
          </span>
        </div>
        <div class="d-flex flex-fill">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item faq">
              <a
                class="nav-link"
                [routerLink]="['/faq']"
                routerLinkActive="router-link-active"
              >
                <i class="fas fa-question"></i>
                <span> Ayuda - Preguntas frecuentes </span></a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      * {
        color: rgba(255,255,255, 0.8);
      }

      .logotype {
        width: 25%;
        text-align: left;
        margin: 5px 0 5px 10px;
      }

      p, a {
        position: relative;
      }

      p {
        top: 25%;
      }

      a {
        top: 14%;
      }

      a:hover {
        text-decoration: underline;
      }

      .faq {
        margin-top: 10px;
      }

      .delivery {
        position: relative;
        top: 32%;
      }
    `
  ],
})
export class HeaderComponent { }
