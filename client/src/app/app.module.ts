import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { GraphQLModule } from './graphql'
import { AuthServiceModule } from './services'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    AuthServiceModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
