import { Component, ElementRef, ViewChild } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [DropdownComponent],
})
export class SearchBarComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  private overlayRef!: OverlayRef;
  isOverlayVisible: boolean = true;

  constructor(private overlay: Overlay) {}

  openDropdown() {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.searchInput)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: 4,
      }]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    const dropdownPortal = new ComponentPortal(DropdownComponent);
    this.overlayRef.attach(dropdownPortal);

    this.overlayRef.backdropClick().subscribe(() => this.closeDropdown());
  }

  closeDropdown() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.isOverlayVisible = false;
    }
  }
}
