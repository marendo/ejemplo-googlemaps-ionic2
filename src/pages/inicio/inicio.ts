import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

import { NuevoSitio } from '../nuevo-sitio/nuevo-sitio';

declare var google;

/**
 * Generated class for the Inicio page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class Inicio {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  coords : any = { lat: 0, lng: 0 }

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController, public  platform: Platform, private geolocation: Geolocation) {
  
    platform.ready().then(() => {    
      // La plataforma esta lista y ya tenemos acceso a los plugins.
//      this.cargarMapa();
		this.obtenerPosicion();
    });
  
  }
  
  cargarMapa(){

    let locationOptions = {timeout: 10000, enableHighAccuracy: true};
  
 	navigator.geolocation.getCurrentPosition((position) => {

		let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

//  	let latLng = new google.maps.LatLng(40.4503588, -3.624762);
  	  
		let mapOptions = {
			center: latLng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
 
		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    }, locationOptions);
  }  

  loadMap(){
   let mapContainer = document.getElementById('map');
    this.map = new google.maps.Map(mapContainer, {
      center: this.coords,
      zoom: 12
    });
	
  // Colocamos el marcador
  let miMarker = new google.maps.Marker({
              icon : 'assets/img/ico_estoy_aqui.png',
              map: this.map,
              position: this.coords
          });  	
  }  
  
  obtenerPosicion():any{
   
    this.geolocation.getCurrentPosition().then(res => {
      this.coords.lat = res.coords.latitude;
      this.coords.lng = res.coords.longitude;
      this.loadMap();
    })
    .catch(
      (error)=>{
        console.log(error);
      }
    );
  }  

  nuevoSitio(){
	// aquí vamos a abrir el modal para añadir nuestro sitio.
	let mimodal = this.modalCtrl.create( NuevoSitio,this.coords );
    mimodal.present();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Inicio');
  }
  
}
