import { NgModule } from '@angular/core'
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core'
import { ErrorResponse, onError } from '@apollo/client/link/error'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { GraphqlServiceModule } from './services/graphql-service.module'

const uri = 'http://localhost:3000/graphql';

export const createApollo = (httpLink: HttpLink): ApolloClientOptions<any> => {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
};

@NgModule({
  imports: [GraphqlServiceModule.forRoot()],
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
  public errorLink = onError(
    ({ graphQLErrors, networkError }: ErrorResponse): void => {
      if (graphQLErrors) console.log(`[Graphql error]: ${graphQLErrors}`);

      if (networkError) console.log(`[Network error]: ${networkError}`);
    }
  );
}
