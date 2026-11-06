<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# FIT.AI — Frontend

## Projeto

Frontend do FIT.AI (app de treino): Next.js 16.4.2 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui (estilo `base-nova`, Base UI — não Radix), pnpm fixado em `packageManager`. Backend é o repositório irmão `../fitApp-backend`, com OpenAPI em `${NEXT_PUBLIC_API_URL}/swagger.json`. Autenticação via Better Auth: `authClient` de `app/_lib/auth-client.ts` aponta para a API.

## Comandos

```bash
pnpm dev        # dev server na porta 4000 (não 3000)
pnpm build      # next build
pnpm lint       # eslint
npx orval       # regenera o cliente da API (requer o backend rodando para servir /swagger.json)
```

Não há testes. NUNCA rode `pnpm run dev` para verificar se as mudanças funcionam.

## Layout

- `app/` — rotas (App Router); `app/_lib/` — `fetch.ts` (mutator `customFetch`), `auth-client.ts`, `api/fetch-generated/` (saída do Orval, NÃO editar à mão)
- `components/` — componentes da aplicação; `components/ui/` — componentes shadcn/ui
- `lib/utils.ts` — `cn`
- `.claude/rules/` — regras originais em PT-BR (fonte destas convenções); detalhes de formulários/mutations em `.claude/rules/api.md`
- `public/` — imagens e banners

## Convenções

- Sem comentários no código; kebab-case em arquivos e pastas; um componente por arquivo; SOLID/DRY; datas sempre com `dayjs`.
- UI: prefira shadcn/ui; botões sempre com `<Button />` de `@/components/ui/button`, nunca `<button>` nativo; imagens sempre com `next/image`.
- Cores: nunca hard-code (`text-white`, `bg-[#...]`); use tokens do tema de `app/globals.css` (`bg-primary`, `text-foreground`, `border-border`...). Se faltar cor, crie variável nova em `app/globals.css` seguindo o padrão existente.
- Formulários: React Hook Form + Zod (ainda não instalados) e o componente `Form` do shadcn.
- Auth: NUNCA use middleware; verifique a sessão na própria página. Em Server Components: `authClient.getSession({ fetchOptions: { headers: await headers() } })`; em Client Components: `authClient.useSession()`. Sem sessão → `redirect("/auth")`; em `/auth` com sessão → `redirect("/")`.
- `authClient` nunca em try/catch: faça destructuring de `{ error }` e trate.
- Dados: priorize fetch em Server Components; evite transformar páginas inteiras em Client Components. Server: use as funções de `app/_lib/api/fetch-generated/index.ts`. Client: hooks do TanStack Query gerados pelo Orval (config `rc` comentada em `orval.config.ts`; TanStack Query ainda não instalado) com `initialData` vindo do server.
- Mutations: use a variação síncrona e trate sucesso/erro em `onSuccess`/`onError` (exemplo em `.claude/rules/api.md`).
- Se faltar uma função da API, rode `npx orval`; se ainda faltar depois disso, INTERROMPA e avise o usuário.

## Gotchas

- `cacheComponents: true` + `partialPrefetching` no `next.config.ts`: conteúdo async/dinâmico precisa de boundary `<Suspense>` — use `app/page.tsx` como modelo (componente interno async + fallback).
- Este Next (16.4.2) tem breaking changes vs. versões mais antigas: consulte `node_modules/next/dist/docs/` antes de escrever código.
- `customFetch` (em `app/_lib/fetch.ts`) repassa os cookies do browser para a API via `next/headers` — chamadas server-side autenticam por cookie.
- Env (`.env`): `NEXT_PUBLIC_API_URL` (API) e `NEXT_PUBLIC_BASE_URL` (este app).
