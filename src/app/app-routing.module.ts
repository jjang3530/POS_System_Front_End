import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'start', loadChildren: './start/start.module#StartPageModule' },
  { path: 'order/:id', loadChildren: './order/order.module#OrderPageModule' },
  { path: 'table/:tableId', loadChildren: './table/table.module#TablePageModule' },
  { path: 'payment/:id', loadChildren: './payment/payment.module#PaymentPageModule' },
  { path: 'confirm/:id', loadChildren: './confirm/confirm.module#ConfirmPageModule' },
  { path: 'menulist', loadChildren: './menulist/menulist.module#MenulistPageModule' },
  { path: 'sales', loadChildren: './sales/sales.module#SalesPageModule' },  { path: 'order-history', loadChildren: './order-history/order-history.module#OrderHistoryPageModule' }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
