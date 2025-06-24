import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pod/:id',
    loadChildren: () =>
      import('./pages/pod/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'contact-us',
    loadChildren: () =>
      import('./pages/pod//pages/contact-us/contact-us.module').then(
        (m) => m.ContactUsModule
      ),
  },
  {
    path: '**',
    redirectTo: 'pod',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
