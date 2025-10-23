# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
export default defineConfig([
  globalIgnores(['dist']),
  {
    # Pokedex - Proyecto (React + TypeScript + Vite)

    Este repositorio contiene una pequeña aplicación de tipo Pokédex construida con React para Tita Media, TypeScript y Vite. La app permite listar Pokémons, ver su detalle y marcar favoritos. Incluye una capa de servicios para consultar la API pública de PokéAPI, utilidades de filtrado/ordenación y un store ligero (Zustand) para gestionar favoritos.

    Índice
    1. Descripción
    2. Requisitos
    3. Instalación y ejecución
    4. Scripts disponibles
    5. Estructura del proyecto
    6. Arquitectura y decisiones clave
    7. Servicios y utilidades
    8. Store de favoritos
    9. Estilos y convenciones
    10. Errores comunes y solución
    11. Siguientes mejoras (recomendadas)

    ---

    1) Descripción
    ----------------
    La aplicación muestra un listado de Pokémons obtenido desde la API pública (https://pokeapi.co). Para cada Pokémon se muestran imagen, nombre e id; se puede acceder a una página de detalle con información ampliada (tipos, estadísticas, descripción). Los usuarios pueden marcar/desmarcar Pokémons como favoritos; estos se persisten en localStorage mediante zustand/persist.

    2) Requisitos
    ----------------
    - Node.js v16+ (recomendado) o la versión que tengas instalada localmente
    - npm o yarn
    - Conexión a Internet para consumir la API de PokéAPI

    3) Instalación y ejecución
    ---------------------------
    Clona el repositorio y ejecuta los comandos:

    ```pwsh
    # instalar dependencias
    npm install

    # ejecutar en modo desarrollo (Vite)
    npm run dev

    # construir para producción
    npm run build

    # vista previa del build
    npm run preview
    ```

    Notas:
    - Si usas PowerShell en Windows (pwsh), los comandos funcionan igual que en otros shells.
    - El comando `build` ejecuta primero `tsc -b` (compilación de TypeScript por proyecto) y luego `vite build`.

    4) Scripts disponibles (package.json)
    -----------------------------------
    - npm run dev — inicia el servidor de desarrollo (Vite) con hot reload.
    - npm run build — compila TypeScript y construye la app para producción.
    - npm run preview — sirve el build generado en modo preview.
    - npm run lint — ejecuta ESLint configurado en el proyecto.

    5) Estructura del proyecto
    ---------------------------
    Estructura principal (carpeta `src`):

    - src/
      - api/ — servicios para consultar la API (fetch, transformaciones)
        - pokemon.services.ts — funciones: getPokemons, getPokemonById, transformPokemonData, load (helper)
      - components/ — componentes React reutilizables
        - PokemonList.tsx — lista principal (usa servicios y utilidades)
        - PokemonDetail.tsx — detalle de un Pokémon (usa getPokemonById + transform)
        - SearchBar.tsx — barra de búsqueda
        - PokemonCard.tsx — tarjeta de Pokémon en la lista
        - LoadMoreButton.tsx — botón «Cargar más» para paginación
        - FavoriteButton.tsx — botón para añadir/remover favoritos (usa zustand)
        - ...otros componentes UI
      - styles/ — archivos CSS (App.css, PokemonCard.css, PokemonDetail.css, etc.)
      - store/ — Zustand store para favoritos (favoritesStore.ts)
      - utils/ — utilidades (filtrado, orden, validaciones)
      - data/ — archivos de datos locales / sample (samplePokemon.ts)
      - types/ — definiciones TypeScript compartidas (types.ts)
      - main.tsx — entrada de la app
      - App.tsx — rutas y configuración de Router

    6) Arquitectura y decisiones clave
    ----------------------------------
    - Separación de preocupaciones: la lógica de red y transformación de datos está en `src/api/pokemon.services.ts`. Esto facilita probar y reutilizar la lógica fuera de los componentes.
    - Estado local y UI: los componentes consumen funciones de servicio que aceptan setters o devuelven objetos; se priorizó simplicidad y separación sobre frameworks de datos más avanzados (p. ej. react-query).
    - Persistencia de favoritos: `zustand` con middleware `persist` guarda los favoritos en localStorage bajo la clave `pokemon-favorites`.
    - Tipos: todos los datos importantes usan tipos TypeScript en `src/types/types.ts` para facilidad de mantenimiento.

    7) Servicios y utilidades
    -------------------------
    - `getPokemons(offset, limit)`: consulta la lista paginada desde PokeAPI.
    - `getPokemonById(id)`: obtiene datos completos de un Pokémon por id.
    - `transformPokemonData(pokemon)`: normaliza la respuesta de la API a la interfaz interna `Pokemon` (incluye extracción de artwork, tipos, stats y descripción desde species).
    - `fetchPokemonsWithArtwork(offset, limit)`: método de conveniencia que combina lista + detalles y retorna items con `id`, `name`, `image`.
    - `load(options)`: helper usado por `PokemonList` para hacer la carga inicial con setters y manejo de mountedRef (evita updates en componentes desmontados).

    8) Store de favoritos
    ----------------------
    Archivo: `src/store/favoritesStore.ts`.

    - API pública:
      - `favorites`: Pokemon[]
      - `addToFavorites(pokemon)` — agrega (evita duplicados)
      - `removeFromFavorites(pokemonId)` — remueve por id
      - `isFavorite(pokemonId)` — boolean
      - `clearFavorites()`
      - `getFavoritesCount()`

    Los cambios se sincronizan automáticamente con localStorage (middleware `persist`).

    9) Estilos y convenciones
    -------------------------
    - Los estilos se encuentran en `src/styles` y son CSS simples (globales por componente).
    - Convención de nombres: archivos CSS con el mismo nombre que el componente (por ejemplo `PokemonDetail.css`).
    - Para ajustes rápidos de UI, editar directamente los CSS en `src/styles`.

    10) Errores comunes y solución
    -----------------------------
    - Error "Failed to resolve import './index.css'": ocurre si el import apunta a `./index.css` y los archivos fueron movidos a `src/styles/index.css`. Solución: abrir `src/main.tsx` y usar `import './styles/index.css'`.
    - Problemas de tipos TypeScript: ejecutar `./node_modules/.bin/tsc --noEmit` y corregir errores; para dev se usa `npm run dev`.

    11) Siguientes mejoras recomendadas
    ----------------------------------
    - Integrar caching y gestión de estado de red con `react-query` o `SWR` para simplificar revalidación, retries y caché.
    - Añadir tests unitarios y de integración (Jest + React Testing Library).
    - Extraer componentes presentacionales a un sistema de diseño y usar CSS modules / Tailwind para escalabilidad.
    - Mejorar accesibilidad (a11y): roles, labels, teclado, contrastes.

    Contacto y licencias
    ---------------------
    Si este proyecto forma parte de tu curso/práctica local, guárdalo y adáptalo a tus necesidades. No contiene dependencias propietarias.

    ---

    Si quieres, puedo:
    - añadir una sección de "Contribuir" (cómo hacer PRs y reglas de commits),
    - generar un CHANGELOG básico, o
    - crear un pequeño script de inicialización para configurar un entorno reproducible.

    Indica si quieres que lo haga y lo agrego al README.
````
