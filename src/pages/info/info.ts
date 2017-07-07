import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { IpService } from '../../providers/ip-service';

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
  providers: [IpService]
})
export class Info {

  myIP:   string = "0.0.0.0";
  wifiIP: string = "0.0.0.0";
  cellIP: string = "0.0.0.0";

  constructor(public navCtrl: NavController, private ngZone: NgZone, public ipService: IpService) {
	this.refreshIP();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Info');
  }

  refreshIP() {
		console.log('refreshIP clicked');
		
		this.ipService.getIP()
			.then(data1 => {
			console.log('ipService ip', data1);
//			this.ngZone.run(() => {
//				this.myIP = data1.ip;
//			});	
		});
		
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
