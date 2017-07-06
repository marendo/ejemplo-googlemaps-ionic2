import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Basedatos } from '../../providers/basedatos';

declare var google;

/**
 * Generated class for the NuevoSitio page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nuevo-sitio',
  templateUrl: 'nuevo-sitio.html',
  providers: [ Camera ]
})
export class NuevoSitio {

  coords : any = { lat: 0, lng: 0 }
  address: string;
  description: string = '';
  foto: string = null;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl : ViewController, private camera: Camera, public db: Basedatos) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoSitio');
    this.coords.lat = this.navParams.get('lat');
    this.coords.lng = this.navParams.get('lng');
	
	this.getAddress(this.coords).then(results=> {
        this.address = results[0]['formatted_address'];
      }, errStatus => {
          // Aquí iría el código para manejar el error
    });	
  }

  cerrarModal(){ 
    this.viewCtrl.dismiss();
  }  

  getAddress(coords):any {
    var geocoder = new google.maps.Geocoder();

    return new Promise(function(resolve, reject) {
        geocoder.geocode({'location': coords} , function (results, status) { // llamado asincronamente
            if (status == google.maps.GeocoderStatus.OK) {
                resolve(results);
            } else {
                reject(status);
            }
        });
    });
  }

  sacarFoto(){
    let options: CameraOptions = {
        quality: 50,
//      encodingType: this.camera.EncodingType.JPEG, 
        targetWidth: 800,
        targetHeight: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
//      sourceType: this.camera.PictureSourceType.CAMERA,
//      correctOrientation: true
    }

    this.camera.getPicture( options )
    .then(imageData => {
      this.foto = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
	  alert(error);
    });	
  }

  guardarSitio(){
    let sitio = {
      lat: this.coords.lat,
      lng: this.coords.lng , 
      address: this.address, 
      description: this.description, 
      foto: this.foto
    }
    this.db.addSitio(sitio).then((res)=>{
      this.cerrarModal();
     /*  alert('se ha introducido correctamente en la bd'); */
    },(err)=>{ /* alert('error al meter en la bd'+err) */ }) 
  }
  
}
