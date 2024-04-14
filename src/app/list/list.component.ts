import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';

import { RickandmortyService } from '../services/rickandmorty/rickandmorty.service';

import { TypeCharacter } from '../interfaces/character.interface'

import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatInputModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.less'
})
export class ListComponent implements OnInit {
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
}
