import { NgFor, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { IconsComponent } from '../icons-component/icons/icons.component';
import { FiltersComponent } from '../filters/filters.component';
import { OverlayRef } from '@angular/cdk/overlay';
import { OVERLAY_REF_TOKEN } from '../app.component';

@Component({
  selector: 'app-mobile-search',
  standalone: true,
  imports: [NgFor,NgIf,FiltersComponent,IconsComponent],
  templateUrl: './mobile-search.component.html',
  styleUrl: './mobile-search.component.scss'
})
export class MobileSearchComponent {
  constructor(@Inject(OVERLAY_REF_TOKEN) private overlayRef: OverlayRef) { }

  close() {
    this.overlayRef.dispose(); // Закрываем оверлей
  }
}
