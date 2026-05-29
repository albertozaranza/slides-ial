/**
 * richText.js
 * Converte o campo `body` (markdown leve) em HTML seguro. Suporta:
 *   - Parágrafos separados por linha em branco
 *   - Listas (- ou *) com um nível de aninhamento (indentação de 2+ espaços)
 *   - Tabelas no estilo markdown (linhas com |)
 *   - Ênfase: **negrito** e *itálico*
 *
 * Todo o conteúdo é escapado antes da formatação (proteção contra injeção).
 * Exposto em PresApp.renderRichText (script clássico, roda via file://).
 */
window.PresApp = window.PresApp || {};

(function (PresApp) {
  const escapeHtml = (str) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const inline = (str) =>
    escapeHtml(str)
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gold-700">$1</strong>')
      .replace(/\*(.+?)\*/g, "<em>$1</em>");

  const isListLine = (l) => /^[-*]\s+/.test(l.trim());
  const isTableLine = (l) => l.trim().startsWith("|");
  const isSeparatorRow = (l) => /^\|?[\s:|-]+\|?$/.test(l.trim()) && l.includes("-");

  const cells = (line) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());

  /** Renderiza uma tabela markdown. */
  function renderTable(lines) {
    const rows = lines.filter((l) => !isSeparatorRow(l)).map(cells);
    if (!rows.length) return "";
    const [head, ...body] = rows;

    const ths = head
      .map(
        (c) =>
          `<th scope="col" class="border-b-2 border-gold-600/50 px-4 py-2 text-left font-display text-sm uppercase tracking-wider text-gold-700">${inline(
            c
          )}</th>`
      )
      .join("");

    const trs = body
      .map(
        (r) =>
          `<tr class="border-b border-brown-900/10">${r
            .map((c) => `<td class="px-4 py-2 align-top">${inline(c)}</td>`)
            .join("")}</tr>`
      )
      .join("");

    return `<div class="overflow-x-auto"><table class="w-full border-collapse text-base sm:text-lg">
      <thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
  }

  /**
   * @param {string} body  Texto bruto vindo dos dados
   * @param {string} [wrapperClass]  Classes Tailwind aplicadas a cada bloco
   * @returns {string} HTML pronto para innerHTML
   */
  PresApp.renderRichText = function renderRichText(body, wrapperClass = "") {
    if (!body) return "";

    const blocks = body.split(/\n{2,}/).map((b) => b.replace(/\s+$/, "")).filter((b) => b.trim());

    return blocks
      .map((block) => {
        const lines = block.split("\n").filter((l) => l.trim());

        if (lines.every(isTableLine)) {
          return `<div class="${wrapperClass}">${renderTable(lines)}</div>`;
        }
        if (lines.every(isListLine)) {
          return `<div class="${wrapperClass}">${renderListTree(lines)}</div>`;
        }
        return `<p class="${wrapperClass}">${inline(block.replace(/\n/g, " "))}</p>`;
      })
      .join("");
  };

  /** Lista aninhada construída como árvore (corrige o fechamento dos <li>). */
  function renderListTree(lines) {
    const dot =
      '<span aria-hidden="true" class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"></span>';
    const items = [];

    lines.forEach((raw) => {
      const indent = raw.length - raw.trimStart().length;
      const text = raw.trim().replace(/^[-*]\s+/, "");
      if (indent >= 2 && items.length) {
        items[items.length - 1].children.push(text);
      } else {
        items.push({ text, children: [] });
      }
    });

    const li = (it) => {
      const sub = it.children.length
        ? `<ul class="mt-2 space-y-1.5 pl-6 text-[0.95em] text-brown-700">${it.children
            .map(
              (c) =>
                `<li class="flex gap-3">${dot}<span>${inline(c)}</span></li>`
            )
            .join("")}</ul>`
        : "";
      return `<li class="flex flex-col"><span class="flex gap-3">${dot}<span>${inline(
        it.text
      )}</span></span>${sub}</li>`;
    };

    return `<ul class="space-y-3">${items.map(li).join("")}</ul>`;
  }
})(window.PresApp);
