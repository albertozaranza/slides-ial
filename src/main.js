/**
 * main.js — Orquestrador da apresentação (Deck)
 *
 * Lê o conteúdo de window.PRESENTATION_DATA (data/slides.js), renderiza os
 * slides com PresApp.createSlide() e controla a navegação: teclado, toque
 * (swipe), clique, hash da URL. Mantém os controles sincronizados e anuncia o
 * slide atual via região aria-live.
 *
 * Script clássico (sem import/export) para funcionar abrindo o index.html
 * diretamente, sem servidor.
 */
(function (PresApp) {
  class Deck {
    constructor(root, data) {
      this.root = root;
      this.meta = data.meta || {};
      this.slides = data.slides || [];
      this.total = this.slides.length;
      this.index = 0;
      this.stage = root.querySelector("[data-stage]");
      this.live = root.querySelector("[data-live]");
      this.sections = [];
    }

    mount() {
      if (this.meta.title) document.title = this.meta.title;

      this.slides.forEach((slide, i) => {
        const section = PresApp.createSlide(slide, i, this.total);
        this.sections.push(section);
        this.stage.appendChild(section);
      });

      this.controls = PresApp.createControls(this.total, {
        onPrev: () => this.prev(),
        onNext: () => this.next(),
        onGoto: (i) => this.goto(i),
      });
      this.root.appendChild(this.controls.element);

      this.bindKeyboard();
      this.bindSwipe();
      this.bindHash();

      const fromHash = this.indexFromHash();
      this.goto(fromHash !== null ? fromHash : 0, { animate: false, updateHash: false });
    }

    indexFromHash() {
      const id = window.location.hash.replace("#", "");
      if (!id) return null;
      const i = this.slides.findIndex((s) => s.id === id);
      return i >= 0 ? i : null;
    }

    /** Navega para um índice, com animação de entrada e atualização de estado. */
    goto(target, { animate = true, updateHash = true } = {}) {
      const i = Math.max(0, Math.min(this.total - 1, target));
      this.index = i;

      this.sections.forEach((section, idx) => {
        const active = idx === i;
        section.classList.toggle("opacity-100", active);
        section.classList.toggle("opacity-0", !active);
        section.classList.toggle("visible", active);
        section.classList.toggle("invisible", !active);
        section.setAttribute("aria-hidden", active ? "false" : "true");

        const content = section.querySelector("[data-animate]");
        if (content) {
          if (active) {
            content.classList.remove("is-active");
            if (animate) void content.offsetWidth; // reinicia a transição
            content.classList.add("is-active");
          } else {
            content.classList.remove("is-active");
          }
        }
      });

      this.controls.update(i);
      if (updateHash) this.setHash();
      this.announce();
    }

    next() {
      if (this.index < this.total - 1) this.goto(this.index + 1);
    }

    prev() {
      if (this.index > 0) this.goto(this.index - 1);
    }

    setHash() {
      const id = this.slides[this.index] && this.slides[this.index].id;
      if (id) history.replaceState(null, "", `#${id}`);
    }

    announce() {
      if (this.live) {
        const s = this.slides[this.index];
        this.live.textContent = `Slide ${this.index + 1} de ${this.total}: ${s.title}`;
      }
    }

    bindKeyboard() {
      window.addEventListener("keydown", (e) => {
        switch (e.key) {
          case "ArrowRight":
          case "PageDown":
          case " ":
            e.preventDefault();
            this.next();
            break;
          case "ArrowLeft":
          case "PageUp":
            e.preventDefault();
            this.prev();
            break;
          case "Home":
            e.preventDefault();
            this.goto(0);
            break;
          case "End":
            e.preventDefault();
            this.goto(this.total - 1);
            break;
        }
      });
    }

    bindSwipe() {
      let x0 = null;
      const threshold = 50;
      this.stage.addEventListener(
        "touchstart",
        (e) => (x0 = e.changedTouches[0].clientX),
        { passive: true }
      );
      this.stage.addEventListener(
        "touchend",
        (e) => {
          if (x0 === null) return;
          const dx = e.changedTouches[0].clientX - x0;
          if (Math.abs(dx) > threshold) (dx < 0 ? this.next() : this.prev());
          x0 = null;
        },
        { passive: true }
      );
    }

    bindHash() {
      window.addEventListener("hashchange", () => {
        const i = this.indexFromHash();
        if (i !== null && i !== this.index) this.goto(i, { updateHash: false });
      });
    }
  }

  function init() {
    const root = document.getElementById("app");
    const data = window.PRESENTATION_DATA;

    if (!data || !Array.isArray(data.slides) || !data.slides.length) {
      root.querySelector("[data-stage]").innerHTML = `
        <div class="flex h-full flex-col items-center justify-center px-6 text-center text-slate-200">
          <h1 class="font-serif text-2xl text-gold-300">Nenhum slide encontrado</h1>
          <p class="mt-3 max-w-md text-sm text-slate-400">
            Verifique se <code class="text-gold-200">data/slides.js</code> foi carregado e define
            <code class="text-gold-200">window.PRESENTATION_DATA</code>.
          </p>
        </div>`;
      return;
    }

    new Deck(root, data).mount();
  }

  document.addEventListener("DOMContentLoaded", init);
})(window.PresApp);
