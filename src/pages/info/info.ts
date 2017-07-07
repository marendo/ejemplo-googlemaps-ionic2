import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

declare const networkinterface;

/**
 * Generated class for the Info page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class Info {

  wifiIP: string = "0.0.0.0";
  cellIP: string = "0.0.0.0";

  constructor(public navCtrl: NavController, private ngZone: NgZone) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Info');
  }

  refreshIP() {
		console.log('refreshIP clicked');
		try {
			networkinterface.getWiFiIPAddress((ip) => {
				console.log('getWiFiIPAddress ip', ip);
				this.ngZone.run(() => {
					this.wifiIP = ip;
				});
			});

			networkinterface.getCarrierIPAddress((ip) => { 
				console.log('getCarrierIPAddress ip', ip);
				this.ngZone.run(() => {
					this.cellIP = ip;
				});
			});		
		} catch (e) {
			console.error(e);
			this.wifiIP = e;
		}

	}  
}
