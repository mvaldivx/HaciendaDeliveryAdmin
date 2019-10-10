import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { rout } from './router';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from '../environments/environment';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

/*     COMPONENTES    */
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component'
import { PedidosComponent } from './Pages/Pedidos/pedidos.component'
import { SideMenuComponent } from './Components/SideMenu/sidemenu.component'
import { DetallePedidoComponent } from './Pages/DetallePedido/detalle-pedido.component'
/*     SERVICIOS    */
import { PedidosService } from './Services/Pedidos/pedidos.service'
import { SidestoreService } from './Components/SideMenu/Store/sidestore.service'
import { DetallePedidoStoreService } from './Pages/DetallePedido/Store/detalle-pedido-store.service'
import { NotificacionesServiceService } from './Api/Notificaciones/notificaciones-service.service'
/*     MaterialAngular    */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule, MatSidenavModule } from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop'

const appRoutes: Routes = rout
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PedidosComponent,
    SideMenuComponent,
    DetallePedidoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    //AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserAnimationsModule,
    MatListModule,
    MatSidenavModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [
    PedidosService,
    SidestoreService,
    DetallePedidoStoreService,
    NotificacionesServiceService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
