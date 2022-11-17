import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { UsersServiceModule } from '@app/services'
import { DatepickerModule } from '@app/shared'
import { RegisterRoutingModule } from './register-routing.module'
import { RegisterComponent } from './register.component'

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    DatepickerModule,
    UsersServiceModule.forRoot()
  ]
})
export class RegisterModule { }
