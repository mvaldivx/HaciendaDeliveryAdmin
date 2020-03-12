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

  NewCategory(categoria, nuevo){
    return new Promise<any>((resolve, reject) =>{
      if(nuevo)
        this.claim.claimPost('CategoriasAdmin','NewCategory',categoria).then(res => resolve(res))
      else
        this.claim.claimPost('CategoriasAdmin','UpdateCategory',categoria).then(res=>resolve(res))
    })
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

  getCategorias(){
    return new Promise<any>((resolve, reject) =>{
      this.claim.claim('CategoriasAdmin','getCategorias','').then(res =>
        resolve(res)
        )
    })
  }

}
