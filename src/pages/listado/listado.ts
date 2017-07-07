import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController, private launchNavigator : LaunchNavigator, public db: Basedatos) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Listado');
  }

  ionViewDidEnter(){
	this.sitios = this.db.getSitios();
  }
  
  deleteSitio(sitio){
  let alert = this.alertCtrl.create({
      title: 'Confirmar borrado',
      message: '&iquest;Est&aacute;s seguro de que deseas eliminar este sitio?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Ha respondido que no así que no hacemos nada
          }
        },
        {
          text: 'Si',
          handler: () => {
            // Aquí borramos el sitio en la base de datos
			this.db.deleteSitio(sitio);
           }
        }
      ]
    });
    
    alert.present();
  }  
  
  comoLlegar(sitio){
    let destino = sitio.sitio.lat+', '+sitio.sitio.lng;
    this.launchNavigator.navigate(destino)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator to ' + sitio.sitio.lat + ',' + sitio.sitio.lng, error)
    );   
  }  
}
