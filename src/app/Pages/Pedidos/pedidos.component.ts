import { Component, ViewChild, ElementRef } from '@angular/core';
import { PedidosService } from '../../Services/Pedidos/pedidos.service'
import leaflet from 'leaflet';
import { Router } from '@angular/router';
import { DetallePedidoStoreService } from '../DetallePedido/Store/detalle-pedido-store.service';


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

    constructor(
       private pedidos: PedidosService,
       private router: Router,
       private detallePedidoStore: DetallePedidoStoreService
    ){
        this.ObtenerPedidosRealizados()
    }

    ObtenerPedidosRealizados(){
      return new Promise<boolean>(resolve =>{
         this.pedidos.getPedidosRealizados().subscribe(pedidos => {
           if(pedidos.length > 0){
             this.PedidosRealizados = pedidos
             this.PedidosRealizados.forEach(p=>{
                p.FechaPedido = this.formatDate(p.FechaPedido['seconds'])
                p.FechaConcluido = this.formatDate(p.FechaConcluido['seconds'])
              })
              resolve(true)
           }else{
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
                p.FechaPedido = this.formatDate(p.FechaPedido['seconds'])
                p.FechaConcluido = this.formatDate(p.FechaConcluido['seconds'])
              })
              resolve(true)
           }else{
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
                p.FechaPedido = this.formatDate(p.FechaPedido['seconds'])
                p.FechaConcluido = this.formatDate(p.FechaConcluido['seconds'])
              })
              resolve(true)
           }else{
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
                p.FechaPedido = this.formatDate(p.FechaPedido['seconds'])
                p.FechaConcluido = this.formatDate(p.FechaConcluido['seconds'])
              })
              resolve(true)
           }else{
             resolve(false)
           }
        })
      })
    }

    formatDate(date){
      var dat = new Date(date * 1000)
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
      this.detallePedidoStore.setDetallePedido(dp)
      this.router.navigateByUrl('detallePedido')
    }

    drop(event){
      console.log(event)
    }
}