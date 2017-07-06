import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { Basedatos } from '../../providers/basedatos';

/**
 * Generated class for the Listado page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html',
})
export class Listado {

  sitios: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: Basedatos) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Listado');
  }

  ionViewDidEnter(){
	this.sitios = this.db.getSitios();
  }
  
  deleteSitio(sitio){
	this.db.deleteSitio(sitio);
  }  
}
