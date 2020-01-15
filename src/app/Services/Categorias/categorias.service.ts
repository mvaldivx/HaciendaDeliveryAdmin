import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from '../../Api/Claim/claim';

export interface Categoria{
  Categoria: string;
  img: File;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(
    private claim : Claim
  ) { }

  NewCategory(categoria): Observable <any> {
    return this.claim.claimPost('CategoriasAdmin','NewCategory',categoria)
  }

  InsertImage(image):Observable<any>{
    return this.claim.claimImage(image)
  }

}
