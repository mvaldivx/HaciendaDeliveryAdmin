import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from '../../Api/Claim/claim';

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
  private PedidosFB: Observable<Pedido[]>;
  constructor(
    private claim : Claim
  ) {
   }

  getPedidosRealizados(): Observable <any>{
   /* this.PedidosRealizados =  this.db.collection<Pedido>('Pedidos', ref=> ref.orderBy('IdPedido','desc').where('Estatus','==','Realizado'))
    return this.PedidosRealizados.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )*/
    return this.claim.claim('PedidosAdmin','getPedidos',{estatus:'Realizado',order: 'DESC'})
  }
  getPedidosEnProceso(): Observable <any>{
   /* this.PedidosEnProceso =  this.db.collection<Pedido>('Pedidos', ref=> ref.orderBy('IdPedido','desc').where('Estatus','==','En Proceso'))
    return this.PedidosEnProceso.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )*/
    return this.claim.claim('PedidosAdmin','getPedidos',{estatus:'En Proceso',order: 'DESC'})
  }
  getPedidosEnviados(): Observable <any>{
    /*this.PedidosEnviados =  this.db.collection<Pedido>('Pedidos', ref=> ref.orderBy('IdPedido','desc').where('Estatus','==','Enviado'))
    return this.PedidosEnviados.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )*/
    return this.claim.claim('PedidosAdmin','getPedidos',{estatus:'Enviado',order: 'DESC'})
  }
  getPedidosEntregados(): Observable <any>{
    /*this.PedidosEntregados =  this.db.collection<Pedido>('Pedidos', ref=> ref.orderBy('IdPedido','desc').where('Estatus','==','Entregado'))
    return this.PedidosEntregados.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )*/
    return this.claim.claim('PedidosAdmin','getPedidos',{estatus:'Entregado',order: 'ASC'})
  }

  CambiaEstatusPedido(status:string, IdPedido: number, frrom:string ): Observable <any>{
    return this.claim.claimPost('PedidosAdmin','changeStatus',{IdPedido:IdPedido, Estatus:status,From:frrom})
    /*return this.db.collection<Pedido>('Pedidos', ref=> ref.where('IdUsuario','==',IdUsuario)
                        ).doc(Id).update({Estatus:status})*/
  }

  getPlayersId(IdUsuario: number): Observable<any>{
    return this.claim.claim('Auth', 'getPlayersId',{IdUsuario: IdUsuario})
  }

}
