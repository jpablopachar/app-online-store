import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FooterComponent } from './components/footer/footer.component'
import { HeaderComponent } from './components/header/header.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { PublicRoutingModule } from './public-routing.module'
import { PublicComponent } from './public.component'

@NgModule({
  declarations: [
    PublicComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
