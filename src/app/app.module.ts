import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
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
import { NuevaCategoriaComponent } from './Pages/nueva-categoria/nueva-categoria.component'
/*     SERVICIOS    */
import { PedidosService } from './Services/Pedidos/pedidos.service'
import { SidestoreService } from './Components/SideMenu/Store/sidestore.service'
import { DetallePedidoStoreService } from './Pages/DetallePedido/Store/detalle-pedido-store.service'
import { NotificacionesServiceService } from './Api/Notificaciones/notificaciones-service.service'
import { Claim } from './Api/Claim/claim'
import { Configuracion } from './Api/Configuracion'
/*     MaterialAngular    */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule, MatSidenavModule, MatTableModule, MatButtonModule,
   MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, 
   MatSnackBarModule, MatOptionModule, MatSelectModule } from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CategoriasComponent } from './Pages/categorias/categorias.component';
import { DragDropDirective } from './Components/DragDrop/drag-drop.directive';
import { AnunciosComponent } from './Pages/anuncios/anuncios.component';
import { NegociosComponent } from './Pages/negocios/negocios.component';
import { DetalleNegocioComponent } from './Pages/negocios/detalle-negocio/detalle-negocio.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PedidosComponent,
    SideMenuComponent,
    DetallePedidoComponent,
    CategoriasComponent,
    NuevaCategoriaComponent,
    DragDropDirective,
    AnunciosComponent,
    NegociosComponent,
    DetalleNegocioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpModule,
    //AngularFireModule.initializeApp(environment.firebase),
    //AngularFirestoreModule,
    //AngularFireAuthModule,
    BrowserAnimationsModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    HttpClientModule,
    DragDropModule    
  ],
  providers: [
    PedidosService,
    SidestoreService,
    DetallePedidoStoreService,
    NotificacionesServiceService,
    Claim,
    Configuracion
  ],
  entryComponents:[
    NuevaCategoriaComponent,
    DetalleNegocioComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
