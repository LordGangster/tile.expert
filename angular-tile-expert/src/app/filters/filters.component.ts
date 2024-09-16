import { Component } from '@angular/core';
import { NgClass, NgFor,NgIf } from '@angular/common';
import { DeviceDetectorService } from '../services/device-detector.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  imports: [NgFor,NgIf,NgClass]
})
export class FiltersComponent {
  constructor(private deviceDetectorService: DeviceDetectorService) {}
  isMobileDevice: boolean = false;
  filters = {
    participant: false,
    strictSearch: false,
    inHeadings: false,
    tags: false,
    requests: false,
    contacts: false
  };

  ngOnInit(): void {
    this.isMobileDevice = this.deviceDetectorService.isMobile();
    console.log(`Мобильное устройство: ${this.isMobileDevice}`);
  }

  toggleFilter(filter: keyof typeof this.filters) {
    this.filters[filter] = !this.filters[filter];
  }
}
