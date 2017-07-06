import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Listado } from './listado';

@NgModule({
  declarations: [
    Listado,
  ],
  imports: [
    IonicPageModule.forChild(Listado),
  ],
  exports: [
    Listado
  ]
})
export class ListadoModule {}
