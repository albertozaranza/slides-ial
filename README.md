# Gramática Histórico-Comparativa — Apresentação Web

Seminário interativo (22 slides) como aplicação web moderna:
**HTML5 + Tailwind CSS + JavaScript puro (Vanilla JS)**, com estrutura
data-driven — o conteúdo de cada slide vem de um arquivo de dados (`title` + `body`).

Identidade visual: **vintage acadêmico minimalista** (bege / marrom / dourado / preto),
com as fontes Cinzel (rótulos), Playfair Display (títulos) e Times New Roman (corpo).

## Como executar

**Basta abrir [`src/index.html`](src/index.html) no navegador** (duplo clique ou
arraste para uma aba). Não precisa de servidor nem de build — o conteúdo é
carregado de um arquivo `.js` e os scripts são clássicos, então funciona via
`file://`.

> Requer conexão à internet na primeira vez, pois o Tailwind e as fontes vêm de CDN.

## Navegação

| Ação | Como |
|------|------|
| Próximo slide | seta **→**, **Espaço**, **PageDown**, botão **›**, swipe ← |
| Slide anterior | seta **←**, **PageUp**, botão **‹**, swipe → |
| Primeiro / último | **Home** / **End** |
| Ir para um slide | clique nos **indicadores (dots)** no rodapé |
| Link direto | URL com hash, ex.: `index.html#slide-08` |

Há ainda **barra de progresso** no topo e **contador** "atual / total" no rodapé.

## Estrutura

```
src/
├── index.html              # Shell + tema Tailwind (CDN) + fontes
├── main.js                 # Deck: carrega o JSON, navegação, teclado, swipe, hash, a11y
├── styles/
│   └── app.css             # Único CSS customizado (keyframe de entrada + reduced-motion)
├── components/
│   ├── Slide.js            # Renderiza cada slide conforme o layout
│   ├── Controls.js         # Setas, barra de progresso, dots e contador
│   └── richText.js         # Converte o `body` (markdown leve) em HTML seguro
├── data/
│   └── slides.js           # ✏️  CONTEÚDO DA APRESENTAÇÃO (title + body)
└── assets/
    ├── backgrounds/        # Molduras, texturas e papéis
    ├── maps/               # Mapas (Europa / mundo)
    ├── manuscripts/        # Livros, bibliotecas, manuscritos
    ├── portraits/          # Retratos de linguistas
    └── diagrams/           # Árvores genealógicas, infográficos, periodização
```

## Editando o conteúdo

Todo o texto fica em [`src/data/slides.js`](src/data/slides.js) — mesmo formato de
um JSON, dentro de `window.PRESENTATION_DATA = { ... }`. Cada slide:

```js
{
  id: "slide-12",
  layout: "split",
  eyebrow: "Parte 3 · Famílias linguísticas",
  title: "Línguas Românicas",
  body: "**Exemplos:**\n\n- Português\n- Espanhol\n\n**Origem:** Latim vulgar",
  image: "assets/diagrams/illustration-latim.jpeg",
  background: "assets/backgrounds/paper-aged-landscape.jpeg",
}
```

- **Campos mínimos:** `title` e `body`. Os demais são opcionais.
- **`body`** aceita markdown leve: linha em branco separa parágrafos; linhas com
  `- ` viram lista (com um nível de aninhamento por indentação); linhas com `|`
  viram **tabela**; `**negrito**` e `*itálico*`.
- **`flow`**: array de etapas renderizadas como cadeia vertical com setas
  (ex.: `["Latim vulgar", "Galego-português", "Português moderno"]`).
- **`items`**: array `{image, caption}` para o layout `gallery`.
- **`layout`** define a composição visual (veja abaixo).

### Layouts disponíveis

| `layout` | Uso |
|----------|-----|
| `cover` | Capa centralizada (título grande + subtítulo) |
| `section` | Divisória de seção (frase em destaque) |
| `content` | Título + texto/listas/tabela, sem imagem |
| `split` | Texto + imagem lado a lado (empilha no mobile) |
| `profile` | Retrato + biografia (pessoa única) |
| `gallery` | Grade de retratos com legenda (campo `items`) |
| `diagram` | Diagrama/infográfico grande com legenda |
| `image` | Imagem em destaque com legenda |
| `flow` | Cadeia de etapas ligadas por setas (campo `flow`) |
| `quote` | Citação(ões) centralizada(s) em itálico |
| `closing` | Encerramento centralizado |

Para adicionar/remover slides, basta editar o array `slides` — a numeração,
os dots e o contador se ajustam automaticamente.

## Decisões e melhorias

- **Conteúdo separado da apresentação.** Todo texto vive em `data/slides.js`; o
  restante do JS só renderiza. Editar a apresentação não exige tocar em HTML/lógica.
- **Roda sem servidor.** Dados em `.js` e scripts clássicos (sem `fetch`/módulos ES),
  para abrir o `index.html` direto via `file://` — sem build nem servidor local.
- **Componentização.** Blocos repetidos (eyebrow, título, moldura de imagem, lista,
  tabela, fluxo) foram extraídos em funções reutilizáveis (`Slide.js`, `richText.js`),
  eliminando a duplicação que existiria com 22 `<section>` escritas à mão.
- **Tailwind sem CSS inline.** Toda a estilização usa classes utilitárias; o único
  CSS customizado (`app.css`) cobre apenas o keyframe de entrada e o
  `prefers-reduced-motion`, que o utilitário não resolve de forma declarativa.
- **Identidade visual vintage acadêmica.** Paleta bege/marrom/dourado/preto
  (`paper`/`brown`/`gold`) e as fontes Cinzel + Playfair Display + Times New Roman
  configuradas no tema do Tailwind; fundos de papel envelhecido com véu creme para
  legibilidade, e moldura dourada discreta em cada imagem.
- **Imagens locais.** Os links de imagem sugeridos (URLs externas temporárias) foram
  substituídos pelos assets locais equivalentes (árvores linguísticas, retratos de
  Bopp/Grimm/Rask, mapas, papéis vintage), garantindo que tudo funcione offline / `file://`.
- **Acessibilidade.** Navegação completa por teclado; `role="group"` +
  `aria-roledescription="slide"` por slide; região `aria-live` que anuncia o slide
  atual; link "pular para o conteúdo"; foco visível; respeito a `prefers-reduced-motion`.
- **Estrutura em 5 partes.** Os divisores "PARTE 1–5" do roteiro viram o *eyebrow* de
  cada slide, preservando a numeração 1–22 e a divisão entre os 6 integrantes.
- **Responsivo.** Layouts em grid que empilham no mobile; conteúdo centralizado e
  com largura máxima (`max-w-6xl`), preservando a proporção de uma apresentação.
- **Robustez.** Mensagem clara caso os dados não carreguem; imagens com
  `loading="lazy"`; texto dos dados é escapado antes de virar HTML (proteção contra
  injeção).
- **Assets organizados.** As 42 imagens originais (que eram recursos decorativos e de
  conteúdo, não slides prontos) foram renomeadas com nomes semânticos e separadas por
  categoria em `src/assets/`, todas referenciadas por caminhos relativos.

## Produção (opcional)

O Tailwind via Play CDN é ideal para desenvolvimento e para abrir rapidamente. Para
produção, recomenda-se gerar o CSS com a CLI do Tailwind (`tailwindcss -o app.css --minify`)
e substituir o `<script src="cdn.tailwindcss.com">`, mantendo o mesmo tema.
