import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { DetallePedidoComponent } from './Pages/DetallePedido/detalle-pedido.component';
import { CategoriasComponent } from './Pages/categorias/categorias.component'

export const rout: Routes = [
    {
        path: '' ,
        component: HomeComponent
    },
    {
        path:'detallePedido',
        component: DetallePedidoComponent
    },
    {
        path: 'categorias',
        component: CategoriasComponent
    }
]
