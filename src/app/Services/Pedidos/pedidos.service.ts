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
  Pedidos: AngularFirestoreCollection<Pedido>;
  private PedidosFB: Observable<Pedido[]>;
  constructor(
    private db: AngularFirestore
  ) {
    this.Pedidos = this.db.collection<Pedido>('Pedidos', ref=> ref.orderBy('IdPedido'));

    this.PedidosFB = this.Pedidos.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
   }

  getPedidosActivos(){
    this.Pedidos =  this.db.collection<Pedido>('Pedidos', ref=> ref.orderBy('IdPedido','desc'))
    return this.Pedidos.snapshotChanges().pipe(
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
