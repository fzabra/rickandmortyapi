# Rick & Morty Favorites (Angular)

Aplicação para consulta e cadastro de personagens favoritos do seriado Rick & Morty, consumindo a API pública REST: https://rickandmortyapi.com/

## Protótipo (Obrigatório)
- Figma: `SUBSTITUIR_PELO_LINK_DO_FIGMA_UTILIZADO`

## Tecnologias
- Angular 17 (compatível com requisito Angular 16+)
- TypeScript
- RxJS
- Angular Material

## Funcionalidades implementadas
- Busca de personagens por nome com chamada real na API (sem filtro local).
- Exibição de informações mínimas: nome, gênero, status e imagem.
- Favoritos com estado global via `BehaviorSubject` (RxJS) + persistência no `localStorage`.
- Contador de favoritos no topo atualizado em tempo real.
- Página de favoritos com remoção de itens.
- Paginação com `MatPaginator`.
- Tratamento de personagem inexistente (mensagem de não encontrado).
- Internacionalização simples (`pt-BR` e `en-US`).
- Fonte personalizada via Google Fonts (`Creepster` e `Montserrat`).
- Rotas com lazy loading (`/` e `/favorites`).
- Layout responsivo.

## Como rodar localmente
1. Instale dependências:
```bash
npm install
```
2. Rode em modo desenvolvimento:
```bash
npm start
```
3. Acesse:
- http://localhost:4200/

## Build de produção
```bash
npm run build
```

## Sugestão de deploy
- Pode ser publicado em Vercel, Netlify ou GitHub Pages.
- Para GitHub Pages (exemplo):
  1. Criar repositório público.
  2. Fazer push do projeto.
  3. Gerar build (`npm run build`).
  4. Publicar a pasta `dist/rickandmortyapi/browser`.

## Rotas
- `/` Busca e listagem paginada de personagens.
- `/favorites` Lista de personagens favoritados.
- `/character/:id` Página de detalhes completos de um personagem.
