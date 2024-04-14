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
  constructor(
    private rickandmortyService: RickandmortyService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getCharacters(1);
  }

  page = 1;
  listCharacters: TypeCharacter[] = [];

  getCharacters(page: number) {
    const res = this.rickandmortyService.getListCharacters(page);
    res.subscribe({
      next: (res) => {
        const data = res.results;
        this.listCharacters = data;
        this.page = page;
      },
      error: (e) => console.log(e),
    });
  }
  
  detailCharacter(id: number) {
    this.route.navigate([`/rickandmorty/detail-character/${id}`]);
  }

  searchCharacters() {
    if (this.searchQueryControl.value.trim() === '') {
      this.getCharacters(1);
      return;
    }
  
    const query = this.searchQueryControl.value;
    const res = this.rickandmortyService.searchCharacters(query);
    res.subscribe(
      (resData: TypeCharacter[]) => {
        this.listCharacters = resData;
      },
      (error) => console.log(error),
      () => {}
    );
  }
}


