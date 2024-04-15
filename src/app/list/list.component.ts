import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import { RickandmortyService } from '../services/rickandmorty/rickandmorty.service';
import { TypeCharacter } from '../interfaces/character.interface'
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatInputModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.less'
})
export class ListComponent implements OnInit {
  searchQueryControl = new FormControl('', Validators.minLength(3)) as FormControl<string>;
  searchQuery = '';
  filteredCharacters: TypeCharacter[] = [];
  constructor(
    private rickandmortyService: RickandmortyService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getCharacters(1);
    this.searchQueryControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((value) => {
      console.log("Aqui o valor", value);
      this.searchCharacters();
    });
  }

  page = 1;
  listCharacters: TypeCharacter[] = [];

  getCharacters(page: number) {
    console.log('Obtendo personagens da página', page);
    const res = this.rickandmortyService.getListCharacters(page);
    res.subscribe({
      next: (res) => {
        const data = res.results;
        console.log('Data:', data); 
        this.listCharacters = this.listCharacters.concat(data); // Concatenar os novos personagens aos personagens existentes
        this.filteredCharacters = this.listCharacters; // Atualizar os personagens filtrados com todos os personagens
        this.page = page;
  
        // Se ainda houver mais páginas de personagens, faça outra chamada recursiva
        if (res.info.next) {
          const nextPage = page + 1;
          this.getCharacters(nextPage);
        }
      },
      error: (e) => console.log(e),
    });
  }
  
  detailCharacter(id: number) {
    this.route.navigate([`/rickandmorty/detail-character/${id}`]);
  }

  searchCharacters() {
    console.log('Buscando personagens...');
    const query = this.searchQueryControl.value.trim().toLowerCase();
    console.log('Query:', query);
    this.filteredCharacters = this.listCharacters.filter(character =>
      character.name.toLowerCase().includes(query)
    );
    console.log('Personagens filtrados:', this.filteredCharacters);
  }
  
}


