/* Zhengdong Hong — homepage interactions (no frameworks) */
(function () {
  "use strict";

  /* ---------- theme ---------- */
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(stored || (prefersDark ? "dark" : "light"), false);

  function setTheme(mode, persist) {
    root.setAttribute("data-theme", mode);
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = mode === "dark" ? "◑" : "◐";
    if (persist) { try { localStorage.setItem("theme", mode); } catch (e) {} }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.textContent = root.getAttribute("data-theme") === "dark" ? "◑" : "◐";
      btn.addEventListener("click", function () {
        setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
      });
    }

    typewriter();
    initRails();
    initSpy();
    initReveal();
    initVideos();
  });

  /* ---------- typewriter for the Chinese name in the navbar ---------- */
  function typewriter() {
    var el = document.getElementById("zh-name");
    if (!el) return;
    var txt = el.getAttribute("data-text") || "";
    el.textContent = "";
    var i = 0;
    setTimeout(function tick() {
      if (i < txt.length) {
        el.textContent += txt.charAt(i++);
        setTimeout(tick, 260);
      }
    }, 900);
  }

  /* ---------- photo rails: scroll-linked float ----------
     Each rail is a sticky viewport; its inner track is taller.
     As the page scrolls 0→100%, the track glides through its
     overflow so every photo passes by exactly once.            */
  var rails = [];
  function initRails() {
    rails = Array.prototype.slice.call(document.querySelectorAll(".rail"));
    if (!rails.length) return;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      if (window.innerWidth <= 1180) return; // strips mode: no transform
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var p = max > 0 ? doc.scrollTop / max : 0;
      rails.forEach(function (rail) {
        var track = rail.querySelector(".rail-track");
        if (!track) return;
        var overflow = track.scrollHeight - rail.clientHeight;
        track.style.transform = overflow > 0
          ? "translateY(" + (-p * overflow).toFixed(1) + "px)"
          : "";
      });
    });
  }

  /* ---------- scrollspy for the top nav ---------- */
  function initSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[href^='#']"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var current = null;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        if (current) current.classList.remove("active");
        current = map[en.target.id] || null;
        if (current) current.classList.add("active");
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) io.observe(sec);
    });
  }

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.06 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- teaser videos: play only while visible ---------- */
  function initVideos() {
    var vids = document.querySelectorAll("video[data-autoplay]");
    if (!vids.length) return;
    if (!("IntersectionObserver" in window)) {
      vids.forEach(function (v) { v.play().catch(function () {}); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) { v.play().catch(function () {}); }
        else { v.pause(); }
      });
    }, { threshold: 0.2 });
    vids.forEach(function (v) { io.observe(v); });
  }

  /* ---------- console easter egg ---------- */
  try {
    console.log(
      "%c/whoami\n%cZhengdong Hong — I work on full-stack robotics: from hardware to policy.\n" +
      "%c/contact\n%chzddltql@gmail.com",
      "color:#015cab;font-family:monospace;font-weight:bold",
      "font-family:monospace",
      "color:#015cab;font-family:monospace;font-weight:bold",
      "font-family:monospace"
    );
  } catch (e) {}
})();
