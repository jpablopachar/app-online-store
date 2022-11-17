import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminGuard } from '@app/guards'
import { AdminComponent } from './admin.component'

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [AdminGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
