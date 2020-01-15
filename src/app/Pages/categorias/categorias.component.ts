import { Component, OnInit } from '@angular/core';
import {  MatDialog, MatSnackBar } from '@angular/material';
import { NuevaCategoriaComponent } from '../nueva-categoria/nueva-categoria.component'

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  columnsToDisplay = ['userName', 'age'];
  Categorias=[
    {id:1,Categoria:'Restaurantes',imagen:''},{id:2,Categoria:'Ropa',imagen:''}
  ];
  displayedColumns: string[] = ['id','Categoria','Editar'];
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  NewCategoria(){
    let dialogRef = this.dialog.open(NuevaCategoriaComponent, {
      data :{nuevo: true},
      panelClass: 'dialogNewCategoria'
    });
    dialogRef.afterClosed().subscribe(res =>{
      if(res.guardado){
        let snackBarRef = this.snackBar.open('Guardado Correctamente')
      }
      else if(res.error){
        let snackBarRef = this.snackBar.open('Ocurrio un error al guardar.')
      }
    })

  }

}
