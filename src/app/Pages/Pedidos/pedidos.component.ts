import { Component, ViewChild, ElementRef } from '@angular/core';
import { PedidosService } from '../../Services/Pedidos/pedidos.service'
import leaflet from 'leaflet';
import { Router } from '@angular/router';
import { DetallePedidoStoreService } from '../DetallePedido/Store/detalle-pedido-store.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { NotificacionesServiceService } from '../../Api/Notificaciones/notificaciones-service.service'


@Component({
  selector: 'pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  @ViewChild('map',null) mapContainer: ElementRef;
    PedidosRealizados:any[];
    PedidosEnProceso:any[];
    PedidosEnviados:any[];
    PedidosEntregados:any[];
    meses=['Ene','Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    socket: SocketIOClient.Socket
    constructor(
       private pedidos: PedidosService,
       private router: Router,
       private detallePedidoStore: DetallePedidoStoreService,
       private notificacionesServ :NotificacionesServiceService
    ){
        this.socket = io('http://localhost:3000');
          this.socket.on('StatusWasChanged', status => {
            this.Movepedido(status)
          });
        this.ObtenerPedidosRealizados()
        this.ObtenerPedidosEnProceso()
        this.ObtenerPedidosEnviados()
        this.ObtenerPedidosEntregados()
    }

    ObtenerPedidosRealizados(){
      return new Promise<boolean>(resolve =>{
         this.pedidos.getPedidosRealizados().subscribe(pedidos => {
           if(pedidos.length > 0){
             this.PedidosRealizados = pedidos
             this.PedidosRealizados.forEach(p=>{
                p.FechaPedido = this.formatDate(p.FechaPedido)
                p.FechaConcluido = this.formatDate(p.FechaConcluido)
              })
              resolve(true)
           }else{
            this.PedidosRealizados = []
             resolve(false)
           }
        })
      })
    }
    ObtenerPedidosEnProceso(){
      return new Promise<boolean>(resolve =>{
         this.pedidos.getPedidosEnProceso().subscribe(pedidos => {
           if(pedidos.length > 0){
             this.PedidosEnProceso = pedidos
             this.PedidosEnProceso.forEach(p=>{
                p.FechaPedido = this.formatDate(p.FechaPedido)
                p.FechaConcluido = this.formatDate(p.FechaConcluido)
              })
              resolve(true)
           }else{
            this.PedidosEnProceso = []
             resolve(false)
           }
        })
      })
    }
    ObtenerPedidosEnviados(){
      return new Promise<boolean>(resolve =>{
         this.pedidos.getPedidosEnviados().subscribe(pedidos => {
           if(pedidos.length > 0){
             this.PedidosEnviados = pedidos
             this.PedidosEnviados.forEach(p=>{
                p.FechaPedido = this.formatDate(p.FechaPedido)
                p.FechaConcluido = this.formatDate(p.FechaConcluido)
              })
              resolve(true)
           }else{
            this.PedidosEnviados = []
             resolve(false)
           }
        })
      })
    }
    ObtenerPedidosEntregados(){
      return new Promise<boolean>(resolve =>{
         this.pedidos.getPedidosEntregados().subscribe(pedidos => {
           if(pedidos.length > 0){
             this.PedidosEntregados = pedidos
             this.PedidosEntregados.forEach(p=>{
                p.FechaPedido = this.formatDate(p.FechaPedido)
                p.FechaConcluido = this.formatDate(p.FechaConcluido)
              })
              resolve(true)
           }else{
            this.PedidosEntregados = []
             resolve(false)
           }
        })
      })
    }

    formatDate(date){
      var dat = new Date(date)
      var fp = dat.toLocaleDateString("en-US").split('/')
      return fp[1] + ' ' + this.meses[parseInt(fp[0])-1] + ' ' + fp[2] + '  ' + this.getHora(dat.getHours()) + ':' + dat.getMinutes() + ' ' + ((dat.getHours() >= 12)?'PM':'AM');
    }

    getHora(hora){
      if(hora <= 12){
        return hora
      }else{
        return hora-12
      }
    }
  
    DetalleProducto(dp){
      this.detallePedidoStore.setEstatusAnterior(dp.Estatus)
      this.detallePedidoStore.setDetallePedido(dp)
      this.router.navigateByUrl('detallePedido')
    }

    drop(event: CdkDragDrop<string[]>){
      if(event.previousContainer !== event.container){
        var noPedido = event.item.element.nativeElement.children[0].children[0].children[0].children[0].textContent 
        var connectedTo = event.container.id
        var accion = ''
        switch(connectedTo){
          case 'RealizadosList':
              accion = 'Realizado'
              break;
          case 'EnProcesoList':
              accion = 'En Proceso'
              break;
          case 'EnviadosList':
              accion = 'Enviado'
              break;
          case 'EntregadosList':
              accion = 'Entregado'
              break;
        }
        var IdUsuario = event.item.element.nativeElement.children[0].children[0].children[4].children[0].textContent
        if(accion === 'Entregado'){
          this.pedidos.getPlayersId(Number(IdUsuario)).subscribe(pi =>{
            var pis = []
            pi.forEach(p=>{
              pis.push(p.playerId)
            })
            this.notificacionesServ.EnviarNotificacionPedido(pis,accion, Number(noPedido))
          })
        }
        
        this.pedidos.CambiaEstatusPedido(accion,Number(noPedido), event.previousContainer.id).subscribe(()=>{
          this.Movepedido({IdPedido:Number(noPedido), Estatus:accion,From: event.previousContainer.id})
        })
      }
    }

    Movepedido(info){
      var pendiente =[]
      switch(info.From){
        case 'RealizadosList':
            pendiente = this.PedidosRealizados.filter(or=>{
              return or.IdPedido === info.IdPedido
            })
            this.PedidosRealizados  = this.PedidosRealizados.filter(or=>{
              return or.IdPedido != info.IdPedido
            })
            break;
        case 'EnProcesoList':
            pendiente = this.PedidosEnProceso.filter(or=>{
              return or.IdPedido === info.IdPedido
            })
            this.PedidosEnProceso = this.PedidosEnProceso.filter(or=>{
              return or.IdPedido != info.IdPedido
            })
            break;
        case 'EnviadosList':
            pendiente = this.PedidosEnviados.filter(or=>{
              return or.IdPedido === info.IdPedido
            })
            this.PedidosEnviados = this.PedidosEnviados.filter(or=>{
              return or.IdPedido != info.IdPedido
            })
            break;
        case 'EntregadosList':
            pendiente = this.PedidosEntregados.filter(or=>{
              return or.IdPedido === info.IdPedido
            })
            this.PedidosEntregados = this.PedidosEntregados.filter(or=>{
              return or.IdPedido != info.IdPedido
            })
            break;
      }
      if(pendiente.length > 0){
        switch(info.Estatus){
          case 'Realizado':
            pendiente[0].Estatus = 'Realizado'
            this.PedidosRealizados.push(pendiente[0])
            break;
          case 'En Proceso':
              pendiente[0].Estatus = 'En Proceso'
            this.PedidosEnProceso.push(pendiente[0])
            break;
          case 'Enviado':
              pendiente[0].Estatus = 'Enviado'
            this.PedidosEnviados.push(pendiente[0])
            break;
          case 'Entregado':
              pendiente[0].Estatus = 'Entregado'
            this.PedidosEntregados.push(pendiente[0])
            break;
        }
      }
    }
}