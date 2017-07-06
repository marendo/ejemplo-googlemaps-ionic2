import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoSitio } from './nuevo-sitio';

@NgModule({
  declarations: [
    NuevoSitio,
  ],
  imports: [
    IonicPageModule.forChild(NuevoSitio),
  ],
  exports: [
    NuevoSitio
  ]
})
export class NuevoSitioModule {}
