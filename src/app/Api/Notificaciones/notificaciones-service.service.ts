import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable()
export class NotificacionesServiceService {

  OneSignalUrl ='https://onesignal.com/api/v1/notifications'
  Authorization = 'ZTY0ODY5ODctZDcyNS00ZTM0LWI2NGQtNDI0YTQ3OTBmMTkx'
  app_id ='828d30bb-11ce-426c-b6ba-39edcea5fb55'


  constructor(
    private http: HttpClient
  ) { }

  EnviarNotificacionPedido(player_id,estatus, IdPedido){
    var params ={
      'app_id' : this.app_id,
      'include_player_ids' : [player_id],
      'headings': {"en": "Información del Pedido"},
      'contents': {"en": "Tu pedido ya fue " + estatus},
      "data": {"TipoNotificacion": 'Seguimiento',"IdPedido": IdPedido}
    }
    var headers =  new HttpHeaders().set('Authorization',this.Authorization).append('Content-Type','application/json; charset=utf-8')
    console.log('enviar Notificacion');
    
    return this.http.post(this.OneSignalUrl,params,{headers:headers}).subscribe(res=>{
      console.log(res);
      
    })
  }

}
