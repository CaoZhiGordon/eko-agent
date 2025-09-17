(() => {
  "use strict";
  var e,
    t,
    r,
    o = {
      3229: (e, t, r) => {
        var o = r(5338),
          n = r(6540),
          l = r(7256),
          a = r(6928);
        (0, o.H)(document.getElementById("root")).render(
          n.createElement(
            n.StrictMode,
            null,
            n.createElement(() => {
              const [e, t] = (0, n.useState)(!1),
                [r, o] = (0, n.useState)([]),
                [i, s] = (0, n.useState)(),
                c = (0, n.useRef)(null),
                [p, u] = (0, n.useState)(
                  'Open Twitter, search for "Fellou AI" and follow',
                ),
                [m, d] = (0, n.useState)(null),
                [g, h] = (0, n.useState)(!1),
                [v, y] = (0, n.useState)("");
              ((0, n.useEffect)(() => {
                chrome.storage.local.get(["running", "prompt"], (e) => {
                  (void 0 !== e.running && t(e.running),
                    void 0 !== e.prompt && u(e.prompt));
                });
                const e = (e) => {
                  if (e)
                    if ("stop" === e.type)
                      (t(!1), chrome.storage.local.set({ running: !1 }));
                    else if ("log" === e.type) {
                      const t = {
                        time: new Date().toLocaleTimeString(),
                        log: e.log,
                        level: e.level || "info",
                      };
                      e.stream ? s(t) : (s(null), o((e) => [...e, t]));
                    }
                    else if ("workflow_confirmation" === e.type) {
                      d(e.workflow);
                      y(e.workflow.xml || JSON.stringify(e.workflow, null, 2));
                    }
                };
                return (
                  chrome.runtime.onMessage.addListener(e),
                  () => {
                    chrome.runtime.onMessage.removeListener(e);
                  }
                );
              }, []),
                (0, n.useEffect)(() => {
                  window.scrollTo({
                    behavior: "smooth",
                    top: document.body.scrollHeight,
                  });
                }, [r, i]));
              const f = (e) => {
                switch (e) {
                  case "error":
                    return { color: "#ff4d4f" };
                  case "success":
                    return { color: "#52c41a" };
                  default:
                    return { color: "#1890ff" };
                }
              };
              return n.createElement(
                "div",
                { style: { minHeight: "80px" } },
                n.createElement("div", null, "Prompt:"),
                n.createElement(
                  "div",
                  { style: { textAlign: "center", marginTop: "4px" } },
                  n.createElement(l.A.TextArea, {
                    ref: c,
                    rows: 4,
                    value: p,
                    disabled: e,
                    placeholder: "Your workflow",
                    onChange: (e) => u(e.target.value),
                  }),
                  n.createElement(
                    a.Ay,
                    {
                      type: "primary",
                      onClick: () => {
                        if (e)
                          return (
                            t(!1),
                            chrome.storage.local.set({
                              running: !1,
                              prompt: p,
                            }),
                            void chrome.runtime.sendMessage({ type: "stop" })
                          );
                        p.trim() &&
                          (o([]),
                          t(!0),
                          chrome.storage.local.set({ running: !0, prompt: p }),
                          chrome.runtime.sendMessage({
                            type: "run",
                            prompt: p.trim(),
                          }));
                      },
                      style: {
                        marginTop: "8px",
                        background: e ? "#6666" : "#1677ff",
                      },
                    },
                    e ? "Running..." : "Run",
                  ),
                ),
                m &&
                  n.createElement(
                    "div",
                    {
                      style: {
                        marginTop: "16px",
                        border: "2px solid #1677ff",
                        borderRadius: "8px",
                        padding: "12px",
                        backgroundColor: "#f0f8ff",
                      },
                    },
                    n.createElement(
                      "div",
                      { 
                        style: { 
                          fontWeight: "bold", 
                          marginBottom: "8px",
                          color: "#1677ff",
                          fontSize: "14px"
                        } 
                      },
                      "🤖 AI Generated Plan - Please Review:"
                    ),
                    n.createElement(l.A.TextArea, {
                      rows: 8,
                      value: v,
                      onChange: (e) => y(e.target.value),
                      style: { 
                        marginBottom: "12px",
                        fontFamily: "monospace",
                        fontSize: "12px"
                      },
                      placeholder: "Plan details will appear here..."
                    }),
                    n.createElement(
                      "div",
                      { style: { display: "flex", gap: "8px", justifyContent: "center" } },
                      n.createElement(
                        a.Ay,
                        {
                          type: "primary",
                          onClick: () => {
                            chrome.runtime.sendMessage({
                              type: "workflow_confirmed",
                              workflow: { ...m, xml: v }
                            });
                            d(null);
                            y("");
                          },
                          style: { background: "#52c41a", borderColor: "#52c41a" }
                        },
                        "✅ Confirm & Execute"
                      ),
                      n.createElement(
                        a.Ay,
                        {
                          onClick: () => {
                            chrome.runtime.sendMessage({
                              type: "workflow_modified",
                              workflow: { ...m, xml: v }
                            });
                            d(null);
                            y("");
                          }
                        },
                        "✏️ Apply Changes"
                      ),
                      n.createElement(
                        a.Ay,
                        {
                          danger: !0,
                          onClick: () => {
                            d(null);
                            y("");
                            chrome.runtime.sendMessage({ type: "stop" });
                          }
                        },
                        "❌ Cancel"
                      )
                    )
                  ),
                r.length > 0 &&
                  n.createElement(
                    "div",
                    {
                      style: {
                        marginTop: "16px",
                        textAlign: "left",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        padding: "8px",
                        overflowY: "auto",
                        backgroundColor: "#f5f5f5",
                      },
                    },
                    n.createElement(
                      "div",
                      { style: { fontWeight: "bold", marginBottom: "8px" } },
                      "Logs:",
                    ),
                    r.map((e, t) =>
                      n.createElement(
                        "pre",
                        {
                          key: t,
                          style: {
                            margin: "4px 0",
                            fontSize: "12px",
                            fontFamily: "monospace",
                            whiteSpace: "pre-wrap",
                            ...f(e.level || "info"),
                          },
                        },
                        n.createElement(
                          "span",
                          { style: { color: "#6666" } },
                          "[",
                          e.time,
                          "] ",
                        ),
                        n.createElement("span", null, e.log),
                      ),
                    ),
                    i &&
                      n.createElement(
                        "pre",
                        {
                          style: {
                            margin: "4px 0",
                            fontSize: "12px",
                            fontFamily: "monospace",
                            whiteSpace: "pre-wrap",
                            ...f(i.level || "info"),
                          },
                        },
                        n.createElement(
                          "span",
                          { style: { color: "#6666" } },
                          "[",
                          i.time,
                          "] ",
                        ),
                        n.createElement("span", null, i.log),
                      ),
                  ),
              );
            }, null),
          ),
        );
      },
    },
    n = {};
  function l(e) {
    var t = n[e];
    if (void 0 !== t) return t.exports;
    var r = (n[e] = { exports: {} });
    return (o[e](r, r.exports, l), r.exports);
  }
  ((l.m = o),
    (e = []),
    (l.O = (t, r, o, n) => {
      if (!r) {
        var a = 1 / 0;
        for (p = 0; p < e.length; p++) {
          for (var [r, o, n] = e[p], i = !0, s = 0; s < r.length; s++)
            (!1 & n || a >= n) && Object.keys(l.O).every((e) => l.O[e](r[s]))
              ? r.splice(s--, 1)
              : ((i = !1), n < a && (a = n));
          if (i) {
            e.splice(p--, 1);
            var c = o();
            void 0 !== c && (t = c);
          }
        }
        return t;
      }
      n = n || 0;
      for (var p = e.length; p > 0 && e[p - 1][2] > n; p--) e[p] = e[p - 1];
      e[p] = [r, o, n];
    }),
    (l.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return (l.d(t, { a: t }), t);
    }),
    (r = Object.getPrototypeOf
      ? (e) => Object.getPrototypeOf(e)
      : (e) => e.__proto__),
    (l.t = function (e, o) {
      if ((1 & o && (e = this(e)), 8 & o)) return e;
      if ("object" == typeof e && e) {
        if (4 & o && e.__esModule) return e;
        if (16 & o && "function" == typeof e.then) return e;
      }
      var n = Object.create(null);
      l.r(n);
      var a = {};
      t = t || [null, r({}), r([]), r(r)];
      for (var i = 2 & o && e; "object" == typeof i && !~t.indexOf(i); i = r(i))
        Object.getOwnPropertyNames(i).forEach((t) => (a[t] = () => e[t]));
      return ((a.default = () => e), l.d(n, a), n);
    }),
    (l.d = (e, t) => {
      for (var r in t)
        l.o(t, r) &&
          !l.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (l.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (l.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (l.r = (e) => {
      ("undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 }));
    }),
    (l.j = 61),
    (() => {
      var e = { 61: 0 };
      l.O.j = (t) => 0 === e[t];
      var t = (t, r) => {
          var o,
            n,
            [a, i, s] = r,
            c = 0;
          if (a.some((t) => 0 !== e[t])) {
            for (o in i) l.o(i, o) && (l.m[o] = i[o]);
            if (s) var p = s(l);
          }
          for (t && t(r); c < a.length; c++)
            ((n = a[c]), l.o(e, n) && e[n] && e[n][0](), (e[n] = 0));
          return l.O(p);
        },
        r = (self.webpackChunk_eko_ai_eko_extension_example =
          self.webpackChunk_eko_ai_eko_extension_example || []);
      (r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r))));
    })());
  var a = l.O(void 0, [121], () => l(3229));
  a = l.O(a);
})();
