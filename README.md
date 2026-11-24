# ☕ Cafezinho

Plataforma para criadores receberem apoio do público por meio de links de pagamento/PIX — inspirada no mepagaumcafe.com.br, com visual mais leve e um fluxo de cadastro mais simples.

- **Página pública** `/:slug` com foto, bio, redes sociais e até 3 botões de pagamento.
- **Cadastro em 3 passos** com prévia ao vivo, endereço verificado em tempo real e valores prontos (R$ 5 / 10 / 15 / livre) que preenchem o texto do botão sozinhos.
- **Painel** para editar tudo e acompanhar visitas e cliques por botão.
- **Guia** de como gerar o link no Nubank, Mercado Pago, PagBank e outros bancos.

O dinheiro vai direto para a conta do criador: a plataforma não processa pagamentos.

## Arquitetura

```
cafezinho/
├── backend/   Node.js + Express + TypeScript — MVC
└── frontend/  Next.js (App Router) + React + Tailwind — MVVM
```

### Backend (MVC)

| Camada | Pasta | Responsabilidade |
| --- | --- | --- |
| Model | `src/models` | Acesso a dados (Prisma): `UserModel`, `PaymentLinkModel` |
| View | `src/views` | Serialização das respostas JSON (`CreatorView.public / private / session`) — nunca expõe senha |
| Controller | `src/controllers` | Regras de cada rota: `Auth`, `Profile`, `Creator`, `Upload` |
| Rotas / middlewares | `src/routes`, `src/middlewares` | Validação (Zod), JWT, upload (Multer), rate limit, erros |

Banco: Prisma + SQLite (troque `provider`/`DATABASE_URL` em `prisma/schema.prisma` para usar Postgres).

**Endpoints** (prefixo `/api`):

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/auth/register` | Cria conta + página + links |
| POST | `/auth/login` | Login, retorna JWT |
| GET / PUT | `/me` | Dados privados e edição do perfil (auth) |
| POST | `/uploads` | Upload de foto (até 2 MB) |
| GET | `/slugs/:slug/availability` | Verifica se o endereço está livre |
| GET | `/creators/:slug` | Página pública (conta visita) |
| POST | `/creators/:slug/links/:id/click` | Registra clique e retorna a URL |

### Frontend (MVVM)

| Camada | Pasta | Responsabilidade |
| --- | --- | --- |
| Model | `src/models` | Entidades, regras puras (`payment.ts`) e serviços HTTP (`services/`) |
| ViewModel | `src/viewmodels` | Hooks com estado e ações da tela: `useSignupViewModel`, `useDashboardViewModel`, `useLoginViewModel`, `usePublicProfileViewModel`, `useSlugAvailability`… |
| View | `src/views` | Componentes de UI sem regra de negócio (`components/`) e telas (`screens/`) |
| Rotas | `src/app` | Páginas do Next que apenas renderizam a View correspondente |

O Next faz proxy de `/api` e `/uploads` para o backend (`API_ORIGIN`, padrão `http://localhost:3333`), então front e API rodam na mesma origem.

## Rodando localmente

Requer Node.js 20+.

```bash
npm run setup      # instala dependências, cria o banco e um perfil demo
npm run dev:api    # http://localhost:3333
npm run dev:web    # http://localhost:3000
```

Perfil demo: http://localhost:3000/marina — login `demo@cafezinho.dev` / `cafezinho`.

Testes da API: `npm test`.
