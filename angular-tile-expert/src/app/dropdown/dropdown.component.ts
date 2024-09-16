import { Component } from '@angular/core';
import { NgClass, NgFor,NgIf } from '@angular/common';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [NgFor,NgIf,NgClass,FiltersComponent]
})
export class DropdownComponent {
  items = ['закрепить теги', 'кнопка', 'приложение', 'форма', 'текстовое поле', 'выпадающий список'];
}
