# Verdantora · Landing page Astro

Landing page française de Verdantora, construite avec Astro 6. Les sections se trouvent dans `src/components/` et sont assemblées dans `src/pages/index.astro`. Les photos et les polices sont conservées dans `src/assets/`.

## Développement

Avec Node.js 24.22.3 et pnpm 11.25.0, lancer à la racine du projet :

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Compilation

```sh
pnpm build
pnpm preview
```

La compilation produit `dist/index.html`. Ce fichier s’ouvre directement dans un navigateur, même hors ligne. Les images, polices, styles et interactions y sont intégrés. Pour un hébergement statique, publier le contenu de `dist/`.

## Formulaires

Les demandes de devis s’ouvrent dans la messagerie du visiteur. La newsletter est une démonstration locale et ne transmet aucune adresse.
