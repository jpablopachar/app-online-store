import { Component, OnInit } from '@angular/core'
import { GraphqlService } from '@app/graphql'

@Component({
  selector: 'app-home',
  template: ` <p>home works!</p> `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor(private _graphqlService: GraphqlService) {}

  ngOnInit(): void {
    /* this._graphqlService
      .login('jppachar@yopmail.com', '123456789')
      .subscribe((res): void => {
        console.log(res);
      }); */
  }
}
