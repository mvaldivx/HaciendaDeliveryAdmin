import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface sidemenu{
  estatus: boolean
}
@Injectable()
export class SidestoreService {

  constructor() { }

  private readonly _sidemenu = new BehaviorSubject<sidemenu>({estatus:false});
  
  readonly sidemenu$ = this._sidemenu.asObservable();

  readonly sidestatus$ = this.sidemenu$
  
  get status(): sidemenu{
    return this._sidemenu.getValue();
  }

  set status(val: sidemenu){
    this._sidemenu.next(val);
  }

  async changeStatus(status: boolean){
     var aux = {
       ...this.status,
      estatus : status}
    this.status =  aux
  }
}
