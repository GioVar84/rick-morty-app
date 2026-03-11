import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../../services/character';

@Component({
  standalone: true,
  selector: 'app-character-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './character-list.html',
  styleUrls: ['./character-list.css']
})
export class CharacterListComponent implements OnInit, AfterViewInit {
  characters: any[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;
  currentPage: number = 1;
  totalPages: number | null = null;
  lastResponse: any = null;
  searchName: string = '';
  searchStatus: string = '';

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    console.log('CharacterListComponent initialized (ngOnInit)');
  }

  ngAfterViewInit(): void {
    // Ensure view is initialized before loading data so bindings/providers are ready
    console.log('CharacterListComponent view initialized (ngAfterViewInit) - loading data');
    this.searchName = '';
    this.searchStatus = '';
    this.currentPage = 1;
    this.loadData(true);
  }

  loadData(reset: boolean = true) {
    if (reset) {
      this.currentPage = 1;
      this.characters = [];
      this.totalPages = null;
    }

    this.loading = true;
    this.errorMessage = null;
    console.log('Loading characters', { name: this.searchName, status: this.searchStatus, page: this.currentPage });

    this.characterService.getCharacters(this.searchName, this.searchStatus, this.currentPage).subscribe({
      next: (data) => {
        console.log('Received data', data);
        this.lastResponse = data;
        const results = data.results || [];
        if (reset) {
          this.characters = results;
        } else {
          this.characters = [...this.characters, ...results];
        }
        this.totalPages = data.info?.pages ?? null;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading characters', err);
        this.lastResponse = err;
        if (reset) { this.characters = []; }
        this.errorMessage = 'Error al cargar personajes. Revisa la consola o intenta recargar.';
        this.loading = false;
      }
    });
  }

  loadMore() {
    if (this.totalPages && this.currentPage >= this.totalPages) return;
    this.currentPage += 1;
    this.loadData(false);
  }

  onFilterChange() {
    this.loadData(true);
  }
}
