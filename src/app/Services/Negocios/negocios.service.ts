import { Injectable } from '@angular/core';
import { Claim } from '../../Api/Claim/claim';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  constructor(
    private claim : Claim
  ) { }

  getNegocios(){
    return new Promise<any>((resolve, reject) =>{
      this.claim.claim('NegociosAdmin','getNegocios','').then(res =>
        resolve(res)
      )
    })
  }

  updateNegocio(negocio){
    return new Promise<any>((resolve, reject) =>{
      this.claim.claimPost('NegociosAdmin','UpdateNegocio',negocio).then(res =>{
        resolve(res)
      })
    })
  }
}
