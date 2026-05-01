(function () {
  "use strict";

  /**
   * Smooth scroll for same-page anchor links (navbar & in-page CTAs).
   */
  function initSmoothScroll() {
    var prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.addEventListener("click", function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link || link.getAttribute("href") === "#") return;

      var id = link.getAttribute("href").slice(1);
      var target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });

      closeMobileNav();
    });
  }

  var navMenu = document.getElementById("navMenu");
  var navToggle = document.getElementById("navToggle");

  function closeMobileNav() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function initMobileNav() {
    if (!navMenu || !navToggle) return;

    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobileNav();
    });
  }

  /**
   * Product card image zoom on hover (pointer) via class toggle.
   * Keyboard/focus users are not forced into hover-only behavior for core content.
   */
  function initProductCardHoverZoom() {
    var cards = document.querySelectorAll(".product-card");
    if (!cards.length) return;

    cards.forEach(function (card) {
      var img = card.querySelector(".product-card__media img");
      if (!img) return;

      card.addEventListener("mouseenter", function () {
        img.classList.add("is-zoomed");
      });
      card.addEventListener("mouseleave", function () {
        img.classList.remove("is-zoomed");
      });
    });
  }

  function formatRupiah(n) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(n);
  }

  function initSimulasi() {
    var form = document.getElementById("simForm");
    var weightEl = document.getElementById("simWeight");
    var priceEl = document.getElementById("simPricePerGram");
    var resultEl = document.getElementById("simResult");
    if (!form || !weightEl || !priceEl || !resultEl) return;

    function computeAndRender() {
      var w = parseFloat(weightEl.value);
      var p = parseFloat(priceEl.value);
      if (!isFinite(w) || w <= 0 || !isFinite(p) || p <= 0) {
        resultEl.textContent =
          "Masukkan berat dan harga per gram yang valid untuk melihat estimasi.";
        return;
      }
      var total = Math.round(w * p);
      resultEl.textContent =
        "Estimasi: " +
        formatRupiah(total) +
        " (belum termasuk biaya cetak atau markup koleksi).";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      computeAndRender();
    });

    computeAndRender();
  }

  initSmoothScroll();
  initMobileNav();
  initProductCardHoverZoom();
  initSimulasi();
})();
