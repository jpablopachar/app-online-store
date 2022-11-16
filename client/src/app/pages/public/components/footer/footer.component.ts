import { Component } from '@angular/core'

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <hr />
      <div class="container text-center">
        <address>
          <p>Gamezonia 2020 - ¡¡Videojuegos al mejor precio!!</p>
          <p>
            Gila zubia, 20590 - Soraluze (Gipuzkoa)<br />
            Tel: 943 75 00 00 00 / 666 00 00 00 - Contacto: jpablopachar1993@gmail.com
            <a
              class="nav-link"
              routerLink="/contact"
              routerLinkActive="router-link-active"
              >Contacta con nosotros</a
            >
          </p>
        </address>
        <ul class="social nav justify-content-center">
          <li>
            <a href="https://www.youtube.com/@jppachar" target="_blank">
              <img
                src="assets/images/youtube.png"
                alt="Canal de Youtube"
              />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/jppachar" target="_blank">
              <img
                src="assets/images/twitter.png"
                alt="Twitter de Juan Pablo Pachar"
              />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/jpablopachar/" target="_blank">
              <img
                src="assets/images/facebook.png"
                alt="Página de Facebook"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  `,
  styles: [
    `
      .social img {
        width: 32%;
      }
      .social {
        padding: 20px;
      }
    `
  ],
})
export class FooterComponent { }
