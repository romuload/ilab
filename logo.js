/* Logo iLAB: o "A" é um Erlenmeyer com líquido âmbar, como no logo antigo.
   <ilab-logo> herda cor e tamanho do texto. Passar o mouse agita o líquido e solta bolhas;
   clicar faz o líquido balançar e o pingo do "i" quicar. Atributo "empty" começa sem líquido
   (a abertura enche com .fill()). */
(() => {
  const css = `
ilab-logo{display:inline-flex;align-items:baseline;font-weight:800;letter-spacing:-.035em;line-height:1;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;--lg-amber:#F4A21C}
ilab-logo>span{display:inline-block}
ilab-logo .lg-i{position:relative}
ilab-logo .lg-i i{position:absolute;left:50%;bottom:.775em;width:.205em;height:.205em;margin-left:-.08em;border-radius:50%;background:var(--lg-amber)}
ilab-logo .lg-a{height:.74em;width:auto;overflow:visible;margin:0 .015em 0 .035em;align-self:baseline}
ilab-logo .lg-glass{fill:none;stroke:currentColor;stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
ilab-logo .lg-liq,ilab-logo .lg-fill,ilab-logo .lg-wave{transform-box:view-box}
ilab-logo .lg-liq{transform-origin:15px 22px}
ilab-logo .lg-fill{transition:transform 1.1s cubic-bezier(.3,1.35,.5,1)}
ilab-logo[empty] .lg-fill{transform:translateY(16px)}
ilab-logo .lg-wave{animation:lg-wave 3.6s linear infinite}
ilab-logo .lg-b{opacity:0}
ilab-logo:hover .lg-wave{animation-duration:1.1s}
ilab-logo:hover .lg-b{animation:lg-bub 1.3s ease-in infinite}
ilab-logo:hover .lg-b:nth-of-type(2){animation-delay:.45s}
ilab-logo:hover .lg-b:nth-of-type(3){animation-delay:.85s}
ilab-logo.lg-slosh .lg-liq{animation:lg-slosh 1.1s cubic-bezier(.3,.7,.4,1)}
ilab-logo.lg-slosh .lg-i i{animation:lg-hop .7s cubic-bezier(.3,.7,.4,1)}
@keyframes lg-wave{to{transform:translateX(14px)}}
@keyframes lg-bub{0%{opacity:0;transform:translateY(0)}20%{opacity:.95}100%{opacity:0;transform:translateY(-8px)}}
@keyframes lg-slosh{0%{transform:rotate(0)}18%{transform:rotate(-16deg)}40%{transform:rotate(11deg)}60%{transform:rotate(-6deg)}80%{transform:rotate(2.5deg)}100%{transform:rotate(0)}}
@keyframes lg-hop{0%,100%{transform:translateY(0)}35%{transform:translateY(-.22em) scaleY(1.12)}65%{transform:translateY(0) scale(1.15,.85)}}
@media (prefers-reduced-motion:reduce){ilab-logo .lg-wave,ilab-logo:hover .lg-b,ilab-logo.lg-slosh .lg-liq,ilab-logo.lg-slosh .lg-i i{animation:none}ilab-logo .lg-fill{transition:none}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // contorno do frasco (linha central do traço) e o mesmo contorno fechado para recortar o líquido
  const GLASS = 'M6.7 2.5H9.2V10.6L3.2 23.6Q2 27.5 6 27.5H24Q28 27.5 26.8 23.6L20.8 10.6V2.5H23.3';
  const CLIP = 'M9.2 0V10.6L3.2 23.6Q2 27.5 6 27.5H24Q28 27.5 26.8 23.6L20.8 10.6V0Z';
  // superfície ondulada (a "barra" do A); desliza 14 unidades = um período
  const WAVE = 'M-28 15.2q3.5 -1.6 7 0' + 't7 0'.repeat(12) + 'V32H-28Z';
  let n = 0;

  class ILabLogo extends HTMLElement {
    connectedCallback() {
      if (this._ok) return; this._ok = true;
      const id = 'ilab-lg' + (++n);
      this.setAttribute('role', 'img'); if (!this.hasAttribute('aria-label')) this.setAttribute('aria-label', 'iLAB');
      this.innerHTML = `<span class="lg-i" aria-hidden="true">ı<i></i></span><span aria-hidden="true">L</span>`
        + `<svg class="lg-a" viewBox="0 0 30 30" aria-hidden="true"><defs>`
        + `<clipPath id="${id}c"><path d="${CLIP}"/></clipPath>`
        + `<linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFCF5A"/><stop offset=".55" stop-color="#F4A21C"/><stop offset="1" stop-color="#DC7A0C"/></linearGradient></defs>`
        + `<g clip-path="url(#${id}c)"><g class="lg-fill"><g class="lg-liq"><path class="lg-wave" fill="url(#${id}g)" d="${WAVE}"/>`
        + `<circle class="lg-b" cx="12" cy="24" r="1.3" fill="#FFE7A8"/><circle class="lg-b" cx="16.5" cy="23" r="1" fill="#FFE7A8"/><circle class="lg-b" cx="19.5" cy="24.5" r=".9" fill="#FFE7A8"/></g></g></g>`
        + `<path class="lg-glass" d="${GLASS}"/></svg><span aria-hidden="true">B</span>`;
      this.addEventListener('click', () => this.slosh());
    }
    slosh() { this.classList.remove('lg-slosh'); void this.offsetWidth; this.classList.add('lg-slosh'); clearTimeout(this._t); this._t = setTimeout(() => this.classList.remove('lg-slosh'), 1200); }
    fill() { this.removeAttribute('empty'); }
  }
  customElements.define('ilab-logo', ILabLogo);
})();
