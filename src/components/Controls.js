/**
 * Controls.js
 * Barra de progresso, botões de navegação (anterior/próximo), contador
 * "atual / total" e indicadores (dots) clicáveis. Tema vintage (claro).
 *
 * Componente "burro": renderiza e dispara callbacks; o estado fica no Deck.
 * Exposto em PresApp.createControls (script clássico, roda via file://).
 */
window.PresApp = window.PresApp || {};

(function (PresApp) {
  const arrow = (dir) =>
    dir === "prev" ? '<path d="M15 19l-7-7 7-7" />' : '<path d="M9 5l7 7-7 7" />';

  // Ícones de tela cheia (entrar) e sair de tela cheia.
  const fsIcon = {
    enter:
      '<path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M16 3h3a2 2 0 0 1 2 2v3" />' +
      '<path d="M8 21H5a2 2 0 0 1-2-2v-3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" />',
    exit:
      '<path d="M3 8V5a2 2 0 0 1 2-2h3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" />' +
      '<path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M21 16v3a2 2 0 0 1-2 2h-3" />',
  };

  const navButton = (dir, label) => `
    <button type="button" data-nav="${dir}" aria-label="${label}"
      class="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-gold-600/40 bg-paper-50/80 text-brown-800 backdrop-blur
             transition hover:border-gold-600 hover:bg-paper-50 hover:text-gold-700
             focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100
             disabled:cursor-not-allowed disabled:opacity-30 sm:h-12 sm:w-12">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true">
        ${arrow(dir)}
      </svg>
    </button>`;

  /**
   * @param {number} total
   * @param {{onPrev:Function,onNext:Function,onGoto:Function}} handlers
   * @returns {{element:HTMLElement, update:Function}}
   */
  PresApp.createControls = function createControls(total, { onPrev, onNext, onGoto }) {
    const wrap = document.createElement("div");
    wrap.className = "pointer-events-none select-none";

    const dots = Array.from({ length: total }, (_, i) => `
      <button type="button" data-dot="${i}" aria-label="Ir para o slide ${i + 1}"
        class="dot pointer-events-auto h-2.5 rounded-full bg-brown-900/20 transition-all duration-300 hover:bg-brown-900/40
               focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"></button>`).join("");

    wrap.innerHTML = `
      <div class="fixed inset-x-0 top-0 z-30 h-1 bg-brown-900/10">
        <div data-progress class="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-[width] duration-500 ease-out" style="width:0%"></div>
      </div>

      <div class="fixed right-3 top-3 z-40 sm:right-5 sm:top-5">
        <button type="button" data-fullscreen aria-label="Entrar em tela cheia" aria-pressed="false"
          class="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-gold-600/40 bg-paper-50/80 text-brown-800 backdrop-blur
                 transition hover:border-gold-600 hover:bg-paper-50 hover:text-gold-700
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100
                 sm:h-12 sm:w-12">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true">${fsIcon.enter}</svg>
        </button>
      </div>

      <div class="fixed inset-y-0 left-0 z-30 flex items-center pl-3 sm:pl-5">${navButton("prev", "Slide anterior")}</div>
      <div class="fixed inset-y-0 right-0 z-30 flex items-center pr-3 sm:pr-5">${navButton("next", "Próximo slide")}</div>

      <div class="fixed inset-x-0 bottom-0 z-30 flex flex-col items-center gap-3 px-4 pb-5 pt-8
                  bg-gradient-to-t from-paper-100/90 to-transparent">
        <div data-dots class="flex max-w-full flex-wrap items-center justify-center gap-2">${dots}</div>
        <p class="font-display text-xs tracking-widest text-brown-700" aria-hidden="true">
          <span data-current>1</span><span class="mx-1 text-gold-600">/</span><span>${total}</span>
        </p>
      </div>`;

    wrap.querySelector('[data-nav="prev"]').addEventListener("click", onPrev);
    wrap.querySelector('[data-nav="next"]').addEventListener("click", onNext);
    wrap.querySelectorAll("[data-dot]").forEach((d) =>
      d.addEventListener("click", () => onGoto(Number(d.dataset.dot)))
    );

    // Botão de tela cheia (canto superior direito).
    const fsBtn = wrap.querySelector("[data-fullscreen]");
    const fsSvg = fsBtn.querySelector("svg");

    function toggleFullscreen() {
      if (document.fullscreenElement) {
        (document.exitFullscreen || document.webkitExitFullscreen || (() => {})).call(document);
      } else {
        const el = document.documentElement;
        (el.requestFullscreen || el.webkitRequestFullscreen || (() => {})).call(el);
      }
    }

    function syncFullscreen() {
      const on = !!document.fullscreenElement;
      fsSvg.innerHTML = on ? fsIcon.exit : fsIcon.enter;
      fsBtn.setAttribute("aria-pressed", on ? "true" : "false");
      fsBtn.setAttribute("aria-label", on ? "Sair da tela cheia" : "Entrar em tela cheia");
    }

    fsBtn.addEventListener("click", toggleFullscreen);
    document.addEventListener("fullscreenchange", syncFullscreen);
    document.addEventListener("webkitfullscreenchange", syncFullscreen);

    const progress = wrap.querySelector("[data-progress]");
    const current = wrap.querySelector("[data-current]");
    const prevBtn = wrap.querySelector('[data-nav="prev"]');
    const nextBtn = wrap.querySelector('[data-nav="next"]');
    const dotEls = [...wrap.querySelectorAll("[data-dot]")];

    /** Sincroniza os controles com o índice atual. */
    function update(index) {
      const pct = total > 1 ? (index / (total - 1)) * 100 : 100;
      progress.style.width = `${pct}%`;
      current.textContent = String(index + 1);

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === total - 1;

      dotEls.forEach((d, i) => {
        const active = i === index;
        d.classList.toggle("w-6", active);
        d.classList.toggle("bg-gold-500", active);
        d.classList.toggle("w-2.5", !active);
        d.classList.toggle("bg-brown-900/20", !active);
        d.setAttribute("aria-current", active ? "true" : "false");
      });
    }

    return { element: wrap, update };
  };
})(window.PresApp);
