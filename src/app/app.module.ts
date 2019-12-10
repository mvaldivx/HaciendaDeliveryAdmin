import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//import { AngularFireModule } from '@angular/fire';
//import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { environment } from '../environments/environment';

/*     COMPONENTES    */
import { HomeComponent } from './Pages/home/home.component'
import { PedidosComponent } from './Pages/Pedidos/pedidos.component'
import { SideMenuComponent } from './Components/SideMenu/sidemenu.component'
import { DetallePedidoComponent } from './Pages/DetallePedido/detalle-pedido.component'
/*     SERVICIOS    */
import { PedidosService } from './Services/Pedidos/pedidos.service'
import { SidestoreService } from './Components/SideMenu/Store/sidestore.service'
import { DetallePedidoStoreService } from './Pages/DetallePedido/Store/detalle-pedido-store.service'
import { NotificacionesServiceService } from './Api/Notificaciones/notificaciones-service.service'
import { Claim } from './Api/Claim/claim'
/*     MaterialAngular    */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule, MatSidenavModule } from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop'

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
    AppRoutingModule,
    FormsModule,
    HttpModule,
    //AngularFireModule.initializeApp(environment.firebase),
    //AngularFirestoreModule,
    //AngularFireAuthModule,
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
    NotificacionesServiceService,
    Claim
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
