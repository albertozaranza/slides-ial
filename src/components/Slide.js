/**
 * Slide.js
 * Transforma um objeto de dados em uma <section> de slide.
 *
 * Tema: vintage acadêmico minimalista (bege/marrom/dourado/preto). Cada layout
 * reaproveita blocos comuns (eyebrow, título, corpo, moldura de imagem) para
 * evitar duplicação. Estilização 100% via classes Tailwind.
 * Exposto em PresApp.createSlide (script clássico, roda via file://).
 *
 * Layouts: cover, section, content, split, profile, gallery, diagram, image,
 *          flow, quote, closing.
 */
window.PresApp = window.PresApp || {};

(function (PresApp) {
  const eyebrow = (text) =>
    text
      ? `<p class="mb-3 font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold-700 sm:text-sm">${text}</p>`
      : "";

  const heading = (text, size) =>
    `<h2 class="font-serif font-bold leading-tight text-brown-900 ${size}">${text}</h2>`;

  const divider = `<div class="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>`;

  /** Moldura padrão para imagens, com borda dourada sobre papel. */
  const figure = (src, alt, extra = "") =>
    `<figure class="group relative overflow-hidden rounded-xl border border-gold-600/40 bg-paper-50 p-1.5 shadow-lg ring-1 ring-brown-900/5 ${extra}">
       <img src="${src}" alt="${alt}" loading="lazy"
            class="h-full w-full rounded-lg object-contain transition-transform duration-700 will-change-transform group-hover:scale-[1.03]" />
     </figure>`;

  /** Cadeia vertical de etapas, ligadas por setas (campo `flow`). */
  const flowBlock = (steps) =>
    `<div class="mx-auto mt-8 flex max-w-md flex-col items-center gap-2">` +
    steps
      .map(
        (step, i) =>
          `${
            i > 0
              ? '<span aria-hidden="true" class="text-2xl leading-none text-gold-600">↓</span>'
              : ""
          }<div class="w-full rounded-lg border border-gold-600/40 bg-paper-50/80 px-6 py-3 text-center font-serif text-lg text-brown-900 shadow-sm sm:text-xl">${step}</div>`
      )
      .join("") +
    `</div>`;

  const rt = (...args) => PresApp.renderRichText(...args);

  const layouts = {
    cover: (s) => `
      <div class="flex h-full flex-col items-center justify-center text-center" data-animate>
        ${eyebrow(s.eyebrow)}
        ${heading(s.title, "text-4xl sm:text-6xl lg:text-7xl")}
        ${divider}
        <div class="mt-6 max-w-2xl space-y-2 text-base text-brown-800 sm:text-lg">${rt(s.body)}</div>
      </div>`,

    section: (s) => `
      <div class="flex h-full flex-col justify-center" data-animate>
        ${eyebrow(s.eyebrow)}
        ${heading(s.title, "text-3xl sm:text-5xl lg:text-6xl")}
        <div class="mt-6 max-w-3xl text-lg text-brown-800 sm:text-2xl">${rt(s.body)}</div>
      </div>`,

    content: (s) => `
      <div class="flex h-full flex-col justify-center" data-animate>
        ${eyebrow(s.eyebrow)}
        ${heading(s.title, "text-3xl sm:text-4xl lg:text-5xl")}
        <div class="mt-6 max-w-3xl space-y-4 text-base text-brown-800 sm:text-xl">${rt(s.body)}</div>
        ${s.flow ? flowBlock(s.flow) : ""}
      </div>`,

    split: (s) => `
      <div class="grid h-full items-center gap-8 md:grid-cols-2" data-animate>
        <div class="order-2 md:order-1">
          ${eyebrow(s.eyebrow)}
          ${heading(s.title, "text-3xl sm:text-4xl lg:text-5xl")}
          <div class="mt-5 space-y-4 text-base text-brown-800 sm:text-lg">${rt(s.body)}</div>
        </div>
        <div class="order-1 h-56 md:order-2 md:h-[60%] lg:h-[70%]">
          ${figure(s.image, s.title, "h-full")}
        </div>
      </div>`,

    profile: (s) => `
      <div class="grid h-full items-center gap-8 md:grid-cols-[minmax(0,36%)_1fr]" data-animate>
        <div class="mx-auto h-56 w-44 sm:h-72 sm:w-56 md:h-[70%] md:w-full">
          ${figure(s.image, "Retrato de " + s.title, "h-full")}
        </div>
        <div>
          ${eyebrow(s.eyebrow)}
          ${heading(s.title, "text-3xl sm:text-4xl lg:text-5xl")}
          <div class="mt-5 space-y-4 text-base text-brown-800 sm:text-lg">${rt(s.body)}</div>
        </div>
      </div>`,

    gallery: (s) => `
      <div class="flex h-full flex-col justify-center" data-animate>
        ${eyebrow(s.eyebrow)}
        ${heading(s.title, "text-3xl sm:text-4xl lg:text-5xl")}
        <div class="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-6">
          ${(s.items || [])
            .map(
              (it) => `
            <figure class="flex flex-col items-center text-center">
              <div class="h-28 w-24 sm:h-52 sm:w-44">
                ${figure(it.image, "Retrato de " + it.caption, "h-full w-full")}
              </div>
              <figcaption class="mt-3 font-display text-sm uppercase tracking-wider text-brown-900 sm:text-base">${it.caption}</figcaption>
              ${it.note ? `<p class="mt-1 text-sm italic text-brown-700">${it.note}</p>` : ""}
            </figure>`
            )
            .join("")}
        </div>
      </div>`,

    diagram: (s) => `
      <div class="flex h-full flex-col" data-animate>
        <div class="shrink-0">
          ${eyebrow(s.eyebrow)}
          ${heading(s.title, "text-2xl sm:text-3xl lg:text-4xl")}
        </div>
        <div class="mt-4 min-h-0 flex-1">
          ${figure(s.image, s.title, "h-full")}
        </div>
        ${
          s.body
            ? `<div class="mt-4 shrink-0 text-sm text-brown-700 sm:text-base">${rt(s.body)}</div>`
            : ""
        }
      </div>`,

    image: (s) => `
      <div class="flex h-full flex-col" data-animate>
        <div class="shrink-0">
          ${eyebrow(s.eyebrow)}
          ${heading(s.title, "text-2xl sm:text-3xl lg:text-4xl")}
        </div>
        <div class="mt-4 min-h-0 flex-1">
          ${figure(s.image, s.title, "h-full")}
        </div>
        ${
          s.body
            ? `<figcaption class="mt-4 shrink-0 text-sm italic text-brown-700 sm:text-base">${rt(s.body)}</figcaption>`
            : ""
        }
      </div>`,

    flow: (s) => `
      <div class="flex h-full flex-col items-center justify-center text-center" data-animate>
        ${eyebrow(s.eyebrow)}
        ${heading(s.title, "text-3xl sm:text-4xl lg:text-5xl")}
        ${s.flow ? flowBlock(s.flow) : ""}
        ${
          s.body
            ? `<div class="mt-6 max-w-xl text-base text-brown-800 sm:text-lg">${rt(s.body)}</div>`
            : ""
        }
      </div>`,

    quote: (s) => `
      <div class="flex h-full flex-col items-center justify-center text-center" data-animate>
        ${eyebrow(s.eyebrow)}
        ${heading(s.title, "text-3xl sm:text-4xl lg:text-5xl")}
        ${divider}
        <div class="mt-8 max-w-3xl space-y-6 font-serif text-xl italic leading-relaxed text-brown-800 sm:text-2xl">${rt(s.body)}</div>
      </div>`,

    closing: (s) => `
      <div class="flex h-full flex-col items-center justify-center text-center" data-animate>
        ${eyebrow(s.eyebrow)}
        ${heading(s.title, "text-4xl sm:text-6xl lg:text-7xl")}
        ${divider}
        <div class="mt-6 max-w-2xl text-lg text-brown-800 sm:text-2xl">${rt(s.body)}</div>
      </div>`,
  };

  /**
   * Cria o elemento <section> de um slide.
   * @param {object} slide  Objeto vindo dos dados
   * @param {number} index  Posição (0-based)
   * @param {number} total  Total de slides
   * @returns {HTMLElement}
   */
  PresApp.createSlide = function createSlide(slide, index, total) {
    const section = document.createElement("section");
    section.id = slide.id || `slide-${String(index + 1).padStart(2, "0")}`;
    section.className =
      "slide absolute inset-0 flex opacity-0 invisible transition-[opacity] duration-500 ease-out";
    section.dataset.index = String(index);

    section.setAttribute("role", "group");
    section.setAttribute("aria-roledescription", "slide");
    section.setAttribute("aria-label", `${index + 1} de ${total}: ${slide.title}`);
    section.setAttribute("aria-hidden", "true");

    const render = layouts[slide.layout] || layouts.content;

    // Fundo de papel vintage + véu creme para garantir legibilidade do texto.
    const bg = slide.background
      ? `<div class="absolute inset-0 -z-10 bg-cover bg-center" style="background-image:url('${slide.background}')"></div>
         <div class="absolute inset-0 -z-10 bg-[rgba(244,236,221,0.82)]"></div>`
      : "";

    section.innerHTML = `
      ${bg}
      <div class="mx-auto flex w-full max-w-6xl flex-col px-16 py-14 sm:px-16 sm:py-16 lg:px-20">
        ${render(slide)}
      </div>`;

    return section;
  };
})(window.PresApp);
