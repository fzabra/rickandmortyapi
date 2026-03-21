# Rick & Morty Favorites (Angular)

A web app to search, browse, and save favorite Rick & Morty characters using the public REST API: https://rickandmortyapi.com/

## Tech Stack
- Angular 17
- TypeScript
- RxJS
- Angular Material

## Implemented Features
- Character search by name with real API requests (no front-end filtering).
- Minimum character info display: name, gender, status, and image.
- Favorites with global state using `BehaviorSubject` (RxJS) + `localStorage` persistence.
- Real-time favorites counter in the top bar.
- Favorites page with item removal.
- Pagination using `MatPaginator`.
- Not-found handling for non-existing characters.
- Basic internationalization (`pt-BR` and `en-US`).
- Custom Google Fonts (`Creepster` and `Montserrat`).
- Lazy-loaded routes (`/` and `/favorites`).
- Responsive layout.
- Character details page (`/character/:id`) with full character data.

## Run Locally
1. Install dependencies:
```bash
npm install
```
2. Start development server:
```bash
npm start
```
3. Open:
- http://localhost:4200/

## Production Build
```bash
npm run build
```
## Routes
- `/` Character search and paginated listing.
- `/favorites` Favorite characters list.
- `/character/:id` Full details page for a character.
