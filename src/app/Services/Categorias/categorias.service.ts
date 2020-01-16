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

  NewCategory(categoria, nuevo): Observable <any> {
    if(nuevo)
      return this.claim.claimPost('CategoriasAdmin','NewCategory',categoria)
    else
      return this.claim.claimPost('CategoriasAdmin','UpdateCategory',categoria)
  }

  InsertImage(image):Observable<any>{
    return this.claim.claimImage(image,'uploadImage.php')
  }

  EliminaImage(categoria):Observable<any>{
    return this.claim.claimImage(categoria,'deleteImage.php')
  }

  RenameImage(image):Observable<any>{
    return this.claim.claimImage(image,'renameImage.php')
  }

  getCategorias(): Observable<any>{
    return this.claim.claim('CategoriasAdmin','getCategorias','')
  }

}
