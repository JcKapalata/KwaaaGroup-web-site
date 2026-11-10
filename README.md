# Kwaaa Web Site

Site vitrine public **Kwaaa Group** (Angular + Material + SCSS).

## Prérequis

- Node.js 20+ / npm
- Angular CLI 21 (`npm i -g @angular/cli`)

## Environnements (ne jamais committer)

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.development.example.ts src/environments/environment.development.ts
# Puis renseigner mailApiBaseUrl uniquement dans les copies locales (hors git).
```

- `*.example.ts` → versionnés (sans URL d’API de production)
- `environment.ts` / `environment.development.ts` → **hors git**
- Dev : API locale via `proxy.conf.json` + `site-mail-api` en local
- Prod : `mailApiBaseUrl` injecté au deploy (script local, hors git)

## Démarrage

```bash
npm install
npm start
```

App : `http://localhost:4200/`

## Build prod

Via `scripts/deploy-website.sh` (injecte l’env prod hors dépôt).

## Notes

- Le dossier `.claude/` (maquettes / notes internes) est **ignoré par Git**.
- Les dossiers outils (`.cursor`, `.trae`, etc.) ne doivent jamais être versionnés.
