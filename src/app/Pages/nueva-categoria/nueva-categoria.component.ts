import { Component, OnInit, Inject } from '@angular/core';
import { CategoriasService } from '../../Services/Categorias/categorias.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Configuracion } from '../../Api/Configuracion'


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
    private dialogRef: MatDialogRef<NuevaCategoriaComponent>,
    private snackBar: MatSnackBar,
    private configuracion: Configuracion,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    console.log(this.data)
    if(this.data.categoria != ""){
      this.Categoria = this.data.categoria 
      this.imagen = this.configuracion.direccionImagenes + 'Categorias/' + this.Categoria + '.jpg'
    }
  }

  ngOnInit() {
    this.dialogRef
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

  save(){
    if(this.imagen && this.Categoria != ''){
      if(this.data.nuevo){
        this.NewCategory(true)
      }else{
        if(this.Categoria != this.data.categoria ||
          this.imagen != this.configuracion.direccionImagenes + 'Categorias/' + this.Categoria + '.jpg'){
            this.UpdateCategory()
        }
      }
    }
  }

  NewCategory(nuevo){
    if(this.imagen && this.Categoria != ''){
      this.loading = true;
      var categoria = (nuevo)?{Categoria: this.Categoria, img: this.Categoria }:{Id: this.data.Id,Categoria: this.Categoria, img: this.Categoria }
      var formData = new FormData();
      formData.append('image',this.imagePath)
      formData.append('nombre', this.Categoria)
      formData.append('ruta','./resources/Images/Categorias/')
      this.CategoriaServ.NewCategory(categoria,nuevo).then(r=>{
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
        if(err.error.text != 'existe'){
          this.dialogRef.close({error:true, errmessage:err})
        }else{
          let snackBarRef = this.snackBar.open('La Categoria que desea guardar ya existe.','',{duration:2000})
        }
      })
    }
  }

  UpdateCategory(){
    this.loading = true;
    //en caso que cambio categoria e imagen
    console.log(this.imagen)
    console.log(this.configuracion.direccionImagenes + 'Categorias/' + this.data.categoria + '.jpg' );
    
    if(this.imagen != this.configuracion.direccionImagenes + 'Categorias/' + this.data.categoria + '.jpg' &&
     this.Categoria != this.data.categoria){
       this.eliminaImagen()
      this.NewCategory(false)
    }
    //en caso que solo haya cambiado la categoria
    else if(this.Categoria != this.data.categoria &&
      this.imagen === this.configuracion.direccionImagenes + 'Categorias/' + this.data.categoria + '.jpg' ){
        var categoria = {Id: this.data.Id,Categoria: this.Categoria, img: this.Categoria }
        this.renameImage()  
        this.CategoriaServ.NewCategory(categoria,false).then(r=>{
          this.loading = false
          this.dialogRef.close({guardado:true})
        },err=>{
          this.loading = false
          this.dialogRef.close({error:true, errmessage:err})
        })
    }
    //en caso que cambio la imagen
    else if(this.Categoria === this.data.categoria &&
      this.imagen != this.configuracion.direccionImagenes + 'Categorias/' + this.data.categoria + '.jpg' ){
        var formData = new FormData();
        formData.append('image',this.imagePath)
        formData.append('nombre', this.Categoria)
        formData.append('ruta','./resources/Images/Categorias/')
        this.CategoriaServ.InsertImage(formData).subscribe(res =>{
          this.loading = false
          this.dialogRef.close({guardado:true})
        }, err=>{
          this.loading = false
          this.dialogRef.close({error:true, errmessage:err})
        })
    }
  }

  renameImage(){
    var formData = new FormData();
    formData.append('newnombre', this.Categoria)
    formData.append('nombre', this.data.categoria)
    formData.append('ruta','./resources/Images/Categorias/')
    this.CategoriaServ.RenameImage(formData).subscribe(res =>{
    }, err=>{
    })
  }

  eliminaImagen(){
    var formData = new FormData();
    formData.append('nombre', this.data.categoria)
    formData.append('ruta','./resources/Images/Categorias/')
    this.CategoriaServ.EliminaImage(formData).subscribe(res =>{
    }, err=>{
    })
  }

}
