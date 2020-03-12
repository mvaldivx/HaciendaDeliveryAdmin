import { Component, OnInit } from '@angular/core';
import { AnunciosService } from '../../Services/Anuncios/anuncios.service'

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {
Anuncios=[]
displayedColumns: string[] = ['Producto', 'Negocio', 'Estatus'];
  constructor(
    private ApiAnuncios: AnunciosService
  ) { }

  ngOnInit() {
    this.getAnuncios()
  }

  getAnuncios(){
    this.ApiAnuncios.getAnuncios().then(res =>{
        res.subscribe(r=>{
          console.log(r)
          this.Anuncios = r
        })
    })
  }

  InfoAnuncio(idProducto){
    console.log(idProducto)
  }

}
