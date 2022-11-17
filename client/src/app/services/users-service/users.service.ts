import { Injectable } from '@angular/core'
import { GraphqlService, REGISTER_USER, USERS_LIST } from '@app/graphql'
import { RegisterForm } from '@app/models/server'
import { Apollo } from 'apollo-angular'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UsersService extends GraphqlService {
  constructor(public readonly apollo: Apollo) {
    super(apollo);
  }

  public getUsers(page: number = 1, itemsPage: number = 20): Observable<any> {
    return this.get(USERS_LIST, {
      include: true,
      itemsPage,
      page,
    }).pipe(
      map((result: any): any => (result.users))
    );
  }

  register(user: RegisterForm): Observable<any> {
    return this.set(REGISTER_USER, {
      user,
      include: false,
    }).pipe(
      map((result: any): any => (result.register))
    );
  }
}