import { Component, OnInit } from '@angular/core';
import { PedidosComponent } from '../Pedidos/pedidos.component';

import { SidestoreService } from '../../Components/SideMenu/Store/sidestore.service'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
