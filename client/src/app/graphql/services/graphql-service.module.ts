import { ModuleWithProviders, NgModule } from '@angular/core'
import { GraphqlService } from './graphql.service'

@NgModule()
export class GraphqlServiceModule {
  static forRoot(): ModuleWithProviders<GraphqlServiceModule>{
    return  {
      ngModule: GraphqlServiceModule,
      providers: [GraphqlService]
    };
  }
}
