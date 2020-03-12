import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Configuracion } from '../Configuracion';
import { async } from '@angular/core/testing';


export interface Url{
  produccion:{
    server: string;
    ip: string;
    port: string;
  };
  local:{
    server: string;
    ip: string;
    port: string;
  };
}
@Injectable()
export class Claim {

    constructor(
        public httpClient: HttpClient,
        private config: Configuracion
    ){}


    claim(padre,archivo,params){
      return new Promise<Observable<any>>((resolve, reject)=>{
        this.getUrl().subscribe(d=>{
          resolve(this.httpClient.get(d[this.config.servidor].ip +':'+ d[this.config.servidor].port +'/'+ padre + '/' + archivo ,{params:params}))
        });
      })
      }
    
    claimPost(padre,archivo,params){
      return new Promise<Observable<any>>((resolve, reject)=>{
        this.getUrl().subscribe(d=>{
          resolve(this.httpClient.post(d[this.config.servidor].ip + ':' + d[this.config.servidor].port + '/' + padre + '/' + archivo ,{params:params}))
        });
      })
    }

    
    claimImage(params, metodo):Observable<any>{
      return this.httpClient.post(this.config.ipServidorImagenes + metodo,params)
    }
    
    getUrl(){
      return this.httpClient.get<Url>('/assets/Direcciones.json')
    }

}