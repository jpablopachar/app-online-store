import { Component, OnInit } from '@angular/core'
import { UsersService } from '@app/services'

@Component({
  selector: 'app-home',
  template: ` <p>home works!</p> `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor(private readonly _usersService: UsersService) { }

  ngOnInit(): void {
    this._usersService.getUsers().subscribe((res): void => {
      console.log(res);
    });
    /* this._graphqlService
      .login('jppachar@yopmail.com', '123456789')
      .subscribe((res): void => {
        console.log(res);
      }); */
  }
}
