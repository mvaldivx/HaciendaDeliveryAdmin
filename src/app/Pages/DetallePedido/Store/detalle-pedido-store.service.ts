import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PedidosService } from '../../../Services/Pedidos/pedidos.service'

export interface DetallePedido{
  Id:             string;
  Calle:          string;
  Estatus:        string;
  FechaConcluido: string;
  FechaPedido:    string;
  IdPedido:       number;
  IdUsuario:      number;
  Numero:         string;
  Total:          number;
  lat:            number;
  lng:            number;
}

@Injectable()
export class DetallePedidoStoreService {

  constructor(
    private PedidosService: PedidosService
  ) { }

  private readonly _detallePedido = new BehaviorSubject<DetallePedido>({
    Id: '',
    Calle: '',
    Estatus: '',
    FechaConcluido: '' ,
    FechaPedido: '',
    IdPedido: 0,
    IdUsuario: 0,
    Numero: '',
    Total:  0,
    lat: 0,
    lng: 0,
  });
  
  readonly detallePedido$ = this._detallePedido.asObservable();

  readonly detallePedidoShow$ = this.detallePedido$

  get detalle(): DetallePedido{
    return this._detallePedido.getValue();
  }

  set detalle(val: DetallePedido){
    this._detallePedido.next(val);
    this.PedidosService.CambiaEstatusPedido(val.Estatus, val.IdUsuario, val.Id)
  }

  async setDetallePedido(detallePedido: DetallePedido){
    this.detalle =  detallePedido
  }

}
