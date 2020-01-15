import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../Services/Categorias/categorias.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css']
})
export class NuevaCategoriaComponent implements OnInit {
imagen;
imagePath;
Categoria= '';
form: FormGroup;
loading= false;

  constructor(
    private CategoriaServ: CategoriasService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<NuevaCategoriaComponent>
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      image: ['']
    });
  }

  uploadFile(e){
    if(e.length > 0){
      this.imagePath = e.item(0)
    }
    if(e.length === 0)
      return
    var mimeType = e[0].type
    if(mimeType.match(/image\/*/) == null)
      return
    var reader = new FileReader();
    reader.readAsDataURL(e[0])
    reader.onload =(_event) =>{
      this.imagen = reader.result
    }
  }

  NewCategory(){
    if(this.imagen && this.Categoria != ''){
      this.loading = true;
      var categoria = {Categoria: this.Categoria, img: this.Categoria }
      var formData = new FormData();
      formData.append('image',this.imagePath)
      formData.append('nombre', this.Categoria)
      formData.append('ruta','./resources/Images/Categorias/')
      this.CategoriaServ.NewCategory(categoria).subscribe(r=>{
        if(r.affectedRows === 1){
          this.CategoriaServ.InsertImage(formData).subscribe(res =>{
            this.loading = false
            this.dialogRef.close({guardado:true})
          }, err=>{
            this.loading = false
            this.dialogRef.close({error:true, errmessage:err})
          })
        }
      },err=>{
        this.loading = false
        this.dialogRef.close({error:true, errmessage:err})
      })
    }
  }

}
