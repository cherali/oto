# Table
Show table with data virtualization.


## Build with
- Next.js
- React.js
- Tailwind CSS
- Shadcn
- Tanstack table
- Recharts
- Typescript

## Notes
- For simplicity the simplest solution was used (components, folder structure), also the config is minimal and not production ready.
- Typescript, eslint, prettier, and nextjs config not optimized for production level.
- Used shadcn and tailwindcss for styling, shadcn table uses tanstack table which is a great library and offers a lot of features, but for simplicity the configuration limited to the project requirements (no fancy config, no virtual rows, and...).
- The pagination is local and handled by tanstack table.
- About the cache, there is 3 kind of caching:
    - page cache that handles automatically by nextjs
    - request cache, caches the fetch response for `5` minutes
    - image cache that Next.js offers when using `next/image` component. <br>

    ***all the caches will not work on the preview link (this app available on vercel, but vercel free plan will ignore the cache).***
- If `SEO` important, it's better to use HTML5 semantics instead of div.
- Tests not included, because this is a small app and only the `fetchApi` can be unit tested, it's better to use `react-testing-library` for component testing, but due time limitation, tests not included.


## Preview
This app is available on vercel for testing. [visit](https://oto-nine.vercel.app/)

## Install Packages
npm:
```bash
npm i
```

pnpm:
```bash
pnpm i
```

## Run - Development
npm:
```bash
npm run dev
```

pnpm:
```bash
pnpm dev
```

## Run - Production
npm:
```bash
npm run build
```
then run:
```bash
npm run start
```

<hr />

pnpm:
```bash
pnpm build
```
then run:
```bash
pnpm start
```