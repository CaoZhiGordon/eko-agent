(() => {
  "use strict";
  var e,
    l,
    t,
    a = {
      1923: (e, l, t) => {
        var a = t(6540),
          o = t(5338),
          n = t(1961),
          r = t(3213),
          i = t(5587),
          p = t(9263),
          u = t(7256),
          s = t(1062),
          c = t(6928);
        const { Option: m } = n.A;
        (0, o.H)(document.getElementById("root")).render(
          a.createElement(
            a.StrictMode,
            null,
            a.createElement(() => {
              const [e] = r.A.useForm(),
                [l, t] = (0, a.useState)({
                  llm: "anthropic",
                  apiKey: "",
                  modelName: "claude-sonnet-4-20250514",
                  options: { baseURL: "https://api.anthropic.com/v1" },
                });
              (0, a.useEffect)(() => {
                chrome.storage.sync.get(["llmConfig"], (l) => {
                  l.llmConfig &&
                    ("" === l.llmConfig.llm && (l.llmConfig.llm = "anthropic"),
                    t(l.llmConfig),
                    e.setFieldsValue(l.llmConfig));
                });
              }, []);
              const o = {
                anthropic: [
                  {
                    value: "claude-sonnet-4-20250514",
                    label: "Claude Sonnet 4 (default)",
                  },
                  {
                    value: "claude-3-7-sonnet-20250219",
                    label: "Claude 3.7 Sonnet",
                  },
                ],
                openai: [
                  { value: "gpt-5", label: "gpt-5 (default)" },
                  { value: "gpt-5-mini", label: "gpt-5-mini" },
                  { value: "gpt-4.1", label: "gpt-4.1" },
                  { value: "gpt-4.1-mini", label: "gpt-4.1-mini" },
                  { value: "o4-mini", label: "o4-mini" },
                ],
                openrouter: [
                  {
                    value: "anthropic/claude-sonnet-4",
                    label: "claude-sonnet-4 (default)",
                  },
                  {
                    value: "anthropic/claude-3.7-sonnet",
                    label: "claude-3.7-sonnet (default)",
                  },
                  { value: "google/gemini-2.5-pro", label: "gemini-2.5-pro" },
                  { value: "openai/gpt-5", label: "gpt-5" },
                  { value: "openai/gpt-5-mini", label: "gpt-5-mini" },
                  { value: "openai/gpt-4.1", label: "gpt-4.1" },
                  { value: "openai/o4-mini", label: "o4-mini" },
                  { value: "openai/gpt-4.1-mini", label: "gpt-4.1-mini" },
                  { value: "x-ai/grok-4", label: "grok-4" },
                ],
                "openai-compatible": [
                  {
                    value: "doubao-seed-1-6-250615",
                    label: "doubao-seed-1-6-250615",
                  },
                ],
              };
              return a.createElement(
                "div",
                { className: "p-6 max-w-xl mx-auto" },
                a.createElement(
                  p.A,
                  { title: "Model Config", className: "shadow-md" },
                  a.createElement(
                    r.A,
                    { form: e, layout: "vertical", initialValues: l },
                    a.createElement(
                      r.A.Item,
                      {
                        name: "llm",
                        label: "LLM",
                        rules: [
                          { required: !0, message: "Please select a LLM" },
                        ],
                      },
                      a.createElement(
                        n.A,
                        {
                          placeholder: "Choose a LLM",
                          onChange: (l) => {
                            const a = {
                              llm: l,
                              apiKey: "",
                              modelName: o[l][0].value,
                              options: {
                                baseURL: {
                                  openai: "https://api.openai.com/v1",
                                  anthropic: "https://api.anthropic.com/v1",
                                  openrouter: "https://openrouter.ai/api/v1",
                                  "openai-compatible":
                                    "https://openrouter.ai/api/v1",
                                }[l],
                              },
                            };
                            (t(a), e.setFieldsValue(a));
                          },
                        },
                        [
                          { value: "anthropic", label: "Claude (default)" },
                          { value: "openai", label: "OpenAI" },
                          { value: "openrouter", label: "OpenRouter" },
                          {
                            value: "openai-compatible",
                            label: "OpenAI Compatible",
                          },
                        ].map((e) =>
                          a.createElement(
                            m,
                            { key: e.value, value: e.value },
                            e.label,
                          ),
                        ),
                      ),
                    ),
                    a.createElement(
                      r.A.Item,
                      {
                        name: ["options", "baseURL"],
                        label: "Base URL",
                        rules: [
                          {
                            required: !0,
                            message: "Please enter the base URL",
                          },
                        ],
                      },
                      a.createElement(u.A, {
                        placeholder: "Please enter the base URL",
                      }),
                    ),
                    a.createElement(
                      r.A.Item,
                      {
                        name: "modelName",
                        label: "Model Name",
                        rules: [
                          { required: !0, message: "Please select a model" },
                        ],
                      },
                      a.createElement(s.A, {
                        placeholder: "Model name",
                        options: o[l.llm],
                        filterOption: (e, l) =>
                          -1 !== l.value.toUpperCase().indexOf(e.toUpperCase()),
                      }),
                    ),
                    a.createElement(
                      r.A.Item,
                      {
                        name: "apiKey",
                        label: "API Key",
                        rules: [
                          { required: !0, message: "Please enter the API Key" },
                        ],
                      },
                      a.createElement(u.A.Password, {
                        placeholder: "Please enter the API Key",
                        allowClear: !0,
                      }),
                    ),
                    a.createElement(
                      r.A.Item,
                      null,
                      a.createElement(
                        c.Ay,
                        {
                          type: "primary",
                          onClick: () => {
                            e.validateFields()
                              .then((e) => {
                                (t(e),
                                  chrome.storage.sync.set(
                                    { llmConfig: e },
                                    () => {
                                      i.Ay.success("Save Success!");
                                    },
                                  ));
                              })
                              .catch(() => {
                                i.Ay.error("Please check the form field");
                              });
                          },
                          block: !0,
                        },
                        "Save",
                      ),
                    ),
                  ),
                ),
              );
            }, null),
          ),
        );
      },
    },
    o = {};
  function n(e) {
    var l = o[e];
    if (void 0 !== l) return l.exports;
    var t = (o[e] = { exports: {} });
    return (a[e](t, t.exports, n), t.exports);
  }
  ((n.m = a),
    (e = []),
    (n.O = (l, t, a, o) => {
      if (!t) {
        var r = 1 / 0;
        for (s = 0; s < e.length; s++) {
          for (var [t, a, o] = e[s], i = !0, p = 0; p < t.length; p++)
            (!1 & o || r >= o) && Object.keys(n.O).every((e) => n.O[e](t[p]))
              ? t.splice(p--, 1)
              : ((i = !1), o < r && (r = o));
          if (i) {
            e.splice(s--, 1);
            var u = a();
            void 0 !== u && (l = u);
          }
        }
        return l;
      }
      o = o || 0;
      for (var s = e.length; s > 0 && e[s - 1][2] > o; s--) e[s] = e[s - 1];
      e[s] = [t, a, o];
    }),
    (n.n = (e) => {
      var l = e && e.__esModule ? () => e.default : () => e;
      return (n.d(l, { a: l }), l);
    }),
    (t = Object.getPrototypeOf
      ? (e) => Object.getPrototypeOf(e)
      : (e) => e.__proto__),
    (n.t = function (e, a) {
      if ((1 & a && (e = this(e)), 8 & a)) return e;
      if ("object" == typeof e && e) {
        if (4 & a && e.__esModule) return e;
        if (16 & a && "function" == typeof e.then) return e;
      }
      var o = Object.create(null);
      n.r(o);
      var r = {};
      l = l || [null, t({}), t([]), t(t)];
      for (var i = 2 & a && e; "object" == typeof i && !~l.indexOf(i); i = t(i))
        Object.getOwnPropertyNames(i).forEach((l) => (r[l] = () => e[l]));
      return ((r.default = () => e), n.d(o, r), o);
    }),
    (n.d = (e, l) => {
      for (var t in l)
        n.o(l, t) &&
          !n.o(e, t) &&
          Object.defineProperty(e, t, { enumerable: !0, get: l[t] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (e, l) => Object.prototype.hasOwnProperty.call(e, l)),
    (n.r = (e) => {
      ("undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 }));
    }),
    (n.j = 575),
    (() => {
      var e = { 575: 0 };
      n.O.j = (l) => 0 === e[l];
      var l = (l, t) => {
          var a,
            o,
            [r, i, p] = t,
            u = 0;
          if (r.some((l) => 0 !== e[l])) {
            for (a in i) n.o(i, a) && (n.m[a] = i[a]);
            if (p) var s = p(n);
          }
          for (l && l(t); u < r.length; u++)
            ((o = r[u]), n.o(e, o) && e[o] && e[o][0](), (e[o] = 0));
          return n.O(s);
        },
        t = (self.webpackChunk_eko_ai_eko_extension_example =
          self.webpackChunk_eko_ai_eko_extension_example || []);
      (t.forEach(l.bind(null, 0)), (t.push = l.bind(null, t.push.bind(t))));
    })());
  var r = n.O(void 0, [121], () => n(1923));
  r = n.O(r);
})();
