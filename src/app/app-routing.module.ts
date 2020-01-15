import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { rout } from './router'

@NgModule({
  imports: [RouterModule.forRoot(rout)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
