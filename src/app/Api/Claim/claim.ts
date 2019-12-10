import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class Claim {
    ip : string = 'localhost'
    puerto: string = '3000';
    servidor: string = 'http://'+this.ip;

    constructor(
        public httpClient: HttpClient
    ){}

    claim(padre,archivo,params): Observable<any> {
        return this.httpClient.get(this.servidor +':'+ this.puerto +'/'+ padre + '/' + archivo ,{params:params})
      }
    
      claimPost(padre,archivo,params): Observable<any>{
        return this.httpClient.post(this.servidor + ':' + this.puerto + '/' + padre + '/' + archivo,{params:params})
        
      }

}