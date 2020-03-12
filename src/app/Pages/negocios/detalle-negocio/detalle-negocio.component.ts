import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CategoriasService} from '../../../Services/Categorias/categorias.service'
import { NegociosService } from '../../../Services/Negocios/negocios.service';

@Component({
  selector: 'app-detalle-negocio',
  templateUrl: './detalle-negocio.component.html',
  styleUrls: ['./detalle-negocio.component.css']
})
export class DetalleNegocioComponent implements OnInit {
 categorias=[]
 Negocio :{}
 loading = true
  constructor(
    private dialogRef: MatDialogRef<DetalleNegocioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiCategorias: CategoriasService,
    private apiNegocios : NegociosService
  ) {
    this.Negocio = Object.assign({} ,this.data.Negocio)
   }

  ngOnInit() {
    this.getCategorias();
    console.log(this.data)
    
  }

  getCategorias(){
    this.apiCategorias.getCategorias().then(res=>{
      res.subscribe(cat =>{
        this.categorias = cat
      })
    })
  }

  GuardaNegocio(){
    console.log(this.Negocio)
    this.validaCamposModificados().then(cambios => {
      this.apiNegocios.updateNegocio({Negocio: this.Negocio, cambios: cambios}).then(r =>{
        r.subscribe(res =>{
          this.loading = false
          this.dialogRef.close({guardado:true})
        }, err=>{
          this.loading = false
          this.dialogRef.close({error:true, errmessage:err})
        })
      })
      
    })
  }

  validaCamposModificados(){
    return new Promise<{}>((resolve,reject)=>{
      var cambios =[]
      Object.keys(this.Negocio).forEach(k =>{
        if(this.Negocio[k] != this.data.Negocio[k]){
          cambios.push({campo: k, valorAnt: this.data.Negocio[k], Usuario: 'admin'})
        }
      })
      resolve(cambios)
    })
  }



}
