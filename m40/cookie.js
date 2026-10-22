/* cookie notice (notification only): shown until the visitor clicks the button, remembered for a year.
   window.kmzConsent() -> "accepted" | null. Metrika runs regardless: the notice informs, it does not ask. */
(function () {
  "use strict";
  var KEY = "kmz_consent", scriptEl = document.currentScript;
  var base = new URL(".", scriptEl ? scriptEl.src : location.href).href;

  function read() {
    try { var v = localStorage.getItem(KEY); if (v) return v; } catch (e) {}
    var m = document.cookie.match(/(?:^|; )kmz_consent=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    try { document.cookie = KEY + "=" + v + "; max-age=31536000; path=/; SameSite=Lax"; } catch (e) {}
  }
  window.kmzConsent = read;

  var css = ".kmz-cookie{position:fixed;left:16px;right:16px;bottom:16px;z-index:10050;max-width:760px;margin:0 auto;" +
    "background:#0F1722;color:#D9DEE3;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,.35);padding:14px 16px;" +
    "display:flex;align-items:center;gap:14px;font:13px/1.5 Arial,Helvetica,sans-serif;text-align:left}" +
    ".kmz-cookie a{color:#fff;text-decoration:underline}.kmz-cookie a:hover{color:#E8590C}" +
    ".kmz-cookie-btns{display:flex;gap:8px;flex-shrink:0}" +
    ".kmz-cookie button{cursor:pointer;border-radius:6px;padding:9px 16px;font:600 13px Arial,Helvetica,sans-serif;border:1px solid transparent}" +
    ".kmz-cookie .kmz-ok{background:#E8590C;color:#fff}.kmz-cookie .kmz-ok:hover{background:#ff6a1a}" +
    "@media (max-width:600px){.kmz-cookie{flex-direction:column;align-items:stretch;left:10px;right:10px;bottom:10px;gap:10px}" +
    ".kmz-cookie-btns{justify-content:flex-end}.kmz-cookie button{flex:1}}";

  function show() {
    if (read() || document.querySelector(".kmz-cookie")) return;
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var box = document.createElement("div");
    box.className = "kmz-cookie"; box.setAttribute("role", "dialog");
    box.innerHTML = '<div>\u041c\u044b \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c \u0444\u0430\u0439\u043b\u044b cookie \u0438 \u0441\u0435\u0440\u0432\u0438\u0441 \u042f\u043d\u0434\u0435\u043a\u0441 \u041c\u0435\u0442\u0440\u0438\u043a\u0430, \u0447\u0442\u043e\u0431\u044b \u0441\u0430\u0439\u0442 \u0440\u0430\u0431\u043e\u0442\u0430\u043b \u0443\u0434\u043e\u0431\u043d\u0435\u0435. \u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0430\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c\u0441\u044f \u0441\u0430\u0439\u0442\u043e\u043c, \u0432\u044b \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044c \u0441 \u044d\u0442\u0438\u043c. \u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435 \u2014 \u0432 <a href="' + base + 'info_saita.html">\u043f\u043e\u043b\u0438\u0442\u0438\u043a\u0435 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0438 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445</a>.</div>' +
      '<div class="kmz-cookie-btns"><button type="button" class="kmz-ok">\u041f\u043e\u043d\u044f\u0442\u043d\u043e</button></div>';
    function choose(v) { save(v); box.parentNode && box.parentNode.removeChild(box);
      try { document.dispatchEvent(new CustomEvent("kmz:consent", { detail: v })); } catch (e) {} }
    box.querySelector(".kmz-ok").onclick = function () { choose("accepted"); };
    document.body.appendChild(box);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", show); else show();
  // back button restores the page from memory: hide the notice if the choice was made on another page meanwhile
  window.addEventListener("pageshow", function () {
    var b = document.querySelector(".kmz-cookie"); if (b && read()) b.parentNode.removeChild(b);
  });
})();
