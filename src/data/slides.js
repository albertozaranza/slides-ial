/**
 * slides.js — CONTEÚDO DA APRESENTAÇÃO (title + body por slide)
 *
 * Mesmo formato de um JSON, atribuído a uma variável global para que a
 * apresentação funcione abrindo o index.html diretamente (file://), sem servidor.
 *
 * Campos: id, layout, eyebrow, title, body (markdown leve: parágrafos, listas
 * com aninhamento, tabelas com |, **negrito**), image, items (galeria),
 * flow (cadeia de etapas) e background.
 */
window.PRESENTATION_DATA = {
  meta: {
    title: "Gramática Histórico-Comparativa",
    subtitle: "Origem, evolução e relação entre as línguas",
    theme: "vintage",
  },
  slides: [
    // ───────────── CAPA ─────────────
    {
      id: "slide-01",
      layout: "cover",
      eyebrow: "Origem, evolução e relação entre as línguas",
      title: "Gramática Histórico-Comparativa",
      body:
        "**Integrantes:** Adna Souza, Ana Cibelly, Anna Letícia, Fernanda Souza, Jamille Ribeiro, Ruan Victor\n\n" +
        "**Professor:** Dr. Rafael Lira\n\n" +
        "**Disciplina:** Introdução à Linguística\n\n" +
        "**Data:** 2026",
      background: "assets/backgrounds/paper-ornate-border.jpeg",
    },

    // ───────────── PARTE 1 — INTRODUÇÃO ─────────────
    {
      id: "slide-02",
      layout: "content",
      eyebrow: "Parte 1 · Introdução",
      title: "O que é Gramática Histórico-Comparativa?",
      body:
        "- Área da Linguística Histórica\n" +
        "- Estuda a evolução das línguas\n" +
        "- Compara idiomas\n" +
        "- Busca origens comuns",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },
    {
      id: "slide-03",
      layout: "content",
      eyebrow: "Parte 1 · Introdução",
      title: "Objetivos da Gramática Histórico-Comparativa",
      body:
        "- Reconstruir línguas antigas\n" +
        "- Explicar mudanças linguísticas\n" +
        "- Identificar famílias linguísticas\n" +
        "- Entender a origem das palavras",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },

    // ───────────── PARTE 2 — COMO SURGIU ─────────────
    {
      id: "slide-04",
      layout: "split",
      eyebrow: "Parte 2 · Como surgiu",
      title: "Contexto Histórico",
      body:
        "- Século XIX\n" +
        "- Europa\n" +
        "- Interesse por línguas antigas\n" +
        "- Estudos orientais",
      image: "assets/maps/map-europe-vintage.jpeg",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },
    {
      id: "slide-05",
      layout: "content",
      eyebrow: "Parte 2 · Como surgiu",
      title: "A importância do sânscrito",
      body:
        "- Língua antiga da Índia\n" +
        "- Semelhanças com:\n" +
        "  - latim\n" +
        "  - grego\n" +
        "  - alemão\n\n" +
        "**Exemplo:**\n\n" +
        "| Sânscrito | Latim |\n" +
        "| --- | --- |\n" +
        "| matr | mater |",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },
    {
      id: "slide-06",
      layout: "content",
      eyebrow: "Parte 2 · Como surgiu",
      title: "Surgimento da Gramática Histórico-Comparativa",
      body:
        "- Comparação entre línguas\n" +
        "- Método comparativo\n" +
        "- Reconstrução linguística\n" +
        "- Origem comum das línguas",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },
    {
      id: "slide-07",
      layout: "content",
      eyebrow: "Parte 2 · Como surgiu",
      title: "Método Comparativo",
      body:
        "**Análise de:**\n\n" +
        "- sons\n" +
        "- palavras\n" +
        "- verbos\n" +
        "- gramática\n\n" +
        "**Exemplos:**\n\n" +
        "- nocte → noite\n" +
        "- lacte → leite",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },
    {
      id: "slide-08",
      layout: "gallery",
      eyebrow: "Parte 2 · Como surgiu",
      title: "Principais estudiosos",
      items: [
        { image: "assets/portraits/portrait-franz-bopp.jpeg", caption: "Franz Bopp" },
        { image: "assets/portraits/portrait-jacob-grimm.jpeg", caption: "Jacob Grimm" },
        { image: "assets/portraits/portrait-linguist-1.jpeg", caption: "Rasmus Rask" },
      ],
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },
    {
      id: "slide-09",
      layout: "split",
      eyebrow: "Parte 2 · Como surgiu",
      title: "Lei de Grimm",
      body:
        "**Exemplos:**\n\n" +
        "- pater → father\n" +
        "- piscis → fish\n\n" +
        "**Ideia principal:**\n\n" +
        "Mudanças linguísticas seguem padrões.",
      image: "assets/portraits/portrait-grimm-brothers.jpeg",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },

    // ───────────── PARTE 3 — FAMÍLIAS LINGUÍSTICAS ─────────────
    {
      id: "slide-10",
      layout: "section",
      eyebrow: "Parte 3 · Famílias linguísticas",
      title: "O que são famílias linguísticas?",
      body: "Grupo de línguas com origem comum.",
      background: "assets/backgrounds/paper-aged-square.jpeg",
    },
    {
      id: "slide-11",
      layout: "split",
      eyebrow: "Parte 3 · Famílias linguísticas",
      title: "Família Indo-Europeia",
      body:
        "**Ramos:**\n\n" +
        "- Românicas\n" +
        "- Germânicas\n" +
        "- Eslavas\n" +
        "- Indo-arianas",
      image: "assets/diagrams/tree-indo-european.jpeg",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },
    {
      id: "slide-12",
      layout: "split",
      eyebrow: "Parte 3 · Famílias linguísticas",
      title: "Línguas Românicas",
      body:
        "**Exemplos:**\n\n" +
        "- Português\n" +
        "- Espanhol\n" +
        "- Francês\n" +
        "- Italiano\n" +
        "- Romeno\n\n" +
        "**Origem:** Latim vulgar",
      image: "assets/diagrams/illustration-latim.jpeg",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },

    // ───────────── PARTE 4 — MUDANÇAS LINGUÍSTICAS ─────────────
    {
      id: "slide-13",
      layout: "content",
      eyebrow: "Parte 4 · Mudanças linguísticas",
      title: "Mudanças Linguísticas",
      body:
        "**Tipos:**\n\n" +
        "- Fonética\n" +
        "- Morfológica\n" +
        "- Semântica",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },
    {
      id: "slide-14",
      layout: "content",
      eyebrow: "Parte 4 · Mudanças linguísticas",
      title: "Mudanças Fonéticas",
      body:
        "**Exemplos:**\n\n" +
        "- nocte → noite\n" +
        "- pharmacia → farmácia",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },
    {
      id: "slide-15",
      layout: "flow",
      eyebrow: "Parte 4 · Mudanças linguísticas",
      title: "Mudanças Morfológicas",
      flow: ["Vossa Mercê", "Vosmecê", "Você"],
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },
    {
      id: "slide-16",
      layout: "content",
      eyebrow: "Parte 4 · Mudanças linguísticas",
      title: "Mudanças Semânticas",
      body:
        '**Exemplo:** "Rapariga"\n\n' +
        "- **Portugal:** moça\n" +
        "- **Brasil:** sentido pejorativo",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },

    // ───────────── PARTE 5 — IMPORTÂNCIA ─────────────
    {
      id: "slide-17",
      layout: "content",
      eyebrow: "Parte 5 · Importância",
      title: "Importância da Gramática Histórico-Comparativa",
      body:
        "- Origem das línguas\n" +
        "- História dos povos\n" +
        "- Estudos culturais\n" +
        "- Linguística moderna",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },
    {
      id: "slide-18",
      layout: "content",
      eyebrow: "Parte 5 · Importância",
      title: "Impactos da área",
      body:
        "**Influenciou:**\n\n" +
        "- Linguística\n" +
        "- Filologia\n" +
        "- Tradução\n" +
        "- Etimologia\n" +
        "- Ensino de línguas",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },
    {
      id: "slide-19",
      layout: "content",
      eyebrow: "Parte 5 · Importância",
      title: "Curiosidades Linguísticas",
      body:
        "| Português | Inglês | Alemão |\n" +
        "| --- | --- | --- |\n" +
        "| mãe | mother | mutter |\n" +
        "| noite | night | nacht |\n\n" +
        "**Curiosidade:** possuem origem indo-europeia comum.",
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },

    // ───────────── ENCERRAMENTO ─────────────
    {
      id: "slide-20",
      layout: "flow",
      eyebrow: "Síntese",
      title: "Evolução da Língua Portuguesa",
      flow: ["Latim vulgar", "Galego-português", "Português arcaico", "Português moderno"],
      background: "assets/backgrounds/paper-aged-landscape.jpeg",
    },
    {
      id: "slide-21",
      layout: "quote",
      eyebrow: "Conclusão",
      title: "Conclusão",
      body:
        '"A Gramática Histórico-Comparativa revelou que as línguas possuem relações históricas profundas."\n\n' +
        '"As línguas evoluem junto com os povos e suas culturas."',
      background: "assets/backgrounds/paper-ornate-border.jpeg",
    },
    {
      id: "slide-22",
      layout: "closing",
      eyebrow: "Encerramento",
      title: "Obrigado!",
      body: "Perguntas?",
      background: "assets/backgrounds/paper-ornate-border.jpeg",
    },
  ],
};
