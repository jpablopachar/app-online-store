import { Injectable } from '@angular/core'
import { ApolloQueryResult } from '@apollo/client/core'
import { Apollo, MutationResult } from 'apollo-angular'
import { DocumentNode } from 'graphql'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private readonly _apollo: Apollo) {}

  protected get(
    query: DocumentNode,
    variables: object = {},
    context: object = {},
    cache: boolean = true
  ): Observable<any> {
    return this._apollo
      .watchQuery({
        query,
        variables,
        context,
        fetchPolicy: cache ? 'network-only' : 'no-cache',
      })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<any>): any => result.data)
      );
  }

  protected set(
    mutation: DocumentNode,
    variables: object = {},
    context: object = {}
  ): Observable<any> {
    return this._apollo
      .mutate({
        mutation,
        variables,
        context,
      })
      .pipe(map((result: MutationResult<any>): any => result.data));
  }

  protected subscription(
    subscription: DocumentNode,
    variables: object = {}
  ): Observable<any> {
    return this._apollo
      .subscribe({
        query: subscription,
        variables,
      })
      .pipe(map((result): any => result.data));
  }
}
