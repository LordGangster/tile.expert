import { Component, ElementRef, InjectionToken, Injector, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconsComponent } from './icons-component/icons/icons.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { NgIf, NgClass } from '@angular/common';
import { DeviceDetectorService } from './services/device-detector.service';
import { MobileSearchComponent } from './mobile-search/mobile-search.component';

export const OVERLAY_REF_TOKEN = new InjectionToken<OverlayRef>('OverlayRef');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,IconsComponent,SearchBarComponent,MobileSearchComponent, NgIf,NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('searchIcon') searchIcon!: ElementRef;

  private overlayRef!: OverlayRef;

  title = 'angular-tile-expert';
  isSearchBarVisible = false;
  isMobileDevice: boolean = false;
  isSidebarOpen = false;

  constructor(private overlay: Overlay, private injector: Injector, private deviceDetectorService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isMobileDevice = this.deviceDetectorService.isMobile();
    console.log(`Мобильное устройство: ${this.isMobileDevice}`);
  }

  toggleSearchBar() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  openSearchBar() {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.searchIcon)
      .withPositions([{
        originX: 'start',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
        offsetX: -680,
      }]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    const dropdownPortal = new ComponentPortal(SearchBarComponent);
    this.overlayRef.attach(dropdownPortal);

    this.overlayRef.backdropClick().subscribe(() => this.closeSearchBar());
  }

  closeSearchBar() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  openMobileSearch() {
    const positionStrategy = this.overlay.position().global();
  
    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop', 
      scrollStrategy: this.overlay.scrollStrategies.block() 
    });

    const injector = Injector.create({
      providers: [
        { provide: OVERLAY_REF_TOKEN, useValue: this.overlayRef }
      ],
      parent: this.injector
    });
  
    const dropdownPortal = new ComponentPortal(MobileSearchComponent, null, injector);
    this.overlayRef.attach(dropdownPortal);
  
    this.overlayRef.backdropClick().subscribe(() => this.closeSearchBar());
  }
  

  closeMobileSearch() {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

}


