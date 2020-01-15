import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Configuracion } from '../Configuracion';

@Injectable()
export class Claim {

    constructor(
        public httpClient: HttpClient,
        private config: Configuracion
    ){}

    claim(padre,archivo,params): Observable<any> {
        return this.httpClient.get(this.config.servidor +':'+ this.config.puerto +'/'+ padre + '/' + archivo ,{params:params})
      }
    
    claimPost(padre,archivo,params): Observable<any>{
      return this.httpClient.post(this.config.servidor + ':' + this.config.puerto + '/' + padre + '/' + archivo,{params:params})    
    }

    claimImage(params):Observable<any>{
      return this.httpClient.post(this.config.ipServidorImagenes + this.config.metodoSubeImagen,params)
    }
    

}