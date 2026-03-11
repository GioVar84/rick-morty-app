import { Component, signal } from '@angular/core';
import { CharacterListComponent } from './components/character-list/character-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CharacterListComponent],
  template: '<app-character-list></app-character-list>',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('rick-and-morty-app');
}
