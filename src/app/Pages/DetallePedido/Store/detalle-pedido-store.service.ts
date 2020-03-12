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
  
  private readonly _EstatusAnterior = new BehaviorSubject<string>(status = '')

  readonly detallePedido$ = this._detallePedido.asObservable();

  readonly detallePedidoShow$ = this.detallePedido$

  readonly estatusAnterior$ = this._EstatusAnterior.asObservable();

  readonly estatusAnteriorShow$ = this.estatusAnterior$

  get detalle(): DetallePedido{
    return this._detallePedido.getValue();
  }

  get estatusAnt(): string{
    return this._EstatusAnterior.getValue();
  }

  set detalle(val: DetallePedido){
    this._detallePedido.next(val);
    this.PedidosService.CambiaEstatusPedido(val.Estatus, val.IdPedido, this.estatusAnt).then(data => null,error => console.log(error))
     
  }

  set estatusAnt(val: string){
    this._EstatusAnterior.next(val);
  }

  async setDetallePedido(detallePedido: DetallePedido){
    this.detalle =  detallePedido
  }

  async setEstatusAnterior(estatus: string){
    this.estatusAnt = estatus
  }

}
