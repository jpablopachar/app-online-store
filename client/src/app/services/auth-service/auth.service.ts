import { Injectable } from '@angular/core'
import { GraphqlService, LOGIN } from '@app/graphql'
import { MeData, Session } from '@app/models/server'
import { Apollo } from 'apollo-angular'
import { map, Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService extends GraphqlService {
  private _accessVar: Subject<MeData>;
  
  public accessVar$: Observable<MeData>;

  constructor(public readonly apollo: Apollo) {
    super(apollo);

    this._accessVar = new Subject<MeData>();

    this.accessVar$ = this._accessVar.asObservable();
  }

  public login(email: string, password: string): Observable<any> {
    return this.get(LOGIN, { email, password, include: false }).pipe(
      map((res: any): any => res.login)
    );
  }

  public setSession(token: string, expiresTimeInHours: number = 24): void {
    const date: Date = new Date();

    date.setHours(date.getHours() + expiresTimeInHours);

    const session: Session = {
      token,
      expiresIn: new Date(date).toISOString(),
    };

    localStorage.setItem('session', JSON.stringify(session));
  }

  public updateSession(newValue: MeData): void {
    this._accessVar.next(newValue);
  }
}
