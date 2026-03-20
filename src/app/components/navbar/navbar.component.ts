import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { AppLanguage, I18nService } from '../../services/i18n/i18n.service';
import { TranslatePipe } from '../../pipes/t.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    TranslatePipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.less'
})
export class NavbarComponent {
  readonly favoritesCount$ = this.favoritesService.favoritesCount$;

  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly i18nService: I18nService
  ) {}

  get currentLanguage(): AppLanguage {
    return this.i18nService.getLanguage();
  }

  setLanguage(language: AppLanguage): void {
    this.i18nService.setLanguage(language);
  }
}
