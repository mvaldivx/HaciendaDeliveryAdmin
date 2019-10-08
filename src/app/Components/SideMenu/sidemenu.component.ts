import { Component } from '@angular/core';
import { SidestoreService } from './Store/sidestore.service'

@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SideMenuComponent {
  
  constructor(
    private sidemenuStore: SidestoreService
  ){
  }



  closeMenu(state){
    this.sidemenuStore.changeStatus(!state);
  }
}