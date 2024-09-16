import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {

  constructor() {}

  isMobile(): boolean {
    return window.innerWidth <= 414;
  }
}
