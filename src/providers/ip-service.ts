import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the IpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IpService {
  data1: any;
  constructor(public http: Http) {
    console.log('Hello IpService Provider');
  }

  getIP() {
  if (this.data1) {
    // already loaded data
    return Promise.resolve(this.data1);
  }

  // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.get('https://api.ipify.org?format=json')
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data1 = data.results;
        resolve(this.data1);
      });
  });
}

}
