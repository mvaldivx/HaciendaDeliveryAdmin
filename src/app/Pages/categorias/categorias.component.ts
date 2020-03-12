import { Component, OnInit } from '@angular/core';
import {  MatDialog, MatSnackBar } from '@angular/material';
import { NuevaCategoriaComponent } from '../nueva-categoria/nueva-categoria.component'
import { CategoriasService } from '../../Services/Categorias/categorias.service'

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  columnsToDisplay = ['userName', 'age'];
  Categorias=[];
  displayedColumns: string[] = ['id','Categoria','Editar'];
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private categServ: CategoriasService
  ) { }

  ngOnInit() {
    this.getCategorias()
  }

  getCategorias(){
    this.categServ.getCategorias().then(cat =>{
      this.Categorias = cat
    })
  }

  NewCategoria(){
    this.dialogCategoria(true)
  }

  ModificaCategoria(id,categoria){
    this.dialogCategoria(false,categoria,id)
  }

  dialogCategoria(nuevo, categoria='', Id= 0){
    let dialogRef = this.dialog.open(NuevaCategoriaComponent, {
      data :{nuevo: nuevo, categoria: categoria, Id: Id},
      panelClass: 'dialogNewCategoria'
    });
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        if(res.guardado){
          this.getCategorias()
          let snackBarRef = this.snackBar.open('Guardado Correctamente','',{duration:2000})
        }
        else if(res.error){
          let snackBarRef = this.snackBar.open('Ocurrio un error al guardar.','',{duration:2000})
        }
      }
      
    })
  }

}
