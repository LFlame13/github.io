(function () {
  "use strict";

  var scriptEl = document.currentScript;
  var indexUrl = new URL("search-index.json", scriptEl.src).href;
  var data = null;
  var loading = null;

  function loadIndex() {
    if (data) return Promise.resolve(data);
    if (loading) return loading;
    loading = fetch(indexUrl)
      .then(function (r) { return r.json(); })
      .then(function (json) { data = json; return data; });
    return loading;
  }

  function norm(s) {
    return (s || "").toLowerCase().replace(/\u0451/g, "\u0435");
  }

  // hyphens, dots, quotes and extra spaces do not matter: "mz-1", "mz 1" and "mz1" are the same
  function flat(s) {
    return s.replace(/(\d)\s*[x\u0445\u00d7*]\s*(?=\d)/g, "$1 ")
      .replace(/[\-\u2013\u2014_.,:;"'\u00ab\u00bb()\/\u2205]+/g, " ").replace(/\s+/g, " ").trim();
  }

  function score(row, q) {
    var title = norm(row.title), cat = norm(row.category), label = norm(row.label);
    var s = 0;
    if (label.indexOf(q) !== -1) s += label.indexOf(q) === 0 ? 100 : 60;
    if (title.indexOf(q) !== -1) s += title.indexOf(q) === 0 ? 80 : 40;
    if (cat.indexOf(q) !== -1) s += 15;
    if (s) return s;
    // not found as one phrase: every word of the query must occur somewhere, in any order
    // Russian word endings vary (dvurogiy / dvurogie): long words without digits are matched by their stem
    var words = flat(q).split(" ").filter(Boolean).map(function (w) {
      return w.length >= 5 && !/\d/.test(w) ? w.slice(0, w.length - 2) : w;
    });
    if (!words.length) return 0;
    var hay = flat(label + " " + title + " " + cat), tight = hay.replace(/ /g, "");
    var inLabel = flat(label), labelTight = inLabel.replace(/ /g, "");
    for (var i = 0; i < words.length; i++) {
      if (hay.indexOf(words[i]) === -1 && tight.indexOf(words[i]) === -1) return 0;
    }
    s = 30;
    var allInLabel = words.every(function (w) { return inLabel.indexOf(w) !== -1 || labelTight.indexOf(w) !== -1; });
    if (allInLabel) s += 25;
    return s;
  }

  function search(q, limit) {
    q = norm(q).trim();
    if (q.length < 2) return [];
    return data
      .map(function (row) { return { row: row, s: score(row, q) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, limit || 8)
      .map(function (x) { return x.row; });
  }

  function baseHref() {
    // derive site-root-relative prefix from where search.js itself lives
    var u = new URL(".", scriptEl.src);
    return u.href;
  }

  function init(form) {
    var input = form.querySelector('input[name="query"]');
    if (!input) return;
    input.setAttribute("autocomplete", "off");

    var box = document.createElement("div");
    box.className = "kmz-search-results";
    box.style.display = "none";
    form.style.position = "relative";
    form.appendChild(box);

    var timer = null;
    var activeIndex = -1;
    var currentItems = [];

    function render(items, q) {
      currentItems = items;
      activeIndex = -1;
      if (!items.length) {
        if (q && norm(q).trim().length >= 2) {
          // "nothing found" in Russian, escaped: pages are cp1251, this file must stay ASCII
          box.innerHTML = '<div class="kmz-sr-empty">\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e</div>';
          box.style.display = "block";
        } else {
          box.style.display = "none";
          box.innerHTML = "";
        }
        return;
      }
      box.innerHTML = items
        .map(function (row, i) {
          var href = baseHref() + row.url;
          var cat = row.category ? '<span class="kmz-sr-cat">' + row.category + "</span>" : "";
          return (
            '<a href="' + href + '" class="kmz-sr-item" data-i="' + i + '">' +
            '<span class="kmz-sr-title">' + (row.label || row.title) + "</span>" +
            cat +
            "</a>"
          );
        })
        .join("");
      box.style.display = "block";
    }

    function highlight(i) {
      var items = box.querySelectorAll(".kmz-sr-item");
      items.forEach(function (el, idx) {
        el.classList.toggle("active", idx === i);
      });
      activeIndex = i;
    }

    input.addEventListener("input", function () {
      clearTimeout(timer);
      var q = input.value;
      timer = setTimeout(function () {
        loadIndex().then(function () { render(search(q), q); });
      }, 120);
    });

    input.addEventListener("keydown", function (e) {
      var items = box.querySelectorAll(".kmz-sr-item");
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (items.length) highlight((activeIndex + 1) % items.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (items.length) highlight((activeIndex - 1 + items.length) % items.length);
      } else if (e.key === "Escape") {
        box.style.display = "none";
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (activeIndex >= 0 && currentItems[activeIndex]) {
        window.location.href = baseHref() + currentItems[activeIndex].url;
        return;
      }
      if (currentItems.length) {
        window.location.href = baseHref() + currentItems[0].url;
      }
    });

    document.addEventListener("click", function (e) {
      if (!form.contains(e.target)) box.style.display = "none";
    });
    input.addEventListener("focus", function () {
      if (currentItems.length) box.style.display = "block";
    });
  }

  // mobile top bar: search (#toggle) and contacts (#toggle_2) panels; checked = closed
  function linkMobilePanels() {
    var searchToggle = document.getElementById("toggle");
    var phoneToggle = document.getElementById("toggle_2");
    if (!searchToggle || !phoneToggle) return;
    searchToggle.addEventListener("change", function () {
      if (!searchToggle.checked) {
        phoneToggle.checked = true;
        var input = document.querySelector('.small_search .search input[name="query"]');
        if (input) setTimeout(function () { input.focus(); }, 50);
      }
    });
    phoneToggle.addEventListener("change", function () {
      if (!phoneToggle.checked) searchToggle.checked = true;
    });
  }

  function boot() {
    var forms = document.querySelectorAll(".kmz-searchbar form, .small_search .search form");
    forms.forEach(init);
    linkMobilePanels();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
