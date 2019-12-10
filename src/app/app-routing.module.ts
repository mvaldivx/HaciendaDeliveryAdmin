import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { DetallePedidoComponent } from './Pages/DetallePedido/detalle-pedido.component';



const routes: Routes = [
  {path: '' ,
  component: HomeComponent},
  {path:'detallePedido',
  component: DetallePedidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
