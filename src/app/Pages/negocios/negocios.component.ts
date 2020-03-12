import { Component, OnInit } from '@angular/core';
import { NegociosService } from '../../Services/Negocios/negocios.service'
import { MatDialog, MatSnackBar } from '@angular/material';
import { DetalleNegocioComponent } from './detalle-negocio/detalle-negocio.component'

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css']
})
export class NegociosComponent implements OnInit {
  Negocios=[]  
  displayedColumns: string[] = ['Id','Negocio','Descripcion', 'Estatus', 'Abierto', 'Categoria'];

  constructor(
    private apiNegocios: NegociosService,
    private dialog: MatDialog,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.getNegocios();
  }

  getNegocios(){
    this.apiNegocios.getNegocios().then(res=>{
      res.subscribe(r =>{
        this.Negocios = r
      })
    })
  }

  infoNegocio(Negocio){
    this.dialogDetNegocio(Negocio)
    
  }

  dialogDetNegocio(Negocio){
    let dialogRef = this.dialog.open(DetalleNegocioComponent, {
      data :{Negocio: Negocio},
      panelClass: 'dialogEditNegocio'
    });
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        if(res.guardado){
          this.getNegocios()
          let snackBarRef = this.snackBar.open('Guardado Correctamente','',{duration:2000})
        }
      }
      
    })
  }


}
