import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/*
  Generated class for the Basedatos provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Basedatos {
  // para guardar en Firebase
  sitios: FirebaseListObservable<any>;

  constructor(af: AngularFireDatabase) {
    console.log('Hello Basedatos Provider');
	
	// Leer contenido actual
	   this.sitios = af.list('/sitios');
  }

  addSitio(sitio){
	return this.sitios.push({'sitio': sitio});
  }

  getSitios(){
    return this.sitios;
  }

  deleteSitio(sitio){
	return this.sitios.remove(sitio);
  }
  
}
