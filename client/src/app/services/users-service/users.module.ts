import { ModuleWithProviders, NgModule } from '@angular/core'
import { UsersService } from './users.service'

@NgModule()
export class UsersServiceModule {
  static forRoot(): ModuleWithProviders<UsersServiceModule> {
    return {
      ngModule: UsersServiceModule,
      providers: [UsersService],
    };
  }
}
