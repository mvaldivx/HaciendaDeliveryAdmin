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
    Pedidos:any[]
    meses=['Ene','Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    constructor(
       private pedidos: PedidosService,
       private router: Router,
       private detallePedidoStore: DetallePedidoStoreService
    ){
        this.ObtenerPedidos().then(r=>{
          if(r){   
            setTimeout(() => {
              this.GeneraMapas()
            },100)       
          }
        })
    }

    ObtenerPedidos(){
      return new Promise<boolean>(resolve =>{
         this.pedidos.getPedidosActivos().subscribe(pedidos => {
           if(pedidos.length > 0){
             this.Pedidos = pedidos
             this.Pedidos.forEach(p=>{
                var dat = new Date(p.FechaPedido['seconds'] * 1000)
                var dc = new Date(p.FechaConcluido['seconds'] * 1000)
                var fp = dat.toLocaleDateString("en-US").split('/')
                var fc = dc.toLocaleDateString("en-US").split('/')
                p.FechaPedido = fp[1] + ' ' + this.meses[parseInt(fp[0])-1] + ' ' + fp[2] + '  ' + this.getHora(dat.getHours()) + ':' + dat.getMinutes() + ' ' + ((dat.getHours() >= 12)?'PM':'AM');
                p.FechaConcluido = fc[1] + ' ' + this.meses[parseInt(fc[0])-1] + ' ' + fc[2] + '  ' + this.getHora(dc.getHours()) + ':' + dc.getMinutes() + ' ' + ((dc.getHours() >= 12)?'PM':'AM');
              })
              resolve(true)
           }else{
             resolve(false)
           }
          
        })
      })
       
    }

    getHora(hora){
      if(hora <= 12){
        return hora
      }else{
        return hora-12
      }
    }

    GeneraMapas(){
      this.Pedidos.forEach(p=>{
        var map:any 
        var mapa = document.getElementById('map' + p.IdPedido)        
        map= leaflet.map(mapa,{ zoomControl: false, dragging: false }).fitWorld();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
        map.setView([p.lat, p.lng],16)
  
        leaflet.DomEvent.stopPropagation
        var marker = leaflet.marker([p.lat,  p.lng],{draggable:false})
        var markerGroup = leaflet.featureGroup();;
        markerGroup.addLayer(marker);
        map.addLayer(markerGroup);
      })
    }
  
    DetalleProducto(dp){
      this.detallePedidoStore.setDetallePedido(dp)
      this.router.navigateByUrl('detallePedido')
    }
}