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

  getPedidosRealizados(){
    return new Promise<any>((resolve, reject) =>{
      this.claim.claim('PedidosAdmin','getPedidos',{estatus:'Realizado',order: 'DESC'}).then(res =>
        resolve(res)
        )
    })
  }
  getPedidosEnProceso(){
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
    return new Promise<any>((resolve, reject) =>{
      this.claim.claim('PedidosAdmin','getPedidos',{estatus:'En Proceso',order: 'DESC'}).then(res =>
        resolve(res)
        )
    })
  }
  getPedidosEnviados(){
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
    return new Promise<any>((resolve, reject) =>{
      this.claim.claim('PedidosAdmin','getPedidos',{estatus:'Enviado',order: 'DESC'}).then(res =>
        resolve(res)
        )
    })
  }
  getPedidosEntregados(){
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
    return new Promise<any>((resolve, reject) =>{
     this.claim.claim('PedidosAdmin','getPedidos',{estatus:'Entregado',order: 'ASC'}).then(res=>
      resolve(res)
      )
    })
  }

  CambiaEstatusPedido(status:string, IdPedido: number, frrom:string ){
    return new Promise<any>((resolve, reject) =>{
      this.claim.claimPost('PedidosAdmin','changeStatus',{IdPedido:IdPedido, Estatus:status,From:frrom}).then(res=>
        resolve(res))
    /*return this.db.collection<Pedido>('Pedidos', ref=> ref.where('IdUsuario','==',IdUsuario)
                        ).doc(Id).update({Estatus:status})*/
    })
  }

  getPlayersId(IdUsuario: number){
    return new Promise<any>((resolve, reject) =>{
      this.claim.claim('Auth', 'getPlayersId',{IdUsuario: IdUsuario}).then(res =>
        resolve(res)
        )
    })
  }

}
