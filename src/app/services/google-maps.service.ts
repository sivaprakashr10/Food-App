import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
// import { promise } from 'selenium-webdriver';
// import { Script } from 'vm';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  constructor() {}

  loadGoogleMaps(): Promise<any> {
    const win = window as any;
    const gModule = win.google;
    if (gModule && gModule.maps) {
      return Promise.resolve(gModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        environment.googleMapsApiKey +
        '&libraries-places';

      // script.src = 'https://maps.googleapis.com/maps/api/js';

      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadGoogleModule = win.google;
        if (loadGoogleModule && loadGoogleModule.maps) {
          resolve(loadGoogleModule.maps);
        } else {
          reject('Google Map SDK is not Available');
        }
      };
    });
  }
}
