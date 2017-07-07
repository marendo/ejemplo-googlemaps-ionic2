import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'; 

import { MyApp } from './app.component';

import { MisTabs } from '../pages/mis-tabs/mis-tabs';
import { Inicio } from '../pages/inicio/inicio';
import { Listado } from '../pages/listado/listado';
import { Info } from '../pages/info/info';
import { NuevoSitio } from '../pages/nuevo-sitio/nuevo-sitio';
import { Basedatos } from '../providers/basedatos';
import { IpService } from '../providers/ip-service';

// AF2 Settings
export const firebaseConfig = {
	apiKey: "AIzaSyAs5t_Orvum8TqCica-8tqdnDzMpVbCN2c",
    authDomain: "marendo-66b34.firebaseapp.com",
    databaseURL: "https://marendo-66b34.firebaseio.com",
    projectId: "marendo-66b34",
    storageBucket: "",
    messagingSenderId: "289456847584"
};

@NgModule({
  declarations: [
    MyApp,
    MisTabs,
    Inicio,
    Listado,
    Info,
	NuevoSitio
  ],
  imports: [
    BrowserModule,
	HttpModule,
    IonicModule.forRoot(MyApp),
	AngularFireModule.initializeApp(firebaseConfig),
	AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MisTabs,
    Inicio,
    Listado,
    Info,
	NuevoSitio
  ],
  providers: [
    StatusBar,
    SplashScreen,
	Geolocation,
	LaunchNavigator,
	Basedatos,
	IpService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
