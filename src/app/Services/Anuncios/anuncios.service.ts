import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from '../../Api/Claim/claim';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  constructor(
    private claim: Claim
  ) {
   }

  getAnuncios(){
    return new Promise<any>((resolve, reject) =>{
      this.claim.claim('AnunciosAdmin','getAnuncios','').then(res =>
        resolve(res)
      )
    })
    
  }
}
