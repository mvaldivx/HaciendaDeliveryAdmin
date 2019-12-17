import { Component, OnInit } from '@angular/core';
import { DetallePedidoStoreService } from './Store/detalle-pedido-store.service'
import { Router } from '@angular/router';
import leaflet from 'leaflet';
import { NotificacionesServiceService } from '../../Api/Notificaciones/notificaciones-service.service'
import { PedidosService } from '../../Services/Pedidos/pedidos.service'

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {
DetallePedido = this.detallePedStore.detallePedidoShow$.source['value'];

  constructor(
    private detallePedStore: DetallePedidoStoreService,
    private router: Router,
    private notificacionesServ: NotificacionesServiceService,
    private PedidosServ: PedidosService
  ) { }

  ngOnInit() {
    if(this.detallePedStore.detallePedidoShow$.source['value']['Estatus'] === ''){
      this.router.navigateByUrl('')
    }
    this.dibujaMapa()
  }

  dibujaMapa(){
    var map:any 
    var lat= this.detallePedStore.detallePedidoShow$.source['value']['lat'];
    var lng= this.detallePedStore.detallePedidoShow$.source['value']['lng']
    var mapa = document.getElementById('map')    
    map= leaflet.map(mapa,{zoomControl: true}).fitWorld();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
    map.setView([lat, lng],16)

    leaflet.DomEvent.stopPropagation
    var marker = leaflet.marker([lat, lng],{draggable:false})
    var markerGroup = leaflet.featureGroup();;
    markerGroup.addLayer(marker);
    map.addLayer(markerGroup);
  }

  closeDetalle(){
    this.router.navigateByUrl('')
  }

  ModificaEstatus(event){
    var aux = this.detallePedStore.detallePedidoShow$.source['value']
    aux.Estatus = event.target.value
    var estNoti = ''
    switch(aux.Estatus){
      case 'En Proceso':
        estNoti = 'En Proceso'
        break; 
      case 'Enviado':
        estNoti = 'Enviado'
        break;
      case 'Entregado':
        estNoti = 'Entregado'
        break;
      default:
        estNoti = 'Realizado'
        break;
    }
    this.detallePedStore.setDetallePedido(aux)
    this.PedidosServ.getPlayersId(aux.IdUsuario).subscribe(pi =>{
      var pis = []
      pi.forEach(p=>{
        pis.push(p.playerId)
      })
      this.notificacionesServ.EnviarNotificacionPedido(pis,estNoti, aux.IdPedido)
    })
    
    
  }

}
