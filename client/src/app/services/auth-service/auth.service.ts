import { HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { GraphqlService, LOGIN, ME_DATA } from '@app/graphql'
import { MeData, Session } from '@app/models/server'
import { optionsWithDetails, REDIRECTS_ROUTES } from '@app/shared'
import { Apollo } from 'apollo-angular'
import jwtDecode from 'jwt-decode'
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

  public start(): void {
    const dateDecode = this.decodeToken();

    if (dateDecode.exp < new Date().getTime() / 1000) {
      localStorage.removeItem('session');

      return;
    }

    if ((this.getSession().token as string).length > 0) {
      this.getMe().subscribe((res: MeData): void => {
        if (!res.status) {
          this.resetSession();

          return;
        }

        this.updateSession(res);
      });

      console.log('Sesión iniciada');

      return;
    }

    this.updateSession({ status: false });

    console.log('Sesión no iniciada');
  }

  public getMe(): Observable<any> {
    console.log(this.getSession().token);

    return this.get(
      ME_DATA,
      { include: false },
      { headers: new HttpHeaders({ Authorization: this.getSession().token as string }) }
    ).pipe(map((res: any): any => res.me));
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

  public getSession(): Session {
    return localStorage.getItem('session') !== null
      ? (JSON.parse(localStorage.getItem('session') as string) as Session)
      : { expiresIn: '', token: '' };
  }

  public updateSession(newValue: MeData): void {
    this._accessVar.next(newValue);
  }

  public async resetSession(routesUrl: string = ''): Promise<void> {
    const result: boolean | undefined = await optionsWithDetails(
      'Cerrar sesión',
      '¿Estás seguro de la cerrar sesión?',
      400,
      'Si, cerrar',
      'No'
    );

    if (!result) return;

    if (REDIRECTS_ROUTES.includes(routesUrl)) {
      localStorage.setItem('route_after_login', routesUrl);
    }

    localStorage.removeItem('session');

    this.updateSession({ status: false });
  }

  public decodeToken(): any {
    return this.getSession().token !== ''
      ? jwtDecode(this.getSession().token as string)
      : '';
  }
}
