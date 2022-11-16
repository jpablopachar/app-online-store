import { ModuleWithProviders, NgModule } from '@angular/core'
import { AuthService } from './auth.service'

@NgModule()
export class AuthServiceModule {
  static forRoot(): ModuleWithProviders<AuthServiceModule> {
    return {
      ngModule: AuthServiceModule,
      providers: [AuthService],
    };
  }
}
