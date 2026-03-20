import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AppLanguage = 'pt-BR' | 'en-US';

type TranslationDictionary = Record<string, string>;

const TRANSLATIONS: Record<AppLanguage, TranslationDictionary> = {
  'pt-BR': {
    'app.title': 'Personagens Rick & Morty',
    'nav.home': 'Início',
    'nav.favorites': 'Favoritos',
    'search.label': 'Buscar personagem por nome',
    'search.placeholder': 'Ex: Rick Sanchez',
    'search.hint': 'A busca chama a API em tempo real.',
    'search.empty': 'Nenhum personagem encontrado para este nome.',
    'search.error': 'Ocorreu um erro ao buscar personagens. Tente novamente.',
    'search.favorite.add': 'Adicionar aos favoritos',
    'search.favorite.remove': 'Remover dos favoritos',
    'search.results': 'Resultados',
    'search.gender': 'Gênero',
    'search.status': 'Status',
    'details.back': 'Voltar para busca',
    'details.open': 'Ver detalhes',
    'details.error': 'Não foi possível carregar os dados do personagem.',
    'details.species': 'Espécie',
    'details.type': 'Tipo',
    'details.origin': 'Origem',
    'details.location': 'Localização',
    'details.created': 'Criado em',
    'details.episodes': 'Episódios',
    'details.airDate': 'Exibido em',
    'favorites.title': 'Meus favoritos',
    'favorites.empty': 'Você ainda não adicionou personagens favoritos.',
    'favorites.remove': 'Remover',
    'footer.rights': 'Projeto de desafio técnico com Angular + RxJS'
  },
  'en-US': {
    'app.title': 'Rick & Morty Characters',
    'nav.home': 'Home',
    'nav.favorites': 'Favorites',
    'search.label': 'Search character by name',
    'search.placeholder': 'Example: Rick Sanchez',
    'search.hint': 'Search performs API requests in real time.',
    'search.empty': 'No character found for this name.',
    'search.error': 'An error occurred while searching. Please try again.',
    'search.favorite.add': 'Add to favorites',
    'search.favorite.remove': 'Remove from favorites',
    'search.results': 'Results',
    'search.gender': 'Gender',
    'search.status': 'Status',
    'details.back': 'Back to search',
    'details.open': 'View details',
    'details.error': 'Could not load character data.',
    'details.species': 'Species',
    'details.type': 'Type',
    'details.origin': 'Origin',
    'details.location': 'Location',
    'details.created': 'Created at',
    'details.episodes': 'Episodes',
    'details.airDate': 'Aired on',
    'favorites.title': 'My favorites',
    'favorites.empty': 'You have not added favorite characters yet.',
    'favorites.remove': 'Remove',
    'footer.rights': 'Technical challenge project with Angular + RxJS'
  }
};

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly languageKey = 'rm-language';
  private readonly languageSubject = new BehaviorSubject<AppLanguage>(this.getInitialLanguage());

  readonly language$ = this.languageSubject.asObservable();

  setLanguage(language: AppLanguage): void {
    this.languageSubject.next(language);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.languageKey, language);
    }
  }

  getLanguage(): AppLanguage {
    return this.languageSubject.value;
  }

  translate(key: string): string {
    const current = TRANSLATIONS[this.languageSubject.value];
    return current[key] ?? key;
  }

  private getInitialLanguage(): AppLanguage {
    if (typeof localStorage === 'undefined') {
      return 'pt-BR';
    }

    const stored = localStorage.getItem(this.languageKey);
    return stored === 'en-US' ? 'en-US' : 'pt-BR';
  }
}
