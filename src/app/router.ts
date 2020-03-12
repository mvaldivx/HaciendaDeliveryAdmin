import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { DetallePedidoComponent } from './Pages/DetallePedido/detalle-pedido.component';
import { CategoriasComponent } from './Pages/categorias/categorias.component'
import { AnunciosComponent } from './Pages/anuncios/anuncios.component' 
import { NegociosComponent } from './Pages/negocios/negocios.component'

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
    },
    {
        path: 'anuncios',
        component: AnunciosComponent
    },
    {
        path: 'negocios',
        component: NegociosComponent
    }
]
