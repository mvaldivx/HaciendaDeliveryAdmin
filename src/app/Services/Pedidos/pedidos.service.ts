import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Pedido {
  IdPedido: number;
  IdUsuario: number;
  FechaPedido: Date;
  Estatus: string;
  Calle: string;
  FechaConcluido: Date;
  Numero: string;
  Total: number;
  lat: number;
  lng: number;
}

@Injectable()
export class PedidosService {
  PedidosRealizados: AngularFirestoreCollection<Pedido>;
  PedidosEnProceso: AngularFirestoreCollection<Pedido>;
  PedidosEnviados: AngularFirestoreCollection<Pedido>;
  PedidosEntregados: AngularFirestoreCollection<Pedido>;
  private PedidosFB: Observable<Pedido[]>;
  constructor(
    private db: AngularFirestore
  ) {
    this.PedidosRealizados = this.db.collection<Pedido>('Pedidos', ref=> ref.orderBy('IdPedido'));

    this.PedidosFB = this.PedidosRealizados.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
   }

  getPedidosRealizados(){
    this.PedidosRealizados =  this.db.collection<Pedido>('Pedidos', ref=> ref.orderBy('IdPedido','desc').where('Estatus','==','Realizado'))
    return this.PedidosRealizados.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
  }
  getPedidosEnProceso(){
    this.PedidosEnProceso =  this.db.collection<Pedido>('Pedidos', ref=> ref.orderBy('IdPedido','desc').where('Estatus','==','En Proceso'))
    return this.PedidosEnProceso.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
  }
  getPedidosEnviados(){
    this.PedidosEnviados =  this.db.collection<Pedido>('Pedidos', ref=> ref.orderBy('IdPedido','desc').where('Estatus','==','Enviado'))
    return this.PedidosEnviados.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
  }
  getPedidosEntregados(){
    this.PedidosEntregados =  this.db.collection<Pedido>('Pedidos', ref=> ref.orderBy('IdPedido','desc').where('Estatus','==','Entregado'))
    return this.PedidosEntregados.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
  }

  CambiaEstatusPedido(status:string, IdUsuario: number, Id:string){
    return this.db.collection<Pedido>('Pedidos', ref=> ref.where('IdUsuario','==',IdUsuario)
                        ).doc(Id).update({Estatus:status})
  }

}
