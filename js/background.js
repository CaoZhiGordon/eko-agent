(() => {
  "use strict";
  const e = "mac";
  var t;
  !(function (e) {
    ((e[(e.DEBUG = 0)] = "DEBUG"),
      (e[(e.INFO = 1)] = "INFO"),
      (e[(e.WARN = 2)] = "WARN"),
      (e[(e.ERROR = 3)] = "ERROR"),
      (e[(e.FATAL = 4)] = "FATAL"),
      (e[(e.OFF = 5)] = "OFF"));
  })(t || (t = {}));
  class n {
    log(e, n) {
      (
        ({
          [t.DEBUG]: console.debug,
          [t.INFO]: console.info,
          [t.WARN]: console.warn,
          [t.ERROR]: console.error,
          [t.FATAL]: console.error,
          [t.OFF]: () => {},
        })[e] || console.log
      )(n);
    }
  }
  class r {
    constructor(e = {}) {
      ((this.level = e.level ?? t.INFO),
        (this.prefix = e.prefix ?? ""),
        (this.dateFormat = e.dateFormat ?? !0),
        (this.transports = e.transport ?? [new n()]));
    }
    setLevel(e) {
      return ((this.level = e), this);
    }
    setPrefix(e) {
      return ((this.prefix = e), this);
    }
    addTransport(e) {
      return (this.transports.push(e), this);
    }
    formatMessage(e, n) {
      const r = {
        [t.DEBUG]: "DEBUG",
        [t.INFO]: "INFO",
        [t.WARN]: "WARN",
        [t.ERROR]: "ERROR",
        [t.FATAL]: "FATAL",
        [t.OFF]: "OFF",
      };
      let o = "";
      return (
        this.dateFormat && (o += `[${new Date().toLocaleString()}] `),
        (o += `[${r[e] || "UNKNOWN"}] `),
        this.prefix && (o += `[${this.prefix}] `),
        (o += n),
        o
      );
    }
    log(e, t, ...n) {
      if (e < this.level) return;
      let r;
      ((r = t instanceof Error ? `${t.message}\n${t.stack}` : t),
        n.length > 0 &&
          (r +=
            " " +
            n
              .map((e) =>
                null == e || null == e
                  ? e + ""
                  : e instanceof Error || (e.stack && e.message)
                    ? `${e.message}\n${e.stack}`
                    : "object" == typeof e
                      ? JSON.stringify(e)
                      : String(e),
              )
              .join(" ")));
      const o = this.formatMessage(e, r);
      this.transports.forEach((t) => {
        t.log(e, o);
      });
    }
    isEnableDebug() {
      return this.level <= t.DEBUG;
    }
    debug(e, ...n) {
      this.log(t.DEBUG, e, ...n);
    }
    isEnableInfo() {
      return this.level <= t.INFO;
    }
    info(e, ...n) {
      this.log(t.INFO, e, ...n);
    }
    warn(e, ...n) {
      this.log(t.WARN, e, ...n);
    }
    error(e, ...n) {
      this.log(t.ERROR, e, ...n);
    }
    fatal(e, ...n) {
      this.log(t.FATAL, e, ...n);
    }
    createChild(e, t = {}) {
      const n = this.prefix ? `${this.prefix}.${e}` : e;
      return new r({
        level: t.level || this.level,
        prefix: n,
        dateFormat: void 0 !== t.dateFormat ? t.dateFormat : this.dateFormat,
        transport: t.transport || this.transports,
      });
    }
  }
  const o = new r();
  var i,
    a = "vercel.ai.error",
    s = Symbol.for(a),
    l = class e extends Error {
      constructor({ name: e, message: t, cause: n }) {
        (super(t), (this[i] = !0), (this.name = e), (this.cause = n));
      }
      static isInstance(t) {
        return e.hasMarker(t, a);
      }
      static hasMarker(e, t) {
        const n = Symbol.for(t);
        return (
          null != e &&
          "object" == typeof e &&
          n in e &&
          "boolean" == typeof e[n] &&
          !0 === e[n]
        );
      }
    };
  i = s;
  var u,
    c = l,
    d = "AI_APICallError",
    p = `vercel.ai.error.${d}`,
    m = Symbol.for(p),
    h = class extends c {
      constructor({
        message: e,
        url: t,
        requestBodyValues: n,
        statusCode: r,
        responseHeaders: o,
        responseBody: i,
        cause: a,
        isRetryable: s = null != r &&
          (408 === r || 409 === r || 429 === r || r >= 500),
        data: l,
      }) {
        (super({ name: d, message: e, cause: a }),
          (this[u] = !0),
          (this.url = t),
          (this.requestBodyValues = n),
          (this.statusCode = r),
          (this.responseHeaders = o),
          (this.responseBody = i),
          (this.isRetryable = s),
          (this.data = l));
      }
      static isInstance(e) {
        return c.hasMarker(e, p);
      }
    };
  u = m;
  var g,
    f = "AI_EmptyResponseBodyError",
    v = `vercel.ai.error.${f}`,
    y = Symbol.for(v),
    b = class extends c {
      constructor({ message: e = "Empty response body" } = {}) {
        (super({ name: f, message: e }), (this[g] = !0));
      }
      static isInstance(e) {
        return c.hasMarker(e, v);
      }
    };
  function _(e) {
    return null == e
      ? "unknown error"
      : "string" == typeof e
        ? e
        : e instanceof Error
          ? e.message
          : JSON.stringify(e);
  }
  g = y;
  var w,
    k = "AI_InvalidArgumentError",
    x = `vercel.ai.error.${k}`,
    $ = Symbol.for(x),
    I = class extends c {
      constructor({ message: e, cause: t, argument: n }) {
        (super({ name: k, message: e, cause: t }),
          (this[w] = !0),
          (this.argument = n));
      }
      static isInstance(e) {
        return c.hasMarker(e, x);
      }
    };
  w = $;
  var S,
    T = "AI_InvalidPromptError",
    N = `vercel.ai.error.${T}`,
    O = Symbol.for(N),
    E = class extends c {
      constructor({ prompt: e, message: t, cause: n }) {
        (super({ name: T, message: `Invalid prompt: ${t}`, cause: n }),
          (this[S] = !0),
          (this.prompt = e));
      }
      static isInstance(e) {
        return c.hasMarker(e, N);
      }
    };
  S = O;
  var A,
    U = "AI_InvalidResponseDataError",
    C = `vercel.ai.error.${U}`,
    P = Symbol.for(C),
    D = class extends c {
      constructor({
        data: e,
        message: t = `Invalid response data: ${JSON.stringify(e)}.`,
      }) {
        (super({ name: U, message: t }), (this[A] = !0), (this.data = e));
      }
      static isInstance(e) {
        return c.hasMarker(e, C);
      }
    };
  A = P;
  var j,
    z = "AI_JSONParseError",
    R = `vercel.ai.error.${z}`,
    M = Symbol.for(R),
    q = class extends c {
      constructor({ text: e, cause: t }) {
        (super({
          name: z,
          message: `JSON parsing failed: Text: ${e}.\nError message: ${_(t)}`,
          cause: t,
        }),
          (this[j] = !0),
          (this.text = e));
      }
      static isInstance(e) {
        return c.hasMarker(e, R);
      }
    };
  j = M;
  var Z,
    L = "AI_LoadAPIKeyError",
    F = `vercel.ai.error.${L}`,
    B = Symbol.for(F),
    W = class extends c {
      constructor({ message: e }) {
        (super({ name: L, message: e }), (this[Z] = !0));
      }
      static isInstance(e) {
        return c.hasMarker(e, F);
      }
    };
  Z = B;
  var H,
    V = "AI_LoadSettingError",
    J = `vercel.ai.error.${V}`,
    K = Symbol.for(J),
    G = class extends c {
      constructor({ message: e }) {
        (super({ name: V, message: e }), (this[H] = !0));
      }
      static isInstance(e) {
        return c.hasMarker(e, J);
      }
    };
  H = K;
  var X,
    Y = "AI_NoSuchModelError",
    Q = `vercel.ai.error.${Y}`,
    ee = Symbol.for(Q),
    te = class extends c {
      constructor({
        errorName: e = Y,
        modelId: t,
        modelType: n,
        message: r = `No such ${n}: ${t}`,
      }) {
        (super({ name: e, message: r }),
          (this[X] = !0),
          (this.modelId = t),
          (this.modelType = n));
      }
      static isInstance(e) {
        return c.hasMarker(e, Q);
      }
    };
  X = ee;
  var ne,
    re = "AI_TooManyEmbeddingValuesForCallError",
    oe = `vercel.ai.error.${re}`,
    ie = Symbol.for(oe),
    ae = class extends c {
      constructor(e) {
        (super({
          name: re,
          message: `Too many values for a single embedding call. The ${e.provider} model "${e.modelId}" can only embed up to ${e.maxEmbeddingsPerCall} values per call, but ${e.values.length} values were provided.`,
        }),
          (this[ne] = !0),
          (this.provider = e.provider),
          (this.modelId = e.modelId),
          (this.maxEmbeddingsPerCall = e.maxEmbeddingsPerCall),
          (this.values = e.values));
      }
      static isInstance(e) {
        return c.hasMarker(e, oe);
      }
    };
  ne = ie;
  var se,
    le = "AI_TypeValidationError",
    ue = `vercel.ai.error.${le}`,
    ce = Symbol.for(ue);
  se = ce;
  var de,
    pe = class e extends c {
      constructor({ value: e, cause: t }) {
        (super({
          name: le,
          message: `Type validation failed: Value: ${JSON.stringify(e)}.\nError message: ${_(t)}`,
          cause: t,
        }),
          (this[se] = !0),
          (this.value = e));
      }
      static isInstance(e) {
        return c.hasMarker(e, ue);
      }
      static wrap({ value: t, cause: n }) {
        return e.isInstance(n) && n.value === t
          ? n
          : new e({ value: t, cause: n });
      }
    },
    me = "AI_UnsupportedFunctionalityError",
    he = `vercel.ai.error.${me}`,
    ge = Symbol.for(he),
    fe = class extends c {
      constructor({
        functionality: e,
        message: t = `'${e}' functionality not supported.`,
      }) {
        (super({ name: me, message: t }),
          (this[de] = !0),
          (this.functionality = e));
      }
      static isInstance(e) {
        return c.hasMarker(e, he);
      }
    };
  de = ge;
  let ve = class extends Error {
    constructor(e, t) {
      (super(e),
        (this.name = "ParseError"),
        (this.type = t.type),
        (this.field = t.field),
        (this.value = t.value),
        (this.line = t.line));
    }
  };
  function ye(e) {}
  let be = class extends TransformStream {
    constructor({ onError: e, onRetry: t, onComment: n } = {}) {
      let r;
      super({
        start(o) {
          r = (function (e) {
            if ("function" == typeof e)
              throw new TypeError(
                "`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?",
              );
            const {
              onEvent: t = ye,
              onError: n = ye,
              onRetry: r = ye,
              onComment: o,
            } = e;
            let i,
              a = "",
              s = !0,
              l = "",
              u = "";
            function c(e) {
              if ("" === e)
                return (
                  l.length > 0 &&
                    t({
                      id: i,
                      event: u || void 0,
                      data: l.endsWith("\n") ? l.slice(0, -1) : l,
                    }),
                  (i = void 0),
                  (l = ""),
                  void (u = "")
                );
              if (e.startsWith(":"))
                return void (o && o(e.slice(e.startsWith(": ") ? 2 : 1)));
              const n = e.indexOf(":");
              if (-1 === n) d(e, "", e);
              else {
                const t = e.slice(0, n),
                  r = " " === e[n + 1] ? 2 : 1;
                d(t, e.slice(n + r), e);
              }
            }
            function d(e, t, o) {
              switch (e) {
                case "event":
                  u = t;
                  break;
                case "data":
                  l = `${l}${t}\n`;
                  break;
                case "id":
                  i = t.includes("\0") ? void 0 : t;
                  break;
                case "retry":
                  /^\d+$/.test(t)
                    ? r(parseInt(t, 10))
                    : n(
                        new ve(`Invalid \`retry\` value: "${t}"`, {
                          type: "invalid-retry",
                          value: t,
                          line: o,
                        }),
                      );
                  break;
                default:
                  n(
                    new ve(
                      `Unknown field "${e.length > 20 ? `${e.slice(0, 20)}…` : e}"`,
                      { type: "unknown-field", field: e, value: t, line: o },
                    ),
                  );
              }
            }
            return {
              feed: function (e) {
                const t = s ? e.replace(/^\xEF\xBB\xBF/, "") : e,
                  [n, r] = (function (e) {
                    const t = [];
                    let n = "",
                      r = 0;
                    for (; r < e.length; ) {
                      const o = e.indexOf("\r", r),
                        i = e.indexOf("\n", r);
                      let a = -1;
                      if (
                        (-1 !== o && -1 !== i
                          ? (a = Math.min(o, i))
                          : -1 !== o
                            ? (a = o)
                            : -1 !== i && (a = i),
                        -1 === a)
                      ) {
                        n = e.slice(r);
                        break;
                      }
                      {
                        const n = e.slice(r, a);
                        (t.push(n),
                          (r = a + 1),
                          "\r" === e[r - 1] && "\n" === e[r] && r++);
                      }
                    }
                    return [t, n];
                  })(`${a}${t}`);
                for (const e of n) c(e);
                ((a = r), (s = !1));
              },
              reset: function (e = {}) {
                (a && e.consume && c(a),
                  (s = !0),
                  (i = void 0),
                  (l = ""),
                  (u = ""),
                  (a = ""));
              },
            };
          })({
            onEvent: (e) => {
              o.enqueue(e);
            },
            onError(t) {
              "terminate" === e ? o.error(t) : "function" == typeof e && e(t);
            },
            onRetry: t,
            onComment: n,
          });
        },
        transform(e) {
          r.feed(e);
        },
      });
    }
  };
  const _e = Object.freeze({ status: "aborted" });
  function we(e, t, n) {
    function r(n, r) {
      var o;
      (Object.defineProperty(n, "_zod", {
        value: n._zod ?? {},
        enumerable: !1,
      }),
        (o = n._zod).traits ?? (o.traits = new Set()),
        n._zod.traits.add(e),
        t(n, r));
      for (const e in a.prototype)
        e in n ||
          Object.defineProperty(n, e, { value: a.prototype[e].bind(n) });
      ((n._zod.constr = a), (n._zod.def = r));
    }
    const o = n?.Parent ?? Object;
    class i extends o {}
    function a(e) {
      var t;
      const o = n?.Parent ? new i() : this;
      (r(o, e), (t = o._zod).deferred ?? (t.deferred = []));
      for (const e of o._zod.deferred) e();
      return o;
    }
    return (
      Object.defineProperty(i, "name", { value: e }),
      Object.defineProperty(a, "init", { value: r }),
      Object.defineProperty(a, Symbol.hasInstance, {
        value: (t) =>
          !!(n?.Parent && t instanceof n.Parent) || t?._zod?.traits?.has(e),
      }),
      Object.defineProperty(a, "name", { value: e }),
      a
    );
  }
  const ke = Symbol("zod_brand");
  class xe extends Error {
    constructor() {
      super(
        "Encountered Promise during synchronous parse. Use .parseAsync() instead.",
      );
    }
  }
  const $e = {};
  function Ie(e) {
    return (e && Object.assign($e, e), $e);
  }
  function Se(e) {
    const t = Object.values(e).filter((e) => "number" == typeof e);
    return Object.entries(e)
      .filter(([e, n]) => -1 === t.indexOf(+e))
      .map(([e, t]) => t);
  }
  function Te(e, t = "|") {
    return e.map((e) => Ve(e)).join(t);
  }
  function Ne(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
  }
  function Oe(e) {
    return {
      get value() {
        {
          const t = e();
          return (Object.defineProperty(this, "value", { value: t }), t);
        }
      },
    };
  }
  function Ee(e) {
    return null == e;
  }
  function Ae(e) {
    const t = e.startsWith("^") ? 1 : 0,
      n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
  }
  function Ue(e, t) {
    const n = (e.toString().split(".")[1] || "").length,
      r = t.toString();
    let o = (r.split(".")[1] || "").length;
    if (0 === o && /\d?e-\d?/.test(r)) {
      const e = r.match(/\d?e-(\d?)/);
      e?.[1] && (o = Number.parseInt(e[1]));
    }
    const i = n > o ? n : o;
    return (
      (Number.parseInt(e.toFixed(i).replace(".", "")) %
        Number.parseInt(t.toFixed(i).replace(".", ""))) /
      10 ** i
    );
  }
  const Ce = Symbol("evaluating");
  function Pe(e, t, n) {
    let r;
    Object.defineProperty(e, t, {
      get() {
        if (r !== Ce) return (void 0 === r && ((r = Ce), (r = n())), r);
      },
      set(n) {
        Object.defineProperty(e, t, { value: n });
      },
      configurable: !0,
    });
  }
  function De(e, t, n) {
    Object.defineProperty(e, t, {
      value: n,
      writable: !0,
      enumerable: !0,
      configurable: !0,
    });
  }
  function je(...e) {
    const t = {};
    for (const n of e) {
      const e = Object.getOwnPropertyDescriptors(n);
      Object.assign(t, e);
    }
    return Object.defineProperties({}, t);
  }
  function ze(e) {
    return JSON.stringify(e);
  }
  const Re =
    "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
  function Me(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
  }
  const qe = Oe(() => {
    if (
      "undefined" != typeof navigator &&
      navigator?.userAgent?.includes("Cloudflare")
    )
      return !1;
    try {
      return (new Function(""), !0);
    } catch (e) {
      return !1;
    }
  });
  function Ze(e) {
    if (!1 === Me(e)) return !1;
    const t = e.constructor;
    if (void 0 === t) return !0;
    const n = t.prototype;
    return (
      !1 !== Me(n) &&
      !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf")
    );
  }
  const Le = new Set(["string", "number", "symbol"]),
    Fe = new Set([
      "string",
      "number",
      "bigint",
      "boolean",
      "symbol",
      "undefined",
    ]);
  function Be(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function We(e, t, n) {
    const r = new e._zod.constr(t ?? e._zod.def);
    return ((t && !n?.parent) || (r._zod.parent = e), r);
  }
  function He(e) {
    const t = e;
    if (!t) return {};
    if ("string" == typeof t) return { error: () => t };
    if (void 0 !== t?.message) {
      if (void 0 !== t?.error)
        throw new Error("Cannot specify both `message` and `error` params");
      t.error = t.message;
    }
    return (
      delete t.message,
      "string" == typeof t.error ? { ...t, error: () => t.error } : t
    );
  }
  function Ve(e) {
    return "bigint" == typeof e
      ? e.toString() + "n"
      : "string" == typeof e
        ? `"${e}"`
        : `${e}`;
  }
  function Je(e) {
    return Object.keys(e).filter(
      (t) => "optional" === e[t]._zod.optin && "optional" === e[t]._zod.optout,
    );
  }
  const Ke = {
      safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
      int32: [-2147483648, 2147483647],
      uint32: [0, 4294967295],
      float32: [-34028234663852886e22, 34028234663852886e22],
      float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
    },
    Ge = {
      int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")],
      uint64: [BigInt(0), BigInt("18446744073709551615")],
    };
  function Xe(e, t) {
    const n = e._zod.def;
    return We(
      e,
      je(e._zod.def, {
        get shape() {
          const e = {};
          for (const r in t) {
            if (!(r in n.shape)) throw new Error(`Unrecognized key: "${r}"`);
            t[r] && (e[r] = n.shape[r]);
          }
          return (De(this, "shape", e), e);
        },
        checks: [],
      }),
    );
  }
  function Ye(e, t) {
    const n = e._zod.def,
      r = je(e._zod.def, {
        get shape() {
          const r = { ...e._zod.def.shape };
          for (const e in t) {
            if (!(e in n.shape)) throw new Error(`Unrecognized key: "${e}"`);
            t[e] && delete r[e];
          }
          return (De(this, "shape", r), r);
        },
        checks: [],
      });
    return We(e, r);
  }
  function Qe(e, t) {
    if (!Ze(t))
      throw new Error("Invalid input to extend: expected a plain object");
    const n = je(e._zod.def, {
      get shape() {
        const n = { ...e._zod.def.shape, ...t };
        return (De(this, "shape", n), n);
      },
      checks: [],
    });
    return We(e, n);
  }
  function et(e, t) {
    const n = je(e._zod.def, {
      get shape() {
        const n = { ...e._zod.def.shape, ...t._zod.def.shape };
        return (De(this, "shape", n), n);
      },
      get catchall() {
        return t._zod.def.catchall;
      },
      checks: [],
    });
    return We(e, n);
  }
  function tt(e, t, n) {
    const r = je(t._zod.def, {
      get shape() {
        const r = t._zod.def.shape,
          o = { ...r };
        if (n)
          for (const t in n) {
            if (!(t in r)) throw new Error(`Unrecognized key: "${t}"`);
            n[t] &&
              (o[t] = e ? new e({ type: "optional", innerType: r[t] }) : r[t]);
          }
        else
          for (const t in r)
            o[t] = e ? new e({ type: "optional", innerType: r[t] }) : r[t];
        return (De(this, "shape", o), o);
      },
      checks: [],
    });
    return We(t, r);
  }
  function nt(e, t, n) {
    const r = je(t._zod.def, {
      get shape() {
        const r = t._zod.def.shape,
          o = { ...r };
        if (n)
          for (const t in n) {
            if (!(t in o)) throw new Error(`Unrecognized key: "${t}"`);
            n[t] && (o[t] = new e({ type: "nonoptional", innerType: r[t] }));
          }
        else
          for (const t in r)
            o[t] = new e({ type: "nonoptional", innerType: r[t] });
        return (De(this, "shape", o), o);
      },
      checks: [],
    });
    return We(t, r);
  }
  function rt(e, t = 0) {
    for (let n = t; n < e.issues.length; n++)
      if (!0 !== e.issues[n]?.continue) return !0;
    return !1;
  }
  function ot(e, t) {
    return t.map((t) => {
      var n;
      return ((n = t).path ?? (n.path = []), t.path.unshift(e), t);
    });
  }
  function it(e) {
    return "string" == typeof e ? e : e?.message;
  }
  function at(e, t, n) {
    const r = { ...e, path: e.path ?? [] };
    if (!e.message) {
      const o =
        it(e.inst?._zod.def?.error?.(e)) ??
        it(t?.error?.(e)) ??
        it(n.customError?.(e)) ??
        it(n.localeError?.(e)) ??
        "Invalid input";
      r.message = o;
    }
    return (
      delete r.inst,
      delete r.continue,
      t?.reportInput || delete r.input,
      r
    );
  }
  function st(e) {
    return e instanceof Set
      ? "set"
      : e instanceof Map
        ? "map"
        : e instanceof File
          ? "file"
          : "unknown";
  }
  function lt(e) {
    return Array.isArray(e)
      ? "array"
      : "string" == typeof e
        ? "string"
        : "unknown";
  }
  function ut(...e) {
    const [t, n, r] = e;
    return "string" == typeof t
      ? { message: t, code: "custom", input: n, inst: r }
      : { ...t };
  }
  var ct = Object.freeze({
    __proto__: null,
    BIGINT_FORMAT_RANGES: Ge,
    Class: class {
      constructor(...e) {}
    },
    NUMBER_FORMAT_RANGES: Ke,
    aborted: rt,
    allowsEval: qe,
    assert: function (e) {},
    assertEqual: function (e) {
      return e;
    },
    assertIs: function (e) {},
    assertNever: function (e) {
      throw new Error();
    },
    assertNotEqual: function (e) {
      return e;
    },
    assignProp: De,
    cached: Oe,
    captureStackTrace: Re,
    cleanEnum: function (e) {
      return Object.entries(e)
        .filter(([e, t]) => Number.isNaN(Number.parseInt(e, 10)))
        .map((e) => e[1]);
    },
    cleanRegex: Ae,
    clone: We,
    cloneDef: function (e) {
      return je(e._zod.def);
    },
    createTransparentProxy: function (e) {
      let t;
      return new Proxy(
        {},
        {
          get: (n, r, o) => (t ?? (t = e()), Reflect.get(t, r, o)),
          set: (n, r, o, i) => (t ?? (t = e()), Reflect.set(t, r, o, i)),
          has: (n, r) => (t ?? (t = e()), Reflect.has(t, r)),
          deleteProperty: (n, r) => (
            t ?? (t = e()),
            Reflect.deleteProperty(t, r)
          ),
          ownKeys: (n) => (t ?? (t = e()), Reflect.ownKeys(t)),
          getOwnPropertyDescriptor: (n, r) => (
            t ?? (t = e()),
            Reflect.getOwnPropertyDescriptor(t, r)
          ),
          defineProperty: (n, r, o) => (
            t ?? (t = e()),
            Reflect.defineProperty(t, r, o)
          ),
        },
      );
    },
    defineLazy: Pe,
    esc: ze,
    escapeRegex: Be,
    extend: Qe,
    finalizeIssue: at,
    floatSafeRemainder: Ue,
    getElementAtPath: function (e, t) {
      return t ? t.reduce((e, t) => e?.[t], e) : e;
    },
    getEnumValues: Se,
    getLengthableOrigin: lt,
    getParsedType: (e) => {
      const t = typeof e;
      switch (t) {
        case "undefined":
          return "undefined";
        case "string":
          return "string";
        case "number":
          return Number.isNaN(e) ? "nan" : "number";
        case "boolean":
          return "boolean";
        case "function":
          return "function";
        case "bigint":
          return "bigint";
        case "symbol":
          return "symbol";
        case "object":
          return Array.isArray(e)
            ? "array"
            : null === e
              ? "null"
              : e.then &&
                  "function" == typeof e.then &&
                  e.catch &&
                  "function" == typeof e.catch
                ? "promise"
                : "undefined" != typeof Map && e instanceof Map
                  ? "map"
                  : "undefined" != typeof Set && e instanceof Set
                    ? "set"
                    : "undefined" != typeof Date && e instanceof Date
                      ? "date"
                      : "undefined" != typeof File && e instanceof File
                        ? "file"
                        : "object";
        default:
          throw new Error(`Unknown data type: ${t}`);
      }
    },
    getSizableOrigin: st,
    isObject: Me,
    isPlainObject: Ze,
    issue: ut,
    joinValues: Te,
    jsonStringifyReplacer: Ne,
    merge: et,
    mergeDefs: je,
    normalizeParams: He,
    nullish: Ee,
    numKeys: function (e) {
      let t = 0;
      for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
      return t;
    },
    omit: Ye,
    optionalKeys: Je,
    partial: tt,
    pick: Xe,
    prefixIssues: ot,
    primitiveTypes: Fe,
    promiseAllObject: function (e) {
      const t = Object.keys(e),
        n = t.map((t) => e[t]);
      return Promise.all(n).then((e) => {
        const n = {};
        for (let r = 0; r < t.length; r++) n[t[r]] = e[r];
        return n;
      });
    },
    propertyKeyTypes: Le,
    randomString: function (e = 10) {
      let t = "";
      for (let n = 0; n < e; n++)
        t += "abcdefghijklmnopqrstuvwxyz"[Math.floor(26 * Math.random())];
      return t;
    },
    required: nt,
    stringifyPrimitive: Ve,
    unwrapMessage: it,
  });
  const dt = (e, t) => {
      ((e.name = "$ZodError"),
        Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
        Object.defineProperty(e, "issues", { value: t, enumerable: !1 }),
        (e.message = JSON.stringify(t, Ne, 2)),
        Object.defineProperty(e, "toString", {
          value: () => e.message,
          enumerable: !1,
        }));
    },
    pt = we("$ZodError", dt),
    mt = we("$ZodError", dt, { Parent: Error });
  function ht(e, t = (e) => e.message) {
    const n = {},
      r = [];
    for (const o of e.issues)
      o.path.length > 0
        ? ((n[o.path[0]] = n[o.path[0]] || []), n[o.path[0]].push(t(o)))
        : r.push(t(o));
    return { formErrors: r, fieldErrors: n };
  }
  function gt(e, t) {
    const n =
        t ||
        function (e) {
          return e.message;
        },
      r = { _errors: [] },
      o = (e) => {
        for (const t of e.issues)
          if ("invalid_union" === t.code && t.errors.length)
            t.errors.map((e) => o({ issues: e }));
          else if ("invalid_key" === t.code) o({ issues: t.issues });
          else if ("invalid_element" === t.code) o({ issues: t.issues });
          else if (0 === t.path.length) r._errors.push(n(t));
          else {
            let e = r,
              o = 0;
            for (; o < t.path.length; ) {
              const r = t.path[o];
              (o === t.path.length - 1
                ? ((e[r] = e[r] || { _errors: [] }), e[r]._errors.push(n(t)))
                : (e[r] = e[r] || { _errors: [] }),
                (e = e[r]),
                o++);
            }
          }
      };
    return (o(e), r);
  }
  function ft(e, t) {
    const n =
        t ||
        function (e) {
          return e.message;
        },
      r = { errors: [] },
      o = (e, t = []) => {
        var i, a;
        for (const s of e.issues)
          if ("invalid_union" === s.code && s.errors.length)
            s.errors.map((e) => o({ issues: e }, s.path));
          else if ("invalid_key" === s.code) o({ issues: s.issues }, s.path);
          else if ("invalid_element" === s.code)
            o({ issues: s.issues }, s.path);
          else {
            const e = [...t, ...s.path];
            if (0 === e.length) {
              r.errors.push(n(s));
              continue;
            }
            let o = r,
              l = 0;
            for (; l < e.length; ) {
              const t = e[l],
                r = l === e.length - 1;
              ("string" == typeof t
                ? (o.properties ?? (o.properties = {}),
                  (i = o.properties)[t] ?? (i[t] = { errors: [] }),
                  (o = o.properties[t]))
                : (o.items ?? (o.items = []),
                  (a = o.items)[t] ?? (a[t] = { errors: [] }),
                  (o = o.items[t])),
                r && o.errors.push(n(s)),
                l++);
            }
          }
      };
    return (o(e), r);
  }
  function vt(e) {
    const t = [],
      n = e.map((e) => ("object" == typeof e ? e.key : e));
    for (const e of n)
      "number" == typeof e
        ? t.push(`[${e}]`)
        : "symbol" == typeof e
          ? t.push(`[${JSON.stringify(String(e))}]`)
          : /[^\w$]/.test(e)
            ? t.push(`[${JSON.stringify(e)}]`)
            : (t.length && t.push("."), t.push(e));
    return t.join("");
  }
  function yt(e) {
    const t = [],
      n = [...e.issues].sort(
        (e, t) => (e.path ?? []).length - (t.path ?? []).length,
      );
    for (const e of n)
      (t.push(`✖ ${e.message}`),
        e.path?.length && t.push(`  → at ${vt(e.path)}`));
    return t.join("\n");
  }
  const bt = (e) => (t, n, r, o) => {
      const i = r ? Object.assign(r, { async: !1 }) : { async: !1 },
        a = t._zod.run({ value: n, issues: [] }, i);
      if (a instanceof Promise) throw new xe();
      if (a.issues.length) {
        const t = new (o?.Err ?? e)(a.issues.map((e) => at(e, i, Ie())));
        throw (Re(t, o?.callee), t);
      }
      return a.value;
    },
    _t = bt(mt),
    wt = (e) => async (t, n, r, o) => {
      const i = r ? Object.assign(r, { async: !0 }) : { async: !0 };
      let a = t._zod.run({ value: n, issues: [] }, i);
      if ((a instanceof Promise && (a = await a), a.issues.length)) {
        const t = new (o?.Err ?? e)(a.issues.map((e) => at(e, i, Ie())));
        throw (Re(t, o?.callee), t);
      }
      return a.value;
    },
    kt = wt(mt),
    xt = (e) => (t, n, r) => {
      const o = r ? { ...r, async: !1 } : { async: !1 },
        i = t._zod.run({ value: n, issues: [] }, o);
      if (i instanceof Promise) throw new xe();
      return i.issues.length
        ? {
            success: !1,
            error: new (e ?? pt)(i.issues.map((e) => at(e, o, Ie()))),
          }
        : { success: !0, data: i.value };
    },
    $t = xt(mt),
    It = (e) => async (t, n, r) => {
      const o = r ? Object.assign(r, { async: !0 }) : { async: !0 };
      let i = t._zod.run({ value: n, issues: [] }, o);
      return (
        i instanceof Promise && (i = await i),
        i.issues.length
          ? { success: !1, error: new e(i.issues.map((e) => at(e, o, Ie()))) }
          : { success: !0, data: i.value }
      );
    },
    St = It(mt),
    Tt = /^[cC][^\s-]{8,}$/,
    Nt = /^[0-9a-z]+$/,
    Ot = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
    Et = /^[0-9a-vA-V]{20}$/,
    At = /^[A-Za-z0-9]{27}$/,
    Ut = /^[a-zA-Z0-9_-]{21}$/,
    Ct =
      /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
    Pt =
      /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
    Dt = (e) =>
      e
        ? new RegExp(
            `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
          )
        : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/,
    jt = Dt(4),
    zt = Dt(6),
    Rt = Dt(7),
    Mt =
      /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
  function qt() {
    return new RegExp(
      "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
      "u",
    );
  }
  const Zt =
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    Lt =
      /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/,
    Ft =
      /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
    Bt =
      /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    Wt =
      /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
    Ht = /^[A-Za-z0-9_-]*$/,
    Vt =
      /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,
    Jt = /^\+(?:[0-9]){6,14}[0-9]$/,
    Kt =
      "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
    Gt = new RegExp(`^${Kt}$`);
  function Xt(e) {
    const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
    return "number" == typeof e.precision
      ? -1 === e.precision
        ? `${t}`
        : 0 === e.precision
          ? `${t}:[0-5]\\d`
          : `${t}:[0-5]\\d\\.\\d{${e.precision}}`
      : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  }
  function Yt(e) {
    return new RegExp(`^${Xt(e)}$`);
  }
  function Qt(e) {
    const t = Xt({ precision: e.precision }),
      n = ["Z"];
    (e.local && n.push(""),
      e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
    const r = `${t}(?:${n.join("|")})`;
    return new RegExp(`^${Kt}T(?:${r})$`);
  }
  const en = (e) =>
      new RegExp(
        `^${e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*"}$`,
      ),
    tn = /^\d+n?$/,
    nn = /^\d+$/,
    rn = /^-?\d+(?:\.\d+)?/i,
    on = /true|false/i,
    an = /null/i,
    sn = /undefined/i,
    ln = /^[^A-Z]*$/,
    un = /^[^a-z]*$/;
  var cn = Object.freeze({
    __proto__: null,
    base64: Wt,
    base64url: Ht,
    bigint: tn,
    boolean: on,
    browserEmail:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    cidrv4: Ft,
    cidrv6: Bt,
    cuid: Tt,
    cuid2: Nt,
    date: Gt,
    datetime: Qt,
    domain: /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
    duration: Ct,
    e164: Jt,
    email: Mt,
    emoji: qt,
    extendedDuration:
      /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
    guid: Pt,
    hostname: Vt,
    html5Email:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    idnEmail: /^[^\s@"]{1,64}@[^\s@]{1,255}$/u,
    integer: nn,
    ipv4: Zt,
    ipv6: Lt,
    ksuid: At,
    lowercase: ln,
    nanoid: Ut,
    null: an,
    number: rn,
    rfc5322Email:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    string: en,
    time: Yt,
    ulid: Ot,
    undefined: sn,
    unicodeEmail: /^[^\s@"]{1,64}@[^\s@]{1,255}$/u,
    uppercase: un,
    uuid: Dt,
    uuid4: jt,
    uuid6: zt,
    uuid7: Rt,
    xid: Et,
  });
  const dn = we("$ZodCheck", (e, t) => {
      var n;
      (e._zod ?? (e._zod = {}),
        (e._zod.def = t),
        (n = e._zod).onattach ?? (n.onattach = []));
    }),
    pn = { number: "number", bigint: "bigint", object: "date" },
    mn = we("$ZodCheckLessThan", (e, t) => {
      dn.init(e, t);
      const n = pn[typeof t.value];
      (e._zod.onattach.push((e) => {
        const n = e._zod.bag,
          r =
            (t.inclusive ? n.maximum : n.exclusiveMaximum) ??
            Number.POSITIVE_INFINITY;
        t.value < r &&
          (t.inclusive
            ? (n.maximum = t.value)
            : (n.exclusiveMaximum = t.value));
      }),
        (e._zod.check = (r) => {
          (t.inclusive ? r.value <= t.value : r.value < t.value) ||
            r.issues.push({
              origin: n,
              code: "too_big",
              maximum: t.value,
              input: r.value,
              inclusive: t.inclusive,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    hn = we("$ZodCheckGreaterThan", (e, t) => {
      dn.init(e, t);
      const n = pn[typeof t.value];
      (e._zod.onattach.push((e) => {
        const n = e._zod.bag,
          r =
            (t.inclusive ? n.minimum : n.exclusiveMinimum) ??
            Number.NEGATIVE_INFINITY;
        t.value > r &&
          (t.inclusive
            ? (n.minimum = t.value)
            : (n.exclusiveMinimum = t.value));
      }),
        (e._zod.check = (r) => {
          (t.inclusive ? r.value >= t.value : r.value > t.value) ||
            r.issues.push({
              origin: n,
              code: "too_small",
              minimum: t.value,
              input: r.value,
              inclusive: t.inclusive,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    gn = we("$ZodCheckMultipleOf", (e, t) => {
      (dn.init(e, t),
        e._zod.onattach.push((e) => {
          var n;
          (n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
        }),
        (e._zod.check = (n) => {
          if (typeof n.value != typeof t.value)
            throw new Error(
              "Cannot mix number and bigint in multiple_of check.",
            );
          ("bigint" == typeof n.value
            ? n.value % t.value === BigInt(0)
            : 0 === Ue(n.value, t.value)) ||
            n.issues.push({
              origin: typeof n.value,
              code: "not_multiple_of",
              divisor: t.value,
              input: n.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    fn = we("$ZodCheckNumberFormat", (e, t) => {
      (dn.init(e, t), (t.format = t.format || "float64"));
      const n = t.format?.includes("int"),
        r = n ? "int" : "number",
        [o, i] = Ke[t.format];
      (e._zod.onattach.push((e) => {
        const r = e._zod.bag;
        ((r.format = t.format),
          (r.minimum = o),
          (r.maximum = i),
          n && (r.pattern = nn));
      }),
        (e._zod.check = (a) => {
          const s = a.value;
          if (n) {
            if (!Number.isInteger(s))
              return void a.issues.push({
                expected: r,
                format: t.format,
                code: "invalid_type",
                continue: !1,
                input: s,
                inst: e,
              });
            if (!Number.isSafeInteger(s))
              return void (s > 0
                ? a.issues.push({
                    input: s,
                    code: "too_big",
                    maximum: Number.MAX_SAFE_INTEGER,
                    note: "Integers must be within the safe integer range.",
                    inst: e,
                    origin: r,
                    continue: !t.abort,
                  })
                : a.issues.push({
                    input: s,
                    code: "too_small",
                    minimum: Number.MIN_SAFE_INTEGER,
                    note: "Integers must be within the safe integer range.",
                    inst: e,
                    origin: r,
                    continue: !t.abort,
                  }));
          }
          (s < o &&
            a.issues.push({
              origin: "number",
              input: s,
              code: "too_small",
              minimum: o,
              inclusive: !0,
              inst: e,
              continue: !t.abort,
            }),
            s > i &&
              a.issues.push({
                origin: "number",
                input: s,
                code: "too_big",
                maximum: i,
                inst: e,
              }));
        }));
    }),
    vn = we("$ZodCheckBigIntFormat", (e, t) => {
      dn.init(e, t);
      const [n, r] = Ge[t.format];
      (e._zod.onattach.push((e) => {
        const o = e._zod.bag;
        ((o.format = t.format), (o.minimum = n), (o.maximum = r));
      }),
        (e._zod.check = (o) => {
          const i = o.value;
          (i < n &&
            o.issues.push({
              origin: "bigint",
              input: i,
              code: "too_small",
              minimum: n,
              inclusive: !0,
              inst: e,
              continue: !t.abort,
            }),
            i > r &&
              o.issues.push({
                origin: "bigint",
                input: i,
                code: "too_big",
                maximum: r,
                inst: e,
              }));
        }));
    }),
    yn = we("$ZodCheckMaxSize", (e, t) => {
      var n;
      (dn.init(e, t),
        (n = e._zod.def).when ??
          (n.when = (e) => {
            const t = e.value;
            return !Ee(t) && void 0 !== t.size;
          }),
        e._zod.onattach.push((e) => {
          const n = e._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
          t.maximum < n && (e._zod.bag.maximum = t.maximum);
        }),
        (e._zod.check = (n) => {
          const r = n.value;
          r.size <= t.maximum ||
            n.issues.push({
              origin: st(r),
              code: "too_big",
              maximum: t.maximum,
              input: r,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    bn = we("$ZodCheckMinSize", (e, t) => {
      var n;
      (dn.init(e, t),
        (n = e._zod.def).when ??
          (n.when = (e) => {
            const t = e.value;
            return !Ee(t) && void 0 !== t.size;
          }),
        e._zod.onattach.push((e) => {
          const n = e._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
          t.minimum > n && (e._zod.bag.minimum = t.minimum);
        }),
        (e._zod.check = (n) => {
          const r = n.value;
          r.size >= t.minimum ||
            n.issues.push({
              origin: st(r),
              code: "too_small",
              minimum: t.minimum,
              input: r,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    _n = we("$ZodCheckSizeEquals", (e, t) => {
      var n;
      (dn.init(e, t),
        (n = e._zod.def).when ??
          (n.when = (e) => {
            const t = e.value;
            return !Ee(t) && void 0 !== t.size;
          }),
        e._zod.onattach.push((e) => {
          const n = e._zod.bag;
          ((n.minimum = t.size), (n.maximum = t.size), (n.size = t.size));
        }),
        (e._zod.check = (n) => {
          const r = n.value,
            o = r.size;
          if (o === t.size) return;
          const i = o > t.size;
          n.issues.push({
            origin: st(r),
            ...(i
              ? { code: "too_big", maximum: t.size }
              : { code: "too_small", minimum: t.size }),
            inclusive: !0,
            exact: !0,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
        }));
    }),
    wn = we("$ZodCheckMaxLength", (e, t) => {
      var n;
      (dn.init(e, t),
        (n = e._zod.def).when ??
          (n.when = (e) => {
            const t = e.value;
            return !Ee(t) && void 0 !== t.length;
          }),
        e._zod.onattach.push((e) => {
          const n = e._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
          t.maximum < n && (e._zod.bag.maximum = t.maximum);
        }),
        (e._zod.check = (n) => {
          const r = n.value;
          if (r.length <= t.maximum) return;
          const o = lt(r);
          n.issues.push({
            origin: o,
            code: "too_big",
            maximum: t.maximum,
            inclusive: !0,
            input: r,
            inst: e,
            continue: !t.abort,
          });
        }));
    }),
    kn = we("$ZodCheckMinLength", (e, t) => {
      var n;
      (dn.init(e, t),
        (n = e._zod.def).when ??
          (n.when = (e) => {
            const t = e.value;
            return !Ee(t) && void 0 !== t.length;
          }),
        e._zod.onattach.push((e) => {
          const n = e._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
          t.minimum > n && (e._zod.bag.minimum = t.minimum);
        }),
        (e._zod.check = (n) => {
          const r = n.value;
          if (r.length >= t.minimum) return;
          const o = lt(r);
          n.issues.push({
            origin: o,
            code: "too_small",
            minimum: t.minimum,
            inclusive: !0,
            input: r,
            inst: e,
            continue: !t.abort,
          });
        }));
    }),
    xn = we("$ZodCheckLengthEquals", (e, t) => {
      var n;
      (dn.init(e, t),
        (n = e._zod.def).when ??
          (n.when = (e) => {
            const t = e.value;
            return !Ee(t) && void 0 !== t.length;
          }),
        e._zod.onattach.push((e) => {
          const n = e._zod.bag;
          ((n.minimum = t.length),
            (n.maximum = t.length),
            (n.length = t.length));
        }),
        (e._zod.check = (n) => {
          const r = n.value,
            o = r.length;
          if (o === t.length) return;
          const i = lt(r),
            a = o > t.length;
          n.issues.push({
            origin: i,
            ...(a
              ? { code: "too_big", maximum: t.length }
              : { code: "too_small", minimum: t.length }),
            inclusive: !0,
            exact: !0,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
        }));
    }),
    $n = we("$ZodCheckStringFormat", (e, t) => {
      var n, r;
      (dn.init(e, t),
        e._zod.onattach.push((e) => {
          const n = e._zod.bag;
          ((n.format = t.format),
            t.pattern &&
              (n.patterns ?? (n.patterns = new Set()),
              n.patterns.add(t.pattern)));
        }),
        t.pattern
          ? ((n = e._zod).check ??
            (n.check = (n) => {
              ((t.pattern.lastIndex = 0),
                t.pattern.test(n.value) ||
                  n.issues.push({
                    origin: "string",
                    code: "invalid_format",
                    format: t.format,
                    input: n.value,
                    ...(t.pattern ? { pattern: t.pattern.toString() } : {}),
                    inst: e,
                    continue: !t.abort,
                  }));
            }))
          : ((r = e._zod).check ?? (r.check = () => {})));
    }),
    In = we("$ZodCheckRegex", (e, t) => {
      ($n.init(e, t),
        (e._zod.check = (n) => {
          ((t.pattern.lastIndex = 0),
            t.pattern.test(n.value) ||
              n.issues.push({
                origin: "string",
                code: "invalid_format",
                format: "regex",
                input: n.value,
                pattern: t.pattern.toString(),
                inst: e,
                continue: !t.abort,
              }));
        }));
    }),
    Sn = we("$ZodCheckLowerCase", (e, t) => {
      (t.pattern ?? (t.pattern = ln), $n.init(e, t));
    }),
    Tn = we("$ZodCheckUpperCase", (e, t) => {
      (t.pattern ?? (t.pattern = un), $n.init(e, t));
    }),
    Nn = we("$ZodCheckIncludes", (e, t) => {
      dn.init(e, t);
      const n = Be(t.includes),
        r = new RegExp(
          "number" == typeof t.position ? `^.{${t.position}}${n}` : n,
        );
      ((t.pattern = r),
        e._zod.onattach.push((e) => {
          const t = e._zod.bag;
          (t.patterns ?? (t.patterns = new Set()), t.patterns.add(r));
        }),
        (e._zod.check = (n) => {
          n.value.includes(t.includes, t.position) ||
            n.issues.push({
              origin: "string",
              code: "invalid_format",
              format: "includes",
              includes: t.includes,
              input: n.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    On = we("$ZodCheckStartsWith", (e, t) => {
      dn.init(e, t);
      const n = new RegExp(`^${Be(t.prefix)}.*`);
      (t.pattern ?? (t.pattern = n),
        e._zod.onattach.push((e) => {
          const t = e._zod.bag;
          (t.patterns ?? (t.patterns = new Set()), t.patterns.add(n));
        }),
        (e._zod.check = (n) => {
          n.value.startsWith(t.prefix) ||
            n.issues.push({
              origin: "string",
              code: "invalid_format",
              format: "starts_with",
              prefix: t.prefix,
              input: n.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    En = we("$ZodCheckEndsWith", (e, t) => {
      dn.init(e, t);
      const n = new RegExp(`.*${Be(t.suffix)}$`);
      (t.pattern ?? (t.pattern = n),
        e._zod.onattach.push((e) => {
          const t = e._zod.bag;
          (t.patterns ?? (t.patterns = new Set()), t.patterns.add(n));
        }),
        (e._zod.check = (n) => {
          n.value.endsWith(t.suffix) ||
            n.issues.push({
              origin: "string",
              code: "invalid_format",
              format: "ends_with",
              suffix: t.suffix,
              input: n.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    });
  function An(e, t, n) {
    e.issues.length && t.issues.push(...ot(n, e.issues));
  }
  const Un = we("$ZodCheckProperty", (e, t) => {
      (dn.init(e, t),
        (e._zod.check = (e) => {
          const n = t.schema._zod.run(
            { value: e.value[t.property], issues: [] },
            {},
          );
          if (n instanceof Promise) return n.then((n) => An(n, e, t.property));
          An(n, e, t.property);
        }));
    }),
    Cn = we("$ZodCheckMimeType", (e, t) => {
      dn.init(e, t);
      const n = new Set(t.mime);
      (e._zod.onattach.push((e) => {
        e._zod.bag.mime = t.mime;
      }),
        (e._zod.check = (r) => {
          n.has(r.value.type) ||
            r.issues.push({
              code: "invalid_value",
              values: t.mime,
              input: r.value.type,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    Pn = we("$ZodCheckOverwrite", (e, t) => {
      (dn.init(e, t),
        (e._zod.check = (e) => {
          e.value = t.tx(e.value);
        }));
    });
  class Dn {
    constructor(e = []) {
      ((this.content = []), (this.indent = 0), this && (this.args = e));
    }
    indented(e) {
      ((this.indent += 1), e(this), (this.indent -= 1));
    }
    write(e) {
      if ("function" == typeof e)
        return (
          e(this, { execution: "sync" }),
          void e(this, { execution: "async" })
        );
      const t = e.split("\n").filter((e) => e),
        n = Math.min(...t.map((e) => e.length - e.trimStart().length)),
        r = t
          .map((e) => e.slice(n))
          .map((e) => " ".repeat(2 * this.indent) + e);
      for (const e of r) this.content.push(e);
    }
    compile() {
      const e = Function,
        t = this?.args;
      return new e(
        ...t,
        [...(this?.content ?? [""]).map((e) => `  ${e}`)].join("\n"),
      );
    }
  }
  const jn = { major: 4, minor: 0, patch: 14 },
    zn = we("$ZodType", (e, t) => {
      var n;
      (e ?? (e = {}),
        (e._zod.def = t),
        (e._zod.bag = e._zod.bag || {}),
        (e._zod.version = jn));
      const r = [...(e._zod.def.checks ?? [])];
      e._zod.traits.has("$ZodCheck") && r.unshift(e);
      for (const t of r) for (const n of t._zod.onattach) n(e);
      if (0 === r.length)
        ((n = e._zod).deferred ?? (n.deferred = []),
          e._zod.deferred?.push(() => {
            e._zod.run = e._zod.parse;
          }));
      else {
        const t = (e, t, n) => {
          let r,
            o = rt(e);
          for (const i of t) {
            if (i._zod.def.when) {
              if (!i._zod.def.when(e)) continue;
            } else if (o) continue;
            const t = e.issues.length,
              a = i._zod.check(e);
            if (a instanceof Promise && !1 === n?.async) throw new xe();
            if (r || a instanceof Promise)
              r = (r ?? Promise.resolve()).then(async () => {
                (await a, e.issues.length !== t && (o || (o = rt(e, t))));
              });
            else {
              if (e.issues.length === t) continue;
              o || (o = rt(e, t));
            }
          }
          return r ? r.then(() => e) : e;
        };
        e._zod.run = (n, o) => {
          const i = e._zod.parse(n, o);
          if (i instanceof Promise) {
            if (!1 === o.async) throw new xe();
            return i.then((e) => t(e, r, o));
          }
          return t(i, r, o);
        };
      }
      e["~standard"] = {
        validate: (t) => {
          try {
            const n = $t(e, t);
            return n.success ? { value: n.data } : { issues: n.error?.issues };
          } catch (n) {
            return St(e, t).then((e) =>
              e.success ? { value: e.data } : { issues: e.error?.issues },
            );
          }
        },
        vendor: "zod",
        version: 1,
      };
    }),
    Rn = we("$ZodString", (e, t) => {
      (zn.init(e, t),
        (e._zod.pattern =
          [...(e?._zod.bag?.patterns ?? [])].pop() ?? en(e._zod.bag)),
        (e._zod.parse = (n, r) => {
          if (t.coerce)
            try {
              n.value = String(n.value);
            } catch (r) {}
          return (
            "string" == typeof n.value ||
              n.issues.push({
                expected: "string",
                code: "invalid_type",
                input: n.value,
                inst: e,
              }),
            n
          );
        }));
    }),
    Mn = we("$ZodStringFormat", (e, t) => {
      ($n.init(e, t), Rn.init(e, t));
    }),
    qn = we("$ZodGUID", (e, t) => {
      (t.pattern ?? (t.pattern = Pt), Mn.init(e, t));
    }),
    Zn = we("$ZodUUID", (e, t) => {
      if (t.version) {
        const e = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[
          t.version
        ];
        if (void 0 === e)
          throw new Error(`Invalid UUID version: "${t.version}"`);
        t.pattern ?? (t.pattern = Dt(e));
      } else t.pattern ?? (t.pattern = Dt());
      Mn.init(e, t);
    }),
    Ln = we("$ZodEmail", (e, t) => {
      (t.pattern ?? (t.pattern = Mt), Mn.init(e, t));
    }),
    Fn = we("$ZodURL", (e, t) => {
      (Mn.init(e, t),
        (e._zod.check = (n) => {
          try {
            const r = n.value.trim(),
              o = new URL(r);
            return (
              t.hostname &&
                ((t.hostname.lastIndex = 0),
                t.hostname.test(o.hostname) ||
                  n.issues.push({
                    code: "invalid_format",
                    format: "url",
                    note: "Invalid hostname",
                    pattern: Vt.source,
                    input: n.value,
                    inst: e,
                    continue: !t.abort,
                  })),
              t.protocol &&
                ((t.protocol.lastIndex = 0),
                t.protocol.test(
                  o.protocol.endsWith(":")
                    ? o.protocol.slice(0, -1)
                    : o.protocol,
                ) ||
                  n.issues.push({
                    code: "invalid_format",
                    format: "url",
                    note: "Invalid protocol",
                    pattern: t.protocol.source,
                    input: n.value,
                    inst: e,
                    continue: !t.abort,
                  })),
              void (t.normalize ? (n.value = o.href) : (n.value = r))
            );
          } catch (r) {
            n.issues.push({
              code: "invalid_format",
              format: "url",
              input: n.value,
              inst: e,
              continue: !t.abort,
            });
          }
        }));
    }),
    Bn = we("$ZodEmoji", (e, t) => {
      (t.pattern ?? (t.pattern = qt()), Mn.init(e, t));
    }),
    Wn = we("$ZodNanoID", (e, t) => {
      (t.pattern ?? (t.pattern = Ut), Mn.init(e, t));
    }),
    Hn = we("$ZodCUID", (e, t) => {
      (t.pattern ?? (t.pattern = Tt), Mn.init(e, t));
    }),
    Vn = we("$ZodCUID2", (e, t) => {
      (t.pattern ?? (t.pattern = Nt), Mn.init(e, t));
    }),
    Jn = we("$ZodULID", (e, t) => {
      (t.pattern ?? (t.pattern = Ot), Mn.init(e, t));
    }),
    Kn = we("$ZodXID", (e, t) => {
      (t.pattern ?? (t.pattern = Et), Mn.init(e, t));
    }),
    Gn = we("$ZodKSUID", (e, t) => {
      (t.pattern ?? (t.pattern = At), Mn.init(e, t));
    }),
    Xn = we("$ZodISODateTime", (e, t) => {
      (t.pattern ?? (t.pattern = Qt(t)), Mn.init(e, t));
    }),
    Yn = we("$ZodISODate", (e, t) => {
      (t.pattern ?? (t.pattern = Gt), Mn.init(e, t));
    }),
    Qn = we("$ZodISOTime", (e, t) => {
      (t.pattern ?? (t.pattern = Yt(t)), Mn.init(e, t));
    }),
    er = we("$ZodISODuration", (e, t) => {
      (t.pattern ?? (t.pattern = Ct), Mn.init(e, t));
    }),
    tr = we("$ZodIPv4", (e, t) => {
      (t.pattern ?? (t.pattern = Zt),
        Mn.init(e, t),
        e._zod.onattach.push((e) => {
          e._zod.bag.format = "ipv4";
        }));
    }),
    nr = we("$ZodIPv6", (e, t) => {
      (t.pattern ?? (t.pattern = Lt),
        Mn.init(e, t),
        e._zod.onattach.push((e) => {
          e._zod.bag.format = "ipv6";
        }),
        (e._zod.check = (n) => {
          try {
            new URL(`http://[${n.value}]`);
          } catch {
            n.issues.push({
              code: "invalid_format",
              format: "ipv6",
              input: n.value,
              inst: e,
              continue: !t.abort,
            });
          }
        }));
    }),
    rr = we("$ZodCIDRv4", (e, t) => {
      (t.pattern ?? (t.pattern = Ft), Mn.init(e, t));
    }),
    or = we("$ZodCIDRv6", (e, t) => {
      (t.pattern ?? (t.pattern = Bt),
        Mn.init(e, t),
        (e._zod.check = (n) => {
          const [r, o] = n.value.split("/");
          try {
            if (!o) throw new Error();
            const e = Number(o);
            if (`${e}` !== o) throw new Error();
            if (e < 0 || e > 128) throw new Error();
            new URL(`http://[${r}]`);
          } catch {
            n.issues.push({
              code: "invalid_format",
              format: "cidrv6",
              input: n.value,
              inst: e,
              continue: !t.abort,
            });
          }
        }));
    });
  function ir(e) {
    if ("" === e) return !0;
    if (e.length % 4 != 0) return !1;
    try {
      return (atob(e), !0);
    } catch {
      return !1;
    }
  }
  const ar = we("$ZodBase64", (e, t) => {
    (t.pattern ?? (t.pattern = Wt),
      Mn.init(e, t),
      e._zod.onattach.push((e) => {
        e._zod.bag.contentEncoding = "base64";
      }),
      (e._zod.check = (n) => {
        ir(n.value) ||
          n.issues.push({
            code: "invalid_format",
            format: "base64",
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  });
  function sr(e) {
    if (!Ht.test(e)) return !1;
    const t = e.replace(/[-_]/g, (e) => ("-" === e ? "+" : "/"));
    return ir(t.padEnd(4 * Math.ceil(t.length / 4), "="));
  }
  const lr = we("$ZodBase64URL", (e, t) => {
      (t.pattern ?? (t.pattern = Ht),
        Mn.init(e, t),
        e._zod.onattach.push((e) => {
          e._zod.bag.contentEncoding = "base64url";
        }),
        (e._zod.check = (n) => {
          sr(n.value) ||
            n.issues.push({
              code: "invalid_format",
              format: "base64url",
              input: n.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    ur = we("$ZodE164", (e, t) => {
      (t.pattern ?? (t.pattern = Jt), Mn.init(e, t));
    });
  function cr(e, t = null) {
    try {
      const n = e.split(".");
      if (3 !== n.length) return !1;
      const [r] = n;
      if (!r) return !1;
      const o = JSON.parse(atob(r));
      return !(
        ("typ" in o && "JWT" !== o?.typ) ||
        !o.alg ||
        (t && (!("alg" in o) || o.alg !== t))
      );
    } catch {
      return !1;
    }
  }
  const dr = we("$ZodJWT", (e, t) => {
      (Mn.init(e, t),
        (e._zod.check = (n) => {
          cr(n.value, t.alg) ||
            n.issues.push({
              code: "invalid_format",
              format: "jwt",
              input: n.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    pr = we("$ZodCustomStringFormat", (e, t) => {
      (Mn.init(e, t),
        (e._zod.check = (n) => {
          t.fn(n.value) ||
            n.issues.push({
              code: "invalid_format",
              format: t.format,
              input: n.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    mr = we("$ZodNumber", (e, t) => {
      (zn.init(e, t),
        (e._zod.pattern = e._zod.bag.pattern ?? rn),
        (e._zod.parse = (n, r) => {
          if (t.coerce)
            try {
              n.value = Number(n.value);
            } catch (e) {}
          const o = n.value;
          if ("number" == typeof o && !Number.isNaN(o) && Number.isFinite(o))
            return n;
          const i =
            "number" == typeof o
              ? Number.isNaN(o)
                ? "NaN"
                : Number.isFinite(o)
                  ? void 0
                  : "Infinity"
              : void 0;
          return (
            n.issues.push({
              expected: "number",
              code: "invalid_type",
              input: o,
              inst: e,
              ...(i ? { received: i } : {}),
            }),
            n
          );
        }));
    }),
    hr = we("$ZodNumber", (e, t) => {
      (fn.init(e, t), mr.init(e, t));
    }),
    gr = we("$ZodBoolean", (e, t) => {
      (zn.init(e, t),
        (e._zod.pattern = on),
        (e._zod.parse = (n, r) => {
          if (t.coerce)
            try {
              n.value = Boolean(n.value);
            } catch (e) {}
          const o = n.value;
          return (
            "boolean" == typeof o ||
              n.issues.push({
                expected: "boolean",
                code: "invalid_type",
                input: o,
                inst: e,
              }),
            n
          );
        }));
    }),
    fr = we("$ZodBigInt", (e, t) => {
      (zn.init(e, t),
        (e._zod.pattern = tn),
        (e._zod.parse = (n, r) => {
          if (t.coerce)
            try {
              n.value = BigInt(n.value);
            } catch (e) {}
          return (
            "bigint" == typeof n.value ||
              n.issues.push({
                expected: "bigint",
                code: "invalid_type",
                input: n.value,
                inst: e,
              }),
            n
          );
        }));
    }),
    vr = we("$ZodBigInt", (e, t) => {
      (vn.init(e, t), fr.init(e, t));
    }),
    yr = we("$ZodSymbol", (e, t) => {
      (zn.init(e, t),
        (e._zod.parse = (t, n) => {
          const r = t.value;
          return (
            "symbol" == typeof r ||
              t.issues.push({
                expected: "symbol",
                code: "invalid_type",
                input: r,
                inst: e,
              }),
            t
          );
        }));
    }),
    br = we("$ZodUndefined", (e, t) => {
      (zn.init(e, t),
        (e._zod.pattern = sn),
        (e._zod.values = new Set([void 0])),
        (e._zod.optin = "optional"),
        (e._zod.optout = "optional"),
        (e._zod.parse = (t, n) => {
          const r = t.value;
          return (
            void 0 === r ||
              t.issues.push({
                expected: "undefined",
                code: "invalid_type",
                input: r,
                inst: e,
              }),
            t
          );
        }));
    }),
    _r = we("$ZodNull", (e, t) => {
      (zn.init(e, t),
        (e._zod.pattern = an),
        (e._zod.values = new Set([null])),
        (e._zod.parse = (t, n) => {
          const r = t.value;
          return (
            null === r ||
              t.issues.push({
                expected: "null",
                code: "invalid_type",
                input: r,
                inst: e,
              }),
            t
          );
        }));
    }),
    wr = we("$ZodAny", (e, t) => {
      (zn.init(e, t), (e._zod.parse = (e) => e));
    }),
    kr = we("$ZodUnknown", (e, t) => {
      (zn.init(e, t), (e._zod.parse = (e) => e));
    }),
    xr = we("$ZodNever", (e, t) => {
      (zn.init(e, t),
        (e._zod.parse = (t, n) => (
          t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e,
          }),
          t
        )));
    }),
    $r = we("$ZodVoid", (e, t) => {
      (zn.init(e, t),
        (e._zod.parse = (t, n) => {
          const r = t.value;
          return (
            void 0 === r ||
              t.issues.push({
                expected: "void",
                code: "invalid_type",
                input: r,
                inst: e,
              }),
            t
          );
        }));
    }),
    Ir = we("$ZodDate", (e, t) => {
      (zn.init(e, t),
        (e._zod.parse = (n, r) => {
          if (t.coerce)
            try {
              n.value = new Date(n.value);
            } catch (e) {}
          const o = n.value,
            i = o instanceof Date;
          return (
            (i && !Number.isNaN(o.getTime())) ||
              n.issues.push({
                expected: "date",
                code: "invalid_type",
                input: o,
                ...(i ? { received: "Invalid Date" } : {}),
                inst: e,
              }),
            n
          );
        }));
    });
  function Sr(e, t, n) {
    (e.issues.length && t.issues.push(...ot(n, e.issues)),
      (t.value[n] = e.value));
  }
  const Tr = we("$ZodArray", (e, t) => {
    (zn.init(e, t),
      (e._zod.parse = (n, r) => {
        const o = n.value;
        if (!Array.isArray(o))
          return (
            n.issues.push({
              expected: "array",
              code: "invalid_type",
              input: o,
              inst: e,
            }),
            n
          );
        n.value = Array(o.length);
        const i = [];
        for (let e = 0; e < o.length; e++) {
          const a = o[e],
            s = t.element._zod.run({ value: a, issues: [] }, r);
          s instanceof Promise
            ? i.push(s.then((t) => Sr(t, n, e)))
            : Sr(s, n, e);
        }
        return i.length ? Promise.all(i).then(() => n) : n;
      }));
  });
  function Nr(e, t, n, r) {
    (e.issues.length && t.issues.push(...ot(n, e.issues)),
      void 0 === e.value
        ? n in r && (t.value[n] = void 0)
        : (t.value[n] = e.value));
  }
  const Or = we("$ZodObject", (e, t) => {
    zn.init(e, t);
    const n = Oe(() => {
      const e = Object.keys(t.shape);
      for (const n of e)
        if (!(t.shape[n] instanceof zn))
          throw new Error(
            `Invalid element at key "${n}": expected a Zod schema`,
          );
      const n = Je(t.shape);
      return {
        shape: t.shape,
        keys: e,
        keySet: new Set(e),
        numKeys: e.length,
        optionalKeys: new Set(n),
      };
    });
    let r;
    Pe(e._zod, "propValues", () => {
      const e = t.shape,
        n = {};
      for (const t in e) {
        const r = e[t]._zod;
        if (r.values) {
          n[t] ?? (n[t] = new Set());
          for (const e of r.values) n[t].add(e);
        }
      }
      return n;
    });
    const o = Me,
      i = !$e.jitless,
      a = i && qe.value,
      s = t.catchall;
    let l;
    e._zod.parse = (u, c) => {
      l ?? (l = n.value);
      const d = u.value;
      if (!o(d))
        return (
          u.issues.push({
            expected: "object",
            code: "invalid_type",
            input: d,
            inst: e,
          }),
          u
        );
      const p = [];
      if (i && a && !1 === c?.async && !0 !== c.jitless)
        (r ||
          (r = ((e) => {
            const t = new Dn(["shape", "payload", "ctx"]),
              r = n.value,
              o = (e) => {
                const t = ze(e);
                return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
              };
            t.write("const input = payload.value;");
            const i = Object.create(null);
            let a = 0;
            for (const e of r.keys) i[e] = "key_" + a++;
            t.write("const newResult = {}");
            for (const e of r.keys) {
              const n = i[e],
                r = ze(e);
              (t.write(`const ${n} = ${o(e)};`),
                t.write(
                  `\n        if (${n}.issues.length) {\n          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({\n            ...iss,\n            path: iss.path ? [${r}, ...iss.path] : [${r}]\n          })));\n        }\n        \n        if (${n}.value === undefined) {\n          if (${r} in input) {\n            newResult[${r}] = undefined;\n          }\n        } else {\n          newResult[${r}] = ${n}.value;\n        }\n      `,
                ));
            }
            (t.write("payload.value = newResult;"), t.write("return payload;"));
            const s = t.compile();
            return (t, n) => s(e, t, n);
          })(t.shape)),
          (u = r(u, c)));
      else {
        u.value = {};
        const e = l.shape;
        for (const t of l.keys) {
          const n = e[t]._zod.run({ value: d[t], issues: [] }, c);
          n instanceof Promise
            ? p.push(n.then((e) => Nr(e, u, t, d)))
            : Nr(n, u, t, d);
        }
      }
      if (!s) return p.length ? Promise.all(p).then(() => u) : u;
      const m = [],
        h = l.keySet,
        g = s._zod,
        f = g.def.type;
      for (const e of Object.keys(d)) {
        if (h.has(e)) continue;
        if ("never" === f) {
          m.push(e);
          continue;
        }
        const t = g.run({ value: d[e], issues: [] }, c);
        t instanceof Promise
          ? p.push(t.then((t) => Nr(t, u, e, d)))
          : Nr(t, u, e, d);
      }
      return (
        m.length &&
          u.issues.push({
            code: "unrecognized_keys",
            keys: m,
            input: d,
            inst: e,
          }),
        p.length ? Promise.all(p).then(() => u) : u
      );
    };
  });
  function Er(e, t, n, r) {
    for (const n of e)
      if (0 === n.issues.length) return ((t.value = n.value), t);
    const o = e.filter((e) => !rt(e));
    return 1 === o.length
      ? ((t.value = o[0].value), o[0])
      : (t.issues.push({
          code: "invalid_union",
          input: t.value,
          inst: n,
          errors: e.map((e) => e.issues.map((e) => at(e, r, Ie()))),
        }),
        t);
  }
  const Ar = we("$ZodUnion", (e, t) => {
      (zn.init(e, t),
        Pe(e._zod, "optin", () =>
          t.options.some((e) => "optional" === e._zod.optin)
            ? "optional"
            : void 0,
        ),
        Pe(e._zod, "optout", () =>
          t.options.some((e) => "optional" === e._zod.optout)
            ? "optional"
            : void 0,
        ),
        Pe(e._zod, "values", () => {
          if (t.options.every((e) => e._zod.values))
            return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
        }),
        Pe(e._zod, "pattern", () => {
          if (t.options.every((e) => e._zod.pattern)) {
            const e = t.options.map((e) => e._zod.pattern);
            return new RegExp(`^(${e.map((e) => Ae(e.source)).join("|")})$`);
          }
        }));
      const n = 1 === t.options.length,
        r = t.options[0]._zod.run;
      e._zod.parse = (o, i) => {
        if (n) return r(o, i);
        let a = !1;
        const s = [];
        for (const e of t.options) {
          const t = e._zod.run({ value: o.value, issues: [] }, i);
          if (t instanceof Promise) (s.push(t), (a = !0));
          else {
            if (0 === t.issues.length) return t;
            s.push(t);
          }
        }
        return a ? Promise.all(s).then((t) => Er(t, o, e, i)) : Er(s, o, e, i);
      };
    }),
    Ur = we("$ZodDiscriminatedUnion", (e, t) => {
      Ar.init(e, t);
      const n = e._zod.parse;
      Pe(e._zod, "propValues", () => {
        const e = {};
        for (const n of t.options) {
          const r = n._zod.propValues;
          if (!r || 0 === Object.keys(r).length)
            throw new Error(
              `Invalid discriminated union option at index "${t.options.indexOf(n)}"`,
            );
          for (const [t, n] of Object.entries(r)) {
            e[t] || (e[t] = new Set());
            for (const r of n) e[t].add(r);
          }
        }
        return e;
      });
      const r = Oe(() => {
        const e = t.options,
          n = new Map();
        for (const r of e) {
          const e = r._zod.propValues?.[t.discriminator];
          if (!e || 0 === e.size)
            throw new Error(
              `Invalid discriminated union option at index "${t.options.indexOf(r)}"`,
            );
          for (const t of e) {
            if (n.has(t))
              throw new Error(`Duplicate discriminator value "${String(t)}"`);
            n.set(t, r);
          }
        }
        return n;
      });
      e._zod.parse = (o, i) => {
        const a = o.value;
        if (!Me(a))
          return (
            o.issues.push({
              code: "invalid_type",
              expected: "object",
              input: a,
              inst: e,
            }),
            o
          );
        const s = r.value.get(a?.[t.discriminator]);
        return s
          ? s._zod.run(o, i)
          : t.unionFallback
            ? n(o, i)
            : (o.issues.push({
                code: "invalid_union",
                errors: [],
                note: "No matching discriminator",
                discriminator: t.discriminator,
                input: a,
                path: [t.discriminator],
                inst: e,
              }),
              o);
      };
    }),
    Cr = we("$ZodIntersection", (e, t) => {
      (zn.init(e, t),
        (e._zod.parse = (e, n) => {
          const r = e.value,
            o = t.left._zod.run({ value: r, issues: [] }, n),
            i = t.right._zod.run({ value: r, issues: [] }, n);
          return o instanceof Promise || i instanceof Promise
            ? Promise.all([o, i]).then(([t, n]) => Dr(e, t, n))
            : Dr(e, o, i);
        }));
    });
  function Pr(e, t) {
    if (e === t) return { valid: !0, data: e };
    if (e instanceof Date && t instanceof Date && +e === +t)
      return { valid: !0, data: e };
    if (Ze(e) && Ze(t)) {
      const n = Object.keys(t),
        r = Object.keys(e).filter((e) => -1 !== n.indexOf(e)),
        o = { ...e, ...t };
      for (const n of r) {
        const r = Pr(e[n], t[n]);
        if (!r.valid)
          return { valid: !1, mergeErrorPath: [n, ...r.mergeErrorPath] };
        o[n] = r.data;
      }
      return { valid: !0, data: o };
    }
    if (Array.isArray(e) && Array.isArray(t)) {
      if (e.length !== t.length) return { valid: !1, mergeErrorPath: [] };
      const n = [];
      for (let r = 0; r < e.length; r++) {
        const o = Pr(e[r], t[r]);
        if (!o.valid)
          return { valid: !1, mergeErrorPath: [r, ...o.mergeErrorPath] };
        n.push(o.data);
      }
      return { valid: !0, data: n };
    }
    return { valid: !1, mergeErrorPath: [] };
  }
  function Dr(e, t, n) {
    if (
      (t.issues.length && e.issues.push(...t.issues),
      n.issues.length && e.issues.push(...n.issues),
      rt(e))
    )
      return e;
    const r = Pr(t.value, n.value);
    if (!r.valid)
      throw new Error(
        `Unmergable intersection. Error path: ${JSON.stringify(r.mergeErrorPath)}`,
      );
    return ((e.value = r.data), e);
  }
  const jr = we("$ZodTuple", (e, t) => {
    zn.init(e, t);
    const n = t.items,
      r =
        n.length -
        [...n].reverse().findIndex((e) => "optional" !== e._zod.optin);
    e._zod.parse = (o, i) => {
      const a = o.value;
      if (!Array.isArray(a))
        return (
          o.issues.push({
            input: a,
            inst: e,
            expected: "tuple",
            code: "invalid_type",
          }),
          o
        );
      o.value = [];
      const s = [];
      if (!t.rest) {
        const t = a.length > n.length,
          i = a.length < r - 1;
        if (t || i)
          return (
            o.issues.push({
              ...(t
                ? { code: "too_big", maximum: n.length }
                : { code: "too_small", minimum: n.length }),
              input: a,
              inst: e,
              origin: "array",
            }),
            o
          );
      }
      let l = -1;
      for (const e of n) {
        if ((l++, l >= a.length && l >= r)) continue;
        const t = e._zod.run({ value: a[l], issues: [] }, i);
        t instanceof Promise ? s.push(t.then((e) => zr(e, o, l))) : zr(t, o, l);
      }
      if (t.rest) {
        const e = a.slice(n.length);
        for (const n of e) {
          l++;
          const e = t.rest._zod.run({ value: n, issues: [] }, i);
          e instanceof Promise
            ? s.push(e.then((e) => zr(e, o, l)))
            : zr(e, o, l);
        }
      }
      return s.length ? Promise.all(s).then(() => o) : o;
    };
  });
  function zr(e, t, n) {
    (e.issues.length && t.issues.push(...ot(n, e.issues)),
      (t.value[n] = e.value));
  }
  const Rr = we("$ZodRecord", (e, t) => {
      (zn.init(e, t),
        (e._zod.parse = (n, r) => {
          const o = n.value;
          if (!Ze(o))
            return (
              n.issues.push({
                expected: "record",
                code: "invalid_type",
                input: o,
                inst: e,
              }),
              n
            );
          const i = [];
          if (t.keyType._zod.values) {
            const a = t.keyType._zod.values;
            n.value = {};
            for (const e of a)
              if (
                "string" == typeof e ||
                "number" == typeof e ||
                "symbol" == typeof e
              ) {
                const a = t.valueType._zod.run({ value: o[e], issues: [] }, r);
                a instanceof Promise
                  ? i.push(
                      a.then((t) => {
                        (t.issues.length && n.issues.push(...ot(e, t.issues)),
                          (n.value[e] = t.value));
                      }),
                    )
                  : (a.issues.length && n.issues.push(...ot(e, a.issues)),
                    (n.value[e] = a.value));
              }
            let s;
            for (const e in o) a.has(e) || ((s = s ?? []), s.push(e));
            s &&
              s.length > 0 &&
              n.issues.push({
                code: "unrecognized_keys",
                input: o,
                inst: e,
                keys: s,
              });
          } else {
            n.value = {};
            for (const a of Reflect.ownKeys(o)) {
              if ("__proto__" === a) continue;
              const s = t.keyType._zod.run({ value: a, issues: [] }, r);
              if (s instanceof Promise)
                throw new Error(
                  "Async schemas not supported in object keys currently",
                );
              if (s.issues.length) {
                (n.issues.push({
                  code: "invalid_key",
                  origin: "record",
                  issues: s.issues.map((e) => at(e, r, Ie())),
                  input: a,
                  path: [a],
                  inst: e,
                }),
                  (n.value[s.value] = s.value));
                continue;
              }
              const l = t.valueType._zod.run({ value: o[a], issues: [] }, r);
              l instanceof Promise
                ? i.push(
                    l.then((e) => {
                      (e.issues.length && n.issues.push(...ot(a, e.issues)),
                        (n.value[s.value] = e.value));
                    }),
                  )
                : (l.issues.length && n.issues.push(...ot(a, l.issues)),
                  (n.value[s.value] = l.value));
            }
          }
          return i.length ? Promise.all(i).then(() => n) : n;
        }));
    }),
    Mr = we("$ZodMap", (e, t) => {
      (zn.init(e, t),
        (e._zod.parse = (n, r) => {
          const o = n.value;
          if (!(o instanceof Map))
            return (
              n.issues.push({
                expected: "map",
                code: "invalid_type",
                input: o,
                inst: e,
              }),
              n
            );
          const i = [];
          n.value = new Map();
          for (const [a, s] of o) {
            const l = t.keyType._zod.run({ value: a, issues: [] }, r),
              u = t.valueType._zod.run({ value: s, issues: [] }, r);
            l instanceof Promise || u instanceof Promise
              ? i.push(
                  Promise.all([l, u]).then(([t, i]) => {
                    qr(t, i, n, a, o, e, r);
                  }),
                )
              : qr(l, u, n, a, o, e, r);
          }
          return i.length ? Promise.all(i).then(() => n) : n;
        }));
    });
  function qr(e, t, n, r, o, i, a) {
    (e.issues.length &&
      (Le.has(typeof r)
        ? n.issues.push(...ot(r, e.issues))
        : n.issues.push({
            code: "invalid_key",
            origin: "map",
            input: o,
            inst: i,
            issues: e.issues.map((e) => at(e, a, Ie())),
          })),
      t.issues.length &&
        (Le.has(typeof r)
          ? n.issues.push(...ot(r, t.issues))
          : n.issues.push({
              origin: "map",
              code: "invalid_element",
              input: o,
              inst: i,
              key: r,
              issues: t.issues.map((e) => at(e, a, Ie())),
            })),
      n.value.set(e.value, t.value));
  }
  const Zr = we("$ZodSet", (e, t) => {
    (zn.init(e, t),
      (e._zod.parse = (n, r) => {
        const o = n.value;
        if (!(o instanceof Set))
          return (
            n.issues.push({
              input: o,
              inst: e,
              expected: "set",
              code: "invalid_type",
            }),
            n
          );
        const i = [];
        n.value = new Set();
        for (const e of o) {
          const o = t.valueType._zod.run({ value: e, issues: [] }, r);
          o instanceof Promise ? i.push(o.then((e) => Lr(e, n))) : Lr(o, n);
        }
        return i.length ? Promise.all(i).then(() => n) : n;
      }));
  });
  function Lr(e, t) {
    (e.issues.length && t.issues.push(...e.issues), t.value.add(e.value));
  }
  const Fr = we("$ZodEnum", (e, t) => {
      zn.init(e, t);
      const n = Se(t.entries),
        r = new Set(n);
      ((e._zod.values = r),
        (e._zod.pattern = new RegExp(
          `^(${n
            .filter((e) => Le.has(typeof e))
            .map((e) => ("string" == typeof e ? Be(e) : e.toString()))
            .join("|")})$`,
        )),
        (e._zod.parse = (t, o) => {
          const i = t.value;
          return (
            r.has(i) ||
              t.issues.push({
                code: "invalid_value",
                values: n,
                input: i,
                inst: e,
              }),
            t
          );
        }));
    }),
    Br = we("$ZodLiteral", (e, t) => {
      if ((zn.init(e, t), 0 === t.values.length))
        throw new Error("Cannot create literal schema with no valid values");
      ((e._zod.values = new Set(t.values)),
        (e._zod.pattern = new RegExp(
          `^(${t.values.map((e) => ("string" == typeof e ? Be(e) : e ? Be(e.toString()) : String(e))).join("|")})$`,
        )),
        (e._zod.parse = (n, r) => {
          const o = n.value;
          return (
            e._zod.values.has(o) ||
              n.issues.push({
                code: "invalid_value",
                values: t.values,
                input: o,
                inst: e,
              }),
            n
          );
        }));
    }),
    Wr = we("$ZodFile", (e, t) => {
      (zn.init(e, t),
        (e._zod.parse = (t, n) => {
          const r = t.value;
          return (
            r instanceof File ||
              t.issues.push({
                expected: "file",
                code: "invalid_type",
                input: r,
                inst: e,
              }),
            t
          );
        }));
    }),
    Hr = we("$ZodTransform", (e, t) => {
      (zn.init(e, t),
        (e._zod.parse = (e, n) => {
          const r = t.transform(e.value, e);
          if (n.async)
            return (r instanceof Promise ? r : Promise.resolve(r)).then(
              (t) => ((e.value = t), e),
            );
          if (r instanceof Promise) throw new xe();
          return ((e.value = r), e);
        }));
    });
  function Vr(e, t) {
    return e.issues.length && void 0 === t ? { issues: [], value: void 0 } : e;
  }
  const Jr = we("$ZodOptional", (e, t) => {
      (zn.init(e, t),
        (e._zod.optin = "optional"),
        (e._zod.optout = "optional"),
        Pe(e._zod, "values", () =>
          t.innerType._zod.values
            ? new Set([...t.innerType._zod.values, void 0])
            : void 0,
        ),
        Pe(e._zod, "pattern", () => {
          const e = t.innerType._zod.pattern;
          return e ? new RegExp(`^(${Ae(e.source)})?$`) : void 0;
        }),
        (e._zod.parse = (e, n) => {
          if ("optional" === t.innerType._zod.optin) {
            const r = t.innerType._zod.run(e, n);
            return r instanceof Promise
              ? r.then((t) => Vr(t, e.value))
              : Vr(r, e.value);
          }
          return void 0 === e.value ? e : t.innerType._zod.run(e, n);
        }));
    }),
    Kr = we("$ZodNullable", (e, t) => {
      (zn.init(e, t),
        Pe(e._zod, "optin", () => t.innerType._zod.optin),
        Pe(e._zod, "optout", () => t.innerType._zod.optout),
        Pe(e._zod, "pattern", () => {
          const e = t.innerType._zod.pattern;
          return e ? new RegExp(`^(${Ae(e.source)}|null)$`) : void 0;
        }),
        Pe(e._zod, "values", () =>
          t.innerType._zod.values
            ? new Set([...t.innerType._zod.values, null])
            : void 0,
        ),
        (e._zod.parse = (e, n) =>
          null === e.value ? e : t.innerType._zod.run(e, n)));
    }),
    Gr = we("$ZodDefault", (e, t) => {
      (zn.init(e, t),
        (e._zod.optin = "optional"),
        Pe(e._zod, "values", () => t.innerType._zod.values),
        (e._zod.parse = (e, n) => {
          if (void 0 === e.value) return ((e.value = t.defaultValue), e);
          const r = t.innerType._zod.run(e, n);
          return r instanceof Promise ? r.then((e) => Xr(e, t)) : Xr(r, t);
        }));
    });
  function Xr(e, t) {
    return (void 0 === e.value && (e.value = t.defaultValue), e);
  }
  const Yr = we("$ZodPrefault", (e, t) => {
      (zn.init(e, t),
        (e._zod.optin = "optional"),
        Pe(e._zod, "values", () => t.innerType._zod.values),
        (e._zod.parse = (e, n) => (
          void 0 === e.value && (e.value = t.defaultValue),
          t.innerType._zod.run(e, n)
        )));
    }),
    Qr = we("$ZodNonOptional", (e, t) => {
      (zn.init(e, t),
        Pe(e._zod, "values", () => {
          const e = t.innerType._zod.values;
          return e ? new Set([...e].filter((e) => void 0 !== e)) : void 0;
        }),
        (e._zod.parse = (n, r) => {
          const o = t.innerType._zod.run(n, r);
          return o instanceof Promise ? o.then((t) => eo(t, e)) : eo(o, e);
        }));
    });
  function eo(e, t) {
    return (
      e.issues.length ||
        void 0 !== e.value ||
        e.issues.push({
          code: "invalid_type",
          expected: "nonoptional",
          input: e.value,
          inst: t,
        }),
      e
    );
  }
  const to = we("$ZodSuccess", (e, t) => {
      (zn.init(e, t),
        (e._zod.parse = (e, n) => {
          const r = t.innerType._zod.run(e, n);
          return r instanceof Promise
            ? r.then((t) => ((e.value = 0 === t.issues.length), e))
            : ((e.value = 0 === r.issues.length), e);
        }));
    }),
    no = we("$ZodCatch", (e, t) => {
      (zn.init(e, t),
        Pe(e._zod, "optin", () => t.innerType._zod.optin),
        Pe(e._zod, "optout", () => t.innerType._zod.optout),
        Pe(e._zod, "values", () => t.innerType._zod.values),
        (e._zod.parse = (e, n) => {
          const r = t.innerType._zod.run(e, n);
          return r instanceof Promise
            ? r.then(
                (r) => (
                  (e.value = r.value),
                  r.issues.length &&
                    ((e.value = t.catchValue({
                      ...e,
                      error: { issues: r.issues.map((e) => at(e, n, Ie())) },
                      input: e.value,
                    })),
                    (e.issues = [])),
                  e
                ),
              )
            : ((e.value = r.value),
              r.issues.length &&
                ((e.value = t.catchValue({
                  ...e,
                  error: { issues: r.issues.map((e) => at(e, n, Ie())) },
                  input: e.value,
                })),
                (e.issues = [])),
              e);
        }));
    }),
    ro = we("$ZodNaN", (e, t) => {
      (zn.init(e, t),
        (e._zod.parse = (t, n) => (
          ("number" == typeof t.value && Number.isNaN(t.value)) ||
            t.issues.push({
              input: t.value,
              inst: e,
              expected: "nan",
              code: "invalid_type",
            }),
          t
        )));
    }),
    oo = we("$ZodPipe", (e, t) => {
      (zn.init(e, t),
        Pe(e._zod, "values", () => t.in._zod.values),
        Pe(e._zod, "optin", () => t.in._zod.optin),
        Pe(e._zod, "optout", () => t.out._zod.optout),
        Pe(e._zod, "propValues", () => t.in._zod.propValues),
        (e._zod.parse = (e, n) => {
          const r = t.in._zod.run(e, n);
          return r instanceof Promise
            ? r.then((e) => io(e, t, n))
            : io(r, t, n);
        }));
    });
  function io(e, t, n) {
    return e.issues.length
      ? e
      : t.out._zod.run({ value: e.value, issues: e.issues }, n);
  }
  const ao = we("$ZodReadonly", (e, t) => {
    (zn.init(e, t),
      Pe(e._zod, "propValues", () => t.innerType._zod.propValues),
      Pe(e._zod, "values", () => t.innerType._zod.values),
      Pe(e._zod, "optin", () => t.innerType._zod.optin),
      Pe(e._zod, "optout", () => t.innerType._zod.optout),
      (e._zod.parse = (e, n) => {
        const r = t.innerType._zod.run(e, n);
        return r instanceof Promise ? r.then(so) : so(r);
      }));
  });
  function so(e) {
    return ((e.value = Object.freeze(e.value)), e);
  }
  const lo = we("$ZodTemplateLiteral", (e, t) => {
      zn.init(e, t);
      const n = [];
      for (const e of t.parts)
        if (e instanceof zn) {
          if (!e._zod.pattern)
            throw new Error(
              `Invalid template literal part, no pattern found: ${[...e._zod.traits].shift()}`,
            );
          const t =
            e._zod.pattern instanceof RegExp
              ? e._zod.pattern.source
              : e._zod.pattern;
          if (!t)
            throw new Error(`Invalid template literal part: ${e._zod.traits}`);
          const r = t.startsWith("^") ? 1 : 0,
            o = t.endsWith("$") ? t.length - 1 : t.length;
          n.push(t.slice(r, o));
        } else {
          if (null !== e && !Fe.has(typeof e))
            throw new Error(`Invalid template literal part: ${e}`);
          n.push(Be(`${e}`));
        }
      ((e._zod.pattern = new RegExp(`^${n.join("")}$`)),
        (e._zod.parse = (n, r) =>
          "string" != typeof n.value
            ? (n.issues.push({
                input: n.value,
                inst: e,
                expected: "template_literal",
                code: "invalid_type",
              }),
              n)
            : ((e._zod.pattern.lastIndex = 0),
              e._zod.pattern.test(n.value) ||
                n.issues.push({
                  input: n.value,
                  inst: e,
                  code: "invalid_format",
                  format: t.format ?? "template_literal",
                  pattern: e._zod.pattern.source,
                }),
              n)));
    }),
    uo = we("$ZodPromise", (e, t) => {
      (zn.init(e, t),
        (e._zod.parse = (e, n) =>
          Promise.resolve(e.value).then((e) =>
            t.innerType._zod.run({ value: e, issues: [] }, n),
          )));
    }),
    co = we("$ZodLazy", (e, t) => {
      (zn.init(e, t),
        Pe(e._zod, "innerType", () => t.getter()),
        Pe(e._zod, "pattern", () => e._zod.innerType._zod.pattern),
        Pe(e._zod, "propValues", () => e._zod.innerType._zod.propValues),
        Pe(e._zod, "optin", () => e._zod.innerType._zod.optin ?? void 0),
        Pe(e._zod, "optout", () => e._zod.innerType._zod.optout ?? void 0),
        (e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n)));
    }),
    po = we("$ZodCustom", (e, t) => {
      (dn.init(e, t),
        zn.init(e, t),
        (e._zod.parse = (e, t) => e),
        (e._zod.check = (n) => {
          const r = n.value,
            o = t.fn(r);
          if (o instanceof Promise) return o.then((t) => mo(t, n, r, e));
          mo(o, n, r, e);
        }));
    });
  function mo(e, t, n, r) {
    if (!e) {
      const e = {
        code: "custom",
        input: n,
        inst: r,
        path: [...(r._zod.def.path ?? [])],
        continue: !r._zod.def.abort,
      };
      (r._zod.def.params && (e.params = r._zod.def.params),
        t.issues.push(ut(e)));
    }
  }
  const ho = () => {
      const e = {
        string: { unit: "حرف", verb: "أن يحوي" },
        file: { unit: "بايت", verb: "أن يحوي" },
        array: { unit: "عنصر", verb: "أن يحوي" },
        set: { unit: "عنصر", verb: "أن يحوي" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "مدخل",
        email: "بريد إلكتروني",
        url: "رابط",
        emoji: "إيموجي",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "تاريخ ووقت بمعيار ISO",
        date: "تاريخ بمعيار ISO",
        time: "وقت بمعيار ISO",
        duration: "مدة بمعيار ISO",
        ipv4: "عنوان IPv4",
        ipv6: "عنوان IPv6",
        cidrv4: "مدى عناوين بصيغة IPv4",
        cidrv6: "مدى عناوين بصيغة IPv6",
        base64: "نَص بترميز base64-encoded",
        base64url: "نَص بترميز base64url-encoded",
        json_string: "نَص على هيئة JSON",
        e164: "رقم هاتف بمعيار E.164",
        jwt: "JWT",
        template_literal: "مدخل",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `مدخلات غير مقبولة: يفترض إدخال ${e.expected}، ولكن تم إدخال ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "number";
                case "object":
                  if (Array.isArray(e)) return "array";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `مدخلات غير مقبولة: يفترض إدخال ${Ve(e.values[0])}`
              : `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? ` أكبر من اللازم: يفترض أن تكون ${e.origin ?? "القيمة"} ${n} ${e.maximum.toString()} ${r.unit ?? "عنصر"}`
              : `أكبر من اللازم: يفترض أن تكون ${e.origin ?? "القيمة"} ${n} ${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `أصغر من اللازم: يفترض لـ ${e.origin} أن يكون ${n} ${e.minimum.toString()} ${r.unit}`
              : `أصغر من اللازم: يفترض لـ ${e.origin} أن يكون ${n} ${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `نَص غير مقبول: يجب أن يبدأ بـ "${e.prefix}"`
              : "ends_with" === t.format
                ? `نَص غير مقبول: يجب أن ينتهي بـ "${t.suffix}"`
                : "includes" === t.format
                  ? `نَص غير مقبول: يجب أن يتضمَّن "${t.includes}"`
                  : "regex" === t.format
                    ? `نَص غير مقبول: يجب أن يطابق النمط ${t.pattern}`
                    : `${n[t.format] ?? e.format} غير مقبول`;
          }
          case "not_multiple_of":
            return `رقم غير مقبول: يجب أن يكون من مضاعفات ${e.divisor}`;
          case "unrecognized_keys":
            return `معرف${e.keys.length > 1 ? "ات" : ""} غريب${e.keys.length > 1 ? "ة" : ""}: ${Te(e.keys, "، ")}`;
          case "invalid_key":
            return `معرف غير مقبول في ${e.origin}`;
          case "invalid_union":
          default:
            return "مدخل غير مقبول";
          case "invalid_element":
            return `مدخل غير مقبول في ${e.origin}`;
        }
      };
    },
    go = () => {
      const e = {
        string: { unit: "simvol", verb: "olmalıdır" },
        file: { unit: "bayt", verb: "olmalıdır" },
        array: { unit: "element", verb: "olmalıdır" },
        set: { unit: "element", verb: "olmalıdır" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "input",
        email: "email address",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datetime",
        date: "ISO date",
        time: "ISO time",
        duration: "ISO duration",
        ipv4: "IPv4 address",
        ipv6: "IPv6 address",
        cidrv4: "IPv4 range",
        cidrv6: "IPv6 range",
        base64: "base64-encoded string",
        base64url: "base64url-encoded string",
        json_string: "JSON string",
        e164: "E.164 number",
        jwt: "JWT",
        template_literal: "input",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Yanlış dəyər: gözlənilən ${e.expected}, daxil olan ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "number";
                case "object":
                  if (Array.isArray(e)) return "array";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Yanlış dəyər: gözlənilən ${Ve(e.values[0])}`
              : `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Çox böyük: gözlənilən ${e.origin ?? "dəyər"} ${n}${e.maximum.toString()} ${r.unit ?? "element"}`
              : `Çox böyük: gözlənilən ${e.origin ?? "dəyər"} ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Çox kiçik: gözlənilən ${e.origin} ${n}${e.minimum.toString()} ${r.unit}`
              : `Çox kiçik: gözlənilən ${e.origin} ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Yanlış mətn: "${t.prefix}" ilə başlamalıdır`
              : "ends_with" === t.format
                ? `Yanlış mətn: "${t.suffix}" ilə bitməlidir`
                : "includes" === t.format
                  ? `Yanlış mətn: "${t.includes}" daxil olmalıdır`
                  : "regex" === t.format
                    ? `Yanlış mətn: ${t.pattern} şablonuna uyğun olmalıdır`
                    : `Yanlış ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Yanlış ədəd: ${e.divisor} ilə bölünə bilən olmalıdır`;
          case "unrecognized_keys":
            return `Tanınmayan açar${e.keys.length > 1 ? "lar" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `${e.origin} daxilində yanlış açar`;
          case "invalid_union":
          default:
            return "Yanlış dəyər";
          case "invalid_element":
            return `${e.origin} daxilində yanlış dəyər`;
        }
      };
    };
  function fo(e, t, n, r) {
    const o = Math.abs(e),
      i = o % 10,
      a = o % 100;
    return a >= 11 && a <= 19 ? r : 1 === i ? t : i >= 2 && i <= 4 ? n : r;
  }
  const vo = () => {
      const e = {
        string: {
          unit: { one: "сімвал", few: "сімвалы", many: "сімвалаў" },
          verb: "мець",
        },
        array: {
          unit: { one: "элемент", few: "элементы", many: "элементаў" },
          verb: "мець",
        },
        set: {
          unit: { one: "элемент", few: "элементы", many: "элементаў" },
          verb: "мець",
        },
        file: {
          unit: { one: "байт", few: "байты", many: "байтаў" },
          verb: "мець",
        },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "увод",
        email: "email адрас",
        url: "URL",
        emoji: "эмодзі",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO дата і час",
        date: "ISO дата",
        time: "ISO час",
        duration: "ISO працягласць",
        ipv4: "IPv4 адрас",
        ipv6: "IPv6 адрас",
        cidrv4: "IPv4 дыяпазон",
        cidrv6: "IPv6 дыяпазон",
        base64: "радок у фармаце base64",
        base64url: "радок у фармаце base64url",
        json_string: "JSON радок",
        e164: "нумар E.164",
        jwt: "JWT",
        template_literal: "увод",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Няправільны ўвод: чакаўся ${e.expected}, атрымана ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "лік";
                case "object":
                  if (Array.isArray(e)) return "масіў";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Няправільны ўвод: чакалася ${Ve(e.values[0])}`
              : `Няправільны варыянт: чакаўся адзін з ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            if (r) {
              const t = fo(
                Number(e.maximum),
                r.unit.one,
                r.unit.few,
                r.unit.many,
              );
              return `Занадта вялікі: чакалася, што ${e.origin ?? "значэнне"} павінна ${r.verb} ${n}${e.maximum.toString()} ${t}`;
            }
            return `Занадта вялікі: чакалася, што ${e.origin ?? "значэнне"} павінна быць ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            if (r) {
              const t = fo(
                Number(e.minimum),
                r.unit.one,
                r.unit.few,
                r.unit.many,
              );
              return `Занадта малы: чакалася, што ${e.origin} павінна ${r.verb} ${n}${e.minimum.toString()} ${t}`;
            }
            return `Занадта малы: чакалася, што ${e.origin} павінна быць ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Няправільны радок: павінен пачынацца з "${t.prefix}"`
              : "ends_with" === t.format
                ? `Няправільны радок: павінен заканчвацца на "${t.suffix}"`
                : "includes" === t.format
                  ? `Няправільны радок: павінен змяшчаць "${t.includes}"`
                  : "regex" === t.format
                    ? `Няправільны радок: павінен адпавядаць шаблону ${t.pattern}`
                    : `Няправільны ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Няправільны лік: павінен быць кратным ${e.divisor}`;
          case "unrecognized_keys":
            return `Нераспазнаны ${e.keys.length > 1 ? "ключы" : "ключ"}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Няправільны ключ у ${e.origin}`;
          case "invalid_union":
          default:
            return "Няправільны ўвод";
          case "invalid_element":
            return `Няправільнае значэнне ў ${e.origin}`;
        }
      };
    },
    yo = () => {
      const e = {
        string: { unit: "caràcters", verb: "contenir" },
        file: { unit: "bytes", verb: "contenir" },
        array: { unit: "elements", verb: "contenir" },
        set: { unit: "elements", verb: "contenir" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "entrada",
        email: "adreça electrònica",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "data i hora ISO",
        date: "data ISO",
        time: "hora ISO",
        duration: "durada ISO",
        ipv4: "adreça IPv4",
        ipv6: "adreça IPv6",
        cidrv4: "rang IPv4",
        cidrv6: "rang IPv6",
        base64: "cadena codificada en base64",
        base64url: "cadena codificada en base64url",
        json_string: "cadena JSON",
        e164: "número E.164",
        jwt: "JWT",
        template_literal: "entrada",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Tipus invàlid: s'esperava ${e.expected}, s'ha rebut ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "number";
                case "object":
                  if (Array.isArray(e)) return "array";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Valor invàlid: s'esperava ${Ve(e.values[0])}`
              : `Opció invàlida: s'esperava una de ${Te(e.values, " o ")}`;
          case "too_big": {
            const n = e.inclusive ? "com a màxim" : "menys de",
              r = t(e.origin);
            return r
              ? `Massa gran: s'esperava que ${e.origin ?? "el valor"} contingués ${n} ${e.maximum.toString()} ${r.unit ?? "elements"}`
              : `Massa gran: s'esperava que ${e.origin ?? "el valor"} fos ${n} ${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? "com a mínim" : "més de",
              r = t(e.origin);
            return r
              ? `Massa petit: s'esperava que ${e.origin} contingués ${n} ${e.minimum.toString()} ${r.unit}`
              : `Massa petit: s'esperava que ${e.origin} fos ${n} ${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Format invàlid: ha de començar amb "${t.prefix}"`
              : "ends_with" === t.format
                ? `Format invàlid: ha d'acabar amb "${t.suffix}"`
                : "includes" === t.format
                  ? `Format invàlid: ha d'incloure "${t.includes}"`
                  : "regex" === t.format
                    ? `Format invàlid: ha de coincidir amb el patró ${t.pattern}`
                    : `Format invàlid per a ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Número invàlid: ha de ser múltiple de ${e.divisor}`;
          case "unrecognized_keys":
            return `Clau${e.keys.length > 1 ? "s" : ""} no reconeguda${e.keys.length > 1 ? "s" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Clau invàlida a ${e.origin}`;
          case "invalid_union":
          default:
            return "Entrada invàlida";
          case "invalid_element":
            return `Element invàlid a ${e.origin}`;
        }
      };
    },
    bo = () => {
      const e = {
        string: { unit: "znaků", verb: "mít" },
        file: { unit: "bajtů", verb: "mít" },
        array: { unit: "prvků", verb: "mít" },
        set: { unit: "prvků", verb: "mít" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "regulární výraz",
        email: "e-mailová adresa",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "datum a čas ve formátu ISO",
        date: "datum ve formátu ISO",
        time: "čas ve formátu ISO",
        duration: "doba trvání ISO",
        ipv4: "IPv4 adresa",
        ipv6: "IPv6 adresa",
        cidrv4: "rozsah IPv4",
        cidrv6: "rozsah IPv6",
        base64: "řetězec zakódovaný ve formátu base64",
        base64url: "řetězec zakódovaný ve formátu base64url",
        json_string: "řetězec ve formátu JSON",
        e164: "číslo E.164",
        jwt: "JWT",
        template_literal: "vstup",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Neplatný vstup: očekáváno ${e.expected}, obdrženo ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "číslo";
                case "string":
                  return "řetězec";
                case "boolean":
                  return "boolean";
                case "bigint":
                  return "bigint";
                case "function":
                  return "funkce";
                case "symbol":
                  return "symbol";
                case "undefined":
                  return "undefined";
                case "object":
                  if (Array.isArray(e)) return "pole";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Neplatný vstup: očekáváno ${Ve(e.values[0])}`
              : `Neplatná možnost: očekávána jedna z hodnot ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Hodnota je příliš velká: ${e.origin ?? "hodnota"} musí mít ${n}${e.maximum.toString()} ${r.unit ?? "prvků"}`
              : `Hodnota je příliš velká: ${e.origin ?? "hodnota"} musí být ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Hodnota je příliš malá: ${e.origin ?? "hodnota"} musí mít ${n}${e.minimum.toString()} ${r.unit ?? "prvků"}`
              : `Hodnota je příliš malá: ${e.origin ?? "hodnota"} musí být ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Neplatný řetězec: musí začínat na "${t.prefix}"`
              : "ends_with" === t.format
                ? `Neplatný řetězec: musí končit na "${t.suffix}"`
                : "includes" === t.format
                  ? `Neplatný řetězec: musí obsahovat "${t.includes}"`
                  : "regex" === t.format
                    ? `Neplatný řetězec: musí odpovídat vzoru ${t.pattern}`
                    : `Neplatný formát ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Neplatné číslo: musí být násobkem ${e.divisor}`;
          case "unrecognized_keys":
            return `Neznámé klíče: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Neplatný klíč v ${e.origin}`;
          case "invalid_union":
          default:
            return "Neplatný vstup";
          case "invalid_element":
            return `Neplatná hodnota v ${e.origin}`;
        }
      };
    },
    _o = () => {
      const e = {
          string: { unit: "tegn", verb: "havde" },
          file: { unit: "bytes", verb: "havde" },
          array: { unit: "elementer", verb: "indeholdt" },
          set: { unit: "elementer", verb: "indeholdt" },
        },
        t = {
          string: "streng",
          number: "tal",
          boolean: "boolean",
          array: "liste",
          object: "objekt",
          set: "sæt",
          file: "fil",
        };
      function n(t) {
        return e[t] ?? null;
      }
      function r(e) {
        return t[e] ?? e;
      }
      const o = {
        regex: "input",
        email: "e-mailadresse",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO dato- og klokkeslæt",
        date: "ISO-dato",
        time: "ISO-klokkeslæt",
        duration: "ISO-varighed",
        ipv4: "IPv4-område",
        ipv6: "IPv6-område",
        cidrv4: "IPv4-spektrum",
        cidrv6: "IPv6-spektrum",
        base64: "base64-kodet streng",
        base64url: "base64url-kodet streng",
        json_string: "JSON-streng",
        e164: "E.164-nummer",
        jwt: "JWT",
        template_literal: "input",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Ugyldigt input: forventede ${r(e.expected)}, fik ${r(
              ((e) => {
                const t = typeof e;
                switch (t) {
                  case "number":
                    return Number.isNaN(e) ? "NaN" : "tal";
                  case "object":
                    return Array.isArray(e)
                      ? "liste"
                      : null === e
                        ? "null"
                        : Object.getPrototypeOf(e) !== Object.prototype &&
                            e.constructor
                          ? e.constructor.name
                          : "objekt";
                }
                return t;
              })(e.input),
            )}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Ugyldig værdi: forventede ${Ve(e.values[0])}`
              : `Ugyldigt valg: forventede en af følgende ${Te(e.values, "|")}`;
          case "too_big": {
            const t = e.inclusive ? "<=" : "<",
              o = n(e.origin),
              i = r(e.origin);
            return o
              ? `For stor: forventede ${i ?? "value"} ${o.verb} ${t} ${e.maximum.toString()} ${o.unit ?? "elementer"}`
              : `For stor: forventede ${i ?? "value"} havde ${t} ${e.maximum.toString()}`;
          }
          case "too_small": {
            const t = e.inclusive ? ">=" : ">",
              o = n(e.origin),
              i = r(e.origin);
            return o
              ? `For lille: forventede ${i} ${o.verb} ${t} ${e.minimum.toString()} ${o.unit}`
              : `For lille: forventede ${i} havde ${t} ${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Ugyldig streng: skal starte med "${t.prefix}"`
              : "ends_with" === t.format
                ? `Ugyldig streng: skal ende med "${t.suffix}"`
                : "includes" === t.format
                  ? `Ugyldig streng: skal indeholde "${t.includes}"`
                  : "regex" === t.format
                    ? `Ugyldig streng: skal matche mønsteret ${t.pattern}`
                    : `Ugyldig ${o[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Ugyldigt tal: skal være deleligt med ${e.divisor}`;
          case "unrecognized_keys":
            return `${e.keys.length > 1 ? "Ukendte nøgler" : "Ukendt nøgle"}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Ugyldig nøgle i ${e.origin}`;
          case "invalid_union":
            return "Ugyldigt input: matcher ingen af de tilladte typer";
          case "invalid_element":
            return `Ugyldig værdi i ${e.origin}`;
          default:
            return "Ugyldigt input";
        }
      };
    },
    wo = () => {
      const e = {
        string: { unit: "Zeichen", verb: "zu haben" },
        file: { unit: "Bytes", verb: "zu haben" },
        array: { unit: "Elemente", verb: "zu haben" },
        set: { unit: "Elemente", verb: "zu haben" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "Eingabe",
        email: "E-Mail-Adresse",
        url: "URL",
        emoji: "Emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO-Datum und -Uhrzeit",
        date: "ISO-Datum",
        time: "ISO-Uhrzeit",
        duration: "ISO-Dauer",
        ipv4: "IPv4-Adresse",
        ipv6: "IPv6-Adresse",
        cidrv4: "IPv4-Bereich",
        cidrv6: "IPv6-Bereich",
        base64: "Base64-codierter String",
        base64url: "Base64-URL-codierter String",
        json_string: "JSON-String",
        e164: "E.164-Nummer",
        jwt: "JWT",
        template_literal: "Eingabe",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Ungültige Eingabe: erwartet ${e.expected}, erhalten ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "Zahl";
                case "object":
                  if (Array.isArray(e)) return "Array";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Ungültige Eingabe: erwartet ${Ve(e.values[0])}`
              : `Ungültige Option: erwartet eine von ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Zu groß: erwartet, dass ${e.origin ?? "Wert"} ${n}${e.maximum.toString()} ${r.unit ?? "Elemente"} hat`
              : `Zu groß: erwartet, dass ${e.origin ?? "Wert"} ${n}${e.maximum.toString()} ist`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Zu klein: erwartet, dass ${e.origin} ${n}${e.minimum.toString()} ${r.unit} hat`
              : `Zu klein: erwartet, dass ${e.origin} ${n}${e.minimum.toString()} ist`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Ungültiger String: muss mit "${t.prefix}" beginnen`
              : "ends_with" === t.format
                ? `Ungültiger String: muss mit "${t.suffix}" enden`
                : "includes" === t.format
                  ? `Ungültiger String: muss "${t.includes}" enthalten`
                  : "regex" === t.format
                    ? `Ungültiger String: muss dem Muster ${t.pattern} entsprechen`
                    : `Ungültig: ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Ungültige Zahl: muss ein Vielfaches von ${e.divisor} sein`;
          case "unrecognized_keys":
            return `${e.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Ungültiger Schlüssel in ${e.origin}`;
          case "invalid_union":
          default:
            return "Ungültige Eingabe";
          case "invalid_element":
            return `Ungültiger Wert in ${e.origin}`;
        }
      };
    },
    ko = () => {
      const e = {
        string: { unit: "characters", verb: "to have" },
        file: { unit: "bytes", verb: "to have" },
        array: { unit: "items", verb: "to have" },
        set: { unit: "items", verb: "to have" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "input",
        email: "email address",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datetime",
        date: "ISO date",
        time: "ISO time",
        duration: "ISO duration",
        ipv4: "IPv4 address",
        ipv6: "IPv6 address",
        cidrv4: "IPv4 range",
        cidrv6: "IPv6 range",
        base64: "base64-encoded string",
        base64url: "base64url-encoded string",
        json_string: "JSON string",
        e164: "E.164 number",
        jwt: "JWT",
        template_literal: "input",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Invalid input: expected ${e.expected}, received ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "number";
                case "object":
                  if (Array.isArray(e)) return "array";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Invalid input: expected ${Ve(e.values[0])}`
              : `Invalid option: expected one of ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Too big: expected ${e.origin ?? "value"} to have ${n}${e.maximum.toString()} ${r.unit ?? "elements"}`
              : `Too big: expected ${e.origin ?? "value"} to be ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}`
              : `Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Invalid string: must start with "${t.prefix}"`
              : "ends_with" === t.format
                ? `Invalid string: must end with "${t.suffix}"`
                : "includes" === t.format
                  ? `Invalid string: must include "${t.includes}"`
                  : "regex" === t.format
                    ? `Invalid string: must match pattern ${t.pattern}`
                    : `Invalid ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Invalid number: must be a multiple of ${e.divisor}`;
          case "unrecognized_keys":
            return `Unrecognized key${e.keys.length > 1 ? "s" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Invalid key in ${e.origin}`;
          case "invalid_union":
          default:
            return "Invalid input";
          case "invalid_element":
            return `Invalid value in ${e.origin}`;
        }
      };
    };
  function xo() {
    return { localeError: ko() };
  }
  const $o = () => {
      const e = {
        string: { unit: "karaktrojn", verb: "havi" },
        file: { unit: "bajtojn", verb: "havi" },
        array: { unit: "elementojn", verb: "havi" },
        set: { unit: "elementojn", verb: "havi" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "enigo",
        email: "retadreso",
        url: "URL",
        emoji: "emoĝio",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO-datotempo",
        date: "ISO-dato",
        time: "ISO-tempo",
        duration: "ISO-daŭro",
        ipv4: "IPv4-adreso",
        ipv6: "IPv6-adreso",
        cidrv4: "IPv4-rango",
        cidrv6: "IPv6-rango",
        base64: "64-ume kodita karaktraro",
        base64url: "URL-64-ume kodita karaktraro",
        json_string: "JSON-karaktraro",
        e164: "E.164-nombro",
        jwt: "JWT",
        template_literal: "enigo",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Nevalida enigo: atendiĝis ${e.expected}, riceviĝis ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "nombro";
                case "object":
                  if (Array.isArray(e)) return "tabelo";
                  if (null === e) return "senvalora";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Nevalida enigo: atendiĝis ${Ve(e.values[0])}`
              : `Nevalida opcio: atendiĝis unu el ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Tro granda: atendiĝis ke ${e.origin ?? "valoro"} havu ${n}${e.maximum.toString()} ${r.unit ?? "elementojn"}`
              : `Tro granda: atendiĝis ke ${e.origin ?? "valoro"} havu ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Tro malgranda: atendiĝis ke ${e.origin} havu ${n}${e.minimum.toString()} ${r.unit}`
              : `Tro malgranda: atendiĝis ke ${e.origin} estu ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Nevalida karaktraro: devas komenciĝi per "${t.prefix}"`
              : "ends_with" === t.format
                ? `Nevalida karaktraro: devas finiĝi per "${t.suffix}"`
                : "includes" === t.format
                  ? `Nevalida karaktraro: devas inkluzivi "${t.includes}"`
                  : "regex" === t.format
                    ? `Nevalida karaktraro: devas kongrui kun la modelo ${t.pattern}`
                    : `Nevalida ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Nevalida nombro: devas esti oblo de ${e.divisor}`;
          case "unrecognized_keys":
            return `Nekonata${e.keys.length > 1 ? "j" : ""} ŝlosilo${e.keys.length > 1 ? "j" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Nevalida ŝlosilo en ${e.origin}`;
          case "invalid_union":
          default:
            return "Nevalida enigo";
          case "invalid_element":
            return `Nevalida valoro en ${e.origin}`;
        }
      };
    },
    Io = () => {
      const e = {
        string: { unit: "caracteres", verb: "tener" },
        file: { unit: "bytes", verb: "tener" },
        array: { unit: "elementos", verb: "tener" },
        set: { unit: "elementos", verb: "tener" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "entrada",
        email: "dirección de correo electrónico",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "fecha y hora ISO",
        date: "fecha ISO",
        time: "hora ISO",
        duration: "duración ISO",
        ipv4: "dirección IPv4",
        ipv6: "dirección IPv6",
        cidrv4: "rango IPv4",
        cidrv6: "rango IPv6",
        base64: "cadena codificada en base64",
        base64url: "URL codificada en base64",
        json_string: "cadena JSON",
        e164: "número E.164",
        jwt: "JWT",
        template_literal: "entrada",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Entrada inválida: se esperaba ${e.expected}, recibido ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "número";
                case "object":
                  if (Array.isArray(e)) return "arreglo";
                  if (null === e) return "nulo";
                  if (Object.getPrototypeOf(e) !== Object.prototype)
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Entrada inválida: se esperaba ${Ve(e.values[0])}`
              : `Opción inválida: se esperaba una de ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Demasiado grande: se esperaba que ${e.origin ?? "valor"} tuviera ${n}${e.maximum.toString()} ${r.unit ?? "elementos"}`
              : `Demasiado grande: se esperaba que ${e.origin ?? "valor"} fuera ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Demasiado pequeño: se esperaba que ${e.origin} tuviera ${n}${e.minimum.toString()} ${r.unit}`
              : `Demasiado pequeño: se esperaba que ${e.origin} fuera ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Cadena inválida: debe comenzar con "${t.prefix}"`
              : "ends_with" === t.format
                ? `Cadena inválida: debe terminar en "${t.suffix}"`
                : "includes" === t.format
                  ? `Cadena inválida: debe incluir "${t.includes}"`
                  : "regex" === t.format
                    ? `Cadena inválida: debe coincidir con el patrón ${t.pattern}`
                    : `Inválido ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Número inválido: debe ser múltiplo de ${e.divisor}`;
          case "unrecognized_keys":
            return `Llave${e.keys.length > 1 ? "s" : ""} desconocida${e.keys.length > 1 ? "s" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Llave inválida en ${e.origin}`;
          case "invalid_union":
          default:
            return "Entrada inválida";
          case "invalid_element":
            return `Valor inválido en ${e.origin}`;
        }
      };
    },
    So = () => {
      const e = {
        string: { unit: "کاراکتر", verb: "داشته باشد" },
        file: { unit: "بایت", verb: "داشته باشد" },
        array: { unit: "آیتم", verb: "داشته باشد" },
        set: { unit: "آیتم", verb: "داشته باشد" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "ورودی",
        email: "آدرس ایمیل",
        url: "URL",
        emoji: "ایموجی",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "تاریخ و زمان ایزو",
        date: "تاریخ ایزو",
        time: "زمان ایزو",
        duration: "مدت زمان ایزو",
        ipv4: "IPv4 آدرس",
        ipv6: "IPv6 آدرس",
        cidrv4: "IPv4 دامنه",
        cidrv6: "IPv6 دامنه",
        base64: "base64-encoded رشته",
        base64url: "base64url-encoded رشته",
        json_string: "JSON رشته",
        e164: "E.164 عدد",
        jwt: "JWT",
        template_literal: "ورودی",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `ورودی نامعتبر: می‌بایست ${e.expected} می‌بود، ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "عدد";
                case "object":
                  if (Array.isArray(e)) return "آرایه";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)} دریافت شد`;
          case "invalid_value":
            return 1 === e.values.length
              ? `ورودی نامعتبر: می‌بایست ${Ve(e.values[0])} می‌بود`
              : `گزینه نامعتبر: می‌بایست یکی از ${Te(e.values, "|")} می‌بود`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `خیلی بزرگ: ${e.origin ?? "مقدار"} باید ${n}${e.maximum.toString()} ${r.unit ?? "عنصر"} باشد`
              : `خیلی بزرگ: ${e.origin ?? "مقدار"} باید ${n}${e.maximum.toString()} باشد`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `خیلی کوچک: ${e.origin} باید ${n}${e.minimum.toString()} ${r.unit} باشد`
              : `خیلی کوچک: ${e.origin} باید ${n}${e.minimum.toString()} باشد`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `رشته نامعتبر: باید با "${t.prefix}" شروع شود`
              : "ends_with" === t.format
                ? `رشته نامعتبر: باید با "${t.suffix}" تمام شود`
                : "includes" === t.format
                  ? `رشته نامعتبر: باید شامل "${t.includes}" باشد`
                  : "regex" === t.format
                    ? `رشته نامعتبر: باید با الگوی ${t.pattern} مطابقت داشته باشد`
                    : `${n[t.format] ?? e.format} نامعتبر`;
          }
          case "not_multiple_of":
            return `عدد نامعتبر: باید مضرب ${e.divisor} باشد`;
          case "unrecognized_keys":
            return `کلید${e.keys.length > 1 ? "های" : ""} ناشناس: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `کلید ناشناس در ${e.origin}`;
          case "invalid_union":
          default:
            return "ورودی نامعتبر";
          case "invalid_element":
            return `مقدار نامعتبر در ${e.origin}`;
        }
      };
    },
    To = () => {
      const e = {
        string: { unit: "merkkiä", subject: "merkkijonon" },
        file: { unit: "tavua", subject: "tiedoston" },
        array: { unit: "alkiota", subject: "listan" },
        set: { unit: "alkiota", subject: "joukon" },
        number: { unit: "", subject: "luvun" },
        bigint: { unit: "", subject: "suuren kokonaisluvun" },
        int: { unit: "", subject: "kokonaisluvun" },
        date: { unit: "", subject: "päivämäärän" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "säännöllinen lauseke",
        email: "sähköpostiosoite",
        url: "URL-osoite",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO-aikaleima",
        date: "ISO-päivämäärä",
        time: "ISO-aika",
        duration: "ISO-kesto",
        ipv4: "IPv4-osoite",
        ipv6: "IPv6-osoite",
        cidrv4: "IPv4-alue",
        cidrv6: "IPv6-alue",
        base64: "base64-koodattu merkkijono",
        base64url: "base64url-koodattu merkkijono",
        json_string: "JSON-merkkijono",
        e164: "E.164-luku",
        jwt: "JWT",
        template_literal: "templaattimerkkijono",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Virheellinen tyyppi: odotettiin ${e.expected}, oli ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "number";
                case "object":
                  if (Array.isArray(e)) return "array";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Virheellinen syöte: täytyy olla ${Ve(e.values[0])}`
              : `Virheellinen valinta: täytyy olla yksi seuraavista: ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Liian suuri: ${r.subject} täytyy olla ${n}${e.maximum.toString()} ${r.unit}`.trim()
              : `Liian suuri: arvon täytyy olla ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Liian pieni: ${r.subject} täytyy olla ${n}${e.minimum.toString()} ${r.unit}`.trim()
              : `Liian pieni: arvon täytyy olla ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Virheellinen syöte: täytyy alkaa "${t.prefix}"`
              : "ends_with" === t.format
                ? `Virheellinen syöte: täytyy loppua "${t.suffix}"`
                : "includes" === t.format
                  ? `Virheellinen syöte: täytyy sisältää "${t.includes}"`
                  : "regex" === t.format
                    ? `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${t.pattern}`
                    : `Virheellinen ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Virheellinen luku: täytyy olla luvun ${e.divisor} monikerta`;
          case "unrecognized_keys":
            return `${e.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return "Virheellinen avain tietueessa";
          case "invalid_union":
            return "Virheellinen unioni";
          case "invalid_element":
            return "Virheellinen arvo joukossa";
          default:
            return "Virheellinen syöte";
        }
      };
    },
    No = () => {
      const e = {
        string: { unit: "caractères", verb: "avoir" },
        file: { unit: "octets", verb: "avoir" },
        array: { unit: "éléments", verb: "avoir" },
        set: { unit: "éléments", verb: "avoir" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "entrée",
        email: "adresse e-mail",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "date et heure ISO",
        date: "date ISO",
        time: "heure ISO",
        duration: "durée ISO",
        ipv4: "adresse IPv4",
        ipv6: "adresse IPv6",
        cidrv4: "plage IPv4",
        cidrv6: "plage IPv6",
        base64: "chaîne encodée en base64",
        base64url: "chaîne encodée en base64url",
        json_string: "chaîne JSON",
        e164: "numéro E.164",
        jwt: "JWT",
        template_literal: "entrée",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Entrée invalide : ${e.expected} attendu, ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "nombre";
                case "object":
                  if (Array.isArray(e)) return "tableau";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)} reçu`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Entrée invalide : ${Ve(e.values[0])} attendu`
              : `Option invalide : une valeur parmi ${Te(e.values, "|")} attendue`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Trop grand : ${e.origin ?? "valeur"} doit ${r.verb} ${n}${e.maximum.toString()} ${r.unit ?? "élément(s)"}`
              : `Trop grand : ${e.origin ?? "valeur"} doit être ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Trop petit : ${e.origin} doit ${r.verb} ${n}${e.minimum.toString()} ${r.unit}`
              : `Trop petit : ${e.origin} doit être ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Chaîne invalide : doit commencer par "${t.prefix}"`
              : "ends_with" === t.format
                ? `Chaîne invalide : doit se terminer par "${t.suffix}"`
                : "includes" === t.format
                  ? `Chaîne invalide : doit inclure "${t.includes}"`
                  : "regex" === t.format
                    ? `Chaîne invalide : doit correspondre au modèle ${t.pattern}`
                    : `${n[t.format] ?? e.format} invalide`;
          }
          case "not_multiple_of":
            return `Nombre invalide : doit être un multiple de ${e.divisor}`;
          case "unrecognized_keys":
            return `Clé${e.keys.length > 1 ? "s" : ""} non reconnue${e.keys.length > 1 ? "s" : ""} : ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Clé invalide dans ${e.origin}`;
          case "invalid_union":
          default:
            return "Entrée invalide";
          case "invalid_element":
            return `Valeur invalide dans ${e.origin}`;
        }
      };
    },
    Oo = () => {
      const e = {
        string: { unit: "caractères", verb: "avoir" },
        file: { unit: "octets", verb: "avoir" },
        array: { unit: "éléments", verb: "avoir" },
        set: { unit: "éléments", verb: "avoir" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "entrée",
        email: "adresse courriel",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "date-heure ISO",
        date: "date ISO",
        time: "heure ISO",
        duration: "durée ISO",
        ipv4: "adresse IPv4",
        ipv6: "adresse IPv6",
        cidrv4: "plage IPv4",
        cidrv6: "plage IPv6",
        base64: "chaîne encodée en base64",
        base64url: "chaîne encodée en base64url",
        json_string: "chaîne JSON",
        e164: "numéro E.164",
        jwt: "JWT",
        template_literal: "entrée",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Entrée invalide : attendu ${e.expected}, reçu ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "number";
                case "object":
                  if (Array.isArray(e)) return "array";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Entrée invalide : attendu ${Ve(e.values[0])}`
              : `Option invalide : attendu l'une des valeurs suivantes ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "≤" : "<",
              r = t(e.origin);
            return r
              ? `Trop grand : attendu que ${e.origin ?? "la valeur"} ait ${n}${e.maximum.toString()} ${r.unit}`
              : `Trop grand : attendu que ${e.origin ?? "la valeur"} soit ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? "≥" : ">",
              r = t(e.origin);
            return r
              ? `Trop petit : attendu que ${e.origin} ait ${n}${e.minimum.toString()} ${r.unit}`
              : `Trop petit : attendu que ${e.origin} soit ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Chaîne invalide : doit commencer par "${t.prefix}"`
              : "ends_with" === t.format
                ? `Chaîne invalide : doit se terminer par "${t.suffix}"`
                : "includes" === t.format
                  ? `Chaîne invalide : doit inclure "${t.includes}"`
                  : "regex" === t.format
                    ? `Chaîne invalide : doit correspondre au motif ${t.pattern}`
                    : `${n[t.format] ?? e.format} invalide`;
          }
          case "not_multiple_of":
            return `Nombre invalide : doit être un multiple de ${e.divisor}`;
          case "unrecognized_keys":
            return `Clé${e.keys.length > 1 ? "s" : ""} non reconnue${e.keys.length > 1 ? "s" : ""} : ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Clé invalide dans ${e.origin}`;
          case "invalid_union":
          default:
            return "Entrée invalide";
          case "invalid_element":
            return `Valeur invalide dans ${e.origin}`;
        }
      };
    },
    Eo = () => {
      const e = {
        string: { unit: "אותיות", verb: "לכלול" },
        file: { unit: "בייטים", verb: "לכלול" },
        array: { unit: "פריטים", verb: "לכלול" },
        set: { unit: "פריטים", verb: "לכלול" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "קלט",
        email: "כתובת אימייל",
        url: "כתובת רשת",
        emoji: "אימוג'י",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "תאריך וזמן ISO",
        date: "תאריך ISO",
        time: "זמן ISO",
        duration: "משך זמן ISO",
        ipv4: "כתובת IPv4",
        ipv6: "כתובת IPv6",
        cidrv4: "טווח IPv4",
        cidrv6: "טווח IPv6",
        base64: "מחרוזת בבסיס 64",
        base64url: "מחרוזת בבסיס 64 לכתובות רשת",
        json_string: "מחרוזת JSON",
        e164: "מספר E.164",
        jwt: "JWT",
        template_literal: "קלט",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `קלט לא תקין: צריך ${e.expected}, התקבל ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "number";
                case "object":
                  if (Array.isArray(e)) return "array";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `קלט לא תקין: צריך ${Ve(e.values[0])}`
              : `קלט לא תקין: צריך אחת מהאפשרויות  ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `גדול מדי: ${e.origin ?? "value"} צריך להיות ${n}${e.maximum.toString()} ${r.unit ?? "elements"}`
              : `גדול מדי: ${e.origin ?? "value"} צריך להיות ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `קטן מדי: ${e.origin} צריך להיות ${n}${e.minimum.toString()} ${r.unit}`
              : `קטן מדי: ${e.origin} צריך להיות ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `מחרוזת לא תקינה: חייבת להתחיל ב"${t.prefix}"`
              : "ends_with" === t.format
                ? `מחרוזת לא תקינה: חייבת להסתיים ב "${t.suffix}"`
                : "includes" === t.format
                  ? `מחרוזת לא תקינה: חייבת לכלול "${t.includes}"`
                  : "regex" === t.format
                    ? `מחרוזת לא תקינה: חייבת להתאים לתבנית ${t.pattern}`
                    : `${n[t.format] ?? e.format} לא תקין`;
          }
          case "not_multiple_of":
            return `מספר לא תקין: חייב להיות מכפלה של ${e.divisor}`;
          case "unrecognized_keys":
            return `מפתח${e.keys.length > 1 ? "ות" : ""} לא מזוה${e.keys.length > 1 ? "ים" : "ה"}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `מפתח לא תקין ב${e.origin}`;
          case "invalid_union":
          default:
            return "קלט לא תקין";
          case "invalid_element":
            return `ערך לא תקין ב${e.origin}`;
        }
      };
    },
    Ao = () => {
      const e = {
        string: { unit: "karakter", verb: "legyen" },
        file: { unit: "byte", verb: "legyen" },
        array: { unit: "elem", verb: "legyen" },
        set: { unit: "elem", verb: "legyen" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "bemenet",
        email: "email cím",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO időbélyeg",
        date: "ISO dátum",
        time: "ISO idő",
        duration: "ISO időintervallum",
        ipv4: "IPv4 cím",
        ipv6: "IPv6 cím",
        cidrv4: "IPv4 tartomány",
        cidrv6: "IPv6 tartomány",
        base64: "base64-kódolt string",
        base64url: "base64url-kódolt string",
        json_string: "JSON string",
        e164: "E.164 szám",
        jwt: "JWT",
        template_literal: "bemenet",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Érvénytelen bemenet: a várt érték ${e.expected}, a kapott érték ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "szám";
                case "object":
                  if (Array.isArray(e)) return "tömb";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Érvénytelen bemenet: a várt érték ${Ve(e.values[0])}`
              : `Érvénytelen opció: valamelyik érték várt ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Túl nagy: ${e.origin ?? "érték"} mérete túl nagy ${n}${e.maximum.toString()} ${r.unit ?? "elem"}`
              : `Túl nagy: a bemeneti érték ${e.origin ?? "érték"} túl nagy: ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Túl kicsi: a bemeneti érték ${e.origin} mérete túl kicsi ${n}${e.minimum.toString()} ${r.unit}`
              : `Túl kicsi: a bemeneti érték ${e.origin} túl kicsi ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Érvénytelen string: "${t.prefix}" értékkel kell kezdődnie`
              : "ends_with" === t.format
                ? `Érvénytelen string: "${t.suffix}" értékkel kell végződnie`
                : "includes" === t.format
                  ? `Érvénytelen string: "${t.includes}" értéket kell tartalmaznia`
                  : "regex" === t.format
                    ? `Érvénytelen string: ${t.pattern} mintának kell megfelelnie`
                    : `Érvénytelen ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Érvénytelen szám: ${e.divisor} többszörösének kell lennie`;
          case "unrecognized_keys":
            return `Ismeretlen kulcs${e.keys.length > 1 ? "s" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Érvénytelen kulcs ${e.origin}`;
          case "invalid_union":
          default:
            return "Érvénytelen bemenet";
          case "invalid_element":
            return `Érvénytelen érték: ${e.origin}`;
        }
      };
    },
    Uo = () => {
      const e = {
        string: { unit: "karakter", verb: "memiliki" },
        file: { unit: "byte", verb: "memiliki" },
        array: { unit: "item", verb: "memiliki" },
        set: { unit: "item", verb: "memiliki" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "input",
        email: "alamat email",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "tanggal dan waktu format ISO",
        date: "tanggal format ISO",
        time: "jam format ISO",
        duration: "durasi format ISO",
        ipv4: "alamat IPv4",
        ipv6: "alamat IPv6",
        cidrv4: "rentang alamat IPv4",
        cidrv6: "rentang alamat IPv6",
        base64: "string dengan enkode base64",
        base64url: "string dengan enkode base64url",
        json_string: "string JSON",
        e164: "angka E.164",
        jwt: "JWT",
        template_literal: "input",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Input tidak valid: diharapkan ${e.expected}, diterima ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "number";
                case "object":
                  if (Array.isArray(e)) return "array";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Input tidak valid: diharapkan ${Ve(e.values[0])}`
              : `Pilihan tidak valid: diharapkan salah satu dari ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Terlalu besar: diharapkan ${e.origin ?? "value"} memiliki ${n}${e.maximum.toString()} ${r.unit ?? "elemen"}`
              : `Terlalu besar: diharapkan ${e.origin ?? "value"} menjadi ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Terlalu kecil: diharapkan ${e.origin} memiliki ${n}${e.minimum.toString()} ${r.unit}`
              : `Terlalu kecil: diharapkan ${e.origin} menjadi ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `String tidak valid: harus dimulai dengan "${t.prefix}"`
              : "ends_with" === t.format
                ? `String tidak valid: harus berakhir dengan "${t.suffix}"`
                : "includes" === t.format
                  ? `String tidak valid: harus menyertakan "${t.includes}"`
                  : "regex" === t.format
                    ? `String tidak valid: harus sesuai pola ${t.pattern}`
                    : `${n[t.format] ?? e.format} tidak valid`;
          }
          case "not_multiple_of":
            return `Angka tidak valid: harus kelipatan dari ${e.divisor}`;
          case "unrecognized_keys":
            return `Kunci tidak dikenali ${e.keys.length > 1 ? "s" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Kunci tidak valid di ${e.origin}`;
          case "invalid_union":
          default:
            return "Input tidak valid";
          case "invalid_element":
            return `Nilai tidak valid di ${e.origin}`;
        }
      };
    },
    Co = () => {
      const e = {
        string: { unit: "stafi", verb: "að hafa" },
        file: { unit: "bæti", verb: "að hafa" },
        array: { unit: "hluti", verb: "að hafa" },
        set: { unit: "hluti", verb: "að hafa" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "gildi",
        email: "netfang",
        url: "vefslóð",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO dagsetning og tími",
        date: "ISO dagsetning",
        time: "ISO tími",
        duration: "ISO tímalengd",
        ipv4: "IPv4 address",
        ipv6: "IPv6 address",
        cidrv4: "IPv4 range",
        cidrv6: "IPv6 range",
        base64: "base64-encoded strengur",
        base64url: "base64url-encoded strengur",
        json_string: "JSON strengur",
        e164: "E.164 tölugildi",
        jwt: "JWT",
        template_literal: "gildi",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Rangt gildi: Þú slóst inn ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "númer";
                case "object":
                  if (Array.isArray(e)) return "fylki";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)} þar sem á að vera ${e.expected}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Rangt gildi: gert ráð fyrir ${Ve(e.values[0])}`
              : `Ógilt val: má vera eitt af eftirfarandi ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Of stórt: gert er ráð fyrir að ${e.origin ?? "gildi"} hafi ${n}${e.maximum.toString()} ${r.unit ?? "hluti"}`
              : `Of stórt: gert er ráð fyrir að ${e.origin ?? "gildi"} sé ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Of lítið: gert er ráð fyrir að ${e.origin} hafi ${n}${e.minimum.toString()} ${r.unit}`
              : `Of lítið: gert er ráð fyrir að ${e.origin} sé ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Ógildur strengur: verður að byrja á "${t.prefix}"`
              : "ends_with" === t.format
                ? `Ógildur strengur: verður að enda á "${t.suffix}"`
                : "includes" === t.format
                  ? `Ógildur strengur: verður að innihalda "${t.includes}"`
                  : "regex" === t.format
                    ? `Ógildur strengur: verður að fylgja mynstri ${t.pattern}`
                    : `Rangt ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Röng tala: verður að vera margfeldi af ${e.divisor}`;
          case "unrecognized_keys":
            return `Óþekkt ${e.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Rangur lykill í ${e.origin}`;
          case "invalid_union":
          default:
            return "Rangt gildi";
          case "invalid_element":
            return `Rangt gildi í ${e.origin}`;
        }
      };
    },
    Po = () => {
      const e = {
        string: { unit: "caratteri", verb: "avere" },
        file: { unit: "byte", verb: "avere" },
        array: { unit: "elementi", verb: "avere" },
        set: { unit: "elementi", verb: "avere" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "input",
        email: "indirizzo email",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "data e ora ISO",
        date: "data ISO",
        time: "ora ISO",
        duration: "durata ISO",
        ipv4: "indirizzo IPv4",
        ipv6: "indirizzo IPv6",
        cidrv4: "intervallo IPv4",
        cidrv6: "intervallo IPv6",
        base64: "stringa codificata in base64",
        base64url: "URL codificata in base64",
        json_string: "stringa JSON",
        e164: "numero E.164",
        jwt: "JWT",
        template_literal: "input",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Input non valido: atteso ${e.expected}, ricevuto ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "numero";
                case "object":
                  if (Array.isArray(e)) return "vettore";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Input non valido: atteso ${Ve(e.values[0])}`
              : `Opzione non valida: atteso uno tra ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Troppo grande: ${e.origin ?? "valore"} deve avere ${n}${e.maximum.toString()} ${r.unit ?? "elementi"}`
              : `Troppo grande: ${e.origin ?? "valore"} deve essere ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Troppo piccolo: ${e.origin} deve avere ${n}${e.minimum.toString()} ${r.unit}`
              : `Troppo piccolo: ${e.origin} deve essere ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Stringa non valida: deve iniziare con "${t.prefix}"`
              : "ends_with" === t.format
                ? `Stringa non valida: deve terminare con "${t.suffix}"`
                : "includes" === t.format
                  ? `Stringa non valida: deve includere "${t.includes}"`
                  : "regex" === t.format
                    ? `Stringa non valida: deve corrispondere al pattern ${t.pattern}`
                    : `Invalid ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Numero non valido: deve essere un multiplo di ${e.divisor}`;
          case "unrecognized_keys":
            return `Chiav${e.keys.length > 1 ? "i" : "e"} non riconosciut${e.keys.length > 1 ? "e" : "a"}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Chiave non valida in ${e.origin}`;
          case "invalid_union":
          default:
            return "Input non valido";
          case "invalid_element":
            return `Valore non valido in ${e.origin}`;
        }
      };
    },
    Do = () => {
      const e = {
        string: { unit: "文字", verb: "である" },
        file: { unit: "バイト", verb: "である" },
        array: { unit: "要素", verb: "である" },
        set: { unit: "要素", verb: "である" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "入力値",
        email: "メールアドレス",
        url: "URL",
        emoji: "絵文字",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO日時",
        date: "ISO日付",
        time: "ISO時刻",
        duration: "ISO期間",
        ipv4: "IPv4アドレス",
        ipv6: "IPv6アドレス",
        cidrv4: "IPv4範囲",
        cidrv6: "IPv6範囲",
        base64: "base64エンコード文字列",
        base64url: "base64urlエンコード文字列",
        json_string: "JSON文字列",
        e164: "E.164番号",
        jwt: "JWT",
        template_literal: "入力値",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `無効な入力: ${e.expected}が期待されましたが、${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "数値";
                case "object":
                  if (Array.isArray(e)) return "配列";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}が入力されました`;
          case "invalid_value":
            return 1 === e.values.length
              ? `無効な入力: ${Ve(e.values[0])}が期待されました`
              : `無効な選択: ${Te(e.values, "、")}のいずれかである必要があります`;
          case "too_big": {
            const n = e.inclusive ? "以下である" : "より小さい",
              r = t(e.origin);
            return r
              ? `大きすぎる値: ${e.origin ?? "値"}は${e.maximum.toString()}${r.unit ?? "要素"}${n}必要があります`
              : `大きすぎる値: ${e.origin ?? "値"}は${e.maximum.toString()}${n}必要があります`;
          }
          case "too_small": {
            const n = e.inclusive ? "以上である" : "より大きい",
              r = t(e.origin);
            return r
              ? `小さすぎる値: ${e.origin}は${e.minimum.toString()}${r.unit}${n}必要があります`
              : `小さすぎる値: ${e.origin}は${e.minimum.toString()}${n}必要があります`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `無効な文字列: "${t.prefix}"で始まる必要があります`
              : "ends_with" === t.format
                ? `無効な文字列: "${t.suffix}"で終わる必要があります`
                : "includes" === t.format
                  ? `無効な文字列: "${t.includes}"を含む必要があります`
                  : "regex" === t.format
                    ? `無効な文字列: パターン${t.pattern}に一致する必要があります`
                    : `無効な${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `無効な数値: ${e.divisor}の倍数である必要があります`;
          case "unrecognized_keys":
            return `認識されていないキー${e.keys.length > 1 ? "群" : ""}: ${Te(e.keys, "、")}`;
          case "invalid_key":
            return `${e.origin}内の無効なキー`;
          case "invalid_union":
          default:
            return "無効な入力";
          case "invalid_element":
            return `${e.origin}内の無効な値`;
        }
      };
    },
    jo = () => {
      const e = {
        string: { unit: "តួអក្សរ", verb: "គួរមាន" },
        file: { unit: "បៃ", verb: "គួរមាន" },
        array: { unit: "ធាតុ", verb: "គួរមាន" },
        set: { unit: "ធាតុ", verb: "គួរមាន" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "ទិន្នន័យបញ្ចូល",
        email: "អាសយដ្ឋានអ៊ីមែល",
        url: "URL",
        emoji: "សញ្ញាអារម្មណ៍",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
        date: "កាលបរិច្ឆេទ ISO",
        time: "ម៉ោង ISO",
        duration: "រយៈពេល ISO",
        ipv4: "អាសយដ្ឋាន IPv4",
        ipv6: "អាសយដ្ឋាន IPv6",
        cidrv4: "ដែនអាសយដ្ឋាន IPv4",
        cidrv6: "ដែនអាសយដ្ឋាន IPv6",
        base64: "ខ្សែអក្សរអ៊ិកូដ base64",
        base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
        json_string: "ខ្សែអក្សរ JSON",
        e164: "លេខ E.164",
        jwt: "JWT",
        template_literal: "ទិន្នន័យបញ្ចូល",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${e.expected} ប៉ុន្តែទទួលបាន ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "មិនមែនជាលេខ (NaN)" : "លេខ";
                case "object":
                  if (Array.isArray(e)) return "អារេ (Array)";
                  if (null === e) return "គ្មានតម្លៃ (null)";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${Ve(e.values[0])}`
              : `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `ធំពេក៖ ត្រូវការ ${e.origin ?? "តម្លៃ"} ${n} ${e.maximum.toString()} ${r.unit ?? "ធាតុ"}`
              : `ធំពេក៖ ត្រូវការ ${e.origin ?? "តម្លៃ"} ${n} ${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `តូចពេក៖ ត្រូវការ ${e.origin} ${n} ${e.minimum.toString()} ${r.unit}`
              : `តូចពេក៖ ត្រូវការ ${e.origin} ${n} ${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${t.prefix}"`
              : "ends_with" === t.format
                ? `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${t.suffix}"`
                : "includes" === t.format
                  ? `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${t.includes}"`
                  : "regex" === t.format
                    ? `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${t.pattern}`
                    : `មិនត្រឹមត្រូវ៖ ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${e.divisor}`;
          case "unrecognized_keys":
            return `រកឃើញសោមិនស្គាល់៖ ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `សោមិនត្រឹមត្រូវនៅក្នុង ${e.origin}`;
          case "invalid_union":
          default:
            return "ទិន្នន័យមិនត្រឹមត្រូវ";
          case "invalid_element":
            return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${e.origin}`;
        }
      };
    },
    zo = () => {
      const e = {
        string: { unit: "문자", verb: "to have" },
        file: { unit: "바이트", verb: "to have" },
        array: { unit: "개", verb: "to have" },
        set: { unit: "개", verb: "to have" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "입력",
        email: "이메일 주소",
        url: "URL",
        emoji: "이모지",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO 날짜시간",
        date: "ISO 날짜",
        time: "ISO 시간",
        duration: "ISO 기간",
        ipv4: "IPv4 주소",
        ipv6: "IPv6 주소",
        cidrv4: "IPv4 범위",
        cidrv6: "IPv6 범위",
        base64: "base64 인코딩 문자열",
        base64url: "base64url 인코딩 문자열",
        json_string: "JSON 문자열",
        e164: "E.164 번호",
        jwt: "JWT",
        template_literal: "입력",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `잘못된 입력: 예상 타입은 ${e.expected}, 받은 타입은 ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "number";
                case "object":
                  if (Array.isArray(e)) return "array";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}입니다`;
          case "invalid_value":
            return 1 === e.values.length
              ? `잘못된 입력: 값은 ${Ve(e.values[0])} 이어야 합니다`
              : `잘못된 옵션: ${Te(e.values, "또는 ")} 중 하나여야 합니다`;
          case "too_big": {
            const n = e.inclusive ? "이하" : "미만",
              r = "미만" === n ? "이어야 합니다" : "여야 합니다",
              o = t(e.origin),
              i = o?.unit ?? "요소";
            return o
              ? `${e.origin ?? "값"}이 너무 큽니다: ${e.maximum.toString()}${i} ${n}${r}`
              : `${e.origin ?? "값"}이 너무 큽니다: ${e.maximum.toString()} ${n}${r}`;
          }
          case "too_small": {
            const n = e.inclusive ? "이상" : "초과",
              r = "이상" === n ? "이어야 합니다" : "여야 합니다",
              o = t(e.origin),
              i = o?.unit ?? "요소";
            return o
              ? `${e.origin ?? "값"}이 너무 작습니다: ${e.minimum.toString()}${i} ${n}${r}`
              : `${e.origin ?? "값"}이 너무 작습니다: ${e.minimum.toString()} ${n}${r}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `잘못된 문자열: "${t.prefix}"(으)로 시작해야 합니다`
              : "ends_with" === t.format
                ? `잘못된 문자열: "${t.suffix}"(으)로 끝나야 합니다`
                : "includes" === t.format
                  ? `잘못된 문자열: "${t.includes}"을(를) 포함해야 합니다`
                  : "regex" === t.format
                    ? `잘못된 문자열: 정규식 ${t.pattern} 패턴과 일치해야 합니다`
                    : `잘못된 ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `잘못된 숫자: ${e.divisor}의 배수여야 합니다`;
          case "unrecognized_keys":
            return `인식할 수 없는 키: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `잘못된 키: ${e.origin}`;
          case "invalid_union":
          default:
            return "잘못된 입력";
          case "invalid_element":
            return `잘못된 값: ${e.origin}`;
        }
      };
    },
    Ro = () => {
      const e = {
        string: { unit: "знаци", verb: "да имаат" },
        file: { unit: "бајти", verb: "да имаат" },
        array: { unit: "ставки", verb: "да имаат" },
        set: { unit: "ставки", verb: "да имаат" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "внес",
        email: "адреса на е-пошта",
        url: "URL",
        emoji: "емоџи",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO датум и време",
        date: "ISO датум",
        time: "ISO време",
        duration: "ISO времетраење",
        ipv4: "IPv4 адреса",
        ipv6: "IPv6 адреса",
        cidrv4: "IPv4 опсег",
        cidrv6: "IPv6 опсег",
        base64: "base64-енкодирана низа",
        base64url: "base64url-енкодирана низа",
        json_string: "JSON низа",
        e164: "E.164 број",
        jwt: "JWT",
        template_literal: "внес",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Грешен внес: се очекува ${e.expected}, примено ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "број";
                case "object":
                  if (Array.isArray(e)) return "низа";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Invalid input: expected ${Ve(e.values[0])}`
              : `Грешана опција: се очекува една ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Премногу голем: се очекува ${e.origin ?? "вредноста"} да има ${n}${e.maximum.toString()} ${r.unit ?? "елементи"}`
              : `Премногу голем: се очекува ${e.origin ?? "вредноста"} да биде ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Премногу мал: се очекува ${e.origin} да има ${n}${e.minimum.toString()} ${r.unit}`
              : `Премногу мал: се очекува ${e.origin} да биде ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Неважечка низа: мора да започнува со "${t.prefix}"`
              : "ends_with" === t.format
                ? `Неважечка низа: мора да завршува со "${t.suffix}"`
                : "includes" === t.format
                  ? `Неважечка низа: мора да вклучува "${t.includes}"`
                  : "regex" === t.format
                    ? `Неважечка низа: мора да одгоара на патернот ${t.pattern}`
                    : `Invalid ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Грешен број: мора да биде делив со ${e.divisor}`;
          case "unrecognized_keys":
            return `${e.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Грешен клуч во ${e.origin}`;
          case "invalid_union":
          default:
            return "Грешен внес";
          case "invalid_element":
            return `Грешна вредност во ${e.origin}`;
        }
      };
    },
    Mo = () => {
      const e = {
        string: { unit: "aksara", verb: "mempunyai" },
        file: { unit: "bait", verb: "mempunyai" },
        array: { unit: "elemen", verb: "mempunyai" },
        set: { unit: "elemen", verb: "mempunyai" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "input",
        email: "alamat e-mel",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "tarikh masa ISO",
        date: "tarikh ISO",
        time: "masa ISO",
        duration: "tempoh ISO",
        ipv4: "alamat IPv4",
        ipv6: "alamat IPv6",
        cidrv4: "julat IPv4",
        cidrv6: "julat IPv6",
        base64: "string dikodkan base64",
        base64url: "string dikodkan base64url",
        json_string: "string JSON",
        e164: "nombor E.164",
        jwt: "JWT",
        template_literal: "input",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Input tidak sah: dijangka ${e.expected}, diterima ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "nombor";
                case "object":
                  if (Array.isArray(e)) return "array";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Input tidak sah: dijangka ${Ve(e.values[0])}`
              : `Pilihan tidak sah: dijangka salah satu daripada ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Terlalu besar: dijangka ${e.origin ?? "nilai"} ${r.verb} ${n}${e.maximum.toString()} ${r.unit ?? "elemen"}`
              : `Terlalu besar: dijangka ${e.origin ?? "nilai"} adalah ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Terlalu kecil: dijangka ${e.origin} ${r.verb} ${n}${e.minimum.toString()} ${r.unit}`
              : `Terlalu kecil: dijangka ${e.origin} adalah ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `String tidak sah: mesti bermula dengan "${t.prefix}"`
              : "ends_with" === t.format
                ? `String tidak sah: mesti berakhir dengan "${t.suffix}"`
                : "includes" === t.format
                  ? `String tidak sah: mesti mengandungi "${t.includes}"`
                  : "regex" === t.format
                    ? `String tidak sah: mesti sepadan dengan corak ${t.pattern}`
                    : `${n[t.format] ?? e.format} tidak sah`;
          }
          case "not_multiple_of":
            return `Nombor tidak sah: perlu gandaan ${e.divisor}`;
          case "unrecognized_keys":
            return `Kunci tidak dikenali: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Kunci tidak sah dalam ${e.origin}`;
          case "invalid_union":
          default:
            return "Input tidak sah";
          case "invalid_element":
            return `Nilai tidak sah dalam ${e.origin}`;
        }
      };
    },
    qo = () => {
      const e = {
        string: { unit: "tekens" },
        file: { unit: "bytes" },
        array: { unit: "elementen" },
        set: { unit: "elementen" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "invoer",
        email: "emailadres",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datum en tijd",
        date: "ISO datum",
        time: "ISO tijd",
        duration: "ISO duur",
        ipv4: "IPv4-adres",
        ipv6: "IPv6-adres",
        cidrv4: "IPv4-bereik",
        cidrv6: "IPv6-bereik",
        base64: "base64-gecodeerde tekst",
        base64url: "base64 URL-gecodeerde tekst",
        json_string: "JSON string",
        e164: "E.164-nummer",
        jwt: "JWT",
        template_literal: "invoer",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Ongeldige invoer: verwacht ${e.expected}, ontving ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "getal";
                case "object":
                  if (Array.isArray(e)) return "array";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Ongeldige invoer: verwacht ${Ve(e.values[0])}`
              : `Ongeldige optie: verwacht één van ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Te lang: verwacht dat ${e.origin ?? "waarde"} ${n}${e.maximum.toString()} ${r.unit ?? "elementen"} bevat`
              : `Te lang: verwacht dat ${e.origin ?? "waarde"} ${n}${e.maximum.toString()} is`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Te kort: verwacht dat ${e.origin} ${n}${e.minimum.toString()} ${r.unit} bevat`
              : `Te kort: verwacht dat ${e.origin} ${n}${e.minimum.toString()} is`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Ongeldige tekst: moet met "${t.prefix}" beginnen`
              : "ends_with" === t.format
                ? `Ongeldige tekst: moet op "${t.suffix}" eindigen`
                : "includes" === t.format
                  ? `Ongeldige tekst: moet "${t.includes}" bevatten`
                  : "regex" === t.format
                    ? `Ongeldige tekst: moet overeenkomen met patroon ${t.pattern}`
                    : `Ongeldig: ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Ongeldig getal: moet een veelvoud van ${e.divisor} zijn`;
          case "unrecognized_keys":
            return `Onbekende key${e.keys.length > 1 ? "s" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Ongeldige key in ${e.origin}`;
          case "invalid_union":
          default:
            return "Ongeldige invoer";
          case "invalid_element":
            return `Ongeldige waarde in ${e.origin}`;
        }
      };
    },
    Zo = () => {
      const e = {
        string: { unit: "tegn", verb: "å ha" },
        file: { unit: "bytes", verb: "å ha" },
        array: { unit: "elementer", verb: "å inneholde" },
        set: { unit: "elementer", verb: "å inneholde" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "input",
        email: "e-postadresse",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO dato- og klokkeslett",
        date: "ISO-dato",
        time: "ISO-klokkeslett",
        duration: "ISO-varighet",
        ipv4: "IPv4-område",
        ipv6: "IPv6-område",
        cidrv4: "IPv4-spekter",
        cidrv6: "IPv6-spekter",
        base64: "base64-enkodet streng",
        base64url: "base64url-enkodet streng",
        json_string: "JSON-streng",
        e164: "E.164-nummer",
        jwt: "JWT",
        template_literal: "input",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Ugyldig input: forventet ${e.expected}, fikk ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "tall";
                case "object":
                  if (Array.isArray(e)) return "liste";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Ugyldig verdi: forventet ${Ve(e.values[0])}`
              : `Ugyldig valg: forventet en av ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `For stor(t): forventet ${e.origin ?? "value"} til å ha ${n}${e.maximum.toString()} ${r.unit ?? "elementer"}`
              : `For stor(t): forventet ${e.origin ?? "value"} til å ha ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `For lite(n): forventet ${e.origin} til å ha ${n}${e.minimum.toString()} ${r.unit}`
              : `For lite(n): forventet ${e.origin} til å ha ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Ugyldig streng: må starte med "${t.prefix}"`
              : "ends_with" === t.format
                ? `Ugyldig streng: må ende med "${t.suffix}"`
                : "includes" === t.format
                  ? `Ugyldig streng: må inneholde "${t.includes}"`
                  : "regex" === t.format
                    ? `Ugyldig streng: må matche mønsteret ${t.pattern}`
                    : `Ugyldig ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Ugyldig tall: må være et multiplum av ${e.divisor}`;
          case "unrecognized_keys":
            return `${e.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Ugyldig nøkkel i ${e.origin}`;
          case "invalid_union":
          default:
            return "Ugyldig input";
          case "invalid_element":
            return `Ugyldig verdi i ${e.origin}`;
        }
      };
    },
    Lo = () => {
      const e = {
        string: { unit: "harf", verb: "olmalıdır" },
        file: { unit: "bayt", verb: "olmalıdır" },
        array: { unit: "unsur", verb: "olmalıdır" },
        set: { unit: "unsur", verb: "olmalıdır" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "giren",
        email: "epostagâh",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO hengâmı",
        date: "ISO tarihi",
        time: "ISO zamanı",
        duration: "ISO müddeti",
        ipv4: "IPv4 nişânı",
        ipv6: "IPv6 nişânı",
        cidrv4: "IPv4 menzili",
        cidrv6: "IPv6 menzili",
        base64: "base64-şifreli metin",
        base64url: "base64url-şifreli metin",
        json_string: "JSON metin",
        e164: "E.164 sayısı",
        jwt: "JWT",
        template_literal: "giren",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Fâsit giren: umulan ${e.expected}, alınan ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "numara";
                case "object":
                  if (Array.isArray(e)) return "saf";
                  if (null === e) return "gayb";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Fâsit giren: umulan ${Ve(e.values[0])}`
              : `Fâsit tercih: mûteberler ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Fazla büyük: ${e.origin ?? "value"}, ${n}${e.maximum.toString()} ${r.unit ?? "elements"} sahip olmalıydı.`
              : `Fazla büyük: ${e.origin ?? "value"}, ${n}${e.maximum.toString()} olmalıydı.`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Fazla küçük: ${e.origin}, ${n}${e.minimum.toString()} ${r.unit} sahip olmalıydı.`
              : `Fazla küçük: ${e.origin}, ${n}${e.minimum.toString()} olmalıydı.`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Fâsit metin: "${t.prefix}" ile başlamalı.`
              : "ends_with" === t.format
                ? `Fâsit metin: "${t.suffix}" ile bitmeli.`
                : "includes" === t.format
                  ? `Fâsit metin: "${t.includes}" ihtivâ etmeli.`
                  : "regex" === t.format
                    ? `Fâsit metin: ${t.pattern} nakşına uymalı.`
                    : `Fâsit ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Fâsit sayı: ${e.divisor} katı olmalıydı.`;
          case "unrecognized_keys":
            return `Tanınmayan anahtar ${e.keys.length > 1 ? "s" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `${e.origin} için tanınmayan anahtar var.`;
          case "invalid_union":
            return "Giren tanınamadı.";
          case "invalid_element":
            return `${e.origin} için tanınmayan kıymet var.`;
          default:
            return "Kıymet tanınamadı.";
        }
      };
    },
    Fo = () => {
      const e = {
        string: { unit: "توکي", verb: "ولري" },
        file: { unit: "بایټس", verb: "ولري" },
        array: { unit: "توکي", verb: "ولري" },
        set: { unit: "توکي", verb: "ولري" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "ورودي",
        email: "بریښنالیک",
        url: "یو آر ال",
        emoji: "ایموجي",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "نیټه او وخت",
        date: "نېټه",
        time: "وخت",
        duration: "موده",
        ipv4: "د IPv4 پته",
        ipv6: "د IPv6 پته",
        cidrv4: "د IPv4 ساحه",
        cidrv6: "د IPv6 ساحه",
        base64: "base64-encoded متن",
        base64url: "base64url-encoded متن",
        json_string: "JSON متن",
        e164: "د E.164 شمېره",
        jwt: "JWT",
        template_literal: "ورودي",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `ناسم ورودي: باید ${e.expected} وای, مګر ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "عدد";
                case "object":
                  if (Array.isArray(e)) return "ارې";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)} ترلاسه شو`;
          case "invalid_value":
            return 1 === e.values.length
              ? `ناسم ورودي: باید ${Ve(e.values[0])} وای`
              : `ناسم انتخاب: باید یو له ${Te(e.values, "|")} څخه وای`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `ډیر لوی: ${e.origin ?? "ارزښت"} باید ${n}${e.maximum.toString()} ${r.unit ?? "عنصرونه"} ولري`
              : `ډیر لوی: ${e.origin ?? "ارزښت"} باید ${n}${e.maximum.toString()} وي`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `ډیر کوچنی: ${e.origin} باید ${n}${e.minimum.toString()} ${r.unit} ولري`
              : `ډیر کوچنی: ${e.origin} باید ${n}${e.minimum.toString()} وي`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `ناسم متن: باید د "${t.prefix}" سره پیل شي`
              : "ends_with" === t.format
                ? `ناسم متن: باید د "${t.suffix}" سره پای ته ورسيږي`
                : "includes" === t.format
                  ? `ناسم متن: باید "${t.includes}" ولري`
                  : "regex" === t.format
                    ? `ناسم متن: باید د ${t.pattern} سره مطابقت ولري`
                    : `${n[t.format] ?? e.format} ناسم دی`;
          }
          case "not_multiple_of":
            return `ناسم عدد: باید د ${e.divisor} مضرب وي`;
          case "unrecognized_keys":
            return `ناسم ${e.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `ناسم کلیډ په ${e.origin} کې`;
          case "invalid_union":
          default:
            return "ناسمه ورودي";
          case "invalid_element":
            return `ناسم عنصر په ${e.origin} کې`;
        }
      };
    },
    Bo = () => {
      const e = {
        string: { unit: "znaków", verb: "mieć" },
        file: { unit: "bajtów", verb: "mieć" },
        array: { unit: "elementów", verb: "mieć" },
        set: { unit: "elementów", verb: "mieć" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "wyrażenie",
        email: "adres email",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "data i godzina w formacie ISO",
        date: "data w formacie ISO",
        time: "godzina w formacie ISO",
        duration: "czas trwania ISO",
        ipv4: "adres IPv4",
        ipv6: "adres IPv6",
        cidrv4: "zakres IPv4",
        cidrv6: "zakres IPv6",
        base64: "ciąg znaków zakodowany w formacie base64",
        base64url: "ciąg znaków zakodowany w formacie base64url",
        json_string: "ciąg znaków w formacie JSON",
        e164: "liczba E.164",
        jwt: "JWT",
        template_literal: "wejście",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Nieprawidłowe dane wejściowe: oczekiwano ${e.expected}, otrzymano ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "liczba";
                case "object":
                  if (Array.isArray(e)) return "tablica";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Nieprawidłowe dane wejściowe: oczekiwano ${Ve(e.values[0])}`
              : `Nieprawidłowa opcja: oczekiwano jednej z wartości ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Za duża wartość: oczekiwano, że ${e.origin ?? "wartość"} będzie mieć ${n}${e.maximum.toString()} ${r.unit ?? "elementów"}`
              : `Zbyt duż(y/a/e): oczekiwano, że ${e.origin ?? "wartość"} będzie wynosić ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Za mała wartość: oczekiwano, że ${e.origin ?? "wartość"} będzie mieć ${n}${e.minimum.toString()} ${r.unit ?? "elementów"}`
              : `Zbyt mał(y/a/e): oczekiwano, że ${e.origin ?? "wartość"} będzie wynosić ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Nieprawidłowy ciąg znaków: musi zaczynać się od "${t.prefix}"`
              : "ends_with" === t.format
                ? `Nieprawidłowy ciąg znaków: musi kończyć się na "${t.suffix}"`
                : "includes" === t.format
                  ? `Nieprawidłowy ciąg znaków: musi zawierać "${t.includes}"`
                  : "regex" === t.format
                    ? `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${t.pattern}`
                    : `Nieprawidłow(y/a/e) ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Nieprawidłowa liczba: musi być wielokrotnością ${e.divisor}`;
          case "unrecognized_keys":
            return `Nierozpoznane klucze${e.keys.length > 1 ? "s" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Nieprawidłowy klucz w ${e.origin}`;
          case "invalid_union":
          default:
            return "Nieprawidłowe dane wejściowe";
          case "invalid_element":
            return `Nieprawidłowa wartość w ${e.origin}`;
        }
      };
    },
    Wo = () => {
      const e = {
        string: { unit: "caracteres", verb: "ter" },
        file: { unit: "bytes", verb: "ter" },
        array: { unit: "itens", verb: "ter" },
        set: { unit: "itens", verb: "ter" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "padrão",
        email: "endereço de e-mail",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "data e hora ISO",
        date: "data ISO",
        time: "hora ISO",
        duration: "duração ISO",
        ipv4: "endereço IPv4",
        ipv6: "endereço IPv6",
        cidrv4: "faixa de IPv4",
        cidrv6: "faixa de IPv6",
        base64: "texto codificado em base64",
        base64url: "URL codificada em base64",
        json_string: "texto JSON",
        e164: "número E.164",
        jwt: "JWT",
        template_literal: "entrada",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Tipo inválido: esperado ${e.expected}, recebido ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "número";
                case "object":
                  if (Array.isArray(e)) return "array";
                  if (null === e) return "nulo";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Entrada inválida: esperado ${Ve(e.values[0])}`
              : `Opção inválida: esperada uma das ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Muito grande: esperado que ${e.origin ?? "valor"} tivesse ${n}${e.maximum.toString()} ${r.unit ?? "elementos"}`
              : `Muito grande: esperado que ${e.origin ?? "valor"} fosse ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Muito pequeno: esperado que ${e.origin} tivesse ${n}${e.minimum.toString()} ${r.unit}`
              : `Muito pequeno: esperado que ${e.origin} fosse ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Texto inválido: deve começar com "${t.prefix}"`
              : "ends_with" === t.format
                ? `Texto inválido: deve terminar com "${t.suffix}"`
                : "includes" === t.format
                  ? `Texto inválido: deve incluir "${t.includes}"`
                  : "regex" === t.format
                    ? `Texto inválido: deve corresponder ao padrão ${t.pattern}`
                    : `${n[t.format] ?? e.format} inválido`;
          }
          case "not_multiple_of":
            return `Número inválido: deve ser múltiplo de ${e.divisor}`;
          case "unrecognized_keys":
            return `Chave${e.keys.length > 1 ? "s" : ""} desconhecida${e.keys.length > 1 ? "s" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Chave inválida em ${e.origin}`;
          case "invalid_union":
            return "Entrada inválida";
          case "invalid_element":
            return `Valor inválido em ${e.origin}`;
          default:
            return "Campo inválido";
        }
      };
    };
  function Ho(e, t, n, r) {
    const o = Math.abs(e),
      i = o % 10,
      a = o % 100;
    return a >= 11 && a <= 19 ? r : 1 === i ? t : i >= 2 && i <= 4 ? n : r;
  }
  const Vo = () => {
      const e = {
        string: {
          unit: { one: "символ", few: "символа", many: "символов" },
          verb: "иметь",
        },
        file: {
          unit: { one: "байт", few: "байта", many: "байт" },
          verb: "иметь",
        },
        array: {
          unit: { one: "элемент", few: "элемента", many: "элементов" },
          verb: "иметь",
        },
        set: {
          unit: { one: "элемент", few: "элемента", many: "элементов" },
          verb: "иметь",
        },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "ввод",
        email: "email адрес",
        url: "URL",
        emoji: "эмодзи",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO дата и время",
        date: "ISO дата",
        time: "ISO время",
        duration: "ISO длительность",
        ipv4: "IPv4 адрес",
        ipv6: "IPv6 адрес",
        cidrv4: "IPv4 диапазон",
        cidrv6: "IPv6 диапазон",
        base64: "строка в формате base64",
        base64url: "строка в формате base64url",
        json_string: "JSON строка",
        e164: "номер E.164",
        jwt: "JWT",
        template_literal: "ввод",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Неверный ввод: ожидалось ${e.expected}, получено ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "число";
                case "object":
                  if (Array.isArray(e)) return "массив";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Неверный ввод: ожидалось ${Ve(e.values[0])}`
              : `Неверный вариант: ожидалось одно из ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            if (r) {
              const t = Ho(
                Number(e.maximum),
                r.unit.one,
                r.unit.few,
                r.unit.many,
              );
              return `Слишком большое значение: ожидалось, что ${e.origin ?? "значение"} будет иметь ${n}${e.maximum.toString()} ${t}`;
            }
            return `Слишком большое значение: ожидалось, что ${e.origin ?? "значение"} будет ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            if (r) {
              const t = Ho(
                Number(e.minimum),
                r.unit.one,
                r.unit.few,
                r.unit.many,
              );
              return `Слишком маленькое значение: ожидалось, что ${e.origin} будет иметь ${n}${e.minimum.toString()} ${t}`;
            }
            return `Слишком маленькое значение: ожидалось, что ${e.origin} будет ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Неверная строка: должна начинаться с "${t.prefix}"`
              : "ends_with" === t.format
                ? `Неверная строка: должна заканчиваться на "${t.suffix}"`
                : "includes" === t.format
                  ? `Неверная строка: должна содержать "${t.includes}"`
                  : "regex" === t.format
                    ? `Неверная строка: должна соответствовать шаблону ${t.pattern}`
                    : `Неверный ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Неверное число: должно быть кратным ${e.divisor}`;
          case "unrecognized_keys":
            return `Нераспознанн${e.keys.length > 1 ? "ые" : "ый"} ключ${e.keys.length > 1 ? "и" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Неверный ключ в ${e.origin}`;
          case "invalid_union":
          default:
            return "Неверные входные данные";
          case "invalid_element":
            return `Неверное значение в ${e.origin}`;
        }
      };
    },
    Jo = () => {
      const e = {
        string: { unit: "znakov", verb: "imeti" },
        file: { unit: "bajtov", verb: "imeti" },
        array: { unit: "elementov", verb: "imeti" },
        set: { unit: "elementov", verb: "imeti" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "vnos",
        email: "e-poštni naslov",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datum in čas",
        date: "ISO datum",
        time: "ISO čas",
        duration: "ISO trajanje",
        ipv4: "IPv4 naslov",
        ipv6: "IPv6 naslov",
        cidrv4: "obseg IPv4",
        cidrv6: "obseg IPv6",
        base64: "base64 kodiran niz",
        base64url: "base64url kodiran niz",
        json_string: "JSON niz",
        e164: "E.164 številka",
        jwt: "JWT",
        template_literal: "vnos",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Neveljaven vnos: pričakovano ${e.expected}, prejeto ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "število";
                case "object":
                  if (Array.isArray(e)) return "tabela";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Neveljaven vnos: pričakovano ${Ve(e.values[0])}`
              : `Neveljavna možnost: pričakovano eno izmed ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Preveliko: pričakovano, da bo ${e.origin ?? "vrednost"} imelo ${n}${e.maximum.toString()} ${r.unit ?? "elementov"}`
              : `Preveliko: pričakovano, da bo ${e.origin ?? "vrednost"} ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Premajhno: pričakovano, da bo ${e.origin} imelo ${n}${e.minimum.toString()} ${r.unit}`
              : `Premajhno: pričakovano, da bo ${e.origin} ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Neveljaven niz: mora se začeti z "${t.prefix}"`
              : "ends_with" === t.format
                ? `Neveljaven niz: mora se končati z "${t.suffix}"`
                : "includes" === t.format
                  ? `Neveljaven niz: mora vsebovati "${t.includes}"`
                  : "regex" === t.format
                    ? `Neveljaven niz: mora ustrezati vzorcu ${t.pattern}`
                    : `Neveljaven ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Neveljavno število: mora biti večkratnik ${e.divisor}`;
          case "unrecognized_keys":
            return `Neprepoznan${e.keys.length > 1 ? "i ključi" : " ključ"}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Neveljaven ključ v ${e.origin}`;
          case "invalid_union":
          default:
            return "Neveljaven vnos";
          case "invalid_element":
            return `Neveljavna vrednost v ${e.origin}`;
        }
      };
    },
    Ko = () => {
      const e = {
        string: { unit: "tecken", verb: "att ha" },
        file: { unit: "bytes", verb: "att ha" },
        array: { unit: "objekt", verb: "att innehålla" },
        set: { unit: "objekt", verb: "att innehålla" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "reguljärt uttryck",
        email: "e-postadress",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO-datum och tid",
        date: "ISO-datum",
        time: "ISO-tid",
        duration: "ISO-varaktighet",
        ipv4: "IPv4-intervall",
        ipv6: "IPv6-intervall",
        cidrv4: "IPv4-spektrum",
        cidrv6: "IPv6-spektrum",
        base64: "base64-kodad sträng",
        base64url: "base64url-kodad sträng",
        json_string: "JSON-sträng",
        e164: "E.164-nummer",
        jwt: "JWT",
        template_literal: "mall-literal",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Ogiltig inmatning: förväntat ${e.expected}, fick ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "antal";
                case "object":
                  if (Array.isArray(e)) return "lista";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Ogiltig inmatning: förväntat ${Ve(e.values[0])}`
              : `Ogiltigt val: förväntade en av ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `För stor(t): förväntade ${e.origin ?? "värdet"} att ha ${n}${e.maximum.toString()} ${r.unit ?? "element"}`
              : `För stor(t): förväntat ${e.origin ?? "värdet"} att ha ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `För lite(t): förväntade ${e.origin ?? "värdet"} att ha ${n}${e.minimum.toString()} ${r.unit}`
              : `För lite(t): förväntade ${e.origin ?? "värdet"} att ha ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Ogiltig sträng: måste börja med "${t.prefix}"`
              : "ends_with" === t.format
                ? `Ogiltig sträng: måste sluta med "${t.suffix}"`
                : "includes" === t.format
                  ? `Ogiltig sträng: måste innehålla "${t.includes}"`
                  : "regex" === t.format
                    ? `Ogiltig sträng: måste matcha mönstret "${t.pattern}"`
                    : `Ogiltig(t) ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Ogiltigt tal: måste vara en multipel av ${e.divisor}`;
          case "unrecognized_keys":
            return `${e.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Ogiltig nyckel i ${e.origin ?? "värdet"}`;
          case "invalid_union":
          default:
            return "Ogiltig input";
          case "invalid_element":
            return `Ogiltigt värde i ${e.origin ?? "värdet"}`;
        }
      };
    },
    Go = () => {
      const e = {
        string: { unit: "எழுத்துக்கள்", verb: "கொண்டிருக்க வேண்டும்" },
        file: { unit: "பைட்டுகள்", verb: "கொண்டிருக்க வேண்டும்" },
        array: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
        set: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "உள்ளீடு",
        email: "மின்னஞ்சல் முகவரி",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO தேதி நேரம்",
        date: "ISO தேதி",
        time: "ISO நேரம்",
        duration: "ISO கால அளவு",
        ipv4: "IPv4 முகவரி",
        ipv6: "IPv6 முகவரி",
        cidrv4: "IPv4 வரம்பு",
        cidrv6: "IPv6 வரம்பு",
        base64: "base64-encoded சரம்",
        base64url: "base64url-encoded சரம்",
        json_string: "JSON சரம்",
        e164: "E.164 எண்",
        jwt: "JWT",
        template_literal: "input",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${e.expected}, பெறப்பட்டது ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "எண் அல்லாதது" : "எண்";
                case "object":
                  if (Array.isArray(e)) return "அணி";
                  if (null === e) return "வெறுமை";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${Ve(e.values[0])}`
              : `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${Te(e.values, "|")} இல் ஒன்று`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${e.origin ?? "மதிப்பு"} ${n}${e.maximum.toString()} ${r.unit ?? "உறுப்புகள்"} ஆக இருக்க வேண்டும்`
              : `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${e.origin ?? "மதிப்பு"} ${n}${e.maximum.toString()} ஆக இருக்க வேண்டும்`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${e.origin} ${n}${e.minimum.toString()} ${r.unit} ஆக இருக்க வேண்டும்`
              : `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${e.origin} ${n}${e.minimum.toString()} ஆக இருக்க வேண்டும்`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `தவறான சரம்: "${t.prefix}" இல் தொடங்க வேண்டும்`
              : "ends_with" === t.format
                ? `தவறான சரம்: "${t.suffix}" இல் முடிவடைய வேண்டும்`
                : "includes" === t.format
                  ? `தவறான சரம்: "${t.includes}" ஐ உள்ளடக்க வேண்டும்`
                  : "regex" === t.format
                    ? `தவறான சரம்: ${t.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`
                    : `தவறான ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `தவறான எண்: ${e.divisor} இன் பலமாக இருக்க வேண்டும்`;
          case "unrecognized_keys":
            return `அடையாளம் தெரியாத விசை${e.keys.length > 1 ? "கள்" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `${e.origin} இல் தவறான விசை`;
          case "invalid_union":
          default:
            return "தவறான உள்ளீடு";
          case "invalid_element":
            return `${e.origin} இல் தவறான மதிப்பு`;
        }
      };
    },
    Xo = () => {
      const e = {
        string: { unit: "ตัวอักษร", verb: "ควรมี" },
        file: { unit: "ไบต์", verb: "ควรมี" },
        array: { unit: "รายการ", verb: "ควรมี" },
        set: { unit: "รายการ", verb: "ควรมี" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "ข้อมูลที่ป้อน",
        email: "ที่อยู่อีเมล",
        url: "URL",
        emoji: "อิโมจิ",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "วันที่เวลาแบบ ISO",
        date: "วันที่แบบ ISO",
        time: "เวลาแบบ ISO",
        duration: "ช่วงเวลาแบบ ISO",
        ipv4: "ที่อยู่ IPv4",
        ipv6: "ที่อยู่ IPv6",
        cidrv4: "ช่วง IP แบบ IPv4",
        cidrv6: "ช่วง IP แบบ IPv6",
        base64: "ข้อความแบบ Base64",
        base64url: "ข้อความแบบ Base64 สำหรับ URL",
        json_string: "ข้อความแบบ JSON",
        e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
        jwt: "โทเคน JWT",
        template_literal: "ข้อมูลที่ป้อน",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${e.expected} แต่ได้รับ ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "ไม่ใช่ตัวเลข (NaN)" : "ตัวเลข";
                case "object":
                  if (Array.isArray(e)) return "อาร์เรย์ (Array)";
                  if (null === e) return "ไม่มีค่า (null)";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `ค่าไม่ถูกต้อง: ควรเป็น ${Ve(e.values[0])}`
              : `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "ไม่เกิน" : "น้อยกว่า",
              r = t(e.origin);
            return r
              ? `เกินกำหนด: ${e.origin ?? "ค่า"} ควรมี${n} ${e.maximum.toString()} ${r.unit ?? "รายการ"}`
              : `เกินกำหนด: ${e.origin ?? "ค่า"} ควรมี${n} ${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? "อย่างน้อย" : "มากกว่า",
              r = t(e.origin);
            return r
              ? `น้อยกว่ากำหนด: ${e.origin} ควรมี${n} ${e.minimum.toString()} ${r.unit}`
              : `น้อยกว่ากำหนด: ${e.origin} ควรมี${n} ${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${t.prefix}"`
              : "ends_with" === t.format
                ? `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${t.suffix}"`
                : "includes" === t.format
                  ? `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${t.includes}" อยู่ในข้อความ`
                  : "regex" === t.format
                    ? `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${t.pattern}`
                    : `รูปแบบไม่ถูกต้อง: ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${e.divisor} ได้ลงตัว`;
          case "unrecognized_keys":
            return `พบคีย์ที่ไม่รู้จัก: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `คีย์ไม่ถูกต้องใน ${e.origin}`;
          case "invalid_union":
            return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
          case "invalid_element":
            return `ข้อมูลไม่ถูกต้องใน ${e.origin}`;
          default:
            return "ข้อมูลไม่ถูกต้อง";
        }
      };
    },
    Yo = () => {
      const e = {
        string: { unit: "karakter", verb: "olmalı" },
        file: { unit: "bayt", verb: "olmalı" },
        array: { unit: "öğe", verb: "olmalı" },
        set: { unit: "öğe", verb: "olmalı" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "girdi",
        email: "e-posta adresi",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO tarih ve saat",
        date: "ISO tarih",
        time: "ISO saat",
        duration: "ISO süre",
        ipv4: "IPv4 adresi",
        ipv6: "IPv6 adresi",
        cidrv4: "IPv4 aralığı",
        cidrv6: "IPv6 aralığı",
        base64: "base64 ile şifrelenmiş metin",
        base64url: "base64url ile şifrelenmiş metin",
        json_string: "JSON dizesi",
        e164: "E.164 sayısı",
        jwt: "JWT",
        template_literal: "Şablon dizesi",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Geçersiz değer: beklenen ${e.expected}, alınan ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "number";
                case "object":
                  if (Array.isArray(e)) return "array";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Geçersiz değer: beklenen ${Ve(e.values[0])}`
              : `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Çok büyük: beklenen ${e.origin ?? "değer"} ${n}${e.maximum.toString()} ${r.unit ?? "öğe"}`
              : `Çok büyük: beklenen ${e.origin ?? "değer"} ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Çok küçük: beklenen ${e.origin} ${n}${e.minimum.toString()} ${r.unit}`
              : `Çok küçük: beklenen ${e.origin} ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Geçersiz metin: "${t.prefix}" ile başlamalı`
              : "ends_with" === t.format
                ? `Geçersiz metin: "${t.suffix}" ile bitmeli`
                : "includes" === t.format
                  ? `Geçersiz metin: "${t.includes}" içermeli`
                  : "regex" === t.format
                    ? `Geçersiz metin: ${t.pattern} desenine uymalı`
                    : `Geçersiz ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Geçersiz sayı: ${e.divisor} ile tam bölünebilmeli`;
          case "unrecognized_keys":
            return `Tanınmayan anahtar${e.keys.length > 1 ? "lar" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `${e.origin} içinde geçersiz anahtar`;
          case "invalid_union":
          default:
            return "Geçersiz değer";
          case "invalid_element":
            return `${e.origin} içinde geçersiz değer`;
        }
      };
    },
    Qo = () => {
      const e = {
        string: { unit: "символів", verb: "матиме" },
        file: { unit: "байтів", verb: "матиме" },
        array: { unit: "елементів", verb: "матиме" },
        set: { unit: "елементів", verb: "матиме" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "вхідні дані",
        email: "адреса електронної пошти",
        url: "URL",
        emoji: "емодзі",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "дата та час ISO",
        date: "дата ISO",
        time: "час ISO",
        duration: "тривалість ISO",
        ipv4: "адреса IPv4",
        ipv6: "адреса IPv6",
        cidrv4: "діапазон IPv4",
        cidrv6: "діапазон IPv6",
        base64: "рядок у кодуванні base64",
        base64url: "рядок у кодуванні base64url",
        json_string: "рядок JSON",
        e164: "номер E.164",
        jwt: "JWT",
        template_literal: "вхідні дані",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Неправильні вхідні дані: очікується ${e.expected}, отримано ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "число";
                case "object":
                  if (Array.isArray(e)) return "масив";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Неправильні вхідні дані: очікується ${Ve(e.values[0])}`
              : `Неправильна опція: очікується одне з ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Занадто велике: очікується, що ${e.origin ?? "значення"} ${r.verb} ${n}${e.maximum.toString()} ${r.unit ?? "елементів"}`
              : `Занадто велике: очікується, що ${e.origin ?? "значення"} буде ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Занадто мале: очікується, що ${e.origin} ${r.verb} ${n}${e.minimum.toString()} ${r.unit}`
              : `Занадто мале: очікується, що ${e.origin} буде ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Неправильний рядок: повинен починатися з "${t.prefix}"`
              : "ends_with" === t.format
                ? `Неправильний рядок: повинен закінчуватися на "${t.suffix}"`
                : "includes" === t.format
                  ? `Неправильний рядок: повинен містити "${t.includes}"`
                  : "regex" === t.format
                    ? `Неправильний рядок: повинен відповідати шаблону ${t.pattern}`
                    : `Неправильний ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Неправильне число: повинно бути кратним ${e.divisor}`;
          case "unrecognized_keys":
            return `Нерозпізнаний ключ${e.keys.length > 1 ? "і" : ""}: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Неправильний ключ у ${e.origin}`;
          case "invalid_union":
          default:
            return "Неправильні вхідні дані";
          case "invalid_element":
            return `Неправильне значення у ${e.origin}`;
        }
      };
    },
    ei = () => {
      const e = {
        string: { unit: "حروف", verb: "ہونا" },
        file: { unit: "بائٹس", verb: "ہونا" },
        array: { unit: "آئٹمز", verb: "ہونا" },
        set: { unit: "آئٹمز", verb: "ہونا" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "ان پٹ",
        email: "ای میل ایڈریس",
        url: "یو آر ایل",
        emoji: "ایموجی",
        uuid: "یو یو آئی ڈی",
        uuidv4: "یو یو آئی ڈی وی 4",
        uuidv6: "یو یو آئی ڈی وی 6",
        nanoid: "نینو آئی ڈی",
        guid: "جی یو آئی ڈی",
        cuid: "سی یو آئی ڈی",
        cuid2: "سی یو آئی ڈی 2",
        ulid: "یو ایل آئی ڈی",
        xid: "ایکس آئی ڈی",
        ksuid: "کے ایس یو آئی ڈی",
        datetime: "آئی ایس او ڈیٹ ٹائم",
        date: "آئی ایس او تاریخ",
        time: "آئی ایس او وقت",
        duration: "آئی ایس او مدت",
        ipv4: "آئی پی وی 4 ایڈریس",
        ipv6: "آئی پی وی 6 ایڈریس",
        cidrv4: "آئی پی وی 4 رینج",
        cidrv6: "آئی پی وی 6 رینج",
        base64: "بیس 64 ان کوڈڈ سٹرنگ",
        base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
        json_string: "جے ایس او این سٹرنگ",
        e164: "ای 164 نمبر",
        jwt: "جے ڈبلیو ٹی",
        template_literal: "ان پٹ",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `غلط ان پٹ: ${e.expected} متوقع تھا، ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "نمبر";
                case "object":
                  if (Array.isArray(e)) return "آرے";
                  if (null === e) return "نل";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)} موصول ہوا`;
          case "invalid_value":
            return 1 === e.values.length
              ? `غلط ان پٹ: ${Ve(e.values[0])} متوقع تھا`
              : `غلط آپشن: ${Te(e.values, "|")} میں سے ایک متوقع تھا`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `بہت بڑا: ${e.origin ?? "ویلیو"} کے ${n}${e.maximum.toString()} ${r.unit ?? "عناصر"} ہونے متوقع تھے`
              : `بہت بڑا: ${e.origin ?? "ویلیو"} کا ${n}${e.maximum.toString()} ہونا متوقع تھا`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `بہت چھوٹا: ${e.origin} کے ${n}${e.minimum.toString()} ${r.unit} ہونے متوقع تھے`
              : `بہت چھوٹا: ${e.origin} کا ${n}${e.minimum.toString()} ہونا متوقع تھا`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `غلط سٹرنگ: "${t.prefix}" سے شروع ہونا چاہیے`
              : "ends_with" === t.format
                ? `غلط سٹرنگ: "${t.suffix}" پر ختم ہونا چاہیے`
                : "includes" === t.format
                  ? `غلط سٹرنگ: "${t.includes}" شامل ہونا چاہیے`
                  : "regex" === t.format
                    ? `غلط سٹرنگ: پیٹرن ${t.pattern} سے میچ ہونا چاہیے`
                    : `غلط ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `غلط نمبر: ${e.divisor} کا مضاعف ہونا چاہیے`;
          case "unrecognized_keys":
            return `غیر تسلیم شدہ کی${e.keys.length > 1 ? "ز" : ""}: ${Te(e.keys, "، ")}`;
          case "invalid_key":
            return `${e.origin} میں غلط کی`;
          case "invalid_union":
          default:
            return "غلط ان پٹ";
          case "invalid_element":
            return `${e.origin} میں غلط ویلیو`;
        }
      };
    },
    ti = () => {
      const e = {
        string: { unit: "ký tự", verb: "có" },
        file: { unit: "byte", verb: "có" },
        array: { unit: "phần tử", verb: "có" },
        set: { unit: "phần tử", verb: "có" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "đầu vào",
        email: "địa chỉ email",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ngày giờ ISO",
        date: "ngày ISO",
        time: "giờ ISO",
        duration: "khoảng thời gian ISO",
        ipv4: "địa chỉ IPv4",
        ipv6: "địa chỉ IPv6",
        cidrv4: "dải IPv4",
        cidrv6: "dải IPv6",
        base64: "chuỗi mã hóa base64",
        base64url: "chuỗi mã hóa base64url",
        json_string: "chuỗi JSON",
        e164: "số E.164",
        jwt: "JWT",
        template_literal: "đầu vào",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Đầu vào không hợp lệ: mong đợi ${e.expected}, nhận được ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "số";
                case "object":
                  if (Array.isArray(e)) return "mảng";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Đầu vào không hợp lệ: mong đợi ${Ve(e.values[0])}`
              : `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Quá lớn: mong đợi ${e.origin ?? "giá trị"} ${r.verb} ${n}${e.maximum.toString()} ${r.unit ?? "phần tử"}`
              : `Quá lớn: mong đợi ${e.origin ?? "giá trị"} ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Quá nhỏ: mong đợi ${e.origin} ${r.verb} ${n}${e.minimum.toString()} ${r.unit}`
              : `Quá nhỏ: mong đợi ${e.origin} ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Chuỗi không hợp lệ: phải bắt đầu bằng "${t.prefix}"`
              : "ends_with" === t.format
                ? `Chuỗi không hợp lệ: phải kết thúc bằng "${t.suffix}"`
                : "includes" === t.format
                  ? `Chuỗi không hợp lệ: phải bao gồm "${t.includes}"`
                  : "regex" === t.format
                    ? `Chuỗi không hợp lệ: phải khớp với mẫu ${t.pattern}`
                    : `${n[t.format] ?? e.format} không hợp lệ`;
          }
          case "not_multiple_of":
            return `Số không hợp lệ: phải là bội số của ${e.divisor}`;
          case "unrecognized_keys":
            return `Khóa không được nhận dạng: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Khóa không hợp lệ trong ${e.origin}`;
          case "invalid_union":
          default:
            return "Đầu vào không hợp lệ";
          case "invalid_element":
            return `Giá trị không hợp lệ trong ${e.origin}`;
        }
      };
    },
    ni = () => {
      const e = {
        string: { unit: "字符", verb: "包含" },
        file: { unit: "字节", verb: "包含" },
        array: { unit: "项", verb: "包含" },
        set: { unit: "项", verb: "包含" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "输入",
        email: "电子邮件",
        url: "URL",
        emoji: "表情符号",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO日期时间",
        date: "ISO日期",
        time: "ISO时间",
        duration: "ISO时长",
        ipv4: "IPv4地址",
        ipv6: "IPv6地址",
        cidrv4: "IPv4网段",
        cidrv6: "IPv6网段",
        base64: "base64编码字符串",
        base64url: "base64url编码字符串",
        json_string: "JSON字符串",
        e164: "E.164号码",
        jwt: "JWT",
        template_literal: "输入",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `无效输入：期望 ${e.expected}，实际接收 ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "非数字(NaN)" : "数字";
                case "object":
                  if (Array.isArray(e)) return "数组";
                  if (null === e) return "空值(null)";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `无效输入：期望 ${Ve(e.values[0])}`
              : `无效选项：期望以下之一 ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `数值过大：期望 ${e.origin ?? "值"} ${n}${e.maximum.toString()} ${r.unit ?? "个元素"}`
              : `数值过大：期望 ${e.origin ?? "值"} ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `数值过小：期望 ${e.origin} ${n}${e.minimum.toString()} ${r.unit}`
              : `数值过小：期望 ${e.origin} ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `无效字符串：必须以 "${t.prefix}" 开头`
              : "ends_with" === t.format
                ? `无效字符串：必须以 "${t.suffix}" 结尾`
                : "includes" === t.format
                  ? `无效字符串：必须包含 "${t.includes}"`
                  : "regex" === t.format
                    ? `无效字符串：必须满足正则表达式 ${t.pattern}`
                    : `无效${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `无效数字：必须是 ${e.divisor} 的倍数`;
          case "unrecognized_keys":
            return `出现未知的键(key): ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `${e.origin} 中的键(key)无效`;
          case "invalid_union":
          default:
            return "无效输入";
          case "invalid_element":
            return `${e.origin} 中包含无效值(value)`;
        }
      };
    },
    ri = () => {
      const e = {
        string: { unit: "字元", verb: "擁有" },
        file: { unit: "位元組", verb: "擁有" },
        array: { unit: "項目", verb: "擁有" },
        set: { unit: "項目", verb: "擁有" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "輸入",
        email: "郵件地址",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO 日期時間",
        date: "ISO 日期",
        time: "ISO 時間",
        duration: "ISO 期間",
        ipv4: "IPv4 位址",
        ipv6: "IPv6 位址",
        cidrv4: "IPv4 範圍",
        cidrv6: "IPv6 範圍",
        base64: "base64 編碼字串",
        base64url: "base64url 編碼字串",
        json_string: "JSON 字串",
        e164: "E.164 數值",
        jwt: "JWT",
        template_literal: "輸入",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `無效的輸入值：預期為 ${e.expected}，但收到 ${((e) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "number";
                case "object":
                  if (Array.isArray(e)) return "array";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `無效的輸入值：預期為 ${Ve(e.values[0])}`
              : `無效的選項：預期為以下其中之一 ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `數值過大：預期 ${e.origin ?? "值"} 應為 ${n}${e.maximum.toString()} ${r.unit ?? "個元素"}`
              : `數值過大：預期 ${e.origin ?? "值"} 應為 ${n}${e.maximum.toString()}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `數值過小：預期 ${e.origin} 應為 ${n}${e.minimum.toString()} ${r.unit}`
              : `數值過小：預期 ${e.origin} 應為 ${n}${e.minimum.toString()}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `無效的字串：必須以 "${t.prefix}" 開頭`
              : "ends_with" === t.format
                ? `無效的字串：必須以 "${t.suffix}" 結尾`
                : "includes" === t.format
                  ? `無效的字串：必須包含 "${t.includes}"`
                  : "regex" === t.format
                    ? `無效的字串：必須符合格式 ${t.pattern}`
                    : `無效的 ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `無效的數字：必須為 ${e.divisor} 的倍數`;
          case "unrecognized_keys":
            return `無法識別的鍵值${e.keys.length > 1 ? "們" : ""}：${Te(e.keys, "、")}`;
          case "invalid_key":
            return `${e.origin} 中有無效的鍵值`;
          case "invalid_union":
          default:
            return "無效的輸入值";
          case "invalid_element":
            return `${e.origin} 中有無效的值`;
        }
      };
    },
    oi = () => {
      const e = {
        string: { unit: "àmi", verb: "ní" },
        file: { unit: "bytes", verb: "ní" },
        array: { unit: "nkan", verb: "ní" },
        set: { unit: "nkan", verb: "ní" },
      };
      function t(t) {
        return e[t] ?? null;
      }
      const n = {
        regex: "ẹ̀rọ ìbáwọlé",
        email: "àdírẹ́sì ìmẹ́lì",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "àkókò ISO",
        date: "ọjọ́ ISO",
        time: "àkókò ISO",
        duration: "àkókò tó pé ISO",
        ipv4: "àdírẹ́sì IPv4",
        ipv6: "àdírẹ́sì IPv6",
        cidrv4: "àgbègbè IPv4",
        cidrv6: "àgbègbè IPv6",
        base64: "ọ̀rọ̀ tí a kọ́ ní base64",
        base64url: "ọ̀rọ̀ base64url",
        json_string: "ọ̀rọ̀ JSON",
        e164: "nọ́mbà E.164",
        jwt: "JWT",
        template_literal: "ẹ̀rọ ìbáwọlé",
      };
      return (e) => {
        switch (e.code) {
          case "invalid_type":
            return `Ìbáwọlé aṣìṣe: a ní láti fi ${e.expected}, àmọ̀ a rí ${((
              e,
            ) => {
              const t = typeof e;
              switch (t) {
                case "number":
                  return Number.isNaN(e) ? "NaN" : "nọ́mbà";
                case "object":
                  if (Array.isArray(e)) return "akopọ";
                  if (null === e) return "null";
                  if (
                    Object.getPrototypeOf(e) !== Object.prototype &&
                    e.constructor
                  )
                    return e.constructor.name;
              }
              return t;
            })(e.input)}`;
          case "invalid_value":
            return 1 === e.values.length
              ? `Ìbáwọlé aṣìṣe: a ní láti fi ${Ve(e.values[0])}`
              : `Àṣàyàn aṣìṣe: yan ọ̀kan lára ${Te(e.values, "|")}`;
          case "too_big": {
            const n = e.inclusive ? "<=" : "<",
              r = t(e.origin);
            return r
              ? `Tó pọ̀ jù: a ní láti jẹ́ pé ${e.origin ?? "iye"} ${r.verb} ${n}${e.maximum} ${r.unit}`
              : `Tó pọ̀ jù: a ní láti jẹ́ ${n}${e.maximum}`;
          }
          case "too_small": {
            const n = e.inclusive ? ">=" : ">",
              r = t(e.origin);
            return r
              ? `Kéré ju: a ní láti jẹ́ pé ${e.origin} ${r.verb} ${n}${e.minimum} ${r.unit}`
              : `Kéré ju: a ní láti jẹ́ ${n}${e.minimum}`;
          }
          case "invalid_format": {
            const t = e;
            return "starts_with" === t.format
              ? `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú "${t.prefix}"`
              : "ends_with" === t.format
                ? `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ parí pẹ̀lú "${t.suffix}"`
                : "includes" === t.format
                  ? `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ ní "${t.includes}"`
                  : "regex" === t.format
                    ? `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bá àpẹẹrẹ mu ${t.pattern}`
                    : `Aṣìṣe: ${n[t.format] ?? e.format}`;
          }
          case "not_multiple_of":
            return `Nọ́mbà aṣìṣe: gbọ́dọ̀ jẹ́ èyà pípín ti ${e.divisor}`;
          case "unrecognized_keys":
            return `Bọtìnì àìmọ̀: ${Te(e.keys, ", ")}`;
          case "invalid_key":
            return `Bọtìnì aṣìṣe nínú ${e.origin}`;
          case "invalid_union":
          default:
            return "Ìbáwọlé aṣìṣe";
          case "invalid_element":
            return `Iye aṣìṣe nínú ${e.origin}`;
        }
      };
    };
  var ii = Object.freeze({
    __proto__: null,
    ar: function () {
      return { localeError: ho() };
    },
    az: function () {
      return { localeError: go() };
    },
    be: function () {
      return { localeError: vo() };
    },
    ca: function () {
      return { localeError: yo() };
    },
    cs: function () {
      return { localeError: bo() };
    },
    da: function () {
      return { localeError: _o() };
    },
    de: function () {
      return { localeError: wo() };
    },
    en: xo,
    eo: function () {
      return { localeError: $o() };
    },
    es: function () {
      return { localeError: Io() };
    },
    fa: function () {
      return { localeError: So() };
    },
    fi: function () {
      return { localeError: To() };
    },
    fr: function () {
      return { localeError: No() };
    },
    frCA: function () {
      return { localeError: Oo() };
    },
    he: function () {
      return { localeError: Eo() };
    },
    hu: function () {
      return { localeError: Ao() };
    },
    id: function () {
      return { localeError: Uo() };
    },
    is: function () {
      return { localeError: Co() };
    },
    it: function () {
      return { localeError: Po() };
    },
    ja: function () {
      return { localeError: Do() };
    },
    kh: function () {
      return { localeError: jo() };
    },
    ko: function () {
      return { localeError: zo() };
    },
    mk: function () {
      return { localeError: Ro() };
    },
    ms: function () {
      return { localeError: Mo() };
    },
    nl: function () {
      return { localeError: qo() };
    },
    no: function () {
      return { localeError: Zo() };
    },
    ota: function () {
      return { localeError: Lo() };
    },
    pl: function () {
      return { localeError: Bo() };
    },
    ps: function () {
      return { localeError: Fo() };
    },
    pt: function () {
      return { localeError: Wo() };
    },
    ru: function () {
      return { localeError: Vo() };
    },
    sl: function () {
      return { localeError: Jo() };
    },
    sv: function () {
      return { localeError: Ko() };
    },
    ta: function () {
      return { localeError: Go() };
    },
    th: function () {
      return { localeError: Xo() };
    },
    tr: function () {
      return { localeError: Yo() };
    },
    ua: function () {
      return { localeError: Qo() };
    },
    ur: function () {
      return { localeError: ei() };
    },
    vi: function () {
      return { localeError: ti() };
    },
    yo: function () {
      return { localeError: oi() };
    },
    zhCN: function () {
      return { localeError: ni() };
    },
    zhTW: function () {
      return { localeError: ri() };
    },
  });
  const ai = Symbol("ZodOutput"),
    si = Symbol("ZodInput");
  class li {
    constructor() {
      ((this._map = new Map()), (this._idmap = new Map()));
    }
    add(e, ...t) {
      const n = t[0];
      if ((this._map.set(e, n), n && "object" == typeof n && "id" in n)) {
        if (this._idmap.has(n.id))
          throw new Error(`ID ${n.id} already exists in the registry`);
        this._idmap.set(n.id, e);
      }
      return this;
    }
    clear() {
      return ((this._map = new Map()), (this._idmap = new Map()), this);
    }
    remove(e) {
      const t = this._map.get(e);
      return (
        t && "object" == typeof t && "id" in t && this._idmap.delete(t.id),
        this._map.delete(e),
        this
      );
    }
    get(e) {
      const t = e._zod.parent;
      if (t) {
        const n = { ...(this.get(t) ?? {}) };
        delete n.id;
        const r = { ...n, ...this._map.get(e) };
        return Object.keys(r).length ? r : void 0;
      }
      return this._map.get(e);
    }
    has(e) {
      return this._map.has(e);
    }
  }
  function ui() {
    return new li();
  }
  const ci = ui();
  function di(e, t) {
    return new e({ type: "string", ...He(t) });
  }
  function pi(e, t) {
    return new e({ type: "string", coerce: !0, ...He(t) });
  }
  function mi(e, t) {
    return new e({
      type: "string",
      format: "email",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function hi(e, t) {
    return new e({
      type: "string",
      format: "guid",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function gi(e, t) {
    return new e({
      type: "string",
      format: "uuid",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function fi(e, t) {
    return new e({
      type: "string",
      format: "uuid",
      check: "string_format",
      abort: !1,
      version: "v4",
      ...He(t),
    });
  }
  function vi(e, t) {
    return new e({
      type: "string",
      format: "uuid",
      check: "string_format",
      abort: !1,
      version: "v6",
      ...He(t),
    });
  }
  function yi(e, t) {
    return new e({
      type: "string",
      format: "uuid",
      check: "string_format",
      abort: !1,
      version: "v7",
      ...He(t),
    });
  }
  function bi(e, t) {
    return new e({
      type: "string",
      format: "url",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function _i(e, t) {
    return new e({
      type: "string",
      format: "emoji",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function wi(e, t) {
    return new e({
      type: "string",
      format: "nanoid",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function ki(e, t) {
    return new e({
      type: "string",
      format: "cuid",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function xi(e, t) {
    return new e({
      type: "string",
      format: "cuid2",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function $i(e, t) {
    return new e({
      type: "string",
      format: "ulid",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function Ii(e, t) {
    return new e({
      type: "string",
      format: "xid",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function Si(e, t) {
    return new e({
      type: "string",
      format: "ksuid",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function Ti(e, t) {
    return new e({
      type: "string",
      format: "ipv4",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function Ni(e, t) {
    return new e({
      type: "string",
      format: "ipv6",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function Oi(e, t) {
    return new e({
      type: "string",
      format: "cidrv4",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function Ei(e, t) {
    return new e({
      type: "string",
      format: "cidrv6",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function Ai(e, t) {
    return new e({
      type: "string",
      format: "base64",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function Ui(e, t) {
    return new e({
      type: "string",
      format: "base64url",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function Ci(e, t) {
    return new e({
      type: "string",
      format: "e164",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  function Pi(e, t) {
    return new e({
      type: "string",
      format: "jwt",
      check: "string_format",
      abort: !1,
      ...He(t),
    });
  }
  const Di = {
    Any: null,
    Minute: -1,
    Second: 0,
    Millisecond: 3,
    Microsecond: 6,
  };
  function ji(e, t) {
    return new e({
      type: "string",
      format: "datetime",
      check: "string_format",
      offset: !1,
      local: !1,
      precision: null,
      ...He(t),
    });
  }
  function zi(e, t) {
    return new e({
      type: "string",
      format: "date",
      check: "string_format",
      ...He(t),
    });
  }
  function Ri(e, t) {
    return new e({
      type: "string",
      format: "time",
      check: "string_format",
      precision: null,
      ...He(t),
    });
  }
  function Mi(e, t) {
    return new e({
      type: "string",
      format: "duration",
      check: "string_format",
      ...He(t),
    });
  }
  function qi(e, t) {
    return new e({ type: "number", checks: [], ...He(t) });
  }
  function Zi(e, t) {
    return new e({ type: "number", coerce: !0, checks: [], ...He(t) });
  }
  function Li(e, t) {
    return new e({
      type: "number",
      check: "number_format",
      abort: !1,
      format: "safeint",
      ...He(t),
    });
  }
  function Fi(e, t) {
    return new e({
      type: "number",
      check: "number_format",
      abort: !1,
      format: "float32",
      ...He(t),
    });
  }
  function Bi(e, t) {
    return new e({
      type: "number",
      check: "number_format",
      abort: !1,
      format: "float64",
      ...He(t),
    });
  }
  function Wi(e, t) {
    return new e({
      type: "number",
      check: "number_format",
      abort: !1,
      format: "int32",
      ...He(t),
    });
  }
  function Hi(e, t) {
    return new e({
      type: "number",
      check: "number_format",
      abort: !1,
      format: "uint32",
      ...He(t),
    });
  }
  function Vi(e, t) {
    return new e({ type: "boolean", ...He(t) });
  }
  function Ji(e, t) {
    return new e({ type: "boolean", coerce: !0, ...He(t) });
  }
  function Ki(e, t) {
    return new e({ type: "bigint", ...He(t) });
  }
  function Gi(e, t) {
    return new e({ type: "bigint", coerce: !0, ...He(t) });
  }
  function Xi(e, t) {
    return new e({
      type: "bigint",
      check: "bigint_format",
      abort: !1,
      format: "int64",
      ...He(t),
    });
  }
  function Yi(e, t) {
    return new e({
      type: "bigint",
      check: "bigint_format",
      abort: !1,
      format: "uint64",
      ...He(t),
    });
  }
  function Qi(e, t) {
    return new e({ type: "symbol", ...He(t) });
  }
  function ea(e, t) {
    return new e({ type: "undefined", ...He(t) });
  }
  function ta(e, t) {
    return new e({ type: "null", ...He(t) });
  }
  function na(e) {
    return new e({ type: "any" });
  }
  function ra(e) {
    return new e({ type: "unknown" });
  }
  function oa(e, t) {
    return new e({ type: "never", ...He(t) });
  }
  function ia(e, t) {
    return new e({ type: "void", ...He(t) });
  }
  function aa(e, t) {
    return new e({ type: "date", ...He(t) });
  }
  function sa(e, t) {
    return new e({ type: "date", coerce: !0, ...He(t) });
  }
  function la(e, t) {
    return new e({ type: "nan", ...He(t) });
  }
  function ua(e, t) {
    return new mn({ check: "less_than", ...He(t), value: e, inclusive: !1 });
  }
  function ca(e, t) {
    return new mn({ check: "less_than", ...He(t), value: e, inclusive: !0 });
  }
  function da(e, t) {
    return new hn({ check: "greater_than", ...He(t), value: e, inclusive: !1 });
  }
  function pa(e, t) {
    return new hn({ check: "greater_than", ...He(t), value: e, inclusive: !0 });
  }
  function ma(e) {
    return da(0, e);
  }
  function ha(e) {
    return ua(0, e);
  }
  function ga(e) {
    return ca(0, e);
  }
  function fa(e) {
    return pa(0, e);
  }
  function va(e, t) {
    return new gn({ check: "multiple_of", ...He(t), value: e });
  }
  function ya(e, t) {
    return new yn({ check: "max_size", ...He(t), maximum: e });
  }
  function ba(e, t) {
    return new bn({ check: "min_size", ...He(t), minimum: e });
  }
  function _a(e, t) {
    return new _n({ check: "size_equals", ...He(t), size: e });
  }
  function wa(e, t) {
    return new wn({ check: "max_length", ...He(t), maximum: e });
  }
  function ka(e, t) {
    return new kn({ check: "min_length", ...He(t), minimum: e });
  }
  function xa(e, t) {
    return new xn({ check: "length_equals", ...He(t), length: e });
  }
  function $a(e, t) {
    return new In({
      check: "string_format",
      format: "regex",
      ...He(t),
      pattern: e,
    });
  }
  function Ia(e) {
    return new Sn({ check: "string_format", format: "lowercase", ...He(e) });
  }
  function Sa(e) {
    return new Tn({ check: "string_format", format: "uppercase", ...He(e) });
  }
  function Ta(e, t) {
    return new Nn({
      check: "string_format",
      format: "includes",
      ...He(t),
      includes: e,
    });
  }
  function Na(e, t) {
    return new On({
      check: "string_format",
      format: "starts_with",
      ...He(t),
      prefix: e,
    });
  }
  function Oa(e, t) {
    return new En({
      check: "string_format",
      format: "ends_with",
      ...He(t),
      suffix: e,
    });
  }
  function Ea(e, t, n) {
    return new Un({ check: "property", property: e, schema: t, ...He(n) });
  }
  function Aa(e, t) {
    return new Cn({ check: "mime_type", mime: e, ...He(t) });
  }
  function Ua(e) {
    return new Pn({ check: "overwrite", tx: e });
  }
  function Ca(e) {
    return Ua((t) => t.normalize(e));
  }
  function Pa() {
    return Ua((e) => e.trim());
  }
  function Da() {
    return Ua((e) => e.toLowerCase());
  }
  function ja() {
    return Ua((e) => e.toUpperCase());
  }
  function za(e, t, n) {
    return new e({ type: "array", element: t, ...He(n) });
  }
  function Ra(e, t, n, r) {
    const o = n instanceof zn;
    return new e({
      type: "tuple",
      items: t,
      rest: o ? n : null,
      ...He(o ? r : n),
    });
  }
  function Ma(e, t) {
    return new e({ type: "file", ...He(t) });
  }
  function qa(e, t, n) {
    const r = He(n);
    return (
      r.abort ?? (r.abort = !0),
      new e({ type: "custom", check: "custom", fn: t, ...r })
    );
  }
  function Za(e, t, n) {
    return new e({ type: "custom", check: "custom", fn: t, ...He(n) });
  }
  function La(e) {
    const t = Fa(
      (n) => (
        (n.addIssue = (e) => {
          if ("string" == typeof e) n.issues.push(ut(e, n.value, t._zod.def));
          else {
            const r = e;
            (r.fatal && (r.continue = !1),
              r.code ?? (r.code = "custom"),
              r.input ?? (r.input = n.value),
              r.inst ?? (r.inst = t),
              r.continue ?? (r.continue = !t._zod.def.abort),
              n.issues.push(ut(r)));
          }
        }),
        e(n.value, n)
      ),
    );
    return t;
  }
  function Fa(e, t) {
    const n = new dn({ check: "custom", ...He(t) });
    return ((n._zod.check = e), n);
  }
  function Ba(e, t) {
    const n = He(t);
    let r = n.truthy ?? ["true", "1", "yes", "on", "y", "enabled"],
      o = n.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
    "sensitive" !== n.case &&
      ((r = r.map((e) => ("string" == typeof e ? e.toLowerCase() : e))),
      (o = o.map((e) => ("string" == typeof e ? e.toLowerCase() : e))));
    const i = new Set(r),
      a = new Set(o),
      s = e.Pipe ?? oo,
      l = e.Boolean ?? gr,
      u = e.String ?? Rn,
      c = new (e.Transform ?? Hr)({
        type: "transform",
        transform: (e, t) => {
          let r = e;
          return (
            "sensitive" !== n.case && (r = r.toLowerCase()),
            !!i.has(r) ||
              (!a.has(r) &&
                (t.issues.push({
                  code: "invalid_value",
                  expected: "stringbool",
                  values: [...i, ...a],
                  input: t.value,
                  inst: c,
                  continue: !1,
                }),
                {}))
          );
        },
        error: n.error,
      }),
      d = new s({
        type: "pipe",
        in: new u({ type: "string", error: n.error }),
        out: c,
        error: n.error,
      });
    return new s({
      type: "pipe",
      in: d,
      out: new l({ type: "boolean", error: n.error }),
      error: n.error,
    });
  }
  function Wa(e, t, n, r = {}) {
    const o = He(r),
      i = {
        ...He(r),
        check: "string_format",
        type: "string",
        format: t,
        fn: "function" == typeof n ? n : (e) => n.test(e),
        ...o,
      };
    return (n instanceof RegExp && (i.pattern = n), new e(i));
  }
  class Ha {
    constructor(e) {
      ((this._def = e), (this.def = e));
    }
    implement(e) {
      if ("function" != typeof e)
        throw new Error("implement() must be called with a function");
      const t = (...n) => {
        const r = this._def.input
          ? _t(this._def.input, n, void 0, { callee: t })
          : n;
        if (!Array.isArray(r))
          throw new Error(
            "Invalid arguments schema: not an array or tuple schema.",
          );
        const o = e(...r);
        return this._def.output
          ? _t(this._def.output, o, void 0, { callee: t })
          : o;
      };
      return t;
    }
    implementAsync(e) {
      if ("function" != typeof e)
        throw new Error("implement() must be called with a function");
      const t = async (...n) => {
        const r = this._def.input
          ? await kt(this._def.input, n, void 0, { callee: t })
          : n;
        if (!Array.isArray(r))
          throw new Error(
            "Invalid arguments schema: not an array or tuple schema.",
          );
        const o = await e(...r);
        return this._def.output
          ? kt(this._def.output, o, void 0, { callee: t })
          : o;
      };
      return t;
    }
    input(...e) {
      const t = this.constructor;
      return Array.isArray(e[0])
        ? new t({
            type: "function",
            input: new jr({ type: "tuple", items: e[0], rest: e[1] }),
            output: this._def.output,
          })
        : new t({ type: "function", input: e[0], output: this._def.output });
    }
    output(e) {
      return new (0, this.constructor)({
        type: "function",
        input: this._def.input,
        output: e,
      });
    }
  }
  function Va(e) {
    return new Ha({
      type: "function",
      input: Array.isArray(e?.input)
        ? Ra(jr, e?.input)
        : (e?.input ?? za(Tr, ra(kr))),
      output: e?.output ?? ra(kr),
    });
  }
  class Ja {
    constructor(e) {
      ((this.counter = 0),
        (this.metadataRegistry = e?.metadata ?? ci),
        (this.target = e?.target ?? "draft-2020-12"),
        (this.unrepresentable = e?.unrepresentable ?? "throw"),
        (this.override = e?.override ?? (() => {})),
        (this.io = e?.io ?? "output"),
        (this.seen = new Map()));
    }
    process(e, t = { path: [], schemaPath: [] }) {
      var n;
      const r = e._zod.def,
        o = {
          guid: "uuid",
          url: "uri",
          datetime: "date-time",
          json_string: "json-string",
          regex: "",
        },
        i = this.seen.get(e);
      if (i)
        return (
          i.count++,
          t.schemaPath.includes(e) && (i.cycle = t.path),
          i.schema
        );
      const a = { schema: {}, count: 1, cycle: void 0, path: t.path };
      this.seen.set(e, a);
      const s = e._zod.toJSONSchema?.();
      if (s) a.schema = s;
      else {
        const n = { ...t, schemaPath: [...t.schemaPath, e], path: t.path },
          i = e._zod.parent;
        if (i)
          ((a.ref = i), this.process(i, n), (this.seen.get(i).isParent = !0));
        else {
          const t = a.schema;
          switch (r.type) {
            case "string": {
              const n = t;
              n.type = "string";
              const {
                minimum: r,
                maximum: i,
                format: s,
                patterns: l,
                contentEncoding: u,
              } = e._zod.bag;
              if (
                ("number" == typeof r && (n.minLength = r),
                "number" == typeof i && (n.maxLength = i),
                s &&
                  ((n.format = o[s] ?? s), "" === n.format && delete n.format),
                u && (n.contentEncoding = u),
                l && l.size > 0)
              ) {
                const e = [...l];
                1 === e.length
                  ? (n.pattern = e[0].source)
                  : e.length > 1 &&
                    (a.schema.allOf = [
                      ...e.map((e) => ({
                        ...("draft-7" === this.target ||
                        "draft-4" === this.target
                          ? { type: "string" }
                          : {}),
                        pattern: e.source,
                      })),
                    ]);
              }
              break;
            }
            case "number": {
              const n = t,
                {
                  minimum: r,
                  maximum: o,
                  format: i,
                  multipleOf: a,
                  exclusiveMaximum: s,
                  exclusiveMinimum: l,
                } = e._zod.bag;
              ("string" == typeof i && i.includes("int")
                ? (n.type = "integer")
                : (n.type = "number"),
                "number" == typeof l &&
                  ("draft-4" === this.target
                    ? ((n.minimum = l), (n.exclusiveMinimum = !0))
                    : (n.exclusiveMinimum = l)),
                "number" == typeof r &&
                  ((n.minimum = r),
                  "number" == typeof l &&
                    "draft-4" !== this.target &&
                    (l >= r ? delete n.minimum : delete n.exclusiveMinimum)),
                "number" == typeof s &&
                  ("draft-4" === this.target
                    ? ((n.maximum = s), (n.exclusiveMaximum = !0))
                    : (n.exclusiveMaximum = s)),
                "number" == typeof o &&
                  ((n.maximum = o),
                  "number" == typeof s &&
                    "draft-4" !== this.target &&
                    (s <= o ? delete n.maximum : delete n.exclusiveMaximum)),
                "number" == typeof a && (n.multipleOf = a));
              break;
            }
            case "boolean":
            case "success":
              t.type = "boolean";
              break;
            case "bigint":
              if ("throw" === this.unrepresentable)
                throw new Error("BigInt cannot be represented in JSON Schema");
              break;
            case "symbol":
              if ("throw" === this.unrepresentable)
                throw new Error("Symbols cannot be represented in JSON Schema");
              break;
            case "null":
              t.type = "null";
              break;
            case "any":
            case "unknown":
              break;
            case "undefined":
              if ("throw" === this.unrepresentable)
                throw new Error(
                  "Undefined cannot be represented in JSON Schema",
                );
              break;
            case "void":
              if ("throw" === this.unrepresentable)
                throw new Error("Void cannot be represented in JSON Schema");
              break;
            case "never":
              t.not = {};
              break;
            case "date":
              if ("throw" === this.unrepresentable)
                throw new Error("Date cannot be represented in JSON Schema");
              break;
            case "array": {
              const o = t,
                { minimum: i, maximum: a } = e._zod.bag;
              ("number" == typeof i && (o.minItems = i),
                "number" == typeof a && (o.maxItems = a),
                (o.type = "array"),
                (o.items = this.process(r.element, {
                  ...n,
                  path: [...n.path, "items"],
                })));
              break;
            }
            case "object": {
              const e = t;
              ((e.type = "object"), (e.properties = {}));
              const o = r.shape;
              for (const t in o)
                e.properties[t] = this.process(o[t], {
                  ...n,
                  path: [...n.path, "properties", t],
                });
              const i = new Set(Object.keys(o)),
                a = new Set(
                  [...i].filter((e) => {
                    const t = r.shape[e]._zod;
                    return "input" === this.io
                      ? void 0 === t.optin
                      : void 0 === t.optout;
                  }),
                );
              (a.size > 0 && (e.required = Array.from(a)),
                "never" === r.catchall?._zod.def.type
                  ? (e.additionalProperties = !1)
                  : r.catchall
                    ? r.catchall &&
                      (e.additionalProperties = this.process(r.catchall, {
                        ...n,
                        path: [...n.path, "additionalProperties"],
                      }))
                    : "output" === this.io && (e.additionalProperties = !1));
              break;
            }
            case "union":
              t.anyOf = r.options.map((e, t) =>
                this.process(e, { ...n, path: [...n.path, "anyOf", t] }),
              );
              break;
            case "intersection": {
              const e = t,
                o = this.process(r.left, {
                  ...n,
                  path: [...n.path, "allOf", 0],
                }),
                i = this.process(r.right, {
                  ...n,
                  path: [...n.path, "allOf", 1],
                }),
                a = (e) => "allOf" in e && 1 === Object.keys(e).length,
                s = [...(a(o) ? o.allOf : [o]), ...(a(i) ? i.allOf : [i])];
              e.allOf = s;
              break;
            }
            case "tuple": {
              const o = t;
              o.type = "array";
              const i = r.items.map((e, t) =>
                this.process(e, { ...n, path: [...n.path, "prefixItems", t] }),
              );
              if (
                ("draft-2020-12" === this.target
                  ? (o.prefixItems = i)
                  : (o.items = i),
                r.rest)
              ) {
                const e = this.process(r.rest, {
                  ...n,
                  path: [...n.path, "items"],
                });
                "draft-2020-12" === this.target
                  ? (o.items = e)
                  : (o.additionalItems = e);
              }
              r.rest &&
                (o.items = this.process(r.rest, {
                  ...n,
                  path: [...n.path, "items"],
                }));
              const { minimum: a, maximum: s } = e._zod.bag;
              ("number" == typeof a && (o.minItems = a),
                "number" == typeof s && (o.maxItems = s));
              break;
            }
            case "record": {
              const e = t;
              ((e.type = "object"),
                "draft-4" !== this.target &&
                  (e.propertyNames = this.process(r.keyType, {
                    ...n,
                    path: [...n.path, "propertyNames"],
                  })),
                (e.additionalProperties = this.process(r.valueType, {
                  ...n,
                  path: [...n.path, "additionalProperties"],
                })));
              break;
            }
            case "map":
              if ("throw" === this.unrepresentable)
                throw new Error("Map cannot be represented in JSON Schema");
              break;
            case "set":
              if ("throw" === this.unrepresentable)
                throw new Error("Set cannot be represented in JSON Schema");
              break;
            case "enum": {
              const e = t,
                n = Se(r.entries);
              (n.every((e) => "number" == typeof e) && (e.type = "number"),
                n.every((e) => "string" == typeof e) && (e.type = "string"),
                (e.enum = n));
              break;
            }
            case "literal": {
              const e = t,
                n = [];
              for (const e of r.values)
                if (void 0 === e) {
                  if ("throw" === this.unrepresentable)
                    throw new Error(
                      "Literal `undefined` cannot be represented in JSON Schema",
                    );
                } else if ("bigint" == typeof e) {
                  if ("throw" === this.unrepresentable)
                    throw new Error(
                      "BigInt literals cannot be represented in JSON Schema",
                    );
                  n.push(Number(e));
                } else n.push(e);
              if (0 === n.length);
              else if (1 === n.length) {
                const t = n[0];
                ((e.type = null === t ? "null" : typeof t),
                  "draft-4" === this.target ? (e.enum = [t]) : (e.const = t));
              } else
                (n.every((e) => "number" == typeof e) && (e.type = "number"),
                  n.every((e) => "string" == typeof e) && (e.type = "string"),
                  n.every((e) => "boolean" == typeof e) && (e.type = "string"),
                  n.every((e) => null === e) && (e.type = "null"),
                  (e.enum = n));
              break;
            }
            case "file": {
              const n = t,
                r = {
                  type: "string",
                  format: "binary",
                  contentEncoding: "binary",
                },
                { minimum: o, maximum: i, mime: a } = e._zod.bag;
              (void 0 !== o && (r.minLength = o),
                void 0 !== i && (r.maxLength = i),
                a
                  ? 1 === a.length
                    ? ((r.contentMediaType = a[0]), Object.assign(n, r))
                    : (n.anyOf = a.map((e) => ({ ...r, contentMediaType: e })))
                  : Object.assign(n, r));
              break;
            }
            case "transform":
              if ("throw" === this.unrepresentable)
                throw new Error(
                  "Transforms cannot be represented in JSON Schema",
                );
              break;
            case "nullable": {
              const e = this.process(r.innerType, n);
              t.anyOf = [e, { type: "null" }];
              break;
            }
            case "nonoptional":
            case "promise":
            case "optional":
              (this.process(r.innerType, n), (a.ref = r.innerType));
              break;
            case "default":
              (this.process(r.innerType, n),
                (a.ref = r.innerType),
                (t.default = JSON.parse(JSON.stringify(r.defaultValue))));
              break;
            case "prefault":
              (this.process(r.innerType, n),
                (a.ref = r.innerType),
                "input" === this.io &&
                  (t._prefault = JSON.parse(JSON.stringify(r.defaultValue))));
              break;
            case "catch": {
              let e;
              (this.process(r.innerType, n), (a.ref = r.innerType));
              try {
                e = r.catchValue(void 0);
              } catch {
                throw new Error(
                  "Dynamic catch values are not supported in JSON Schema",
                );
              }
              t.default = e;
              break;
            }
            case "nan":
              if ("throw" === this.unrepresentable)
                throw new Error("NaN cannot be represented in JSON Schema");
              break;
            case "template_literal": {
              const n = t,
                r = e._zod.pattern;
              if (!r) throw new Error("Pattern not found in template literal");
              ((n.type = "string"), (n.pattern = r.source));
              break;
            }
            case "pipe": {
              const e =
                "input" === this.io
                  ? "transform" === r.in._zod.def.type
                    ? r.out
                    : r.in
                  : r.out;
              (this.process(e, n), (a.ref = e));
              break;
            }
            case "readonly":
              (this.process(r.innerType, n),
                (a.ref = r.innerType),
                (t.readOnly = !0));
              break;
            case "lazy": {
              const t = e._zod.innerType;
              (this.process(t, n), (a.ref = t));
              break;
            }
            case "custom":
              if ("throw" === this.unrepresentable)
                throw new Error(
                  "Custom types cannot be represented in JSON Schema",
                );
          }
        }
      }
      const l = this.metadataRegistry.get(e);
      return (
        l && Object.assign(a.schema, l),
        "input" === this.io &&
          Ga(e) &&
          (delete a.schema.examples, delete a.schema.default),
        "input" === this.io &&
          a.schema._prefault &&
          ((n = a.schema).default ?? (n.default = a.schema._prefault)),
        delete a.schema._prefault,
        this.seen.get(e).schema
      );
    }
    emit(e, t) {
      const n = {
          cycles: t?.cycles ?? "ref",
          reused: t?.reused ?? "inline",
          external: t?.external ?? void 0,
        },
        r = this.seen.get(e);
      if (!r) throw new Error("Unprocessed schema. This is a bug in Zod.");
      const o = (e) => {
          const t = "draft-2020-12" === this.target ? "$defs" : "definitions";
          if (n.external) {
            const r = n.external.registry.get(e[0])?.id,
              o = n.external.uri ?? ((e) => e);
            if (r) return { ref: o(r) };
            const i = e[1].defId ?? e[1].schema.id ?? "schema" + this.counter++;
            return (
              (e[1].defId = i),
              { defId: i, ref: `${o("__shared")}#/${t}/${i}` }
            );
          }
          if (e[1] === r) return { ref: "#" };
          const o = `#/${t}/`,
            i = e[1].schema.id ?? "__schema" + this.counter++;
          return { defId: i, ref: o + i };
        },
        i = (e) => {
          if (e[1].schema.$ref) return;
          const t = e[1],
            { ref: n, defId: r } = o(e);
          ((t.def = { ...t.schema }), r && (t.defId = r));
          const i = t.schema;
          for (const e in i) delete i[e];
          i.$ref = n;
        };
      if ("throw" === n.cycles)
        for (const e of this.seen.entries()) {
          const t = e[1];
          if (t.cycle)
            throw new Error(
              `Cycle detected: #/${t.cycle?.join("/")}/<root>\n\nSet the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`,
            );
        }
      for (const t of this.seen.entries()) {
        const r = t[1];
        if (e === t[0]) {
          i(t);
          continue;
        }
        if (n.external) {
          const r = n.external.registry.get(t[0])?.id;
          if (e !== t[0] && r) {
            i(t);
            continue;
          }
        }
        const o = this.metadataRegistry.get(t[0])?.id;
        (o || r.cycle || (r.count > 1 && "ref" === n.reused)) && i(t);
      }
      const a = (e, t) => {
        const n = this.seen.get(e),
          r = n.def ?? n.schema,
          o = { ...r };
        if (null === n.ref) return;
        const i = n.ref;
        if (((n.ref = null), i)) {
          a(i, t);
          const e = this.seen.get(i).schema;
          !e.$ref || ("draft-7" !== t.target && "draft-4" !== t.target)
            ? (Object.assign(r, e), Object.assign(r, o))
            : ((r.allOf = r.allOf ?? []), r.allOf.push(e));
        }
        n.isParent ||
          this.override({ zodSchema: e, jsonSchema: r, path: n.path ?? [] });
      };
      for (const e of [...this.seen.entries()].reverse())
        a(e[0], { target: this.target });
      const s = {};
      if (
        ("draft-2020-12" === this.target
          ? (s.$schema = "https://json-schema.org/draft/2020-12/schema")
          : "draft-7" === this.target
            ? (s.$schema = "http://json-schema.org/draft-07/schema#")
            : "draft-4" === this.target
              ? (s.$schema = "http://json-schema.org/draft-04/schema#")
              : console.warn(`Invalid target: ${this.target}`),
        n.external?.uri)
      ) {
        const t = n.external.registry.get(e)?.id;
        if (!t) throw new Error("Schema is missing an `id` property");
        s.$id = n.external.uri(t);
      }
      Object.assign(s, r.def);
      const l = n.external?.defs ?? {};
      for (const e of this.seen.entries()) {
        const t = e[1];
        t.def && t.defId && (l[t.defId] = t.def);
      }
      n.external ||
        (Object.keys(l).length > 0 &&
          ("draft-2020-12" === this.target
            ? (s.$defs = l)
            : (s.definitions = l)));
      try {
        return JSON.parse(JSON.stringify(s));
      } catch (e) {
        throw new Error("Error converting schema to JSON.");
      }
    }
  }
  function Ka(e, t) {
    if (e instanceof li) {
      const n = new Ja(t),
        r = {};
      for (const t of e._idmap.entries()) {
        const [e, r] = t;
        n.process(r);
      }
      const o = {},
        i = { registry: e, uri: t?.uri, defs: r };
      for (const r of e._idmap.entries()) {
        const [e, a] = r;
        o[e] = n.emit(a, { ...t, external: i });
      }
      if (Object.keys(r).length > 0) {
        const e = "draft-2020-12" === n.target ? "$defs" : "definitions";
        o.__shared = { [e]: r };
      }
      return { schemas: o };
    }
    const n = new Ja(t);
    return (n.process(e), n.emit(e, t));
  }
  function Ga(e, t) {
    const n = t ?? { seen: new Set() };
    if (n.seen.has(e)) return !1;
    n.seen.add(e);
    const r = e._zod.def;
    switch (r.type) {
      case "string":
      case "number":
      case "bigint":
      case "boolean":
      case "date":
      case "symbol":
      case "undefined":
      case "null":
      case "any":
      case "unknown":
      case "never":
      case "void":
      case "literal":
      case "enum":
      case "nan":
      case "file":
      case "template_literal":
      case "custom":
      case "success":
      case "catch":
        return !1;
      case "array":
        return Ga(r.element, n);
      case "object":
        for (const e in r.shape) if (Ga(r.shape[e], n)) return !0;
        return !1;
      case "union":
        for (const e of r.options) if (Ga(e, n)) return !0;
        return !1;
      case "intersection":
        return Ga(r.left, n) || Ga(r.right, n);
      case "tuple":
        for (const e of r.items) if (Ga(e, n)) return !0;
        return !(!r.rest || !Ga(r.rest, n));
      case "record":
      case "map":
        return Ga(r.keyType, n) || Ga(r.valueType, n);
      case "set":
        return Ga(r.valueType, n);
      case "promise":
      case "optional":
      case "nonoptional":
      case "nullable":
      case "readonly":
      case "default":
      case "prefault":
        return Ga(r.innerType, n);
      case "lazy":
        return Ga(r.getter(), n);
      case "transform":
        return !0;
      case "pipe":
        return Ga(r.in, n) || Ga(r.out, n);
    }
    throw new Error(`Unknown schema type: ${r.type}`);
  }
  var Xa = Object.freeze({ __proto__: null }),
    Ya = Object.freeze({
      __proto__: null,
      $ZodAny: wr,
      $ZodArray: Tr,
      $ZodAsyncError: xe,
      $ZodBase64: ar,
      $ZodBase64URL: lr,
      $ZodBigInt: fr,
      $ZodBigIntFormat: vr,
      $ZodBoolean: gr,
      $ZodCIDRv4: rr,
      $ZodCIDRv6: or,
      $ZodCUID: Hn,
      $ZodCUID2: Vn,
      $ZodCatch: no,
      $ZodCheck: dn,
      $ZodCheckBigIntFormat: vn,
      $ZodCheckEndsWith: En,
      $ZodCheckGreaterThan: hn,
      $ZodCheckIncludes: Nn,
      $ZodCheckLengthEquals: xn,
      $ZodCheckLessThan: mn,
      $ZodCheckLowerCase: Sn,
      $ZodCheckMaxLength: wn,
      $ZodCheckMaxSize: yn,
      $ZodCheckMimeType: Cn,
      $ZodCheckMinLength: kn,
      $ZodCheckMinSize: bn,
      $ZodCheckMultipleOf: gn,
      $ZodCheckNumberFormat: fn,
      $ZodCheckOverwrite: Pn,
      $ZodCheckProperty: Un,
      $ZodCheckRegex: In,
      $ZodCheckSizeEquals: _n,
      $ZodCheckStartsWith: On,
      $ZodCheckStringFormat: $n,
      $ZodCheckUpperCase: Tn,
      $ZodCustom: po,
      $ZodCustomStringFormat: pr,
      $ZodDate: Ir,
      $ZodDefault: Gr,
      $ZodDiscriminatedUnion: Ur,
      $ZodE164: ur,
      $ZodEmail: Ln,
      $ZodEmoji: Bn,
      $ZodEnum: Fr,
      $ZodError: pt,
      $ZodFile: Wr,
      $ZodFunction: Ha,
      $ZodGUID: qn,
      $ZodIPv4: tr,
      $ZodIPv6: nr,
      $ZodISODate: Yn,
      $ZodISODateTime: Xn,
      $ZodISODuration: er,
      $ZodISOTime: Qn,
      $ZodIntersection: Cr,
      $ZodJWT: dr,
      $ZodKSUID: Gn,
      $ZodLazy: co,
      $ZodLiteral: Br,
      $ZodMap: Mr,
      $ZodNaN: ro,
      $ZodNanoID: Wn,
      $ZodNever: xr,
      $ZodNonOptional: Qr,
      $ZodNull: _r,
      $ZodNullable: Kr,
      $ZodNumber: mr,
      $ZodNumberFormat: hr,
      $ZodObject: Or,
      $ZodOptional: Jr,
      $ZodPipe: oo,
      $ZodPrefault: Yr,
      $ZodPromise: uo,
      $ZodReadonly: ao,
      $ZodRealError: mt,
      $ZodRecord: Rr,
      $ZodRegistry: li,
      $ZodSet: Zr,
      $ZodString: Rn,
      $ZodStringFormat: Mn,
      $ZodSuccess: to,
      $ZodSymbol: yr,
      $ZodTemplateLiteral: lo,
      $ZodTransform: Hr,
      $ZodTuple: jr,
      $ZodType: zn,
      $ZodULID: Jn,
      $ZodURL: Fn,
      $ZodUUID: Zn,
      $ZodUndefined: br,
      $ZodUnion: Ar,
      $ZodUnknown: kr,
      $ZodVoid: $r,
      $ZodXID: Kn,
      $brand: ke,
      $constructor: we,
      $input: si,
      $output: ai,
      Doc: Dn,
      JSONSchema: Xa,
      JSONSchemaGenerator: Ja,
      NEVER: _e,
      TimePrecision: Di,
      _any: na,
      _array: za,
      _base64: Ai,
      _base64url: Ui,
      _bigint: Ki,
      _boolean: Vi,
      _catch: function (e, t, n) {
        return new e({
          type: "catch",
          innerType: t,
          catchValue: "function" == typeof n ? n : () => n,
        });
      },
      _check: Fa,
      _cidrv4: Oi,
      _cidrv6: Ei,
      _coercedBigint: Gi,
      _coercedBoolean: Ji,
      _coercedDate: sa,
      _coercedNumber: Zi,
      _coercedString: pi,
      _cuid: ki,
      _cuid2: xi,
      _custom: qa,
      _date: aa,
      _default: function (e, t, n) {
        return new e({
          type: "default",
          innerType: t,
          get defaultValue() {
            return "function" == typeof n ? n() : n;
          },
        });
      },
      _discriminatedUnion: function (e, t, n, r) {
        return new e({ type: "union", options: n, discriminator: t, ...He(r) });
      },
      _e164: Ci,
      _email: mi,
      _emoji: _i,
      _endsWith: Oa,
      _enum: function (e, t, n) {
        return new e({
          type: "enum",
          entries: Array.isArray(t)
            ? Object.fromEntries(t.map((e) => [e, e]))
            : t,
          ...He(n),
        });
      },
      _file: Ma,
      _float32: Fi,
      _float64: Bi,
      _gt: da,
      _gte: pa,
      _guid: hi,
      _includes: Ta,
      _int: Li,
      _int32: Wi,
      _int64: Xi,
      _intersection: function (e, t, n) {
        return new e({ type: "intersection", left: t, right: n });
      },
      _ipv4: Ti,
      _ipv6: Ni,
      _isoDate: zi,
      _isoDateTime: ji,
      _isoDuration: Mi,
      _isoTime: Ri,
      _jwt: Pi,
      _ksuid: Si,
      _lazy: function (e, t) {
        return new e({ type: "lazy", getter: t });
      },
      _length: xa,
      _literal: function (e, t, n) {
        return new e({
          type: "literal",
          values: Array.isArray(t) ? t : [t],
          ...He(n),
        });
      },
      _lowercase: Ia,
      _lt: ua,
      _lte: ca,
      _map: function (e, t, n, r) {
        return new e({ type: "map", keyType: t, valueType: n, ...He(r) });
      },
      _max: ca,
      _maxLength: wa,
      _maxSize: ya,
      _mime: Aa,
      _min: pa,
      _minLength: ka,
      _minSize: ba,
      _multipleOf: va,
      _nan: la,
      _nanoid: wi,
      _nativeEnum: function (e, t, n) {
        return new e({ type: "enum", entries: t, ...He(n) });
      },
      _negative: ha,
      _never: oa,
      _nonnegative: fa,
      _nonoptional: function (e, t, n) {
        return new e({ type: "nonoptional", innerType: t, ...He(n) });
      },
      _nonpositive: ga,
      _normalize: Ca,
      _null: ta,
      _nullable: function (e, t) {
        return new e({ type: "nullable", innerType: t });
      },
      _number: qi,
      _optional: function (e, t) {
        return new e({ type: "optional", innerType: t });
      },
      _overwrite: Ua,
      _parse: bt,
      _parseAsync: wt,
      _pipe: function (e, t, n) {
        return new e({ type: "pipe", in: t, out: n });
      },
      _positive: ma,
      _promise: function (e, t) {
        return new e({ type: "promise", innerType: t });
      },
      _property: Ea,
      _readonly: function (e, t) {
        return new e({ type: "readonly", innerType: t });
      },
      _record: function (e, t, n, r) {
        return new e({ type: "record", keyType: t, valueType: n, ...He(r) });
      },
      _refine: Za,
      _regex: $a,
      _safeParse: xt,
      _safeParseAsync: It,
      _set: function (e, t, n) {
        return new e({ type: "set", valueType: t, ...He(n) });
      },
      _size: _a,
      _startsWith: Na,
      _string: di,
      _stringFormat: Wa,
      _stringbool: Ba,
      _success: function (e, t) {
        return new e({ type: "success", innerType: t });
      },
      _superRefine: La,
      _symbol: Qi,
      _templateLiteral: function (e, t, n) {
        return new e({ type: "template_literal", parts: t, ...He(n) });
      },
      _toLowerCase: Da,
      _toUpperCase: ja,
      _transform: function (e, t) {
        return new e({ type: "transform", transform: t });
      },
      _trim: Pa,
      _tuple: Ra,
      _uint32: Hi,
      _uint64: Yi,
      _ulid: $i,
      _undefined: ea,
      _union: function (e, t, n) {
        return new e({ type: "union", options: t, ...He(n) });
      },
      _unknown: ra,
      _uppercase: Sa,
      _url: bi,
      _uuid: gi,
      _uuidv4: fi,
      _uuidv6: vi,
      _uuidv7: yi,
      _void: ia,
      _xid: Ii,
      clone: We,
      config: Ie,
      flattenError: ht,
      formatError: gt,
      function: Va,
      globalConfig: $e,
      globalRegistry: ci,
      isValidBase64: ir,
      isValidBase64URL: sr,
      isValidJWT: cr,
      locales: ii,
      parse: _t,
      parseAsync: kt,
      prettifyError: yt,
      regexes: cn,
      registry: ui,
      safeParse: $t,
      safeParseAsync: St,
      toDotPath: vt,
      toJSONSchema: Ka,
      treeifyError: ft,
      util: ct,
      version: jn,
    });
  const Qa = we("ZodISODateTime", (e, t) => {
    (Xn.init(e, t), bs.init(e, t));
  });
  function es(e) {
    return ji(Qa, e);
  }
  const ts = we("ZodISODate", (e, t) => {
    (Yn.init(e, t), bs.init(e, t));
  });
  function ns(e) {
    return zi(ts, e);
  }
  const rs = we("ZodISOTime", (e, t) => {
    (Qn.init(e, t), bs.init(e, t));
  });
  function os(e) {
    return Ri(rs, e);
  }
  const is = we("ZodISODuration", (e, t) => {
    (er.init(e, t), bs.init(e, t));
  });
  function as(e) {
    return Mi(is, e);
  }
  var ss = Object.freeze({
    __proto__: null,
    ZodISODate: ts,
    ZodISODateTime: Qa,
    ZodISODuration: is,
    ZodISOTime: rs,
    date: ns,
    datetime: es,
    duration: as,
    time: os,
  });
  const ls = (e, t) => {
      (pt.init(e, t),
        (e.name = "ZodError"),
        Object.defineProperties(e, {
          format: { value: (t) => gt(e, t) },
          flatten: { value: (t) => ht(e, t) },
          addIssue: {
            value: (t) => {
              (e.issues.push(t), (e.message = JSON.stringify(e.issues, Ne, 2)));
            },
          },
          addIssues: {
            value: (t) => {
              (e.issues.push(...t),
                (e.message = JSON.stringify(e.issues, Ne, 2)));
            },
          },
          isEmpty: { get: () => 0 === e.issues.length },
        }));
    },
    us = we("ZodError", ls),
    cs = we("ZodError", ls, { Parent: Error }),
    ds = bt(cs),
    ps = wt(cs),
    ms = xt(cs),
    hs = It(cs),
    gs = we(
      "ZodType",
      (e, t) => (
        zn.init(e, t),
        (e.def = t),
        Object.defineProperty(e, "_def", { value: t }),
        (e.check = (...n) =>
          e.clone({
            ...t,
            checks: [
              ...(t.checks ?? []),
              ...n.map((e) =>
                "function" == typeof e
                  ? {
                      _zod: {
                        check: e,
                        def: { check: "custom" },
                        onattach: [],
                      },
                    }
                  : e,
              ),
            ],
          })),
        (e.clone = (t, n) => We(e, t, n)),
        (e.brand = () => e),
        (e.register = (t, n) => (t.add(e, n), e)),
        (e.parse = (t, n) => ds(e, t, n, { callee: e.parse })),
        (e.safeParse = (t, n) => ms(e, t, n)),
        (e.parseAsync = async (t, n) => ps(e, t, n, { callee: e.parseAsync })),
        (e.safeParseAsync = async (t, n) => hs(e, t, n)),
        (e.spa = e.safeParseAsync),
        (e.refine = (t, n) => e.check(Ql(t, n))),
        (e.superRefine = (t) => e.check(eu(t))),
        (e.overwrite = (t) => e.check(Ua(t))),
        (e.optional = () => Al(e)),
        (e.nullable = () => Cl(e)),
        (e.nullish = () => Al(Cl(e))),
        (e.nonoptional = (t) => Ml(e, t)),
        (e.array = () => sl(e)),
        (e.or = (t) => pl([e, t])),
        (e.and = (t) => fl(e, t)),
        (e.transform = (t) => Wl(e, Ol(t))),
        (e.default = (t) => Dl(e, t)),
        (e.prefault = (t) => zl(e, t)),
        (e.catch = (t) => Ll(e, t)),
        (e.pipe = (t) => Wl(e, t)),
        (e.readonly = () => Vl(e)),
        (e.describe = (t) => {
          const n = e.clone();
          return (ci.add(n, { description: t }), n);
        }),
        Object.defineProperty(e, "description", {
          get: () => ci.get(e)?.description,
          configurable: !0,
        }),
        (e.meta = (...t) => {
          if (0 === t.length) return ci.get(e);
          const n = e.clone();
          return (ci.add(n, t[0]), n);
        }),
        (e.isOptional = () => e.safeParse(void 0).success),
        (e.isNullable = () => e.safeParse(null).success),
        e
      ),
    ),
    fs = we("_ZodString", (e, t) => {
      (Rn.init(e, t), gs.init(e, t));
      const n = e._zod.bag;
      ((e.format = n.format ?? null),
        (e.minLength = n.minimum ?? null),
        (e.maxLength = n.maximum ?? null),
        (e.regex = (...t) => e.check($a(...t))),
        (e.includes = (...t) => e.check(Ta(...t))),
        (e.startsWith = (...t) => e.check(Na(...t))),
        (e.endsWith = (...t) => e.check(Oa(...t))),
        (e.min = (...t) => e.check(ka(...t))),
        (e.max = (...t) => e.check(wa(...t))),
        (e.length = (...t) => e.check(xa(...t))),
        (e.nonempty = (...t) => e.check(ka(1, ...t))),
        (e.lowercase = (t) => e.check(Ia(t))),
        (e.uppercase = (t) => e.check(Sa(t))),
        (e.trim = () => e.check(Pa())),
        (e.normalize = (...t) => e.check(Ca(...t))),
        (e.toLowerCase = () => e.check(Da())),
        (e.toUpperCase = () => e.check(ja())));
    }),
    vs = we("ZodString", (e, t) => {
      (Rn.init(e, t),
        fs.init(e, t),
        (e.email = (t) => e.check(mi(_s, t))),
        (e.url = (t) => e.check(bi(xs, t))),
        (e.jwt = (t) => e.check(Pi(Rs, t))),
        (e.emoji = (t) => e.check(_i($s, t))),
        (e.guid = (t) => e.check(hi(ws, t))),
        (e.uuid = (t) => e.check(gi(ks, t))),
        (e.uuidv4 = (t) => e.check(fi(ks, t))),
        (e.uuidv6 = (t) => e.check(vi(ks, t))),
        (e.uuidv7 = (t) => e.check(yi(ks, t))),
        (e.nanoid = (t) => e.check(wi(Is, t))),
        (e.guid = (t) => e.check(hi(ws, t))),
        (e.cuid = (t) => e.check(ki(Ss, t))),
        (e.cuid2 = (t) => e.check(xi(Ts, t))),
        (e.ulid = (t) => e.check($i(Ns, t))),
        (e.base64 = (t) => e.check(Ai(Ds, t))),
        (e.base64url = (t) => e.check(Ui(js, t))),
        (e.xid = (t) => e.check(Ii(Os, t))),
        (e.ksuid = (t) => e.check(Si(Es, t))),
        (e.ipv4 = (t) => e.check(Ti(As, t))),
        (e.ipv6 = (t) => e.check(Ni(Us, t))),
        (e.cidrv4 = (t) => e.check(Oi(Cs, t))),
        (e.cidrv6 = (t) => e.check(Ei(Ps, t))),
        (e.e164 = (t) => e.check(Ci(zs, t))),
        (e.datetime = (t) => e.check(es(t))),
        (e.date = (t) => e.check(ns(t))),
        (e.time = (t) => e.check(os(t))),
        (e.duration = (t) => e.check(as(t))));
    });
  function ys(e) {
    return di(vs, e);
  }
  const bs = we("ZodStringFormat", (e, t) => {
      (Mn.init(e, t), fs.init(e, t));
    }),
    _s = we("ZodEmail", (e, t) => {
      (Ln.init(e, t), bs.init(e, t));
    }),
    ws = we("ZodGUID", (e, t) => {
      (qn.init(e, t), bs.init(e, t));
    }),
    ks = we("ZodUUID", (e, t) => {
      (Zn.init(e, t), bs.init(e, t));
    }),
    xs = we("ZodURL", (e, t) => {
      (Fn.init(e, t), bs.init(e, t));
    }),
    $s = we("ZodEmoji", (e, t) => {
      (Bn.init(e, t), bs.init(e, t));
    }),
    Is = we("ZodNanoID", (e, t) => {
      (Wn.init(e, t), bs.init(e, t));
    }),
    Ss = we("ZodCUID", (e, t) => {
      (Hn.init(e, t), bs.init(e, t));
    }),
    Ts = we("ZodCUID2", (e, t) => {
      (Vn.init(e, t), bs.init(e, t));
    }),
    Ns = we("ZodULID", (e, t) => {
      (Jn.init(e, t), bs.init(e, t));
    }),
    Os = we("ZodXID", (e, t) => {
      (Kn.init(e, t), bs.init(e, t));
    }),
    Es = we("ZodKSUID", (e, t) => {
      (Gn.init(e, t), bs.init(e, t));
    }),
    As = we("ZodIPv4", (e, t) => {
      (tr.init(e, t), bs.init(e, t));
    }),
    Us = we("ZodIPv6", (e, t) => {
      (nr.init(e, t), bs.init(e, t));
    }),
    Cs = we("ZodCIDRv4", (e, t) => {
      (rr.init(e, t), bs.init(e, t));
    }),
    Ps = we("ZodCIDRv6", (e, t) => {
      (or.init(e, t), bs.init(e, t));
    }),
    Ds = we("ZodBase64", (e, t) => {
      (ar.init(e, t), bs.init(e, t));
    }),
    js = we("ZodBase64URL", (e, t) => {
      (lr.init(e, t), bs.init(e, t));
    }),
    zs = we("ZodE164", (e, t) => {
      (ur.init(e, t), bs.init(e, t));
    }),
    Rs = we("ZodJWT", (e, t) => {
      (dr.init(e, t), bs.init(e, t));
    }),
    Ms = we("ZodCustomStringFormat", (e, t) => {
      (pr.init(e, t), bs.init(e, t));
    }),
    qs = we("ZodNumber", (e, t) => {
      (mr.init(e, t),
        gs.init(e, t),
        (e.gt = (t, n) => e.check(da(t, n))),
        (e.gte = (t, n) => e.check(pa(t, n))),
        (e.min = (t, n) => e.check(pa(t, n))),
        (e.lt = (t, n) => e.check(ua(t, n))),
        (e.lte = (t, n) => e.check(ca(t, n))),
        (e.max = (t, n) => e.check(ca(t, n))),
        (e.int = (t) => e.check(Fs(t))),
        (e.safe = (t) => e.check(Fs(t))),
        (e.positive = (t) => e.check(da(0, t))),
        (e.nonnegative = (t) => e.check(pa(0, t))),
        (e.negative = (t) => e.check(ua(0, t))),
        (e.nonpositive = (t) => e.check(ca(0, t))),
        (e.multipleOf = (t, n) => e.check(va(t, n))),
        (e.step = (t, n) => e.check(va(t, n))),
        (e.finite = () => e));
      const n = e._zod.bag;
      ((e.minValue =
        Math.max(
          n.minimum ?? Number.NEGATIVE_INFINITY,
          n.exclusiveMinimum ?? Number.NEGATIVE_INFINITY,
        ) ?? null),
        (e.maxValue =
          Math.min(
            n.maximum ?? Number.POSITIVE_INFINITY,
            n.exclusiveMaximum ?? Number.POSITIVE_INFINITY,
          ) ?? null),
        (e.isInt =
          (n.format ?? "").includes("int") ||
          Number.isSafeInteger(n.multipleOf ?? 0.5)),
        (e.isFinite = !0),
        (e.format = n.format ?? null));
    });
  function Zs(e) {
    return qi(qs, e);
  }
  const Ls = we("ZodNumberFormat", (e, t) => {
    (hr.init(e, t), qs.init(e, t));
  });
  function Fs(e) {
    return Li(Ls, e);
  }
  const Bs = we("ZodBoolean", (e, t) => {
    (gr.init(e, t), gs.init(e, t));
  });
  function Ws(e) {
    return Vi(Bs, e);
  }
  const Hs = we("ZodBigInt", (e, t) => {
      (fr.init(e, t),
        gs.init(e, t),
        (e.gte = (t, n) => e.check(pa(t, n))),
        (e.min = (t, n) => e.check(pa(t, n))),
        (e.gt = (t, n) => e.check(da(t, n))),
        (e.gte = (t, n) => e.check(pa(t, n))),
        (e.min = (t, n) => e.check(pa(t, n))),
        (e.lt = (t, n) => e.check(ua(t, n))),
        (e.lte = (t, n) => e.check(ca(t, n))),
        (e.max = (t, n) => e.check(ca(t, n))),
        (e.positive = (t) => e.check(da(BigInt(0), t))),
        (e.negative = (t) => e.check(ua(BigInt(0), t))),
        (e.nonpositive = (t) => e.check(ca(BigInt(0), t))),
        (e.nonnegative = (t) => e.check(pa(BigInt(0), t))),
        (e.multipleOf = (t, n) => e.check(va(t, n))));
      const n = e._zod.bag;
      ((e.minValue = n.minimum ?? null),
        (e.maxValue = n.maximum ?? null),
        (e.format = n.format ?? null));
    }),
    Vs = we("ZodBigIntFormat", (e, t) => {
      (vr.init(e, t), Hs.init(e, t));
    }),
    Js = we("ZodSymbol", (e, t) => {
      (yr.init(e, t), gs.init(e, t));
    }),
    Ks = we("ZodUndefined", (e, t) => {
      (br.init(e, t), gs.init(e, t));
    }),
    Gs = we("ZodNull", (e, t) => {
      (_r.init(e, t), gs.init(e, t));
    });
  function Xs(e) {
    return ta(Gs, e);
  }
  const Ys = we("ZodAny", (e, t) => {
    (wr.init(e, t), gs.init(e, t));
  });
  function Qs() {
    return na(Ys);
  }
  const el = we("ZodUnknown", (e, t) => {
    (kr.init(e, t), gs.init(e, t));
  });
  function tl() {
    return ra(el);
  }
  const nl = we("ZodNever", (e, t) => {
    (xr.init(e, t), gs.init(e, t));
  });
  function rl(e) {
    return oa(nl, e);
  }
  const ol = we("ZodVoid", (e, t) => {
      ($r.init(e, t), gs.init(e, t));
    }),
    il = we("ZodDate", (e, t) => {
      (Ir.init(e, t),
        gs.init(e, t),
        (e.min = (t, n) => e.check(pa(t, n))),
        (e.max = (t, n) => e.check(ca(t, n))));
      const n = e._zod.bag;
      ((e.minDate = n.minimum ? new Date(n.minimum) : null),
        (e.maxDate = n.maximum ? new Date(n.maximum) : null));
    }),
    al = we("ZodArray", (e, t) => {
      (Tr.init(e, t),
        gs.init(e, t),
        (e.element = t.element),
        (e.min = (t, n) => e.check(ka(t, n))),
        (e.nonempty = (t) => e.check(ka(1, t))),
        (e.max = (t, n) => e.check(wa(t, n))),
        (e.length = (t, n) => e.check(xa(t, n))),
        (e.unwrap = () => e.element));
    });
  function sl(e, t) {
    return za(al, e, t);
  }
  const ll = we("ZodObject", (e, t) => {
    (Or.init(e, t),
      gs.init(e, t),
      Pe(e, "shape", () => t.shape),
      (e.keyof = () => $l(Object.keys(e._zod.def.shape))),
      (e.catchall = (t) => e.clone({ ...e._zod.def, catchall: t })),
      (e.passthrough = () => e.clone({ ...e._zod.def, catchall: tl() })),
      (e.loose = () => e.clone({ ...e._zod.def, catchall: tl() })),
      (e.strict = () => e.clone({ ...e._zod.def, catchall: rl() })),
      (e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 })),
      (e.extend = (t) => Qe(e, t)),
      (e.merge = (t) => et(e, t)),
      (e.pick = (t) => Xe(e, t)),
      (e.omit = (t) => Ye(e, t)),
      (e.partial = (...t) => tt(El, e, t[0])),
      (e.required = (...t) => nt(Rl, e, t[0])));
  });
  function ul(e, t) {
    const n = {
      type: "object",
      get shape() {
        return (De(this, "shape", { ...e }), this.shape);
      },
      ...He(t),
    };
    return new ll(n);
  }
  function cl(e, t) {
    return new ll({
      type: "object",
      get shape() {
        return (De(this, "shape", { ...e }), this.shape);
      },
      catchall: tl(),
      ...He(t),
    });
  }
  const dl = we("ZodUnion", (e, t) => {
    (Ar.init(e, t), gs.init(e, t), (e.options = t.options));
  });
  function pl(e, t) {
    return new dl({ type: "union", options: e, ...He(t) });
  }
  const ml = we("ZodDiscriminatedUnion", (e, t) => {
    (dl.init(e, t), Ur.init(e, t));
  });
  function hl(e, t, n) {
    return new ml({ type: "union", options: t, discriminator: e, ...He(n) });
  }
  const gl = we("ZodIntersection", (e, t) => {
    (Cr.init(e, t), gs.init(e, t));
  });
  function fl(e, t) {
    return new gl({ type: "intersection", left: e, right: t });
  }
  const vl = we("ZodTuple", (e, t) => {
    (jr.init(e, t),
      gs.init(e, t),
      (e.rest = (t) => e.clone({ ...e._zod.def, rest: t })));
  });
  function yl(e, t, n) {
    const r = t instanceof zn;
    return new vl({
      type: "tuple",
      items: e,
      rest: r ? t : null,
      ...He(r ? n : t),
    });
  }
  const bl = we("ZodRecord", (e, t) => {
    (Rr.init(e, t),
      gs.init(e, t),
      (e.keyType = t.keyType),
      (e.valueType = t.valueType));
  });
  function _l(e, t, n) {
    return new bl({ type: "record", keyType: e, valueType: t, ...He(n) });
  }
  const wl = we("ZodMap", (e, t) => {
      (Mr.init(e, t),
        gs.init(e, t),
        (e.keyType = t.keyType),
        (e.valueType = t.valueType));
    }),
    kl = we("ZodSet", (e, t) => {
      (Zr.init(e, t),
        gs.init(e, t),
        (e.min = (...t) => e.check(ba(...t))),
        (e.nonempty = (t) => e.check(ba(1, t))),
        (e.max = (...t) => e.check(ya(...t))),
        (e.size = (...t) => e.check(_a(...t))));
    }),
    xl = we("ZodEnum", (e, t) => {
      (Fr.init(e, t),
        gs.init(e, t),
        (e.enum = t.entries),
        (e.options = Object.values(t.entries)));
      const n = new Set(Object.keys(t.entries));
      ((e.extract = (e, r) => {
        const o = {};
        for (const r of e) {
          if (!n.has(r)) throw new Error(`Key ${r} not found in enum`);
          o[r] = t.entries[r];
        }
        return new xl({ ...t, checks: [], ...He(r), entries: o });
      }),
        (e.exclude = (e, r) => {
          const o = { ...t.entries };
          for (const t of e) {
            if (!n.has(t)) throw new Error(`Key ${t} not found in enum`);
            delete o[t];
          }
          return new xl({ ...t, checks: [], ...He(r), entries: o });
        }));
    });
  function $l(e, t) {
    const n = Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e;
    return new xl({ type: "enum", entries: n, ...He(t) });
  }
  const Il = we("ZodLiteral", (e, t) => {
    (Br.init(e, t),
      gs.init(e, t),
      (e.values = new Set(t.values)),
      Object.defineProperty(e, "value", {
        get() {
          if (t.values.length > 1)
            throw new Error(
              "This schema contains multiple valid literal values. Use `.values` instead.",
            );
          return t.values[0];
        },
      }));
  });
  function Sl(e, t) {
    return new Il({
      type: "literal",
      values: Array.isArray(e) ? e : [e],
      ...He(t),
    });
  }
  const Tl = we("ZodFile", (e, t) => {
      (Wr.init(e, t),
        gs.init(e, t),
        (e.min = (t, n) => e.check(ba(t, n))),
        (e.max = (t, n) => e.check(ya(t, n))),
        (e.mime = (t, n) => e.check(Aa(Array.isArray(t) ? t : [t], n))));
    }),
    Nl = we("ZodTransform", (e, t) => {
      (Hr.init(e, t),
        gs.init(e, t),
        (e._zod.parse = (n, r) => {
          n.addIssue = (r) => {
            if ("string" == typeof r) n.issues.push(ut(r, n.value, t));
            else {
              const t = r;
              (t.fatal && (t.continue = !1),
                t.code ?? (t.code = "custom"),
                t.input ?? (t.input = n.value),
                t.inst ?? (t.inst = e),
                n.issues.push(ut(t)));
            }
          };
          const o = t.transform(n.value, n);
          return o instanceof Promise
            ? o.then((e) => ((n.value = e), n))
            : ((n.value = o), n);
        }));
    });
  function Ol(e) {
    return new Nl({ type: "transform", transform: e });
  }
  const El = we("ZodOptional", (e, t) => {
    (Jr.init(e, t), gs.init(e, t), (e.unwrap = () => e._zod.def.innerType));
  });
  function Al(e) {
    return new El({ type: "optional", innerType: e });
  }
  const Ul = we("ZodNullable", (e, t) => {
    (Kr.init(e, t), gs.init(e, t), (e.unwrap = () => e._zod.def.innerType));
  });
  function Cl(e) {
    return new Ul({ type: "nullable", innerType: e });
  }
  const Pl = we("ZodDefault", (e, t) => {
    (Gr.init(e, t),
      gs.init(e, t),
      (e.unwrap = () => e._zod.def.innerType),
      (e.removeDefault = e.unwrap));
  });
  function Dl(e, t) {
    return new Pl({
      type: "default",
      innerType: e,
      get defaultValue() {
        return "function" == typeof t ? t() : t;
      },
    });
  }
  const jl = we("ZodPrefault", (e, t) => {
    (Yr.init(e, t), gs.init(e, t), (e.unwrap = () => e._zod.def.innerType));
  });
  function zl(e, t) {
    return new jl({
      type: "prefault",
      innerType: e,
      get defaultValue() {
        return "function" == typeof t ? t() : t;
      },
    });
  }
  const Rl = we("ZodNonOptional", (e, t) => {
    (Qr.init(e, t), gs.init(e, t), (e.unwrap = () => e._zod.def.innerType));
  });
  function Ml(e, t) {
    return new Rl({ type: "nonoptional", innerType: e, ...He(t) });
  }
  const ql = we("ZodSuccess", (e, t) => {
      (to.init(e, t), gs.init(e, t), (e.unwrap = () => e._zod.def.innerType));
    }),
    Zl = we("ZodCatch", (e, t) => {
      (no.init(e, t),
        gs.init(e, t),
        (e.unwrap = () => e._zod.def.innerType),
        (e.removeCatch = e.unwrap));
    });
  function Ll(e, t) {
    return new Zl({
      type: "catch",
      innerType: e,
      catchValue: "function" == typeof t ? t : () => t,
    });
  }
  const Fl = we("ZodNaN", (e, t) => {
      (ro.init(e, t), gs.init(e, t));
    }),
    Bl = we("ZodPipe", (e, t) => {
      (oo.init(e, t), gs.init(e, t), (e.in = t.in), (e.out = t.out));
    });
  function Wl(e, t) {
    return new Bl({ type: "pipe", in: e, out: t });
  }
  const Hl = we("ZodReadonly", (e, t) => {
    (ao.init(e, t), gs.init(e, t), (e.unwrap = () => e._zod.def.innerType));
  });
  function Vl(e) {
    return new Hl({ type: "readonly", innerType: e });
  }
  const Jl = we("ZodTemplateLiteral", (e, t) => {
      (lo.init(e, t), gs.init(e, t));
    }),
    Kl = we("ZodLazy", (e, t) => {
      (co.init(e, t), gs.init(e, t), (e.unwrap = () => e._zod.def.getter()));
    });
  function Gl(e) {
    return new Kl({ type: "lazy", getter: e });
  }
  const Xl = we("ZodPromise", (e, t) => {
      (uo.init(e, t), gs.init(e, t), (e.unwrap = () => e._zod.def.innerType));
    }),
    Yl = we("ZodCustom", (e, t) => {
      (po.init(e, t), gs.init(e, t));
    });
  function Ql(e, t = {}) {
    return Za(Yl, e, t);
  }
  function eu(e) {
    return La(e);
  }
  var tu;
  function nu(e) {
    return Zi(qs, e);
  }
  tu || (tu = {});
  var ru = Object.freeze({
    __proto__: null,
    bigint: function (e) {
      return Gi(Hs, e);
    },
    boolean: function (e) {
      return Ji(Bs, e);
    },
    date: function (e) {
      return sa(il, e);
    },
    number: nu,
    string: function (e) {
      return pi(vs, e);
    },
  });
  Ie(xo());
  var ou = Object.freeze({
    __proto__: null,
    $brand: ke,
    $input: si,
    $output: ai,
    NEVER: _e,
    TimePrecision: Di,
    ZodAny: Ys,
    ZodArray: al,
    ZodBase64: Ds,
    ZodBase64URL: js,
    ZodBigInt: Hs,
    ZodBigIntFormat: Vs,
    ZodBoolean: Bs,
    ZodCIDRv4: Cs,
    ZodCIDRv6: Ps,
    ZodCUID: Ss,
    ZodCUID2: Ts,
    ZodCatch: Zl,
    ZodCustom: Yl,
    ZodCustomStringFormat: Ms,
    ZodDate: il,
    ZodDefault: Pl,
    ZodDiscriminatedUnion: ml,
    ZodE164: zs,
    ZodEmail: _s,
    ZodEmoji: $s,
    ZodEnum: xl,
    ZodError: us,
    ZodFile: Tl,
    get ZodFirstPartyTypeKind() {
      return tu;
    },
    ZodGUID: ws,
    ZodIPv4: As,
    ZodIPv6: Us,
    ZodISODate: ts,
    ZodISODateTime: Qa,
    ZodISODuration: is,
    ZodISOTime: rs,
    ZodIntersection: gl,
    ZodIssueCode: {
      invalid_type: "invalid_type",
      too_big: "too_big",
      too_small: "too_small",
      invalid_format: "invalid_format",
      not_multiple_of: "not_multiple_of",
      unrecognized_keys: "unrecognized_keys",
      invalid_union: "invalid_union",
      invalid_key: "invalid_key",
      invalid_element: "invalid_element",
      invalid_value: "invalid_value",
      custom: "custom",
    },
    ZodJWT: Rs,
    ZodKSUID: Es,
    ZodLazy: Kl,
    ZodLiteral: Il,
    ZodMap: wl,
    ZodNaN: Fl,
    ZodNanoID: Is,
    ZodNever: nl,
    ZodNonOptional: Rl,
    ZodNull: Gs,
    ZodNullable: Ul,
    ZodNumber: qs,
    ZodNumberFormat: Ls,
    ZodObject: ll,
    ZodOptional: El,
    ZodPipe: Bl,
    ZodPrefault: jl,
    ZodPromise: Xl,
    ZodReadonly: Hl,
    ZodRealError: cs,
    ZodRecord: bl,
    ZodSet: kl,
    ZodString: vs,
    ZodStringFormat: bs,
    ZodSuccess: ql,
    ZodSymbol: Js,
    ZodTemplateLiteral: Jl,
    ZodTransform: Nl,
    ZodTuple: vl,
    ZodType: gs,
    ZodULID: Ns,
    ZodURL: xs,
    ZodUUID: ks,
    ZodUndefined: Ks,
    ZodUnion: dl,
    ZodUnknown: el,
    ZodVoid: ol,
    ZodXID: Os,
    _ZodString: fs,
    _default: Dl,
    any: Qs,
    array: sl,
    base64: function (e) {
      return Ai(Ds, e);
    },
    base64url: function (e) {
      return Ui(js, e);
    },
    bigint: function (e) {
      return Ki(Hs, e);
    },
    boolean: Ws,
    catch: Ll,
    check: function (e) {
      const t = new dn({ check: "custom" });
      return ((t._zod.check = e), t);
    },
    cidrv4: function (e) {
      return Oi(Cs, e);
    },
    cidrv6: function (e) {
      return Ei(Ps, e);
    },
    clone: We,
    coerce: ru,
    config: Ie,
    core: Ya,
    cuid: function (e) {
      return ki(Ss, e);
    },
    cuid2: function (e) {
      return xi(Ts, e);
    },
    custom: function (e, t) {
      return qa(Yl, e ?? (() => !0), t);
    },
    date: function (e) {
      return aa(il, e);
    },
    discriminatedUnion: hl,
    e164: function (e) {
      return Ci(zs, e);
    },
    email: function (e) {
      return mi(_s, e);
    },
    emoji: function (e) {
      return _i($s, e);
    },
    endsWith: Oa,
    enum: $l,
    file: function (e) {
      return Ma(Tl, e);
    },
    flattenError: ht,
    float32: function (e) {
      return Fi(Ls, e);
    },
    float64: function (e) {
      return Bi(Ls, e);
    },
    formatError: gt,
    function: Va,
    getErrorMap: function () {
      return Ie().customError;
    },
    globalRegistry: ci,
    gt: da,
    gte: pa,
    guid: function (e) {
      return hi(ws, e);
    },
    hostname: function (e) {
      return Wa(Ms, "hostname", Vt, e);
    },
    includes: Ta,
    instanceof: function (e, t = { error: `Input not instance of ${e.name}` }) {
      const n = new Yl({
        type: "custom",
        check: "custom",
        fn: (t) => t instanceof e,
        abort: !0,
        ...He(t),
      });
      return ((n._zod.bag.Class = e), n);
    },
    int: Fs,
    int32: function (e) {
      return Wi(Ls, e);
    },
    int64: function (e) {
      return Xi(Vs, e);
    },
    intersection: fl,
    ipv4: function (e) {
      return Ti(As, e);
    },
    ipv6: function (e) {
      return Ni(Us, e);
    },
    iso: ss,
    json: function (e) {
      const t = Gl(() => pl([ys(e), Zs(), Ws(), Xs(), sl(t), _l(ys(), t)]));
      return t;
    },
    jwt: function (e) {
      return Pi(Rs, e);
    },
    keyof: function (e) {
      const t = e._zod.def.shape;
      return Sl(Object.keys(t));
    },
    ksuid: function (e) {
      return Si(Es, e);
    },
    lazy: Gl,
    length: xa,
    literal: Sl,
    locales: ii,
    looseObject: cl,
    lowercase: Ia,
    lt: ua,
    lte: ca,
    map: function (e, t, n) {
      return new wl({ type: "map", keyType: e, valueType: t, ...He(n) });
    },
    maxLength: wa,
    maxSize: ya,
    mime: Aa,
    minLength: ka,
    minSize: ba,
    multipleOf: va,
    nan: function (e) {
      return la(Fl, e);
    },
    nanoid: function (e) {
      return wi(Is, e);
    },
    nativeEnum: function (e, t) {
      return new xl({ type: "enum", entries: e, ...He(t) });
    },
    negative: ha,
    never: rl,
    nonnegative: fa,
    nonoptional: Ml,
    nonpositive: ga,
    normalize: Ca,
    null: Xs,
    nullable: Cl,
    nullish: function (e) {
      return Al(Cl(e));
    },
    number: Zs,
    object: ul,
    optional: Al,
    overwrite: Ua,
    parse: ds,
    parseAsync: ps,
    partialRecord: function (e, t, n) {
      const r = We(e);
      return (
        (r._zod.values = void 0),
        new bl({ type: "record", keyType: r, valueType: t, ...He(n) })
      );
    },
    pipe: Wl,
    positive: ma,
    prefault: zl,
    preprocess: function (e, t) {
      return Wl(Ol(e), t);
    },
    prettifyError: yt,
    promise: function (e) {
      return new Xl({ type: "promise", innerType: e });
    },
    property: Ea,
    readonly: Vl,
    record: _l,
    refine: Ql,
    regex: $a,
    regexes: cn,
    registry: ui,
    safeParse: ms,
    safeParseAsync: hs,
    set: function (e, t) {
      return new kl({ type: "set", valueType: e, ...He(t) });
    },
    setErrorMap: function (e) {
      Ie({ customError: e });
    },
    size: _a,
    startsWith: Na,
    strictObject: function (e, t) {
      return new ll({
        type: "object",
        get shape() {
          return (De(this, "shape", { ...e }), this.shape);
        },
        catchall: rl(),
        ...He(t),
      });
    },
    string: ys,
    stringFormat: function (e, t, n = {}) {
      return Wa(Ms, e, t, n);
    },
    stringbool: (...e) =>
      Ba({ Pipe: Bl, Boolean: Bs, String: vs, Transform: Nl }, ...e),
    success: function (e) {
      return new ql({ type: "success", innerType: e });
    },
    superRefine: eu,
    symbol: function (e) {
      return Qi(Js, e);
    },
    templateLiteral: function (e, t) {
      return new Jl({ type: "template_literal", parts: e, ...He(t) });
    },
    toJSONSchema: Ka,
    toLowerCase: Da,
    toUpperCase: ja,
    transform: Ol,
    treeifyError: ft,
    trim: Pa,
    tuple: yl,
    uint32: function (e) {
      return Hi(Ls, e);
    },
    uint64: function (e) {
      return Yi(Vs, e);
    },
    ulid: function (e) {
      return $i(Ns, e);
    },
    undefined: function (e) {
      return ea(Ks, e);
    },
    union: pl,
    unknown: tl,
    uppercase: Sa,
    url: function (e) {
      return bi(xs, e);
    },
    uuid: function (e) {
      return gi(ks, e);
    },
    uuidv4: function (e) {
      return fi(ks, e);
    },
    uuidv6: function (e) {
      return vi(ks, e);
    },
    uuidv7: function (e) {
      return yi(ks, e);
    },
    void: function (e) {
      return ia(ol, e);
    },
    xid: function (e) {
      return Ii(Os, e);
    },
  });
  const iu = Symbol("Let zodToJsonSchema decide on which parser to use"),
    au = {
      name: void 0,
      $refStrategy: "root",
      basePath: ["#"],
      effectStrategy: "input",
      pipeStrategy: "all",
      dateStrategy: "format:date-time",
      mapStrategy: "entries",
      removeAdditionalStrategy: "passthrough",
      allowedAdditionalProperties: !0,
      rejectedAdditionalProperties: !1,
      definitionPath: "definitions",
      target: "jsonSchema7",
      strictUnions: !1,
      definitions: {},
      errorMessages: !1,
      markdownDescription: !1,
      patternStrategy: "escape",
      applyRegexFlags: !1,
      emailStrategy: "format:email",
      base64Strategy: "contentEncoding:base64",
      nameStrategy: "ref",
    };
  function su(e, t, n, r) {
    r?.errorMessages && n && (e.errorMessage = { ...e.errorMessage, [t]: n });
  }
  function lu(e, t, n, r, o) {
    ((e[t] = n), su(e, t, r, o));
  }
  function uu(e, t) {
    return Pu(e.type._def, t);
  }
  function cu(e, t, n) {
    const r = n ?? t.dateStrategy;
    if (Array.isArray(r)) return { anyOf: r.map((n, r) => cu(e, t, n)) };
    switch (r) {
      case "string":
      case "format:date-time":
        return { type: "string", format: "date-time" };
      case "format:date":
        return { type: "string", format: "date" };
      case "integer":
        return du(e, t);
    }
  }
  const du = (e, t) => {
    const n = { type: "integer", format: "unix-time" };
    if ("openApi3" === t.target) return n;
    for (const r of e.checks)
      switch (r.kind) {
        case "min":
          lu(n, "minimum", r.value, r.message, t);
          break;
        case "max":
          lu(n, "maximum", r.value, r.message, t);
      }
    return n;
  };
  let pu;
  const mu = /^[cC][^\s-]{8,}$/,
    hu = /^[0-9a-z]+$/,
    gu = /^[0-9A-HJKMNP-TV-Z]{26}$/,
    fu =
      /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
    vu =
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
    yu =
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    bu = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    _u =
      /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
    wu = /^[a-zA-Z0-9_-]{21}$/,
    ku = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
  function xu(e, t) {
    const n = { type: "string" };
    if (e.checks)
      for (const r of e.checks)
        switch (r.kind) {
          case "min":
            lu(
              n,
              "minLength",
              "number" == typeof n.minLength
                ? Math.max(n.minLength, r.value)
                : r.value,
              r.message,
              t,
            );
            break;
          case "max":
            lu(
              n,
              "maxLength",
              "number" == typeof n.maxLength
                ? Math.min(n.maxLength, r.value)
                : r.value,
              r.message,
              t,
            );
            break;
          case "email":
            switch (t.emailStrategy) {
              case "format:email":
                Su(n, "email", r.message, t);
                break;
              case "format:idn-email":
                Su(n, "idn-email", r.message, t);
                break;
              case "pattern:zod":
                Tu(n, fu, r.message, t);
            }
            break;
          case "url":
            Su(n, "uri", r.message, t);
            break;
          case "uuid":
            Su(n, "uuid", r.message, t);
            break;
          case "regex":
            Tu(n, r.regex, r.message, t);
            break;
          case "cuid":
            Tu(n, mu, r.message, t);
            break;
          case "cuid2":
            Tu(n, hu, r.message, t);
            break;
          case "startsWith":
            Tu(n, RegExp(`^${$u(r.value, t)}`), r.message, t);
            break;
          case "endsWith":
            Tu(n, RegExp(`${$u(r.value, t)}$`), r.message, t);
            break;
          case "datetime":
            Su(n, "date-time", r.message, t);
            break;
          case "date":
            Su(n, "date", r.message, t);
            break;
          case "time":
            Su(n, "time", r.message, t);
            break;
          case "duration":
            Su(n, "duration", r.message, t);
            break;
          case "length":
            (lu(
              n,
              "minLength",
              "number" == typeof n.minLength
                ? Math.max(n.minLength, r.value)
                : r.value,
              r.message,
              t,
            ),
              lu(
                n,
                "maxLength",
                "number" == typeof n.maxLength
                  ? Math.min(n.maxLength, r.value)
                  : r.value,
                r.message,
                t,
              ));
            break;
          case "includes":
            Tu(n, RegExp($u(r.value, t)), r.message, t);
            break;
          case "ip":
            ("v6" !== r.version && Su(n, "ipv4", r.message, t),
              "v4" !== r.version && Su(n, "ipv6", r.message, t));
            break;
          case "base64url":
            Tu(n, _u, r.message, t);
            break;
          case "jwt":
            Tu(n, ku, r.message, t);
            break;
          case "cidr":
            ("v6" !== r.version && Tu(n, vu, r.message, t),
              "v4" !== r.version && Tu(n, yu, r.message, t));
            break;
          case "emoji":
            Tu(
              n,
              (void 0 === pu &&
                (pu = RegExp(
                  "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
                  "u",
                )),
              pu),
              r.message,
              t,
            );
            break;
          case "ulid":
            Tu(n, gu, r.message, t);
            break;
          case "base64":
            switch (t.base64Strategy) {
              case "format:binary":
                Su(n, "binary", r.message, t);
                break;
              case "contentEncoding:base64":
                lu(n, "contentEncoding", "base64", r.message, t);
                break;
              case "pattern:zod":
                Tu(n, bu, r.message, t);
            }
            break;
          case "nanoid":
            Tu(n, wu, r.message, t);
        }
    return n;
  }
  function $u(e, t) {
    return "escape" === t.patternStrategy
      ? (function (e) {
          let t = "";
          for (let n = 0; n < e.length; n++)
            (Iu.has(e[n]) || (t += "\\"), (t += e[n]));
          return t;
        })(e)
      : e;
  }
  const Iu = new Set(
    "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789",
  );
  function Su(e, t, n, r) {
    e.format || e.anyOf?.some((e) => e.format)
      ? (e.anyOf || (e.anyOf = []),
        e.format &&
          (e.anyOf.push({
            format: e.format,
            ...(e.errorMessage &&
              r.errorMessages && {
                errorMessage: { format: e.errorMessage.format },
              }),
          }),
          delete e.format,
          e.errorMessage &&
            (delete e.errorMessage.format,
            0 === Object.keys(e.errorMessage).length && delete e.errorMessage)),
        e.anyOf.push({
          format: t,
          ...(n && r.errorMessages && { errorMessage: { format: n } }),
        }))
      : lu(e, "format", t, n, r);
  }
  function Tu(e, t, n, r) {
    e.pattern || e.allOf?.some((e) => e.pattern)
      ? (e.allOf || (e.allOf = []),
        e.pattern &&
          (e.allOf.push({
            pattern: e.pattern,
            ...(e.errorMessage &&
              r.errorMessages && {
                errorMessage: { pattern: e.errorMessage.pattern },
              }),
          }),
          delete e.pattern,
          e.errorMessage &&
            (delete e.errorMessage.pattern,
            0 === Object.keys(e.errorMessage).length && delete e.errorMessage)),
        e.allOf.push({
          pattern: Nu(t, r),
          ...(n && r.errorMessages && { errorMessage: { pattern: n } }),
        }))
      : lu(e, "pattern", Nu(t, r), n, r);
  }
  function Nu(e, t) {
    if (!t.applyRegexFlags || !e.flags) return e.source;
    const n = e.flags.includes("i"),
      r = e.flags.includes("m"),
      o = e.flags.includes("s"),
      i = n ? e.source.toLowerCase() : e.source;
    let a = "",
      s = !1,
      l = !1,
      u = !1;
    for (let e = 0; e < i.length; e++)
      if (s) ((a += i[e]), (s = !1));
      else {
        if (n)
          if (l) {
            if (i[e].match(/[a-z]/)) {
              u
                ? ((a += i[e]),
                  (a += `${i[e - 2]}-${i[e]}`.toUpperCase()),
                  (u = !1))
                : "-" === i[e + 1] && i[e + 2]?.match(/[a-z]/)
                  ? ((a += i[e]), (u = !0))
                  : (a += `${i[e]}${i[e].toUpperCase()}`);
              continue;
            }
          } else if (i[e].match(/[a-z]/)) {
            a += `[${i[e]}${i[e].toUpperCase()}]`;
            continue;
          }
        if (r) {
          if ("^" === i[e]) {
            a += "(^|(?<=[\r\n]))";
            continue;
          }
          if ("$" === i[e]) {
            a += "($|(?=[\r\n]))";
            continue;
          }
        }
        o && "." === i[e]
          ? (a += l ? `${i[e]}\r\n` : `[${i[e]}\r\n]`)
          : ((a += i[e]),
            "\\" === i[e]
              ? (s = !0)
              : l && "]" === i[e]
                ? (l = !1)
                : l || "[" !== i[e] || (l = !0));
      }
    try {
      new RegExp(a);
    } catch {
      return (
        console.warn(
          `Could not convert regex pattern at ${t.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`,
        ),
        e.source
      );
    }
    return a;
  }
  function Ou(e, t) {
    if (
      ("openAi" === t.target &&
        console.warn(
          "Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.",
        ),
      "openApi3" === t.target && e.keyType?._def.typeName === tu.ZodEnum)
    )
      return {
        type: "object",
        required: e.keyType._def.values,
        properties: e.keyType._def.values.reduce(
          (n, r) => ({
            ...n,
            [r]:
              Pu(e.valueType._def, {
                ...t,
                currentPath: [...t.currentPath, "properties", r],
              }) ?? {},
          }),
          {},
        ),
        additionalProperties: t.rejectedAdditionalProperties,
      };
    const n = {
      type: "object",
      additionalProperties:
        Pu(e.valueType._def, {
          ...t,
          currentPath: [...t.currentPath, "additionalProperties"],
        }) ?? t.allowedAdditionalProperties,
    };
    if ("openApi3" === t.target) return n;
    if (
      e.keyType?._def.typeName === tu.ZodString &&
      e.keyType._def.checks?.length
    ) {
      const { type: r, ...o } = xu(e.keyType._def, t);
      return { ...n, propertyNames: o };
    }
    if (e.keyType?._def.typeName === tu.ZodEnum)
      return { ...n, propertyNames: { enum: e.keyType._def.values } };
    if (
      e.keyType?._def.typeName === tu.ZodBranded &&
      e.keyType._def.type._def.typeName === tu.ZodString &&
      e.keyType._def.type._def.checks?.length
    ) {
      const { type: r, ...o } = uu(e.keyType._def, t);
      return { ...n, propertyNames: o };
    }
    return n;
  }
  const Eu = {
      ZodString: "string",
      ZodNumber: "number",
      ZodBigInt: "integer",
      ZodBoolean: "boolean",
      ZodNull: "null",
    },
    Au = (e, t) => {
      const n = (
        e.options instanceof Map ? Array.from(e.options.values()) : e.options
      )
        .map((e, n) =>
          Pu(e._def, {
            ...t,
            currentPath: [...t.currentPath, "anyOf", `${n}`],
          }),
        )
        .filter(
          (e) =>
            !!e &&
            (!t.strictUnions ||
              ("object" == typeof e && Object.keys(e).length > 0)),
        );
      return n.length ? { anyOf: n } : void 0;
    };
  function Uu(e) {
    try {
      return e.isOptional();
    } catch {
      return !0;
    }
  }
  const Cu = (e, t, n) => {
    switch (t) {
      case tu.ZodString:
        return xu(e, n);
      case tu.ZodNumber:
        return (function (e, t) {
          const n = { type: "number" };
          if (!e.checks) return n;
          for (const r of e.checks)
            switch (r.kind) {
              case "int":
                ((n.type = "integer"), su(n, "type", r.message, t));
                break;
              case "min":
                "jsonSchema7" === t.target
                  ? r.inclusive
                    ? lu(n, "minimum", r.value, r.message, t)
                    : lu(n, "exclusiveMinimum", r.value, r.message, t)
                  : (r.inclusive || (n.exclusiveMinimum = !0),
                    lu(n, "minimum", r.value, r.message, t));
                break;
              case "max":
                "jsonSchema7" === t.target
                  ? r.inclusive
                    ? lu(n, "maximum", r.value, r.message, t)
                    : lu(n, "exclusiveMaximum", r.value, r.message, t)
                  : (r.inclusive || (n.exclusiveMaximum = !0),
                    lu(n, "maximum", r.value, r.message, t));
                break;
              case "multipleOf":
                lu(n, "multipleOf", r.value, r.message, t);
            }
          return n;
        })(e, n);
      case tu.ZodObject:
        return (function (e, t) {
          const n = "openAi" === t.target,
            r = { type: "object", properties: {} },
            o = [],
            i = e.shape();
          for (const e in i) {
            let a = i[e];
            if (void 0 === a || void 0 === a._def) continue;
            let s = Uu(a);
            s &&
              n &&
              (a instanceof El && (a = a._def.innerType),
              a.isNullable() || (a = a.nullable()),
              (s = !1));
            const l = Pu(a._def, {
              ...t,
              currentPath: [...t.currentPath, "properties", e],
              propertyPath: [...t.currentPath, "properties", e],
            });
            void 0 !== l && ((r.properties[e] = l), s || o.push(e));
          }
          o.length && (r.required = o);
          const a = (function (e, t) {
            if ("ZodNever" !== e.catchall._def.typeName)
              return Pu(e.catchall._def, {
                ...t,
                currentPath: [...t.currentPath, "additionalProperties"],
              });
            switch (e.unknownKeys) {
              case "passthrough":
                return t.allowedAdditionalProperties;
              case "strict":
                return t.rejectedAdditionalProperties;
              case "strip":
                return "strict" === t.removeAdditionalStrategy
                  ? t.allowedAdditionalProperties
                  : t.rejectedAdditionalProperties;
            }
          })(e, t);
          return (void 0 !== a && (r.additionalProperties = a), r);
        })(e, n);
      case tu.ZodBigInt:
        return (function (e, t) {
          const n = { type: "integer", format: "int64" };
          if (!e.checks) return n;
          for (const r of e.checks)
            switch (r.kind) {
              case "min":
                "jsonSchema7" === t.target
                  ? r.inclusive
                    ? lu(n, "minimum", r.value, r.message, t)
                    : lu(n, "exclusiveMinimum", r.value, r.message, t)
                  : (r.inclusive || (n.exclusiveMinimum = !0),
                    lu(n, "minimum", r.value, r.message, t));
                break;
              case "max":
                "jsonSchema7" === t.target
                  ? r.inclusive
                    ? lu(n, "maximum", r.value, r.message, t)
                    : lu(n, "exclusiveMaximum", r.value, r.message, t)
                  : (r.inclusive || (n.exclusiveMaximum = !0),
                    lu(n, "maximum", r.value, r.message, t));
                break;
              case "multipleOf":
                lu(n, "multipleOf", r.value, r.message, t);
            }
          return n;
        })(e, n);
      case tu.ZodBoolean:
        return { type: "boolean" };
      case tu.ZodDate:
        return cu(e, n);
      case tu.ZodUndefined:
        return { not: {} };
      case tu.ZodNull:
        return (function (e) {
          return "openApi3" === e.target
            ? { enum: ["null"], nullable: !0 }
            : { type: "null" };
        })(n);
      case tu.ZodArray:
        return (function (e, t) {
          const n = { type: "array" };
          return (
            e.type?._def &&
              e.type?._def?.typeName !== tu.ZodAny &&
              (n.items = Pu(e.type._def, {
                ...t,
                currentPath: [...t.currentPath, "items"],
              })),
            e.minLength &&
              lu(n, "minItems", e.minLength.value, e.minLength.message, t),
            e.maxLength &&
              lu(n, "maxItems", e.maxLength.value, e.maxLength.message, t),
            e.exactLength &&
              (lu(n, "minItems", e.exactLength.value, e.exactLength.message, t),
              lu(n, "maxItems", e.exactLength.value, e.exactLength.message, t)),
            n
          );
        })(e, n);
      case tu.ZodUnion:
      case tu.ZodDiscriminatedUnion:
        return (function (e, t) {
          if ("openApi3" === t.target) return Au(e, t);
          const n =
            e.options instanceof Map
              ? Array.from(e.options.values())
              : e.options;
          if (
            n.every(
              (e) =>
                e._def.typeName in Eu &&
                (!e._def.checks || !e._def.checks.length),
            )
          ) {
            const e = n.reduce((e, t) => {
              const n = Eu[t._def.typeName];
              return n && !e.includes(n) ? [...e, n] : e;
            }, []);
            return { type: e.length > 1 ? e : e[0] };
          }
          if (
            n.every((e) => "ZodLiteral" === e._def.typeName && !e.description)
          ) {
            const e = n.reduce((e, t) => {
              const n = typeof t._def.value;
              switch (n) {
                case "string":
                case "number":
                case "boolean":
                  return [...e, n];
                case "bigint":
                  return [...e, "integer"];
                case "object":
                  if (null === t._def.value) return [...e, "null"];
                default:
                  return e;
              }
            }, []);
            if (e.length === n.length) {
              const t = e.filter((e, t, n) => n.indexOf(e) === t);
              return {
                type: t.length > 1 ? t : t[0],
                enum: n.reduce(
                  (e, t) =>
                    e.includes(t._def.value) ? e : [...e, t._def.value],
                  [],
                ),
              };
            }
          } else if (n.every((e) => "ZodEnum" === e._def.typeName))
            return {
              type: "string",
              enum: n.reduce(
                (e, t) => [
                  ...e,
                  ...t._def.values.filter((t) => !e.includes(t)),
                ],
                [],
              ),
            };
          return Au(e, t);
        })(e, n);
      case tu.ZodIntersection:
        return (function (e, t) {
          const n = [
            Pu(e.left._def, {
              ...t,
              currentPath: [...t.currentPath, "allOf", "0"],
            }),
            Pu(e.right._def, {
              ...t,
              currentPath: [...t.currentPath, "allOf", "1"],
            }),
          ].filter((e) => !!e);
          let r =
            "jsonSchema2019-09" === t.target
              ? { unevaluatedProperties: !1 }
              : void 0;
          const o = [];
          return (
            n.forEach((e) => {
              if (
                ("type" in (t = e) && "string" === t.type) ||
                !("allOf" in t)
              ) {
                let t = e;
                if (
                  "additionalProperties" in e &&
                  !1 === e.additionalProperties
                ) {
                  const { additionalProperties: n, ...r } = e;
                  t = r;
                } else r = void 0;
                o.push(t);
              } else
                (o.push(...e.allOf),
                  void 0 === e.unevaluatedProperties && (r = void 0));
              var t;
            }),
            o.length ? { allOf: o, ...r } : void 0
          );
        })(e, n);
      case tu.ZodTuple:
        return (function (e, t) {
          return e.rest
            ? {
                type: "array",
                minItems: e.items.length,
                items: e.items
                  .map((e, n) =>
                    Pu(e._def, {
                      ...t,
                      currentPath: [...t.currentPath, "items", `${n}`],
                    }),
                  )
                  .reduce((e, t) => (void 0 === t ? e : [...e, t]), []),
                additionalItems: Pu(e.rest._def, {
                  ...t,
                  currentPath: [...t.currentPath, "additionalItems"],
                }),
              }
            : {
                type: "array",
                minItems: e.items.length,
                maxItems: e.items.length,
                items: e.items
                  .map((e, n) =>
                    Pu(e._def, {
                      ...t,
                      currentPath: [...t.currentPath, "items", `${n}`],
                    }),
                  )
                  .reduce((e, t) => (void 0 === t ? e : [...e, t]), []),
              };
        })(e, n);
      case tu.ZodRecord:
        return Ou(e, n);
      case tu.ZodLiteral:
        return (function (e, t) {
          const n = typeof e.value;
          return "bigint" !== n &&
            "number" !== n &&
            "boolean" !== n &&
            "string" !== n
            ? { type: Array.isArray(e.value) ? "array" : "object" }
            : "openApi3" === t.target
              ? { type: "bigint" === n ? "integer" : n, enum: [e.value] }
              : { type: "bigint" === n ? "integer" : n, const: e.value };
        })(e, n);
      case tu.ZodEnum:
        return (function (e) {
          return { type: "string", enum: Array.from(e.values) };
        })(e);
      case tu.ZodNativeEnum:
        return (function (e) {
          const t = e.values,
            n = Object.keys(e.values)
              .filter((e) => "number" != typeof t[t[e]])
              .map((e) => t[e]),
            r = Array.from(new Set(n.map((e) => typeof e)));
          return {
            type:
              1 === r.length
                ? "string" === r[0]
                  ? "string"
                  : "number"
                : ["string", "number"],
            enum: n,
          };
        })(e);
      case tu.ZodNullable:
        return (function (e, t) {
          if (
            [
              "ZodString",
              "ZodNumber",
              "ZodBigInt",
              "ZodBoolean",
              "ZodNull",
            ].includes(e.innerType._def.typeName) &&
            (!e.innerType._def.checks || !e.innerType._def.checks.length)
          )
            return "openApi3" === t.target
              ? { type: Eu[e.innerType._def.typeName], nullable: !0 }
              : { type: [Eu[e.innerType._def.typeName], "null"] };
          if ("openApi3" === t.target) {
            const n = Pu(e.innerType._def, {
              ...t,
              currentPath: [...t.currentPath],
            });
            return n && "$ref" in n
              ? { allOf: [n], nullable: !0 }
              : n && { ...n, nullable: !0 };
          }
          const n = Pu(e.innerType._def, {
            ...t,
            currentPath: [...t.currentPath, "anyOf", "0"],
          });
          return n && { anyOf: [n, { type: "null" }] };
        })(e, n);
      case tu.ZodOptional:
        return ((e, t) => {
          if (t.currentPath.toString() === t.propertyPath?.toString())
            return Pu(e.innerType._def, t);
          const n = Pu(e.innerType._def, {
            ...t,
            currentPath: [...t.currentPath, "anyOf", "1"],
          });
          return n ? { anyOf: [{ not: {} }, n] } : {};
        })(e, n);
      case tu.ZodMap:
        return (function (e, t) {
          return "record" === t.mapStrategy
            ? Ou(e, t)
            : {
                type: "array",
                maxItems: 125,
                items: {
                  type: "array",
                  items: [
                    Pu(e.keyType._def, {
                      ...t,
                      currentPath: [...t.currentPath, "items", "items", "0"],
                    }) || {},
                    Pu(e.valueType._def, {
                      ...t,
                      currentPath: [...t.currentPath, "items", "items", "1"],
                    }) || {},
                  ],
                  minItems: 2,
                  maxItems: 2,
                },
              };
        })(e, n);
      case tu.ZodSet:
        return (function (e, t) {
          const n = {
            type: "array",
            uniqueItems: !0,
            items: Pu(e.valueType._def, {
              ...t,
              currentPath: [...t.currentPath, "items"],
            }),
          };
          return (
            e.minSize &&
              lu(n, "minItems", e.minSize.value, e.minSize.message, t),
            e.maxSize &&
              lu(n, "maxItems", e.maxSize.value, e.maxSize.message, t),
            n
          );
        })(e, n);
      case tu.ZodLazy:
        return () => e.getter()._def;
      case tu.ZodPromise:
        return (function (e, t) {
          return Pu(e.type._def, t);
        })(e, n);
      case tu.ZodNaN:
      case tu.ZodNever:
        return { not: {} };
      case tu.ZodEffects:
        return (function (e, t) {
          return "input" === t.effectStrategy ? Pu(e.schema._def, t) : {};
        })(e, n);
      case tu.ZodAny:
      case tu.ZodUnknown:
        return {};
      case tu.ZodDefault:
        return (function (e, t) {
          return { ...Pu(e.innerType._def, t), default: e.defaultValue() };
        })(e, n);
      case tu.ZodBranded:
        return uu(e, n);
      case tu.ZodReadonly:
      case tu.ZodCatch:
        return ((e, t) => Pu(e.innerType._def, t))(e, n);
      case tu.ZodPipeline:
        return ((e, t) => {
          if ("input" === t.pipeStrategy) return Pu(e.in._def, t);
          if ("output" === t.pipeStrategy) return Pu(e.out._def, t);
          const n = Pu(e.in._def, {
            ...t,
            currentPath: [...t.currentPath, "allOf", "0"],
          });
          return {
            allOf: [
              n,
              Pu(e.out._def, {
                ...t,
                currentPath: [...t.currentPath, "allOf", n ? "1" : "0"],
              }),
            ].filter((e) => void 0 !== e),
          };
        })(e, n);
      case tu.ZodFunction:
      case tu.ZodVoid:
      case tu.ZodSymbol:
      default:
        return;
    }
  };
  function Pu(e, t, n = !1) {
    const r = t.seen.get(e);
    if (t.override) {
      const o = t.override?.(e, t, r, n);
      if (o !== iu) return o;
    }
    if (r && !n) {
      const e = Du(r, t);
      if (void 0 !== e) return e;
    }
    const o = { def: e, path: t.currentPath, jsonSchema: void 0 };
    t.seen.set(e, o);
    const i = Cu(e, e.typeName, t),
      a = "function" == typeof i ? Pu(i(), t) : i;
    if ((a && zu(e, t, a), t.postProcess)) {
      const n = t.postProcess(a, e, t);
      return ((o.jsonSchema = a), n);
    }
    return ((o.jsonSchema = a), a);
  }
  const Du = (e, t) => {
      switch (t.$refStrategy) {
        case "root":
          return { $ref: e.path.join("/") };
        case "relative":
          return { $ref: ju(t.currentPath, e.path) };
        case "none":
        case "seen":
          return e.path.length < t.currentPath.length &&
            e.path.every((e, n) => t.currentPath[n] === e)
            ? (console.warn(
                `Recursive reference detected at ${t.currentPath.join("/")}! Defaulting to any`,
              ),
              {})
            : "seen" === t.$refStrategy
              ? {}
              : void 0;
      }
    },
    ju = (e, t) => {
      let n = 0;
      for (; n < e.length && n < t.length && e[n] === t[n]; n++);
      return [(e.length - n).toString(), ...t.slice(n)].join("/");
    },
    zu = (e, t, n) => (
      e.description &&
        ((n.description = e.description),
        t.markdownDescription && (n.markdownDescription = e.description)),
      n
    );
  function Ru(...e) {
    return e.reduce((e, t) => ({ ...e, ...(null != t ? t : {}) }), {});
  }
  function Mu(e) {
    return Object.fromEntries([...e.headers]);
  }
  var qu = (({
    prefix: e,
    size: t = 16,
    alphabet:
      n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    separator: r = "-",
  } = {}) => {
    const o = () => {
      const e = n.length,
        r = new Array(t);
      for (let o = 0; o < t; o++) r[o] = n[(Math.random() * e) | 0];
      return r.join("");
    };
    if (null == e) return o;
    if (n.includes(r))
      throw new I({
        argument: "separator",
        message: `The separator "${r}" must not be part of the alphabet "${n}".`,
      });
    return () => `${e}${r}${o()}`;
  })();
  function Zu(e) {
    return (
      (e instanceof Error || e instanceof DOMException) &&
      ("AbortError" === e.name ||
        "ResponseAborted" === e.name ||
        "TimeoutError" === e.name)
    );
  }
  var Lu = ["fetch failed", "failed to fetch"];
  function Fu(e) {
    return Object.fromEntries(Object.entries(e).filter(([e, t]) => null != t));
  }
  function Bu({
    apiKey: e,
    environmentVariableName: t,
    apiKeyParameterName: n = "apiKey",
    description: r,
  }) {
    if ("string" == typeof e) return e;
    if (null != e) throw new W({ message: `${r} API key must be a string.` });
    if ("undefined" == typeof process)
      throw new W({
        message: `${r} API key is missing. Pass it using the '${n}' parameter. Environment variables is not supported in this environment.`,
      });
    if (null == (e = process.env[t]))
      throw new W({
        message: `${r} API key is missing. Pass it using the '${n}' parameter or the ${t} environment variable.`,
      });
    if ("string" != typeof e)
      throw new W({
        message: `${r} API key must be a string. The value of the ${t} environment variable is not a string.`,
      });
    return e;
  }
  function Wu({ settingValue: e, environmentVariableName: t }) {
    return "string" == typeof e ||
      (null == e &&
        "undefined" != typeof process &&
        null != (e = process.env[t]) &&
        "string" == typeof e)
      ? e
      : void 0;
  }
  function Hu({
    settingValue: e,
    environmentVariableName: t,
    settingName: n,
    description: r,
  }) {
    if ("string" == typeof e) return e;
    if (null != e) throw new G({ message: `${r} setting must be a string.` });
    if ("undefined" == typeof process)
      throw new G({
        message: `${r} setting is missing. Pass it using the '${n}' parameter. Environment variables is not supported in this environment.`,
      });
    if (null == (e = process.env[t]))
      throw new G({
        message: `${r} setting is missing. Pass it using the '${n}' parameter or the ${t} environment variable.`,
      });
    if ("string" != typeof e)
      throw new G({
        message: `${r} setting must be a string. The value of the ${t} environment variable is not a string.`,
      });
    return e;
  }
  var Vu = /"__proto__"\s*:/,
    Ju = /"constructor"\s*:/;
  function Ku(e) {
    const { stackTraceLimit: t } = Error;
    Error.stackTraceLimit = 0;
    try {
      return (function (e) {
        const t = JSON.parse(e);
        return null === t ||
          "object" != typeof t ||
          (!1 === Vu.test(e) && !1 === Ju.test(e))
          ? t
          : (function (e) {
              let t = [e];
              for (; t.length; ) {
                const e = t;
                t = [];
                for (const n of e) {
                  if (Object.prototype.hasOwnProperty.call(n, "__proto__"))
                    throw new SyntaxError(
                      "Object contains forbidden prototype property",
                    );
                  if (
                    Object.prototype.hasOwnProperty.call(n, "constructor") &&
                    Object.prototype.hasOwnProperty.call(
                      n.constructor,
                      "prototype",
                    )
                  )
                    throw new SyntaxError(
                      "Object contains forbidden prototype property",
                    );
                  for (const e in n) {
                    const r = n[e];
                    r && "object" == typeof r && t.push(r);
                  }
                }
              }
              return e;
            })(t);
      })(e);
    } finally {
      Error.stackTraceLimit = t;
    }
  }
  var Gu = Symbol.for("vercel.ai.validator");
  async function Xu({ value: e, schema: t }) {
    const n = (function (e) {
      return (function (e) {
        return (
          "object" == typeof e &&
          null !== e &&
          Gu in e &&
          !0 === e[Gu] &&
          "validate" in e
        );
      })(e)
        ? e
        : ((t = e),
          (n = async (e) => {
            const n = await t["~standard"].validate(e);
            return null == n.issues
              ? { success: !0, value: n.value }
              : { success: !1, error: new pe({ value: e, cause: n.issues }) };
          }),
          { [Gu]: !0, validate: n });
      var t, n;
    })(t);
    try {
      if (null == n.validate) return { success: !0, value: e, rawValue: e };
      const t = await n.validate(e);
      return t.success
        ? { success: !0, value: t.value, rawValue: e }
        : {
            success: !1,
            error: pe.wrap({ value: e, cause: t.error }),
            rawValue: e,
          };
    } catch (t) {
      return {
        success: !1,
        error: pe.wrap({ value: e, cause: t }),
        rawValue: e,
      };
    }
  }
  async function Yu({ text: e, schema: t }) {
    try {
      const n = Ku(e);
      return null == t
        ? { success: !0, value: n, rawValue: n }
        : await Xu({ value: n, schema: t });
    } catch (t) {
      return {
        success: !1,
        error: q.isInstance(t) ? t : new q({ text: e, cause: t }),
        rawValue: void 0,
      };
    }
  }
  function Qu(e) {
    try {
      return (Ku(e), !0);
    } catch (e) {
      return !1;
    }
  }
  function ec({ stream: e, schema: t }) {
    return e
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new be())
      .pipeThrough(
        new TransformStream({
          async transform({ data: e }, n) {
            "[DONE]" !== e && n.enqueue(await Yu({ text: e, schema: t }));
          },
        }),
      );
  }
  async function tc({ provider: e, providerOptions: t, schema: n }) {
    if (null == (null == t ? void 0 : t[e])) return;
    const r = await Xu({ value: t[e], schema: n });
    if (!r.success)
      throw new I({
        argument: "providerOptions",
        message: `invalid ${e} provider options`,
        cause: r.error,
      });
    return r.value;
  }
  var nc = () => globalThis.fetch,
    rc = async ({
      url: e,
      headers: t,
      body: n,
      failedResponseHandler: r,
      successfulResponseHandler: o,
      abortSignal: i,
      fetch: a,
    }) =>
      oc({
        url: e,
        headers: { "Content-Type": "application/json", ...t },
        body: { content: JSON.stringify(n), values: n },
        failedResponseHandler: r,
        successfulResponseHandler: o,
        abortSignal: i,
        fetch: a,
      }),
    oc = async ({
      url: e,
      headers: t = {},
      body: n,
      successfulResponseHandler: r,
      failedResponseHandler: o,
      abortSignal: i,
      fetch: a = nc(),
    }) => {
      try {
        const s = await a(e, {
            method: "POST",
            headers: Fu(t),
            body: n.content,
            signal: i,
          }),
          l = Mu(s);
        if (!s.ok) {
          let t;
          try {
            t = await o({ response: s, url: e, requestBodyValues: n.values });
          } catch (t) {
            if (Zu(t) || h.isInstance(t)) throw t;
            throw new h({
              message: "Failed to process error response",
              cause: t,
              statusCode: s.status,
              url: e,
              responseHeaders: l,
              requestBodyValues: n.values,
            });
          }
          throw t.value;
        }
        try {
          return await r({ response: s, url: e, requestBodyValues: n.values });
        } catch (t) {
          if (t instanceof Error && (Zu(t) || h.isInstance(t))) throw t;
          throw new h({
            message: "Failed to process successful response",
            cause: t,
            statusCode: s.status,
            url: e,
            responseHeaders: l,
            requestBodyValues: n.values,
          });
        }
      } catch (t) {
        throw (function ({ error: e, url: t, requestBodyValues: n }) {
          if (Zu(e)) return e;
          if (e instanceof TypeError && Lu.includes(e.message.toLowerCase())) {
            const r = e.cause;
            if (null != r)
              return new h({
                message: `Cannot connect to API: ${r.message}`,
                cause: r,
                url: t,
                requestBodyValues: n,
                isRetryable: !0,
              });
          }
          return e;
        })({ error: t, url: e, requestBodyValues: n.values });
      }
    };
  function ic({ id: e, name: t, inputSchema: n }) {
    return ({
      execute: r,
      outputSchema: o,
      toModelOutput: i,
      onInputStart: a,
      onInputDelta: s,
      onInputAvailable: l,
      ...u
    }) => ({
      type: "provider-defined",
      id: e,
      name: t,
      args: u,
      inputSchema: n,
      outputSchema: o,
      execute: r,
      toModelOutput: i,
      onInputStart: a,
      onInputDelta: s,
      onInputAvailable: l,
    });
  }
  function ac({ id: e, name: t, inputSchema: n, outputSchema: r }) {
    return ({
      execute: o,
      toModelOutput: i,
      onInputStart: a,
      onInputDelta: s,
      onInputAvailable: l,
      ...u
    }) => ({
      type: "provider-defined",
      id: e,
      name: t,
      args: u,
      inputSchema: n,
      outputSchema: r,
      execute: o,
      toModelOutput: i,
      onInputStart: a,
      onInputDelta: s,
      onInputAvailable: l,
    });
  }
  async function sc(e) {
    return ("function" == typeof e && (e = e()), Promise.resolve(e));
  }
  var lc =
      ({ errorSchema: e, errorToMessage: t, isRetryable: n }) =>
      async ({ response: r, url: o, requestBodyValues: i }) => {
        const a = await r.text(),
          s = Mu(r);
        if ("" === a.trim())
          return {
            responseHeaders: s,
            value: new h({
              message: r.statusText,
              url: o,
              requestBodyValues: i,
              statusCode: r.status,
              responseHeaders: s,
              responseBody: a,
              isRetryable: null == n ? void 0 : n(r),
            }),
          };
        try {
          const l = await (async function ({ text: e, schema: t }) {
            try {
              const n = Ku(e);
              return null == t
                ? n
                : (async function ({ value: e, schema: t }) {
                    const n = await Xu({ value: e, schema: t });
                    if (!n.success) throw pe.wrap({ value: e, cause: n.error });
                    return n.value;
                  })({ value: n, schema: t });
            } catch (t) {
              if (q.isInstance(t) || pe.isInstance(t)) throw t;
              throw new q({ text: e, cause: t });
            }
          })({ text: a, schema: e });
          return {
            responseHeaders: s,
            value: new h({
              message: t(l),
              url: o,
              requestBodyValues: i,
              statusCode: r.status,
              responseHeaders: s,
              responseBody: a,
              data: l,
              isRetryable: null == n ? void 0 : n(r, l),
            }),
          };
        } catch (e) {
          return {
            responseHeaders: s,
            value: new h({
              message: r.statusText,
              url: o,
              requestBodyValues: i,
              statusCode: r.status,
              responseHeaders: s,
              responseBody: a,
              isRetryable: null == n ? void 0 : n(r),
            }),
          };
        }
      },
    uc =
      (e) =>
      async ({ response: t }) => {
        const n = Mu(t);
        if (null == t.body) throw new b({});
        return { responseHeaders: n, value: ec({ stream: t.body, schema: e }) };
      },
    cc =
      (e) =>
      async ({ response: t, url: n, requestBodyValues: r }) => {
        const o = await t.text(),
          i = await Yu({ text: o, schema: e }),
          a = Mu(t);
        if (!i.success)
          throw new h({
            message: "Invalid JSON response",
            cause: i.error,
            statusCode: t.status,
            responseHeaders: a,
            responseBody: o,
            url: n,
            requestBodyValues: r,
          });
        return { responseHeaders: a, value: i.value, rawValue: i.rawValue };
      };
  function dc(e, t) {
    return mc(
      ((e, t) => {
        const n = ((e) => {
            const t = ((e) =>
                "string" == typeof e ? { ...au, name: e } : { ...au, ...e })(e),
              n =
                void 0 !== t.name
                  ? [...t.basePath, t.definitionPath, t.name]
                  : t.basePath;
            return {
              ...t,
              currentPath: n,
              propertyPath: void 0,
              seen: new Map(
                Object.entries(t.definitions).map(([e, n]) => [
                  n._def,
                  {
                    def: n._def,
                    path: [...t.basePath, t.definitionPath, e],
                    jsonSchema: void 0,
                  },
                ]),
              ),
            };
          })(t),
          r = t.definitions
            ? Object.entries(t.definitions).reduce(
                (e, [t, r]) => ({
                  ...e,
                  [t]:
                    Pu(
                      r._def,
                      {
                        ...n,
                        currentPath: [...n.basePath, n.definitionPath, t],
                      },
                      !0,
                    ) ?? {},
                }),
                {},
              )
            : void 0,
          o = "title" === t?.nameStrategy ? void 0 : t?.name,
          i =
            Pu(
              e._def,
              void 0 === o
                ? n
                : { ...n, currentPath: [...n.basePath, n.definitionPath, o] },
              !1,
            ) ?? {},
          a = void 0 !== t.name && "title" === t.nameStrategy ? t.name : void 0;
        void 0 !== a && (i.title = a);
        const s =
          void 0 === o
            ? r
              ? { ...i, [n.definitionPath]: r }
              : i
            : {
                $ref: [
                  ...("relative" === n.$refStrategy ? [] : n.basePath),
                  n.definitionPath,
                  o,
                ].join("/"),
                [n.definitionPath]: { ...r, [o]: i },
              };
        return (
          "jsonSchema7" === n.target
            ? (s.$schema = "http://json-schema.org/draft-07/schema#")
            : ("jsonSchema2019-09" !== n.target && "openAi" !== n.target) ||
              (s.$schema = "https://json-schema.org/draft/2019-09/schema#"),
          "openAi" === n.target &&
            ("anyOf" in s ||
              "oneOf" in s ||
              "allOf" in s ||
              ("type" in s && Array.isArray(s.type))) &&
            console.warn(
              "Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.",
            ),
          s
        );
      })(e, { $refStrategy: "none", target: "jsonSchema7" }),
      {
        validate: async (t) => {
          const n = await e.safeParseAsync(t);
          return n.success
            ? { success: !0, value: n.data }
            : { success: !1, error: n.error };
        },
      },
    );
  }
  var pc = Symbol.for("vercel.ai.schema");
  function mc(e, { validate: t } = {}) {
    return { [pc]: !0, _type: void 0, [Gu]: !0, jsonSchema: e, validate: t };
  }
  function hc(e) {
    return null == e
      ? mc({ properties: {}, additionalProperties: !1 })
      : "object" == typeof (n = e) &&
          null !== n &&
          pc in n &&
          !0 === n[pc] &&
          "jsonSchema" in n &&
          "validate" in n
        ? e
        : (function (e) {
              return "_zod" in e;
            })((t = e))
          ? (function (e) {
              return mc(
                Ka(e, { target: "draft-7", io: "output", reused: "inline" }),
                {
                  validate: async (t) => {
                    const n = await hs(e, t);
                    return n.success
                      ? { success: !0, value: n.data }
                      : { success: !1, error: n.error };
                  },
                },
              );
            })(t)
          : dc(t);
    var t, n;
  }
  var { btoa: gc, atob: fc } = globalThis;
  function vc(e) {
    const t = e.replace(/-/g, "+").replace(/_/g, "/"),
      n = fc(t);
    return Uint8Array.from(n, (e) => e.codePointAt(0));
  }
  function yc(e) {
    return e instanceof Uint8Array
      ? (function (e) {
          let t = "";
          for (let n = 0; n < e.length; n++) t += String.fromCodePoint(e[n]);
          return gc(t);
        })(e)
      : e;
  }
  function bc(e) {
    return null == e ? void 0 : e.replace(/\/$/, "");
  }
  function _c({ id: e, model: t, created: n }) {
    return {
      id: null != e ? e : void 0,
      modelId: null != t ? t : void 0,
      timestamp: null != n ? new Date(1e3 * n) : void 0,
    };
  }
  function wc(e) {
    switch (e) {
      case "stop":
        return "stop";
      case "length":
        return "length";
      case "content_filter":
        return "content-filter";
      case "function_call":
      case "tool_calls":
        return "tool-calls";
      default:
        return "unknown";
    }
  }
  var kc = ul({
      logitBias: _l(nu(), Zs()).optional(),
      logprobs: pl([Ws(), Zs()]).optional(),
      parallelToolCalls: Ws().optional(),
      user: ys().optional(),
      reasoningEffort: $l(["low", "medium", "high"]).optional(),
      maxCompletionTokens: Zs().optional(),
      store: Ws().optional(),
      metadata: _l(ys().max(64), ys().max(512)).optional(),
      prediction: _l(ys(), Qs()).optional(),
      structuredOutputs: Ws().optional(),
      serviceTier: $l(["auto", "flex", "priority"]).optional(),
      strictJsonSchema: Ws().optional(),
    }),
    xc = ul({
      error: ul({
        message: ys(),
        type: ys().nullish(),
        param: Qs().nullish(),
        code: pl([ys(), Zs()]).nullish(),
      }),
    }),
    $c = lc({ errorSchema: xc, errorToMessage: (e) => e.error.message }),
    Ic = ul({
      key: ys(),
      type: $l(["eq", "ne", "gt", "gte", "lt", "lte"]),
      value: pl([ys(), Zs(), Ws()]),
    }),
    Sc = ul({ type: $l(["and", "or"]), filters: sl(pl([Ic, Gl(() => Sc)])) }),
    Tc = pl([Ic, Sc]),
    Nc = ul({
      vectorStoreIds: sl(ys()).optional(),
      maxNumResults: Zs().optional(),
      ranking: ul({
        ranker: $l(["auto", "default-2024-08-21"]).optional(),
      }).optional(),
      filters: Tc.optional(),
    }),
    Oc = ic({
      id: "openai.file_search",
      name: "file_search",
      inputSchema: ul({ query: ys() }),
    }),
    Ec = ul({
      searchContextSize: $l(["low", "medium", "high"]).optional(),
      userLocation: ul({
        type: Sl("approximate"),
        country: ys().optional(),
        city: ys().optional(),
        region: ys().optional(),
        timezone: ys().optional(),
      }).optional(),
    }),
    Ac = ic({
      id: "openai.web_search_preview",
      name: "web_search_preview",
      inputSchema: ul({}),
    }),
    Uc = class {
      constructor(e, t) {
        ((this.specificationVersion = "v2"),
          (this.supportedUrls = { "image/*": [/^https?:\/\/.*$/] }),
          (this.modelId = e),
          (this.config = t));
      }
      get provider() {
        return this.config.provider;
      }
      async getArgs({
        prompt: e,
        maxOutputTokens: t,
        temperature: n,
        topP: r,
        topK: o,
        frequencyPenalty: i,
        presencePenalty: a,
        stopSequences: s,
        responseFormat: l,
        seed: u,
        tools: c,
        toolChoice: d,
        providerOptions: p,
      }) {
        var m, h, g, f;
        const v = [],
          y =
            null !=
            (m = await tc({
              provider: "openai",
              providerOptions: p,
              schema: kc,
            }))
              ? m
              : {},
          b = null == (h = y.structuredOutputs) || h;
        (null != o && v.push({ type: "unsupported-setting", setting: "topK" }),
          "json" !== (null == l ? void 0 : l.type) ||
            null == l.schema ||
            b ||
            v.push({
              type: "unsupported-setting",
              setting: "responseFormat",
              details:
                "JSON response format schema is only supported with structuredOutputs",
            }));
        const { messages: _, warnings: w } = (function ({
          prompt: e,
          systemMessageMode: t = "system",
        }) {
          const n = [],
            r = [];
          for (const { role: o, content: i } of e)
            switch (o) {
              case "system":
                switch (t) {
                  case "system":
                    n.push({ role: "system", content: i });
                    break;
                  case "developer":
                    n.push({ role: "developer", content: i });
                    break;
                  case "remove":
                    r.push({
                      type: "other",
                      message: "system messages are removed for this model",
                    });
                    break;
                  default:
                    throw new Error(`Unsupported system message mode: ${t}`);
                }
                break;
              case "user":
                if (1 === i.length && "text" === i[0].type) {
                  n.push({ role: "user", content: i[0].text });
                  break;
                }
                n.push({
                  role: "user",
                  content: i.map((e, t) => {
                    var n, r, o;
                    switch (e.type) {
                      case "text":
                        return { type: "text", text: e.text };
                      case "file":
                        if (e.mediaType.startsWith("image/")) {
                          const t =
                            "image/*" === e.mediaType
                              ? "image/jpeg"
                              : e.mediaType;
                          return {
                            type: "image_url",
                            image_url: {
                              url:
                                e.data instanceof URL
                                  ? e.data.toString()
                                  : `data:${t};base64,${yc(e.data)}`,
                              detail:
                                null ==
                                (r =
                                  null == (n = e.providerOptions)
                                    ? void 0
                                    : n.openai)
                                  ? void 0
                                  : r.imageDetail,
                            },
                          };
                        }
                        if (!e.mediaType.startsWith("audio/")) {
                          if ("application/pdf" === e.mediaType) {
                            if (e.data instanceof URL)
                              throw new fe({
                                functionality: "PDF file parts with URLs",
                              });
                            return {
                              type: "file",
                              file:
                                "string" == typeof e.data &&
                                e.data.startsWith("file-")
                                  ? { file_id: e.data }
                                  : {
                                      filename:
                                        null != (o = e.filename)
                                          ? o
                                          : `part-${t}.pdf`,
                                      file_data: `data:application/pdf;base64,${yc(e.data)}`,
                                    },
                            };
                          }
                          throw new fe({
                            functionality: `file part media type ${e.mediaType}`,
                          });
                        }
                        if (e.data instanceof URL)
                          throw new fe({
                            functionality: "audio file parts with URLs",
                          });
                        switch (e.mediaType) {
                          case "audio/wav":
                            return {
                              type: "input_audio",
                              input_audio: { data: yc(e.data), format: "wav" },
                            };
                          case "audio/mp3":
                          case "audio/mpeg":
                            return {
                              type: "input_audio",
                              input_audio: { data: yc(e.data), format: "mp3" },
                            };
                          default:
                            throw new fe({
                              functionality: `audio content parts with media type ${e.mediaType}`,
                            });
                        }
                    }
                  }),
                });
                break;
              case "assistant": {
                let e = "";
                const t = [];
                for (const n of i)
                  switch (n.type) {
                    case "text":
                      e += n.text;
                      break;
                    case "tool-call":
                      t.push({
                        id: n.toolCallId,
                        type: "function",
                        function: {
                          name: n.toolName,
                          arguments: JSON.stringify(n.input),
                        },
                      });
                  }
                n.push({
                  role: "assistant",
                  content: e,
                  tool_calls: t.length > 0 ? t : void 0,
                });
                break;
              }
              case "tool":
                for (const e of i) {
                  const t = e.output;
                  let r;
                  switch (t.type) {
                    case "text":
                    case "error-text":
                      r = t.value;
                      break;
                    case "content":
                    case "json":
                    case "error-json":
                      r = JSON.stringify(t.value);
                  }
                  n.push({
                    role: "tool",
                    tool_call_id: e.toolCallId,
                    content: r,
                  });
                }
                break;
              default:
                throw new Error(`Unsupported role: ${o}`);
            }
          return { messages: n, warnings: r };
        })({ prompt: e, systemMessageMode: zc(this.modelId) });
        v.push(...w);
        const k = null != (g = y.strictJsonSchema) && g,
          x = {
            model: this.modelId,
            logit_bias: y.logitBias,
            logprobs:
              !0 === y.logprobs || "number" == typeof y.logprobs || void 0,
            top_logprobs:
              "number" == typeof y.logprobs
                ? y.logprobs
                : "boolean" == typeof y.logprobs && y.logprobs
                  ? 0
                  : void 0,
            user: y.user,
            parallel_tool_calls: y.parallelToolCalls,
            max_tokens: t,
            temperature: n,
            top_p: r,
            frequency_penalty: i,
            presence_penalty: a,
            response_format:
              "json" === (null == l ? void 0 : l.type)
                ? b && null != l.schema
                  ? {
                      type: "json_schema",
                      json_schema: {
                        schema: l.schema,
                        strict: k,
                        name: null != (f = l.name) ? f : "response",
                        description: l.description,
                      },
                    }
                  : { type: "json_object" }
                : void 0,
            stop: s,
            seed: u,
            max_completion_tokens: y.maxCompletionTokens,
            store: y.store,
            metadata: y.metadata,
            prediction: y.prediction,
            reasoning_effort: y.reasoningEffort,
            service_tier: y.serviceTier,
            messages: _,
          };
        var $;
        (jc(this.modelId)
          ? (null != x.temperature &&
              ((x.temperature = void 0),
              v.push({
                type: "unsupported-setting",
                setting: "temperature",
                details: "temperature is not supported for reasoning models",
              })),
            null != x.top_p &&
              ((x.top_p = void 0),
              v.push({
                type: "unsupported-setting",
                setting: "topP",
                details: "topP is not supported for reasoning models",
              })),
            null != x.frequency_penalty &&
              ((x.frequency_penalty = void 0),
              v.push({
                type: "unsupported-setting",
                setting: "frequencyPenalty",
                details:
                  "frequencyPenalty is not supported for reasoning models",
              })),
            null != x.presence_penalty &&
              ((x.presence_penalty = void 0),
              v.push({
                type: "unsupported-setting",
                setting: "presencePenalty",
                details:
                  "presencePenalty is not supported for reasoning models",
              })),
            null != x.logit_bias &&
              ((x.logit_bias = void 0),
              v.push({
                type: "other",
                message: "logitBias is not supported for reasoning models",
              })),
            null != x.logprobs &&
              ((x.logprobs = void 0),
              v.push({
                type: "other",
                message: "logprobs is not supported for reasoning models",
              })),
            null != x.top_logprobs &&
              ((x.top_logprobs = void 0),
              v.push({
                type: "other",
                message: "topLogprobs is not supported for reasoning models",
              })),
            null != x.max_tokens &&
              (null == x.max_completion_tokens &&
                (x.max_completion_tokens = x.max_tokens),
              (x.max_tokens = void 0)))
          : (this.modelId.startsWith("gpt-4o-search-preview") ||
              this.modelId.startsWith("gpt-4o-mini-search-preview")) &&
            null != x.temperature &&
            ((x.temperature = void 0),
            v.push({
              type: "unsupported-setting",
              setting: "temperature",
              details:
                "temperature is not supported for the search preview models and has been removed.",
            })),
          "flex" !== y.serviceTier ||
            ($ = this.modelId).startsWith("o3") ||
            $.startsWith("o4-mini") ||
            (v.push({
              type: "unsupported-setting",
              setting: "serviceTier",
              details:
                "flex processing is only available for o3 and o4-mini models",
            }),
            (x.service_tier = void 0)),
          "priority" !== y.serviceTier ||
            (function (e) {
              return (
                e.startsWith("gpt-4") ||
                e.startsWith("o3") ||
                e.startsWith("o4-mini")
              );
            })(this.modelId) ||
            (v.push({
              type: "unsupported-setting",
              setting: "serviceTier",
              details:
                "priority processing is only available for supported models (GPT-4, o3, o4-mini) and requires Enterprise access",
            }),
            (x.service_tier = void 0)));
        const {
          tools: I,
          toolChoice: S,
          toolWarnings: T,
        } = (function ({
          tools: e,
          toolChoice: t,
          structuredOutputs: n,
          strictJsonSchema: r,
        }) {
          const o = [];
          if (null == (e = (null == e ? void 0 : e.length) ? e : void 0))
            return { tools: void 0, toolChoice: void 0, toolWarnings: o };
          const i = [];
          for (const t of e)
            switch (t.type) {
              case "function":
                i.push({
                  type: "function",
                  function: {
                    name: t.name,
                    description: t.description,
                    parameters: t.inputSchema,
                    strict: n ? r : void 0,
                  },
                });
                break;
              case "provider-defined":
                switch (t.id) {
                  case "openai.file_search": {
                    const e = Nc.parse(t.args);
                    i.push({
                      type: "file_search",
                      vector_store_ids: e.vectorStoreIds,
                      max_num_results: e.maxNumResults,
                      ranking_options: e.ranking
                        ? { ranker: e.ranking.ranker }
                        : void 0,
                      filters: e.filters,
                    });
                    break;
                  }
                  case "openai.web_search_preview": {
                    const e = Ec.parse(t.args);
                    i.push({
                      type: "web_search_preview",
                      search_context_size: e.searchContextSize,
                      user_location: e.userLocation,
                    });
                    break;
                  }
                  default:
                    o.push({ type: "unsupported-tool", tool: t });
                }
                break;
              default:
                o.push({ type: "unsupported-tool", tool: t });
            }
          if (null == t)
            return { tools: i, toolChoice: void 0, toolWarnings: o };
          const a = t.type;
          switch (a) {
            case "auto":
            case "none":
            case "required":
              return { tools: i, toolChoice: a, toolWarnings: o };
            case "tool":
              return {
                tools: i,
                toolChoice: {
                  type: "function",
                  function: { name: t.toolName },
                },
                toolWarnings: o,
              };
            default:
              throw new fe({ functionality: `tool choice type: ${a}` });
          }
        })({
          tools: c,
          toolChoice: d,
          structuredOutputs: b,
          strictJsonSchema: k,
        });
        return {
          args: { ...x, tools: I, tool_choice: S },
          warnings: [...v, ...T],
        };
      }
      async doGenerate(e) {
        var t, n, r, o, i, a, s, l, u, c, d, p, m, h;
        const { args: g, warnings: f } = await this.getArgs(e),
          {
            responseHeaders: v,
            value: y,
            rawValue: b,
          } = await rc({
            url: this.config.url({
              path: "/chat/completions",
              modelId: this.modelId,
            }),
            headers: Ru(this.config.headers(), e.headers),
            body: g,
            failedResponseHandler: $c,
            successfulResponseHandler: cc(Pc),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          }),
          _ = y.choices[0],
          w = [],
          k = _.message.content;
        null != k && k.length > 0 && w.push({ type: "text", text: k });
        for (const e of null != (t = _.message.tool_calls) ? t : [])
          w.push({
            type: "tool-call",
            toolCallId: null != (n = e.id) ? n : qu(),
            toolName: e.function.name,
            input: e.function.arguments,
          });
        for (const e of null != (r = _.message.annotations) ? r : [])
          w.push({
            type: "source",
            sourceType: "url",
            id: qu(),
            url: e.url,
            title: e.title,
          });
        const x = null == (o = y.usage) ? void 0 : o.completion_tokens_details,
          $ = null == (i = y.usage) ? void 0 : i.prompt_tokens_details,
          I = { openai: {} };
        return (
          null != (null == x ? void 0 : x.accepted_prediction_tokens) &&
            (I.openai.acceptedPredictionTokens =
              null == x ? void 0 : x.accepted_prediction_tokens),
          null != (null == x ? void 0 : x.rejected_prediction_tokens) &&
            (I.openai.rejectedPredictionTokens =
              null == x ? void 0 : x.rejected_prediction_tokens),
          null != (null == (a = _.logprobs) ? void 0 : a.content) &&
            (I.openai.logprobs = _.logprobs.content),
          {
            content: w,
            finishReason: wc(_.finish_reason),
            usage: {
              inputTokens:
                null != (l = null == (s = y.usage) ? void 0 : s.prompt_tokens)
                  ? l
                  : void 0,
              outputTokens:
                null !=
                (c = null == (u = y.usage) ? void 0 : u.completion_tokens)
                  ? c
                  : void 0,
              totalTokens:
                null != (p = null == (d = y.usage) ? void 0 : d.total_tokens)
                  ? p
                  : void 0,
              reasoningTokens:
                null != (m = null == x ? void 0 : x.reasoning_tokens)
                  ? m
                  : void 0,
              cachedInputTokens:
                null != (h = null == $ ? void 0 : $.cached_tokens) ? h : void 0,
            },
            request: { body: g },
            response: { ..._c(y), headers: v, body: b },
            warnings: f,
            providerMetadata: I,
          }
        );
      }
      async doStream(e) {
        const { args: t, warnings: n } = await this.getArgs(e),
          r = { ...t, stream: !0, stream_options: { include_usage: !0 } },
          { responseHeaders: o, value: i } = await rc({
            url: this.config.url({
              path: "/chat/completions",
              modelId: this.modelId,
            }),
            headers: Ru(this.config.headers(), e.headers),
            body: r,
            failedResponseHandler: $c,
            successfulResponseHandler: uc(Dc),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          }),
          a = [];
        let s = "unknown";
        const l = {
          inputTokens: void 0,
          outputTokens: void 0,
          totalTokens: void 0,
        };
        let u = !0,
          c = !1;
        const d = { openai: {} };
        return {
          stream: i.pipeThrough(
            new TransformStream({
              start(e) {
                e.enqueue({ type: "stream-start", warnings: n });
              },
              transform(t, n) {
                var r,
                  o,
                  i,
                  p,
                  m,
                  h,
                  g,
                  f,
                  v,
                  y,
                  b,
                  _,
                  w,
                  k,
                  x,
                  $,
                  I,
                  S,
                  T,
                  N,
                  O,
                  E,
                  A,
                  U;
                if (
                  (e.includeRawChunks &&
                    n.enqueue({ type: "raw", rawValue: t.rawValue }),
                  !t.success)
                )
                  return (
                    (s = "error"),
                    void n.enqueue({ type: "error", error: t.error })
                  );
                const C = t.value;
                if ("error" in C)
                  return (
                    (s = "error"),
                    void n.enqueue({ type: "error", error: C.error })
                  );
                (u &&
                  ((u = !1),
                  n.enqueue({ type: "response-metadata", ..._c(C) })),
                  null != C.usage &&
                    ((l.inputTokens =
                      null != (r = C.usage.prompt_tokens) ? r : void 0),
                    (l.outputTokens =
                      null != (o = C.usage.completion_tokens) ? o : void 0),
                    (l.totalTokens =
                      null != (i = C.usage.total_tokens) ? i : void 0),
                    (l.reasoningTokens =
                      null !=
                      (m =
                        null == (p = C.usage.completion_tokens_details)
                          ? void 0
                          : p.reasoning_tokens)
                        ? m
                        : void 0),
                    (l.cachedInputTokens =
                      null !=
                      (g =
                        null == (h = C.usage.prompt_tokens_details)
                          ? void 0
                          : h.cached_tokens)
                        ? g
                        : void 0),
                    null !=
                      (null == (f = C.usage.completion_tokens_details)
                        ? void 0
                        : f.accepted_prediction_tokens) &&
                      (d.openai.acceptedPredictionTokens =
                        null == (v = C.usage.completion_tokens_details)
                          ? void 0
                          : v.accepted_prediction_tokens),
                    null !=
                      (null == (y = C.usage.completion_tokens_details)
                        ? void 0
                        : y.rejected_prediction_tokens) &&
                      (d.openai.rejectedPredictionTokens =
                        null == (b = C.usage.completion_tokens_details)
                          ? void 0
                          : b.rejected_prediction_tokens)));
                const P = C.choices[0];
                if (
                  (null != (null == P ? void 0 : P.finish_reason) &&
                    (s = wc(P.finish_reason)),
                  null !=
                    (null == (_ = null == P ? void 0 : P.logprobs)
                      ? void 0
                      : _.content) && (d.openai.logprobs = P.logprobs.content),
                  null == (null == P ? void 0 : P.delta))
                )
                  return;
                const j = P.delta;
                if (
                  (null != j.content &&
                    (c ||
                      (n.enqueue({ type: "text-start", id: "0" }), (c = !0)),
                    n.enqueue({
                      type: "text-delta",
                      id: "0",
                      delta: j.content,
                    })),
                  null != j.tool_calls)
                )
                  for (const e of j.tool_calls) {
                    const t = e.index;
                    if (null == a[t]) {
                      if ("function" !== e.type)
                        throw new D({
                          data: e,
                          message: "Expected 'function' type.",
                        });
                      if (null == e.id)
                        throw new D({
                          data: e,
                          message: "Expected 'id' to be a string.",
                        });
                      if (null == (null == (w = e.function) ? void 0 : w.name))
                        throw new D({
                          data: e,
                          message: "Expected 'function.name' to be a string.",
                        });
                      (n.enqueue({
                        type: "tool-input-start",
                        id: e.id,
                        toolName: e.function.name,
                      }),
                        (a[t] = {
                          id: e.id,
                          type: "function",
                          function: {
                            name: e.function.name,
                            arguments:
                              null != (k = e.function.arguments) ? k : "",
                          },
                          hasFinished: !1,
                        }));
                      const r = a[t];
                      null != (null == (x = r.function) ? void 0 : x.name) &&
                        null !=
                          (null == ($ = r.function) ? void 0 : $.arguments) &&
                        (r.function.arguments.length > 0 &&
                          n.enqueue({
                            type: "tool-input-delta",
                            id: r.id,
                            delta: r.function.arguments,
                          }),
                        Qu(r.function.arguments) &&
                          (n.enqueue({ type: "tool-input-end", id: r.id }),
                          n.enqueue({
                            type: "tool-call",
                            toolCallId: null != (I = r.id) ? I : qu(),
                            toolName: r.function.name,
                            input: r.function.arguments,
                          }),
                          (r.hasFinished = !0)));
                      continue;
                    }
                    const r = a[t];
                    r.hasFinished ||
                      (null !=
                        (null == (S = e.function) ? void 0 : S.arguments) &&
                        (r.function.arguments +=
                          null !=
                          (N = null == (T = e.function) ? void 0 : T.arguments)
                            ? N
                            : ""),
                      n.enqueue({
                        type: "tool-input-delta",
                        id: r.id,
                        delta: null != (O = e.function.arguments) ? O : "",
                      }),
                      null != (null == (E = r.function) ? void 0 : E.name) &&
                        null !=
                          (null == (A = r.function) ? void 0 : A.arguments) &&
                        Qu(r.function.arguments) &&
                        (n.enqueue({ type: "tool-input-end", id: r.id }),
                        n.enqueue({
                          type: "tool-call",
                          toolCallId: null != (U = r.id) ? U : qu(),
                          toolName: r.function.name,
                          input: r.function.arguments,
                        }),
                        (r.hasFinished = !0)));
                  }
                if (null != j.annotations)
                  for (const e of j.annotations)
                    n.enqueue({
                      type: "source",
                      sourceType: "url",
                      id: qu(),
                      url: e.url,
                      title: e.title,
                    });
              },
              flush(e) {
                (c && e.enqueue({ type: "text-end", id: "0" }),
                  e.enqueue({
                    type: "finish",
                    finishReason: s,
                    usage: l,
                    ...(null != d ? { providerMetadata: d } : {}),
                  }));
              },
            }),
          ),
          request: { body: r },
          response: { headers: o },
        };
      }
    },
    Cc = ul({
      prompt_tokens: Zs().nullish(),
      completion_tokens: Zs().nullish(),
      total_tokens: Zs().nullish(),
      prompt_tokens_details: ul({ cached_tokens: Zs().nullish() }).nullish(),
      completion_tokens_details: ul({
        reasoning_tokens: Zs().nullish(),
        accepted_prediction_tokens: Zs().nullish(),
        rejected_prediction_tokens: Zs().nullish(),
      }).nullish(),
    }).nullish(),
    Pc = ul({
      id: ys().nullish(),
      created: Zs().nullish(),
      model: ys().nullish(),
      choices: sl(
        ul({
          message: ul({
            role: Sl("assistant").nullish(),
            content: ys().nullish(),
            tool_calls: sl(
              ul({
                id: ys().nullish(),
                type: Sl("function"),
                function: ul({ name: ys(), arguments: ys() }),
              }),
            ).nullish(),
            annotations: sl(
              ul({
                type: Sl("url_citation"),
                start_index: Zs(),
                end_index: Zs(),
                url: ys(),
                title: ys(),
              }),
            ).nullish(),
          }),
          index: Zs(),
          logprobs: ul({
            content: sl(
              ul({
                token: ys(),
                logprob: Zs(),
                top_logprobs: sl(ul({ token: ys(), logprob: Zs() })),
              }),
            ).nullish(),
          }).nullish(),
          finish_reason: ys().nullish(),
        }),
      ),
      usage: Cc,
    }),
    Dc = pl([
      ul({
        id: ys().nullish(),
        created: Zs().nullish(),
        model: ys().nullish(),
        choices: sl(
          ul({
            delta: ul({
              role: $l(["assistant"]).nullish(),
              content: ys().nullish(),
              tool_calls: sl(
                ul({
                  index: Zs(),
                  id: ys().nullish(),
                  type: Sl("function").nullish(),
                  function: ul({
                    name: ys().nullish(),
                    arguments: ys().nullish(),
                  }),
                }),
              ).nullish(),
              annotations: sl(
                ul({
                  type: Sl("url_citation"),
                  start_index: Zs(),
                  end_index: Zs(),
                  url: ys(),
                  title: ys(),
                }),
              ).nullish(),
            }).nullish(),
            logprobs: ul({
              content: sl(
                ul({
                  token: ys(),
                  logprob: Zs(),
                  top_logprobs: sl(ul({ token: ys(), logprob: Zs() })),
                }),
              ).nullish(),
            }).nullish(),
            finish_reason: ys().nullish(),
            index: Zs(),
          }),
        ),
        usage: Cc,
      }),
      xc,
    ]);
  function jc(e) {
    return e.startsWith("o") || e.startsWith("gpt-5");
  }
  function zc(e) {
    var t, n;
    return jc(e)
      ? null != (n = null == (t = Rc[e]) ? void 0 : t.systemMessageMode)
        ? n
        : "developer"
      : "system";
  }
  var Rc = {
      "o1-mini": { systemMessageMode: "remove" },
      "o1-mini-2024-09-12": { systemMessageMode: "remove" },
      "o1-preview": { systemMessageMode: "remove" },
      "o1-preview-2024-09-12": { systemMessageMode: "remove" },
      o3: { systemMessageMode: "developer" },
      "o3-2025-04-16": { systemMessageMode: "developer" },
      "o3-mini": { systemMessageMode: "developer" },
      "o3-mini-2025-01-31": { systemMessageMode: "developer" },
      "o4-mini": { systemMessageMode: "developer" },
      "o4-mini-2025-04-16": { systemMessageMode: "developer" },
    },
    Mc = ul({
      echo: Ws().optional(),
      logitBias: _l(ys(), Zs()).optional(),
      suffix: ys().optional(),
      user: ys().optional(),
      logprobs: pl([Ws(), Zs()]).optional(),
    }),
    qc = class {
      constructor(e, t) {
        ((this.specificationVersion = "v2"),
          (this.supportedUrls = {}),
          (this.modelId = e),
          (this.config = t));
      }
      get providerOptionsName() {
        return this.config.provider.split(".")[0].trim();
      }
      get provider() {
        return this.config.provider;
      }
      async getArgs({
        prompt: e,
        maxOutputTokens: t,
        temperature: n,
        topP: r,
        topK: o,
        frequencyPenalty: i,
        presencePenalty: a,
        stopSequences: s,
        responseFormat: l,
        tools: u,
        toolChoice: c,
        seed: d,
        providerOptions: p,
      }) {
        const m = [],
          h = {
            ...(await tc({
              provider: "openai",
              providerOptions: p,
              schema: Mc,
            })),
            ...(await tc({
              provider: this.providerOptionsName,
              providerOptions: p,
              schema: Mc,
            })),
          };
        (null != o && m.push({ type: "unsupported-setting", setting: "topK" }),
          (null == u ? void 0 : u.length) &&
            m.push({ type: "unsupported-setting", setting: "tools" }),
          null != c &&
            m.push({ type: "unsupported-setting", setting: "toolChoice" }),
          null != l &&
            "text" !== l.type &&
            m.push({
              type: "unsupported-setting",
              setting: "responseFormat",
              details: "JSON response format is not supported.",
            }));
        const { prompt: g, stopSequences: f } = (function ({
            prompt: e,
            user: t = "user",
            assistant: n = "assistant",
          }) {
            let r = "";
            "system" === e[0].role &&
              ((r += `${e[0].content}\n\n`), (e = e.slice(1)));
            for (const { role: o, content: i } of e)
              switch (o) {
                case "system":
                  throw new E({
                    message: "Unexpected system message in prompt: ${content}",
                    prompt: e,
                  });
                case "user":
                  r += `${t}:\n${i
                    .map((e) => {
                      if ("text" === e.type) return e.text;
                    })
                    .filter(Boolean)
                    .join("")}\n\n`;
                  break;
                case "assistant":
                  r += `${n}:\n${i
                    .map((e) => {
                      switch (e.type) {
                        case "text":
                          return e.text;
                        case "tool-call":
                          throw new fe({ functionality: "tool-call messages" });
                      }
                    })
                    .join("")}\n\n`;
                  break;
                case "tool":
                  throw new fe({ functionality: "tool messages" });
                default:
                  throw new Error(`Unsupported role: ${o}`);
              }
            return (
              (r += `${n}:\n`),
              { prompt: r, stopSequences: [`\n${t}:`] }
            );
          })({ prompt: e }),
          v = [...(null != f ? f : []), ...(null != s ? s : [])];
        return {
          args: {
            model: this.modelId,
            echo: h.echo,
            logit_bias: h.logitBias,
            logprobs:
              !0 === (null == h ? void 0 : h.logprobs)
                ? 0
                : !1 === (null == h ? void 0 : h.logprobs) || null == h
                  ? void 0
                  : h.logprobs,
            suffix: h.suffix,
            user: h.user,
            max_tokens: t,
            temperature: n,
            top_p: r,
            frequency_penalty: i,
            presence_penalty: a,
            seed: d,
            prompt: g,
            stop: v.length > 0 ? v : void 0,
          },
          warnings: m,
        };
      }
      async doGenerate(e) {
        var t, n, r;
        const { args: o, warnings: i } = await this.getArgs(e),
          {
            responseHeaders: a,
            value: s,
            rawValue: l,
          } = await rc({
            url: this.config.url({
              path: "/completions",
              modelId: this.modelId,
            }),
            headers: Ru(this.config.headers(), e.headers),
            body: o,
            failedResponseHandler: $c,
            successfulResponseHandler: cc(Lc),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          }),
          u = s.choices[0],
          c = { openai: {} };
        return (
          null != u.logprobs && (c.openai.logprobs = u.logprobs),
          {
            content: [{ type: "text", text: u.text }],
            usage: {
              inputTokens: null == (t = s.usage) ? void 0 : t.prompt_tokens,
              outputTokens:
                null == (n = s.usage) ? void 0 : n.completion_tokens,
              totalTokens: null == (r = s.usage) ? void 0 : r.total_tokens,
            },
            finishReason: wc(u.finish_reason),
            request: { body: o },
            response: { ..._c(s), headers: a, body: l },
            providerMetadata: c,
            warnings: i,
          }
        );
      }
      async doStream(e) {
        const { args: t, warnings: n } = await this.getArgs(e),
          r = { ...t, stream: !0, stream_options: { include_usage: !0 } },
          { responseHeaders: o, value: i } = await rc({
            url: this.config.url({
              path: "/completions",
              modelId: this.modelId,
            }),
            headers: Ru(this.config.headers(), e.headers),
            body: r,
            failedResponseHandler: $c,
            successfulResponseHandler: uc(Fc),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          });
        let a = "unknown";
        const s = { openai: {} },
          l = {
            inputTokens: void 0,
            outputTokens: void 0,
            totalTokens: void 0,
          };
        let u = !0;
        return {
          stream: i.pipeThrough(
            new TransformStream({
              start(e) {
                e.enqueue({ type: "stream-start", warnings: n });
              },
              transform(t, n) {
                if (
                  (e.includeRawChunks &&
                    n.enqueue({ type: "raw", rawValue: t.rawValue }),
                  !t.success)
                )
                  return (
                    (a = "error"),
                    void n.enqueue({ type: "error", error: t.error })
                  );
                const r = t.value;
                if ("error" in r)
                  return (
                    (a = "error"),
                    void n.enqueue({ type: "error", error: r.error })
                  );
                (u &&
                  ((u = !1),
                  n.enqueue({ type: "response-metadata", ..._c(r) }),
                  n.enqueue({ type: "text-start", id: "0" })),
                  null != r.usage &&
                    ((l.inputTokens = r.usage.prompt_tokens),
                    (l.outputTokens = r.usage.completion_tokens),
                    (l.totalTokens = r.usage.total_tokens)));
                const o = r.choices[0];
                (null != (null == o ? void 0 : o.finish_reason) &&
                  (a = wc(o.finish_reason)),
                  null != (null == o ? void 0 : o.logprobs) &&
                    (s.openai.logprobs = o.logprobs),
                  null != (null == o ? void 0 : o.text) &&
                    o.text.length > 0 &&
                    n.enqueue({ type: "text-delta", id: "0", delta: o.text }));
              },
              flush(e) {
                (u || e.enqueue({ type: "text-end", id: "0" }),
                  e.enqueue({
                    type: "finish",
                    finishReason: a,
                    providerMetadata: s,
                    usage: l,
                  }));
              },
            }),
          ),
          request: { body: r },
          response: { headers: o },
        };
      }
    },
    Zc = ul({
      prompt_tokens: Zs(),
      completion_tokens: Zs(),
      total_tokens: Zs(),
    }),
    Lc = ul({
      id: ys().nullish(),
      created: Zs().nullish(),
      model: ys().nullish(),
      choices: sl(
        ul({
          text: ys(),
          finish_reason: ys(),
          logprobs: ul({
            tokens: sl(ys()),
            token_logprobs: sl(Zs()),
            top_logprobs: sl(_l(ys(), Zs())).nullish(),
          }).nullish(),
        }),
      ),
      usage: Zc.nullish(),
    }),
    Fc = pl([
      ul({
        id: ys().nullish(),
        created: Zs().nullish(),
        model: ys().nullish(),
        choices: sl(
          ul({
            text: ys(),
            finish_reason: ys().nullish(),
            index: Zs(),
            logprobs: ul({
              tokens: sl(ys()),
              token_logprobs: sl(Zs()),
              top_logprobs: sl(_l(ys(), Zs())).nullish(),
            }).nullish(),
          }),
        ),
        usage: Zc.nullish(),
      }),
      xc,
    ]),
    Bc = ul({ dimensions: Zs().optional(), user: ys().optional() }),
    Wc = class {
      constructor(e, t) {
        ((this.specificationVersion = "v2"),
          (this.maxEmbeddingsPerCall = 2048),
          (this.supportsParallelCalls = !0),
          (this.modelId = e),
          (this.config = t));
      }
      get provider() {
        return this.config.provider;
      }
      async doEmbed({
        values: e,
        headers: t,
        abortSignal: n,
        providerOptions: r,
      }) {
        var o;
        if (e.length > this.maxEmbeddingsPerCall)
          throw new ae({
            provider: this.provider,
            modelId: this.modelId,
            maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
            values: e,
          });
        const i =
            null !=
            (o = await tc({
              provider: "openai",
              providerOptions: r,
              schema: Bc,
            }))
              ? o
              : {},
          {
            responseHeaders: a,
            value: s,
            rawValue: l,
          } = await rc({
            url: this.config.url({
              path: "/embeddings",
              modelId: this.modelId,
            }),
            headers: Ru(this.config.headers(), t),
            body: {
              model: this.modelId,
              input: e,
              encoding_format: "float",
              dimensions: i.dimensions,
              user: i.user,
            },
            failedResponseHandler: $c,
            successfulResponseHandler: cc(Hc),
            abortSignal: n,
            fetch: this.config.fetch,
          });
        return {
          embeddings: s.data.map((e) => e.embedding),
          usage: s.usage ? { tokens: s.usage.prompt_tokens } : void 0,
          response: { headers: a, body: l },
        };
      }
    },
    Hc = ul({
      data: sl(ul({ embedding: sl(Zs()) })),
      usage: ul({ prompt_tokens: Zs() }).nullish(),
    }),
    Vc = { "dall-e-3": 1, "dall-e-2": 10, "gpt-image-1": 10 },
    Jc = new Set(["gpt-image-1"]),
    Kc = class {
      constructor(e, t) {
        ((this.modelId = e),
          (this.config = t),
          (this.specificationVersion = "v2"));
      }
      get maxImagesPerCall() {
        var e;
        return null != (e = Vc[this.modelId]) ? e : 1;
      }
      get provider() {
        return this.config.provider;
      }
      async doGenerate({
        prompt: e,
        n: t,
        size: n,
        aspectRatio: r,
        seed: o,
        providerOptions: i,
        headers: a,
        abortSignal: s,
      }) {
        var l, u, c, d;
        const p = [];
        (null != r &&
          p.push({
            type: "unsupported-setting",
            setting: "aspectRatio",
            details:
              "This model does not support aspect ratio. Use `size` instead.",
          }),
          null != o &&
            p.push({ type: "unsupported-setting", setting: "seed" }));
        const m =
            null !=
            (c =
              null ==
              (u = null == (l = this.config._internal) ? void 0 : l.currentDate)
                ? void 0
                : u.call(l))
              ? c
              : new Date(),
          { value: h, responseHeaders: g } = await rc({
            url: this.config.url({
              path: "/images/generations",
              modelId: this.modelId,
            }),
            headers: Ru(this.config.headers(), a),
            body: {
              model: this.modelId,
              prompt: e,
              n: t,
              size: n,
              ...(null != (d = i.openai) ? d : {}),
              ...(Jc.has(this.modelId) ? {} : { response_format: "b64_json" }),
            },
            failedResponseHandler: $c,
            successfulResponseHandler: cc(Gc),
            abortSignal: s,
            fetch: this.config.fetch,
          });
        return {
          images: h.data.map((e) => e.b64_json),
          warnings: p,
          response: { timestamp: m, modelId: this.modelId, headers: g },
          providerMetadata: {
            openai: {
              images: h.data.map((e) =>
                e.revised_prompt ? { revisedPrompt: e.revised_prompt } : null,
              ),
            },
          },
        };
      }
    },
    Gc = ul({
      data: sl(ul({ b64_json: ys(), revised_prompt: ys().optional() })),
    }),
    Xc = { fileSearch: Oc, webSearchPreview: Ac },
    Yc = ul({
      include: sl(ys()).optional(),
      language: ys().optional(),
      prompt: ys().optional(),
      temperature: Zs().min(0).max(1).default(0).optional(),
      timestampGranularities: sl($l(["word", "segment"]))
        .default(["segment"])
        .optional(),
    }),
    Qc = {
      afrikaans: "af",
      arabic: "ar",
      armenian: "hy",
      azerbaijani: "az",
      belarusian: "be",
      bosnian: "bs",
      bulgarian: "bg",
      catalan: "ca",
      chinese: "zh",
      croatian: "hr",
      czech: "cs",
      danish: "da",
      dutch: "nl",
      english: "en",
      estonian: "et",
      finnish: "fi",
      french: "fr",
      galician: "gl",
      german: "de",
      greek: "el",
      hebrew: "he",
      hindi: "hi",
      hungarian: "hu",
      icelandic: "is",
      indonesian: "id",
      italian: "it",
      japanese: "ja",
      kannada: "kn",
      kazakh: "kk",
      korean: "ko",
      latvian: "lv",
      lithuanian: "lt",
      macedonian: "mk",
      malay: "ms",
      marathi: "mr",
      maori: "mi",
      nepali: "ne",
      norwegian: "no",
      persian: "fa",
      polish: "pl",
      portuguese: "pt",
      romanian: "ro",
      russian: "ru",
      serbian: "sr",
      slovak: "sk",
      slovenian: "sl",
      spanish: "es",
      swahili: "sw",
      swedish: "sv",
      tagalog: "tl",
      tamil: "ta",
      thai: "th",
      turkish: "tr",
      ukrainian: "uk",
      urdu: "ur",
      vietnamese: "vi",
      welsh: "cy",
    },
    ed = class {
      constructor(e, t) {
        ((this.modelId = e),
          (this.config = t),
          (this.specificationVersion = "v2"));
      }
      get provider() {
        return this.config.provider;
      }
      async getArgs({ audio: e, mediaType: t, providerOptions: n }) {
        const r = await tc({
            provider: "openai",
            providerOptions: n,
            schema: Yc,
          }),
          o = new FormData(),
          i = e instanceof Uint8Array ? new Blob([e]) : new Blob([vc(e)]);
        if (
          (o.append("model", this.modelId),
          o.append("file", new File([i], "audio", { type: t })),
          r)
        ) {
          const e = {
            include: r.include,
            language: r.language,
            prompt: r.prompt,
            temperature: r.temperature,
            timestamp_granularities: r.timestampGranularities,
          };
          for (const [t, n] of Object.entries(e))
            null != n && o.append(t, String(n));
        }
        return { formData: o, warnings: [] };
      }
      async doGenerate(e) {
        var t, n, r, o, i, a;
        const s =
            null !=
            (r =
              null ==
              (n = null == (t = this.config._internal) ? void 0 : t.currentDate)
                ? void 0
                : n.call(t))
              ? r
              : new Date(),
          { formData: l, warnings: u } = await this.getArgs(e),
          {
            value: c,
            responseHeaders: d,
            rawValue: p,
          } = await (async ({
            url: e,
            headers: t,
            formData: n,
            failedResponseHandler: r,
            successfulResponseHandler: o,
            abortSignal: i,
            fetch: a,
          }) =>
            oc({
              url: e,
              headers: t,
              body: { content: n, values: Object.fromEntries(n.entries()) },
              failedResponseHandler: r,
              successfulResponseHandler: o,
              abortSignal: i,
              fetch: a,
            }))({
            url: this.config.url({
              path: "/audio/transcriptions",
              modelId: this.modelId,
            }),
            headers: Ru(this.config.headers(), e.headers),
            formData: l,
            failedResponseHandler: $c,
            successfulResponseHandler: cc(td),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          }),
          m = null != c.language && c.language in Qc ? Qc[c.language] : void 0;
        return {
          text: c.text,
          segments:
            null !=
            (i =
              null == (o = c.words)
                ? void 0
                : o.map((e) => ({
                    text: e.word,
                    startSecond: e.start,
                    endSecond: e.end,
                  })))
              ? i
              : [],
          language: m,
          durationInSeconds: null != (a = c.duration) ? a : void 0,
          warnings: u,
          response: {
            timestamp: s,
            modelId: this.modelId,
            headers: d,
            body: p,
          },
        };
      }
    },
    td = ul({
      text: ys(),
      language: ys().nullish(),
      duration: Zs().nullish(),
      words: sl(ul({ word: ys(), start: Zs(), end: Zs() })).nullish(),
    }),
    nd = ul({
      itemId: ys().nullish(),
      reasoningEncryptedContent: ys().nullish(),
    });
  function rd({ finishReason: e, hasToolCalls: t }) {
    switch (e) {
      case void 0:
      case null:
        return t ? "tool-calls" : "stop";
      case "max_output_tokens":
        return "length";
      case "content_filter":
        return "content-filter";
      default:
        return t ? "tool-calls" : "unknown";
    }
  }
  var od = class {
      constructor(e, t) {
        ((this.specificationVersion = "v2"),
          (this.supportedUrls = { "image/*": [/^https?:\/\/.*$/] }),
          (this.modelId = e),
          (this.config = t));
      }
      get provider() {
        return this.config.provider;
      }
      async getArgs({
        maxOutputTokens: e,
        temperature: t,
        stopSequences: n,
        topP: r,
        topK: o,
        presencePenalty: i,
        frequencyPenalty: a,
        seed: s,
        prompt: l,
        providerOptions: u,
        tools: c,
        toolChoice: d,
        responseFormat: p,
      }) {
        var m, h;
        const g = [],
          f = (function (e) {
            return e.startsWith("o") ||
              e.startsWith("gpt-5") ||
              e.startsWith("codex-") ||
              e.startsWith("computer-use")
              ? e.startsWith("o1-mini") || e.startsWith("o1-preview")
                ? {
                    isReasoningModel: !0,
                    systemMessageMode: "remove",
                    requiredAutoTruncation: !1,
                  }
                : {
                    isReasoningModel: !0,
                    systemMessageMode: "developer",
                    requiredAutoTruncation: !1,
                  }
              : {
                  isReasoningModel: !1,
                  systemMessageMode: "system",
                  requiredAutoTruncation: !1,
                };
          })(this.modelId);
        (null != o && g.push({ type: "unsupported-setting", setting: "topK" }),
          null != s && g.push({ type: "unsupported-setting", setting: "seed" }),
          null != i &&
            g.push({ type: "unsupported-setting", setting: "presencePenalty" }),
          null != a &&
            g.push({
              type: "unsupported-setting",
              setting: "frequencyPenalty",
            }),
          null != n &&
            g.push({ type: "unsupported-setting", setting: "stopSequences" }));
        const { messages: v, warnings: y } = await (async function ({
          prompt: e,
          systemMessageMode: t,
        }) {
          var n, r, o, i, a, s;
          const l = [],
            u = [];
          for (const { role: c, content: d } of e)
            switch (c) {
              case "system":
                switch (t) {
                  case "system":
                    l.push({ role: "system", content: d });
                    break;
                  case "developer":
                    l.push({ role: "developer", content: d });
                    break;
                  case "remove":
                    u.push({
                      type: "other",
                      message: "system messages are removed for this model",
                    });
                    break;
                  default:
                    throw new Error(`Unsupported system message mode: ${t}`);
                }
                break;
              case "user":
                l.push({
                  role: "user",
                  content: d.map((e, t) => {
                    var n, r, o;
                    switch (e.type) {
                      case "text":
                        return { type: "input_text", text: e.text };
                      case "file":
                        if (e.mediaType.startsWith("image/")) {
                          const t =
                            "image/*" === e.mediaType
                              ? "image/jpeg"
                              : e.mediaType;
                          return {
                            type: "input_image",
                            ...(e.data instanceof URL
                              ? { image_url: e.data.toString() }
                              : "string" == typeof e.data &&
                                  e.data.startsWith("file-")
                                ? { file_id: e.data }
                                : { image_url: `data:${t};base64,${e.data}` }),
                            detail:
                              null ==
                              (r =
                                null == (n = e.providerOptions)
                                  ? void 0
                                  : n.openai)
                                ? void 0
                                : r.imageDetail,
                          };
                        }
                        if ("application/pdf" === e.mediaType) {
                          if (e.data instanceof URL)
                            throw new fe({
                              functionality: "PDF file parts with URLs",
                            });
                          return {
                            type: "input_file",
                            ...("string" == typeof e.data &&
                            e.data.startsWith("file-")
                              ? { file_id: e.data }
                              : {
                                  filename:
                                    null != (o = e.filename)
                                      ? o
                                      : `part-${t}.pdf`,
                                  file_data: `data:application/pdf;base64,${yc(e.data)}`,
                                }),
                          };
                        }
                        throw new fe({
                          functionality: `file part media type ${e.mediaType}`,
                        });
                    }
                  }),
                });
                break;
              case "assistant": {
                const e = {};
                for (const t of d)
                  switch (t.type) {
                    case "text":
                      l.push({
                        role: "assistant",
                        content: [{ type: "output_text", text: t.text }],
                        id:
                          null !=
                          (o =
                            null ==
                            (r =
                              null == (n = t.providerOptions)
                                ? void 0
                                : n.openai)
                              ? void 0
                              : r.itemId)
                            ? o
                            : void 0,
                      });
                      break;
                    case "tool-call":
                      if (t.providerExecuted) break;
                      l.push({
                        type: "function_call",
                        call_id: t.toolCallId,
                        name: t.toolName,
                        arguments: JSON.stringify(t.input),
                        id:
                          null !=
                          (s =
                            null ==
                            (a =
                              null == (i = t.providerOptions)
                                ? void 0
                                : i.openai)
                              ? void 0
                              : a.itemId)
                            ? s
                            : void 0,
                      });
                      break;
                    case "tool-result":
                      u.push({
                        type: "other",
                        message:
                          "tool result parts in assistant messages are not supported for OpenAI responses",
                      });
                      break;
                    case "reasoning": {
                      const n = await tc({
                          provider: "openai",
                          providerOptions: t.providerOptions,
                          schema: nd,
                        }),
                        r = null == n ? void 0 : n.itemId;
                      if (null != r) {
                        const o = e[r],
                          i = [];
                        (t.text.length > 0
                          ? i.push({ type: "summary_text", text: t.text })
                          : void 0 !== o &&
                            u.push({
                              type: "other",
                              message: `Cannot append empty reasoning part to existing reasoning sequence. Skipping reasoning part: ${JSON.stringify(t)}.`,
                            }),
                          void 0 === o
                            ? ((e[r] = {
                                type: "reasoning",
                                id: r,
                                encrypted_content:
                                  null == n
                                    ? void 0
                                    : n.reasoningEncryptedContent,
                                summary: i,
                              }),
                              l.push(e[r]))
                            : o.summary.push(...i));
                      } else
                        u.push({
                          type: "other",
                          message: `Non-OpenAI reasoning parts are not supported. Skipping reasoning part: ${JSON.stringify(t)}.`,
                        });
                      break;
                    }
                  }
                break;
              }
              case "tool":
                for (const e of d) {
                  const t = e.output;
                  let n;
                  switch (t.type) {
                    case "text":
                    case "error-text":
                      n = t.value;
                      break;
                    case "content":
                    case "json":
                    case "error-json":
                      n = JSON.stringify(t.value);
                  }
                  l.push({
                    type: "function_call_output",
                    call_id: e.toolCallId,
                    output: n,
                  });
                }
                break;
              default:
                throw new Error(`Unsupported role: ${c}`);
            }
          return { messages: l, warnings: u };
        })({ prompt: l, systemMessageMode: f.systemMessageMode });
        g.push(...y);
        const b = await tc({
            provider: "openai",
            providerOptions: u,
            schema: dd,
          }),
          _ = null != (m = null == b ? void 0 : b.strictJsonSchema) && m,
          w = {
            model: this.modelId,
            input: v,
            temperature: t,
            top_p: r,
            max_output_tokens: e,
            ...("json" === (null == p ? void 0 : p.type) && {
              text: {
                format:
                  null != p.schema
                    ? {
                        type: "json_schema",
                        strict: _,
                        name: null != (h = p.name) ? h : "response",
                        description: p.description,
                        schema: p.schema,
                      }
                    : { type: "json_object" },
              },
            }),
            metadata: null == b ? void 0 : b.metadata,
            parallel_tool_calls: null == b ? void 0 : b.parallelToolCalls,
            previous_response_id: null == b ? void 0 : b.previousResponseId,
            store: null == b ? void 0 : b.store,
            user: null == b ? void 0 : b.user,
            instructions: null == b ? void 0 : b.instructions,
            service_tier: null == b ? void 0 : b.serviceTier,
            include: null == b ? void 0 : b.include,
            ...(f.isReasoningModel &&
              (null != (null == b ? void 0 : b.reasoningEffort) ||
                null != (null == b ? void 0 : b.reasoningSummary)) && {
                reasoning: {
                  ...(null != (null == b ? void 0 : b.reasoningEffort) && {
                    effort: b.reasoningEffort,
                  }),
                  ...(null != (null == b ? void 0 : b.reasoningSummary) && {
                    summary: b.reasoningSummary,
                  }),
                },
              }),
            ...(f.requiredAutoTruncation && { truncation: "auto" }),
          };
        var k;
        (f.isReasoningModel
          ? (null != w.temperature &&
              ((w.temperature = void 0),
              g.push({
                type: "unsupported-setting",
                setting: "temperature",
                details: "temperature is not supported for reasoning models",
              })),
            null != w.top_p &&
              ((w.top_p = void 0),
              g.push({
                type: "unsupported-setting",
                setting: "topP",
                details: "topP is not supported for reasoning models",
              })))
          : (null != (null == b ? void 0 : b.reasoningEffort) &&
              g.push({
                type: "unsupported-setting",
                setting: "reasoningEffort",
                details:
                  "reasoningEffort is not supported for non-reasoning models",
              }),
            null != (null == b ? void 0 : b.reasoningSummary) &&
              g.push({
                type: "unsupported-setting",
                setting: "reasoningSummary",
                details:
                  "reasoningSummary is not supported for non-reasoning models",
              })),
          "flex" !== (null == b ? void 0 : b.serviceTier) ||
            (k = this.modelId).startsWith("o3") ||
            k.startsWith("o4-mini") ||
            (g.push({
              type: "unsupported-setting",
              setting: "serviceTier",
              details:
                "flex processing is only available for o3 and o4-mini models",
            }),
            delete w.service_tier),
          "priority" !== (null == b ? void 0 : b.serviceTier) ||
            (function (e) {
              return (
                e.startsWith("gpt-4") ||
                e.startsWith("o3") ||
                e.startsWith("o4-mini")
              );
            })(this.modelId) ||
            (g.push({
              type: "unsupported-setting",
              setting: "serviceTier",
              details:
                "priority processing is only available for supported models (GPT-4, o3, o4-mini) and requires Enterprise access",
            }),
            delete w.service_tier));
        const {
          tools: x,
          toolChoice: $,
          toolWarnings: I,
        } = (function ({ tools: e, toolChoice: t, strictJsonSchema: n }) {
          const r = [];
          if (null == (e = (null == e ? void 0 : e.length) ? e : void 0))
            return { tools: void 0, toolChoice: void 0, toolWarnings: r };
          const o = [];
          for (const t of e)
            switch (t.type) {
              case "function":
                o.push({
                  type: "function",
                  name: t.name,
                  description: t.description,
                  parameters: t.inputSchema,
                  strict: n,
                });
                break;
              case "provider-defined":
                switch (t.id) {
                  case "openai.file_search": {
                    const e = Nc.parse(t.args);
                    o.push({
                      type: "file_search",
                      vector_store_ids: e.vectorStoreIds,
                      max_num_results: e.maxNumResults,
                      ranking_options: e.ranking
                        ? { ranker: e.ranking.ranker }
                        : void 0,
                      filters: e.filters,
                    });
                    break;
                  }
                  case "openai.web_search_preview":
                    o.push({
                      type: "web_search_preview",
                      search_context_size: t.args.searchContextSize,
                      user_location: t.args.userLocation,
                    });
                    break;
                  default:
                    r.push({ type: "unsupported-tool", tool: t });
                }
                break;
              default:
                r.push({ type: "unsupported-tool", tool: t });
            }
          if (null == t)
            return { tools: o, toolChoice: void 0, toolWarnings: r };
          const i = t.type;
          switch (i) {
            case "auto":
            case "none":
            case "required":
              return { tools: o, toolChoice: i, toolWarnings: r };
            case "tool":
              return {
                tools: o,
                toolChoice:
                  "file_search" === t.toolName
                    ? { type: "file_search" }
                    : "web_search_preview" === t.toolName
                      ? { type: "web_search_preview" }
                      : { type: "function", name: t.toolName },
                toolWarnings: r,
              };
            default:
              throw new fe({ functionality: `tool choice type: ${i}` });
          }
        })({ tools: c, toolChoice: d, strictJsonSchema: _ });
        return {
          args: { ...w, tools: x, tool_choice: $ },
          warnings: [...g, ...I],
        };
      }
      async doGenerate(e) {
        var t, n, r, o, i, a, s, l, u;
        const { args: c, warnings: d } = await this.getArgs(e),
          p = this.config.url({ path: "/responses", modelId: this.modelId }),
          {
            responseHeaders: m,
            value: g,
            rawValue: f,
          } = await rc({
            url: p,
            headers: Ru(this.config.headers(), e.headers),
            body: c,
            failedResponseHandler: $c,
            successfulResponseHandler: cc(
              ul({
                id: ys(),
                created_at: Zs(),
                error: ul({ code: ys(), message: ys() }).nullish(),
                model: ys(),
                output: sl(
                  hl("type", [
                    ul({
                      type: Sl("message"),
                      role: Sl("assistant"),
                      id: ys(),
                      content: sl(
                        ul({
                          type: Sl("output_text"),
                          text: ys(),
                          annotations: sl(
                            ul({
                              type: Sl("url_citation"),
                              start_index: Zs(),
                              end_index: Zs(),
                              url: ys(),
                              title: ys(),
                            }),
                          ),
                        }),
                      ),
                    }),
                    ul({
                      type: Sl("function_call"),
                      call_id: ys(),
                      name: ys(),
                      arguments: ys(),
                      id: ys(),
                    }),
                    ul({
                      type: Sl("web_search_call"),
                      id: ys(),
                      status: ys().optional(),
                    }),
                    ul({
                      type: Sl("computer_call"),
                      id: ys(),
                      status: ys().optional(),
                    }),
                    ul({
                      type: Sl("file_search_call"),
                      id: ys(),
                      status: ys().optional(),
                    }),
                    ul({
                      type: Sl("reasoning"),
                      id: ys(),
                      encrypted_content: ys().nullish(),
                      summary: sl(ul({ type: Sl("summary_text"), text: ys() })),
                    }),
                  ]),
                ),
                incomplete_details: ul({ reason: ys() }).nullable(),
                usage: id,
              }),
            ),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          });
        if (g.error)
          throw new h({
            message: g.error.message,
            url: p,
            requestBodyValues: c,
            statusCode: 400,
            responseHeaders: m,
            responseBody: f,
            isRetryable: !1,
          });
        const v = [];
        for (const e of g.output)
          switch (e.type) {
            case "reasoning":
              0 === e.summary.length &&
                e.summary.push({ type: "summary_text", text: "" });
              for (const n of e.summary)
                v.push({
                  type: "reasoning",
                  text: n.text,
                  providerMetadata: {
                    openai: {
                      itemId: e.id,
                      reasoningEncryptedContent:
                        null != (t = e.encrypted_content) ? t : null,
                    },
                  },
                });
              break;
            case "message":
              for (const t of e.content) {
                v.push({
                  type: "text",
                  text: t.text,
                  providerMetadata: { openai: { itemId: e.id } },
                });
                for (const e of t.annotations)
                  v.push({
                    type: "source",
                    sourceType: "url",
                    id:
                      null !=
                      (o =
                        null == (r = (n = this.config).generateId)
                          ? void 0
                          : r.call(n))
                        ? o
                        : qu(),
                    url: e.url,
                    title: e.title,
                  });
              }
              break;
            case "function_call":
              v.push({
                type: "tool-call",
                toolCallId: e.call_id,
                toolName: e.name,
                input: e.arguments,
                providerMetadata: { openai: { itemId: e.id } },
              });
              break;
            case "web_search_call":
              (v.push({
                type: "tool-call",
                toolCallId: e.id,
                toolName: "web_search_preview",
                input: "",
                providerExecuted: !0,
              }),
                v.push({
                  type: "tool-result",
                  toolCallId: e.id,
                  toolName: "web_search_preview",
                  result: { status: e.status || "completed" },
                  providerExecuted: !0,
                }));
              break;
            case "computer_call":
              (v.push({
                type: "tool-call",
                toolCallId: e.id,
                toolName: "computer_use",
                input: "",
                providerExecuted: !0,
              }),
                v.push({
                  type: "tool-result",
                  toolCallId: e.id,
                  toolName: "computer_use",
                  result: {
                    type: "computer_use_tool_result",
                    status: e.status || "completed",
                  },
                  providerExecuted: !0,
                }));
              break;
            case "file_search_call":
              (v.push({
                type: "tool-call",
                toolCallId: e.id,
                toolName: "file_search",
                input: "",
                providerExecuted: !0,
              }),
                v.push({
                  type: "tool-result",
                  toolCallId: e.id,
                  toolName: "file_search",
                  result: {
                    type: "file_search_tool_result",
                    status: e.status || "completed",
                  },
                  providerExecuted: !0,
                }));
          }
        return {
          content: v,
          finishReason: rd({
            finishReason:
              null == (i = g.incomplete_details) ? void 0 : i.reason,
            hasToolCalls: v.some((e) => "tool-call" === e.type),
          }),
          usage: {
            inputTokens: g.usage.input_tokens,
            outputTokens: g.usage.output_tokens,
            totalTokens: g.usage.input_tokens + g.usage.output_tokens,
            reasoningTokens:
              null !=
              (s =
                null == (a = g.usage.output_tokens_details)
                  ? void 0
                  : a.reasoning_tokens)
                ? s
                : void 0,
            cachedInputTokens:
              null !=
              (u =
                null == (l = g.usage.input_tokens_details)
                  ? void 0
                  : l.cached_tokens)
                ? u
                : void 0,
          },
          request: { body: c },
          response: {
            id: g.id,
            timestamp: new Date(1e3 * g.created_at),
            modelId: g.model,
            headers: m,
            body: f,
          },
          providerMetadata: { openai: { responseId: g.id } },
          warnings: d,
        };
      }
      async doStream(e) {
        const { args: t, warnings: n } = await this.getArgs(e),
          { responseHeaders: r, value: o } = await rc({
            url: this.config.url({ path: "/responses", modelId: this.modelId }),
            headers: Ru(this.config.headers(), e.headers),
            body: { ...t, stream: !0 },
            failedResponseHandler: $c,
            successfulResponseHandler: uc(ld),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          }),
          i = this;
        let a = "unknown";
        const s = {
          inputTokens: void 0,
          outputTokens: void 0,
          totalTokens: void 0,
        };
        let l = null;
        const u = {};
        let c = !1;
        const d = {};
        return {
          stream: o.pipeThrough(
            new TransformStream({
              start(e) {
                e.enqueue({ type: "stream-start", warnings: n });
              },
              transform(t, n) {
                var r, o, p, m, h, g, f, v, y, b, _, w, k;
                if (
                  (e.includeRawChunks &&
                    n.enqueue({ type: "raw", rawValue: t.rawValue }),
                  !t.success)
                )
                  return (
                    (a = "error"),
                    void n.enqueue({ type: "error", error: t.error })
                  );
                const x = t.value;
                if (cd(x))
                  "function_call" === x.item.type
                    ? ((u[x.output_index] = {
                        toolName: x.item.name,
                        toolCallId: x.item.call_id,
                      }),
                      n.enqueue({
                        type: "tool-input-start",
                        id: x.item.call_id,
                        toolName: x.item.name,
                      }))
                    : "web_search_call" === x.item.type
                      ? ((u[x.output_index] = {
                          toolName: "web_search_preview",
                          toolCallId: x.item.id,
                        }),
                        n.enqueue({
                          type: "tool-input-start",
                          id: x.item.id,
                          toolName: "web_search_preview",
                        }))
                      : "computer_call" === x.item.type
                        ? ((u[x.output_index] = {
                            toolName: "computer_use",
                            toolCallId: x.item.id,
                          }),
                          n.enqueue({
                            type: "tool-input-start",
                            id: x.item.id,
                            toolName: "computer_use",
                          }))
                        : "message" === x.item.type
                          ? n.enqueue({
                              type: "text-start",
                              id: x.item.id,
                              providerMetadata: {
                                openai: { itemId: x.item.id },
                              },
                            })
                          : (function (e) {
                              return cd(e) && "reasoning" === e.item.type;
                            })(x) &&
                            ((d[x.item.id] = {
                              encryptedContent: x.item.encrypted_content,
                              summaryParts: [0],
                            }),
                            n.enqueue({
                              type: "reasoning-start",
                              id: `${x.item.id}:0`,
                              providerMetadata: {
                                openai: {
                                  itemId: x.item.id,
                                  reasoningEncryptedContent:
                                    null != (r = x.item.encrypted_content)
                                      ? r
                                      : null,
                                },
                              },
                            }));
                else if (ud(x)) {
                  if ("function_call" === x.item.type)
                    ((u[x.output_index] = void 0),
                      (c = !0),
                      n.enqueue({ type: "tool-input-end", id: x.item.call_id }),
                      n.enqueue({
                        type: "tool-call",
                        toolCallId: x.item.call_id,
                        toolName: x.item.name,
                        input: x.item.arguments,
                        providerMetadata: { openai: { itemId: x.item.id } },
                      }));
                  else if ("web_search_call" === x.item.type)
                    ((u[x.output_index] = void 0),
                      (c = !0),
                      n.enqueue({ type: "tool-input-end", id: x.item.id }),
                      n.enqueue({
                        type: "tool-call",
                        toolCallId: x.item.id,
                        toolName: "web_search_preview",
                        input: "",
                        providerExecuted: !0,
                      }),
                      n.enqueue({
                        type: "tool-result",
                        toolCallId: x.item.id,
                        toolName: "web_search_preview",
                        result: {
                          type: "web_search_tool_result",
                          status: x.item.status || "completed",
                        },
                        providerExecuted: !0,
                      }));
                  else if ("computer_call" === x.item.type)
                    ((u[x.output_index] = void 0),
                      (c = !0),
                      n.enqueue({ type: "tool-input-end", id: x.item.id }),
                      n.enqueue({
                        type: "tool-call",
                        toolCallId: x.item.id,
                        toolName: "computer_use",
                        input: "",
                        providerExecuted: !0,
                      }),
                      n.enqueue({
                        type: "tool-result",
                        toolCallId: x.item.id,
                        toolName: "computer_use",
                        result: {
                          type: "computer_use_tool_result",
                          status: x.item.status || "completed",
                        },
                        providerExecuted: !0,
                      }));
                  else if ("message" === x.item.type)
                    n.enqueue({ type: "text-end", id: x.item.id });
                  else if (
                    (function (e) {
                      return ud(e) && "reasoning" === e.item.type;
                    })(x)
                  ) {
                    const e = d[x.item.id];
                    for (const t of e.summaryParts)
                      n.enqueue({
                        type: "reasoning-end",
                        id: `${x.item.id}:${t}`,
                        providerMetadata: {
                          openai: {
                            itemId: x.item.id,
                            reasoningEncryptedContent:
                              null != (o = x.item.encrypted_content) ? o : null,
                          },
                        },
                      });
                    delete d[x.item.id];
                  }
                } else if (
                  (function (e) {
                    return "response.function_call_arguments.delta" === e.type;
                  })(x)
                ) {
                  const e = u[x.output_index];
                  null != e &&
                    n.enqueue({
                      type: "tool-input-delta",
                      id: e.toolCallId,
                      delta: x.delta,
                    });
                } else
                  !(function (e) {
                    return "response.created" === e.type;
                  })(x)
                    ? (function (e) {
                        return "response.output_text.delta" === e.type;
                      })(x)
                      ? n.enqueue({
                          type: "text-delta",
                          id: x.item_id,
                          delta: x.delta,
                        })
                      : (function (e) {
                            return (
                              "response.reasoning_summary_part.added" === e.type
                            );
                          })(x)
                        ? x.summary_index > 0 &&
                          (null == (p = d[x.item_id]) ||
                            p.summaryParts.push(x.summary_index),
                          n.enqueue({
                            type: "reasoning-start",
                            id: `${x.item_id}:${x.summary_index}`,
                            providerMetadata: {
                              openai: {
                                itemId: x.item_id,
                                reasoningEncryptedContent:
                                  null !=
                                  (h =
                                    null == (m = d[x.item_id])
                                      ? void 0
                                      : m.encryptedContent)
                                    ? h
                                    : null,
                              },
                            },
                          }))
                        : (function (e) {
                              return (
                                "response.reasoning_summary_text.delta" ===
                                e.type
                              );
                            })(x)
                          ? n.enqueue({
                              type: "reasoning-delta",
                              id: `${x.item_id}:${x.summary_index}`,
                              delta: x.delta,
                              providerMetadata: {
                                openai: { itemId: x.item_id },
                              },
                            })
                          : (function (e) {
                                return (
                                  "response.completed" === e.type ||
                                  "response.incomplete" === e.type
                                );
                              })(x)
                            ? ((a = rd({
                                finishReason:
                                  null == (g = x.response.incomplete_details)
                                    ? void 0
                                    : g.reason,
                                hasToolCalls: c,
                              })),
                              (s.inputTokens = x.response.usage.input_tokens),
                              (s.outputTokens = x.response.usage.output_tokens),
                              (s.totalTokens =
                                x.response.usage.input_tokens +
                                x.response.usage.output_tokens),
                              (s.reasoningTokens =
                                null !=
                                (v =
                                  null ==
                                  (f = x.response.usage.output_tokens_details)
                                    ? void 0
                                    : f.reasoning_tokens)
                                  ? v
                                  : void 0),
                              (s.cachedInputTokens =
                                null !=
                                (b =
                                  null ==
                                  (y = x.response.usage.input_tokens_details)
                                    ? void 0
                                    : y.cached_tokens)
                                  ? b
                                  : void 0))
                            : (function (e) {
                                  return (
                                    "response.output_text.annotation.added" ===
                                    e.type
                                  );
                                })(x)
                              ? n.enqueue({
                                  type: "source",
                                  sourceType: "url",
                                  id:
                                    null !=
                                    (k =
                                      null == (w = (_ = i.config).generateId)
                                        ? void 0
                                        : w.call(_))
                                      ? k
                                      : qu(),
                                  url: x.annotation.url,
                                  title: x.annotation.title,
                                })
                              : (function (e) {
                                  return "error" === e.type;
                                })(x) && n.enqueue({ type: "error", error: x })
                    : ((l = x.response.id),
                      n.enqueue({
                        type: "response-metadata",
                        id: x.response.id,
                        timestamp: new Date(1e3 * x.response.created_at),
                        modelId: x.response.model,
                      }));
              },
              flush(e) {
                e.enqueue({
                  type: "finish",
                  finishReason: a,
                  usage: s,
                  providerMetadata: { openai: { responseId: l } },
                });
              },
            }),
          ),
          request: { body: t },
          response: { headers: r },
        };
      }
    },
    id = ul({
      input_tokens: Zs(),
      input_tokens_details: ul({ cached_tokens: Zs().nullish() }).nullish(),
      output_tokens: Zs(),
      output_tokens_details: ul({ reasoning_tokens: Zs().nullish() }).nullish(),
    }),
    ad = ul({
      type: Sl("response.output_text.delta"),
      item_id: ys(),
      delta: ys(),
    }),
    sd = ul({
      type: Sl("error"),
      code: ys(),
      message: ys(),
      param: ys().nullish(),
      sequence_number: Zs(),
    }),
    ld = pl([
      ad,
      ul({
        type: $l(["response.completed", "response.incomplete"]),
        response: ul({
          incomplete_details: ul({ reason: ys() }).nullish(),
          usage: id,
        }),
      }),
      ul({
        type: Sl("response.created"),
        response: ul({ id: ys(), created_at: Zs(), model: ys() }),
      }),
      ul({
        type: Sl("response.output_item.added"),
        output_index: Zs(),
        item: hl("type", [
          ul({ type: Sl("message"), id: ys() }),
          ul({
            type: Sl("reasoning"),
            id: ys(),
            encrypted_content: ys().nullish(),
          }),
          ul({
            type: Sl("function_call"),
            id: ys(),
            call_id: ys(),
            name: ys(),
            arguments: ys(),
          }),
          ul({ type: Sl("web_search_call"), id: ys(), status: ys() }),
          ul({ type: Sl("computer_call"), id: ys(), status: ys() }),
          ul({ type: Sl("file_search_call"), id: ys(), status: ys() }),
        ]),
      }),
      ul({
        type: Sl("response.output_item.done"),
        output_index: Zs(),
        item: hl("type", [
          ul({ type: Sl("message"), id: ys() }),
          ul({
            type: Sl("reasoning"),
            id: ys(),
            encrypted_content: ys().nullish(),
          }),
          ul({
            type: Sl("function_call"),
            id: ys(),
            call_id: ys(),
            name: ys(),
            arguments: ys(),
            status: Sl("completed"),
          }),
          ul({
            type: Sl("web_search_call"),
            id: ys(),
            status: Sl("completed"),
          }),
          ul({ type: Sl("computer_call"), id: ys(), status: Sl("completed") }),
          ul({
            type: Sl("file_search_call"),
            id: ys(),
            status: Sl("completed"),
          }),
        ]),
      }),
      ul({
        type: Sl("response.function_call_arguments.delta"),
        item_id: ys(),
        output_index: Zs(),
        delta: ys(),
      }),
      ul({
        type: Sl("response.output_text.annotation.added"),
        annotation: ul({ type: Sl("url_citation"), url: ys(), title: ys() }),
      }),
      ul({
        type: Sl("response.reasoning_summary_part.added"),
        item_id: ys(),
        summary_index: Zs(),
      }),
      ul({
        type: Sl("response.reasoning_summary_text.delta"),
        item_id: ys(),
        summary_index: Zs(),
        delta: ys(),
      }),
      sd,
      ul({ type: ys() }).loose(),
    ]);
  function ud(e) {
    return "response.output_item.done" === e.type;
  }
  function cd(e) {
    return "response.output_item.added" === e.type;
  }
  var dd = ul({
      metadata: Qs().nullish(),
      parallelToolCalls: Ws().nullish(),
      previousResponseId: ys().nullish(),
      store: Ws().nullish(),
      user: ys().nullish(),
      reasoningEffort: ys().nullish(),
      strictJsonSchema: Ws().nullish(),
      instructions: ys().nullish(),
      reasoningSummary: ys().nullish(),
      serviceTier: $l(["auto", "flex", "priority"]).nullish(),
      include: sl(
        $l(["reasoning.encrypted_content", "file_search_call.results"]),
      ).nullish(),
    }),
    pd = ul({
      instructions: ys().nullish(),
      speed: Zs().min(0.25).max(4).default(1).nullish(),
    }),
    md = class {
      constructor(e, t) {
        ((this.modelId = e),
          (this.config = t),
          (this.specificationVersion = "v2"));
      }
      get provider() {
        return this.config.provider;
      }
      async getArgs({
        text: e,
        voice: t = "alloy",
        outputFormat: n = "mp3",
        speed: r,
        instructions: o,
        language: i,
        providerOptions: a,
      }) {
        const s = [],
          l = await tc({ provider: "openai", providerOptions: a, schema: pd }),
          u = {
            model: this.modelId,
            input: e,
            voice: t,
            response_format: "mp3",
            speed: r,
            instructions: o,
          };
        if (
          (n &&
            (["mp3", "opus", "aac", "flac", "wav", "pcm"].includes(n)
              ? (u.response_format = n)
              : s.push({
                  type: "unsupported-setting",
                  setting: "outputFormat",
                  details: `Unsupported output format: ${n}. Using mp3 instead.`,
                })),
          l)
        ) {
          const e = {};
          for (const t in e) {
            const n = e[t];
            void 0 !== n && (u[t] = n);
          }
        }
        return (
          i &&
            s.push({
              type: "unsupported-setting",
              setting: "language",
              details: `OpenAI speech models do not support language selection. Language parameter "${i}" was ignored.`,
            }),
          { requestBody: u, warnings: s }
        );
      }
      async doGenerate(e) {
        var t, n, r;
        const o =
            null !=
            (r =
              null ==
              (n = null == (t = this.config._internal) ? void 0 : t.currentDate)
                ? void 0
                : n.call(t))
              ? r
              : new Date(),
          { requestBody: i, warnings: a } = await this.getArgs(e),
          {
            value: s,
            responseHeaders: l,
            rawValue: u,
          } = await rc({
            url: this.config.url({
              path: "/audio/speech",
              modelId: this.modelId,
            }),
            headers: Ru(this.config.headers(), e.headers),
            body: i,
            failedResponseHandler: $c,
            successfulResponseHandler: async ({
              response: e,
              url: t,
              requestBodyValues: n,
            }) => {
              const r = Mu(e);
              if (!e.body)
                throw new h({
                  message: "Response body is empty",
                  url: t,
                  requestBodyValues: n,
                  statusCode: e.status,
                  responseHeaders: r,
                  responseBody: void 0,
                });
              try {
                const t = await e.arrayBuffer();
                return { responseHeaders: r, value: new Uint8Array(t) };
              } catch (o) {
                throw new h({
                  message: "Failed to read response as array buffer",
                  url: t,
                  requestBodyValues: n,
                  statusCode: e.status,
                  responseHeaders: r,
                  responseBody: void 0,
                  cause: o,
                });
              }
            },
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          });
        return {
          audio: s,
          warnings: a,
          request: { body: JSON.stringify(i) },
          response: {
            timestamp: o,
            modelId: this.modelId,
            headers: l,
            body: u,
          },
        };
      }
    };
  function hd(e = {}) {
    var t, n;
    const r = null != (t = bc(e.baseURL)) ? t : "https://api.openai.com/v1",
      o = null != (n = e.name) ? n : "openai",
      i = () => ({
        Authorization: `Bearer ${Bu({ apiKey: e.apiKey, environmentVariableName: "OPENAI_API_KEY", description: "OpenAI" })}`,
        "OpenAI-Organization": e.organization,
        "OpenAI-Project": e.project,
        ...e.headers,
      }),
      a = (t) =>
        new Wc(t, {
          provider: `${o}.embedding`,
          url: ({ path: e }) => `${r}${e}`,
          headers: i,
          fetch: e.fetch,
        }),
      s = (t) =>
        new Kc(t, {
          provider: `${o}.image`,
          url: ({ path: e }) => `${r}${e}`,
          headers: i,
          fetch: e.fetch,
        }),
      l = (t) =>
        new ed(t, {
          provider: `${o}.transcription`,
          url: ({ path: e }) => `${r}${e}`,
          headers: i,
          fetch: e.fetch,
        }),
      u = (t) =>
        new md(t, {
          provider: `${o}.speech`,
          url: ({ path: e }) => `${r}${e}`,
          headers: i,
          fetch: e.fetch,
        }),
      c = (e) => {
        if (new.target)
          throw new Error(
            "The OpenAI model function cannot be called with the new keyword.",
          );
        return d(e);
      },
      d = (t) =>
        new od(t, {
          provider: `${o}.responses`,
          url: ({ path: e }) => `${r}${e}`,
          headers: i,
          fetch: e.fetch,
        }),
      p = function (e) {
        return c(e);
      };
    return (
      (p.languageModel = c),
      (p.chat = (t) =>
        new Uc(t, {
          provider: `${o}.chat`,
          url: ({ path: e }) => `${r}${e}`,
          headers: i,
          fetch: e.fetch,
        })),
      (p.completion = (t) =>
        new qc(t, {
          provider: `${o}.completion`,
          url: ({ path: e }) => `${r}${e}`,
          headers: i,
          fetch: e.fetch,
        })),
      (p.responses = d),
      (p.embedding = a),
      (p.textEmbedding = a),
      (p.textEmbeddingModel = a),
      (p.image = s),
      (p.imageModel = s),
      (p.transcription = l),
      (p.transcriptionModel = l),
      (p.speech = u),
      (p.speechModel = u),
      (p.tools = Xc),
      p
    );
  }
  function gd(e) {
    return new Promise((t) => setTimeout(() => t(), e));
  }
  function fd() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (e) {
        const t = (16 * Math.random()) | 0;
        return ("x" === e ? t : (3 & t) | 8).toString(16);
      },
    );
  }
  function vd(e, t, n) {
    return new Promise(async (r, o) => {
      let i = setTimeout(() => {
        (o(new Error("Timeout")), n && n("Timeout"));
      }, t);
      try {
        const t = await e();
        (clearTimeout(i), r(t));
      } catch (e) {
        (clearTimeout(i), o(e), n && n(e + ""));
      }
    });
  }
  function yd(e) {
    return bd(e);
  }
  function bd(e, t = "base64|url") {
    if (e.startsWith("http://") || e.startsWith("https://")) return new URL(e);
    if (e.startsWith("//") && e.indexOf(".") > 0 && e.length < 1e3)
      return new URL("https:" + e);
    if (
      (e.startsWith("data:") && (e = e.substring(e.indexOf(",") + 1)),
      "binary|url" === t)
    ) {
      if ("undefined" != typeof Buffer) {
        const t = Buffer.from(e, "base64");
        return new Uint8Array(t);
      }
      {
        const t = atob(e),
          n = new Uint8Array(t.length);
        for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
        return n;
      }
    }
    return e;
  }
  function _d(e, t) {
    let n = [],
      r = t.reduce((e, t) => ((e[t.name] = t), e), {}),
      o = [];
    for (let t = 0; t < e.length; t++) {
      let o = e[t],
        i = r[o.name];
      i ? (n.push(i), delete r[o.name]) : n.push(o);
    }
    for (let e = 0; e < t.length; e++) {
      let i = t[e];
      r[i.name] && -1 === o.indexOf(i.name) && (n.push(i), o.push(i.name));
    }
    return n;
  }
  function wd(e, t) {
    let n = [],
      r = t.reduce((e, t) => ((e[t.Name] = t), e), {});
    for (let t = 0; t < e.length; t++) {
      let o = e[t],
        i = r[o.Name];
      i ? (n.push(i), delete r[o.Name]) : n.push(o);
    }
    for (let e = 0; e < t.length; e++) {
      let o = t[e];
      r[o.Name] && n.push(o);
    }
    return n;
  }
  function kd(e, t, n = !0) {
    return e ? (e.length > t ? e.substring(0, t) + (n ? "..." : "") : e) : "";
  }
  hd();
  var xd = ul({ type: Sl("error"), error: ul({ type: ys(), message: ys() }) }),
    $d = lc({ errorSchema: xd, errorToMessage: (e) => e.error.message }),
    Id = ul({
      citations: ul({ enabled: Ws() }).optional(),
      title: ys().optional(),
      context: ys().optional(),
    }),
    Sd = ul({
      sendReasoning: Ws().optional(),
      thinking: ul({
        type: pl([Sl("enabled"), Sl("disabled")]),
        budgetTokens: Zs().optional(),
      }).optional(),
      disableParallelToolUse: Ws().optional(),
    });
  function Td(e) {
    var t;
    const n = null == e ? void 0 : e.anthropic;
    return null != (t = null == n ? void 0 : n.cacheControl)
      ? t
      : null == n
        ? void 0
        : n.cache_control;
  }
  var Nd = ul({
      maxUses: Zs().optional(),
      allowedDomains: sl(ys()).optional(),
      blockedDomains: sl(ys()).optional(),
      userLocation: ul({
        type: Sl("approximate"),
        city: ys().optional(),
        region: ys().optional(),
        country: ys().optional(),
        timezone: ys().optional(),
      }).optional(),
    }),
    Od = sl(
      ul({
        url: ys(),
        title: ys(),
        pageAge: ys().nullable(),
        encryptedContent: ys(),
        type: ys(),
      }),
    ),
    Ed = ac({
      id: "anthropic.web_search_20250305",
      name: "web_search",
      inputSchema: ul({ query: ys() }),
      outputSchema: Od,
    });
  function Ad(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      "type" in e &&
      "web_search_20250305" === e.type
    );
  }
  function Ud(e) {
    if ("string" == typeof e) return Buffer.from(e, "base64").toString("utf-8");
    if (e instanceof Uint8Array) return new TextDecoder().decode(e);
    if (e instanceof URL)
      throw new fe({
        functionality:
          "URL-based text documents are not supported for citations",
      });
    throw new fe({
      functionality: "unsupported data type for text documents: " + typeof e,
    });
  }
  function Cd({ finishReason: e, isJsonResponseFromTool: t }) {
    switch (e) {
      case "end_turn":
      case "stop_sequence":
        return "stop";
      case "tool_use":
        return t ? "stop" : "tool-calls";
      case "max_tokens":
        return "length";
      default:
        return "unknown";
    }
  }
  var Pd = {
      webSearchResult: ul({
        type: Sl("web_search_result_location"),
        cited_text: ys(),
        url: ys(),
        title: ys(),
        encrypted_index: ys(),
      }),
      pageLocation: ul({
        type: Sl("page_location"),
        cited_text: ys(),
        document_index: Zs(),
        document_title: ys().nullable(),
        start_page_number: Zs(),
        end_page_number: Zs(),
      }),
      charLocation: ul({
        type: Sl("char_location"),
        cited_text: ys(),
        document_index: Zs(),
        document_title: ys().nullable(),
        start_char_index: Zs(),
        end_char_index: Zs(),
      }),
    },
    Dd = hl("type", [Pd.webSearchResult, Pd.pageLocation, Pd.charLocation]);
  function jd(e, t, n, r) {
    if ("page_location" === e.type || "char_location" === e.type) {
      const o = (function (e, t, n) {
        var r;
        const o = t[e.document_index];
        if (!o) return null;
        const i =
          "page_location" === e.type
            ? {
                citedText: e.cited_text,
                startPageNumber: e.start_page_number,
                endPageNumber: e.end_page_number,
              }
            : {
                citedText: e.cited_text,
                startCharIndex: e.start_char_index,
                endCharIndex: e.end_char_index,
              };
        return {
          type: "source",
          sourceType: "document",
          id: n(),
          mediaType: o.mediaType,
          title: null != (r = e.document_title) ? r : o.title,
          filename: o.filename,
          providerMetadata: { anthropic: i },
        };
      })(e, t, n);
      o && r(o);
    }
  }
  hl("type", [Pd.pageLocation, Pd.charLocation]);
  var zd = class {
      constructor(e, t) {
        var n;
        ((this.specificationVersion = "v2"),
          (this.modelId = e),
          (this.config = t),
          (this.generateId = null != (n = t.generateId) ? n : qu));
      }
      supportsUrl(e) {
        return "https:" === e.protocol;
      }
      get provider() {
        return this.config.provider;
      }
      get supportedUrls() {
        var e, t, n;
        return null !=
          (n =
            null == (t = (e = this.config).supportedUrls) ? void 0 : t.call(e))
          ? n
          : {};
      }
      async getArgs({
        prompt: e,
        maxOutputTokens: t = 4096,
        temperature: n,
        topP: r,
        topK: o,
        frequencyPenalty: i,
        presencePenalty: a,
        stopSequences: s,
        responseFormat: l,
        seed: u,
        tools: c,
        toolChoice: d,
        providerOptions: p,
      }) {
        var m, h, g;
        const f = [];
        (null != i &&
          f.push({ type: "unsupported-setting", setting: "frequencyPenalty" }),
          null != a &&
            f.push({ type: "unsupported-setting", setting: "presencePenalty" }),
          null != u && f.push({ type: "unsupported-setting", setting: "seed" }),
          "json" === (null == l ? void 0 : l.type) &&
            (null == l.schema
              ? f.push({
                  type: "unsupported-setting",
                  setting: "responseFormat",
                  details:
                    "JSON response format requires a schema. The response format is ignored.",
                })
              : null != c &&
                f.push({
                  type: "unsupported-setting",
                  setting: "tools",
                  details:
                    "JSON response format does not support tools. The provided tools are ignored.",
                })));
        const v =
            "json" === (null == l ? void 0 : l.type) && null != l.schema
              ? {
                  type: "function",
                  name: "json",
                  description: "Respond with a JSON object.",
                  inputSchema: l.schema,
                }
              : void 0,
          y = await tc({
            provider: "anthropic",
            providerOptions: p,
            schema: Sd,
          }),
          { prompt: b, betas: _ } = await (async function ({
            prompt: e,
            sendReasoning: t,
            warnings: n,
          }) {
            var r, o, i, a, s;
            const l = new Set(),
              u = (function (e) {
                const t = [];
                let n;
                for (const r of e) {
                  const { role: e } = r;
                  switch (e) {
                    case "system":
                      ("system" !== (null == n ? void 0 : n.type) &&
                        ((n = { type: "system", messages: [] }), t.push(n)),
                        n.messages.push(r));
                      break;
                    case "assistant":
                      ("assistant" !== (null == n ? void 0 : n.type) &&
                        ((n = { type: "assistant", messages: [] }), t.push(n)),
                        n.messages.push(r));
                      break;
                    case "user":
                    case "tool":
                      ("user" !== (null == n ? void 0 : n.type) &&
                        ((n = { type: "user", messages: [] }), t.push(n)),
                        n.messages.push(r));
                      break;
                    default:
                      throw new Error(`Unsupported role: ${e}`);
                  }
                }
                return t;
              })(e);
            let c;
            const d = [];
            async function p(e) {
              var t, n;
              const r = await tc({
                provider: "anthropic",
                providerOptions: e,
                schema: Id,
              });
              return (
                null !=
                  (n =
                    null == (t = null == r ? void 0 : r.citations)
                      ? void 0
                      : t.enabled) && n
              );
            }
            async function m(e) {
              const t = await tc({
                provider: "anthropic",
                providerOptions: e,
                schema: Id,
              });
              return {
                title: null == t ? void 0 : t.title,
                context: null == t ? void 0 : t.context,
              };
            }
            for (let e = 0; e < u.length; e++) {
              const h = u[e],
                g = e === u.length - 1,
                f = h.type;
              switch (f) {
                case "system":
                  if (null != c)
                    throw new fe({
                      functionality:
                        "Multiple system messages that are separated by user/assistant messages",
                    });
                  c = h.messages.map(({ content: e, providerOptions: t }) => ({
                    type: "text",
                    text: e,
                    cache_control: Td(t),
                  }));
                  break;
                case "user": {
                  const e = [];
                  for (const t of h.messages) {
                    const { role: n, content: s } = t;
                    switch (n) {
                      case "user":
                        for (let n = 0; n < s.length; n++) {
                          const a = s[n],
                            u = n === s.length - 1,
                            c =
                              null != (r = Td(a.providerOptions))
                                ? r
                                : u
                                  ? Td(t.providerOptions)
                                  : void 0;
                          switch (a.type) {
                            case "text":
                              e.push({
                                type: "text",
                                text: a.text,
                                cache_control: c,
                              });
                              break;
                            case "file":
                              if (a.mediaType.startsWith("image/"))
                                e.push({
                                  type: "image",
                                  source:
                                    a.data instanceof URL
                                      ? { type: "url", url: a.data.toString() }
                                      : {
                                          type: "base64",
                                          media_type:
                                            "image/*" === a.mediaType
                                              ? "image/jpeg"
                                              : a.mediaType,
                                          data: yc(a.data),
                                        },
                                  cache_control: c,
                                });
                              else if ("application/pdf" === a.mediaType) {
                                l.add("pdfs-2024-09-25");
                                const t = await p(a.providerOptions),
                                  n = await m(a.providerOptions);
                                e.push({
                                  type: "document",
                                  source:
                                    a.data instanceof URL
                                      ? { type: "url", url: a.data.toString() }
                                      : {
                                          type: "base64",
                                          media_type: "application/pdf",
                                          data: yc(a.data),
                                        },
                                  title: null != (o = n.title) ? o : a.filename,
                                  ...(n.context && { context: n.context }),
                                  ...(t && { citations: { enabled: !0 } }),
                                  cache_control: c,
                                });
                              } else {
                                if ("text/plain" !== a.mediaType)
                                  throw new fe({
                                    functionality: `media type: ${a.mediaType}`,
                                  });
                                {
                                  const t = await p(a.providerOptions),
                                    n = await m(a.providerOptions);
                                  e.push({
                                    type: "document",
                                    source:
                                      a.data instanceof URL
                                        ? {
                                            type: "url",
                                            url: a.data.toString(),
                                          }
                                        : {
                                            type: "text",
                                            media_type: "text/plain",
                                            data: Ud(a.data),
                                          },
                                    title:
                                      null != (i = n.title) ? i : a.filename,
                                    ...(n.context && { context: n.context }),
                                    ...(t && { citations: { enabled: !0 } }),
                                    cache_control: c,
                                  });
                                }
                              }
                          }
                        }
                        break;
                      case "tool":
                        for (let n = 0; n < s.length; n++) {
                          const r = s[n],
                            o = n === s.length - 1,
                            i =
                              null != (a = Td(r.providerOptions))
                                ? a
                                : o
                                  ? Td(t.providerOptions)
                                  : void 0,
                            l = r.output;
                          let u;
                          switch (l.type) {
                            case "content":
                              u = l.value.map((e) => {
                                switch (e.type) {
                                  case "text":
                                    return {
                                      type: "text",
                                      text: e.text,
                                      cache_control: void 0,
                                    };
                                  case "media":
                                    if (e.mediaType.startsWith("image/"))
                                      return {
                                        type: "image",
                                        source: {
                                          type: "base64",
                                          media_type: e.mediaType,
                                          data: e.data,
                                        },
                                        cache_control: void 0,
                                      };
                                    throw new fe({
                                      functionality: `media type: ${e.mediaType}`,
                                    });
                                }
                              });
                              break;
                            case "text":
                            case "error-text":
                              u = l.value;
                              break;
                            default:
                              u = JSON.stringify(l.value);
                          }
                          e.push({
                            type: "tool_result",
                            tool_use_id: r.toolCallId,
                            content: u,
                            is_error:
                              "error-text" === l.type ||
                              "error-json" === l.type ||
                              void 0,
                            cache_control: i,
                          });
                        }
                        break;
                      default:
                        throw new Error(`Unsupported role: ${n}`);
                    }
                  }
                  d.push({ role: "user", content: e });
                  break;
                }
                case "assistant": {
                  const e = [];
                  for (let r = 0; r < h.messages.length; r++) {
                    const o = h.messages[r],
                      i = r === h.messages.length - 1,
                      { content: a } = o;
                    for (let r = 0; r < a.length; r++) {
                      const l = a[r],
                        u = r === a.length - 1,
                        c =
                          null != (s = Td(l.providerOptions))
                            ? s
                            : u
                              ? Td(o.providerOptions)
                              : void 0;
                      switch (l.type) {
                        case "text":
                          e.push({
                            type: "text",
                            text: g && i && u ? l.text.trim() : l.text,
                            cache_control: c,
                          });
                          break;
                        case "reasoning":
                          if (t) {
                            const t = await tc({
                              provider: "anthropic",
                              providerOptions: l.providerOptions,
                              schema: qd,
                            });
                            null != t
                              ? null != t.signature
                                ? e.push({
                                    type: "thinking",
                                    thinking: l.text,
                                    signature: t.signature,
                                    cache_control: c,
                                  })
                                : null != t.redactedData
                                  ? e.push({
                                      type: "redacted_thinking",
                                      data: t.redactedData,
                                      cache_control: c,
                                    })
                                  : n.push({
                                      type: "other",
                                      message: "unsupported reasoning metadata",
                                    })
                              : n.push({
                                  type: "other",
                                  message: "unsupported reasoning metadata",
                                });
                          } else
                            n.push({
                              type: "other",
                              message:
                                "sending reasoning content is disabled for this model",
                            });
                          break;
                        case "tool-call":
                          if (l.providerExecuted) {
                            if ("web_search" === l.toolName) {
                              e.push({
                                type: "server_tool_use",
                                id: l.toolCallId,
                                name: "web_search",
                                input: l.input,
                                cache_control: c,
                              });
                              break;
                            }
                            n.push({
                              type: "other",
                              message: `provider executed tool call for tool ${l.toolName} is not supported`,
                            });
                            break;
                          }
                          e.push({
                            type: "tool_use",
                            id: l.toolCallId,
                            name: l.toolName,
                            input: l.input,
                            cache_control: c,
                          });
                          break;
                        case "tool-result":
                          if ("web_search" === l.toolName) {
                            const t = l.output;
                            if ("json" !== t.type) {
                              n.push({
                                type: "other",
                                message: `provider executed tool result output type ${t.type} for tool ${l.toolName} is not supported`,
                              });
                              break;
                            }
                            const r = Od.parse(t.value);
                            e.push({
                              type: "web_search_tool_result",
                              tool_use_id: l.toolCallId,
                              content: r.map((e) => ({
                                url: e.url,
                                title: e.title,
                                page_age: e.pageAge,
                                encrypted_content: e.encryptedContent,
                                type: e.type,
                              })),
                              cache_control: c,
                            });
                            break;
                          }
                          n.push({
                            type: "other",
                            message: `provider executed tool result for tool ${l.toolName} is not supported`,
                          });
                      }
                    }
                  }
                  d.push({ role: "assistant", content: e });
                  break;
                }
                default:
                  throw new Error(`content type: ${f}`);
              }
            }
            return { prompt: { system: c, messages: d }, betas: l };
          })({
            prompt: e,
            sendReasoning:
              null == (m = null == y ? void 0 : y.sendReasoning) || m,
            warnings: f,
          }),
          w =
            "enabled" ===
            (null == (h = null == y ? void 0 : y.thinking) ? void 0 : h.type),
          k =
            null == (g = null == y ? void 0 : y.thinking)
              ? void 0
              : g.budgetTokens,
          x = {
            model: this.modelId,
            max_tokens: t,
            temperature: n,
            top_k: o,
            top_p: r,
            stop_sequences: s,
            ...(w && { thinking: { type: "enabled", budget_tokens: k } }),
            system: b.system,
            messages: b.messages,
          };
        if (w) {
          if (null == k)
            throw new fe({ functionality: "thinking requires a budget" });
          (null != x.temperature &&
            ((x.temperature = void 0),
            f.push({
              type: "unsupported-setting",
              setting: "temperature",
              details: "temperature is not supported when thinking is enabled",
            })),
            null != o &&
              ((x.top_k = void 0),
              f.push({
                type: "unsupported-setting",
                setting: "topK",
                details: "topK is not supported when thinking is enabled",
              })),
            null != r &&
              ((x.top_p = void 0),
              f.push({
                type: "unsupported-setting",
                setting: "topP",
                details: "topP is not supported when thinking is enabled",
              })),
            (x.max_tokens = t + k));
        }
        const {
          tools: $,
          toolChoice: I,
          toolWarnings: S,
          betas: T,
        } = (function ({ tools: e, toolChoice: t, disableParallelToolUse: n }) {
          e = (null == e ? void 0 : e.length) ? e : void 0;
          const r = [],
            o = new Set();
          if (null == e)
            return {
              tools: void 0,
              toolChoice: void 0,
              toolWarnings: r,
              betas: o,
            };
          const i = [];
          for (const t of e)
            if (Ad(t)) i.push(t);
            else
              switch (t.type) {
                case "function":
                  const e = Td(t.providerOptions);
                  i.push({
                    name: t.name,
                    description: t.description,
                    input_schema: t.inputSchema,
                    cache_control: e,
                  });
                  break;
                case "provider-defined":
                  switch (t.id) {
                    case "anthropic.computer_20250124":
                      (o.add("computer-use-2025-01-24"),
                        i.push({
                          name: "computer",
                          type: "computer_20250124",
                          display_width_px: t.args.displayWidthPx,
                          display_height_px: t.args.displayHeightPx,
                          display_number: t.args.displayNumber,
                        }));
                      break;
                    case "anthropic.computer_20241022":
                      (o.add("computer-use-2024-10-22"),
                        i.push({
                          name: "computer",
                          type: "computer_20241022",
                          display_width_px: t.args.displayWidthPx,
                          display_height_px: t.args.displayHeightPx,
                          display_number: t.args.displayNumber,
                        }));
                      break;
                    case "anthropic.text_editor_20250124":
                      (o.add("computer-use-2025-01-24"),
                        i.push({
                          name: "str_replace_editor",
                          type: "text_editor_20250124",
                        }));
                      break;
                    case "anthropic.text_editor_20241022":
                      (o.add("computer-use-2024-10-22"),
                        i.push({
                          name: "str_replace_editor",
                          type: "text_editor_20241022",
                        }));
                      break;
                    case "anthropic.text_editor_20250429":
                      (o.add("computer-use-2025-01-24"),
                        i.push({
                          name: "str_replace_based_edit_tool",
                          type: "text_editor_20250429",
                        }));
                      break;
                    case "anthropic.bash_20250124":
                      (o.add("computer-use-2025-01-24"),
                        i.push({ name: "bash", type: "bash_20250124" }));
                      break;
                    case "anthropic.bash_20241022":
                      (o.add("computer-use-2024-10-22"),
                        i.push({ name: "bash", type: "bash_20241022" }));
                      break;
                    case "anthropic.web_search_20250305": {
                      const e = Nd.parse(t.args);
                      i.push({
                        type: "web_search_20250305",
                        name: "web_search",
                        max_uses: e.maxUses,
                        allowed_domains: e.allowedDomains,
                        blocked_domains: e.blockedDomains,
                        user_location: e.userLocation,
                      });
                      break;
                    }
                    default:
                      r.push({ type: "unsupported-tool", tool: t });
                  }
                  break;
                default:
                  r.push({ type: "unsupported-tool", tool: t });
              }
          if (null == t)
            return {
              tools: i,
              toolChoice: n
                ? { type: "auto", disable_parallel_tool_use: n }
                : void 0,
              toolWarnings: r,
              betas: o,
            };
          const a = t.type;
          switch (a) {
            case "auto":
              return {
                tools: i,
                toolChoice: { type: "auto", disable_parallel_tool_use: n },
                toolWarnings: r,
                betas: o,
              };
            case "required":
              return {
                tools: i,
                toolChoice: { type: "any", disable_parallel_tool_use: n },
                toolWarnings: r,
                betas: o,
              };
            case "none":
              return {
                tools: void 0,
                toolChoice: void 0,
                toolWarnings: r,
                betas: o,
              };
            case "tool":
              return {
                tools: i,
                toolChoice: {
                  type: "tool",
                  name: t.toolName,
                  disable_parallel_tool_use: n,
                },
                toolWarnings: r,
                betas: o,
              };
            default:
              throw new fe({ functionality: `tool choice type: ${a}` });
          }
        })(
          null != v
            ? {
                tools: [v],
                toolChoice: { type: "tool", toolName: v.name },
                disableParallelToolUse:
                  null == y ? void 0 : y.disableParallelToolUse,
              }
            : {
                tools: null != c ? c : [],
                toolChoice: d,
                disableParallelToolUse:
                  null == y ? void 0 : y.disableParallelToolUse,
              },
        );
        return {
          args: { ...x, tools: $, tool_choice: I },
          warnings: [...f, ...S],
          betas: new Set([..._, ...T]),
          usesJsonResponseTool: null != v,
        };
      }
      async getHeaders({ betas: e, headers: t }) {
        return Ru(
          await sc(this.config.headers),
          e.size > 0 ? { "anthropic-beta": Array.from(e).join(",") } : {},
          t,
        );
      }
      buildRequestUrl(e) {
        var t, n, r;
        return null !=
          (r =
            null == (n = (t = this.config).buildRequestUrl)
              ? void 0
              : n.call(t, this.config.baseURL, e))
          ? r
          : `${this.config.baseURL}/messages`;
      }
      transformRequestBody(e) {
        var t, n, r;
        return null !=
          (r =
            null == (n = (t = this.config).transformRequestBody)
              ? void 0
              : n.call(t, e))
          ? r
          : e;
      }
      extractCitationDocuments(e) {
        return e
          .filter((e) => "user" === e.role)
          .flatMap((e) => e.content)
          .filter((e) => {
            var t, n;
            if ("file" !== e.type) return !1;
            if (
              "application/pdf" !== e.mediaType &&
              "text/plain" !== e.mediaType
            )
              return !1;
            const r = null == (t = e.providerOptions) ? void 0 : t.anthropic,
              o = null == r ? void 0 : r.citations;
            return null != (n = null == o ? void 0 : o.enabled) && n;
          })
          .map((e) => {
            var t;
            const n = e;
            return {
              title: null != (t = n.filename) ? t : "Untitled Document",
              filename: n.filename,
              mediaType: n.mediaType,
            };
          });
      }
      async doGenerate(e) {
        var t, n, r, o, i;
        const {
            args: a,
            warnings: s,
            betas: l,
            usesJsonResponseTool: u,
          } = await this.getArgs(e),
          c = this.extractCitationDocuments(e.prompt),
          {
            responseHeaders: d,
            value: p,
            rawValue: m,
          } = await rc({
            url: this.buildRequestUrl(!1),
            headers: await this.getHeaders({ betas: l, headers: e.headers }),
            body: this.transformRequestBody(a),
            failedResponseHandler: $d,
            successfulResponseHandler: cc(Rd),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          }),
          h = [];
        for (const e of p.content)
          switch (e.type) {
            case "text":
              if (!u && (h.push({ type: "text", text: e.text }), e.citations))
                for (const t of e.citations)
                  jd(t, c, this.generateId, (e) => h.push(e));
              break;
            case "thinking":
              h.push({
                type: "reasoning",
                text: e.thinking,
                providerMetadata: { anthropic: { signature: e.signature } },
              });
              break;
            case "redacted_thinking":
              h.push({
                type: "reasoning",
                text: "",
                providerMetadata: { anthropic: { redactedData: e.data } },
              });
              break;
            case "tool_use":
              h.push(
                u
                  ? { type: "text", text: JSON.stringify(e.input) }
                  : {
                      type: "tool-call",
                      toolCallId: e.id,
                      toolName: e.name,
                      input: JSON.stringify(e.input),
                    },
              );
              break;
            case "server_tool_use":
              "web_search" === e.name &&
                h.push({
                  type: "tool-call",
                  toolCallId: e.id,
                  toolName: e.name,
                  input: JSON.stringify(e.input),
                  providerExecuted: !0,
                });
              break;
            case "web_search_tool_result":
              if (Array.isArray(e.content)) {
                h.push({
                  type: "tool-result",
                  toolCallId: e.tool_use_id,
                  toolName: "web_search",
                  result: e.content.map((e) => {
                    var t;
                    return {
                      url: e.url,
                      title: e.title,
                      pageAge: null != (t = e.page_age) ? t : null,
                      encryptedContent: e.encrypted_content,
                      type: e.type,
                    };
                  }),
                  providerExecuted: !0,
                });
                for (const n of e.content)
                  h.push({
                    type: "source",
                    sourceType: "url",
                    id: this.generateId(),
                    url: n.url,
                    title: n.title,
                    providerMetadata: {
                      anthropic: {
                        pageAge: null != (t = n.page_age) ? t : null,
                      },
                    },
                  });
              } else
                h.push({
                  type: "tool-result",
                  toolCallId: e.tool_use_id,
                  toolName: "web_search",
                  isError: !0,
                  result: {
                    type: "web_search_tool_result_error",
                    errorCode: e.content.error_code,
                  },
                  providerExecuted: !0,
                });
          }
        return {
          content: h,
          finishReason: Cd({
            finishReason: p.stop_reason,
            isJsonResponseFromTool: u,
          }),
          usage: {
            inputTokens: p.usage.input_tokens,
            outputTokens: p.usage.output_tokens,
            totalTokens: p.usage.input_tokens + p.usage.output_tokens,
            cachedInputTokens:
              null != (n = p.usage.cache_read_input_tokens) ? n : void 0,
          },
          request: { body: a },
          response: {
            id: null != (r = p.id) ? r : void 0,
            modelId: null != (o = p.model) ? o : void 0,
            headers: d,
            body: m,
          },
          warnings: s,
          providerMetadata: {
            anthropic: {
              usage: p.usage,
              cacheCreationInputTokens:
                null != (i = p.usage.cache_creation_input_tokens) ? i : null,
            },
          },
        };
      }
      async doStream(e) {
        const {
            args: t,
            warnings: n,
            betas: r,
            usesJsonResponseTool: o,
          } = await this.getArgs(e),
          i = this.extractCitationDocuments(e.prompt),
          a = { ...t, stream: !0 },
          { responseHeaders: s, value: l } = await rc({
            url: this.buildRequestUrl(!0),
            headers: await this.getHeaders({ betas: r, headers: e.headers }),
            body: this.transformRequestBody(a),
            failedResponseHandler: $d,
            successfulResponseHandler: uc(Md),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          });
        let u = "unknown";
        const c = {
            inputTokens: void 0,
            outputTokens: void 0,
            totalTokens: void 0,
          },
          d = {};
        let p, m;
        const h = this.generateId;
        return {
          stream: l.pipeThrough(
            new TransformStream({
              start(e) {
                e.enqueue({ type: "stream-start", warnings: n });
              },
              transform(t, n) {
                var r, a, s, l, g, f, v;
                if (
                  (e.includeRawChunks &&
                    n.enqueue({ type: "raw", rawValue: t.rawValue }),
                  !t.success)
                )
                  return void n.enqueue({ type: "error", error: t.error });
                const y = t.value;
                switch (y.type) {
                  case "ping":
                    return;
                  case "content_block_start": {
                    const e = y.content_block.type;
                    switch (((m = e), e)) {
                      case "text":
                        return (
                          (d[y.index] = { type: "text" }),
                          void n.enqueue({
                            type: "text-start",
                            id: String(y.index),
                          })
                        );
                      case "thinking":
                        return (
                          (d[y.index] = { type: "reasoning" }),
                          void n.enqueue({
                            type: "reasoning-start",
                            id: String(y.index),
                          })
                        );
                      case "redacted_thinking":
                        return (
                          (d[y.index] = { type: "reasoning" }),
                          void n.enqueue({
                            type: "reasoning-start",
                            id: String(y.index),
                            providerMetadata: {
                              anthropic: { redactedData: y.content_block.data },
                            },
                          })
                        );
                      case "tool_use":
                        return (
                          (d[y.index] = o
                            ? { type: "text" }
                            : {
                                type: "tool-call",
                                toolCallId: y.content_block.id,
                                toolName: y.content_block.name,
                                input: "",
                              }),
                          void n.enqueue(
                            o
                              ? { type: "text-start", id: String(y.index) }
                              : {
                                  type: "tool-input-start",
                                  id: y.content_block.id,
                                  toolName: y.content_block.name,
                                },
                          )
                        );
                      case "server_tool_use":
                        return void (
                          "web_search" === y.content_block.name &&
                          ((d[y.index] = {
                            type: "tool-call",
                            toolCallId: y.content_block.id,
                            toolName: y.content_block.name,
                            input: "",
                            providerExecuted: !0,
                          }),
                          n.enqueue({
                            type: "tool-input-start",
                            id: y.content_block.id,
                            toolName: y.content_block.name,
                            providerExecuted: !0,
                          }))
                        );
                      case "web_search_tool_result": {
                        const e = y.content_block;
                        if (Array.isArray(e.content)) {
                          n.enqueue({
                            type: "tool-result",
                            toolCallId: e.tool_use_id,
                            toolName: "web_search",
                            result: e.content.map((e) => {
                              var t;
                              return {
                                url: e.url,
                                title: e.title,
                                pageAge: null != (t = e.page_age) ? t : null,
                                encryptedContent: e.encrypted_content,
                                type: e.type,
                              };
                            }),
                            providerExecuted: !0,
                          });
                          for (const t of e.content)
                            n.enqueue({
                              type: "source",
                              sourceType: "url",
                              id: h(),
                              url: t.url,
                              title: t.title,
                              providerMetadata: {
                                anthropic: {
                                  pageAge: null != (r = t.page_age) ? r : null,
                                },
                              },
                            });
                        } else
                          n.enqueue({
                            type: "tool-result",
                            toolCallId: e.tool_use_id,
                            toolName: "web_search",
                            isError: !0,
                            result: {
                              type: "web_search_tool_result_error",
                              errorCode: e.content.error_code,
                            },
                            providerExecuted: !0,
                          });
                        return;
                      }
                      default:
                        throw new Error(`Unsupported content block type: ${e}`);
                    }
                  }
                  case "content_block_stop":
                    if (null != d[y.index]) {
                      const e = d[y.index];
                      switch (e.type) {
                        case "text":
                          n.enqueue({ type: "text-end", id: String(y.index) });
                          break;
                        case "reasoning":
                          n.enqueue({
                            type: "reasoning-end",
                            id: String(y.index),
                          });
                          break;
                        case "tool-call":
                          o ||
                            (n.enqueue({
                              type: "tool-input-end",
                              id: e.toolCallId,
                            }),
                            n.enqueue(e));
                      }
                      delete d[y.index];
                    }
                    return void (m = void 0);
                  case "content_block_delta": {
                    const e = y.delta.type;
                    switch (e) {
                      case "text_delta":
                        if (o) return;
                        return void n.enqueue({
                          type: "text-delta",
                          id: String(y.index),
                          delta: y.delta.text,
                        });
                      case "thinking_delta":
                        return void n.enqueue({
                          type: "reasoning-delta",
                          id: String(y.index),
                          delta: y.delta.thinking,
                        });
                      case "signature_delta":
                        return void (
                          "thinking" === m &&
                          n.enqueue({
                            type: "reasoning-delta",
                            id: String(y.index),
                            delta: "",
                            providerMetadata: {
                              anthropic: { signature: y.delta.signature },
                            },
                          })
                        );
                      case "input_json_delta": {
                        const e = d[y.index],
                          t = y.delta.partial_json;
                        if (o) {
                          if ("text" !== (null == e ? void 0 : e.type)) return;
                          n.enqueue({
                            type: "text-delta",
                            id: String(y.index),
                            delta: t,
                          });
                        } else {
                          if ("tool-call" !== (null == e ? void 0 : e.type))
                            return;
                          (n.enqueue({
                            type: "tool-input-delta",
                            id: e.toolCallId,
                            delta: t,
                          }),
                            (e.input += t));
                        }
                        return;
                      }
                      case "citations_delta":
                        return void jd(y.delta.citation, i, h, (e) =>
                          n.enqueue(e),
                        );
                      default:
                        throw new Error(`Unsupported delta type: ${e}`);
                    }
                  }
                  case "message_start":
                    return (
                      (c.inputTokens = y.message.usage.input_tokens),
                      (c.cachedInputTokens =
                        null != (a = y.message.usage.cache_read_input_tokens)
                          ? a
                          : void 0),
                      (p = {
                        anthropic: {
                          usage: y.message.usage,
                          cacheCreationInputTokens:
                            null !=
                            (s = y.message.usage.cache_creation_input_tokens)
                              ? s
                              : null,
                        },
                      }),
                      void n.enqueue({
                        type: "response-metadata",
                        id: null != (l = y.message.id) ? l : void 0,
                        modelId: null != (g = y.message.model) ? g : void 0,
                      })
                    );
                  case "message_delta":
                    return (
                      (c.outputTokens = y.usage.output_tokens),
                      (c.totalTokens =
                        (null != (f = c.inputTokens) ? f : 0) +
                        (null != (v = y.usage.output_tokens) ? v : 0)),
                      void (u = Cd({
                        finishReason: y.delta.stop_reason,
                        isJsonResponseFromTool: o,
                      }))
                    );
                  case "message_stop":
                    return void n.enqueue({
                      type: "finish",
                      finishReason: u,
                      usage: c,
                      providerMetadata: p,
                    });
                  case "error":
                    return void n.enqueue({ type: "error", error: y.error });
                  default:
                    throw new Error(`Unsupported chunk type: ${y}`);
                }
              },
            }),
          ),
          request: { body: a },
          response: { headers: s },
        };
      }
    },
    Rd = ul({
      type: Sl("message"),
      id: ys().nullish(),
      model: ys().nullish(),
      content: sl(
        hl("type", [
          ul({ type: Sl("text"), text: ys(), citations: sl(Dd).optional() }),
          ul({ type: Sl("thinking"), thinking: ys(), signature: ys() }),
          ul({ type: Sl("redacted_thinking"), data: ys() }),
          ul({ type: Sl("tool_use"), id: ys(), name: ys(), input: tl() }),
          ul({
            type: Sl("server_tool_use"),
            id: ys(),
            name: ys(),
            input: _l(ys(), tl()).nullish(),
          }),
          ul({
            type: Sl("web_search_tool_result"),
            tool_use_id: ys(),
            content: pl([
              sl(
                ul({
                  type: Sl("web_search_result"),
                  url: ys(),
                  title: ys(),
                  encrypted_content: ys(),
                  page_age: ys().nullish(),
                }),
              ),
              ul({
                type: Sl("web_search_tool_result_error"),
                error_code: ys(),
              }),
            ]),
          }),
        ]),
      ),
      stop_reason: ys().nullish(),
      usage: cl({
        input_tokens: Zs(),
        output_tokens: Zs(),
        cache_creation_input_tokens: Zs().nullish(),
        cache_read_input_tokens: Zs().nullish(),
      }),
    }),
    Md = hl("type", [
      ul({
        type: Sl("message_start"),
        message: ul({
          id: ys().nullish(),
          model: ys().nullish(),
          usage: cl({
            input_tokens: Zs(),
            output_tokens: Zs(),
            cache_creation_input_tokens: Zs().nullish(),
            cache_read_input_tokens: Zs().nullish(),
          }),
        }),
      }),
      ul({
        type: Sl("content_block_start"),
        index: Zs(),
        content_block: hl("type", [
          ul({ type: Sl("text"), text: ys() }),
          ul({ type: Sl("thinking"), thinking: ys() }),
          ul({ type: Sl("tool_use"), id: ys(), name: ys() }),
          ul({ type: Sl("redacted_thinking"), data: ys() }),
          ul({
            type: Sl("server_tool_use"),
            id: ys(),
            name: ys(),
            input: _l(ys(), tl()).nullish(),
          }),
          ul({
            type: Sl("web_search_tool_result"),
            tool_use_id: ys(),
            content: pl([
              sl(
                ul({
                  type: Sl("web_search_result"),
                  url: ys(),
                  title: ys(),
                  encrypted_content: ys(),
                  page_age: ys().nullish(),
                }),
              ),
              ul({
                type: Sl("web_search_tool_result_error"),
                error_code: ys(),
              }),
            ]),
          }),
        ]),
      }),
      ul({
        type: Sl("content_block_delta"),
        index: Zs(),
        delta: hl("type", [
          ul({ type: Sl("input_json_delta"), partial_json: ys() }),
          ul({ type: Sl("text_delta"), text: ys() }),
          ul({ type: Sl("thinking_delta"), thinking: ys() }),
          ul({ type: Sl("signature_delta"), signature: ys() }),
          ul({ type: Sl("citations_delta"), citation: Dd }),
        ]),
      }),
      ul({ type: Sl("content_block_stop"), index: Zs() }),
      ul({ type: Sl("error"), error: ul({ type: ys(), message: ys() }) }),
      ul({
        type: Sl("message_delta"),
        delta: ul({ stop_reason: ys().nullish() }),
        usage: ul({ output_tokens: Zs() }),
      }),
      ul({ type: Sl("message_stop") }),
      ul({ type: Sl("ping") }),
    ]),
    qd = ul({ signature: ys().optional(), redactedData: ys().optional() }),
    Zd = ic({
      id: "anthropic.bash_20241022",
      name: "bash",
      inputSchema: ou.object({
        command: ou.string(),
        restart: ou.boolean().optional(),
      }),
    }),
    Ld = ic({
      id: "anthropic.bash_20250124",
      name: "bash",
      inputSchema: ou.object({
        command: ou.string(),
        restart: ou.boolean().optional(),
      }),
    }),
    Fd = ic({
      id: "anthropic.computer_20241022",
      name: "computer",
      inputSchema: ul({
        action: $l([
          "key",
          "type",
          "mouse_move",
          "left_click",
          "left_click_drag",
          "right_click",
          "middle_click",
          "double_click",
          "screenshot",
          "cursor_position",
        ]),
        coordinate: sl(Zs().int()).optional(),
        text: ys().optional(),
      }),
    }),
    Bd = ic({
      id: "anthropic.computer_20250124",
      name: "computer",
      inputSchema: ul({
        action: $l([
          "key",
          "hold_key",
          "type",
          "cursor_position",
          "mouse_move",
          "left_mouse_down",
          "left_mouse_up",
          "left_click",
          "left_click_drag",
          "right_click",
          "middle_click",
          "double_click",
          "triple_click",
          "scroll",
          "wait",
          "screenshot",
        ]),
        coordinate: yl([Zs().int(), Zs().int()]).optional(),
        duration: Zs().optional(),
        scroll_amount: Zs().optional(),
        scroll_direction: $l(["up", "down", "left", "right"]).optional(),
        start_coordinate: yl([Zs().int(), Zs().int()]).optional(),
        text: ys().optional(),
      }),
    }),
    Wd = {
      bash_20241022: Zd,
      bash_20250124: Ld,
      textEditor_20241022: ic({
        id: "anthropic.text_editor_20241022",
        name: "str_replace_editor",
        inputSchema: ul({
          command: $l(["view", "create", "str_replace", "insert", "undo_edit"]),
          path: ys(),
          file_text: ys().optional(),
          insert_line: Zs().int().optional(),
          new_str: ys().optional(),
          old_str: ys().optional(),
          view_range: sl(Zs().int()).optional(),
        }),
      }),
      textEditor_20250124: ic({
        id: "anthropic.text_editor_20250124",
        name: "str_replace_editor",
        inputSchema: ul({
          command: $l(["view", "create", "str_replace", "insert", "undo_edit"]),
          path: ys(),
          file_text: ys().optional(),
          insert_line: Zs().int().optional(),
          new_str: ys().optional(),
          old_str: ys().optional(),
          view_range: sl(Zs().int()).optional(),
        }),
      }),
      textEditor_20250429: ic({
        id: "anthropic.text_editor_20250429",
        name: "str_replace_based_edit_tool",
        inputSchema: ul({
          command: $l(["view", "create", "str_replace", "insert"]),
          path: ys(),
          file_text: ys().optional(),
          insert_line: Zs().int().optional(),
          new_str: ys().optional(),
          old_str: ys().optional(),
          view_range: sl(Zs().int()).optional(),
        }),
      }),
      computer_20241022: Fd,
      computer_20250124: Bd,
      webSearch_20250305: (e = {}) => Ed(e),
    };
  function Hd(e = {}) {
    var t;
    const n = null != (t = bc(e.baseURL)) ? t : "https://api.anthropic.com/v1",
      r = () => ({
        "anthropic-version": "2023-06-01",
        "x-api-key": Bu({
          apiKey: e.apiKey,
          environmentVariableName: "ANTHROPIC_API_KEY",
          description: "Anthropic",
        }),
        ...e.headers,
      }),
      o = (t) => {
        var o;
        return new zd(t, {
          provider: "anthropic.messages",
          baseURL: n,
          headers: r,
          fetch: e.fetch,
          generateId: null != (o = e.generateId) ? o : qu,
          supportedUrls: () => ({ "image/*": [/^https?:\/\/.*$/] }),
        });
      },
      i = function (e) {
        if (new.target)
          throw new Error(
            "The Anthropic model function cannot be called with the new keyword.",
          );
        return o(e);
      };
    return (
      (i.languageModel = o),
      (i.chat = o),
      (i.messages = o),
      (i.textEmbeddingModel = (e) => {
        throw new te({ modelId: e, modelType: "textEmbeddingModel" });
      }),
      (i.imageModel = (e) => {
        throw new te({ modelId: e, modelType: "imageModel" });
      }),
      (i.tools = Wd),
      i
    );
  }
  Hd();
  var Vd = ul({
      error: ul({ code: Zs().nullable(), message: ys(), status: ys() }),
    }),
    Jd = lc({ errorSchema: Vd, errorToMessage: (e) => e.error.message }),
    Kd = ul({
      outputDimensionality: Zs().optional(),
      taskType: $l([
        "SEMANTIC_SIMILARITY",
        "CLASSIFICATION",
        "CLUSTERING",
        "RETRIEVAL_DOCUMENT",
        "RETRIEVAL_QUERY",
        "QUESTION_ANSWERING",
        "FACT_VERIFICATION",
        "CODE_RETRIEVAL_QUERY",
      ]).optional(),
    }),
    Gd = class {
      constructor(e, t) {
        ((this.specificationVersion = "v2"),
          (this.maxEmbeddingsPerCall = 2048),
          (this.supportsParallelCalls = !0),
          (this.modelId = e),
          (this.config = t));
      }
      get provider() {
        return this.config.provider;
      }
      async doEmbed({
        values: e,
        headers: t,
        abortSignal: n,
        providerOptions: r,
      }) {
        const o = await tc({
          provider: "google",
          providerOptions: r,
          schema: Kd,
        });
        if (e.length > this.maxEmbeddingsPerCall)
          throw new ae({
            provider: this.provider,
            modelId: this.modelId,
            maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
            values: e,
          });
        const i = Ru(await sc(this.config.headers), t);
        if (1 === e.length) {
          const {
            responseHeaders: t,
            value: r,
            rawValue: a,
          } = await rc({
            url: `${this.config.baseURL}/models/${this.modelId}:embedContent`,
            headers: i,
            body: {
              model: `models/${this.modelId}`,
              content: { parts: [{ text: e[0] }] },
              outputDimensionality: null == o ? void 0 : o.outputDimensionality,
              taskType: null == o ? void 0 : o.taskType,
            },
            failedResponseHandler: Jd,
            successfulResponseHandler: cc(Yd),
            abortSignal: n,
            fetch: this.config.fetch,
          });
          return {
            embeddings: [r.embedding.values],
            usage: void 0,
            response: { headers: t, body: a },
          };
        }
        const {
          responseHeaders: a,
          value: s,
          rawValue: l,
        } = await rc({
          url: `${this.config.baseURL}/models/${this.modelId}:batchEmbedContents`,
          headers: i,
          body: {
            requests: e.map((e) => ({
              model: `models/${this.modelId}`,
              content: { role: "user", parts: [{ text: e }] },
              outputDimensionality: null == o ? void 0 : o.outputDimensionality,
              taskType: null == o ? void 0 : o.taskType,
            })),
          },
          failedResponseHandler: Jd,
          successfulResponseHandler: cc(Xd),
          abortSignal: n,
          fetch: this.config.fetch,
        });
        return {
          embeddings: s.embeddings.map((e) => e.values),
          usage: void 0,
          response: { headers: a, body: l },
        };
      }
    },
    Xd = ul({ embeddings: sl(ul({ values: sl(Zs()) })) }),
    Yd = ul({ embedding: ul({ values: sl(Zs()) }) });
  function Qd(e) {
    if (
      null == e ||
      (function (e) {
        return (
          null != e &&
          "object" == typeof e &&
          "object" === e.type &&
          (null == e.properties || 0 === Object.keys(e.properties).length) &&
          !e.additionalProperties
        );
      })(e)
    )
      return;
    if ("boolean" == typeof e) return { type: "boolean", properties: {} };
    const {
        type: t,
        description: n,
        required: r,
        properties: o,
        items: i,
        allOf: a,
        anyOf: s,
        oneOf: l,
        format: u,
        const: c,
        minLength: d,
        enum: p,
      } = e,
      m = {};
    if (
      (n && (m.description = n),
      r && (m.required = r),
      u && (m.format = u),
      void 0 !== c && (m.enum = [c]),
      t &&
        (Array.isArray(t)
          ? t.includes("null")
            ? ((m.type = t.filter((e) => "null" !== e)[0]), (m.nullable = !0))
            : (m.type = t)
          : (m.type = "null" === t ? "null" : t)),
      void 0 !== p && (m.enum = p),
      null != o &&
        (m.properties = Object.entries(o).reduce(
          (e, [t, n]) => ((e[t] = Qd(n)), e),
          {},
        )),
      i && (m.items = Array.isArray(i) ? i.map(Qd) : Qd(i)),
      a && (m.allOf = a.map(Qd)),
      s)
    )
      if (
        s.some(
          (e) =>
            "object" == typeof e && "null" === (null == e ? void 0 : e.type),
        )
      ) {
        const e = s.filter(
          (e) =>
            !("object" == typeof e && "null" === (null == e ? void 0 : e.type)),
        );
        if (1 === e.length) {
          const t = Qd(e[0]);
          "object" == typeof t && ((m.nullable = !0), Object.assign(m, t));
        } else ((m.anyOf = e.map(Qd)), (m.nullable = !0));
      } else m.anyOf = s.map(Qd);
    return (l && (m.oneOf = l.map(Qd)), void 0 !== d && (m.minLength = d), m);
  }
  function ep(e) {
    return e.includes("/") ? e : `models/${e}`;
  }
  var tp = ul({
    responseModalities: sl($l(["TEXT", "IMAGE"])).optional(),
    thinkingConfig: ul({
      thinkingBudget: Zs().optional(),
      includeThoughts: Ws().optional(),
    }).optional(),
    cachedContent: ys().optional(),
    structuredOutputs: Ws().optional(),
    safetySettings: sl(
      ul({
        category: $l([
          "HARM_CATEGORY_UNSPECIFIED",
          "HARM_CATEGORY_HATE_SPEECH",
          "HARM_CATEGORY_DANGEROUS_CONTENT",
          "HARM_CATEGORY_HARASSMENT",
          "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "HARM_CATEGORY_CIVIC_INTEGRITY",
        ]),
        threshold: $l([
          "HARM_BLOCK_THRESHOLD_UNSPECIFIED",
          "BLOCK_LOW_AND_ABOVE",
          "BLOCK_MEDIUM_AND_ABOVE",
          "BLOCK_ONLY_HIGH",
          "BLOCK_NONE",
          "OFF",
        ]),
      }),
    ).optional(),
    threshold: $l([
      "HARM_BLOCK_THRESHOLD_UNSPECIFIED",
      "BLOCK_LOW_AND_ABOVE",
      "BLOCK_MEDIUM_AND_ABOVE",
      "BLOCK_ONLY_HIGH",
      "BLOCK_NONE",
      "OFF",
    ]).optional(),
    audioTimestamp: Ws().optional(),
  });
  function np({ finishReason: e, hasToolCalls: t }) {
    switch (e) {
      case "STOP":
        return t ? "tool-calls" : "stop";
      case "MAX_TOKENS":
        return "length";
      case "IMAGE_SAFETY":
      case "RECITATION":
      case "SAFETY":
      case "BLOCKLIST":
      case "PROHIBITED_CONTENT":
      case "SPII":
        return "content-filter";
      case "FINISH_REASON_UNSPECIFIED":
      case "OTHER":
        return "other";
      case "MALFORMED_FUNCTION_CALL":
        return "error";
      default:
        return "unknown";
    }
  }
  var rp = ul({
      web: ul({ uri: ys(), title: ys() }).nullish(),
      retrievedContext: ul({ uri: ys(), title: ys() }).nullish(),
    }),
    op = ul({
      webSearchQueries: sl(ys()).nullish(),
      retrievalQueries: sl(ys()).nullish(),
      searchEntryPoint: ul({ renderedContent: ys() }).nullish(),
      groundingChunks: sl(rp).nullish(),
      groundingSupports: sl(
        ul({
          segment: ul({
            startIndex: Zs().nullish(),
            endIndex: Zs().nullish(),
            text: ys().nullish(),
          }),
          segment_text: ys().nullish(),
          groundingChunkIndices: sl(Zs()).nullish(),
          supportChunkIndices: sl(Zs()).nullish(),
          confidenceScores: sl(Zs()).nullish(),
          confidenceScore: sl(Zs()).nullish(),
        }),
      ).nullish(),
      retrievalMetadata: pl([
        ul({ webDynamicRetrievalScore: Zs() }),
        ul({}),
      ]).nullish(),
    }),
    ip = ic({
      id: "google.google_search",
      name: "google_search",
      inputSchema: ul({
        mode: $l(["MODE_DYNAMIC", "MODE_UNSPECIFIED"]).default(
          "MODE_UNSPECIFIED",
        ),
        dynamicThreshold: Zs().default(1),
      }),
    }),
    ap = ul({ retrievedUrl: ys(), urlRetrievalStatus: ys() }),
    sp = ul({ urlMetadata: sl(ap) }),
    lp = ic({
      id: "google.url_context",
      name: "url_context",
      inputSchema: ul({}),
    }),
    up = class {
      constructor(e, t) {
        var n;
        ((this.specificationVersion = "v2"),
          (this.modelId = e),
          (this.config = t),
          (this.generateId = null != (n = t.generateId) ? n : qu));
      }
      get provider() {
        return this.config.provider;
      }
      get supportedUrls() {
        var e, t, n;
        return null !=
          (n =
            null == (t = (e = this.config).supportedUrls) ? void 0 : t.call(e))
          ? n
          : {};
      }
      async getArgs({
        prompt: e,
        maxOutputTokens: t,
        temperature: n,
        topP: r,
        topK: o,
        frequencyPenalty: i,
        presencePenalty: a,
        stopSequences: s,
        responseFormat: l,
        seed: u,
        tools: c,
        toolChoice: d,
        providerOptions: p,
      }) {
        var m, h;
        const g = [],
          f = await tc({ provider: "google", providerOptions: p, schema: tp });
        !0 !==
          (null == (m = null == f ? void 0 : f.thinkingConfig)
            ? void 0
            : m.includeThoughts) ||
          this.config.provider.startsWith("google.vertex.") ||
          g.push({
            type: "other",
            message: `The 'includeThoughts' option is only supported with the Google Vertex provider and might not be supported or could behave unexpectedly with the current Google provider (${this.config.provider}).`,
          });
        const v = this.modelId.toLowerCase().startsWith("gemma-"),
          { contents: y, systemInstruction: b } = (function (e, t) {
            var n;
            const r = [],
              o = [];
            let i = !0;
            const a = null != (n = null == t ? void 0 : t.isGemmaModel) && n;
            for (const { role: t, content: n } of e)
              switch (t) {
                case "system":
                  if (!i)
                    throw new fe({
                      functionality:
                        "system messages are only supported at the beginning of the conversation",
                    });
                  r.push({ text: n });
                  break;
                case "user": {
                  i = !1;
                  const e = [];
                  for (const t of n)
                    switch (t.type) {
                      case "text":
                        e.push({ text: t.text });
                        break;
                      case "file": {
                        const n =
                          "image/*" === t.mediaType
                            ? "image/jpeg"
                            : t.mediaType;
                        e.push(
                          t.data instanceof URL
                            ? {
                                fileData: {
                                  mimeType: n,
                                  fileUri: t.data.toString(),
                                },
                              }
                            : { inlineData: { mimeType: n, data: yc(t.data) } },
                        );
                        break;
                      }
                    }
                  o.push({ role: "user", parts: e });
                  break;
                }
                case "assistant":
                  ((i = !1),
                    o.push({
                      role: "model",
                      parts: n
                        .map((e) => {
                          var t, n, r, o, i, a;
                          switch (e.type) {
                            case "text":
                              return 0 === e.text.length
                                ? void 0
                                : {
                                    text: e.text,
                                    thoughtSignature:
                                      null ==
                                      (n =
                                        null == (t = e.providerOptions)
                                          ? void 0
                                          : t.google)
                                        ? void 0
                                        : n.thoughtSignature,
                                  };
                            case "reasoning":
                              return 0 === e.text.length
                                ? void 0
                                : {
                                    text: e.text,
                                    thought: !0,
                                    thoughtSignature:
                                      null ==
                                      (o =
                                        null == (r = e.providerOptions)
                                          ? void 0
                                          : r.google)
                                        ? void 0
                                        : o.thoughtSignature,
                                  };
                            case "file":
                              if ("image/png" !== e.mediaType)
                                throw new fe({
                                  functionality:
                                    "Only PNG images are supported in assistant messages",
                                });
                              if (e.data instanceof URL)
                                throw new fe({
                                  functionality:
                                    "File data URLs in assistant messages are not supported",
                                });
                              return {
                                inlineData: {
                                  mimeType: e.mediaType,
                                  data: yc(e.data),
                                },
                              };
                            case "tool-call":
                              return {
                                functionCall: {
                                  name: e.toolName,
                                  args: e.input,
                                },
                                thoughtSignature:
                                  null ==
                                  (a =
                                    null == (i = e.providerOptions)
                                      ? void 0
                                      : i.google)
                                    ? void 0
                                    : a.thoughtSignature,
                              };
                          }
                        })
                        .filter((e) => void 0 !== e),
                    }));
                  break;
                case "tool":
                  ((i = !1),
                    o.push({
                      role: "user",
                      parts: n.map((e) => ({
                        functionResponse: {
                          name: e.toolName,
                          response: {
                            name: e.toolName,
                            content: e.output.value,
                          },
                        },
                      })),
                    }));
              }
            if (a && r.length > 0 && o.length > 0 && "user" === o[0].role) {
              const e = r.map((e) => e.text).join("\n\n");
              o[0].parts.unshift({ text: e + "\n\n" });
            }
            return {
              systemInstruction: r.length > 0 && !a ? { parts: r } : void 0,
              contents: o,
            };
          })(e, { isGemmaModel: v }),
          {
            tools: _,
            toolConfig: w,
            toolWarnings: k,
          } = (function ({ tools: e, toolChoice: t, modelId: n }) {
            var r;
            e = (null == e ? void 0 : e.length) ? e : void 0;
            const o = [],
              i = n.includes("gemini-2"),
              a = n.includes("gemini-1.5-flash") && !n.includes("-8b");
            if (null == e)
              return { tools: void 0, toolConfig: void 0, toolWarnings: o };
            const s = e.some((e) => "function" === e.type),
              l = e.some((e) => "provider-defined" === e.type);
            if (
              (s &&
                l &&
                o.push({
                  type: "unsupported-tool",
                  tool: e.find((e) => "function" === e.type),
                  details:
                    "Cannot mix function tools with provider-defined tools in the same request. Please use either function tools or provider-defined tools, but not both.",
                }),
              l)
            ) {
              const t = {};
              return (
                e
                  .filter((e) => "provider-defined" === e.type)
                  .forEach((e) => {
                    switch (e.id) {
                      case "google.google_search":
                        i
                          ? (t.googleSearch = {})
                          : (t.googleSearchRetrieval = a
                              ? {
                                  dynamicRetrievalConfig: {
                                    mode: e.args.mode,
                                    dynamicThreshold: e.args.dynamicThreshold,
                                  },
                                }
                              : {});
                        break;
                      case "google.url_context":
                        i
                          ? (t.urlContext = {})
                          : o.push({
                              type: "unsupported-tool",
                              tool: e,
                              details:
                                "The URL context tool is not supported with other Gemini models than Gemini 2.",
                            });
                        break;
                      case "google.code_execution":
                        i
                          ? (t.codeExecution = {})
                          : o.push({
                              type: "unsupported-tool",
                              tool: e,
                              details:
                                "The code execution tools is not supported with other Gemini models than Gemini 2.",
                            });
                        break;
                      default:
                        o.push({ type: "unsupported-tool", tool: e });
                    }
                  }),
                {
                  tools: Object.keys(t).length > 0 ? t : void 0,
                  toolConfig: void 0,
                  toolWarnings: o,
                }
              );
            }
            const u = [];
            for (const t of e)
              "function" === t.type
                ? u.push({
                    name: t.name,
                    description: null != (r = t.description) ? r : "",
                    parameters: Qd(t.inputSchema),
                  })
                : o.push({ type: "unsupported-tool", tool: t });
            if (null == t)
              return {
                tools: { functionDeclarations: u },
                toolConfig: void 0,
                toolWarnings: o,
              };
            const c = t.type;
            switch (c) {
              case "auto":
                return {
                  tools: { functionDeclarations: u },
                  toolConfig: { functionCallingConfig: { mode: "AUTO" } },
                  toolWarnings: o,
                };
              case "none":
                return {
                  tools: { functionDeclarations: u },
                  toolConfig: { functionCallingConfig: { mode: "NONE" } },
                  toolWarnings: o,
                };
              case "required":
                return {
                  tools: { functionDeclarations: u },
                  toolConfig: { functionCallingConfig: { mode: "ANY" } },
                  toolWarnings: o,
                };
              case "tool":
                return {
                  tools: { functionDeclarations: u },
                  toolConfig: {
                    functionCallingConfig: {
                      mode: "ANY",
                      allowedFunctionNames: [t.toolName],
                    },
                  },
                  toolWarnings: o,
                };
              default:
                throw new fe({ functionality: `tool choice type: ${c}` });
            }
          })({ tools: c, toolChoice: d, modelId: this.modelId });
        return {
          args: {
            generationConfig: {
              maxOutputTokens: t,
              temperature: n,
              topK: o,
              topP: r,
              frequencyPenalty: i,
              presencePenalty: a,
              stopSequences: s,
              seed: u,
              responseMimeType:
                "json" === (null == l ? void 0 : l.type)
                  ? "application/json"
                  : void 0,
              responseSchema:
                "json" !== (null == l ? void 0 : l.type) ||
                null == l.schema ||
                (null != (h = null == f ? void 0 : f.structuredOutputs) && !h)
                  ? void 0
                  : Qd(l.schema),
              ...((null == f ? void 0 : f.audioTimestamp) && {
                audioTimestamp: f.audioTimestamp,
              }),
              responseModalities: null == f ? void 0 : f.responseModalities,
              thinkingConfig: null == f ? void 0 : f.thinkingConfig,
            },
            contents: y,
            systemInstruction: v ? void 0 : b,
            safetySettings: null == f ? void 0 : f.safetySettings,
            tools: _,
            toolConfig: w,
            cachedContent: null == f ? void 0 : f.cachedContent,
          },
          warnings: [...g, ...k],
        };
      }
      async doGenerate(e) {
        var t, n, r, o, i, a, s, l, u, c, d, p;
        const { args: m, warnings: h } = await this.getArgs(e),
          g = JSON.stringify(m),
          f = Ru(await sc(this.config.headers), e.headers),
          {
            responseHeaders: v,
            value: y,
            rawValue: b,
          } = await rc({
            url: `${this.config.baseURL}/${ep(this.modelId)}:generateContent`,
            headers: f,
            body: m,
            failedResponseHandler: Jd,
            successfulResponseHandler: cc(hp),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          }),
          _ = y.candidates[0],
          w = [],
          k = null != (n = null == (t = _.content) ? void 0 : t.parts) ? n : [],
          x = y.usageMetadata;
        let $;
        for (const e of k)
          if (
            "executableCode" in e &&
            (null == (r = e.executableCode) ? void 0 : r.code)
          ) {
            const t = this.config.generateId();
            (($ = t),
              w.push({
                type: "tool-call",
                toolCallId: t,
                toolName: "code_execution",
                input: JSON.stringify(e.executableCode),
                providerExecuted: !0,
              }));
          } else
            "codeExecutionResult" in e && e.codeExecutionResult
              ? (w.push({
                  type: "tool-result",
                  toolCallId: $,
                  toolName: "code_execution",
                  result: {
                    outcome: e.codeExecutionResult.outcome,
                    output: e.codeExecutionResult.output,
                  },
                  providerExecuted: !0,
                }),
                ($ = void 0))
              : "text" in e && null != e.text && e.text.length > 0
                ? w.push({
                    type: !0 === e.thought ? "reasoning" : "text",
                    text: e.text,
                    providerMetadata: e.thoughtSignature
                      ? { google: { thoughtSignature: e.thoughtSignature } }
                      : void 0,
                  })
                : "functionCall" in e
                  ? w.push({
                      type: "tool-call",
                      toolCallId: this.config.generateId(),
                      toolName: e.functionCall.name,
                      input: JSON.stringify(e.functionCall.args),
                      providerMetadata: e.thoughtSignature
                        ? { google: { thoughtSignature: e.thoughtSignature } }
                        : void 0,
                    })
                  : "inlineData" in e &&
                    w.push({
                      type: "file",
                      data: e.inlineData.data,
                      mediaType: e.inlineData.mimeType,
                    });
        const I =
          null !=
          (o = cp({
            groundingMetadata: _.groundingMetadata,
            generateId: this.config.generateId,
          }))
            ? o
            : [];
        for (const e of I) w.push(e);
        return {
          content: w,
          finishReason: np({
            finishReason: _.finishReason,
            hasToolCalls: w.some((e) => "tool-call" === e.type),
          }),
          usage: {
            inputTokens:
              null != (i = null == x ? void 0 : x.promptTokenCount)
                ? i
                : void 0,
            outputTokens:
              null != (a = null == x ? void 0 : x.candidatesTokenCount)
                ? a
                : void 0,
            totalTokens:
              null != (s = null == x ? void 0 : x.totalTokenCount) ? s : void 0,
            reasoningTokens:
              null != (l = null == x ? void 0 : x.thoughtsTokenCount)
                ? l
                : void 0,
            cachedInputTokens:
              null != (u = null == x ? void 0 : x.cachedContentTokenCount)
                ? u
                : void 0,
          },
          warnings: h,
          providerMetadata: {
            google: {
              groundingMetadata: null != (c = _.groundingMetadata) ? c : null,
              urlContextMetadata: null != (d = _.urlContextMetadata) ? d : null,
              safetyRatings: null != (p = _.safetyRatings) ? p : null,
              usageMetadata: null != x ? x : null,
            },
          },
          request: { body: g },
          response: { headers: v, body: b },
        };
      }
      async doStream(e) {
        const { args: t, warnings: n } = await this.getArgs(e),
          r = JSON.stringify(t),
          o = Ru(await sc(this.config.headers), e.headers),
          { responseHeaders: i, value: a } = await rc({
            url: `${this.config.baseURL}/${ep(this.modelId)}:streamGenerateContent?alt=sse`,
            headers: o,
            body: t,
            failedResponseHandler: Jd,
            successfulResponseHandler: uc(gp),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          });
        let s = "unknown";
        const l = {
          inputTokens: void 0,
          outputTokens: void 0,
          totalTokens: void 0,
        };
        let u;
        const c = this.config.generateId;
        let d = !1,
          p = null,
          m = null,
          h = 0;
        const g = new Set();
        let f;
        return {
          stream: a.pipeThrough(
            new TransformStream({
              start(e) {
                e.enqueue({ type: "stream-start", warnings: n });
              },
              transform(t, n) {
                var r, o, i, a, v, y, b, _, w, k, x;
                if (
                  (e.includeRawChunks &&
                    n.enqueue({ type: "raw", rawValue: t.rawValue }),
                  !t.success)
                )
                  return void n.enqueue({ type: "error", error: t.error });
                const $ = t.value,
                  I = $.usageMetadata;
                null != I &&
                  ((l.inputTokens =
                    null != (r = I.promptTokenCount) ? r : void 0),
                  (l.outputTokens =
                    null != (o = I.candidatesTokenCount) ? o : void 0),
                  (l.totalTokens =
                    null != (i = I.totalTokenCount) ? i : void 0),
                  (l.reasoningTokens =
                    null != (a = I.thoughtsTokenCount) ? a : void 0),
                  (l.cachedInputTokens =
                    null != (v = I.cachedContentTokenCount) ? v : void 0));
                const S = null == (y = $.candidates) ? void 0 : y[0];
                if (null == S) return;
                const T = S.content,
                  N = cp({
                    groundingMetadata: S.groundingMetadata,
                    generateId: c,
                  });
                if (null != N)
                  for (const e of N)
                    "url" !== e.sourceType ||
                      g.has(e.url) ||
                      (g.add(e.url), n.enqueue(e));
                if (null != T) {
                  const e = null != (b = T.parts) ? b : [];
                  for (const t of e)
                    if (
                      "executableCode" in t &&
                      (null == (_ = t.executableCode) ? void 0 : _.code)
                    ) {
                      const e = c();
                      ((f = e),
                        n.enqueue({
                          type: "tool-call",
                          toolCallId: e,
                          toolName: "code_execution",
                          input: JSON.stringify(t.executableCode),
                          providerExecuted: !0,
                        }),
                        (d = !0));
                    } else if (
                      "codeExecutionResult" in t &&
                      t.codeExecutionResult
                    ) {
                      const e = f;
                      e &&
                        (n.enqueue({
                          type: "tool-result",
                          toolCallId: e,
                          toolName: "code_execution",
                          result: {
                            outcome: t.codeExecutionResult.outcome,
                            output: t.codeExecutionResult.output,
                          },
                          providerExecuted: !0,
                        }),
                        (f = void 0));
                    } else
                      "text" in t &&
                        null != t.text &&
                        t.text.length > 0 &&
                        (!0 === t.thought
                          ? (null !== p &&
                              (n.enqueue({ type: "text-end", id: p }),
                              (p = null)),
                            null === m &&
                              ((m = String(h++)),
                              n.enqueue({
                                type: "reasoning-start",
                                id: m,
                                providerMetadata: t.thoughtSignature
                                  ? {
                                      google: {
                                        thoughtSignature: t.thoughtSignature,
                                      },
                                    }
                                  : void 0,
                              })),
                            n.enqueue({
                              type: "reasoning-delta",
                              id: m,
                              delta: t.text,
                              providerMetadata: t.thoughtSignature
                                ? {
                                    google: {
                                      thoughtSignature: t.thoughtSignature,
                                    },
                                  }
                                : void 0,
                            }))
                          : (null !== m &&
                              (n.enqueue({ type: "reasoning-end", id: m }),
                              (m = null)),
                            null === p &&
                              ((p = String(h++)),
                              n.enqueue({
                                type: "text-start",
                                id: p,
                                providerMetadata: t.thoughtSignature
                                  ? {
                                      google: {
                                        thoughtSignature: t.thoughtSignature,
                                      },
                                    }
                                  : void 0,
                              })),
                            n.enqueue({
                              type: "text-delta",
                              id: p,
                              delta: t.text,
                              providerMetadata: t.thoughtSignature
                                ? {
                                    google: {
                                      thoughtSignature: t.thoughtSignature,
                                    },
                                  }
                                : void 0,
                            })));
                  const t = (function (e) {
                    return null == e
                      ? void 0
                      : e.filter((e) => "inlineData" in e);
                  })(T.parts);
                  if (null != t)
                    for (const e of t)
                      n.enqueue({
                        type: "file",
                        mediaType: e.inlineData.mimeType,
                        data: e.inlineData.data,
                      });
                  const r = (function ({ parts: e, generateId: t }) {
                    const n =
                      null == e ? void 0 : e.filter((e) => "functionCall" in e);
                    return null == n || 0 === n.length
                      ? void 0
                      : n.map((e) => ({
                          type: "tool-call",
                          toolCallId: t(),
                          toolName: e.functionCall.name,
                          args: JSON.stringify(e.functionCall.args),
                          providerMetadata: e.thoughtSignature
                            ? {
                                google: {
                                  thoughtSignature: e.thoughtSignature,
                                },
                              }
                            : void 0,
                        }));
                  })({ parts: T.parts, generateId: c });
                  if (null != r)
                    for (const e of r)
                      (n.enqueue({
                        type: "tool-input-start",
                        id: e.toolCallId,
                        toolName: e.toolName,
                        providerMetadata: e.providerMetadata,
                      }),
                        n.enqueue({
                          type: "tool-input-delta",
                          id: e.toolCallId,
                          delta: e.args,
                          providerMetadata: e.providerMetadata,
                        }),
                        n.enqueue({
                          type: "tool-input-end",
                          id: e.toolCallId,
                          providerMetadata: e.providerMetadata,
                        }),
                        n.enqueue({
                          type: "tool-call",
                          toolCallId: e.toolCallId,
                          toolName: e.toolName,
                          input: e.args,
                          providerMetadata: e.providerMetadata,
                        }),
                        (d = !0));
                }
                null != S.finishReason &&
                  ((s = np({ finishReason: S.finishReason, hasToolCalls: d })),
                  (u = {
                    google: {
                      groundingMetadata:
                        null != (w = S.groundingMetadata) ? w : null,
                      urlContextMetadata:
                        null != (k = S.urlContextMetadata) ? k : null,
                      safetyRatings: null != (x = S.safetyRatings) ? x : null,
                    },
                  }),
                  null != I && (u.google.usageMetadata = I));
              },
              flush(e) {
                (null !== p && e.enqueue({ type: "text-end", id: p }),
                  null !== m && e.enqueue({ type: "reasoning-end", id: m }),
                  e.enqueue({
                    type: "finish",
                    finishReason: s,
                    usage: l,
                    providerMetadata: u,
                  }));
              },
            }),
          ),
          response: { headers: i },
          request: { body: r },
        };
      }
    };
  function cp({ groundingMetadata: e, generateId: t }) {
    var n;
    return null == (n = null == e ? void 0 : e.groundingChunks)
      ? void 0
      : n
          .filter((e) => null != e.web)
          .map((e) => ({
            type: "source",
            sourceType: "url",
            id: t(),
            url: e.web.uri,
            title: e.web.title,
          }));
  }
  var dp = ul({
      parts: sl(
        pl([
          ul({
            functionCall: ul({ name: ys(), args: tl() }),
            thoughtSignature: ys().nullish(),
          }),
          ul({ inlineData: ul({ mimeType: ys(), data: ys() }) }),
          ul({
            executableCode: ul({ language: ys(), code: ys() }).nullish(),
            codeExecutionResult: ul({ outcome: ys(), output: ys() }).nullish(),
            text: ys().nullish(),
            thought: Ws().nullish(),
            thoughtSignature: ys().nullish(),
          }),
        ]),
      ).nullish(),
    }),
    pp = ul({
      category: ys().nullish(),
      probability: ys().nullish(),
      probabilityScore: Zs().nullish(),
      severity: ys().nullish(),
      severityScore: Zs().nullish(),
      blocked: Ws().nullish(),
    }),
    mp = ul({
      cachedContentTokenCount: Zs().nullish(),
      thoughtsTokenCount: Zs().nullish(),
      promptTokenCount: Zs().nullish(),
      candidatesTokenCount: Zs().nullish(),
      totalTokenCount: Zs().nullish(),
    }),
    hp = ul({
      candidates: sl(
        ul({
          content: dp.nullish().or(ul({}).strict()),
          finishReason: ys().nullish(),
          safetyRatings: sl(pp).nullish(),
          groundingMetadata: op.nullish(),
          urlContextMetadata: sp.nullish(),
        }),
      ),
      usageMetadata: mp.nullish(),
    }),
    gp = ul({
      candidates: sl(
        ul({
          content: dp.nullish(),
          finishReason: ys().nullish(),
          safetyRatings: sl(pp).nullish(),
          groundingMetadata: op.nullish(),
          urlContextMetadata: sp.nullish(),
        }),
      ).nullish(),
      usageMetadata: mp.nullish(),
    }),
    fp = {
      googleSearch: ip,
      urlContext: lp,
      codeExecution: ac({
        id: "google.code_execution",
        name: "code_execution",
        inputSchema: ul({
          language: ys().describe("The programming language of the code."),
          code: ys().describe("The code to be executed."),
        }),
        outputSchema: ul({
          outcome: ys().describe(
            'The outcome of the execution (e.g., "OUTCOME_OK").',
          ),
          output: ys().describe("The output from the code execution."),
        }),
      }),
    },
    vp = class {
      constructor(e, t, n) {
        ((this.modelId = e),
          (this.settings = t),
          (this.config = n),
          (this.specificationVersion = "v2"));
      }
      get maxImagesPerCall() {
        var e;
        return null != (e = this.settings.maxImagesPerCall) ? e : 4;
      }
      get provider() {
        return this.config.provider;
      }
      async doGenerate(e) {
        var t, n, r;
        const {
            prompt: o,
            n: i = 1,
            size: a = "1024x1024",
            aspectRatio: s = "1:1",
            seed: l,
            providerOptions: u,
            headers: c,
            abortSignal: d,
          } = e,
          p = [];
        (null != a &&
          p.push({
            type: "unsupported-setting",
            setting: "size",
            details:
              "This model does not support the `size` option. Use `aspectRatio` instead.",
          }),
          null != l &&
            p.push({
              type: "unsupported-setting",
              setting: "seed",
              details:
                "This model does not support the `seed` option through this provider.",
            }));
        const m = await tc({
            provider: "google",
            providerOptions: u,
            schema: bp,
          }),
          h =
            null !=
            (r =
              null ==
              (n = null == (t = this.config._internal) ? void 0 : t.currentDate)
                ? void 0
                : n.call(t))
              ? r
              : new Date(),
          g = { sampleCount: i };
        (null != s && (g.aspectRatio = s), m && Object.assign(g, m));
        const f = { instances: [{ prompt: o }], parameters: g },
          { responseHeaders: v, value: y } = await rc({
            url: `${this.config.baseURL}/models/${this.modelId}:predict`,
            headers: Ru(await sc(this.config.headers), c),
            body: f,
            failedResponseHandler: Jd,
            successfulResponseHandler: cc(yp),
            abortSignal: d,
            fetch: this.config.fetch,
          });
        return {
          images: y.predictions.map((e) => e.bytesBase64Encoded),
          warnings: null != p ? p : [],
          providerMetadata: {
            google: { images: y.predictions.map((e) => ({})) },
          },
          response: { timestamp: h, modelId: this.modelId, headers: v },
        };
      }
    },
    yp = ul({ predictions: sl(ul({ bytesBase64Encoded: ys() })).default([]) }),
    bp = ul({
      personGeneration: $l([
        "dont_allow",
        "allow_adult",
        "allow_all",
      ]).nullish(),
      aspectRatio: $l(["1:1", "3:4", "4:3", "9:16", "16:9"]).nullish(),
    });
  function _p(e = {}) {
    var t;
    const n =
        null != (t = bc(e.baseURL))
          ? t
          : "https://generativelanguage.googleapis.com/v1beta",
      r = () => ({
        "x-goog-api-key": Bu({
          apiKey: e.apiKey,
          environmentVariableName: "GOOGLE_GENERATIVE_AI_API_KEY",
          description: "Google Generative AI",
        }),
        ...e.headers,
      }),
      o = (t) => {
        var o;
        return new up(t, {
          provider: "google.generative-ai",
          baseURL: n,
          headers: r,
          generateId: null != (o = e.generateId) ? o : qu,
          supportedUrls: () => ({
            "*": [
              new RegExp(`^${n}/files/.*$`),
              new RegExp(
                "^https://(?:www\\.)?youtube\\.com/watch\\?v=[\\w-]+(?:&[\\w=&.-]*)?$",
              ),
              new RegExp("^https://youtu\\.be/[\\w-]+(?:\\?[\\w=&.-]*)?$"),
            ],
          }),
          fetch: e.fetch,
        });
      },
      i = (t) =>
        new Gd(t, {
          provider: "google.generative-ai",
          baseURL: n,
          headers: r,
          fetch: e.fetch,
        }),
      a = (t, o = {}) =>
        new vp(t, o, {
          provider: "google.generative-ai",
          baseURL: n,
          headers: r,
          fetch: e.fetch,
        }),
      s = function (e) {
        if (new.target)
          throw new Error(
            "The Google Generative AI model function cannot be called with the new keyword.",
          );
        return o(e);
      };
    return (
      (s.languageModel = o),
      (s.chat = o),
      (s.generativeAI = o),
      (s.embedding = i),
      (s.textEmbedding = i),
      (s.textEmbeddingModel = i),
      (s.image = a),
      (s.imageModel = a),
      (s.tools = fp),
      s
    );
  }
  _p();
  var wp = ul({ type: Sl("error"), error: ul({ type: ys(), message: ys() }) });
  function kp(e) {
    var t;
    const n = null == e ? void 0 : e.anthropic;
    return null != (t = null == n ? void 0 : n.cacheControl)
      ? t
      : null == n
        ? void 0
        : n.cache_control;
  }
  (lc({ errorSchema: wp, errorToMessage: (e) => e.error.message }),
    ul({
      citations: ul({ enabled: Ws() }).optional(),
      title: ys().optional(),
      context: ys().optional(),
    }),
    ul({
      sendReasoning: Ws().optional(),
      thinking: ul({
        type: pl([Sl("enabled"), Sl("disabled")]),
        budgetTokens: Zs().optional(),
      }).optional(),
      disableParallelToolUse: Ws().optional(),
    }));
  var xp = ul({
      maxUses: Zs().optional(),
      allowedDomains: sl(ys()).optional(),
      blockedDomains: sl(ys()).optional(),
      userLocation: ul({
        type: Sl("approximate"),
        city: ys().optional(),
        region: ys().optional(),
        country: ys().optional(),
        timezone: ys().optional(),
      }).optional(),
    }),
    $p = sl(
      ul({
        url: ys(),
        title: ys(),
        pageAge: ys().nullable(),
        encryptedContent: ys(),
        type: ys(),
      }),
    ),
    Ip = ac({
      id: "anthropic.web_search_20250305",
      name: "web_search",
      inputSchema: ul({ query: ys() }),
      outputSchema: $p,
    });
  function Sp(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      "type" in e &&
      "web_search_20250305" === e.type
    );
  }
  var Tp = {
      webSearchResult: ul({
        type: Sl("web_search_result_location"),
        cited_text: ys(),
        url: ys(),
        title: ys(),
        encrypted_index: ys(),
      }),
      pageLocation: ul({
        type: Sl("page_location"),
        cited_text: ys(),
        document_index: Zs(),
        document_title: ys().nullable(),
        start_page_number: Zs(),
        end_page_number: Zs(),
      }),
      charLocation: ul({
        type: Sl("char_location"),
        cited_text: ys(),
        document_index: Zs(),
        document_title: ys().nullable(),
        start_char_index: Zs(),
        end_char_index: Zs(),
      }),
    },
    Np = hl("type", [Tp.webSearchResult, Tp.pageLocation, Tp.charLocation]);
  (hl("type", [Tp.pageLocation, Tp.charLocation]),
    ul({
      type: Sl("message"),
      id: ys().nullish(),
      model: ys().nullish(),
      content: sl(
        hl("type", [
          ul({ type: Sl("text"), text: ys(), citations: sl(Np).optional() }),
          ul({ type: Sl("thinking"), thinking: ys(), signature: ys() }),
          ul({ type: Sl("redacted_thinking"), data: ys() }),
          ul({ type: Sl("tool_use"), id: ys(), name: ys(), input: tl() }),
          ul({
            type: Sl("server_tool_use"),
            id: ys(),
            name: ys(),
            input: _l(ys(), tl()).nullish(),
          }),
          ul({
            type: Sl("web_search_tool_result"),
            tool_use_id: ys(),
            content: pl([
              sl(
                ul({
                  type: Sl("web_search_result"),
                  url: ys(),
                  title: ys(),
                  encrypted_content: ys(),
                  page_age: ys().nullish(),
                }),
              ),
              ul({
                type: Sl("web_search_tool_result_error"),
                error_code: ys(),
              }),
            ]),
          }),
        ]),
      ),
      stop_reason: ys().nullish(),
      usage: cl({
        input_tokens: Zs(),
        output_tokens: Zs(),
        cache_creation_input_tokens: Zs().nullish(),
        cache_read_input_tokens: Zs().nullish(),
      }),
    }),
    hl("type", [
      ul({
        type: Sl("message_start"),
        message: ul({
          id: ys().nullish(),
          model: ys().nullish(),
          usage: cl({
            input_tokens: Zs(),
            output_tokens: Zs(),
            cache_creation_input_tokens: Zs().nullish(),
            cache_read_input_tokens: Zs().nullish(),
          }),
        }),
      }),
      ul({
        type: Sl("content_block_start"),
        index: Zs(),
        content_block: hl("type", [
          ul({ type: Sl("text"), text: ys() }),
          ul({ type: Sl("thinking"), thinking: ys() }),
          ul({ type: Sl("tool_use"), id: ys(), name: ys() }),
          ul({ type: Sl("redacted_thinking"), data: ys() }),
          ul({
            type: Sl("server_tool_use"),
            id: ys(),
            name: ys(),
            input: _l(ys(), tl()).nullish(),
          }),
          ul({
            type: Sl("web_search_tool_result"),
            tool_use_id: ys(),
            content: pl([
              sl(
                ul({
                  type: Sl("web_search_result"),
                  url: ys(),
                  title: ys(),
                  encrypted_content: ys(),
                  page_age: ys().nullish(),
                }),
              ),
              ul({
                type: Sl("web_search_tool_result_error"),
                error_code: ys(),
              }),
            ]),
          }),
        ]),
      }),
      ul({
        type: Sl("content_block_delta"),
        index: Zs(),
        delta: hl("type", [
          ul({ type: Sl("input_json_delta"), partial_json: ys() }),
          ul({ type: Sl("text_delta"), text: ys() }),
          ul({ type: Sl("thinking_delta"), thinking: ys() }),
          ul({ type: Sl("signature_delta"), signature: ys() }),
          ul({ type: Sl("citations_delta"), citation: Np }),
        ]),
      }),
      ul({ type: Sl("content_block_stop"), index: Zs() }),
      ul({ type: Sl("error"), error: ul({ type: ys(), message: ys() }) }),
      ul({
        type: Sl("message_delta"),
        delta: ul({ stop_reason: ys().nullish() }),
        usage: ul({ output_tokens: Zs() }),
      }),
      ul({ type: Sl("message_stop") }),
      ul({ type: Sl("ping") }),
    ]),
    ul({ signature: ys().optional(), redactedData: ys().optional() }));
  var Op = ic({
      id: "anthropic.bash_20241022",
      name: "bash",
      inputSchema: ou.object({
        command: ou.string(),
        restart: ou.boolean().optional(),
      }),
    }),
    Ep = ic({
      id: "anthropic.bash_20250124",
      name: "bash",
      inputSchema: ou.object({
        command: ou.string(),
        restart: ou.boolean().optional(),
      }),
    }),
    Ap = ic({
      id: "anthropic.computer_20241022",
      name: "computer",
      inputSchema: ul({
        action: $l([
          "key",
          "type",
          "mouse_move",
          "left_click",
          "left_click_drag",
          "right_click",
          "middle_click",
          "double_click",
          "screenshot",
          "cursor_position",
        ]),
        coordinate: sl(Zs().int()).optional(),
        text: ys().optional(),
      }),
    }),
    Up = ic({
      id: "anthropic.computer_20250124",
      name: "computer",
      inputSchema: ul({
        action: $l([
          "key",
          "hold_key",
          "type",
          "cursor_position",
          "mouse_move",
          "left_mouse_down",
          "left_mouse_up",
          "left_click",
          "left_click_drag",
          "right_click",
          "middle_click",
          "double_click",
          "triple_click",
          "scroll",
          "wait",
          "screenshot",
        ]),
        coordinate: yl([Zs().int(), Zs().int()]).optional(),
        duration: Zs().optional(),
        scroll_amount: Zs().optional(),
        scroll_direction: $l(["up", "down", "left", "right"]).optional(),
        start_coordinate: yl([Zs().int(), Zs().int()]).optional(),
        text: ys().optional(),
      }),
    }),
    Cp = {
      bash_20241022: Op,
      bash_20250124: Ep,
      textEditor_20241022: ic({
        id: "anthropic.text_editor_20241022",
        name: "str_replace_editor",
        inputSchema: ul({
          command: $l(["view", "create", "str_replace", "insert", "undo_edit"]),
          path: ys(),
          file_text: ys().optional(),
          insert_line: Zs().int().optional(),
          new_str: ys().optional(),
          old_str: ys().optional(),
          view_range: sl(Zs().int()).optional(),
        }),
      }),
      textEditor_20250124: ic({
        id: "anthropic.text_editor_20250124",
        name: "str_replace_editor",
        inputSchema: ul({
          command: $l(["view", "create", "str_replace", "insert", "undo_edit"]),
          path: ys(),
          file_text: ys().optional(),
          insert_line: Zs().int().optional(),
          new_str: ys().optional(),
          old_str: ys().optional(),
          view_range: sl(Zs().int()).optional(),
        }),
      }),
      textEditor_20250429: ic({
        id: "anthropic.text_editor_20250429",
        name: "str_replace_based_edit_tool",
        inputSchema: ul({
          command: $l(["view", "create", "str_replace", "insert"]),
          path: ys(),
          file_text: ys().optional(),
          insert_line: Zs().int().optional(),
          new_str: ys().optional(),
          old_str: ys().optional(),
          view_range: sl(Zs().int()).optional(),
        }),
      }),
      computer_20241022: Ap,
      computer_20250124: Up,
      webSearch_20250305: (e = {}) => Ip(e),
    };
  ("function" == typeof SuppressedError && SuppressedError,
    "undefined" != typeof Buffer && Buffer.from);
  var Pp = (function () {
      function e() {
        this.checksum = 4294967295;
      }
      return (
        (e.prototype.update = function (e) {
          var t, n;
          try {
            for (
              var r = (function (e) {
                  var t = "function" == typeof Symbol && Symbol.iterator,
                    n = t && e[t],
                    r = 0;
                  if (n) return n.call(e);
                  if (e && "number" == typeof e.length)
                    return {
                      next: function () {
                        return (
                          e && r >= e.length && (e = void 0),
                          { value: e && e[r++], done: !e }
                        );
                      },
                    };
                  throw new TypeError(
                    t
                      ? "Object is not iterable."
                      : "Symbol.iterator is not defined.",
                  );
                })(e),
                o = r.next();
              !o.done;
              o = r.next()
            ) {
              var i = o.value;
              this.checksum =
                (this.checksum >>> 8) ^ Dp[255 & (this.checksum ^ i)];
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              o && !o.done && (n = r.return) && n.call(r);
            } finally {
              if (t) throw t.error;
            }
          }
          return this;
        }),
        (e.prototype.digest = function () {
          return (4294967295 ^ this.checksum) >>> 0;
        }),
        e
      );
    })(),
    Dp = (function (e) {
      if (!Uint32Array.from) {
        for (var t = new Uint32Array(e.length), n = 0; n < e.length; )
          ((t[n] = e[n]), (n += 1));
        return t;
      }
      return Uint32Array.from(e);
    })([
      0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685,
      2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995,
      2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648,
      2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990,
      1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755,
      2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145,
      1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206,
      2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980,
      1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705,
      3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527,
      1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772,
      4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290,
      251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719,
      3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925,
      453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202,
      4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960,
      984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733,
      3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467,
      855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048,
      3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054,
      702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443,
      3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945,
      2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430,
      2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580,
      2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225,
      1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143,
      2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732,
      1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850,
      2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135,
      1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109,
      3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954,
      1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920,
      3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877,
      83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603,
      3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992,
      534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934,
      4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795,
      376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105,
      3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270,
      936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108,
      3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449,
      601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471,
      3272380065, 1510334235, 755167117,
    ]);
  const jp = {},
    zp = {};
  for (let e = 0; e < 256; e++) {
    let t = e.toString(16).toLowerCase();
    (1 === t.length && (t = `0${t}`), (jp[e] = t), (zp[t] = e));
  }
  function Rp(e) {
    let t = "";
    for (let n = 0; n < e.byteLength; n++) t += jp[e[n]];
    return t;
  }
  class Mp {
    constructor(e) {
      if (((this.bytes = e), 8 !== e.byteLength))
        throw new Error("Int64 buffers must be exactly 8 bytes");
    }
    static fromNumber(e) {
      if (e > 0x8000000000000000 || e < -0x8000000000000000)
        throw new Error(
          `${e} is too large (or, if negative, too small) to represent as an Int64`,
        );
      const t = new Uint8Array(8);
      for (
        let n = 7, r = Math.abs(Math.round(e));
        n > -1 && r > 0;
        n--, r /= 256
      )
        t[n] = r;
      return (e < 0 && qp(t), new Mp(t));
    }
    valueOf() {
      const e = this.bytes.slice(0),
        t = 128 & e[0];
      return (t && qp(e), parseInt(Rp(e), 16) * (t ? -1 : 1));
    }
    toString() {
      return String(this.valueOf());
    }
  }
  function qp(e) {
    for (let t = 0; t < 8; t++) e[t] ^= 255;
    for (let t = 7; t > -1 && (e[t]++, 0 === e[t]); t--);
  }
  class Zp {
    constructor(e, t) {
      ((this.toUtf8 = e), (this.fromUtf8 = t));
    }
    format(e) {
      const t = [];
      for (const n of Object.keys(e)) {
        const r = this.fromUtf8(n);
        t.push(
          Uint8Array.from([r.byteLength]),
          r,
          this.formatHeaderValue(e[n]),
        );
      }
      const n = new Uint8Array(t.reduce((e, t) => e + t.byteLength, 0));
      let r = 0;
      for (const e of t) (n.set(e, r), (r += e.byteLength));
      return n;
    }
    formatHeaderValue(e) {
      switch (e.type) {
        case "boolean":
          return Uint8Array.from([e.value ? 0 : 1]);
        case "byte":
          return Uint8Array.from([2, e.value]);
        case "short":
          const t = new DataView(new ArrayBuffer(3));
          return (
            t.setUint8(0, 3),
            t.setInt16(1, e.value, !1),
            new Uint8Array(t.buffer)
          );
        case "integer":
          const n = new DataView(new ArrayBuffer(5));
          return (
            n.setUint8(0, 4),
            n.setInt32(1, e.value, !1),
            new Uint8Array(n.buffer)
          );
        case "long":
          const r = new Uint8Array(9);
          return ((r[0] = 5), r.set(e.value.bytes, 1), r);
        case "binary":
          const o = new DataView(new ArrayBuffer(3 + e.value.byteLength));
          (o.setUint8(0, 6), o.setUint16(1, e.value.byteLength, !1));
          const i = new Uint8Array(o.buffer);
          return (i.set(e.value, 3), i);
        case "string":
          const a = this.fromUtf8(e.value),
            s = new DataView(new ArrayBuffer(3 + a.byteLength));
          (s.setUint8(0, 7), s.setUint16(1, a.byteLength, !1));
          const l = new Uint8Array(s.buffer);
          return (l.set(a, 3), l);
        case "timestamp":
          const u = new Uint8Array(9);
          return (
            (u[0] = 8),
            u.set(Mp.fromNumber(e.value.valueOf()).bytes, 1),
            u
          );
        case "uuid":
          if (!Yp.test(e.value))
            throw new Error(`Invalid UUID received: ${e.value}`);
          const c = new Uint8Array(17);
          return (
            (c[0] = 9),
            c.set(
              (function (e) {
                if (e.length % 2 != 0)
                  throw new Error(
                    "Hex encoded strings must have an even number length",
                  );
                const t = new Uint8Array(e.length / 2);
                for (let n = 0; n < e.length; n += 2) {
                  const r = e.slice(n, n + 2).toLowerCase();
                  if (!(r in zp))
                    throw new Error(
                      `Cannot decode unrecognized sequence ${r} as hexadecimal`,
                    );
                  t[n / 2] = zp[r];
                }
                return t;
              })(e.value.replace(/\-/g, "")),
              1,
            ),
            c
          );
      }
    }
    parse(e) {
      const t = {};
      let n = 0;
      for (; n < e.byteLength; ) {
        const r = e.getUint8(n++),
          o = this.toUtf8(new Uint8Array(e.buffer, e.byteOffset + n, r));
        switch (((n += r), e.getUint8(n++))) {
          case 0:
            t[o] = { type: Fp, value: !0 };
            break;
          case 1:
            t[o] = { type: Fp, value: !1 };
            break;
          case 2:
            t[o] = { type: Bp, value: e.getInt8(n++) };
            break;
          case 3:
            ((t[o] = { type: Wp, value: e.getInt16(n, !1) }), (n += 2));
            break;
          case 4:
            ((t[o] = { type: Hp, value: e.getInt32(n, !1) }), (n += 4));
            break;
          case 5:
            ((t[o] = {
              type: Vp,
              value: new Mp(new Uint8Array(e.buffer, e.byteOffset + n, 8)),
            }),
              (n += 8));
            break;
          case 6:
            const r = e.getUint16(n, !1);
            ((n += 2),
              (t[o] = {
                type: Jp,
                value: new Uint8Array(e.buffer, e.byteOffset + n, r),
              }),
              (n += r));
            break;
          case 7:
            const i = e.getUint16(n, !1);
            ((n += 2),
              (t[o] = {
                type: Kp,
                value: this.toUtf8(
                  new Uint8Array(e.buffer, e.byteOffset + n, i),
                ),
              }),
              (n += i));
            break;
          case 8:
            ((t[o] = {
              type: Gp,
              value: new Date(
                new Mp(new Uint8Array(e.buffer, e.byteOffset + n, 8)).valueOf(),
              ),
            }),
              (n += 8));
            break;
          case 9:
            const a = new Uint8Array(e.buffer, e.byteOffset + n, 16);
            ((n += 16),
              (t[o] = {
                type: Xp,
                value: `${Rp(a.subarray(0, 4))}-${Rp(a.subarray(4, 6))}-${Rp(a.subarray(6, 8))}-${Rp(a.subarray(8, 10))}-${Rp(a.subarray(10))}`,
              }));
            break;
          default:
            throw new Error("Unrecognized header type tag");
        }
      }
      return t;
    }
  }
  var Lp;
  !(function (e) {
    ((e[(e.boolTrue = 0)] = "boolTrue"),
      (e[(e.boolFalse = 1)] = "boolFalse"),
      (e[(e.byte = 2)] = "byte"),
      (e[(e.short = 3)] = "short"),
      (e[(e.integer = 4)] = "integer"),
      (e[(e.long = 5)] = "long"),
      (e[(e.byteArray = 6)] = "byteArray"),
      (e[(e.string = 7)] = "string"),
      (e[(e.timestamp = 8)] = "timestamp"),
      (e[(e.uuid = 9)] = "uuid"));
  })(Lp || (Lp = {}));
  const Fp = "boolean",
    Bp = "byte",
    Wp = "short",
    Hp = "integer",
    Vp = "long",
    Jp = "binary",
    Kp = "string",
    Gp = "timestamp",
    Xp = "uuid",
    Yp = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
  class Qp {
    constructor(e, t) {
      ((this.headerMarshaller = new Zp(e, t)),
        (this.messageBuffer = []),
        (this.isEndOfStream = !1));
    }
    feed(e) {
      this.messageBuffer.push(this.decode(e));
    }
    endOfStream() {
      this.isEndOfStream = !0;
    }
    getMessage() {
      const e = this.messageBuffer.pop(),
        t = this.isEndOfStream;
      return { getMessage: () => e, isEndOfStream: () => t };
    }
    getAvailableMessages() {
      const e = this.messageBuffer;
      this.messageBuffer = [];
      const t = this.isEndOfStream;
      return { getMessages: () => e, isEndOfStream: () => t };
    }
    encode({ headers: e, body: t }) {
      const n = this.headerMarshaller.format(e),
        r = n.byteLength + t.byteLength + 16,
        o = new Uint8Array(r),
        i = new DataView(o.buffer, o.byteOffset, o.byteLength),
        a = new Pp();
      return (
        i.setUint32(0, r, !1),
        i.setUint32(4, n.byteLength, !1),
        i.setUint32(8, a.update(o.subarray(0, 8)).digest(), !1),
        o.set(n, 12),
        o.set(t, n.byteLength + 12),
        i.setUint32(r - 4, a.update(o.subarray(8, r - 4)).digest(), !1),
        o
      );
    }
    decode(e) {
      const { headers: t, body: n } = (function ({
        byteLength: e,
        byteOffset: t,
        buffer: n,
      }) {
        if (e < 16)
          throw new Error(
            "Provided message too short to accommodate event stream message overhead",
          );
        const r = new DataView(n, t, e),
          o = r.getUint32(0, !1);
        if (e !== o)
          throw new Error(
            "Reported message length does not match received message length",
          );
        const i = r.getUint32(4, !1),
          a = r.getUint32(8, !1),
          s = r.getUint32(e - 4, !1),
          l = new Pp().update(new Uint8Array(n, t, 8));
        if (a !== l.digest())
          throw new Error(
            `The prelude checksum specified in the message (${a}) does not match the calculated CRC32 checksum (${l.digest()})`,
          );
        if ((l.update(new Uint8Array(n, t + 8, e - 12)), s !== l.digest()))
          throw new Error(
            `The message checksum (${l.digest()}) did not match the expected value of ${s}`,
          );
        return {
          headers: new DataView(n, t + 8 + 4, i),
          body: new Uint8Array(n, t + 8 + 4 + i, o - i - 16),
        };
      })(e);
      return { headers: this.headerMarshaller.parse(t), body: n };
    }
    formatHeaders(e) {
      return this.headerMarshaller.format(e);
    }
  }
  const em = (e) => new TextEncoder().encode(e),
    tm = (e) => {
      if ("string" == typeof e) return e;
      if (
        "object" != typeof e ||
        "number" != typeof e.byteOffset ||
        "number" != typeof e.byteLength
      )
        throw new Error(
          "@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.",
        );
      return new TextDecoder("utf-8").decode(e);
    },
    nm = new TextEncoder(),
    rm = {
      appstream2: "appstream",
      cloudhsmv2: "cloudhsm",
      email: "ses",
      marketplace: "aws-marketplace",
      mobile: "AWSMobileHubService",
      pinpoint: "mobiletargeting",
      queue: "sqs",
      "git-codecommit": "codecommit",
      "mturk-requester-sandbox": "mturk-requester",
      "personalize-runtime": "personalize",
    },
    om = new Set([
      "authorization",
      "content-type",
      "content-length",
      "user-agent",
      "presigned-expires",
      "expect",
      "x-amzn-trace-id",
      "range",
      "connection",
    ]);
  class im {
    constructor({
      method: e,
      url: t,
      headers: n,
      body: r,
      accessKeyId: o,
      secretAccessKey: i,
      sessionToken: a,
      service: s,
      region: l,
      cache: u,
      datetime: c,
      signQuery: d,
      appendSessionToken: p,
      allHeaders: m,
      singleEncode: h,
    }) {
      if (null == t) throw new TypeError("url is a required option");
      if (null == o) throw new TypeError("accessKeyId is a required option");
      if (null == i)
        throw new TypeError("secretAccessKey is a required option");
      let g, f;
      ((this.method = e || (r ? "POST" : "GET")),
        (this.url = new URL(t)),
        (this.headers = new Headers(n || {})),
        (this.body = r),
        (this.accessKeyId = o),
        (this.secretAccessKey = i),
        (this.sessionToken = a),
        (s && l) ||
          ([g, f] = (function (e, t) {
            const { hostname: n, pathname: r } = e;
            if (n.endsWith(".on.aws")) {
              const e = n.match(
                /^[^.]{1,63}\.lambda-url\.([^.]{1,63})\.on\.aws$/,
              );
              return null != e ? ["lambda", e[1] || ""] : ["", ""];
            }
            if (n.endsWith(".r2.cloudflarestorage.com")) return ["s3", "auto"];
            if (n.endsWith(".backblazeb2.com")) {
              const e = n.match(
                /^(?:[^.]{1,63}\.)?s3\.([^.]{1,63})\.backblazeb2\.com$/,
              );
              return null != e ? ["s3", e[1] || ""] : ["", ""];
            }
            const o = n
              .replace("dualstack.", "")
              .match(
                /([^.]{1,63})\.(?:([^.]{0,63})\.)?amazonaws\.com(?:\.cn)?$/,
              );
            let i = (o && o[1]) || "",
              a = o && o[2];
            if ("us-gov" === a) a = "us-gov-west-1";
            else if ("s3" === a || "s3-accelerate" === a)
              ((a = "us-east-1"), (i = "s3"));
            else if ("iot" === i)
              i = n.startsWith("iot.")
                ? "execute-api"
                : n.startsWith("data.jobs.iot.")
                  ? "iot-jobs-data"
                  : "/mqtt" === r
                    ? "iotdevicegateway"
                    : "iotdata";
            else if ("autoscaling" === i) {
              const e = (t.get("X-Amz-Target") || "").split(".")[0];
              "AnyScaleFrontendService" === e
                ? (i = "application-autoscaling")
                : "AnyScaleScalingPlannerFrontendService" === e &&
                  (i = "autoscaling-plans");
            } else
              null == a && i.startsWith("s3-")
                ? ((a = i.slice(3).replace(/^fips-|^external-1/, "")),
                  (i = "s3"))
                : i.endsWith("-fips")
                  ? (i = i.slice(0, -5))
                  : a && /-\d$/.test(i) && !/-\d$/.test(a) && ([i, a] = [a, i]);
            return [rm[i] || i, a || ""];
          })(this.url, this.headers)),
        (this.service = s || g || ""),
        (this.region = l || f || "us-east-1"),
        (this.cache = u || new Map()),
        (this.datetime =
          c || new Date().toISOString().replace(/[:-]|\.\d{3}/g, "")),
        (this.signQuery = d),
        (this.appendSessionToken = p || "iotdevicegateway" === this.service),
        this.headers.delete("Host"),
        "s3" !== this.service ||
          this.signQuery ||
          this.headers.has("X-Amz-Content-Sha256") ||
          this.headers.set("X-Amz-Content-Sha256", "UNSIGNED-PAYLOAD"));
      const v = this.signQuery ? this.url.searchParams : this.headers;
      if (
        (v.set("X-Amz-Date", this.datetime),
        this.sessionToken &&
          !this.appendSessionToken &&
          v.set("X-Amz-Security-Token", this.sessionToken),
        (this.signableHeaders = ["host", ...this.headers.keys()]
          .filter((e) => m || !om.has(e))
          .sort()),
        (this.signedHeaders = this.signableHeaders.join(";")),
        (this.canonicalHeaders = this.signableHeaders
          .map(
            (e) =>
              e +
              ":" +
              ("host" === e
                ? this.url.host
                : (this.headers.get(e) || "").replace(/\s+/g, " ")),
          )
          .join("\n")),
        (this.credentialString = [
          this.datetime.slice(0, 8),
          this.region,
          this.service,
          "aws4_request",
        ].join("/")),
        this.signQuery &&
          ("s3" !== this.service ||
            v.has("X-Amz-Expires") ||
            v.set("X-Amz-Expires", "86400"),
          v.set("X-Amz-Algorithm", "AWS4-HMAC-SHA256"),
          v.set(
            "X-Amz-Credential",
            this.accessKeyId + "/" + this.credentialString,
          ),
          v.set("X-Amz-SignedHeaders", this.signedHeaders)),
        "s3" === this.service)
      )
        try {
          this.encodedPath = decodeURIComponent(
            this.url.pathname.replace(/\+/g, " "),
          );
        } catch (e) {
          this.encodedPath = this.url.pathname;
        }
      else this.encodedPath = this.url.pathname.replace(/\/+/g, "/");
      (h ||
        (this.encodedPath = encodeURIComponent(this.encodedPath).replace(
          /%2F/g,
          "/",
        )),
        (this.encodedPath = cm(this.encodedPath)));
      const y = new Set();
      this.encodedSearch = [...this.url.searchParams]
        .filter(([e]) => {
          if (!e) return !1;
          if ("s3" === this.service) {
            if (y.has(e)) return !1;
            y.add(e);
          }
          return !0;
        })
        .map((e) => e.map((e) => cm(encodeURIComponent(e))))
        .sort(([e, t], [n, r]) =>
          e < n ? -1 : e > n ? 1 : t < r ? -1 : t > r ? 1 : 0,
        )
        .map((e) => e.join("="))
        .join("&");
    }
    async sign() {
      return (
        this.signQuery
          ? (this.url.searchParams.set(
              "X-Amz-Signature",
              await this.signature(),
            ),
            this.sessionToken &&
              this.appendSessionToken &&
              this.url.searchParams.set(
                "X-Amz-Security-Token",
                this.sessionToken,
              ))
          : this.headers.set("Authorization", await this.authHeader()),
        {
          method: this.method,
          url: this.url,
          headers: this.headers,
          body: this.body,
        }
      );
    }
    async authHeader() {
      return [
        "AWS4-HMAC-SHA256 Credential=" +
          this.accessKeyId +
          "/" +
          this.credentialString,
        "SignedHeaders=" + this.signedHeaders,
        "Signature=" + (await this.signature()),
      ].join(", ");
    }
    async signature() {
      const e = this.datetime.slice(0, 8),
        t = [this.secretAccessKey, e, this.region, this.service].join();
      let n = this.cache.get(t);
      if (!n) {
        const r = await am("AWS4" + this.secretAccessKey, e),
          o = await am(r, this.region),
          i = await am(o, this.service);
        ((n = await am(i, "aws4_request")), this.cache.set(t, n));
      }
      return um(await am(n, await this.stringToSign()));
    }
    async stringToSign() {
      return [
        "AWS4-HMAC-SHA256",
        this.datetime,
        this.credentialString,
        um(await sm(await this.canonicalString())),
      ].join("\n");
    }
    async canonicalString() {
      return [
        this.method.toUpperCase(),
        this.encodedPath,
        this.encodedSearch,
        this.canonicalHeaders + "\n",
        this.signedHeaders,
        await this.hexBodyHash(),
      ].join("\n");
    }
    async hexBodyHash() {
      let e =
        this.headers.get("X-Amz-Content-Sha256") ||
        ("s3" === this.service && this.signQuery ? "UNSIGNED-PAYLOAD" : null);
      if (null == e) {
        if (
          this.body &&
          "string" != typeof this.body &&
          !("byteLength" in this.body)
        )
          throw new Error(
            "body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header",
          );
        e = um(await sm(this.body || ""));
      }
      return e;
    }
  }
  async function am(e, t) {
    const n = await crypto.subtle.importKey(
      "raw",
      "string" == typeof e ? nm.encode(e) : e,
      { name: "HMAC", hash: { name: "SHA-256" } },
      !1,
      ["sign"],
    );
    return crypto.subtle.sign("HMAC", n, nm.encode(t));
  }
  async function sm(e) {
    return crypto.subtle.digest(
      "SHA-256",
      "string" == typeof e ? nm.encode(e) : e,
    );
  }
  const lm = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  function um(e) {
    const t = new Uint8Array(e);
    let n = "";
    for (let e = 0; e < t.length; e++) {
      const r = t[e];
      ((n += lm[(r >>> 4) & 15]), (n += lm[15 & r]));
    }
    return n;
  }
  function cm(e) {
    return e.replace(
      /[!'()*]/g,
      (e) => "%" + e.charCodeAt(0).toString(16).toUpperCase(),
    );
  }
  var dm = { cachePoint: { type: "default" } },
    pm = {
      "image/jpeg": "jpeg",
      "image/png": "png",
      "image/gif": "gif",
      "image/webp": "webp",
    },
    mm = {
      "application/pdf": "pdf",
      "text/csv": "csv",
      "application/msword": "doc",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
      "application/vnd.ms-excel": "xls",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "xlsx",
      "text/html": "html",
      "text/plain": "txt",
      "text/markdown": "md",
    },
    hm = ul({
      additionalModelRequestFields: _l(ys(), Qs()).optional(),
      reasoningConfig: ul({
        type: pl([Sl("enabled"), Sl("disabled")]).optional(),
        budgetTokens: Zs().optional(),
      }).optional(),
    }),
    gm = ul({ message: ys(), type: ys().nullish() }),
    fm =
      (e) =>
      async ({ response: t }) => {
        const n = Mu(t);
        if (null == t.body) throw new b({});
        const r = new Qp(tm, em);
        let o = new Uint8Array(0);
        const i = new TextDecoder();
        return {
          responseHeaders: n,
          value: t.body.pipeThrough(
            new TransformStream({
              async transform(t, n) {
                var a, s;
                const l = new Uint8Array(o.length + t.length);
                for (l.set(o), l.set(t, o.length), o = l; o.length >= 4; ) {
                  const t = new DataView(
                    o.buffer,
                    o.byteOffset,
                    o.byteLength,
                  ).getUint32(0, !1);
                  if (o.length < t) break;
                  try {
                    const l = o.subarray(0, t),
                      u = r.decode(l);
                    if (
                      ((o = o.slice(t)),
                      "event" ===
                        (null == (a = u.headers[":message-type"])
                          ? void 0
                          : a.value))
                    ) {
                      const t = i.decode(u.body),
                        r = await Yu({ text: t });
                      if (!r.success) {
                        n.enqueue(r);
                        break;
                      }
                      delete r.value.p;
                      let o = {
                        [null == (s = u.headers[":event-type"])
                          ? void 0
                          : s.value]: r.value,
                      };
                      const a = await Xu({ value: o, schema: e });
                      a.success
                        ? n.enqueue({
                            success: !0,
                            value: a.value,
                            rawValue: o,
                          })
                        : n.enqueue(a);
                    }
                  } catch (e) {
                    break;
                  }
                }
              },
            }),
          ),
        };
      };
  function vm(e) {
    var t;
    return null == (t = null == e ? void 0 : e.bedrock) ? void 0 : t.cachePoint;
  }
  function ym(e) {
    if (!e)
      throw new fe({
        functionality: "image without mime type",
        message: "Image mime type is required in user message part content",
      });
    const t = pm[e];
    if (!t)
      throw new fe({
        functionality: `image mime type: ${e}`,
        message: `Unsupported image mime type: ${e}, expected one of: ${Object.keys(pm).join(", ")}`,
      });
    return t;
  }
  function bm(e) {
    const t = mm[e];
    if (!t)
      throw new fe({
        functionality: `file mime type: ${e}`,
        message: `Unsupported file mime type: ${e}, expected one of: ${Object.keys(mm).join(", ")}`,
      });
    return t;
  }
  function _m(e, t, n, r) {
    return e && t && n ? r.trim() : r;
  }
  function wm(e) {
    switch (e) {
      case "stop_sequence":
      case "end_turn":
        return "stop";
      case "max_tokens":
        return "length";
      case "content_filtered":
      case "guardrail_intervened":
        return "content-filter";
      case "tool_use":
        return "tool-calls";
      default:
        return "unknown";
    }
  }
  var km = class {
      constructor(e, t) {
        ((this.modelId = e),
          (this.config = t),
          (this.specificationVersion = "v2"),
          (this.provider = "amazon-bedrock"),
          (this.supportedUrls = {}));
      }
      async getArgs({
        prompt: e,
        maxOutputTokens: t,
        temperature: n,
        topP: r,
        topK: o,
        frequencyPenalty: i,
        presencePenalty: a,
        stopSequences: s,
        responseFormat: l,
        seed: u,
        tools: c,
        toolChoice: d,
        providerOptions: p,
      }) {
        var m, h, g, f, v, y;
        const b =
            null !=
            (m = await tc({
              provider: "bedrock",
              providerOptions: p,
              schema: hm,
            }))
              ? m
              : {},
          _ = [];
        (null != i &&
          _.push({ type: "unsupported-setting", setting: "frequencyPenalty" }),
          null != a &&
            _.push({ type: "unsupported-setting", setting: "presencePenalty" }),
          null != u && _.push({ type: "unsupported-setting", setting: "seed" }),
          null != l &&
            "text" !== l.type &&
            "json" !== l.type &&
            _.push({
              type: "unsupported-setting",
              setting: "responseFormat",
              details: "Only text and json response formats are supported.",
            }),
          null != c &&
            "json" === (null == l ? void 0 : l.type) &&
            c.length > 0 &&
            _.push({
              type: "other",
              message:
                "JSON response format does not support tools. The provided tools are ignored.",
            }));
        const w =
            "json" === (null == l ? void 0 : l.type) && null != l.schema
              ? {
                  type: "function",
                  name: "json",
                  description: "Respond with a JSON object.",
                  inputSchema: l.schema,
                }
              : void 0,
          {
            toolConfig: k,
            additionalTools: x,
            toolWarnings: $,
            betas: I,
          } = (function ({ tools: e, toolChoice: t, modelId: n }) {
            const r = [],
              o = new Set();
            if (null == e || 0 === e.length)
              return {
                toolConfig: {},
                additionalTools: void 0,
                betas: o,
                toolWarnings: r,
              };
            const i = e.filter(
              (e) =>
                "provider-defined" !== e.type ||
                "anthropic.web_search_20250305" !== e.id ||
                (r.push({
                  type: "unsupported-tool",
                  tool: e,
                  details:
                    "The web_search_20250305 tool is not supported on Amazon Bedrock.",
                }),
                !1),
            );
            if (0 === i.length)
              return {
                toolConfig: {},
                additionalTools: void 0,
                betas: o,
                toolWarnings: r,
              };
            const a = n.includes("anthropic."),
              s = i.filter((e) => "provider-defined" === e.type),
              l = i.filter((e) => "function" === e.type);
            let u;
            const c = [],
              d = a && s.length > 0;
            if (d) {
              l.length > 0 &&
                r.push({
                  type: "unsupported-setting",
                  setting: "tools",
                  details:
                    "Mixed Anthropic provider-defined tools and standard function tools are not supported in a single call to Bedrock. Only Anthropic tools will be used.",
                });
              const {
                toolChoice: e,
                toolWarnings: n,
                betas: i,
              } = (function ({
                tools: e,
                toolChoice: t,
                disableParallelToolUse: n,
              }) {
                e = (null == e ? void 0 : e.length) ? e : void 0;
                const r = [],
                  o = new Set();
                if (null == e)
                  return {
                    tools: void 0,
                    toolChoice: void 0,
                    toolWarnings: r,
                    betas: o,
                  };
                const i = [];
                for (const t of e)
                  if (Sp(t)) i.push(t);
                  else
                    switch (t.type) {
                      case "function":
                        const e = kp(t.providerOptions);
                        i.push({
                          name: t.name,
                          description: t.description,
                          input_schema: t.inputSchema,
                          cache_control: e,
                        });
                        break;
                      case "provider-defined":
                        switch (t.id) {
                          case "anthropic.computer_20250124":
                            (o.add("computer-use-2025-01-24"),
                              i.push({
                                name: "computer",
                                type: "computer_20250124",
                                display_width_px: t.args.displayWidthPx,
                                display_height_px: t.args.displayHeightPx,
                                display_number: t.args.displayNumber,
                              }));
                            break;
                          case "anthropic.computer_20241022":
                            (o.add("computer-use-2024-10-22"),
                              i.push({
                                name: "computer",
                                type: "computer_20241022",
                                display_width_px: t.args.displayWidthPx,
                                display_height_px: t.args.displayHeightPx,
                                display_number: t.args.displayNumber,
                              }));
                            break;
                          case "anthropic.text_editor_20250124":
                            (o.add("computer-use-2025-01-24"),
                              i.push({
                                name: "str_replace_editor",
                                type: "text_editor_20250124",
                              }));
                            break;
                          case "anthropic.text_editor_20241022":
                            (o.add("computer-use-2024-10-22"),
                              i.push({
                                name: "str_replace_editor",
                                type: "text_editor_20241022",
                              }));
                            break;
                          case "anthropic.text_editor_20250429":
                            (o.add("computer-use-2025-01-24"),
                              i.push({
                                name: "str_replace_based_edit_tool",
                                type: "text_editor_20250429",
                              }));
                            break;
                          case "anthropic.bash_20250124":
                            (o.add("computer-use-2025-01-24"),
                              i.push({ name: "bash", type: "bash_20250124" }));
                            break;
                          case "anthropic.bash_20241022":
                            (o.add("computer-use-2024-10-22"),
                              i.push({ name: "bash", type: "bash_20241022" }));
                            break;
                          case "anthropic.web_search_20250305": {
                            const e = xp.parse(t.args);
                            i.push({
                              type: "web_search_20250305",
                              name: "web_search",
                              max_uses: e.maxUses,
                              allowed_domains: e.allowedDomains,
                              blocked_domains: e.blockedDomains,
                              user_location: e.userLocation,
                            });
                            break;
                          }
                          default:
                            r.push({ type: "unsupported-tool", tool: t });
                        }
                        break;
                      default:
                        r.push({ type: "unsupported-tool", tool: t });
                    }
                if (null == t)
                  return {
                    tools: i,
                    toolChoice: n
                      ? { type: "auto", disable_parallel_tool_use: n }
                      : void 0,
                    toolWarnings: r,
                    betas: o,
                  };
                const a = t.type;
                switch (a) {
                  case "auto":
                    return {
                      tools: i,
                      toolChoice: {
                        type: "auto",
                        disable_parallel_tool_use: n,
                      },
                      toolWarnings: r,
                      betas: o,
                    };
                  case "required":
                    return {
                      tools: i,
                      toolChoice: { type: "any", disable_parallel_tool_use: n },
                      toolWarnings: r,
                      betas: o,
                    };
                  case "none":
                    return {
                      tools: void 0,
                      toolChoice: void 0,
                      toolWarnings: r,
                      betas: o,
                    };
                  case "tool":
                    return {
                      tools: i,
                      toolChoice: {
                        type: "tool",
                        name: t.toolName,
                        disable_parallel_tool_use: n,
                      },
                      toolWarnings: r,
                      betas: o,
                    };
                  default:
                    throw new fe({ functionality: `tool choice type: ${a}` });
                }
              })({ tools: s, toolChoice: t });
              (r.push(...n),
                i.forEach((e) => o.add(e)),
                e && (u = { tool_choice: e }));
              for (const e of s) {
                const t = Object.values(Cp).find((t) => t({}).id === e.id);
                if (null != t) {
                  const n = t({});
                  c.push({
                    toolSpec: {
                      name: e.name,
                      inputSchema: { json: hc(n.inputSchema).jsonSchema },
                    },
                  });
                } else r.push({ type: "unsupported-tool", tool: e });
              }
            } else
              for (const e of s) r.push({ type: "unsupported-tool", tool: e });
            for (const e of l)
              c.push({
                toolSpec: {
                  name: e.name,
                  description: e.description,
                  inputSchema: { json: e.inputSchema },
                },
              });
            let p;
            if (!d && c.length > 0 && t) {
              const e = t.type;
              switch (e) {
                case "auto":
                  p = { auto: {} };
                  break;
                case "required":
                  p = { any: {} };
                  break;
                case "none":
                  ((c.length = 0), (p = void 0));
                  break;
                case "tool":
                  p = { tool: { name: t.toolName } };
                  break;
                default:
                  throw new fe({ functionality: `tool choice type: ${e}` });
              }
            }
            return {
              toolConfig: c.length > 0 ? { tools: c, toolChoice: p } : {},
              additionalTools: u,
              betas: o,
              toolWarnings: r,
            };
          })({
            tools: w ? [w, ...(null != c ? c : [])] : c,
            toolChoice: null != w ? { type: "tool", toolName: w.name } : d,
            modelId: this.modelId,
          });
        (_.push(...$),
          x &&
            (b.additionalModelRequestFields = {
              ...b.additionalModelRequestFields,
              ...x,
            }));
        const S =
            "enabled" === (null == (h = b.reasoningConfig) ? void 0 : h.type),
          T = null == (g = b.reasoningConfig) ? void 0 : g.budgetTokens,
          N = {
            ...(null != t && { maxOutputTokens: t }),
            ...(null != n && { temperature: n }),
            ...(null != r && { topP: r }),
            ...(null != o && { topK: o }),
            ...(null != s && { stopSequences: s }),
          };
        (S &&
          null != T &&
          (null != N.maxOutputTokens
            ? (N.maxOutputTokens += T)
            : (N.maxOutputTokens = T + 4096),
          (b.additionalModelRequestFields = {
            ...b.additionalModelRequestFields,
            thinking: {
              type: null == (f = b.reasoningConfig) ? void 0 : f.type,
              budget_tokens: T,
            },
          })),
          S &&
            null != N.temperature &&
            (delete N.temperature,
            _.push({
              type: "unsupported-setting",
              setting: "temperature",
              details: "temperature is not supported when thinking is enabled",
            })),
          S &&
            null != N.topP &&
            (delete N.topP,
            _.push({
              type: "unsupported-setting",
              setting: "topP",
              details: "topP is not supported when thinking is enabled",
            })),
          S &&
            null != N.topK &&
            (delete N.topK,
            _.push({
              type: "unsupported-setting",
              setting: "topK",
              details: "topK is not supported when thinking is enabled",
            })));
        let O = e;
        (null != (y = null == (v = k.tools) ? void 0 : v.length) ? y : 0) > 0 ||
          x ||
          (e.some(
            (e) =>
              "content" in e &&
              Array.isArray(e.content) &&
              e.content.some(
                (e) => "tool-call" === e.type || "tool-result" === e.type,
              ),
          ) &&
            ((O = e
              .map((e) =>
                "system" === e.role
                  ? e
                  : {
                      ...e,
                      content: e.content.filter(
                        (e) =>
                          "tool-call" !== e.type && "tool-result" !== e.type,
                      ),
                    },
              )
              .filter((e) => "system" === e.role || e.content.length > 0)),
            _.push({
              type: "unsupported-setting",
              setting: "toolContent",
              details:
                "Tool calls and results removed from conversation because Bedrock does not support tool content without active tools.",
            })));
        const { system: E, messages: A } = await (async function (e) {
            const t = (function (e) {
              const t = [];
              let n;
              for (const r of e) {
                const { role: e } = r;
                switch (e) {
                  case "system":
                    ("system" !== (null == n ? void 0 : n.type) &&
                      ((n = { type: "system", messages: [] }), t.push(n)),
                      n.messages.push(r));
                    break;
                  case "assistant":
                    ("assistant" !== (null == n ? void 0 : n.type) &&
                      ((n = { type: "assistant", messages: [] }), t.push(n)),
                      n.messages.push(r));
                    break;
                  case "user":
                  case "tool":
                    ("user" !== (null == n ? void 0 : n.type) &&
                      ((n = { type: "user", messages: [] }), t.push(n)),
                      n.messages.push(r));
                    break;
                  default:
                    throw new Error(`Unsupported role: ${e}`);
                }
              }
              return t;
            })(e);
            let n = [];
            const r = [];
            let o = 0;
            for (let e = 0; e < t.length; e++) {
              const i = t[e],
                a = e === t.length - 1,
                s = i.type;
              switch (s) {
                case "system":
                  if (r.length > 0)
                    throw new fe({
                      functionality:
                        "Multiple system messages that are separated by user/assistant messages",
                    });
                  for (const e of i.messages)
                    (n.push({ text: e.content }),
                      vm(e.providerOptions) && n.push(dm));
                  break;
                case "user": {
                  const e = [];
                  for (const t of i.messages) {
                    const { role: n, content: r, providerOptions: i } = t;
                    switch (n) {
                      case "user":
                        for (let t = 0; t < r.length; t++) {
                          const n = r[t];
                          switch (n.type) {
                            case "text":
                              e.push({ text: n.text });
                              break;
                            case "file":
                              if (n.data instanceof URL)
                                throw new fe({
                                  functionality: "File URL data",
                                });
                              if (n.mediaType.startsWith("image/"))
                                e.push({
                                  image: {
                                    format: ym(n.mediaType),
                                    source: { bytes: yc(n.data) },
                                  },
                                });
                              else {
                                if (!n.mediaType)
                                  throw new fe({
                                    functionality: "file without mime type",
                                    message:
                                      "File mime type is required in user message part content",
                                  });
                                e.push({
                                  document: {
                                    format: bm(n.mediaType),
                                    name: "document-" + ++o,
                                    source: { bytes: yc(n.data) },
                                  },
                                });
                              }
                          }
                        }
                        break;
                      case "tool":
                        for (const t of r) {
                          let n;
                          const r = t.output;
                          switch (r.type) {
                            case "content":
                              n = r.value.map((e) => {
                                switch (e.type) {
                                  case "text":
                                    return { text: e.text };
                                  case "media":
                                    if (!e.mediaType.startsWith("image/"))
                                      throw new fe({
                                        functionality: `media type: ${e.mediaType}`,
                                      });
                                    return {
                                      image: {
                                        format: ym(e.mediaType),
                                        source: { bytes: e.data },
                                      },
                                    };
                                }
                              });
                              break;
                            case "text":
                            case "error-text":
                              n = [{ text: r.value }];
                              break;
                            default:
                              n = [{ text: JSON.stringify(r.value) }];
                          }
                          e.push({
                            toolResult: { toolUseId: t.toolCallId, content: n },
                          });
                        }
                        break;
                      default:
                        throw new Error(`Unsupported role: ${n}`);
                    }
                    vm(i) && e.push(dm);
                  }
                  r.push({ role: "user", content: e });
                  break;
                }
                case "assistant": {
                  const e = [];
                  for (let t = 0; t < i.messages.length; t++) {
                    const n = i.messages[t],
                      r = t === i.messages.length - 1,
                      { content: o } = n;
                    for (let t = 0; t < o.length; t++) {
                      const n = o[t],
                        i = t === o.length - 1;
                      switch (n.type) {
                        case "text":
                          e.push({ text: _m(a, r, i, n.text) });
                          break;
                        case "reasoning": {
                          const t = await tc({
                            provider: "bedrock",
                            providerOptions: n.providerOptions,
                            schema: Om,
                          });
                          null != t &&
                            (null != t.signature
                              ? e.push({
                                  reasoningContent: {
                                    reasoningText: {
                                      text: _m(a, r, i, n.text),
                                      signature: t.signature,
                                    },
                                  },
                                })
                              : null != t.redactedData &&
                                e.push({
                                  reasoningContent: {
                                    redactedReasoning: { data: t.redactedData },
                                  },
                                }));
                          break;
                        }
                        case "tool-call":
                          e.push({
                            toolUse: {
                              toolUseId: n.toolCallId,
                              name: n.toolName,
                              input: n.input,
                            },
                          });
                      }
                    }
                    vm(n.providerOptions) && e.push(dm);
                  }
                  r.push({ role: "assistant", content: e });
                  break;
                }
                default:
                  throw new Error(`Unsupported type: ${s}`);
              }
            }
            return { system: n, messages: r };
          })(O),
          { reasoningConfig: U, ...C } = (null == p ? void 0 : p.bedrock) || {};
        return {
          command: {
            system: E,
            messages: A,
            additionalModelRequestFields: b.additionalModelRequestFields,
            ...(Object.keys(N).length > 0 && { inferenceConfig: N }),
            ...C,
            ...(void 0 !== k.tools && k.tools.length > 0
              ? { toolConfig: k }
              : {}),
          },
          warnings: _,
          usesJsonResponseTool: null != w,
          betas: I,
        };
      }
      async getHeaders({ betas: e, headers: t }) {
        return Ru(
          await sc(this.config.headers),
          e.size > 0 ? { "anthropic-beta": Array.from(e).join(",") } : {},
          t,
        );
      }
      async doGenerate(e) {
        var t, n, r, o, i, a, s, l, u, c, d, p, m, h;
        const {
            command: g,
            warnings: f,
            usesJsonResponseTool: v,
            betas: y,
          } = await this.getArgs(e),
          b = `${this.getUrl(this.modelId)}/converse`,
          { value: _, responseHeaders: w } = await rc({
            url: b,
            headers: await this.getHeaders({ betas: y, headers: e.headers }),
            body: g,
            failedResponseHandler: lc({
              errorSchema: gm,
              errorToMessage: (e) => {
                var t;
                return `${null != (t = e.message) ? t : "Unknown error"}`;
              },
            }),
            successfulResponseHandler: cc(Tm),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          }),
          k = [];
        for (const e of _.output.message.content) {
          if (
            (e.text && (v || k.push({ type: "text", text: e.text })),
            e.reasoningContent)
          )
            if ("reasoningText" in e.reasoningContent) {
              const t = {
                type: "reasoning",
                text: e.reasoningContent.reasoningText.text,
              };
              (e.reasoningContent.reasoningText.signature &&
                (t.providerMetadata = {
                  bedrock: {
                    signature: e.reasoningContent.reasoningText.signature,
                  },
                }),
                k.push(t));
            } else
              "redactedReasoning" in e.reasoningContent &&
                k.push({
                  type: "reasoning",
                  text: "",
                  providerMetadata: {
                    bedrock: {
                      redactedData:
                        null != (t = e.reasoningContent.redactedReasoning.data)
                          ? t
                          : "",
                    },
                  },
                });
          e.toolUse &&
            k.push(
              v
                ? { type: "text", text: JSON.stringify(e.toolUse.input) }
                : {
                    type: "tool-call",
                    toolCallId:
                      null !=
                      (r = null == (n = e.toolUse) ? void 0 : n.toolUseId)
                        ? r
                        : this.config.generateId(),
                    toolName:
                      null != (i = null == (o = e.toolUse) ? void 0 : o.name)
                        ? i
                        : `tool-${this.config.generateId()}`,
                    input: JSON.stringify(
                      null != (s = null == (a = e.toolUse) ? void 0 : a.input)
                        ? s
                        : "",
                    ),
                  },
            );
        }
        const x =
          _.trace || _.usage || v
            ? {
                bedrock: {
                  ...(_.trace && "object" == typeof _.trace
                    ? { trace: _.trace }
                    : {}),
                  ...(null !=
                    (null == (l = _.usage)
                      ? void 0
                      : l.cacheWriteInputTokens) && {
                    usage: {
                      cacheWriteInputTokens: _.usage.cacheWriteInputTokens,
                    },
                  }),
                  ...(v && { isJsonResponseFromTool: !0 }),
                },
              }
            : void 0;
        return {
          content: k,
          finishReason: wm(_.stopReason),
          usage: {
            inputTokens: null == (u = _.usage) ? void 0 : u.inputTokens,
            outputTokens: null == (c = _.usage) ? void 0 : c.outputTokens,
            totalTokens:
              (null == (d = _.usage) ? void 0 : d.inputTokens) +
              (null == (p = _.usage) ? void 0 : p.outputTokens),
            cachedInputTokens:
              null !=
              (h = null == (m = _.usage) ? void 0 : m.cacheReadInputTokens)
                ? h
                : void 0,
          },
          response: { headers: w },
          warnings: f,
          ...(x && { providerMetadata: x }),
        };
      }
      async doStream(e) {
        const {
            command: t,
            warnings: n,
            usesJsonResponseTool: r,
            betas: o,
          } = await this.getArgs(e),
          i = `${this.getUrl(this.modelId)}/converse-stream`,
          { value: a, responseHeaders: s } = await rc({
            url: i,
            headers: await this.getHeaders({ betas: o, headers: e.headers }),
            body: t,
            failedResponseHandler: lc({
              errorSchema: gm,
              errorToMessage: (e) => `${e.type}: ${e.message}`,
            }),
            successfulResponseHandler: fm(Nm),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          });
        let l = "unknown";
        const u = {
          inputTokens: void 0,
          outputTokens: void 0,
          totalTokens: void 0,
        };
        let c;
        const d = {};
        return {
          stream: a.pipeThrough(
            new TransformStream({
              start(e) {
                e.enqueue({ type: "stream-start", warnings: n });
              },
              transform(t, n) {
                var o, i, a, s, p, m, h, g, f, v, y, b, _, w, k, x, $;
                function I(e) {
                  ((l = "error"), n.enqueue({ type: "error", error: e }));
                }
                if (
                  (e.includeRawChunks &&
                    n.enqueue({ type: "raw", rawValue: t.rawValue }),
                  !t.success)
                )
                  return void I(t.error);
                const S = t.value;
                if (S.internalServerException)
                  return void I(S.internalServerException);
                if (S.modelStreamErrorException)
                  return void I(S.modelStreamErrorException);
                if (S.throttlingException) return void I(S.throttlingException);
                if (S.validationException) return void I(S.validationException);
                if (
                  (S.messageStop && (l = wm(S.messageStop.stopReason)),
                  S.metadata)
                ) {
                  ((u.inputTokens =
                    null !=
                    (i =
                      null == (o = S.metadata.usage) ? void 0 : o.inputTokens)
                      ? i
                      : u.inputTokens),
                    (u.outputTokens =
                      null !=
                      (s =
                        null == (a = S.metadata.usage)
                          ? void 0
                          : a.outputTokens)
                        ? s
                        : u.outputTokens),
                    (u.totalTokens =
                      (null != (p = u.inputTokens) ? p : 0) +
                      (null != (m = u.outputTokens) ? m : 0)),
                    (u.cachedInputTokens =
                      null !=
                      (g =
                        null == (h = S.metadata.usage)
                          ? void 0
                          : h.cacheReadInputTokens)
                        ? g
                        : u.cachedInputTokens));
                  const e =
                      null !=
                      (null == (f = S.metadata.usage)
                        ? void 0
                        : f.cacheWriteInputTokens)
                        ? {
                            usage: {
                              cacheWriteInputTokens:
                                S.metadata.usage.cacheWriteInputTokens,
                            },
                          }
                        : void 0,
                    t = S.metadata.trace ? { trace: S.metadata.trace } : void 0;
                  (e || t || r) &&
                    (c = {
                      bedrock: {
                        ...e,
                        ...t,
                        ...(r && { isJsonResponseFromTool: !0 }),
                      },
                    });
                }
                if (
                  null !=
                    (null == (v = S.contentBlockStart)
                      ? void 0
                      : v.contentBlockIndex) &&
                  !(null ==
                  (b = null == (y = S.contentBlockStart) ? void 0 : y.start)
                    ? void 0
                    : b.toolUse)
                ) {
                  const e = S.contentBlockStart.contentBlockIndex;
                  ((d[e] = { type: "text" }),
                    n.enqueue({ type: "text-start", id: String(e) }));
                }
                if (
                  (null == (_ = S.contentBlockDelta) ? void 0 : _.delta) &&
                  "text" in S.contentBlockDelta.delta &&
                  S.contentBlockDelta.delta.text
                ) {
                  const e = S.contentBlockDelta.contentBlockIndex || 0;
                  (null == d[e] &&
                    ((d[e] = { type: "text" }),
                    r || n.enqueue({ type: "text-start", id: String(e) })),
                    r ||
                      n.enqueue({
                        type: "text-delta",
                        id: String(e),
                        delta: S.contentBlockDelta.delta.text,
                      }));
                }
                if (
                  null !=
                  (null == (w = S.contentBlockStop)
                    ? void 0
                    : w.contentBlockIndex)
                ) {
                  const e = S.contentBlockStop.contentBlockIndex,
                    t = d[e];
                  null != t &&
                    ("reasoning" === t.type
                      ? n.enqueue({ type: "reasoning-end", id: String(e) })
                      : "text" === t.type
                        ? r || n.enqueue({ type: "text-end", id: String(e) })
                        : "tool-call" === t.type &&
                          (r
                            ? (n.enqueue({ type: "text-start", id: String(e) }),
                              n.enqueue({
                                type: "text-delta",
                                id: String(e),
                                delta: t.jsonText,
                              }),
                              n.enqueue({ type: "text-end", id: String(e) }))
                            : (n.enqueue({
                                type: "tool-input-end",
                                id: t.toolCallId,
                              }),
                              n.enqueue({
                                type: "tool-call",
                                toolCallId: t.toolCallId,
                                toolName: t.toolName,
                                input: t.jsonText,
                              }))),
                    delete d[e]);
                }
                if (
                  (null == (k = S.contentBlockDelta) ? void 0 : k.delta) &&
                  "reasoningContent" in S.contentBlockDelta.delta &&
                  S.contentBlockDelta.delta.reasoningContent
                ) {
                  const e = S.contentBlockDelta.contentBlockIndex || 0,
                    t = S.contentBlockDelta.delta.reasoningContent;
                  "text" in t && t.text
                    ? (null == d[e] &&
                        ((d[e] = { type: "reasoning" }),
                        n.enqueue({ type: "reasoning-start", id: String(e) })),
                      n.enqueue({
                        type: "reasoning-delta",
                        id: String(e),
                        delta: t.text,
                      }))
                    : "signature" in t && t.signature
                      ? n.enqueue({
                          type: "reasoning-delta",
                          id: String(e),
                          delta: "",
                          providerMetadata: {
                            bedrock: { signature: t.signature },
                          },
                        })
                      : "data" in t &&
                        t.data &&
                        n.enqueue({
                          type: "reasoning-delta",
                          id: String(e),
                          delta: "",
                          providerMetadata: {
                            bedrock: { redactedData: t.data },
                          },
                        });
                }
                const T = S.contentBlockStart;
                if (
                  null !=
                  (null == (x = null == T ? void 0 : T.start)
                    ? void 0
                    : x.toolUse)
                ) {
                  const e = T.start.toolUse,
                    t = T.contentBlockIndex;
                  ((d[t] = {
                    type: "tool-call",
                    toolCallId: e.toolUseId,
                    toolName: e.name,
                    jsonText: "",
                  }),
                    r ||
                      n.enqueue({
                        type: "tool-input-start",
                        id: e.toolUseId,
                        toolName: e.name,
                      }));
                }
                const N = S.contentBlockDelta;
                if (
                  (null == N ? void 0 : N.delta) &&
                  "toolUse" in N.delta &&
                  N.delta.toolUse
                ) {
                  const e = N.contentBlockIndex,
                    t = d[e];
                  if ("tool-call" === (null == t ? void 0 : t.type)) {
                    const e = null != ($ = N.delta.toolUse.input) ? $ : "";
                    (r ||
                      n.enqueue({
                        type: "tool-input-delta",
                        id: t.toolCallId,
                        delta: e,
                      }),
                      (t.jsonText += e));
                  }
                }
              },
              flush(e) {
                e.enqueue({
                  type: "finish",
                  finishReason: l,
                  usage: u,
                  ...(c && { providerMetadata: c }),
                });
              },
            }),
          ),
          response: { headers: s },
        };
      }
      getUrl(e) {
        const t = encodeURIComponent(e);
        return `${this.config.baseUrl()}/model/${t}`;
      }
    },
    xm = pl([
      $l([
        "stop",
        "stop_sequence",
        "end_turn",
        "length",
        "max_tokens",
        "content-filter",
        "content_filtered",
        "guardrail_intervened",
        "tool-calls",
        "tool_use",
      ]),
      ys(),
    ]),
    $m = ul({ toolUseId: ys(), name: ys(), input: tl() }),
    Im = ul({ signature: ys().nullish(), text: ys() }),
    Sm = ul({ data: ys() }),
    Tm = ul({
      metrics: ul({ latencyMs: Zs() }).nullish(),
      output: ul({
        message: ul({
          content: sl(
            ul({
              text: ys().nullish(),
              toolUse: $m.nullish(),
              reasoningContent: pl([
                ul({ reasoningText: Im }),
                ul({ redactedReasoning: Sm }),
              ]).nullish(),
            }),
          ),
          role: ys(),
        }),
      }),
      stopReason: xm,
      trace: tl().nullish(),
      usage: ul({
        inputTokens: Zs(),
        outputTokens: Zs(),
        totalTokens: Zs(),
        cacheReadInputTokens: Zs().nullish(),
        cacheWriteInputTokens: Zs().nullish(),
      }),
    }),
    Nm = ul({
      contentBlockDelta: ul({
        contentBlockIndex: Zs(),
        delta: pl([
          ul({ text: ys() }),
          ul({ toolUse: ul({ input: ys() }) }),
          ul({ reasoningContent: ul({ text: ys() }) }),
          ul({ reasoningContent: ul({ signature: ys() }) }),
          ul({ reasoningContent: ul({ data: ys() }) }),
        ]).nullish(),
      }).nullish(),
      contentBlockStart: ul({
        contentBlockIndex: Zs(),
        start: ul({ toolUse: $m.nullish() }).nullish(),
      }).nullish(),
      contentBlockStop: ul({ contentBlockIndex: Zs() }).nullish(),
      internalServerException: _l(ys(), tl()).nullish(),
      messageStop: ul({
        additionalModelResponseFields: _l(ys(), tl()).nullish(),
        stopReason: xm,
      }).nullish(),
      metadata: ul({
        trace: tl().nullish(),
        usage: ul({
          cacheReadInputTokens: Zs().nullish(),
          cacheWriteInputTokens: Zs().nullish(),
          inputTokens: Zs(),
          outputTokens: Zs(),
        }).nullish(),
      }).nullish(),
      modelStreamErrorException: _l(ys(), tl()).nullish(),
      throttlingException: _l(ys(), tl()).nullish(),
      validationException: _l(ys(), tl()).nullish(),
    }),
    Om = ul({ signature: ys().optional(), redactedData: ys().optional() }),
    Em = ul({
      dimensions: pl([Sl(1024), Sl(512), Sl(256)]).optional(),
      normalize: Ws().optional(),
    }),
    Am = class {
      constructor(e, t) {
        ((this.modelId = e),
          (this.config = t),
          (this.specificationVersion = "v2"),
          (this.provider = "amazon-bedrock"),
          (this.maxEmbeddingsPerCall = 1),
          (this.supportsParallelCalls = !0));
      }
      getUrl(e) {
        const t = encodeURIComponent(e);
        return `${this.config.baseUrl()}/model/${t}/invoke`;
      }
      async doEmbed({
        values: e,
        headers: t,
        abortSignal: n,
        providerOptions: r,
      }) {
        var o;
        if (e.length > this.maxEmbeddingsPerCall)
          throw new ae({
            provider: this.provider,
            modelId: this.modelId,
            maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
            values: e,
          });
        const i =
            null !=
            (o = await tc({
              provider: "bedrock",
              providerOptions: r,
              schema: Em,
            }))
              ? o
              : {},
          a = {
            inputText: e[0],
            dimensions: i.dimensions,
            normalize: i.normalize,
          },
          s = this.getUrl(this.modelId),
          { value: l } = await rc({
            url: s,
            headers: await sc(Ru(await sc(this.config.headers), t)),
            body: a,
            failedResponseHandler: lc({
              errorSchema: gm,
              errorToMessage: (e) => `${e.type}: ${e.message}`,
            }),
            successfulResponseHandler: cc(Um),
            fetch: this.config.fetch,
            abortSignal: n,
          });
        return {
          embeddings: [l.embedding],
          usage: { tokens: l.inputTextTokenCount },
        };
      }
    },
    Um = ul({ embedding: sl(Zs()), inputTextTokenCount: Zs() }),
    Cm = { "amazon.nova-canvas-v1:0": 5 },
    Pm = class {
      constructor(e, t) {
        ((this.modelId = e),
          (this.config = t),
          (this.specificationVersion = "v2"),
          (this.provider = "amazon-bedrock"));
      }
      get maxImagesPerCall() {
        var e;
        return null != (e = Cm[this.modelId]) ? e : 1;
      }
      getUrl(e) {
        const t = encodeURIComponent(e);
        return `${this.config.baseUrl()}/model/${t}/invoke`;
      }
      async doGenerate({
        prompt: e,
        n: t,
        size: n,
        aspectRatio: r,
        seed: o,
        providerOptions: i,
        headers: a,
        abortSignal: s,
      }) {
        var l, u, c, d, p, m, h;
        const g = [],
          [f, v] = n ? n.split("x").map(Number) : [],
          y = {
            taskType: "TEXT_IMAGE",
            textToImageParams: {
              text: e,
              ...((
                null == (l = null == i ? void 0 : i.bedrock)
                  ? void 0
                  : l.negativeText
              )
                ? { negativeText: i.bedrock.negativeText }
                : {}),
              ...((
                null == (u = null == i ? void 0 : i.bedrock) ? void 0 : u.style
              )
                ? { style: i.bedrock.style }
                : {}),
            },
            imageGenerationConfig: {
              ...(f ? { width: f } : {}),
              ...(v ? { height: v } : {}),
              ...(o ? { seed: o } : {}),
              ...(t ? { numberOfImages: t } : {}),
              ...((
                null == (c = null == i ? void 0 : i.bedrock)
                  ? void 0
                  : c.quality
              )
                ? { quality: i.bedrock.quality }
                : {}),
              ...((
                null == (d = null == i ? void 0 : i.bedrock)
                  ? void 0
                  : d.cfgScale
              )
                ? { cfgScale: i.bedrock.cfgScale }
                : {}),
            },
          };
        null != r &&
          g.push({
            type: "unsupported-setting",
            setting: "aspectRatio",
            details:
              "This model does not support aspect ratio. Use `size` instead.",
          });
        const b =
            null !=
            (h =
              null ==
              (m = null == (p = this.config._internal) ? void 0 : p.currentDate)
                ? void 0
                : m.call(p))
              ? h
              : new Date(),
          { value: _, responseHeaders: w } = await rc({
            url: this.getUrl(this.modelId),
            headers: await sc(Ru(await sc(this.config.headers), a)),
            body: y,
            failedResponseHandler: lc({
              errorSchema: gm,
              errorToMessage: (e) => `${e.type}: ${e.message}`,
            }),
            successfulResponseHandler: cc(Dm),
            abortSignal: s,
            fetch: this.config.fetch,
          });
        return {
          images: _.images,
          warnings: g,
          response: { timestamp: b, modelId: this.modelId, headers: w },
        };
      }
    },
    Dm = ul({ images: sl(ys()) });
  function jm(e) {
    let t = {};
    if (e)
      if (e instanceof Headers) t = zm(e);
      else if (Array.isArray(e)) for (const [n, r] of e) t[n.toLowerCase()] = r;
      else
        t = Object.fromEntries(
          Object.entries(e).map(([e, t]) => [e.toLowerCase(), t]),
        );
    return t;
  }
  function zm(e) {
    return Object.fromEntries([...e]);
  }
  function Rm(e = {}) {
    const t = Wu({
        settingValue: e.apiKey,
        environmentVariableName: "AWS_BEARER_TOKEN_BEDROCK",
      }),
      n = t && t.trim().length > 0 ? t.trim() : void 0,
      r = n
        ? (function (e, t = globalThis.fetch) {
            return async (n, r) => {
              const o = jm(null == r ? void 0 : r.headers);
              return t(n, {
                ...r,
                headers: Fu(Ru(o, { Authorization: `Bearer ${e}` })),
              });
            };
          })(n, e.fetch)
        : (function (e, t = globalThis.fetch) {
            return async (n, r) => {
              var o;
              if (
                "POST" !==
                  (null == (o = null == r ? void 0 : r.method)
                    ? void 0
                    : o.toUpperCase()) ||
                !(null == r ? void 0 : r.body)
              )
                return t(n, r);
              const i =
                  "string" == typeof n ? n : n instanceof URL ? n.href : n.url,
                a = jm(r.headers),
                s = (function (e) {
                  return "string" == typeof e
                    ? e
                    : e instanceof Uint8Array
                      ? new TextDecoder().decode(e)
                      : e instanceof ArrayBuffer
                        ? new TextDecoder().decode(new Uint8Array(e))
                        : JSON.stringify(e);
                })(r.body),
                l = await e(),
                u = new im({
                  url: i,
                  method: "POST",
                  headers: Object.entries(Fu(a)),
                  body: s,
                  region: l.region,
                  accessKeyId: l.accessKeyId,
                  secretAccessKey: l.secretAccessKey,
                  sessionToken: l.sessionToken,
                  service: "bedrock",
                }),
                c = zm((await u.sign()).headers);
              return t(n, { ...r, body: s, headers: Fu(Ru(a, c)) });
            };
          })(async () => {
            const t = Hu({
              settingValue: e.region,
              settingName: "region",
              environmentVariableName: "AWS_REGION",
              description: "AWS region",
            });
            if (e.credentialProvider)
              try {
                return { ...(await e.credentialProvider()), region: t };
              } catch (e) {
                const t = e instanceof Error ? e.message : String(e);
                throw new Error(
                  `AWS credential provider failed: ${t}. Please ensure your credential provider returns valid AWS credentials with accessKeyId and secretAccessKey properties.`,
                );
              }
            try {
              return {
                region: t,
                accessKeyId: Hu({
                  settingValue: e.accessKeyId,
                  settingName: "accessKeyId",
                  environmentVariableName: "AWS_ACCESS_KEY_ID",
                  description: "AWS access key ID",
                }),
                secretAccessKey: Hu({
                  settingValue: e.secretAccessKey,
                  settingName: "secretAccessKey",
                  environmentVariableName: "AWS_SECRET_ACCESS_KEY",
                  description: "AWS secret access key",
                }),
                sessionToken: Wu({
                  settingValue: e.sessionToken,
                  environmentVariableName: "AWS_SESSION_TOKEN",
                }),
              };
            } catch (e) {
              const t = e instanceof Error ? e.message : String(e);
              if (t.includes("AWS_ACCESS_KEY_ID") || t.includes("accessKeyId"))
                throw new Error(
                  `AWS SigV4 authentication requires AWS credentials. Please provide either:\n1. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables\n2. Provide accessKeyId and secretAccessKey in options\n3. Use a credentialProvider function\n4. Use API key authentication with AWS_BEARER_TOKEN_BEDROCK or apiKey option\nOriginal error: ${t}`,
                );
              if (
                t.includes("AWS_SECRET_ACCESS_KEY") ||
                t.includes("secretAccessKey")
              )
                throw new Error(
                  `AWS SigV4 authentication requires both AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY. Please ensure both credentials are provided.\nOriginal error: ${t}`,
                );
              throw e;
            }
          }, e.fetch),
      o = () => {
        var t, n;
        return null !=
          (n = bc(
            null != (t = e.baseURL)
              ? t
              : `https://bedrock-runtime.${Hu({ settingValue: e.region, settingName: "region", environmentVariableName: "AWS_REGION", description: "AWS region" })}.amazonaws.com`,
          ))
          ? n
          : "https://bedrock-runtime.us-east-1.amazonaws.com";
      },
      i = (t) => {
        var n;
        return new km(t, {
          baseUrl: o,
          headers: null != (n = e.headers) ? n : {},
          fetch: r,
          generateId: qu,
        });
      },
      a = function (e) {
        if (new.target)
          throw new Error(
            "The Amazon Bedrock model function cannot be called with the new keyword.",
          );
        return i(e);
      },
      s = (t) => {
        var n;
        return new Am(t, {
          baseUrl: o,
          headers: null != (n = e.headers) ? n : {},
          fetch: r,
        });
      },
      l = (t) => {
        var n;
        return new Pm(t, {
          baseUrl: o,
          headers: null != (n = e.headers) ? n : {},
          fetch: r,
        });
      };
    return (
      (a.languageModel = i),
      (a.embedding = s),
      (a.textEmbedding = s),
      (a.textEmbeddingModel = s),
      (a.image = l),
      (a.imageModel = l),
      (a.tools = Cp),
      a
    );
  }
  Rm();
  var Mm,
    qm = Object.defineProperty,
    Zm = Object.defineProperties,
    Lm = Object.getOwnPropertyDescriptors,
    Fm = Object.getOwnPropertySymbols,
    Bm = Object.prototype.hasOwnProperty,
    Wm = Object.prototype.propertyIsEnumerable,
    Hm = (e, t, n) =>
      t in e
        ? qm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (e[t] = n),
    Vm = (e, t) => {
      for (var n in t || (t = {})) Bm.call(t, n) && Hm(e, n, t[n]);
      if (Fm) for (var n of Fm(t)) Wm.call(t, n) && Hm(e, n, t[n]);
      return e;
    },
    Jm = (e, t) => Zm(e, Lm(t)),
    Km = "vercel.ai.error",
    Gm = Symbol.for(Km),
    Xm = class e extends Error {
      constructor({ name: e, message: t, cause: n }) {
        (super(t), (this[Mm] = !0), (this.name = e), (this.cause = n));
      }
      static isInstance(t) {
        return e.hasMarker(t, Km);
      }
      static hasMarker(e, t) {
        const n = Symbol.for(t);
        return (
          null != e &&
          "object" == typeof e &&
          n in e &&
          "boolean" == typeof e[n] &&
          !0 === e[n]
        );
      }
    };
  Mm = Gm;
  var Ym,
    Qm = Xm,
    eh = "AI_APICallError",
    th = `vercel.ai.error.${eh}`,
    nh = Symbol.for(th),
    rh = class extends Qm {
      constructor({
        message: e,
        url: t,
        requestBodyValues: n,
        statusCode: r,
        responseHeaders: o,
        responseBody: i,
        cause: a,
        isRetryable: s = null != r &&
          (408 === r || 409 === r || 429 === r || r >= 500),
        data: l,
      }) {
        (super({ name: eh, message: e, cause: a }),
          (this[Ym] = !0),
          (this.url = t),
          (this.requestBodyValues = n),
          (this.statusCode = r),
          (this.responseHeaders = o),
          (this.responseBody = i),
          (this.isRetryable = s),
          (this.data = l));
      }
      static isInstance(e) {
        return Qm.hasMarker(e, th);
      }
    };
  Ym = nh;
  var oh,
    ih = "AI_EmptyResponseBodyError",
    ah = `vercel.ai.error.${ih}`,
    sh = Symbol.for(ah),
    lh = class extends Qm {
      constructor({ message: e = "Empty response body" } = {}) {
        (super({ name: ih, message: e }), (this[oh] = !0));
      }
      static isInstance(e) {
        return Qm.hasMarker(e, ah);
      }
    };
  function uh(e) {
    return null == e
      ? "unknown error"
      : "string" == typeof e
        ? e
        : e instanceof Error
          ? e.message
          : JSON.stringify(e);
  }
  oh = sh;
  var ch,
    dh = "AI_InvalidArgumentError",
    ph = `vercel.ai.error.${dh}`,
    mh = Symbol.for(ph),
    hh = class extends Qm {
      constructor({ message: e, cause: t, argument: n }) {
        (super({ name: dh, message: e, cause: t }),
          (this[ch] = !0),
          (this.argument = n));
      }
      static isInstance(e) {
        return Qm.hasMarker(e, ph);
      }
    };
  ch = mh;
  var gh,
    fh = "AI_InvalidPromptError",
    vh = `vercel.ai.error.${fh}`,
    yh = Symbol.for(vh),
    bh = class extends Qm {
      constructor({ prompt: e, message: t, cause: n }) {
        (super({ name: fh, message: `Invalid prompt: ${t}`, cause: n }),
          (this[gh] = !0),
          (this.prompt = e));
      }
      static isInstance(e) {
        return Qm.hasMarker(e, vh);
      }
    };
  gh = yh;
  var _h,
    wh = "AI_InvalidResponseDataError",
    kh = `vercel.ai.error.${wh}`,
    xh = Symbol.for(kh),
    $h = class extends Qm {
      constructor({
        data: e,
        message: t = `Invalid response data: ${JSON.stringify(e)}.`,
      }) {
        (super({ name: wh, message: t }), (this[_h] = !0), (this.data = e));
      }
      static isInstance(e) {
        return Qm.hasMarker(e, kh);
      }
    };
  _h = xh;
  var Ih,
    Sh = "AI_JSONParseError",
    Th = `vercel.ai.error.${Sh}`,
    Nh = Symbol.for(Th),
    Oh = class extends Qm {
      constructor({ text: e, cause: t }) {
        (super({
          name: Sh,
          message: `JSON parsing failed: Text: ${e}.\nError message: ${uh(t)}`,
          cause: t,
        }),
          (this[Ih] = !0),
          (this.text = e));
      }
      static isInstance(e) {
        return Qm.hasMarker(e, Th);
      }
    };
  Ih = Nh;
  var Eh,
    Ah = "AI_LoadAPIKeyError",
    Uh = `vercel.ai.error.${Ah}`,
    Ch = Symbol.for(Uh),
    Ph = class extends Qm {
      constructor({ message: e }) {
        (super({ name: Ah, message: e }), (this[Eh] = !0));
      }
      static isInstance(e) {
        return Qm.hasMarker(e, Uh);
      }
    };
  Eh = Ch;
  var Dh,
    jh = "AI_TypeValidationError",
    zh = `vercel.ai.error.${jh}`,
    Rh = Symbol.for(zh);
  Dh = Rh;
  var Mh,
    qh = class e extends Qm {
      constructor({ value: e, cause: t }) {
        (super({
          name: jh,
          message: `Type validation failed: Value: ${JSON.stringify(e)}.\nError message: ${uh(t)}`,
          cause: t,
        }),
          (this[Dh] = !0),
          (this.value = e));
      }
      static isInstance(e) {
        return Qm.hasMarker(e, zh);
      }
      static wrap({ value: t, cause: n }) {
        return e.isInstance(n) && n.value === t
          ? n
          : new e({ value: t, cause: n });
      }
    },
    Zh = "AI_UnsupportedFunctionalityError",
    Lh = `vercel.ai.error.${Zh}`,
    Fh = Symbol.for(Lh),
    Bh = class extends Qm {
      constructor({
        functionality: e,
        message: t = `'${e}' functionality not supported.`,
      }) {
        (super({ name: Zh, message: t }),
          (this[Mh] = !0),
          (this.functionality = e));
      }
      static isInstance(e) {
        return Qm.hasMarker(e, Lh);
      }
    };
  Mh = Fh;
  var Wh = class extends Error {
    constructor(e, t) {
      (super(e),
        (this.name = "ParseError"),
        (this.type = t.type),
        (this.field = t.field),
        (this.value = t.value),
        (this.line = t.line));
    }
  };
  function Hh(e) {}
  var Vh = class extends TransformStream {
    constructor({ onError: e, onRetry: t, onComment: n } = {}) {
      let r;
      super({
        start(o) {
          r = (function (e) {
            if ("function" == typeof e)
              throw new TypeError(
                "`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?",
              );
            const {
              onEvent: t = Hh,
              onError: n = Hh,
              onRetry: r = Hh,
              onComment: o,
            } = e;
            let i,
              a = "",
              s = !0,
              l = "",
              u = "";
            function c(e) {
              if ("" === e)
                return (
                  l.length > 0 &&
                    t({
                      id: i,
                      event: u || void 0,
                      data: l.endsWith("\n") ? l.slice(0, -1) : l,
                    }),
                  (i = void 0),
                  (l = ""),
                  void (u = "")
                );
              if (e.startsWith(":"))
                return void (o && o(e.slice(e.startsWith(": ") ? 2 : 1)));
              const n = e.indexOf(":");
              if (-1 === n) d(e, "", e);
              else {
                const t = e.slice(0, n),
                  r = " " === e[n + 1] ? 2 : 1;
                d(t, e.slice(n + r), e);
              }
            }
            function d(e, t, o) {
              switch (e) {
                case "event":
                  u = t;
                  break;
                case "data":
                  l = `${l}${t}\n`;
                  break;
                case "id":
                  i = t.includes("\0") ? void 0 : t;
                  break;
                case "retry":
                  /^\d+$/.test(t)
                    ? r(parseInt(t, 10))
                    : n(
                        new Wh(`Invalid \`retry\` value: "${t}"`, {
                          type: "invalid-retry",
                          value: t,
                          line: o,
                        }),
                      );
                  break;
                default:
                  n(
                    new Wh(
                      `Unknown field "${e.length > 20 ? `${e.slice(0, 20)}…` : e}"`,
                      { type: "unknown-field", field: e, value: t, line: o },
                    ),
                  );
              }
            }
            return {
              feed: function (e) {
                const t = s ? e.replace(/^\xEF\xBB\xBF/, "") : e,
                  [n, r] = (function (e) {
                    const t = [];
                    let n = "",
                      r = 0;
                    for (; r < e.length; ) {
                      const o = e.indexOf("\r", r),
                        i = e.indexOf("\n", r);
                      let a = -1;
                      if (
                        (-1 !== o && -1 !== i
                          ? (a = Math.min(o, i))
                          : -1 !== o
                            ? (a = o)
                            : -1 !== i && (a = i),
                        -1 === a)
                      ) {
                        n = e.slice(r);
                        break;
                      }
                      {
                        const n = e.slice(r, a);
                        (t.push(n),
                          (r = a + 1),
                          "\r" === e[r - 1] && "\n" === e[r] && r++);
                      }
                    }
                    return [t, n];
                  })(`${a}${t}`);
                for (const e of n) c(e);
                ((a = r), (s = !1));
              },
              reset: function (e = {}) {
                (a && e.consume && c(a),
                  (s = !0),
                  (i = void 0),
                  (l = ""),
                  (u = ""),
                  (a = ""));
              },
            };
          })({
            onEvent: (e) => {
              o.enqueue(e);
            },
            onError(t) {
              "terminate" === e ? o.error(t) : "function" == typeof e && e(t);
            },
            onRetry: t,
            onComment: n,
          });
        },
        transform(e) {
          r.feed(e);
        },
      });
    }
  };
  function Jh(...e) {
    return e.reduce((e, t) => Vm(Vm({}, e), null != t ? t : {}), {});
  }
  function Kh(e) {
    return Object.fromEntries([...e.headers]);
  }
  new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
  var Gh = (({
    prefix: e,
    size: t = 16,
    alphabet:
      n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    separator: r = "-",
  } = {}) => {
    const o = () => {
      const e = n.length,
        r = new Array(t);
      for (let o = 0; o < t; o++) r[o] = n[(Math.random() * e) | 0];
      return r.join("");
    };
    if (null == e) return o;
    if (n.includes(r))
      throw new hh({
        argument: "separator",
        message: `The separator "${r}" must not be part of the alphabet "${n}".`,
      });
    return () => `${e}${r}${o()}`;
  })();
  function Xh(e) {
    return (
      (e instanceof Error || e instanceof DOMException) &&
      ("AbortError" === e.name ||
        "ResponseAborted" === e.name ||
        "TimeoutError" === e.name)
    );
  }
  var Yh = ["fetch failed", "failed to fetch"];
  function Qh(e) {
    return Object.fromEntries(Object.entries(e).filter(([e, t]) => null != t));
  }
  function eg({
    apiKey: e,
    environmentVariableName: t,
    apiKeyParameterName: n = "apiKey",
    description: r,
  }) {
    if ("string" == typeof e) return e;
    if (null != e) throw new Ph({ message: `${r} API key must be a string.` });
    if ("undefined" == typeof process)
      throw new Ph({
        message: `${r} API key is missing. Pass it using the '${n}' parameter. Environment variables is not supported in this environment.`,
      });
    if (null == (e = process.env[t]))
      throw new Ph({
        message: `${r} API key is missing. Pass it using the '${n}' parameter or the ${t} environment variable.`,
      });
    if ("string" != typeof e)
      throw new Ph({
        message: `${r} API key must be a string. The value of the ${t} environment variable is not a string.`,
      });
    return e;
  }
  var tg = /"__proto__"\s*:/,
    ng = /"constructor"\s*:/;
  function rg(e) {
    const { stackTraceLimit: t } = Error;
    Error.stackTraceLimit = 0;
    try {
      return (function (e) {
        const t = JSON.parse(e);
        return null === t ||
          "object" != typeof t ||
          (!1 === tg.test(e) && !1 === ng.test(e))
          ? t
          : (function (e) {
              let t = [e];
              for (; t.length; ) {
                const e = t;
                t = [];
                for (const n of e) {
                  if (Object.prototype.hasOwnProperty.call(n, "__proto__"))
                    throw new SyntaxError(
                      "Object contains forbidden prototype property",
                    );
                  if (
                    Object.prototype.hasOwnProperty.call(n, "constructor") &&
                    Object.prototype.hasOwnProperty.call(
                      n.constructor,
                      "prototype",
                    )
                  )
                    throw new SyntaxError(
                      "Object contains forbidden prototype property",
                    );
                  for (const e in n) {
                    const r = n[e];
                    r && "object" == typeof r && t.push(r);
                  }
                }
              }
              return e;
            })(t);
      })(e);
    } finally {
      Error.stackTraceLimit = t;
    }
  }
  var og = Symbol.for("vercel.ai.validator");
  async function ig({ value: e, schema: t }) {
    const n = (function (e) {
      return (function (e) {
        return (
          "object" == typeof e &&
          null !== e &&
          og in e &&
          !0 === e[og] &&
          "validate" in e
        );
      })(e)
        ? e
        : ((t = e),
          (n = async (e) => {
            const n = await t["~standard"].validate(e);
            return null == n.issues
              ? { success: !0, value: n.value }
              : { success: !1, error: new qh({ value: e, cause: n.issues }) };
          }),
          { [og]: !0, validate: n });
      var t, n;
    })(t);
    try {
      if (null == n.validate) return { success: !0, value: e, rawValue: e };
      const t = await n.validate(e);
      return t.success
        ? { success: !0, value: t.value, rawValue: e }
        : {
            success: !1,
            error: qh.wrap({ value: e, cause: t.error }),
            rawValue: e,
          };
    } catch (t) {
      return {
        success: !1,
        error: qh.wrap({ value: e, cause: t }),
        rawValue: e,
      };
    }
  }
  async function ag({ text: e, schema: t }) {
    try {
      const n = rg(e);
      return null == t
        ? { success: !0, value: n, rawValue: n }
        : await ig({ value: n, schema: t });
    } catch (t) {
      return {
        success: !1,
        error: Oh.isInstance(t) ? t : new Oh({ text: e, cause: t }),
        rawValue: void 0,
      };
    }
  }
  function sg(e) {
    try {
      return (rg(e), !0);
    } catch (e) {
      return !1;
    }
  }
  function lg({ stream: e, schema: t }) {
    return e
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new Vh())
      .pipeThrough(
        new TransformStream({
          async transform({ data: e }, n) {
            "[DONE]" !== e && n.enqueue(await ag({ text: e, schema: t }));
          },
        }),
      );
  }
  var ug = () => globalThis.fetch,
    cg = async ({
      url: e,
      headers: t,
      body: n,
      failedResponseHandler: r,
      successfulResponseHandler: o,
      abortSignal: i,
      fetch: a,
    }) =>
      dg({
        url: e,
        headers: Vm({ "Content-Type": "application/json" }, t),
        body: { content: JSON.stringify(n), values: n },
        failedResponseHandler: r,
        successfulResponseHandler: o,
        abortSignal: i,
        fetch: a,
      }),
    dg = async ({
      url: e,
      headers: t = {},
      body: n,
      successfulResponseHandler: r,
      failedResponseHandler: o,
      abortSignal: i,
      fetch: a = ug(),
    }) => {
      try {
        const s = await a(e, {
            method: "POST",
            headers: Qh(t),
            body: n.content,
            signal: i,
          }),
          l = Kh(s);
        if (!s.ok) {
          let t;
          try {
            t = await o({ response: s, url: e, requestBodyValues: n.values });
          } catch (t) {
            if (Xh(t) || rh.isInstance(t)) throw t;
            throw new rh({
              message: "Failed to process error response",
              cause: t,
              statusCode: s.status,
              url: e,
              responseHeaders: l,
              requestBodyValues: n.values,
            });
          }
          throw t.value;
        }
        try {
          return await r({ response: s, url: e, requestBodyValues: n.values });
        } catch (t) {
          if (t instanceof Error && (Xh(t) || rh.isInstance(t))) throw t;
          throw new rh({
            message: "Failed to process successful response",
            cause: t,
            statusCode: s.status,
            url: e,
            responseHeaders: l,
            requestBodyValues: n.values,
          });
        }
      } catch (t) {
        throw (function ({ error: e, url: t, requestBodyValues: n }) {
          if (Xh(e)) return e;
          if (e instanceof TypeError && Yh.includes(e.message.toLowerCase())) {
            const r = e.cause;
            if (null != r)
              return new rh({
                message: `Cannot connect to API: ${r.message}`,
                cause: r,
                url: t,
                requestBodyValues: n,
                isRetryable: !0,
              });
          }
          return e;
        })({ error: t, url: e, requestBodyValues: n.values });
      }
    },
    pg =
      (e) =>
      async ({ response: t }) => {
        const n = Kh(t);
        if (null == t.body) throw new lh({});
        return { responseHeaders: n, value: lg({ stream: t.body, schema: e }) };
      },
    mg =
      (e) =>
      async ({ response: t, url: n, requestBodyValues: r }) => {
        const o = await t.text(),
          i = await ag({ text: o, schema: e }),
          a = Kh(t);
        if (!i.success)
          throw new rh({
            message: "Invalid JSON response",
            cause: i.error,
            statusCode: t.status,
            responseHeaders: a,
            responseBody: o,
            url: n,
            requestBodyValues: r,
          });
        return { responseHeaders: a, value: i.value, rawValue: i.rawValue };
      },
    { btoa: hg } = globalThis,
    gg = pl([
      ul({ type: Sl("reasoning.summary"), summary: ys() }),
      ul({ type: Sl("reasoning.encrypted"), data: ys() }),
      ul({
        type: Sl("reasoning.text"),
        text: ys().nullish(),
        signature: ys().nullish(),
      }),
    ]),
    fg = sl(pl([gg, tl().transform(() => null)])).transform((e) =>
      e.filter((e) => !!e),
    ),
    vg = ul({
      error: ul({
        code: pl([ys(), Zs()]).nullable().optional().default(null),
        message: ys(),
        type: ys().nullable().optional().default(null),
        param: Qs().nullable().optional().default(null),
      }),
    }),
    yg = (
      ({ errorSchema: e, errorToMessage: t, isRetryable: n }) =>
      async ({ response: r, url: o, requestBodyValues: i }) => {
        const a = await r.text(),
          s = Kh(r);
        if ("" === a.trim())
          return {
            responseHeaders: s,
            value: new rh({
              message: r.statusText,
              url: o,
              requestBodyValues: i,
              statusCode: r.status,
              responseHeaders: s,
              responseBody: a,
              isRetryable: null == n ? void 0 : n(r),
            }),
          };
        try {
          const l = await (async function ({ text: e, schema: t }) {
            try {
              const n = rg(e);
              return null == t
                ? n
                : (async function ({ value: e, schema: t }) {
                    const n = await ig({ value: e, schema: t });
                    if (!n.success) throw qh.wrap({ value: e, cause: n.error });
                    return n.value;
                  })({ value: n, schema: t });
            } catch (t) {
              if (Oh.isInstance(t) || qh.isInstance(t)) throw t;
              throw new Oh({ text: e, cause: t });
            }
          })({ text: a, schema: e });
          return {
            responseHeaders: s,
            value: new rh({
              message: t(l),
              url: o,
              requestBodyValues: i,
              statusCode: r.status,
              responseHeaders: s,
              responseBody: a,
              data: l,
              isRetryable: null == n ? void 0 : n(r, l),
            }),
          };
        } catch (e) {
          return {
            responseHeaders: s,
            value: new rh({
              message: r.statusText,
              url: o,
              requestBodyValues: i,
              statusCode: r.status,
              responseHeaders: s,
              responseBody: a,
              isRetryable: null == n ? void 0 : n(r),
            }),
          };
        }
      }
    )({ errorSchema: vg, errorToMessage: (e) => e.error.message });
  function bg(e) {
    switch (e) {
      case "stop":
        return "stop";
      case "length":
        return "length";
      case "content_filter":
        return "content-filter";
      case "function_call":
      case "tool_calls":
        return "tool-calls";
      default:
        return "unknown";
    }
  }
  function _g({ url: e, protocols: t }) {
    try {
      const n = new URL(e);
      return t.has(n.protocol);
    } catch (e) {
      return !1;
    }
  }
  function wg({ part: e, defaultMediaType: t }) {
    var n, r;
    if (e.data instanceof Uint8Array) {
      const r = (function (e) {
        let t = "";
        for (let n = 0; n < e.length; n++) t += String.fromCodePoint(e[n]);
        return hg(t);
      })(e.data);
      return `data:${null != (n = e.mediaType) ? n : t};base64,${r}`;
    }
    const o = e.data.toString();
    return _g({ url: o, protocols: new Set(["http:", "https:"]) }) ||
      o.startsWith("data:")
      ? o
      : `data:${null != (r = e.mediaType) ? r : t};base64,${o}`;
  }
  function kg(e) {
    var t, n, r;
    const o = null == e ? void 0 : e.anthropic,
      i = null == e ? void 0 : e.openrouter;
    return null !=
      (r =
        null !=
        (n =
          null != (t = null == i ? void 0 : i.cacheControl)
            ? t
            : null == i
              ? void 0
              : i.cache_control)
          ? n
          : null == o
            ? void 0
            : o.cacheControl)
      ? r
      : null == o
        ? void 0
        : o.cache_control;
  }
  function xg(e) {
    var t, n, r;
    const o = [];
    for (const { role: a, content: s, providerOptions: l } of e)
      switch (a) {
        case "system":
          o.push({ role: "system", content: s, cache_control: kg(l) });
          break;
        case "user": {
          if (
            1 === s.length &&
            "text" === (null == (t = s[0]) ? void 0 : t.type)
          ) {
            const e = null != (n = kg(l)) ? n : kg(s[0].providerOptions),
              t = e
                ? [{ type: "text", text: s[0].text, cache_control: e }]
                : s[0].text;
            o.push({ role: "user", content: t });
            break;
          }
          const e = kg(l),
            r = s.map((t) => {
              var n, r, o, i, a, s;
              const l = null != (n = kg(t.providerOptions)) ? n : e;
              switch (t.type) {
                case "text":
                  return { type: "text", text: t.text, cache_control: l };
                case "file": {
                  if (
                    null == (r = t.mediaType) ? void 0 : r.startsWith("image/")
                  )
                    return {
                      type: "image_url",
                      image_url: {
                        url: wg({ part: t, defaultMediaType: "image/jpeg" }),
                      },
                      cache_control: l,
                    };
                  const e = String(
                      null !=
                        (s =
                          null !=
                          (a =
                            null ==
                            (i =
                              null == (o = t.providerOptions)
                                ? void 0
                                : o.openrouter)
                              ? void 0
                              : i.filename)
                            ? a
                            : t.filename)
                        ? s
                        : "",
                    ),
                    n = wg({ part: t, defaultMediaType: "application/pdf" });
                  return _g({ url: n, protocols: new Set(["http:", "https:"]) })
                    ? { type: "file", file: { filename: e, file_data: n } }
                    : {
                        type: "file",
                        file: { filename: e, file_data: n },
                        cache_control: l,
                      };
                }
                default:
                  return { type: "text", text: "", cache_control: l };
              }
            });
          o.push({ role: "user", content: r });
          break;
        }
        case "assistant": {
          let e = "",
            t = "";
          const n = [],
            r = [];
          for (const o of s)
            switch (o.type) {
              case "text":
                e += o.text;
                break;
              case "tool-call":
                r.push({
                  id: o.toolCallId,
                  type: "function",
                  function: {
                    name: o.toolName,
                    arguments: JSON.stringify(o.input),
                  },
                });
                break;
              case "reasoning":
                ((t += o.text),
                  n.push({ type: "reasoning.text", text: o.text }));
            }
          o.push({
            role: "assistant",
            content: e,
            tool_calls: r.length > 0 ? r : void 0,
            reasoning: t || void 0,
            reasoning_details: n.length > 0 ? n : void 0,
            cache_control: kg(l),
          });
          break;
        }
        case "tool":
          for (const e of s) {
            const t =
              "text" === (i = e).output.type
                ? i.output.value
                : JSON.stringify(i.output.value);
            o.push({
              role: "tool",
              tool_call_id: e.toolCallId,
              content: t,
              cache_control: null != (r = kg(l)) ? r : kg(e.providerOptions),
            });
          }
      }
    var i;
    return o;
  }
  function $g(e) {
    switch (e.type) {
      case "auto":
      case "none":
      case "required":
        return e.type;
      case "tool":
        return { type: "function", function: { name: e.toolName } };
      default:
        throw new Error(`Invalid tool choice type: ${e}`);
    }
  }
  pl([
    Sl("auto"),
    Sl("none"),
    Sl("required"),
    ul({ type: Sl("function"), function: ul({ name: ys() }) }),
  ]);
  var Ig = ul({
      id: ys().optional(),
      model: ys().optional(),
      provider: ys().optional(),
      usage: ul({
        prompt_tokens: Zs(),
        prompt_tokens_details: ul({ cached_tokens: Zs() }).nullish(),
        completion_tokens: Zs(),
        completion_tokens_details: ul({ reasoning_tokens: Zs() }).nullish(),
        total_tokens: Zs(),
        cost: Zs().optional(),
        cost_details: ul({ upstream_inference_cost: Zs().nullish() }).nullish(),
      }).nullish(),
    }),
    Sg = Ig.extend({
      choices: sl(
        ul({
          message: ul({
            role: Sl("assistant"),
            content: ys().nullable().optional(),
            reasoning: ys().nullable().optional(),
            reasoning_details: fg.nullish(),
            tool_calls: sl(
              ul({
                id: ys().optional().nullable(),
                type: Sl("function"),
                function: ul({ name: ys(), arguments: ys() }),
              }),
            ).optional(),
            annotations: sl(
              ul({
                type: $l(["url_citation"]),
                url_citation: ul({
                  end_index: Zs(),
                  start_index: Zs(),
                  title: ys(),
                  url: ys(),
                  content: ys().optional(),
                }),
              }),
            ).nullish(),
          }),
          index: Zs().nullish(),
          logprobs: ul({
            content: sl(
              ul({
                token: ys(),
                logprob: Zs(),
                top_logprobs: sl(ul({ token: ys(), logprob: Zs() })),
              }),
            ).nullable(),
          })
            .nullable()
            .optional(),
          finish_reason: ys().optional().nullable(),
        }),
      ),
    }),
    Tg = pl([
      Ig.extend({
        choices: sl(
          ul({
            delta: ul({
              role: $l(["assistant"]).optional(),
              content: ys().nullish(),
              reasoning: ys().nullish().optional(),
              reasoning_details: fg.nullish(),
              tool_calls: sl(
                ul({
                  index: Zs().nullish(),
                  id: ys().nullish(),
                  type: Sl("function").optional(),
                  function: ul({
                    name: ys().nullish(),
                    arguments: ys().nullish(),
                  }),
                }),
              ).nullish(),
              annotations: sl(
                ul({
                  type: $l(["url_citation"]),
                  url_citation: ul({
                    end_index: Zs(),
                    start_index: Zs(),
                    title: ys(),
                    url: ys(),
                    content: ys().optional(),
                  }),
                }),
              ).nullish(),
            }).nullish(),
            logprobs: ul({
              content: sl(
                ul({
                  token: ys(),
                  logprob: Zs(),
                  top_logprobs: sl(ul({ token: ys(), logprob: Zs() })),
                }),
              ).nullable(),
            }).nullish(),
            finish_reason: ys().nullable().optional(),
            index: Zs().nullish(),
          }),
        ),
      }),
      vg,
    ]),
    Ng = class {
      constructor(e, t, n) {
        ((this.specificationVersion = "v2"),
          (this.provider = "openrouter"),
          (this.defaultObjectGenerationMode = "tool"),
          (this.supportedUrls = {
            "image/*": [
              /^data:image\/[a-zA-Z]+;base64,/,
              /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
            ],
            "application/*": [/^data:application\//, /^https?:\/\/.+$/],
          }),
          (this.modelId = e),
          (this.settings = t),
          (this.config = n));
      }
      getArgs({
        prompt: e,
        maxOutputTokens: t,
        temperature: n,
        topP: r,
        frequencyPenalty: o,
        presencePenalty: i,
        seed: a,
        stopSequences: s,
        responseFormat: l,
        topK: u,
        tools: c,
        toolChoice: d,
      }) {
        var p;
        const m = Vm(
          Vm(
            {
              model: this.modelId,
              models: this.settings.models,
              logit_bias: this.settings.logitBias,
              logprobs:
                !0 === this.settings.logprobs ||
                "number" == typeof this.settings.logprobs ||
                void 0,
              top_logprobs:
                "number" == typeof this.settings.logprobs
                  ? this.settings.logprobs
                  : "boolean" == typeof this.settings.logprobs &&
                      this.settings.logprobs
                    ? 0
                    : void 0,
              user: this.settings.user,
              parallel_tool_calls: this.settings.parallelToolCalls,
              max_tokens: t,
              temperature: n,
              top_p: r,
              frequency_penalty: o,
              presence_penalty: i,
              seed: a,
              stop: s,
              response_format: l,
              top_k: u,
              messages: xg(e),
              include_reasoning: this.settings.includeReasoning,
              reasoning: this.settings.reasoning,
              usage: this.settings.usage,
              plugins: this.settings.plugins,
              web_search_options: this.settings.web_search_options,
              provider: this.settings.provider,
            },
            this.config.extraBody,
          ),
          this.settings.extraBody,
        );
        if ("json" === (null == l ? void 0 : l.type) && null != l.schema)
          return Jm(Vm({}, m), {
            response_format: {
              type: "json_schema",
              json_schema: Vm(
                {
                  schema: l.schema,
                  strict: !0,
                  name: null != (p = l.name) ? p : "response",
                },
                l.description && { description: l.description },
              ),
            },
          });
        if (c && c.length > 0) {
          const e = c
            .filter((e) => "function" === e.type)
            .map((e) => ({
              type: "function",
              function: {
                name: e.name,
                description: e.type,
                parameters: e.inputSchema,
              },
            }));
          return Jm(Vm({}, m), { tools: e, tool_choice: d ? $g(d) : void 0 });
        }
        return m;
      }
      async doGenerate(e) {
        var t,
          n,
          r,
          o,
          i,
          a,
          s,
          l,
          u,
          c,
          d,
          p,
          m,
          h,
          g,
          f,
          v,
          y,
          b,
          _,
          w,
          k,
          x,
          $;
        const I = (e.providerOptions || {}).openrouter || {},
          S = Vm(Vm({}, this.getArgs(e)), I),
          { value: T, responseHeaders: N } = await cg({
            url: this.config.url({
              path: "/chat/completions",
              modelId: this.modelId,
            }),
            headers: Jh(this.config.headers(), e.headers),
            body: S,
            failedResponseHandler: yg,
            successfulResponseHandler: mg(Sg),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          }),
          O = T.choices[0];
        if (!O) throw new Error("No choice in response");
        const E = T.usage
            ? {
                inputTokens: null != (t = T.usage.prompt_tokens) ? t : 0,
                outputTokens: null != (n = T.usage.completion_tokens) ? n : 0,
                totalTokens:
                  (null != (r = T.usage.prompt_tokens) ? r : 0) +
                  (null != (o = T.usage.completion_tokens) ? o : 0),
                reasoningTokens:
                  null !=
                  (a =
                    null == (i = T.usage.completion_tokens_details)
                      ? void 0
                      : i.reasoning_tokens)
                    ? a
                    : 0,
                cachedInputTokens:
                  null !=
                  (l =
                    null == (s = T.usage.prompt_tokens_details)
                      ? void 0
                      : s.cached_tokens)
                    ? l
                    : 0,
              }
            : {
                inputTokens: 0,
                outputTokens: 0,
                totalTokens: 0,
                reasoningTokens: 0,
                cachedInputTokens: 0,
              },
          A = null != (u = O.message.reasoning_details) ? u : [],
          U =
            A.length > 0
              ? A.map((e) => {
                  switch (e.type) {
                    case "reasoning.text":
                      if (e.text) return { type: "reasoning", text: e.text };
                      break;
                    case "reasoning.summary":
                      if (e.summary)
                        return { type: "reasoning", text: e.summary };
                      break;
                    case "reasoning.encrypted":
                      if (e.data)
                        return { type: "reasoning", text: "[REDACTED]" };
                  }
                  return null;
                }).filter((e) => null !== e)
              : O.message.reasoning
                ? [{ type: "reasoning", text: O.message.reasoning }]
                : [],
          C = [];
        if (
          (C.push(...U),
          O.message.content &&
            C.push({ type: "text", text: O.message.content }),
          O.message.tool_calls)
        )
          for (const e of O.message.tool_calls)
            C.push({
              type: "tool-call",
              toolCallId: null != (c = e.id) ? c : Gh(),
              toolName: e.function.name,
              input: e.function.arguments,
            });
        if (O.message.annotations)
          for (const e of O.message.annotations)
            "url_citation" === e.type &&
              C.push({
                type: "source",
                sourceType: "url",
                id: e.url_citation.url,
                url: e.url_citation.url,
                title: e.url_citation.title,
                providerMetadata: {
                  openrouter: { content: e.url_citation.content || "" },
                },
              });
        return {
          content: C,
          finishReason: bg(O.finish_reason),
          usage: E,
          warnings: [],
          providerMetadata: {
            openrouter: {
              provider: null != (d = T.provider) ? d : "",
              usage: {
                promptTokens: null != (p = E.inputTokens) ? p : 0,
                completionTokens: null != (m = E.outputTokens) ? m : 0,
                totalTokens: null != (h = E.totalTokens) ? h : 0,
                cost: null == (g = T.usage) ? void 0 : g.cost,
                promptTokensDetails: {
                  cachedTokens:
                    null !=
                    (y =
                      null ==
                      (v =
                        null == (f = T.usage)
                          ? void 0
                          : f.prompt_tokens_details)
                        ? void 0
                        : v.cached_tokens)
                      ? y
                      : 0,
                },
                completionTokensDetails: {
                  reasoningTokens:
                    null !=
                    (w =
                      null ==
                      (_ =
                        null == (b = T.usage)
                          ? void 0
                          : b.completion_tokens_details)
                        ? void 0
                        : _.reasoning_tokens)
                      ? w
                      : 0,
                },
                costDetails: {
                  upstreamInferenceCost:
                    null !=
                    ($ =
                      null ==
                      (x = null == (k = T.usage) ? void 0 : k.cost_details)
                        ? void 0
                        : x.upstream_inference_cost)
                      ? $
                      : 0,
                },
              },
            },
          },
          request: { body: S },
          response: { id: T.id, modelId: T.model, headers: N },
        };
      }
      async doStream(e) {
        var t;
        const n = (e.providerOptions || {}).openrouter || {},
          r = Vm(Vm({}, this.getArgs(e)), n),
          { value: o, responseHeaders: i } = await cg({
            url: this.config.url({
              path: "/chat/completions",
              modelId: this.modelId,
            }),
            headers: Jh(this.config.headers(), e.headers),
            body: Jm(Vm({}, r), {
              stream: !0,
              stream_options:
                "strict" === this.config.compatibility
                  ? Vm(
                      { include_usage: !0 },
                      (null == (t = this.settings.usage) ? void 0 : t.include)
                        ? { include_usage: !0 }
                        : {},
                    )
                  : void 0,
            }),
            failedResponseHandler: yg,
            successfulResponseHandler: pg(Tg),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          }),
          a = [];
        let s = "other";
        const l = {
            inputTokens: Number.NaN,
            outputTokens: Number.NaN,
            totalTokens: Number.NaN,
            reasoningTokens: Number.NaN,
            cachedInputTokens: Number.NaN,
          },
          u = {};
        let c,
          d,
          p,
          m,
          h = !1,
          g = !1;
        return {
          stream: o.pipeThrough(
            new TransformStream({
              transform(e, t) {
                var n, r, o, i, f, v, y, b, _, w, k, x, $, I;
                if (!e.success)
                  return (
                    (s = "error"),
                    void t.enqueue({ type: "error", error: e.error })
                  );
                const S = e.value;
                if ("error" in S)
                  return (
                    (s = "error"),
                    void t.enqueue({ type: "error", error: S.error })
                  );
                if (
                  (S.provider && (m = S.provider),
                  S.id &&
                    ((p = S.id),
                    t.enqueue({ type: "response-metadata", id: S.id })),
                  S.model &&
                    t.enqueue({ type: "response-metadata", modelId: S.model }),
                  null != S.usage)
                ) {
                  if (
                    ((l.inputTokens = S.usage.prompt_tokens),
                    (l.outputTokens = S.usage.completion_tokens),
                    (l.totalTokens =
                      S.usage.prompt_tokens + S.usage.completion_tokens),
                    (u.promptTokens = S.usage.prompt_tokens),
                    S.usage.prompt_tokens_details)
                  ) {
                    const e =
                      null != (n = S.usage.prompt_tokens_details.cached_tokens)
                        ? n
                        : 0;
                    ((l.cachedInputTokens = e),
                      (u.promptTokensDetails = { cachedTokens: e }));
                  }
                  if (
                    ((u.completionTokens = S.usage.completion_tokens),
                    S.usage.completion_tokens_details)
                  ) {
                    const e =
                      null !=
                      (r = S.usage.completion_tokens_details.reasoning_tokens)
                        ? r
                        : 0;
                    ((l.reasoningTokens = e),
                      (u.completionTokensDetails = { reasoningTokens: e }));
                  }
                  ((u.cost = S.usage.cost),
                    (u.totalTokens = S.usage.total_tokens));
                }
                const T = S.choices[0];
                if (
                  (null != (null == T ? void 0 : T.finish_reason) &&
                    (s = bg(T.finish_reason)),
                  null == (null == T ? void 0 : T.delta))
                )
                  return;
                const N = T.delta,
                  O = (e) => {
                    (g ||
                      ((d = p || Gh()),
                      t.enqueue({ type: "reasoning-start", id: d }),
                      (g = !0)),
                      t.enqueue({
                        type: "reasoning-delta",
                        delta: e,
                        id: d || Gh(),
                      }));
                  };
                if (N.reasoning_details && N.reasoning_details.length > 0)
                  for (const e of N.reasoning_details)
                    switch (e.type) {
                      case "reasoning.text":
                        e.text && O(e.text);
                        break;
                      case "reasoning.encrypted":
                        e.data && O("[REDACTED]");
                        break;
                      case "reasoning.summary":
                        e.summary && O(e.summary);
                    }
                else N.reasoning && O(N.reasoning);
                if (
                  (N.content &&
                    (g &&
                      !h &&
                      (t.enqueue({ type: "reasoning-end", id: d || Gh() }),
                      (g = !1)),
                    h ||
                      ((c = p || Gh()),
                      t.enqueue({ type: "text-start", id: c }),
                      (h = !0)),
                    t.enqueue({
                      type: "text-delta",
                      delta: N.content,
                      id: c || Gh(),
                    })),
                  N.annotations)
                )
                  for (const e of N.annotations)
                    "url_citation" === e.type &&
                      t.enqueue({
                        type: "source",
                        sourceType: "url",
                        id: e.url_citation.url,
                        url: e.url_citation.url,
                        title: e.url_citation.title,
                        providerMetadata: {
                          openrouter: { content: e.url_citation.content || "" },
                        },
                      });
                if (null != N.tool_calls)
                  for (const e of N.tool_calls) {
                    const n = null != (o = e.index) ? o : a.length - 1;
                    if (null == a[n]) {
                      if ("function" !== e.type)
                        throw new $h({
                          data: e,
                          message: "Expected 'function' type.",
                        });
                      if (null == e.id)
                        throw new $h({
                          data: e,
                          message: "Expected 'id' to be a string.",
                        });
                      if (null == (null == (i = e.function) ? void 0 : i.name))
                        throw new $h({
                          data: e,
                          message: "Expected 'function.name' to be a string.",
                        });
                      a[n] = {
                        id: e.id,
                        type: "function",
                        function: {
                          name: e.function.name,
                          arguments:
                            null != (f = e.function.arguments) ? f : "",
                        },
                        inputStarted: !1,
                        sent: !1,
                      };
                      const r = a[n];
                      if (null == r) throw new Error("Tool call is missing");
                      null != (null == (v = r.function) ? void 0 : v.name) &&
                        null !=
                          (null == (y = r.function) ? void 0 : y.arguments) &&
                        sg(r.function.arguments) &&
                        ((r.inputStarted = !0),
                        t.enqueue({
                          type: "tool-input-start",
                          id: r.id,
                          toolName: r.function.name,
                        }),
                        t.enqueue({
                          type: "tool-input-delta",
                          id: r.id,
                          delta: r.function.arguments,
                        }),
                        t.enqueue({ type: "tool-input-end", id: r.id }),
                        t.enqueue({
                          type: "tool-call",
                          toolCallId: r.id,
                          toolName: r.function.name,
                          input: r.function.arguments,
                        }),
                        (r.sent = !0));
                      continue;
                    }
                    const r = a[n];
                    if (null == r) throw new Error("Tool call is missing");
                    (r.inputStarted ||
                      ((r.inputStarted = !0),
                      t.enqueue({
                        type: "tool-input-start",
                        id: r.id,
                        toolName: r.function.name,
                      })),
                      null !=
                        (null == (b = e.function) ? void 0 : b.arguments) &&
                        (r.function.arguments +=
                          null !=
                          (w = null == (_ = e.function) ? void 0 : _.arguments)
                            ? w
                            : ""),
                      t.enqueue({
                        type: "tool-input-delta",
                        id: r.id,
                        delta: null != (k = e.function.arguments) ? k : "",
                      }),
                      null != (null == (x = r.function) ? void 0 : x.name) &&
                        null !=
                          (null == ($ = r.function) ? void 0 : $.arguments) &&
                        sg(r.function.arguments) &&
                        (t.enqueue({
                          type: "tool-call",
                          toolCallId: null != (I = r.id) ? I : Gh(),
                          toolName: r.function.name,
                          input: r.function.arguments,
                        }),
                        (r.sent = !0)));
                  }
              },
              flush(e) {
                var t;
                if ("tool-calls" === s)
                  for (const n of a)
                    n &&
                      !n.sent &&
                      (e.enqueue({
                        type: "tool-call",
                        toolCallId: null != (t = n.id) ? t : Gh(),
                        toolName: n.function.name,
                        input: sg(n.function.arguments)
                          ? n.function.arguments
                          : "{}",
                      }),
                      (n.sent = !0));
                (g && e.enqueue({ type: "reasoning-end", id: d || Gh() }),
                  h && e.enqueue({ type: "text-end", id: c || Gh() }));
                const n = { usage: u };
                (void 0 !== m && (n.provider = m),
                  e.enqueue({
                    type: "finish",
                    finishReason: s,
                    usage: l,
                    providerMetadata: { openrouter: n },
                  }));
              },
            }),
          ),
          warnings: [],
          request: { body: r },
          response: { headers: i },
        };
      }
    },
    Og = pl([
      ul({
        id: ys().optional(),
        model: ys().optional(),
        choices: sl(
          ul({
            text: ys(),
            reasoning: ys().nullish().optional(),
            reasoning_details: fg.nullish(),
            finish_reason: ys().nullish(),
            index: Zs().nullish(),
            logprobs: ul({
              tokens: sl(ys()),
              token_logprobs: sl(Zs()),
              top_logprobs: sl(_l(ys(), Zs())).nullable(),
            })
              .nullable()
              .optional(),
          }),
        ),
        usage: ul({
          prompt_tokens: Zs(),
          prompt_tokens_details: ul({ cached_tokens: Zs() }).nullish(),
          completion_tokens: Zs(),
          completion_tokens_details: ul({ reasoning_tokens: Zs() }).nullish(),
          total_tokens: Zs(),
          cost: Zs().optional(),
        }).nullish(),
      }),
      vg,
    ]),
    Eg = class {
      constructor(e, t, n) {
        ((this.specificationVersion = "v2"),
          (this.provider = "openrouter"),
          (this.supportedUrls = {
            "image/*": [
              /^data:image\/[a-zA-Z]+;base64,/,
              /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
            ],
            "text/*": [/^data:text\//, /^https?:\/\/.+$/],
            "application/*": [/^data:application\//, /^https?:\/\/.+$/],
          }),
          (this.defaultObjectGenerationMode = void 0),
          (this.modelId = e),
          (this.settings = t),
          (this.config = n));
      }
      getArgs({
        prompt: e,
        maxOutputTokens: t,
        temperature: n,
        topP: r,
        frequencyPenalty: o,
        presencePenalty: i,
        seed: a,
        responseFormat: s,
        topK: l,
        stopSequences: u,
        tools: c,
        toolChoice: d,
      }) {
        const { prompt: p } = (function ({
          prompt: e,
          inputFormat: t,
          user: n = "user",
          assistant: r = "assistant",
        }) {
          if (
            1 === e.length &&
            e[0] &&
            "user" === e[0].role &&
            1 === e[0].content.length &&
            e[0].content[0] &&
            "text" === e[0].content[0].type
          )
            return { prompt: e[0].content[0].text };
          let o = "";
          e[0] &&
            "system" === e[0].role &&
            ((o += `${e[0].content}\n\n`), (e = e.slice(1)));
          for (const { role: t, content: i } of e)
            switch (t) {
              case "system":
                throw new bh({
                  message: `Unexpected system message in prompt: ${i}`,
                  prompt: e,
                });
              case "user":
                o += `${n}:\n${i
                  .map((e) => {
                    switch (e.type) {
                      case "text":
                        return e.text;
                      case "file":
                        throw new Bh({ functionality: "file attachments" });
                      default:
                        return "";
                    }
                  })
                  .join("")}\n\n`;
                break;
              case "assistant":
                o += `${r}:\n${i
                  .map((e) => {
                    switch (e.type) {
                      case "text":
                        return e.text;
                      case "tool-call":
                        throw new Bh({ functionality: "tool-call messages" });
                      case "tool-result":
                        throw new Bh({ functionality: "tool-result messages" });
                      case "reasoning":
                        throw new Bh({ functionality: "reasoning messages" });
                      case "file":
                        throw new Bh({ functionality: "file attachments" });
                      default:
                        return "";
                    }
                  })
                  .join("")}\n\n`;
                break;
              case "tool":
                throw new Bh({ functionality: "tool messages" });
            }
          return ((o += `${r}:\n`), { prompt: o });
        })({ prompt: e, inputFormat: "prompt" });
        if (null == c ? void 0 : c.length)
          throw new Bh({ functionality: "tools" });
        if (d) throw new Bh({ functionality: "toolChoice" });
        return Vm(
          Vm(
            {
              model: this.modelId,
              models: this.settings.models,
              logit_bias: this.settings.logitBias,
              logprobs:
                "number" == typeof this.settings.logprobs
                  ? this.settings.logprobs
                  : "boolean" == typeof this.settings.logprobs &&
                      this.settings.logprobs
                    ? 0
                    : void 0,
              suffix: this.settings.suffix,
              user: this.settings.user,
              max_tokens: t,
              temperature: n,
              top_p: r,
              frequency_penalty: o,
              presence_penalty: i,
              seed: a,
              stop: u,
              response_format: s,
              top_k: l,
              prompt: p,
              include_reasoning: this.settings.includeReasoning,
              reasoning: this.settings.reasoning,
            },
            this.config.extraBody,
          ),
          this.settings.extraBody,
        );
      }
      async doGenerate(e) {
        var t, n, r, o, i, a, s, l, u, c, d, p, m, h, g;
        const f = (e.providerOptions || {}).openrouter || {},
          v = Vm(Vm({}, this.getArgs(e)), f),
          { value: y, responseHeaders: b } = await cg({
            url: this.config.url({
              path: "/completions",
              modelId: this.modelId,
            }),
            headers: Jh(this.config.headers(), e.headers),
            body: v,
            failedResponseHandler: yg,
            successfulResponseHandler: mg(Og),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          });
        if ("error" in y) throw new Error(`${y.error.message}`);
        const _ = y.choices[0];
        if (!_) throw new Error("No choice in OpenRouter completion response");
        return {
          content: [{ type: "text", text: null != (t = _.text) ? t : "" }],
          finishReason: bg(_.finish_reason),
          usage: {
            inputTokens:
              null != (r = null == (n = y.usage) ? void 0 : n.prompt_tokens)
                ? r
                : 0,
            outputTokens:
              null != (i = null == (o = y.usage) ? void 0 : o.completion_tokens)
                ? i
                : 0,
            totalTokens:
              (null != (s = null == (a = y.usage) ? void 0 : a.prompt_tokens)
                ? s
                : 0) +
              (null !=
              (u = null == (l = y.usage) ? void 0 : l.completion_tokens)
                ? u
                : 0),
            reasoningTokens:
              null !=
              (p =
                null ==
                (d =
                  null == (c = y.usage) ? void 0 : c.completion_tokens_details)
                  ? void 0
                  : d.reasoning_tokens)
                ? p
                : 0,
            cachedInputTokens:
              null !=
              (g =
                null ==
                (h = null == (m = y.usage) ? void 0 : m.prompt_tokens_details)
                  ? void 0
                  : h.cached_tokens)
                ? g
                : 0,
          },
          warnings: [],
          response: { headers: b },
        };
      }
      async doStream(e) {
        const t = (e.providerOptions || {}).openrouter || {},
          n = Vm(Vm({}, this.getArgs(e)), t),
          { value: r, responseHeaders: o } = await cg({
            url: this.config.url({
              path: "/completions",
              modelId: this.modelId,
            }),
            headers: Jh(this.config.headers(), e.headers),
            body: Jm(Vm({}, n), {
              stream: !0,
              stream_options:
                "strict" === this.config.compatibility
                  ? { include_usage: !0 }
                  : void 0,
            }),
            failedResponseHandler: yg,
            successfulResponseHandler: pg(Og),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          });
        let i = "other";
        const a = {
            inputTokens: Number.NaN,
            outputTokens: Number.NaN,
            totalTokens: Number.NaN,
            reasoningTokens: Number.NaN,
            cachedInputTokens: Number.NaN,
          },
          s = {};
        return {
          stream: r.pipeThrough(
            new TransformStream({
              transform(e, t) {
                var n, r;
                if (!e.success)
                  return (
                    (i = "error"),
                    void t.enqueue({ type: "error", error: e.error })
                  );
                const o = e.value;
                if ("error" in o)
                  return (
                    (i = "error"),
                    void t.enqueue({ type: "error", error: o.error })
                  );
                if (null != o.usage) {
                  if (
                    ((a.inputTokens = o.usage.prompt_tokens),
                    (a.outputTokens = o.usage.completion_tokens),
                    (a.totalTokens =
                      o.usage.prompt_tokens + o.usage.completion_tokens),
                    (s.promptTokens = o.usage.prompt_tokens),
                    o.usage.prompt_tokens_details)
                  ) {
                    const e =
                      null != (n = o.usage.prompt_tokens_details.cached_tokens)
                        ? n
                        : 0;
                    ((a.cachedInputTokens = e),
                      (s.promptTokensDetails = { cachedTokens: e }));
                  }
                  if (
                    ((s.completionTokens = o.usage.completion_tokens),
                    o.usage.completion_tokens_details)
                  ) {
                    const e =
                      null !=
                      (r = o.usage.completion_tokens_details.reasoning_tokens)
                        ? r
                        : 0;
                    ((a.reasoningTokens = e),
                      (s.completionTokensDetails = { reasoningTokens: e }));
                  }
                  ((s.cost = o.usage.cost),
                    (s.totalTokens = o.usage.total_tokens));
                }
                const l = o.choices[0];
                (null != (null == l ? void 0 : l.finish_reason) &&
                  (i = bg(l.finish_reason)),
                  null != (null == l ? void 0 : l.text) &&
                    t.enqueue({ type: "text-delta", delta: l.text, id: Gh() }));
              },
              flush(e) {
                e.enqueue({
                  type: "finish",
                  finishReason: i,
                  usage: a,
                  providerMetadata: { openrouter: { usage: s } },
                });
              },
            }),
          ),
          response: { headers: o },
        };
      }
    };
  function Ag(e = {}) {
    var t, n, r;
    const o =
        null !=
        (n =
          null == (d = null != (t = e.baseURL) ? t : e.baseUrl)
            ? void 0
            : d.replace(/\/$/, ""))
          ? n
          : "https://openrouter.ai/api/v1",
      i = null != (r = e.compatibility) ? r : "compatible",
      a = () =>
        Vm(
          {
            Authorization: `Bearer ${eg({ apiKey: e.apiKey, environmentVariableName: "OPENROUTER_API_KEY", description: "OpenRouter" })}`,
          },
          e.headers,
        ),
      s = (t, n = {}) =>
        new Ng(t, n, {
          provider: "openrouter.chat",
          url: ({ path: e }) => `${o}${e}`,
          headers: a,
          compatibility: i,
          fetch: e.fetch,
          extraBody: e.extraBody,
        }),
      l = (t, n = {}) =>
        new Eg(t, n, {
          provider: "openrouter.completion",
          url: ({ path: e }) => `${o}${e}`,
          headers: a,
          compatibility: i,
          fetch: e.fetch,
          extraBody: e.extraBody,
        }),
      u = (e, t) => {
        if (new.target)
          throw new Error(
            "The OpenRouter model function cannot be called with the new keyword.",
          );
        return "openai/gpt-3.5-turbo-instruct" === e ? l(e, t) : s(e, t);
      },
      c = (e, t) => u(e, t);
    var d;
    return ((c.languageModel = u), (c.chat = s), (c.completion = l), c);
  }
  function Ug(e) {
    var t, n;
    return null !=
      (n =
        null == (t = null == e ? void 0 : e.providerOptions)
          ? void 0
          : t.openaiCompatible)
      ? n
      : {};
  }
  function Cg(e) {
    const t = [];
    for (const { role: n, content: r, ...o } of e) {
      const e = Ug({ ...o });
      switch (n) {
        case "system":
          t.push({ role: "system", content: r, ...e });
          break;
        case "user":
          if (1 === r.length && "text" === r[0].type) {
            t.push({ role: "user", content: r[0].text, ...Ug(r[0]) });
            break;
          }
          t.push({
            role: "user",
            content: r.map((e) => {
              const t = Ug(e);
              switch (e.type) {
                case "text":
                  return { type: "text", text: e.text, ...t };
                case "file":
                  if (e.mediaType.startsWith("image/")) {
                    const n =
                      "image/*" === e.mediaType ? "image/jpeg" : e.mediaType;
                    return {
                      type: "image_url",
                      image_url: {
                        url:
                          e.data instanceof URL
                            ? e.data.toString()
                            : `data:${n};base64,${e.data}`,
                      },
                      ...t,
                    };
                  }
                  throw new fe({
                    functionality: `file part media type ${e.mediaType}`,
                  });
              }
            }),
            ...e,
          });
          break;
        case "assistant": {
          let n = "";
          const o = [];
          for (const e of r) {
            const t = Ug(e);
            switch (e.type) {
              case "text":
                n += e.text;
                break;
              case "tool-call":
                o.push({
                  id: e.toolCallId,
                  type: "function",
                  function: {
                    name: e.toolName,
                    arguments: JSON.stringify(e.input),
                  },
                  ...t,
                });
            }
          }
          t.push({
            role: "assistant",
            content: n,
            tool_calls: o.length > 0 ? o : void 0,
            ...e,
          });
          break;
        }
        case "tool":
          for (const e of r) {
            const n = e.output;
            let r;
            switch (n.type) {
              case "text":
              case "error-text":
                r = n.value;
                break;
              case "content":
              case "json":
              case "error-json":
                r = JSON.stringify(n.value);
            }
            const o = Ug(e);
            t.push({
              role: "tool",
              tool_call_id: e.toolCallId,
              content: r,
              ...o,
            });
          }
          break;
        default:
          throw new Error(`Unsupported role: ${n}`);
      }
    }
    return t;
  }
  function Pg({ id: e, model: t, created: n }) {
    return {
      id: null != e ? e : void 0,
      modelId: null != t ? t : void 0,
      timestamp: null != n ? new Date(1e3 * n) : void 0,
    };
  }
  function Dg(e) {
    switch (e) {
      case "stop":
        return "stop";
      case "length":
        return "length";
      case "content_filter":
        return "content-filter";
      case "function_call":
      case "tool_calls":
        return "tool-calls";
      default:
        return "unknown";
    }
  }
  Ag({ compatibility: "strict" });
  var jg = ul({ user: ys().optional(), reasoningEffort: ys().optional() }),
    zg = {
      errorSchema: ul({
        error: ul({
          message: ys(),
          type: ys().nullish(),
          param: Qs().nullish(),
          code: pl([ys(), Zs()]).nullish(),
        }),
      }),
      errorToMessage: (e) => e.error.message,
    },
    Rg = class {
      constructor(e, t) {
        var n, r;
        ((this.specificationVersion = "v2"),
          (this.modelId = e),
          (this.config = t));
        const o = null != (n = t.errorStructure) ? n : zg;
        ((this.chunkSchema = Zg(o.errorSchema)),
          (this.failedResponseHandler = lc(o)),
          (this.supportsStructuredOutputs =
            null != (r = t.supportsStructuredOutputs) && r));
      }
      get provider() {
        return this.config.provider;
      }
      get providerOptionsName() {
        return this.config.provider.split(".")[0].trim();
      }
      get supportedUrls() {
        var e, t, n;
        return null !=
          (n =
            null == (t = (e = this.config).supportedUrls) ? void 0 : t.call(e))
          ? n
          : {};
      }
      async getArgs({
        prompt: e,
        maxOutputTokens: t,
        temperature: n,
        topP: r,
        topK: o,
        frequencyPenalty: i,
        presencePenalty: a,
        providerOptions: s,
        stopSequences: l,
        responseFormat: u,
        seed: c,
        toolChoice: d,
        tools: p,
      }) {
        var m, h, g;
        const f = [],
          v = Object.assign(
            null !=
              (m = await tc({
                provider: "openai-compatible",
                providerOptions: s,
                schema: jg,
              }))
              ? m
              : {},
            null !=
              (h = await tc({
                provider: this.providerOptionsName,
                providerOptions: s,
                schema: jg,
              }))
              ? h
              : {},
          );
        (null != o && f.push({ type: "unsupported-setting", setting: "topK" }),
          "json" !== (null == u ? void 0 : u.type) ||
            null == u.schema ||
            this.supportsStructuredOutputs ||
            f.push({
              type: "unsupported-setting",
              setting: "responseFormat",
              details:
                "JSON response format schema is only supported with structuredOutputs",
            }));
        const {
          tools: y,
          toolChoice: b,
          toolWarnings: _,
        } = (function ({ tools: e, toolChoice: t }) {
          const n = [];
          if (null == (e = (null == e ? void 0 : e.length) ? e : void 0))
            return { tools: void 0, toolChoice: void 0, toolWarnings: n };
          const r = [];
          for (const t of e)
            "provider-defined" === t.type
              ? n.push({ type: "unsupported-tool", tool: t })
              : r.push({
                  type: "function",
                  function: {
                    name: t.name,
                    description: t.description,
                    parameters: t.inputSchema,
                  },
                });
          if (null == t)
            return { tools: r, toolChoice: void 0, toolWarnings: n };
          const o = t.type;
          switch (o) {
            case "auto":
            case "none":
            case "required":
              return { tools: r, toolChoice: o, toolWarnings: n };
            case "tool":
              return {
                tools: r,
                toolChoice: {
                  type: "function",
                  function: { name: t.toolName },
                },
                toolWarnings: n,
              };
            default:
              throw new fe({ functionality: `tool choice type: ${o}` });
          }
        })({ tools: p, toolChoice: d });
        return {
          args: {
            model: this.modelId,
            user: v.user,
            max_tokens: t,
            temperature: n,
            top_p: r,
            frequency_penalty: i,
            presence_penalty: a,
            response_format:
              "json" === (null == u ? void 0 : u.type)
                ? !0 === this.supportsStructuredOutputs && null != u.schema
                  ? {
                      type: "json_schema",
                      json_schema: {
                        schema: u.schema,
                        name: null != (g = u.name) ? g : "response",
                        description: u.description,
                      },
                    }
                  : { type: "json_object" }
                : void 0,
            stop: l,
            seed: c,
            ...(null == s ? void 0 : s[this.providerOptionsName]),
            reasoning_effort: v.reasoningEffort,
            messages: Cg(e),
            tools: y,
            tool_choice: b,
          },
          warnings: [...f, ..._],
        };
      }
      async doGenerate(e) {
        var t, n, r, o, i, a, s, l, u, c, d, p, m, h, g, f;
        const { args: v, warnings: y } = await this.getArgs({ ...e }),
          b = JSON.stringify(v),
          {
            responseHeaders: _,
            value: w,
            rawValue: k,
          } = await rc({
            url: this.config.url({
              path: "/chat/completions",
              modelId: this.modelId,
            }),
            headers: Ru(this.config.headers(), e.headers),
            body: v,
            failedResponseHandler: this.failedResponseHandler,
            successfulResponseHandler: cc(qg),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          }),
          x = w.choices[0],
          $ = [],
          I = x.message.content;
        null != I && I.length > 0 && $.push({ type: "text", text: I });
        const S = x.message.reasoning_content;
        if (
          (null != S && S.length > 0 && $.push({ type: "reasoning", text: S }),
          null != x.message.tool_calls)
        )
          for (const e of x.message.tool_calls)
            $.push({
              type: "tool-call",
              toolCallId: null != (t = e.id) ? t : qu(),
              toolName: e.function.name,
              input: e.function.arguments,
            });
        const T = {
            [this.providerOptionsName]: {},
            ...(await (null ==
            (r =
              null == (n = this.config.metadataExtractor)
                ? void 0
                : n.extractMetadata)
              ? void 0
              : r.call(n, { parsedBody: k }))),
          },
          N = null == (o = w.usage) ? void 0 : o.completion_tokens_details;
        return (
          null != (null == N ? void 0 : N.accepted_prediction_tokens) &&
            (T[this.providerOptionsName].acceptedPredictionTokens =
              null == N ? void 0 : N.accepted_prediction_tokens),
          null != (null == N ? void 0 : N.rejected_prediction_tokens) &&
            (T[this.providerOptionsName].rejectedPredictionTokens =
              null == N ? void 0 : N.rejected_prediction_tokens),
          {
            content: $,
            finishReason: Dg(x.finish_reason),
            usage: {
              inputTokens:
                null != (a = null == (i = w.usage) ? void 0 : i.prompt_tokens)
                  ? a
                  : void 0,
              outputTokens:
                null !=
                (l = null == (s = w.usage) ? void 0 : s.completion_tokens)
                  ? l
                  : void 0,
              totalTokens:
                null != (c = null == (u = w.usage) ? void 0 : u.total_tokens)
                  ? c
                  : void 0,
              reasoningTokens:
                null !=
                (m =
                  null ==
                  (p =
                    null == (d = w.usage)
                      ? void 0
                      : d.completion_tokens_details)
                    ? void 0
                    : p.reasoning_tokens)
                  ? m
                  : void 0,
              cachedInputTokens:
                null !=
                (f =
                  null ==
                  (g = null == (h = w.usage) ? void 0 : h.prompt_tokens_details)
                    ? void 0
                    : g.cached_tokens)
                  ? f
                  : void 0,
            },
            providerMetadata: T,
            request: { body: b },
            response: { ...Pg(w), headers: _, body: k },
            warnings: y,
          }
        );
      }
      async doStream(e) {
        var t;
        const { args: n, warnings: r } = await this.getArgs({ ...e }),
          o = {
            ...n,
            stream: !0,
            stream_options: this.config.includeUsage
              ? { include_usage: !0 }
              : void 0,
          },
          i =
            null == (t = this.config.metadataExtractor)
              ? void 0
              : t.createStreamExtractor(),
          { responseHeaders: a, value: s } = await rc({
            url: this.config.url({
              path: "/chat/completions",
              modelId: this.modelId,
            }),
            headers: Ru(this.config.headers(), e.headers),
            body: o,
            failedResponseHandler: this.failedResponseHandler,
            successfulResponseHandler: uc(this.chunkSchema),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          }),
          l = [];
        let u = "unknown";
        const c = {
          completionTokens: void 0,
          completionTokensDetails: {
            reasoningTokens: void 0,
            acceptedPredictionTokens: void 0,
            rejectedPredictionTokens: void 0,
          },
          promptTokens: void 0,
          promptTokensDetails: { cachedTokens: void 0 },
          totalTokens: void 0,
        };
        let d = !0;
        const p = this.providerOptionsName;
        let m = !1,
          h = !1;
        return {
          stream: s.pipeThrough(
            new TransformStream({
              start(e) {
                e.enqueue({ type: "stream-start", warnings: r });
              },
              transform(t, n) {
                var r, o, a, s, p, g, f, v, y, b, _, w;
                if (
                  (e.includeRawChunks &&
                    n.enqueue({ type: "raw", rawValue: t.rawValue }),
                  !t.success)
                )
                  return (
                    (u = "error"),
                    void n.enqueue({ type: "error", error: t.error })
                  );
                const k = t.value;
                if ((null == i || i.processChunk(t.rawValue), "error" in k))
                  return (
                    (u = "error"),
                    void n.enqueue({ type: "error", error: k.error.message })
                  );
                if (
                  (d &&
                    ((d = !1),
                    n.enqueue({ type: "response-metadata", ...Pg(k) })),
                  null != k.usage)
                ) {
                  const {
                    prompt_tokens: e,
                    completion_tokens: t,
                    total_tokens: n,
                    prompt_tokens_details: r,
                    completion_tokens_details: o,
                  } = k.usage;
                  ((c.promptTokens = null != e ? e : void 0),
                    (c.completionTokens = null != t ? t : void 0),
                    (c.totalTokens = null != n ? n : void 0),
                    null != (null == o ? void 0 : o.reasoning_tokens) &&
                      (c.completionTokensDetails.reasoningTokens =
                        null == o ? void 0 : o.reasoning_tokens),
                    null !=
                      (null == o ? void 0 : o.accepted_prediction_tokens) &&
                      (c.completionTokensDetails.acceptedPredictionTokens =
                        null == o ? void 0 : o.accepted_prediction_tokens),
                    null !=
                      (null == o ? void 0 : o.rejected_prediction_tokens) &&
                      (c.completionTokensDetails.rejectedPredictionTokens =
                        null == o ? void 0 : o.rejected_prediction_tokens),
                    null != (null == r ? void 0 : r.cached_tokens) &&
                      (c.promptTokensDetails.cachedTokens =
                        null == r ? void 0 : r.cached_tokens));
                }
                const x = k.choices[0];
                if (
                  (null != (null == x ? void 0 : x.finish_reason) &&
                    (u = Dg(x.finish_reason)),
                  null == (null == x ? void 0 : x.delta))
                )
                  return;
                const $ = x.delta;
                if (
                  ($.reasoning_content &&
                    (m ||
                      (n.enqueue({
                        type: "reasoning-start",
                        id: "reasoning-0",
                      }),
                      (m = !0)),
                    n.enqueue({
                      type: "reasoning-delta",
                      id: "reasoning-0",
                      delta: $.reasoning_content,
                    })),
                  $.content &&
                    (h ||
                      (n.enqueue({ type: "text-start", id: "txt-0" }),
                      (h = !0)),
                    n.enqueue({
                      type: "text-delta",
                      id: "txt-0",
                      delta: $.content,
                    })),
                  null != $.tool_calls)
                )
                  for (const e of $.tool_calls) {
                    const t = e.index;
                    if (null == l[t]) {
                      if (null == e.id)
                        throw new D({
                          data: e,
                          message: "Expected 'id' to be a string.",
                        });
                      if (null == (null == (r = e.function) ? void 0 : r.name))
                        throw new D({
                          data: e,
                          message: "Expected 'function.name' to be a string.",
                        });
                      (n.enqueue({
                        type: "tool-input-start",
                        id: e.id,
                        toolName: e.function.name,
                      }),
                        (l[t] = {
                          id: e.id,
                          type: "function",
                          function: {
                            name: e.function.name,
                            arguments:
                              null != (o = e.function.arguments) ? o : "",
                          },
                          hasFinished: !1,
                        }));
                      const i = l[t];
                      null != (null == (a = i.function) ? void 0 : a.name) &&
                        null !=
                          (null == (s = i.function) ? void 0 : s.arguments) &&
                        (i.function.arguments.length > 0 &&
                          n.enqueue({
                            type: "tool-input-start",
                            id: i.id,
                            toolName: i.function.name,
                          }),
                        Qu(i.function.arguments) &&
                          (n.enqueue({ type: "tool-input-end", id: i.id }),
                          n.enqueue({
                            type: "tool-call",
                            toolCallId: null != (p = i.id) ? p : qu(),
                            toolName: i.function.name,
                            input: i.function.arguments,
                          }),
                          (i.hasFinished = !0)));
                      continue;
                    }
                    const i = l[t];
                    i.hasFinished ||
                      (null !=
                        (null == (g = e.function) ? void 0 : g.arguments) &&
                        (i.function.arguments +=
                          null !=
                          (v = null == (f = e.function) ? void 0 : f.arguments)
                            ? v
                            : ""),
                      n.enqueue({
                        type: "tool-input-delta",
                        id: i.id,
                        delta: null != (y = e.function.arguments) ? y : "",
                      }),
                      null != (null == (b = i.function) ? void 0 : b.name) &&
                        null !=
                          (null == (_ = i.function) ? void 0 : _.arguments) &&
                        Qu(i.function.arguments) &&
                        (n.enqueue({ type: "tool-input-end", id: i.id }),
                        n.enqueue({
                          type: "tool-call",
                          toolCallId: null != (w = i.id) ? w : qu(),
                          toolName: i.function.name,
                          input: i.function.arguments,
                        }),
                        (i.hasFinished = !0)));
                  }
              },
              flush(e) {
                var t, n, r, o, a, s;
                (m && e.enqueue({ type: "reasoning-end", id: "reasoning-0" }),
                  h && e.enqueue({ type: "text-end", id: "txt-0" }));
                for (const n of l.filter((e) => !e.hasFinished))
                  (e.enqueue({ type: "tool-input-end", id: n.id }),
                    e.enqueue({
                      type: "tool-call",
                      toolCallId: null != (t = n.id) ? t : qu(),
                      toolName: n.function.name,
                      input: n.function.arguments,
                    }));
                const d = {
                  [p]: {},
                  ...(null == i ? void 0 : i.buildMetadata()),
                };
                (null != c.completionTokensDetails.acceptedPredictionTokens &&
                  (d[p].acceptedPredictionTokens =
                    c.completionTokensDetails.acceptedPredictionTokens),
                  null != c.completionTokensDetails.rejectedPredictionTokens &&
                    (d[p].rejectedPredictionTokens =
                      c.completionTokensDetails.rejectedPredictionTokens),
                  e.enqueue({
                    type: "finish",
                    finishReason: u,
                    usage: {
                      inputTokens: null != (n = c.promptTokens) ? n : void 0,
                      outputTokens:
                        null != (r = c.completionTokens) ? r : void 0,
                      totalTokens: null != (o = c.totalTokens) ? o : void 0,
                      reasoningTokens:
                        null != (a = c.completionTokensDetails.reasoningTokens)
                          ? a
                          : void 0,
                      cachedInputTokens:
                        null != (s = c.promptTokensDetails.cachedTokens)
                          ? s
                          : void 0,
                    },
                    providerMetadata: d,
                  }));
              },
            }),
          ),
          request: { body: o },
          response: { headers: a },
        };
      }
    },
    Mg = ul({
      prompt_tokens: Zs().nullish(),
      completion_tokens: Zs().nullish(),
      total_tokens: Zs().nullish(),
      prompt_tokens_details: ul({ cached_tokens: Zs().nullish() }).nullish(),
      completion_tokens_details: ul({
        reasoning_tokens: Zs().nullish(),
        accepted_prediction_tokens: Zs().nullish(),
        rejected_prediction_tokens: Zs().nullish(),
      }).nullish(),
    }).nullish(),
    qg = ul({
      id: ys().nullish(),
      created: Zs().nullish(),
      model: ys().nullish(),
      choices: sl(
        ul({
          message: ul({
            role: Sl("assistant").nullish(),
            content: ys().nullish(),
            reasoning_content: ys().nullish(),
            tool_calls: sl(
              ul({
                id: ys().nullish(),
                function: ul({ name: ys(), arguments: ys() }),
              }),
            ).nullish(),
          }),
          finish_reason: ys().nullish(),
        }),
      ),
      usage: Mg,
    }),
    Zg = (e) =>
      pl([
        ul({
          id: ys().nullish(),
          created: Zs().nullish(),
          model: ys().nullish(),
          choices: sl(
            ul({
              delta: ul({
                role: $l(["assistant"]).nullish(),
                content: ys().nullish(),
                reasoning_content: ys().nullish(),
                tool_calls: sl(
                  ul({
                    index: Zs(),
                    id: ys().nullish(),
                    function: ul({
                      name: ys().nullish(),
                      arguments: ys().nullish(),
                    }),
                  }),
                ).nullish(),
              }).nullish(),
              finish_reason: ys().nullish(),
            }),
          ),
          usage: Mg,
        }),
        e,
      ]),
    Lg = ul({
      echo: Ws().optional(),
      logitBias: _l(ys(), Zs()).optional(),
      suffix: ys().optional(),
      user: ys().optional(),
    }),
    Fg = class {
      constructor(e, t) {
        var n;
        ((this.specificationVersion = "v2"),
          (this.modelId = e),
          (this.config = t));
        const r = null != (n = t.errorStructure) ? n : zg;
        ((this.chunkSchema = Hg(r.errorSchema)),
          (this.failedResponseHandler = lc(r)));
      }
      get provider() {
        return this.config.provider;
      }
      get providerOptionsName() {
        return this.config.provider.split(".")[0].trim();
      }
      get supportedUrls() {
        var e, t, n;
        return null !=
          (n =
            null == (t = (e = this.config).supportedUrls) ? void 0 : t.call(e))
          ? n
          : {};
      }
      async getArgs({
        prompt: e,
        maxOutputTokens: t,
        temperature: n,
        topP: r,
        topK: o,
        frequencyPenalty: i,
        presencePenalty: a,
        stopSequences: s,
        responseFormat: l,
        seed: u,
        providerOptions: c,
        tools: d,
        toolChoice: p,
      }) {
        var m;
        const h = [],
          g =
            null !=
            (m = await tc({
              provider: this.providerOptionsName,
              providerOptions: c,
              schema: Lg,
            }))
              ? m
              : {};
        (null != o && h.push({ type: "unsupported-setting", setting: "topK" }),
          (null == d ? void 0 : d.length) &&
            h.push({ type: "unsupported-setting", setting: "tools" }),
          null != p &&
            h.push({ type: "unsupported-setting", setting: "toolChoice" }),
          null != l &&
            "text" !== l.type &&
            h.push({
              type: "unsupported-setting",
              setting: "responseFormat",
              details: "JSON response format is not supported.",
            }));
        const { prompt: f, stopSequences: v } = (function ({
            prompt: e,
            user: t = "user",
            assistant: n = "assistant",
          }) {
            let r = "";
            "system" === e[0].role &&
              ((r += `${e[0].content}\n\n`), (e = e.slice(1)));
            for (const { role: o, content: i } of e)
              switch (o) {
                case "system":
                  throw new E({
                    message: "Unexpected system message in prompt: ${content}",
                    prompt: e,
                  });
                case "user":
                  r += `${t}:\n${i
                    .map((e) => {
                      if ("text" === e.type) return e.text;
                    })
                    .filter(Boolean)
                    .join("")}\n\n`;
                  break;
                case "assistant":
                  r += `${n}:\n${i
                    .map((e) => {
                      switch (e.type) {
                        case "text":
                          return e.text;
                        case "tool-call":
                          throw new fe({ functionality: "tool-call messages" });
                      }
                    })
                    .join("")}\n\n`;
                  break;
                case "tool":
                  throw new fe({ functionality: "tool messages" });
                default:
                  throw new Error(`Unsupported role: ${o}`);
              }
            return (
              (r += `${n}:\n`),
              { prompt: r, stopSequences: [`\n${t}:`] }
            );
          })({ prompt: e }),
          y = [...(null != v ? v : []), ...(null != s ? s : [])];
        return {
          args: {
            model: this.modelId,
            echo: g.echo,
            logit_bias: g.logitBias,
            suffix: g.suffix,
            user: g.user,
            max_tokens: t,
            temperature: n,
            top_p: r,
            frequency_penalty: i,
            presence_penalty: a,
            seed: u,
            ...(null == c ? void 0 : c[this.providerOptionsName]),
            prompt: f,
            stop: y.length > 0 ? y : void 0,
          },
          warnings: h,
        };
      }
      async doGenerate(e) {
        var t, n, r, o, i, a;
        const { args: s, warnings: l } = await this.getArgs(e),
          {
            responseHeaders: u,
            value: c,
            rawValue: d,
          } = await rc({
            url: this.config.url({
              path: "/completions",
              modelId: this.modelId,
            }),
            headers: Ru(this.config.headers(), e.headers),
            body: s,
            failedResponseHandler: this.failedResponseHandler,
            successfulResponseHandler: cc(Wg),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          }),
          p = c.choices[0],
          m = [];
        return (
          null != p.text &&
            p.text.length > 0 &&
            m.push({ type: "text", text: p.text }),
          {
            content: m,
            usage: {
              inputTokens:
                null != (n = null == (t = c.usage) ? void 0 : t.prompt_tokens)
                  ? n
                  : void 0,
              outputTokens:
                null !=
                (o = null == (r = c.usage) ? void 0 : r.completion_tokens)
                  ? o
                  : void 0,
              totalTokens:
                null != (a = null == (i = c.usage) ? void 0 : i.total_tokens)
                  ? a
                  : void 0,
            },
            finishReason: Dg(p.finish_reason),
            request: { body: s },
            response: { ...Pg(c), headers: u, body: d },
            warnings: l,
          }
        );
      }
      async doStream(e) {
        const { args: t, warnings: n } = await this.getArgs(e),
          r = {
            ...t,
            stream: !0,
            stream_options: this.config.includeUsage
              ? { include_usage: !0 }
              : void 0,
          },
          { responseHeaders: o, value: i } = await rc({
            url: this.config.url({
              path: "/completions",
              modelId: this.modelId,
            }),
            headers: Ru(this.config.headers(), e.headers),
            body: r,
            failedResponseHandler: this.failedResponseHandler,
            successfulResponseHandler: uc(this.chunkSchema),
            abortSignal: e.abortSignal,
            fetch: this.config.fetch,
          });
        let a = "unknown";
        const s = {
          inputTokens: void 0,
          outputTokens: void 0,
          totalTokens: void 0,
        };
        let l = !0;
        return {
          stream: i.pipeThrough(
            new TransformStream({
              start(e) {
                e.enqueue({ type: "stream-start", warnings: n });
              },
              transform(t, n) {
                var r, o, i;
                if (
                  (e.includeRawChunks &&
                    n.enqueue({ type: "raw", rawValue: t.rawValue }),
                  !t.success)
                )
                  return (
                    (a = "error"),
                    void n.enqueue({ type: "error", error: t.error })
                  );
                const u = t.value;
                if ("error" in u)
                  return (
                    (a = "error"),
                    void n.enqueue({ type: "error", error: u.error })
                  );
                (l &&
                  ((l = !1),
                  n.enqueue({ type: "response-metadata", ...Pg(u) }),
                  n.enqueue({ type: "text-start", id: "0" })),
                  null != u.usage &&
                    ((s.inputTokens =
                      null != (r = u.usage.prompt_tokens) ? r : void 0),
                    (s.outputTokens =
                      null != (o = u.usage.completion_tokens) ? o : void 0),
                    (s.totalTokens =
                      null != (i = u.usage.total_tokens) ? i : void 0)));
                const c = u.choices[0];
                (null != (null == c ? void 0 : c.finish_reason) &&
                  (a = Dg(c.finish_reason)),
                  null != (null == c ? void 0 : c.text) &&
                    n.enqueue({ type: "text-delta", id: "0", delta: c.text }));
              },
              flush(e) {
                (l || e.enqueue({ type: "text-end", id: "0" }),
                  e.enqueue({ type: "finish", finishReason: a, usage: s }));
              },
            }),
          ),
          request: { body: r },
          response: { headers: o },
        };
      }
    },
    Bg = ul({
      prompt_tokens: Zs(),
      completion_tokens: Zs(),
      total_tokens: Zs(),
    }),
    Wg = ul({
      id: ys().nullish(),
      created: Zs().nullish(),
      model: ys().nullish(),
      choices: sl(ul({ text: ys(), finish_reason: ys() })),
      usage: Bg.nullish(),
    }),
    Hg = (e) =>
      pl([
        ul({
          id: ys().nullish(),
          created: Zs().nullish(),
          model: ys().nullish(),
          choices: sl(
            ul({ text: ys(), finish_reason: ys().nullish(), index: Zs() }),
          ),
          usage: Bg.nullish(),
        }),
        e,
      ]),
    Vg = ul({ dimensions: Zs().optional(), user: ys().optional() }),
    Jg = class {
      constructor(e, t) {
        ((this.specificationVersion = "v2"),
          (this.modelId = e),
          (this.config = t));
      }
      get provider() {
        return this.config.provider;
      }
      get maxEmbeddingsPerCall() {
        var e;
        return null != (e = this.config.maxEmbeddingsPerCall) ? e : 2048;
      }
      get supportsParallelCalls() {
        var e;
        return null == (e = this.config.supportsParallelCalls) || e;
      }
      get providerOptionsName() {
        return this.config.provider.split(".")[0].trim();
      }
      async doEmbed({
        values: e,
        headers: t,
        abortSignal: n,
        providerOptions: r,
      }) {
        var o, i, a;
        const s = Object.assign(
          null !=
            (o = await tc({
              provider: "openai-compatible",
              providerOptions: r,
              schema: Vg,
            }))
            ? o
            : {},
          null !=
            (i = await tc({
              provider: this.providerOptionsName,
              providerOptions: r,
              schema: Vg,
            }))
            ? i
            : {},
        );
        if (e.length > this.maxEmbeddingsPerCall)
          throw new ae({
            provider: this.provider,
            modelId: this.modelId,
            maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
            values: e,
          });
        const {
          responseHeaders: l,
          value: u,
          rawValue: c,
        } = await rc({
          url: this.config.url({ path: "/embeddings", modelId: this.modelId }),
          headers: Ru(this.config.headers(), t),
          body: {
            model: this.modelId,
            input: e,
            encoding_format: "float",
            dimensions: s.dimensions,
            user: s.user,
          },
          failedResponseHandler: lc(
            null != (a = this.config.errorStructure) ? a : zg,
          ),
          successfulResponseHandler: cc(Kg),
          abortSignal: n,
          fetch: this.config.fetch,
        });
        return {
          embeddings: u.data.map((e) => e.embedding),
          usage: u.usage ? { tokens: u.usage.prompt_tokens } : void 0,
          providerMetadata: u.providerMetadata,
          response: { headers: l, body: c },
        };
      }
    },
    Kg = ul({
      data: sl(ul({ embedding: sl(Zs()) })),
      usage: ul({ prompt_tokens: Zs() }).nullish(),
      providerMetadata: _l(ys(), _l(ys(), Qs())).optional(),
    }),
    Gg = class {
      constructor(e, t) {
        ((this.modelId = e),
          (this.config = t),
          (this.specificationVersion = "v2"),
          (this.maxImagesPerCall = 10));
      }
      get provider() {
        return this.config.provider;
      }
      async doGenerate({
        prompt: e,
        n: t,
        size: n,
        aspectRatio: r,
        seed: o,
        providerOptions: i,
        headers: a,
        abortSignal: s,
      }) {
        var l, u, c, d, p;
        const m = [];
        (null != r &&
          m.push({
            type: "unsupported-setting",
            setting: "aspectRatio",
            details:
              "This model does not support aspect ratio. Use `size` instead.",
          }),
          null != o &&
            m.push({ type: "unsupported-setting", setting: "seed" }));
        const h =
            null !=
            (c =
              null ==
              (u = null == (l = this.config._internal) ? void 0 : l.currentDate)
                ? void 0
                : u.call(l))
              ? c
              : new Date(),
          { value: g, responseHeaders: f } = await rc({
            url: this.config.url({
              path: "/images/generations",
              modelId: this.modelId,
            }),
            headers: Ru(this.config.headers(), a),
            body: {
              model: this.modelId,
              prompt: e,
              n: t,
              size: n,
              ...(null != (d = i.openai) ? d : {}),
              response_format: "b64_json",
            },
            failedResponseHandler: lc(
              null != (p = this.config.errorStructure) ? p : zg,
            ),
            successfulResponseHandler: cc(Xg),
            abortSignal: s,
            fetch: this.config.fetch,
          });
        return {
          images: g.data.map((e) => e.b64_json),
          warnings: m,
          response: { timestamp: h, modelId: this.modelId, headers: f },
        };
      }
    },
    Xg = ul({ data: sl(ul({ b64_json: ys() })) });
  function Yg(e) {
    const t = bc(e.baseURL),
      n = e.name,
      r = () => ({
        ...(e.apiKey && { Authorization: `Bearer ${e.apiKey}` }),
        ...e.headers,
      }),
      o = (o) => ({
        provider: `${n}.${o}`,
        url: ({ path: n }) => {
          const r = new URL(`${t}${n}`);
          return (
            e.queryParams &&
              (r.search = new URLSearchParams(e.queryParams).toString()),
            r.toString()
          );
        },
        headers: r,
        fetch: e.fetch,
      }),
      i = (e) => a(e),
      a = (t) => new Rg(t, { ...o("chat"), includeUsage: e.includeUsage }),
      s = (e) => i(e);
    return (
      (s.languageModel = i),
      (s.chatModel = a),
      (s.completionModel = (t) =>
        new Fg(t, { ...o("completion"), includeUsage: e.includeUsage })),
      (s.textEmbeddingModel = (e) => new Jg(e, { ...o("embedding") })),
      (s.imageModel = (e) => new Gg(e, o("image"))),
      s
    );
  }
  var Qg,
    ef,
    tf = {},
    nf = {},
    rf = {};
  function of() {
    if (ef) return rf;
    ef = 1;
    var e =
        /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
      t = new RegExp(
        "[\\-\\.0-9" +
          e.source.slice(1, -1) +
          "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]",
      ),
      n = new RegExp(
        "^" + e.source + t.source + "*(?::" + e.source + t.source + "*)?$",
      );
    function r(e, t) {
      ((this.message = e),
        (this.locator = t),
        Error.captureStackTrace && Error.captureStackTrace(this, r));
    }
    function o() {}
    function i(e, t) {
      return (
        (t.lineNumber = e.lineNumber),
        (t.columnNumber = e.columnNumber),
        t
      );
    }
    function a(e, t, n, r, o, i) {
      function a(e, t, r) {
        (e in n.attributeNames && i.fatalError("Attribute " + e + " redefined"),
          n.addValue(e, t, r));
      }
      for (var s, l = ++t, u = 0; ; ) {
        var c = e.charAt(l);
        switch (c) {
          case "=":
            if (1 === u) ((s = e.slice(t, l)), (u = 3));
            else {
              if (2 !== u)
                throw new Error("attribute equal must after attrName");
              u = 3;
            }
            break;
          case "'":
          case '"':
            if (3 === u || 1 === u) {
              if (
                (1 === u &&
                  (i.warning('attribute value must after "="'),
                  (s = e.slice(t, l))),
                (t = l + 1),
                !((l = e.indexOf(c, t)) > 0))
              )
                throw new Error("attribute value no end '" + c + "' match");
              (a(s, (d = e.slice(t, l).replace(/&#?\w+;/g, o)), t - 1),
                (u = 5));
            } else {
              if (4 != u) throw new Error('attribute value must after "="');
              (a(s, (d = e.slice(t, l).replace(/&#?\w+;/g, o)), t),
                i.warning(
                  'attribute "' + s + '" missed start quot(' + c + ")!!",
                ),
                (t = l + 1),
                (u = 5));
            }
            break;
          case "/":
            switch (u) {
              case 0:
                n.setTagName(e.slice(t, l));
              case 5:
              case 6:
              case 7:
                ((u = 7), (n.closed = !0));
              case 4:
              case 1:
              case 2:
                break;
              default:
                throw new Error("attribute invalid close char('/')");
            }
            break;
          case "":
            return (
              i.error("unexpected end of input"),
              0 == u && n.setTagName(e.slice(t, l)),
              l
            );
          case ">":
            switch (u) {
              case 0:
                n.setTagName(e.slice(t, l));
              case 5:
              case 6:
              case 7:
                break;
              case 4:
              case 1:
                "/" === (d = e.slice(t, l)).slice(-1) &&
                  ((n.closed = !0), (d = d.slice(0, -1)));
              case 2:
                (2 === u && (d = s),
                  4 == u
                    ? (i.warning('attribute "' + d + '" missed quot(")!'),
                      a(s, d.replace(/&#?\w+;/g, o), t))
                    : (("http://www.w3.org/1999/xhtml" === r[""] &&
                        d.match(/^(?:disabled|checked|selected)$/i)) ||
                        i.warning(
                          'attribute "' +
                            d +
                            '" missed value!! "' +
                            d +
                            '" instead!!',
                        ),
                      a(d, d, t)));
                break;
              case 3:
                throw new Error("attribute value missed!!");
            }
            return l;
          case "":
            c = " ";
          default:
            if (c <= " ")
              switch (u) {
                case 0:
                  (n.setTagName(e.slice(t, l)), (u = 6));
                  break;
                case 1:
                  ((s = e.slice(t, l)), (u = 2));
                  break;
                case 4:
                  var d = e.slice(t, l).replace(/&#?\w+;/g, o);
                  (i.warning('attribute "' + d + '" missed quot(")!!'),
                    a(s, d, t));
                case 5:
                  u = 6;
              }
            else
              switch (u) {
                case 2:
                  (n.tagName,
                    ("http://www.w3.org/1999/xhtml" === r[""] &&
                      s.match(/^(?:disabled|checked|selected)$/i)) ||
                      i.warning(
                        'attribute "' +
                          s +
                          '" missed value!! "' +
                          s +
                          '" instead2!!',
                      ),
                    a(s, s, t),
                    (t = l),
                    (u = 1));
                  break;
                case 5:
                  i.warning('attribute space is required"' + s + '"!!');
                case 6:
                  ((u = 1), (t = l));
                  break;
                case 3:
                  ((u = 4), (t = l));
                  break;
                case 7:
                  throw new Error(
                    "elements closed character '/' and '>' must be connected to",
                  );
              }
        }
        l++;
      }
    }
    function s(e, t, n) {
      for (var r = e.tagName, o = null, i = e.length; i--; ) {
        var a = e[i],
          s = a.qName,
          l = a.value;
        if ((m = s.indexOf(":")) > 0)
          var u = (a.prefix = s.slice(0, m)),
            d = s.slice(m + 1),
            p = "xmlns" === u && d;
        else ((d = s), (u = null), (p = "xmlns" === s && ""));
        ((a.localName = d),
          !1 !== p &&
            (null == o && ((o = {}), c(n, (n = {}))),
            (n[p] = o[p] = l),
            (a.uri = "http://www.w3.org/2000/xmlns/"),
            t.startPrefixMapping(p, l)));
      }
      for (i = e.length; i--; )
        (u = (a = e[i]).prefix) &&
          ("xml" === u && (a.uri = "http://www.w3.org/XML/1998/namespace"),
          "xmlns" !== u && (a.uri = n[u || ""]));
      var m;
      (m = r.indexOf(":")) > 0
        ? ((u = e.prefix = r.slice(0, m)), (d = e.localName = r.slice(m + 1)))
        : ((u = null), (d = e.localName = r));
      var h = (e.uri = n[u || ""]);
      if ((t.startElement(h, d, r, e), !e.closed))
        return ((e.currentNSMap = n), (e.localNSMap = o), !0);
      if ((t.endElement(h, d, r), o)) for (u in o) t.endPrefixMapping(u);
    }
    function l(e, t, n, r, o) {
      if (/^(?:script|textarea)$/i.test(n)) {
        var i = e.indexOf("</" + n + ">", t),
          a = e.substring(t + 1, i);
        if (/[&<]/.test(a))
          return /^script$/i.test(n)
            ? (o.characters(a, 0, a.length), i)
            : ((a = a.replace(/&#?\w+;/g, r)), o.characters(a, 0, a.length), i);
      }
      return t + 1;
    }
    function u(e, t, n, r) {
      var o = r[n];
      return (
        null == o &&
          ((o = e.lastIndexOf("</" + n + ">")) < t &&
            (o = e.lastIndexOf("</" + n)),
          (r[n] = o)),
        o < t
      );
    }
    function c(e, t) {
      for (var n in e) t[n] = e[n];
    }
    function d(e, t, n, r) {
      if ("-" === e.charAt(t + 2))
        return "-" === e.charAt(t + 3)
          ? (o = e.indexOf("--\x3e", t + 4)) > t
            ? (n.comment(e, t + 4, o - t - 4), o + 3)
            : (r.error("Unclosed comment"), -1)
          : -1;
      if ("CDATA[" == e.substr(t + 3, 6)) {
        var o = e.indexOf("]]>", t + 9);
        return (
          n.startCDATA(),
          n.characters(e, t + 9, o - t - 9),
          n.endCDATA(),
          o + 3
        );
      }
      var i = (function (e, t) {
          var n,
            r = [],
            o = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
          for (o.lastIndex = t, o.exec(e); (n = o.exec(e)); )
            if ((r.push(n), n[1])) return r;
        })(e, t),
        a = i.length;
      if (a > 1 && /!doctype/i.test(i[0][0])) {
        var s = i[1][0],
          l = !1,
          u = !1;
        a > 3 &&
          (/^public$/i.test(i[2][0])
            ? ((l = i[3][0]), (u = a > 4 && i[4][0]))
            : /^system$/i.test(i[2][0]) && (u = i[3][0]));
        var c = i[a - 1];
        return (n.startDTD(s, l, u), n.endDTD(), c.index + c[0].length);
      }
      return -1;
    }
    function p(e, t, n) {
      var r = e.indexOf("?>", t);
      if (r) {
        var o = e.substring(t, r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
        return o
          ? (o[0].length, n.processingInstruction(o[1], o[2]), r + 2)
          : -1;
      }
      return -1;
    }
    function m() {
      this.attributeNames = {};
    }
    return (
      (r.prototype = new Error()),
      (r.prototype.name = r.name),
      (o.prototype = {
        parse: function (e, t, n) {
          var o = this.domBuilder;
          (o.startDocument(),
            c(t, (t = {})),
            (function (e, t, n, o, c) {
              function h(e) {
                var t = e.slice(1, -1);
                return t in n
                  ? n[t]
                  : "#" === t.charAt(0)
                    ? (function (e) {
                        if (e > 65535) {
                          var t = 55296 + ((e -= 65536) >> 10),
                            n = 56320 + (1023 & e);
                          return String.fromCharCode(t, n);
                        }
                        return String.fromCharCode(e);
                      })(parseInt(t.substr(1).replace("x", "0x")))
                    : (c.error("entity not found:" + e), e);
              }
              function g(t) {
                if (t > x) {
                  var n = e.substring(x, t).replace(/&#?\w+;/g, h);
                  (_ && f(x), o.characters(n, 0, t - x), (x = t));
                }
              }
              function f(t, n) {
                for (; t >= y && (n = b.exec(e)); )
                  ((v = n.index), (y = v + n[0].length), _.lineNumber++);
                _.columnNumber = t - v + 1;
              }
              for (
                var v = 0,
                  y = 0,
                  b = /.*(?:\r\n?|\n)|.*$/g,
                  _ = o.locator,
                  w = [{ currentNSMap: t }],
                  k = {},
                  x = 0;
                ;

              ) {
                try {
                  var $ = e.indexOf("<", x);
                  if ($ < 0) {
                    if (!e.substr(x).match(/^\s*$/)) {
                      var I = o.doc,
                        S = I.createTextNode(e.substr(x));
                      (I.appendChild(S), (o.currentElement = S));
                    }
                    return;
                  }
                  switch (($ > x && g($), e.charAt($ + 1))) {
                    case "/":
                      var T = e.indexOf(">", $ + 3),
                        N = e.substring($ + 2, T),
                        O = w.pop();
                      T < 0
                        ? ((N = e.substring($ + 2).replace(/[\s<].*/, "")),
                          c.error(
                            "end tag name: " +
                              N +
                              " is not complete:" +
                              O.tagName,
                          ),
                          (T = $ + 1 + N.length))
                        : N.match(/\s</) &&
                          ((N = N.replace(/[\s<].*/, "")),
                          c.error("end tag name: " + N + " maybe not complete"),
                          (T = $ + 1 + N.length));
                      var E = O.localNSMap,
                        A = O.tagName == N;
                      if (
                        A ||
                        (O.tagName &&
                          O.tagName.toLowerCase() == N.toLowerCase())
                      ) {
                        if ((o.endElement(O.uri, O.localName, N), E))
                          for (var U in E) o.endPrefixMapping(U);
                        A ||
                          c.fatalError(
                            "end tag name: " +
                              N +
                              " is not match the current start tagName:" +
                              O.tagName,
                          );
                      } else w.push(O);
                      T++;
                      break;
                    case "?":
                      (_ && f($), (T = p(e, $, o)));
                      break;
                    case "!":
                      (_ && f($), (T = d(e, $, o, c)));
                      break;
                    default:
                      _ && f($);
                      var C = new m(),
                        P = w[w.length - 1].currentNSMap,
                        D = ((T = a(e, $, C, P, h, c)), C.length);
                      if (
                        (!C.closed &&
                          u(e, T, C.tagName, k) &&
                          ((C.closed = !0),
                          n.nbsp || c.warning("unclosed xml attribute")),
                        _ && D)
                      ) {
                        for (var j = i(_, {}), z = 0; z < D; z++) {
                          var R = C[z];
                          (f(R.offset), (R.locator = i(_, {})));
                        }
                        ((o.locator = j),
                          s(C, o, P) && w.push(C),
                          (o.locator = _));
                      } else s(C, o, P) && w.push(C);
                      "http://www.w3.org/1999/xhtml" !== C.uri || C.closed
                        ? T++
                        : (T = l(e, T, C.tagName, h, o));
                  }
                } catch (e) {
                  if (e instanceof r) throw e;
                  (c.error("element parse error: " + e), (T = -1));
                }
                T > x ? (x = T) : g(Math.max($, x) + 1);
              }
            })(e, t, n, o, this.errorHandler),
            o.endDocument());
        },
      }),
      (m.prototype = {
        setTagName: function (e) {
          if (!n.test(e)) throw new Error("invalid tagName:" + e);
          this.tagName = e;
        },
        addValue: function (e, t, r) {
          if (!n.test(e)) throw new Error("invalid attribute:" + e);
          ((this.attributeNames[e] = this.length),
            (this[this.length++] = { qName: e, value: t, offset: r }));
        },
        length: 0,
        getLocalName: function (e) {
          return this[e].localName;
        },
        getLocator: function (e) {
          return this[e].locator;
        },
        getQName: function (e) {
          return this[e].qName;
        },
        getURI: function (e) {
          return this[e].uri;
        },
        getValue: function (e) {
          return this[e].value;
        },
      }),
      (rf.XMLReader = o),
      (rf.ParseError = r),
      rf
    );
  }
  var af,
    sf,
    lf = {};
  function uf() {
    if (af) return lf;
    function e(e, t) {
      for (var n in e) t[n] = e[n];
    }
    function t(t, n) {
      var r = t.prototype;
      if (!(r instanceof n)) {
        function o() {}
        ((o.prototype = n.prototype),
          e(r, (o = new o())),
          (t.prototype = r = o));
      }
      r.constructor != t &&
        ("function" != typeof t && console.error("unknow Class:" + t),
        (r.constructor = t));
    }
    af = 1;
    var n = {},
      r = (n.ELEMENT_NODE = 1),
      o = (n.ATTRIBUTE_NODE = 2),
      i = (n.TEXT_NODE = 3),
      a = (n.CDATA_SECTION_NODE = 4),
      s = (n.ENTITY_REFERENCE_NODE = 5),
      l = (n.ENTITY_NODE = 6),
      u = (n.PROCESSING_INSTRUCTION_NODE = 7),
      c = (n.COMMENT_NODE = 8),
      d = (n.DOCUMENT_NODE = 9),
      p = (n.DOCUMENT_TYPE_NODE = 10),
      m = (n.DOCUMENT_FRAGMENT_NODE = 11),
      h = (n.NOTATION_NODE = 12),
      g = {},
      f = {};
    ((g.INDEX_SIZE_ERR = ((f[1] = "Index size error"), 1)),
      (g.DOMSTRING_SIZE_ERR = ((f[2] = "DOMString size error"), 2)));
    var v = (g.HIERARCHY_REQUEST_ERR = ((f[3] = "Hierarchy request error"), 3));
    ((g.WRONG_DOCUMENT_ERR = ((f[4] = "Wrong document"), 4)),
      (g.INVALID_CHARACTER_ERR = ((f[5] = "Invalid character"), 5)),
      (g.NO_DATA_ALLOWED_ERR = ((f[6] = "No data allowed"), 6)),
      (g.NO_MODIFICATION_ALLOWED_ERR =
        ((f[7] = "No modification allowed"), 7)));
    var y = (g.NOT_FOUND_ERR = ((f[8] = "Not found"), 8));
    g.NOT_SUPPORTED_ERR = ((f[9] = "Not supported"), 9);
    var b = (g.INUSE_ATTRIBUTE_ERR = ((f[10] = "Attribute in use"), 10));
    function _(e, t) {
      if (t instanceof Error) var n = t;
      else
        ((n = this),
          Error.call(this, f[e]),
          (this.message = f[e]),
          Error.captureStackTrace && Error.captureStackTrace(this, _));
      return ((n.code = e), t && (this.message = this.message + ": " + t), n);
    }
    function w() {}
    function k(e, t) {
      ((this._node = e), (this._refresh = t), x(this));
    }
    function x(t) {
      var n = t._node._inc || t._node.ownerDocument._inc;
      if (t._inc != n) {
        var r = t._refresh(t._node);
        (te(t, "length", r.length), e(r, t), (t._inc = n));
      }
    }
    function $() {}
    function I(e, t) {
      for (var n = e.length; n--; ) if (e[n] === t) return n;
    }
    function S(e, t, n, r) {
      if ((r ? (t[I(t, r)] = n) : (t[t.length++] = n), e)) {
        n.ownerElement = e;
        var o = e.ownerDocument;
        o &&
          (r && C(o, e, r),
          (function (e, t, n) {
            (e && e._inc++,
              "http://www.w3.org/2000/xmlns/" == n.namespaceURI &&
                (t._nsMap[n.prefix ? n.localName : ""] = n.value));
          })(o, e, n));
      }
    }
    function T(e, t, n) {
      var r = I(t, n);
      if (!(r >= 0)) throw _(y, new Error(e.tagName + "@" + n));
      for (var o = t.length - 1; r < o; ) t[r] = t[++r];
      if (((t.length = o), e)) {
        var i = e.ownerDocument;
        i && (C(i, e, n), (n.ownerElement = null));
      }
    }
    function N(e) {
      if (((this._features = {}), e)) for (var t in e) this._features = e[t];
    }
    function O() {}
    function E(e) {
      return (
        ("<" == e ? "&lt;" : ">" == e && "&gt;") ||
        ("&" == e && "&amp;") ||
        ('"' == e && "&quot;") ||
        "&#" + e.charCodeAt() + ";"
      );
    }
    function A(e, t) {
      if (t(e)) return !0;
      if ((e = e.firstChild))
        do {
          if (A(e, t)) return !0;
        } while ((e = e.nextSibling));
    }
    function U() {}
    function C(e, t, n, r) {
      (e && e._inc++,
        "http://www.w3.org/2000/xmlns/" == n.namespaceURI &&
          delete t._nsMap[n.prefix ? n.localName : ""]);
    }
    function P(e, t, n) {
      if (e && e._inc) {
        e._inc++;
        var r = t.childNodes;
        if (n) r[r.length++] = n;
        else {
          for (var o = t.firstChild, i = 0; o; )
            ((r[i++] = o), (o = o.nextSibling));
          r.length = i;
        }
      }
    }
    function D(e, t) {
      var n = t.previousSibling,
        r = t.nextSibling;
      return (
        n ? (n.nextSibling = r) : (e.firstChild = r),
        r ? (r.previousSibling = n) : (e.lastChild = n),
        P(e.ownerDocument, e),
        t
      );
    }
    function j(e, t, n) {
      var r = t.parentNode;
      if ((r && r.removeChild(t), t.nodeType === m)) {
        var o = t.firstChild;
        if (null == o) return t;
        var i = t.lastChild;
      } else o = i = t;
      var a = n ? n.previousSibling : e.lastChild;
      ((o.previousSibling = a),
        (i.nextSibling = n),
        a ? (a.nextSibling = o) : (e.firstChild = o),
        null == n ? (e.lastChild = i) : (n.previousSibling = i));
      do {
        o.parentNode = e;
      } while (o !== i && (o = o.nextSibling));
      return (
        P(e.ownerDocument || e, e),
        t.nodeType == m && (t.firstChild = t.lastChild = null),
        t
      );
    }
    function z() {
      this._nsMap = {};
    }
    function R() {}
    function M() {}
    function q() {}
    function Z() {}
    function L() {}
    function F() {}
    function B() {}
    function W() {}
    function H() {}
    function V() {}
    function J() {}
    function K() {}
    function G(e, t) {
      var n = [],
        r = (9 == this.nodeType && this.documentElement) || this,
        o = r.prefix,
        i = r.namespaceURI;
      if (i && null == o && null == (o = r.lookupPrefix(i)))
        var a = [{ namespace: i, prefix: null }];
      return (Y(this, n, e, t, a), n.join(""));
    }
    function X(e, t, n) {
      var r = e.prefix || "",
        o = e.namespaceURI;
      if (!r && !o) return !1;
      if (
        ("xml" === r && "http://www.w3.org/XML/1998/namespace" === o) ||
        "http://www.w3.org/2000/xmlns/" == o
      )
        return !1;
      for (var i = n.length; i--; ) {
        var a = n[i];
        if (a.prefix == r) return a.namespace != o;
      }
      return !0;
    }
    function Y(e, t, n, l, h) {
      if (l) {
        if (!(e = l(e))) return;
        if ("string" == typeof e) return void t.push(e);
      }
      switch (e.nodeType) {
        case r:
          (h || (h = []), h.length);
          var g = e.attributes,
            f = g.length,
            v = e.firstChild,
            y = e.tagName;
          ((n = "http://www.w3.org/1999/xhtml" === e.namespaceURI || n),
            t.push("<", y));
          for (var b = 0; b < f; b++)
            "xmlns" == (_ = g.item(b)).prefix
              ? h.push({ prefix: _.localName, namespace: _.value })
              : "xmlns" == _.nodeName &&
                h.push({ prefix: "", namespace: _.value });
          for (b = 0; b < f; b++) {
            var _;
            if (X((_ = g.item(b)), 0, h)) {
              var w = _.prefix || "",
                k = _.namespaceURI,
                x = w ? " xmlns:" + w : " xmlns";
              (t.push(x, '="', k, '"'), h.push({ prefix: w, namespace: k }));
            }
            Y(_, t, n, l, h);
          }
          if (
            (X(e, 0, h) &&
              ((w = e.prefix || ""),
              (k = e.namespaceURI) &&
                ((x = w ? " xmlns:" + w : " xmlns"),
                t.push(x, '="', k, '"'),
                h.push({ prefix: w, namespace: k }))),
            v || (n && !/^(?:meta|link|img|br|hr|input)$/i.test(y)))
          ) {
            if ((t.push(">"), n && /^script$/i.test(y)))
              for (; v; )
                (v.data ? t.push(v.data) : Y(v, t, n, l, h),
                  (v = v.nextSibling));
            else for (; v; ) (Y(v, t, n, l, h), (v = v.nextSibling));
            t.push("</", y, ">");
          } else t.push("/>");
          return;
        case d:
        case m:
          for (v = e.firstChild; v; ) (Y(v, t, n, l, h), (v = v.nextSibling));
          return;
        case o:
          return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, E), '"');
        case i:
          return t.push(e.data.replace(/[<&]/g, E).replace(/]]>/g, "]]&gt;"));
        case a:
          return t.push("<![CDATA[", e.data, "]]>");
        case c:
          return t.push("\x3c!--", e.data, "--\x3e");
        case p:
          var $ = e.publicId,
            I = e.systemId;
          if ((t.push("<!DOCTYPE ", e.name), $))
            (t.push(" PUBLIC ", $),
              I && "." != I && t.push(" ", I),
              t.push(">"));
          else if (I && "." != I) t.push(" SYSTEM ", I, ">");
          else {
            var S = e.internalSubset;
            (S && t.push(" [", S, "]"), t.push(">"));
          }
          return;
        case u:
          return t.push("<?", e.target, " ", e.data, "?>");
        case s:
          return t.push("&", e.nodeName, ";");
        default:
          t.push("??", e.nodeName);
      }
    }
    function Q(e, t, n) {
      var i;
      switch (t.nodeType) {
        case r:
          (i = t.cloneNode(!1)).ownerDocument = e;
        case m:
          break;
        case o:
          n = !0;
      }
      if (
        (i || (i = t.cloneNode(!1)),
        (i.ownerDocument = e),
        (i.parentNode = null),
        n)
      )
        for (var a = t.firstChild; a; )
          (i.appendChild(Q(e, a, n)), (a = a.nextSibling));
      return i;
    }
    function ee(e, t, n) {
      var i = new t.constructor();
      for (var a in t) {
        var s = t[a];
        "object" != typeof s && s != i[a] && (i[a] = s);
      }
      switch (
        (t.childNodes && (i.childNodes = new w()),
        (i.ownerDocument = e),
        i.nodeType)
      ) {
        case r:
          var l = t.attributes,
            u = (i.attributes = new $()),
            c = l.length;
          u._ownerElement = i;
          for (var d = 0; d < c; d++) i.setAttributeNode(ee(e, l.item(d), !0));
          break;
        case o:
          n = !0;
      }
      if (n)
        for (var p = t.firstChild; p; )
          (i.appendChild(ee(e, p, n)), (p = p.nextSibling));
      return i;
    }
    function te(e, t, n) {
      e[t] = n;
    }
    ((g.INVALID_STATE_ERR = ((f[11] = "Invalid state"), 11)),
      (g.SYNTAX_ERR = ((f[12] = "Syntax error"), 12)),
      (g.INVALID_MODIFICATION_ERR = ((f[13] = "Invalid modification"), 13)),
      (g.NAMESPACE_ERR = ((f[14] = "Invalid namespace"), 14)),
      (g.INVALID_ACCESS_ERR = ((f[15] = "Invalid access"), 15)),
      (_.prototype = Error.prototype),
      e(g, _),
      (w.prototype = {
        length: 0,
        item: function (e) {
          return this[e] || null;
        },
        toString: function (e, t) {
          for (var n = [], r = 0; r < this.length; r++) Y(this[r], n, e, t);
          return n.join("");
        },
      }),
      (k.prototype.item = function (e) {
        return (x(this), this[e]);
      }),
      t(k, w),
      ($.prototype = {
        length: 0,
        item: w.prototype.item,
        getNamedItem: function (e) {
          for (var t = this.length; t--; ) {
            var n = this[t];
            if (n.nodeName == e) return n;
          }
        },
        setNamedItem: function (e) {
          var t = e.ownerElement;
          if (t && t != this._ownerElement) throw new _(b);
          var n = this.getNamedItem(e.nodeName);
          return (S(this._ownerElement, this, e, n), n);
        },
        setNamedItemNS: function (e) {
          var t,
            n = e.ownerElement;
          if (n && n != this._ownerElement) throw new _(b);
          return (
            (t = this.getNamedItemNS(e.namespaceURI, e.localName)),
            S(this._ownerElement, this, e, t),
            t
          );
        },
        removeNamedItem: function (e) {
          var t = this.getNamedItem(e);
          return (T(this._ownerElement, this, t), t);
        },
        removeNamedItemNS: function (e, t) {
          var n = this.getNamedItemNS(e, t);
          return (T(this._ownerElement, this, n), n);
        },
        getNamedItemNS: function (e, t) {
          for (var n = this.length; n--; ) {
            var r = this[n];
            if (r.localName == t && r.namespaceURI == e) return r;
          }
          return null;
        },
      }),
      (N.prototype = {
        hasFeature: function (e, t) {
          var n = this._features[e.toLowerCase()];
          return !(!n || (t && !(t in n)));
        },
        createDocument: function (e, t, n) {
          var r = new U();
          if (
            ((r.implementation = this),
            (r.childNodes = new w()),
            (r.doctype = n),
            n && r.appendChild(n),
            t)
          ) {
            var o = r.createElementNS(e, t);
            r.appendChild(o);
          }
          return r;
        },
        createDocumentType: function (e, t, n) {
          var r = new F();
          return (
            (r.name = e),
            (r.nodeName = e),
            (r.publicId = t),
            (r.systemId = n),
            r
          );
        },
      }),
      (O.prototype = {
        firstChild: null,
        lastChild: null,
        previousSibling: null,
        nextSibling: null,
        attributes: null,
        parentNode: null,
        childNodes: null,
        ownerDocument: null,
        nodeValue: null,
        namespaceURI: null,
        prefix: null,
        localName: null,
        insertBefore: function (e, t) {
          return j(this, e, t);
        },
        replaceChild: function (e, t) {
          (this.insertBefore(e, t), t && this.removeChild(t));
        },
        removeChild: function (e) {
          return D(this, e);
        },
        appendChild: function (e) {
          return this.insertBefore(e, null);
        },
        hasChildNodes: function () {
          return null != this.firstChild;
        },
        cloneNode: function (e) {
          return ee(this.ownerDocument || this, this, e);
        },
        normalize: function () {
          for (var e = this.firstChild; e; ) {
            var t = e.nextSibling;
            t && t.nodeType == i && e.nodeType == i
              ? (this.removeChild(t), e.appendData(t.data))
              : (e.normalize(), (e = t));
          }
        },
        isSupported: function (e, t) {
          return this.ownerDocument.implementation.hasFeature(e, t);
        },
        hasAttributes: function () {
          return this.attributes.length > 0;
        },
        lookupPrefix: function (e) {
          for (var t = this; t; ) {
            var n = t._nsMap;
            if (n) for (var r in n) if (n[r] == e) return r;
            t = t.nodeType == o ? t.ownerDocument : t.parentNode;
          }
          return null;
        },
        lookupNamespaceURI: function (e) {
          for (var t = this; t; ) {
            var n = t._nsMap;
            if (n && e in n) return n[e];
            t = t.nodeType == o ? t.ownerDocument : t.parentNode;
          }
          return null;
        },
        isDefaultNamespace: function (e) {
          return null == this.lookupPrefix(e);
        },
      }),
      e(n, O),
      e(n, O.prototype),
      (U.prototype = {
        nodeName: "#document",
        nodeType: d,
        doctype: null,
        documentElement: null,
        _inc: 1,
        insertBefore: function (e, t) {
          if (e.nodeType == m) {
            for (var n = e.firstChild; n; ) {
              var o = n.nextSibling;
              (this.insertBefore(n, t), (n = o));
            }
            return e;
          }
          return (
            null == this.documentElement &&
              e.nodeType == r &&
              (this.documentElement = e),
            j(this, e, t),
            (e.ownerDocument = this),
            e
          );
        },
        removeChild: function (e) {
          return (
            this.documentElement == e && (this.documentElement = null),
            D(this, e)
          );
        },
        importNode: function (e, t) {
          return Q(this, e, t);
        },
        getElementById: function (e) {
          var t = null;
          return (
            A(this.documentElement, function (n) {
              if (n.nodeType == r && n.getAttribute("id") == e)
                return ((t = n), !0);
            }),
            t
          );
        },
        getElementsByClassName: function (e) {
          var t = new RegExp("(^|\\s)" + e + "(\\s|$)");
          return new k(this, function (e) {
            var n = [];
            return (
              A(e.documentElement, function (o) {
                o !== e &&
                  o.nodeType == r &&
                  t.test(o.getAttribute("class")) &&
                  n.push(o);
              }),
              n
            );
          });
        },
        createElement: function (e) {
          var t = new z();
          return (
            (t.ownerDocument = this),
            (t.nodeName = e),
            (t.tagName = e),
            (t.childNodes = new w()),
            ((t.attributes = new $())._ownerElement = t),
            t
          );
        },
        createDocumentFragment: function () {
          var e = new V();
          return ((e.ownerDocument = this), (e.childNodes = new w()), e);
        },
        createTextNode: function (e) {
          var t = new q();
          return ((t.ownerDocument = this), t.appendData(e), t);
        },
        createComment: function (e) {
          var t = new Z();
          return ((t.ownerDocument = this), t.appendData(e), t);
        },
        createCDATASection: function (e) {
          var t = new L();
          return ((t.ownerDocument = this), t.appendData(e), t);
        },
        createProcessingInstruction: function (e, t) {
          var n = new J();
          return (
            (n.ownerDocument = this),
            (n.tagName = n.target = e),
            (n.nodeValue = n.data = t),
            n
          );
        },
        createAttribute: function (e) {
          var t = new R();
          return (
            (t.ownerDocument = this),
            (t.name = e),
            (t.nodeName = e),
            (t.localName = e),
            (t.specified = !0),
            t
          );
        },
        createEntityReference: function (e) {
          var t = new H();
          return ((t.ownerDocument = this), (t.nodeName = e), t);
        },
        createElementNS: function (e, t) {
          var n = new z(),
            r = t.split(":"),
            o = (n.attributes = new $());
          return (
            (n.childNodes = new w()),
            (n.ownerDocument = this),
            (n.nodeName = t),
            (n.tagName = t),
            (n.namespaceURI = e),
            2 == r.length
              ? ((n.prefix = r[0]), (n.localName = r[1]))
              : (n.localName = t),
            (o._ownerElement = n),
            n
          );
        },
        createAttributeNS: function (e, t) {
          var n = new R(),
            r = t.split(":");
          return (
            (n.ownerDocument = this),
            (n.nodeName = t),
            (n.name = t),
            (n.namespaceURI = e),
            (n.specified = !0),
            2 == r.length
              ? ((n.prefix = r[0]), (n.localName = r[1]))
              : (n.localName = t),
            n
          );
        },
      }),
      t(U, O),
      (z.prototype = {
        nodeType: r,
        hasAttribute: function (e) {
          return null != this.getAttributeNode(e);
        },
        getAttribute: function (e) {
          var t = this.getAttributeNode(e);
          return (t && t.value) || "";
        },
        getAttributeNode: function (e) {
          return this.attributes.getNamedItem(e);
        },
        setAttribute: function (e, t) {
          var n = this.ownerDocument.createAttribute(e);
          ((n.value = n.nodeValue = "" + t), this.setAttributeNode(n));
        },
        removeAttribute: function (e) {
          var t = this.getAttributeNode(e);
          t && this.removeAttributeNode(t);
        },
        appendChild: function (e) {
          return e.nodeType === m
            ? this.insertBefore(e, null)
            : (function (e, t) {
                var n = t.parentNode;
                if (n) {
                  var r = e.lastChild;
                  (n.removeChild(t), (r = e.lastChild));
                }
                return (
                  (r = e.lastChild),
                  (t.parentNode = e),
                  (t.previousSibling = r),
                  (t.nextSibling = null),
                  r ? (r.nextSibling = t) : (e.firstChild = t),
                  (e.lastChild = t),
                  P(e.ownerDocument, e, t),
                  t
                );
              })(this, e);
        },
        setAttributeNode: function (e) {
          return this.attributes.setNamedItem(e);
        },
        setAttributeNodeNS: function (e) {
          return this.attributes.setNamedItemNS(e);
        },
        removeAttributeNode: function (e) {
          return this.attributes.removeNamedItem(e.nodeName);
        },
        removeAttributeNS: function (e, t) {
          var n = this.getAttributeNodeNS(e, t);
          n && this.removeAttributeNode(n);
        },
        hasAttributeNS: function (e, t) {
          return null != this.getAttributeNodeNS(e, t);
        },
        getAttributeNS: function (e, t) {
          var n = this.getAttributeNodeNS(e, t);
          return (n && n.value) || "";
        },
        setAttributeNS: function (e, t, n) {
          var r = this.ownerDocument.createAttributeNS(e, t);
          ((r.value = r.nodeValue = "" + n), this.setAttributeNode(r));
        },
        getAttributeNodeNS: function (e, t) {
          return this.attributes.getNamedItemNS(e, t);
        },
        getElementsByTagName: function (e) {
          return new k(this, function (t) {
            var n = [];
            return (
              A(t, function (o) {
                o === t ||
                  o.nodeType != r ||
                  ("*" !== e && o.tagName != e) ||
                  n.push(o);
              }),
              n
            );
          });
        },
        getElementsByTagNameNS: function (e, t) {
          return new k(this, function (n) {
            var o = [];
            return (
              A(n, function (i) {
                i === n ||
                  i.nodeType !== r ||
                  ("*" !== e && i.namespaceURI !== e) ||
                  ("*" !== t && i.localName != t) ||
                  o.push(i);
              }),
              o
            );
          });
        },
      }),
      (U.prototype.getElementsByTagName = z.prototype.getElementsByTagName),
      (U.prototype.getElementsByTagNameNS = z.prototype.getElementsByTagNameNS),
      t(z, O),
      (R.prototype.nodeType = o),
      t(R, O),
      (M.prototype = {
        data: "",
        substringData: function (e, t) {
          return this.data.substring(e, e + t);
        },
        appendData: function (e) {
          ((e = this.data + e),
            (this.nodeValue = this.data = e),
            (this.length = e.length));
        },
        insertData: function (e, t) {
          this.replaceData(e, 0, t);
        },
        appendChild: function (e) {
          throw new Error(f[v]);
        },
        deleteData: function (e, t) {
          this.replaceData(e, t, "");
        },
        replaceData: function (e, t, n) {
          ((n = this.data.substring(0, e) + n + this.data.substring(e + t)),
            (this.nodeValue = this.data = n),
            (this.length = n.length));
        },
      }),
      t(M, O),
      (q.prototype = {
        nodeName: "#text",
        nodeType: i,
        splitText: function (e) {
          var t = this.data,
            n = t.substring(e);
          ((t = t.substring(0, e)),
            (this.data = this.nodeValue = t),
            (this.length = t.length));
          var r = this.ownerDocument.createTextNode(n);
          return (
            this.parentNode &&
              this.parentNode.insertBefore(r, this.nextSibling),
            r
          );
        },
      }),
      t(q, M),
      (Z.prototype = { nodeName: "#comment", nodeType: c }),
      t(Z, M),
      (L.prototype = { nodeName: "#cdata-section", nodeType: a }),
      t(L, M),
      (F.prototype.nodeType = p),
      t(F, O),
      (B.prototype.nodeType = h),
      t(B, O),
      (W.prototype.nodeType = l),
      t(W, O),
      (H.prototype.nodeType = s),
      t(H, O),
      (V.prototype.nodeName = "#document-fragment"),
      (V.prototype.nodeType = m),
      t(V, O),
      (J.prototype.nodeType = u),
      t(J, O),
      (K.prototype.serializeToString = function (e, t, n) {
        return G.call(e, t, n);
      }),
      (O.prototype.toString = G));
    try {
      if (Object.defineProperty) {
        function ne(e) {
          switch (e.nodeType) {
            case r:
            case m:
              var t = [];
              for (e = e.firstChild; e; )
                (7 !== e.nodeType && 8 !== e.nodeType && t.push(ne(e)),
                  (e = e.nextSibling));
              return t.join("");
            default:
              return e.nodeValue;
          }
        }
        (Object.defineProperty(k.prototype, "length", {
          get: function () {
            return (x(this), this.$$length);
          },
        }),
          Object.defineProperty(O.prototype, "textContent", {
            get: function () {
              return ne(this);
            },
            set: function (e) {
              switch (this.nodeType) {
                case r:
                case m:
                  for (; this.firstChild; ) this.removeChild(this.firstChild);
                  (e || String(e)) &&
                    this.appendChild(this.ownerDocument.createTextNode(e));
                  break;
                default:
                  ((this.data = e), (this.value = e), (this.nodeValue = e));
              }
            },
          }),
          (te = function (e, t, n) {
            e["$$" + t] = n;
          }));
      }
    } catch (re) {}
    return (
      (lf.Node = O),
      (lf.DOMException = _),
      (lf.DOMImplementation = N),
      (lf.XMLSerializer = K),
      lf
    );
  }
  var cf = (function () {
    if (sf) return tf;
    function e(e) {
      this.options = e || { locator: {} };
    }
    function t() {
      this.cdata = !1;
    }
    function n(e, t) {
      ((t.lineNumber = e.lineNumber), (t.columnNumber = e.columnNumber));
    }
    function r(e) {
      if (e)
        return (
          "\n@" +
          (e.systemId || "") +
          "#[line:" +
          e.lineNumber +
          ",col:" +
          e.columnNumber +
          "]"
        );
    }
    function o(e, t, n) {
      return "string" == typeof e
        ? e.substr(t, n)
        : e.length >= t + n || t
          ? new java.lang.String(e, t, n) + ""
          : e;
    }
    function i(e, t) {
      e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
    }
    ((sf = 1),
      (e.prototype.parseFromString = function (e, n) {
        var o = this.options,
          i = new l(),
          s = o.domBuilder || new t(),
          u = o.errorHandler,
          c = o.locator,
          d = o.xmlns || {},
          p = /\/x?html?$/.test(n),
          m = p
            ? a.entityMap
            : { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'" };
        return (
          c && s.setDocumentLocator(c),
          (i.errorHandler = (function (e, n, o) {
            if (!e) {
              if (n instanceof t) return n;
              e = n;
            }
            var i = {},
              a = e instanceof Function;
            function s(t) {
              var n = e[t];
              (!n &&
                a &&
                (n =
                  2 == e.length
                    ? function (n) {
                        e(t, n);
                      }
                    : e),
                (i[t] =
                  (n &&
                    function (e) {
                      n("[xmldom " + t + "]\t" + e + r(o));
                    }) ||
                  function () {}));
            }
            return (
              (o = o || {}),
              s("warning"),
              s("error"),
              s("fatalError"),
              i
            );
          })(u, s, c)),
          (i.domBuilder = o.domBuilder || s),
          p && (d[""] = "http://www.w3.org/1999/xhtml"),
          (d.xml = d.xml || "http://www.w3.org/XML/1998/namespace"),
          e && "string" == typeof e
            ? i.parse(e, d, m)
            : i.errorHandler.error("invalid doc source"),
          s.doc
        );
      }),
      (t.prototype = {
        startDocument: function () {
          ((this.doc = new c().createDocument(null, null, null)),
            this.locator && (this.doc.documentURI = this.locator.systemId));
        },
        startElement: function (e, t, r, o) {
          var a = this.doc,
            s = a.createElementNS(e, r || t),
            l = o.length;
          (i(this, s),
            (this.currentElement = s),
            this.locator && n(this.locator, s));
          for (var u = 0; u < l; u++) {
            e = o.getURI(u);
            var c = o.getValue(u),
              d = ((r = o.getQName(u)), a.createAttributeNS(e, r));
            (this.locator && n(o.getLocator(u), d),
              (d.value = d.nodeValue = c),
              s.setAttributeNode(d));
          }
        },
        endElement: function (e, t, n) {
          var r = this.currentElement;
          (r.tagName, (this.currentElement = r.parentNode));
        },
        startPrefixMapping: function (e, t) {},
        endPrefixMapping: function (e) {},
        processingInstruction: function (e, t) {
          var r = this.doc.createProcessingInstruction(e, t);
          (this.locator && n(this.locator, r), i(this, r));
        },
        ignorableWhitespace: function (e, t, n) {},
        characters: function (e, t, r) {
          if ((e = o.apply(this, arguments))) {
            if (this.cdata) var i = this.doc.createCDATASection(e);
            else i = this.doc.createTextNode(e);
            (this.currentElement
              ? this.currentElement.appendChild(i)
              : /^\s*$/.test(e) && this.doc.appendChild(i),
              this.locator && n(this.locator, i));
          }
        },
        skippedEntity: function (e) {},
        endDocument: function () {
          this.doc.normalize();
        },
        setDocumentLocator: function (e) {
          (this.locator = e) && (e.lineNumber = 0);
        },
        comment: function (e, t, r) {
          e = o.apply(this, arguments);
          var a = this.doc.createComment(e);
          (this.locator && n(this.locator, a), i(this, a));
        },
        startCDATA: function () {
          this.cdata = !0;
        },
        endCDATA: function () {
          this.cdata = !1;
        },
        startDTD: function (e, t, r) {
          var o = this.doc.implementation;
          if (o && o.createDocumentType) {
            var a = o.createDocumentType(e, t, r);
            (this.locator && n(this.locator, a), i(this, a));
          }
        },
        warning: function (e) {
          console.warn("[xmldom warning]\t" + e, r(this.locator));
        },
        error: function (e) {
          console.error("[xmldom error]\t" + e, r(this.locator));
        },
        fatalError: function (e) {
          throw new u(e, this.locator);
        },
      }),
      "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
        /\w+/g,
        function (e) {
          t.prototype[e] = function () {
            return null;
          };
        },
      ));
    var a =
        (Qg ||
          ((Qg = 1),
          (nf.entityMap = {
            lt: "<",
            gt: ">",
            amp: "&",
            quot: '"',
            apos: "'",
            Agrave: "À",
            Aacute: "Á",
            Acirc: "Â",
            Atilde: "Ã",
            Auml: "Ä",
            Aring: "Å",
            AElig: "Æ",
            Ccedil: "Ç",
            Egrave: "È",
            Eacute: "É",
            Ecirc: "Ê",
            Euml: "Ë",
            Igrave: "Ì",
            Iacute: "Í",
            Icirc: "Î",
            Iuml: "Ï",
            ETH: "Ð",
            Ntilde: "Ñ",
            Ograve: "Ò",
            Oacute: "Ó",
            Ocirc: "Ô",
            Otilde: "Õ",
            Ouml: "Ö",
            Oslash: "Ø",
            Ugrave: "Ù",
            Uacute: "Ú",
            Ucirc: "Û",
            Uuml: "Ü",
            Yacute: "Ý",
            THORN: "Þ",
            szlig: "ß",
            agrave: "à",
            aacute: "á",
            acirc: "â",
            atilde: "ã",
            auml: "ä",
            aring: "å",
            aelig: "æ",
            ccedil: "ç",
            egrave: "è",
            eacute: "é",
            ecirc: "ê",
            euml: "ë",
            igrave: "ì",
            iacute: "í",
            icirc: "î",
            iuml: "ï",
            eth: "ð",
            ntilde: "ñ",
            ograve: "ò",
            oacute: "ó",
            ocirc: "ô",
            otilde: "õ",
            ouml: "ö",
            oslash: "ø",
            ugrave: "ù",
            uacute: "ú",
            ucirc: "û",
            uuml: "ü",
            yacute: "ý",
            thorn: "þ",
            yuml: "ÿ",
            nbsp: " ",
            iexcl: "¡",
            cent: "¢",
            pound: "£",
            curren: "¤",
            yen: "¥",
            brvbar: "¦",
            sect: "§",
            uml: "¨",
            copy: "©",
            ordf: "ª",
            laquo: "«",
            not: "¬",
            shy: "­­",
            reg: "®",
            macr: "¯",
            deg: "°",
            plusmn: "±",
            sup2: "²",
            sup3: "³",
            acute: "´",
            micro: "µ",
            para: "¶",
            middot: "·",
            cedil: "¸",
            sup1: "¹",
            ordm: "º",
            raquo: "»",
            frac14: "¼",
            frac12: "½",
            frac34: "¾",
            iquest: "¿",
            times: "×",
            divide: "÷",
            forall: "∀",
            part: "∂",
            exist: "∃",
            empty: "∅",
            nabla: "∇",
            isin: "∈",
            notin: "∉",
            ni: "∋",
            prod: "∏",
            sum: "∑",
            minus: "−",
            lowast: "∗",
            radic: "√",
            prop: "∝",
            infin: "∞",
            ang: "∠",
            and: "∧",
            or: "∨",
            cap: "∩",
            cup: "∪",
            int: "∫",
            there4: "∴",
            sim: "∼",
            cong: "≅",
            asymp: "≈",
            ne: "≠",
            equiv: "≡",
            le: "≤",
            ge: "≥",
            sub: "⊂",
            sup: "⊃",
            nsub: "⊄",
            sube: "⊆",
            supe: "⊇",
            oplus: "⊕",
            otimes: "⊗",
            perp: "⊥",
            sdot: "⋅",
            Alpha: "Α",
            Beta: "Β",
            Gamma: "Γ",
            Delta: "Δ",
            Epsilon: "Ε",
            Zeta: "Ζ",
            Eta: "Η",
            Theta: "Θ",
            Iota: "Ι",
            Kappa: "Κ",
            Lambda: "Λ",
            Mu: "Μ",
            Nu: "Ν",
            Xi: "Ξ",
            Omicron: "Ο",
            Pi: "Π",
            Rho: "Ρ",
            Sigma: "Σ",
            Tau: "Τ",
            Upsilon: "Υ",
            Phi: "Φ",
            Chi: "Χ",
            Psi: "Ψ",
            Omega: "Ω",
            alpha: "α",
            beta: "β",
            gamma: "γ",
            delta: "δ",
            epsilon: "ε",
            zeta: "ζ",
            eta: "η",
            theta: "θ",
            iota: "ι",
            kappa: "κ",
            lambda: "λ",
            mu: "μ",
            nu: "ν",
            xi: "ξ",
            omicron: "ο",
            pi: "π",
            rho: "ρ",
            sigmaf: "ς",
            sigma: "σ",
            tau: "τ",
            upsilon: "υ",
            phi: "φ",
            chi: "χ",
            psi: "ψ",
            omega: "ω",
            thetasym: "ϑ",
            upsih: "ϒ",
            piv: "ϖ",
            OElig: "Œ",
            oelig: "œ",
            Scaron: "Š",
            scaron: "š",
            Yuml: "Ÿ",
            fnof: "ƒ",
            circ: "ˆ",
            tilde: "˜",
            ensp: " ",
            emsp: " ",
            thinsp: " ",
            zwnj: "‌",
            zwj: "‍",
            lrm: "‎",
            rlm: "‏",
            ndash: "–",
            mdash: "—",
            lsquo: "‘",
            rsquo: "’",
            sbquo: "‚",
            ldquo: "“",
            rdquo: "”",
            bdquo: "„",
            dagger: "†",
            Dagger: "‡",
            bull: "•",
            hellip: "…",
            permil: "‰",
            prime: "′",
            Prime: "″",
            lsaquo: "‹",
            rsaquo: "›",
            oline: "‾",
            euro: "€",
            trade: "™",
            larr: "←",
            uarr: "↑",
            rarr: "→",
            darr: "↓",
            harr: "↔",
            crarr: "↵",
            lceil: "⌈",
            rceil: "⌉",
            lfloor: "⌊",
            rfloor: "⌋",
            loz: "◊",
            spades: "♠",
            clubs: "♣",
            hearts: "♥",
            diams: "♦",
          })),
        nf),
      s = of(),
      l = s.XMLReader,
      u = s.ParseError,
      c = (tf.DOMImplementation = uf().DOMImplementation);
    return (
      (tf.XMLSerializer = uf().XMLSerializer),
      (tf.DOMParser = e),
      (tf.__DOMHandler = t),
      tf
    );
  })();
  function df(e) {
    const t = (function (e) {
      const t = new Map(),
        n = new Map(),
        r = new Map();
      for (const o of e) (t.set(o.id, o), n.set(o.id, 0), r.set(o.id, []));
      for (const o of e)
        for (const e of o.dependsOn)
          t.has(e) && (r.get(e).push(o.id), n.set(o.id, n.get(o.id) + 1));
      const o = [],
        i = new Map();
      for (const [e, t] of n.entries()) (0 === t && o.push(e), i.set(e, 0));
      let a = 0;
      for (; o.length > 0; ) {
        const e = o.shift();
        a++;
        for (const t of r.get(e)) {
          const e = n.get(t) - 1;
          (n.set(t, e), 0 === e && o.push(t));
        }
      }
      if (a < e.length) {
        console.warn(
          "Detected a circular dependency, automatically disconnecting the circular link...",
        );
        const r = new Set();
        for (const [e, t] of n.entries()) t > 0 && r.add(e);
        const o = [];
        for (const n of e)
          if (r.has(n.id)) {
            const e = n.dependsOn.filter((e) => !r.has(e) || !t.has(e));
            if (0 === e.length && n.dependsOn.length > 0) {
              const o = n.dependsOn.find((e) => t.has(e));
              o && !r.has(o) && e.push(o);
            }
            ((n.dependsOn = e),
              o.push(n),
              e.length !== n.dependsOn.length &&
                console.warn(
                  `The partial cyclic dependency of agent ${n.id} has been disconnected.`,
                ));
          } else {
            const e = n.dependsOn.filter((e) => t.has(e));
            ((n.dependsOn = e), o.push(n));
          }
        return o;
      }
      return e.map(
        (e) => ((e.dependsOn = e.dependsOn.filter((e) => t.has(e))), e),
      );
    })(e);
    if (0 === t.length) throw new Error("No executable agent");
    const n = new Map(),
      r = new Map();
    for (const e of t) (n.set(e.id, e), r.set(e.id, []));
    for (const e of t)
      for (const t of e.dependsOn) r.has(t) && r.get(t).push(e);
    let o = t.filter((e) => 0 === e.dependsOn.length);
    0 === o.length &&
      (o = t.filter(
        (e) => 1 == e.dependsOn.length && e.dependsOn[0].endsWith("00"),
      ));
    const i = new Set(),
      a = (function e(t) {
        if (0 === t.length) return;
        for (const e of t) i.add(e.id);
        const n = [],
          o = new Set();
        for (const e of t) {
          const t = r.get(e.id) || [];
          for (const e of t)
            e.dependsOn.every((e) => i.has(e)) &&
              !o.has(e.id) &&
              (n.push(e), o.add(e.id));
        }
        const a = e(n);
        return 1 === t.length
          ? { type: "normal", agent: t[0], nextAgent: a }
          : {
              type: "parallel",
              agents: t.map((e) => ({
                type: "normal",
                agent: e,
                nextAgent: void 0,
              })),
              nextAgent: a,
            };
      })(o);
    if (!a) throw new Error("Unable to build execution tree");
    return a;
  }
  function pf(e, t, n, r) {
    let o = null;
    try {
      r && (o = { taskId: e, name: "", thought: r, agents: [], xml: t });
      let i = t.indexOf("<root>");
      if (-1 == i) return o;
      let a = (t = t.substring(i)).indexOf("</root>");
      (a > -1 && (t = t.substring(0, a + 7)),
        n ||
          (t = (function (e) {
            ((e = e.trim()).endsWith("<") && (e = e.substring(0, e.length - 1)),
              e.indexOf("&") > -1 &&
                (e = e.replace(/&(?![a-zA-Z0-9#]+;)/g, "&amp;")));
            let t = e.lastIndexOf(" "),
              n = t > -1 ? e.substring(t + 1) : "";
            if (e.endsWith("=")) e += '""';
            else if (
              "name" == n ||
              "id" == n ||
              "depen" == n ||
              "depends" == n ||
              "dependsOn" == n ||
              "input" == n ||
              "output" == n ||
              "items" == n ||
              "event" == n ||
              "loop" == n
            ) {
              let t = e.lastIndexOf(">"),
                n = e.lastIndexOf("<");
              t < n && e.lastIndexOf(" ") > n && (e += '=""');
            }
            e = (function (e) {
              const t = [];
              for (let n = 0; n < e.length; n++) {
                let r = e[n];
                "<" === r
                  ? t.push(">")
                  : ">" === r
                    ? t.pop()
                    : '"' === r &&
                      ('"' === t[t.length - 1] ? t.pop() : t.push('"'));
              }
              const n = [];
              for (; t.length > 0; ) n.push(t.pop());
              return e + n.join("");
            })(e);
            const r = [];
            for (let t = 0; t < e.length; t++)
              if ("<" === e[t]) {
                const n = "/" === e[t + 1];
                let o = e.indexOf(">", t),
                  i = e.slice(t, o + 1);
                if ((i.endsWith("/>") || (n ? r.pop() : r.push(i)), -1 == o))
                  break;
                t = o;
              }
            const o = [];
            for (; r.length > 0; ) {
              const e = r.pop();
              if (e.startsWith("<")) {
                let t = e.match(/<(\w+)/);
                if (t) {
                  const e = t[1];
                  o.push(`</${e}>`);
                }
              } else o.push(e);
            }
            return e + o.join("");
          })(t)));
      let s = new cf.DOMParser().parseFromString(t, "text/xml").documentElement;
      if ("root" !== s.tagName) return o;
      const l = [],
        u = s.getElementsByTagName("thought")[0]?.textContent || "",
        c = {
          taskId: e,
          name: s.getElementsByTagName("name")[0]?.textContent || "",
          thought: r ? r + "\n" + u : u,
          agents: l,
          xml: t,
        };
      let d = s.getElementsByTagName("agents"),
        p = d.length > 0 ? d[0].getElementsByTagName("agent") : [];
      for (let t = 0; t < p.length; t++) {
        let n = p[t],
          r = n.getAttribute("name");
        if (!r) break;
        let o = n.getAttribute("id") || t,
          i = n.getAttribute("dependsOn") || "",
          a = [],
          s = {
            name: r,
            id: mf(e, o),
            dependsOn: i
              .split(",")
              .filter((e) => "" != e.trim())
              .map((t) => mf(e, t)),
            task: n.getElementsByTagName("task")[0]?.textContent || "",
            nodes: a,
            status: "init",
            parallel: void 0,
            xml: n.toString(),
          },
          u = n.getElementsByTagName("nodes");
        (u.length > 0 && hf(a, u[0].childNodes), l.push(s));
      }
      if (n) {
        let e = df(c.agents);
        for (;;) {
          if ("normal" === e.type) e.agent.parallel = !1;
          else {
            const t = e.agents;
            for (let e = 0; e < t.length; e++) t[e].agent.parallel = !0;
          }
          if (!e.nextAgent) break;
          e = e.nextAgent;
        }
      }
      return c;
    } catch (e) {
      if (n) throw e;
      return o;
    }
  }
  function mf(e, t) {
    return e + "-" + (+t < 10 ? "0" + t : t);
  }
  function hf(e, t) {
    for (let n = 0; n < t.length; n++) {
      if (1 !== t[n].nodeType) continue;
      let r = t[n];
      switch (r.tagName) {
        case "node": {
          let t = {
            type: "normal",
            text: r.textContent || "",
            input: r.getAttribute("input"),
            output: r.getAttribute("output"),
          };
          e.push(t);
          break;
        }
        case "forEach": {
          let t = [],
            n = {
              type: "forEach",
              items: r.getAttribute("items") || "list",
              nodes: t,
            },
            o = r.getElementsByTagName("node");
          (o.length > 0 && hf(t, o), e.push(n));
          break;
        }
        case "watch": {
          let t = [],
            n = {
              type: "watch",
              event: r.getAttribute("event") || "",
              loop: "true" == r.getAttribute("loop"),
              description:
                r.getElementsByTagName("description")[0]?.textContent || "",
              triggerNodes: t,
            },
            o = r.getElementsByTagName("trigger");
          (o.length > 0 && hf(t, o[0].childNodes), e.push(n));
          break;
        }
      }
    }
  }
  function gf(e, t, n) {
    const r = new cf.DOMParser().parseFromString(e, "text/xml");
    let o = r.getElementsByTagName("agent"),
      i = r.getElementsByTagName("nodes");
    if (i.length > 0) {
      let e = i[0].childNodes,
        t = 0;
      for (let r = 0; r < e.length; r++) {
        let o = e[r];
        1 == o.nodeType && (o.setAttribute("id", t + ""), n && n(t, o), t++);
      }
    }
    let a = (function (e) {
        let t = "";
        const n = new cf.XMLSerializer();
        for (let r = 0; r < e.childNodes.length; r++)
          t += n.serializeToString(e.childNodes[r]);
        return t;
      })(o[0]),
      s = a.substring(0, a.indexOf("<task>"));
    return (
      (a = a
        .replace("<task>", "<currentTask>")
        .replace("</task>", "</currentTask>")),
      `<root>${s}<mainTask>${t}</mainTask>${a}</root>`
        .replace(/      /g, "  ")
        .replace("    </root>", "</root>")
    );
  }
  function ff(e, t) {
    let n = new cf.DOMParser()
      .parseFromString(e, "text/xml")
      .getElementsByTagName("nodes");
    if (n.length > 0) {
      let e = n[0].childNodes,
        r = 0;
      for (let n = 0; n < e.length; n++) {
        let o = e[n];
        if (
          1 == o.nodeType &&
          ((null != o.getAttribute("id") && "" != o.getAttribute("id")) ||
            o.setAttribute("id", r + ""),
          r++,
          o.getAttribute("id") == t + "")
        )
          return o;
      }
    }
    return null;
  }
  class vf {
    constructor() {
      ((this.name = "task_snapshot"),
        (this.description =
          "Task snapshot archive, recording key information of the current task, updating task node status, facilitating subsequent continuation of operation."),
        (this.parameters = {
          type: "object",
          properties: {
            doneIds: {
              type: "array",
              description:
                "Update task node completion status, list of completed node IDs.",
              items: { type: "number" },
            },
            taskSnapshot: {
              type: "string",
              description:
                "Current task important information, as detailed as possible, ensure that the task progress can be restored through this information later, output records of completed task information, contextual information, variables used, pending tasks information, etc.",
            },
          },
          required: ["doneIds", "taskSnapshot"],
        }));
    }
    async execute(e, t) {
      let n = e.doneIds,
        r = e.taskSnapshot,
        o = t.agentChain.agent,
        i = t.context.chain.taskPrompt,
        a = gf(o.xml, i, (e, t) => {
          let r = n.indexOf(e) > -1;
          t.setAttribute("status", r ? "done" : "todo");
        });
      return {
        content: [
          {
            type: "text",
            text:
              "The current task has been interrupted. Below is a snapshot of the task execution history.\n# Task Snapshot\n" +
              r.trim() +
              "\n\n# Task\n" +
              a,
          },
        ],
      };
    }
  }
  function yf(e, t) {
    let n = [],
      r = [];
    for (let o = 0; o < e.length; o++) {
      let i = e[o];
      if ("tool" == i.role)
        for (let e = 0; e < i.content.length; e++) {
          let o = i.content[e].toolName;
          if (r.indexOf(o) > -1) continue;
          r.push(o);
          let a = t.filter((e) => e.name === o)[0];
          a && n.push(a);
        }
    }
    return n;
  }
  async function bf(e, t, n, r) {
    if (!(n.length < 5))
      try {
        !(async function (e, t, n, r) {
          let o = yf(n, r),
            i = new vf(),
            a = _d(o, [
              {
                type: "function",
                name: i.name,
                description: i.description,
                inputSchema: i.parameters,
              },
            ]),
            s = n.length - 1,
            l = n;
          for (let e = l.length - 1; e > 3; e--)
            if ("tool" == l[e].role) {
              ((l = l.slice(0, e + 1)), (s = e));
              break;
            }
          l.push({
            role: "user",
            content: [
              {
                type: "text",
                text: "Please create a snapshot backup of the current task, keeping only key important information and node completion status.",
              },
            ],
          });
          let u = (
              await xf(e, t, l, a, !0, { type: "tool", toolName: i.name })
            ).filter((e) => "tool-call" == e.type)[0],
            c =
              "string" == typeof u.input
                ? JSON.parse(u.input || "{}")
                : u.input || {},
            d = await i.execute(c, e),
            p = e.context.config.callback;
          p &&
            (await p.onMessage(
              {
                taskId: e.context.taskId,
                agentName: e.agent.Name,
                nodeId: e.agentChain.agent.id,
                type: "tool_result",
                toolId: u.toolCallId,
                toolName: u.toolName,
                params: c,
                toolResult: d,
              },
              e,
            ));
          let m = 3;
          for (let e = 0; e < n.length; e++)
            if ("tool" == n[0].role) {
              m = e;
              break;
            }
          n.splice(m + 1, s - m - 2, {
            role: "user",
            content: d.content.filter((e) => "text" == e.type),
          });
        })(e, t, n, r);
      } catch (e) {
        o.error("Error compressing agent messages:", e);
      }
  }
  function _f(e) {
    return e.map((e) => ({
      type: "function",
      name: e.name,
      description: e.description,
      inputSchema: e.parameters,
    }));
  }
  function wf(e, t) {
    for (let n = 0; n < e.length; n++) if (e[n].name == t) return e[n];
    return null;
  }
  function kf(e, t, n) {
    let r;
    if (1 == t.content.length && "text" == t.content[0].type) {
      let e = t.content[0].text;
      r = { type: "text", value: e };
      let n = 1 == t.isError;
      if (
        (n && !e.startsWith("Error")
          ? ((e = "Error: " + e), (r = { type: "error-text", value: e }))
          : n ||
            0 != e.length ||
            ((e = "Successful"), (r = { type: "text", value: e })),
        e &&
          ((e.startsWith("{") && e.endsWith("}")) ||
            (e.startsWith("[") && e.endsWith("]"))))
      )
        try {
          ((r = JSON.parse(e)), (r = { type: "json", value: r }));
        } catch (e) {}
    } else {
      r = { type: "content", value: [] };
      for (let e = 0; e < t.content.length; e++) {
        let n = t.content[e];
        if ("text" == n.type) r.value.push({ type: "text", text: n.text });
        else {
          {
            let e = n.data;
            (e.startsWith("data:") && (e = e.substring(e.indexOf(",") + 1)),
              r.value.push({
                type: "media",
                data: e,
                mediaType: n.mimeType || "image/png",
              }));
          }
        }
      }
    }
    return {
      type: "tool-result",
      toolCallId: e.toolCallId,
      toolName: e.toolName,
      output: r,
    };
  }
  async function xf(e, t, n, r, i, a, s = 0, l, u) {
    (await e.context.checkAborted(),
      n.length >= 80 && !i && (await bf(e, t, n, r)),
      a ||
        (function (e, t) {
          const n = e.context.conversation
            .splice(0, e.context.conversation.length)
            .filter((e) => !!e);
          if (n.length > 0) {
            const e =
              "The user is intervening in the current task, please replan and execute according to the following instructions:\n" +
              n.map((e) => `- ${e.trim()}`).join("\n");
            t.push({ role: "user", content: [{ type: "text", text: e }] });
          }
        })(e, n));
    let c = e.context,
      d = e.agentChain,
      p = d.agent,
      m = l || c.config.callback || { onMessage: async () => {} };
    const h = new AbortController();
    let g,
      f = {
        tools: r,
        toolChoice: a,
        messages: n,
        abortSignal: AbortSignal.any([c.controller.signal, h.signal]),
      };
    (u && u(f), (d.agentRequest = f));
    try {
      (c.currentStepControllers.add(h), (g = await t.callStream(f)));
    } catch (o) {
      if (
        (c.currentStepControllers.delete(h),
        await c.checkAborted(),
        !i &&
          n.length >= 5 &&
          ((o + "").indexOf("tokens") > -1 ||
            (o + "").indexOf("too long") > -1) &&
          (await bf(e, t, n, r)),
        s < 3)
      )
        return (
          await gd(200 * (s + 1) * (s + 1)),
          xf(e, t, n, r, i, a, ++s, m)
        );
      throw o;
    }
    let v = "",
      y = "",
      b = "",
      _ = fd(),
      w = fd(),
      k = !1;
    const x = [],
      $ = g.stream.getReader();
    try {
      let l = null;
      for (;;) {
        await c.checkAborted();
        const { done: u, value: d } = await $.read();
        if (u) break;
        const h = d;
        switch (h.type) {
          case "text-start":
            _ = fd();
            break;
          case "text-delta":
            if (l && !h.delta) continue;
            ((v += h.delta || ""),
              await m.onMessage(
                {
                  taskId: c.taskId,
                  agentName: p.name,
                  nodeId: p.id,
                  type: "text",
                  streamId: _,
                  streamDone: !1,
                  text: v,
                },
                e,
              ),
              l &&
                (await m.onMessage(
                  {
                    taskId: c.taskId,
                    agentName: p.name,
                    nodeId: p.id,
                    type: "tool_use",
                    toolId: l.toolCallId,
                    toolName: l.toolName,
                    params: l.input || {},
                  },
                  e,
                ),
                (l = null)));
            break;
          case "text-end":
            ((k = !0),
              v &&
                (await m.onMessage(
                  {
                    taskId: c.taskId,
                    agentName: p.name,
                    nodeId: p.id,
                    type: "text",
                    streamId: _,
                    streamDone: !0,
                    text: v,
                  },
                  e,
                )));
            break;
          case "reasoning-start":
            w = fd();
            break;
          case "reasoning-delta":
            ((y += h.delta || ""),
              await m.onMessage(
                {
                  taskId: c.taskId,
                  agentName: p.name,
                  nodeId: p.id,
                  type: "thinking",
                  streamId: w,
                  streamDone: !1,
                  text: y,
                },
                e,
              ));
            break;
          case "reasoning-end":
            y &&
              (await m.onMessage(
                {
                  taskId: c.taskId,
                  agentName: p.name,
                  nodeId: p.id,
                  type: "thinking",
                  streamId: w,
                  streamDone: !0,
                  text: y,
                },
                e,
              ));
            break;
          case "tool-input-start":
            l && l.toolCallId == h.id
              ? (l.toolName = h.toolName)
              : ((l = {
                  type: "tool-call",
                  toolCallId: h.id,
                  toolName: h.toolName,
                  input: {},
                }),
                x.push(l));
            break;
          case "tool-input-delta":
            (k ||
              ((k = !0),
              await m.onMessage(
                {
                  taskId: c.taskId,
                  agentName: p.name,
                  nodeId: p.id,
                  type: "text",
                  streamId: _,
                  streamDone: !0,
                  text: v,
                },
                e,
              )),
              (b += h.delta || ""),
              await m.onMessage(
                {
                  taskId: c.taskId,
                  agentName: p.name,
                  nodeId: p.id,
                  type: "tool_streaming",
                  toolId: h.id,
                  toolName: l?.toolName || "",
                  paramsText: b,
                },
                e,
              ));
            break;
          case "tool-call": {
            b = "";
            const t = h.input ? JSON.parse(h.input) : {},
              n = {
                taskId: c.taskId,
                agentName: p.name,
                nodeId: p.id,
                type: "tool_use",
                toolId: h.toolCallId,
                toolName: h.toolName,
                params: t,
              };
            (await m.onMessage(n, e),
              null == l
                ? x.push({
                    type: "tool-call",
                    toolCallId: h.toolCallId,
                    toolName: h.toolName,
                    input: n.params || t,
                  })
                : ((l.input = n.params || t), (l = null)));
            break;
          }
          case "file":
            await m.onMessage(
              {
                taskId: c.taskId,
                agentName: p.name,
                nodeId: p.id,
                type: "file",
                mimeType: h.mediaType,
                data: h.data,
              },
              e,
            );
            break;
          case "error":
            throw (
              o.error(`${p.name} agent error: `, h),
              await m.onMessage(
                {
                  taskId: c.taskId,
                  agentName: p.name,
                  nodeId: p.id,
                  type: "error",
                  error: h.error,
                },
                e,
              ),
              new Error("LLM Error: " + h.error)
            );
          case "finish":
            if (
              (k ||
                ((k = !0),
                await m.onMessage(
                  {
                    taskId: c.taskId,
                    agentName: p.name,
                    nodeId: p.id,
                    type: "text",
                    streamId: _,
                    streamDone: !0,
                    text: v,
                  },
                  e,
                )),
              l &&
                (await m.onMessage(
                  {
                    taskId: c.taskId,
                    agentName: p.name,
                    nodeId: p.id,
                    type: "tool_use",
                    toolId: l.toolCallId,
                    toolName: l.toolName,
                    params: l.input || {},
                  },
                  e,
                ),
                (l = null)),
              await m.onMessage(
                {
                  taskId: c.taskId,
                  agentName: p.name,
                  nodeId: p.id,
                  type: "finish",
                  finishReason: h.finishReason,
                  usage: {
                    promptTokens: h.usage.inputTokens || 0,
                    completionTokens: h.usage.outputTokens || 0,
                    totalTokens:
                      h.usage.totalTokens ||
                      (h.usage.inputTokens || 0) + (h.usage.outputTokens || 0),
                  },
                },
                e,
              ),
              "length" === h.finishReason && n.length >= 5 && !i && s < 3)
            )
              return (await bf(e, t, n, r), xf(e, t, n, r, i, a, ++s, m));
        }
      }
    } catch (o) {
      if ((await c.checkAborted(), s < 3))
        return (
          await gd(200 * (s + 1) * (s + 1)),
          xf(e, t, n, r, i, a, ++s, m)
        );
      throw o;
    } finally {
      ($.releaseLock(), c.currentStepControllers.delete(h));
    }
    return ((d.agentResult = v), v ? [{ type: "text", text: v }, ...x] : x);
  }
  class $f {
    constructor(e, t, n, r) {
      ((this.llms = e),
        (this.names = t || []),
        (this.stream_first_timeout = n || 3e4),
        (this.stream_token_timeout = r || 18e4),
        -1 == this.names.indexOf("default") && this.names.push("default"));
    }
    async call(e) {
      return await this.doGenerate({
        prompt: e.messages,
        tools: e.tools,
        toolChoice: e.toolChoice,
        maxOutputTokens: e.maxTokens,
        temperature: e.temperature,
        topP: e.topP,
        topK: e.topK,
        stopSequences: e.stopSequences,
        abortSignal: e.abortSignal,
      });
    }
    async doGenerate(e) {
      const t = e.maxOutputTokens,
        n = e.providerOptions,
        r = [...this.names, ...this.names];
      let i;
      for (let a = 0; a < r.length; a++) {
        const s = r[a],
          l = this.llms[s],
          u = await this.getLLM(s);
        if (!u) continue;
        (t || (e.maxOutputTokens = l.config?.maxTokens || 16e3),
          n ||
            ((e.providerOptions = {
              openai: { stream_options: { include_usage: !0 } },
              openrouter: { reasoning: { max_tokens: 10 } },
            }),
            (e.providerOptions[u.provider] = l.options || {})));
        let c = e;
        l.handler && (c = await l.handler(c));
        try {
          let e = await u.doGenerate(c);
          return (
            o.isEnableDebug() &&
              o.debug(`LLM nonstream body, name: ${s} => `, e.request?.body),
            (e.llm = s),
            (e.llmConfig = l),
            (e.text = e.content.find((e) => "text" === e.type)?.text),
            e
          );
        } catch (e) {
          if ("AbortError" === e?.name) throw e;
          // 特殊处理inappropriate content错误
          if (e?.message?.includes("inappropriate content")) {
            console.warn("AI API blocked content, trying alternative approach...");
            // 创建一个更友好的错误消息
            const friendlyError = new Error("Content was blocked by AI safety filters. Please try rephrasing your request or choosing a different website.");
            friendlyError.name = "ContentBlockedError";
            i = friendlyError;
          } else {
            i = e;
          }
          o.isEnableInfo() &&
            o.info(`LLM nonstream request, name: ${s} => `, {
              tools: c.tools,
              messages: c.prompt,
            });
          o.error(`LLM error, name: ${s} => `, e);
        }
      }
      return Promise.reject(i || new Error("No LLM available"));
    }
    async callStream(e) {
      return await this.doStream({
        prompt: e.messages,
        tools: e.tools,
        toolChoice: e.toolChoice,
        maxOutputTokens: e.maxTokens,
        temperature: e.temperature,
        topP: e.topP,
        topK: e.topK,
        stopSequences: e.stopSequences,
        abortSignal: e.abortSignal,
      });
    }
    async doStream(e) {
      const t = e.maxOutputTokens,
        n = e.providerOptions,
        r = [...this.names, ...this.names];
      let i;
      for (let a = 0; a < r.length; a++) {
        const s = r[a],
          l = this.llms[s],
          u = await this.getLLM(s);
        if (!u) continue;
        (t || (e.maxOutputTokens = l.config?.maxTokens || 16e3),
          n ||
            ((e.providerOptions = {
              openai: { stream_options: { include_usage: !0 } },
              openrouter: { reasoning: { max_tokens: 10 } },
            }),
            (e.providerOptions[u.provider] = l.options || {})));
        let c = e;
        l.handler && (c = await l.handler(c));
        try {
          const e = new AbortController(),
            t = c.abortSignal
              ? AbortSignal.any([c.abortSignal, e.signal])
              : e.signal,
            n = await vd(
              async () => await u.doStream({ ...c, abortSignal: t }),
              this.stream_first_timeout,
              (t) => {
                e.abort();
              },
            ),
            r = n.stream.getReader(),
            { done: i, value: a } = await vd(
              async () => await r.read(),
              this.stream_first_timeout,
              (t) => {
                (r.cancel(), r.releaseLock(), e.abort());
              },
            );
          if (i) {
            (o.warn(`LLM stream done, name: ${s} => `, { done: i, value: a }),
              r.releaseLock());
            continue;
          }
          o.isEnableDebug() &&
            o.debug(`LLM stream body, name: ${s} => `, n.request?.body);
          let d = a;
          if ("error" == d.type) {
            (o.error(`LLM stream error, name: ${s}`, d), r.releaseLock());
            continue;
          }
          return (
            (n.llm = s),
            (n.llmConfig = l),
            (n.stream = this.streamWrapper([d], r, e)),
            n
          );
        } catch (e) {
          if ("AbortError" === e?.name) throw e;
          // 特殊处理inappropriate content错误
          if (e?.message?.includes("inappropriate content")) {
            console.warn("AI API blocked content in stream, trying alternative approach...");
            // 创建一个更友好的错误消息
            const friendlyError = new Error("Content was blocked by AI safety filters. Please try rephrasing your request or choosing a different website.");
            friendlyError.name = "ContentBlockedError";
            i = friendlyError;
          } else {
            i = e;
          }
          o.isEnableInfo() &&
            o.info(`LLM stream request, name: ${s} => `, {
              tools: c.tools,
              messages: c.prompt,
            });
          o.error(`LLM error, name: ${s} => `, e);
        }
      }
      return Promise.reject(i || new Error("No LLM available"));
    }
    async getLLM(e) {
      const t = this.llms[e];
      if (!t) return null;
      let n, r;
      if (
        ((n = "string" == typeof t.apiKey ? t.apiKey : await t.apiKey()),
        t.config?.baseURL &&
          (r =
            "string" == typeof t.config.baseURL
              ? t.config.baseURL
              : await t.config.baseURL()),
        "openai" == t.provider)
      )
        return !r ||
          r.indexOf("openai.com") > -1 ||
          t.config?.organization ||
          t.config?.openai
          ? hd({
              apiKey: n,
              baseURL: r,
              fetch: t.fetch,
              organization: t.config?.organization,
              project: t.config?.project,
              headers: t.config?.headers,
            }).languageModel(t.model)
          : Yg({
              name: t.model,
              apiKey: n,
              baseURL: r,
              fetch: t.fetch,
              headers: t.config?.headers,
            }).languageModel(t.model);
      if ("anthropic" == t.provider)
        return Hd({
          apiKey: n,
          baseURL: r,
          fetch: t.fetch,
          headers: t.config?.headers,
        }).languageModel(t.model);
      if ("google" == t.provider)
        return _p({
          apiKey: n,
          baseURL: r,
          fetch: t.fetch,
          headers: t.config?.headers,
        }).languageModel(t.model);
      if ("aws" == t.provider) {
        let e = n.split("=");
        return Rm({
          accessKeyId: e[0],
          secretAccessKey: e[1],
          baseURL: r,
          region: t.config?.region || "us-west-1",
          fetch: t.fetch,
          headers: t.config?.headers,
          sessionToken: t.config?.sessionToken,
        }).languageModel(t.model);
      }
      return "openai-compatible" == t.provider
        ? Yg({
            name: t.config?.name || t.model.split("/")[0],
            apiKey: n,
            baseURL: r || "https://openrouter.ai/api/v1",
            fetch: t.fetch,
            headers: t.config?.headers,
          }).languageModel(t.model)
        : "openrouter" == t.provider
          ? Ag({
              apiKey: n,
              baseURL: r || "https://openrouter.ai/api/v1",
              fetch: t.fetch,
              headers: t.config?.headers,
              compatibility: t.config?.compatibility,
            }).languageModel(t.model)
          : t.provider.languageModel(t.model);
    }
    streamWrapper(e, t, n) {
      let r = null;
      return new ReadableStream({
        start: (t) => {
          if (null != e && e.length > 0)
            for (let n = 0; n < e.length; n++) t.enqueue(e[n]);
        },
        pull: async (e) => {
          r = setTimeout(() => {
            n.abort("Streaming request timeout");
          }, this.stream_token_timeout);
          const { done: o, value: i } = await t.read();
          if ((clearTimeout(r), o)) return (e.close(), void t.releaseLock());
          e.enqueue(i);
        },
        cancel: (e) => {
          (r && clearTimeout(r), t.cancel(e));
        },
      });
    }
    get Llms() {
      return this.llms;
    }
    get Names() {
      return this.names;
    }
  }
  const If = [
    'User: Open Boss Zhipin, find 10 operation positions in Chengdu, and send a personal introduction to the recruiters based on the page information.\nOutput result:\n<root>\n  <name>Submit resume</name>\n  <thought>OK, now the user requests me to create a workflow that involves opening the Boss Zhipin website, finding 10 operation positions in Chengdu, and sending personal resumes to the recruiters based on the job information.</thought>\n  <agents>\n    <agent name="Browser" id="0" dependsOn="">\n      <task>Open Boss Zhipin, find 10 operation positions in Chengdu, and send a personal introduction to the recruiters based on the page information.</task>\n      <nodes>\n        <node>Open Boss Zhipin, enter the job search page</node>\n        <node>Set the regional filter to Chengdu and search for operational positions.</node>\n        <node>Brows the job list and filter out 10 suitable operation positions.</node>\n        <forEach items="list">\n          <node>Analyze job requirements</node>\n          <node>Send a self-introduction to the recruiter</node>\n        </forEach>\n      </nodes>\n    </agent>\n  </agents>\n</root>',
    'User: Help me collect the latest AI news, summarize it, and send it to the "AI news information" group chat on WeChat.\nOutput result:\n<root>\n  <name>Latest AI News</name>\n  <thought>OK, users need to collect the latest AI news, summarize it, and send it to a WeChat group named "AI news information" This requires automation, including the steps of data collection, processing, and distribution.</thought>\n  <agents>\n    <agent name="Browser" id="0" dependsOn="">\n      <task>Search for the latest updates on AI</task>\n      <nodes>\n        <node>Open Google</node>\n        <node>Search for the latest updates on AI</node>\n        <forEach items="list">\n          <node>View Details</node>\n        </forEach>\n        <node output="summaryInfo">Summarize search information</node>\n      </nodes>\n    </agent>\n    <agent name="Computer" id="1" dependsOn="0">\n      <task>Send a message to the WeChat group chat "AI news information"</task>\n      <nodes>\n        <node>Open WeChat</node>\n        <node>Search for the "AI news information" chat group</node>\n        <node input="summaryInfo">Send summary message</node>\n      </nodes>\n    </agent>\n  </agents>\n</root>',
    'User: Access the Google team\'s organization page on GitHub, extract all developer accounts from the team, and compile statistics on the countries and regions where these developers are located.\nOutput result:\n<root>\n  <name>Statistics of Google Team Developers\' Geographic Distribution</name>\n  <thought>Okay, I need to first visit GitHub, then find Google\'s organization page on GitHub, extract the team member list, and individually visit each developer\'s homepage to obtain location information for each developer. This requires using a browser to complete all operations.</thought>\n  <agents>\n    <agent name="Browser" id="0" dependsOn="">\n      <task>Visit Google GitHub Organization Page and Analyze Developer Geographic Distribution</task>\n      <nodes>\n        <node>Visit https://github.com/google</node>\n        <node>Click "People" tab to view team members</node>\n        <node>Scroll the page to load all developer information</node>\n        <node output="developers">Extract all developer account information</node>\n        <forEach items="developers">\n          <node>Visit developer\'s homepage</node>\n          <node>Extract developer\'s location information</node>\n        </forEach>\n        <node>Compile and analyze the geographic distribution data of all developers</node>\n      </nodes>\n    </agent>\n  </agents>\n</root>',
    'User: Open Discord to monitor messages in Group A, and automatically reply when new messages are received.\nOutput result:\n<root>\n  <name>Automatic reply to Discord messages</name>\n  <thought>OK, monitor the chat messages in Discord group A and automatically reply.</thought>\n  <agents>\n    <agent name="Browser" id="0" dependsOn="">\n      <task>Open Group A in Discord</task>\n      <nodes>\n        <node>Open Discord page</node>\n        <node>Find and open Group A</node>\n        <watch event="dom" loop="true">\n          <description>Monitor new messages in group chat</description>\n          <trigger>\n            <node>Analyze message content</node>\n            <node>Automatic reply to new messages</node>\n          </trigger>\n        </watch>\n      </nodes>\n    </agent>\n  </agents>\n</root>',
    'User: Search for information about "fellou," compile the results into a summary profile, then share it across social media platforms including Twitter, Facebook, and Reddit. Finally, export the platform sharing operation results to an Excel file.\nOutput result:\n<root>\n<name>Fellou Research and Social Media Campaign</name>\n<thought>The user wants me to research information about \'Fellou\', create a summary profile, share it on multiple social media platforms (Twitter, Facebook, Reddit), and then compile the results into an Excel file. This requires multiple agents working together: Browser for research, Browser for social media posting (Twitter, Facebook, and Reddit in parallel), and File for creating the Excel export. I need to break this down into sequential steps with proper variable passing between agents.</thought>\n<agents>\n  <agent name="Browser" id="0" dependsOn="">\n      <task>Research comprehensive information about \'Fellou\'</task>\n      <nodes>\n        <node>Search for the latest information about \'Fellou\' - its identity, purpose, and core features</node>\n        <node>Search for Fellou\'s functionalities, capabilities, and technical specifications</node>\n        <node>Search for recent news, updates, announcements, and developments related to Fellou</node>\n        <node>Search for user reviews, feedback, and community discussions about Fellou</node>\n        <node>Search for Fellou\'s market position, competitors, and industry context</node>\n        <node output="researchData">Compile all research findings into a comprehensive summary profile</node>\n      </nodes>\n    </agent>\n    <agent name="Browser" id="1" dependsOn="0">\n      <task>Share Fellou\'s summary and collected interaction data on Twitter/X</task>\n      <nodes>\n        <node>Navigate to Twitter/X platform</node>\n        <node input="researchData">Create and post Twitter-optimized content about Fellou (within character limits, using hashtags)</node>\n        <node output="twitterResults">Capture Twitter post URL and initial engagement metrics</node>\n      </nodes>\n    </agent>\n    <agent name="Browser" id="2" dependsOn="0">\n      <task>Share Fellou\'s summary and collected interaction data on Facebook</task>\n      <nodes>\n        <node>Navigate to Facebook platform</node>\n        <node input="researchData">Create and post Facebook-optimized content about Fellou (longer format, engaging description)</node>\n        <node output="facebookResults">Capture Facebook post URL and initial engagement metrics</node>\n      </nodes>\n    </agent>\n    <agent name="Browser" id="3" dependsOn="0">\n      <task>Share Fellou\'s summary and collected interaction data on Reddit</task>\n      <nodes>\n        <node>Navigate to Reddit platform</node>\n        <node input="researchData">Find appropriate subreddit and create Reddit-optimized post about Fellou (community-focused, informative)</node>\n        <node output="redditResults">Capture Reddit post URL and initial engagement metrics</node>\n      </nodes>\n    </agent>\n    <agent name="File" id="4" dependsOn="1,2,3">\n      <task>Compile social media results into Excel file</task>\n      <nodes>\n        <node input="twitterResults,facebookResults,redditResults">Create Excel file with social media campaign results</node>\n        <node>Include columns for Platform, Post URL, Content Summary, Timestamp, Initial Likes/Shares/Comments</node>\n        <node>Format the Excel file with proper headers and styling</node>\n        <node>Save the file as \'Fellou_Social_Media_Campaign_Results.xlsx\'</node>\n      </nodes>\n    </agent>\n  </agents>\n</agents>\n</root>',
  ];
  async function Sf(e) {
    let t = "",
      n = e.agents;
    for (let r = 0; r < n.length; r++) {
      let o = n[r],
        i = await o.loadTools(e);
      t +=
        `<agent name="${o.Name}">\nDescription: ${o.PlanDescription || o.Description}\nTools:\n` +
        i
          .filter((e) => !e.noPlan)
          .map(
            (e) => `  - ${e.name}: ${e.planDescription || e.description || ""}`,
          )
          .join("\n") +
        "\n</agent>\n\n";
    }
    let r = e.variables.get("plan_example_list") || If,
      o = "";
    const i =
      e.agents.filter((e) => "Chat" == e.Name).length > 0
        ? [
            'User: hello.\nOutput result:\n<root>\n  <name>Chat</name>\n  <thought>Alright, the user wrote "hello". That\'s pretty straightforward. I need to respond in a friendly and welcoming manner.</thought>\n  <agents>\n    \x3c!-- Chat agents can exist without the <task> and <nodes> nodes. --\x3e\n    <agent name="Chat" id="0" dependsOn=""></agent>\n  </agents>\n</root>',
            ...r,
          ]
        : [...r];
    for (let e = 0; e < i.length; e++) o += `## Example ${e + 1}\n${i[e]}\n\n`;
    return '\nYou are {name}, an autonomous AI Agent Planner.\n\n## Task Description\nYour task is to understand the user\'s requirements, dynamically plan the user\'s tasks based on the Agent list, and please follow the steps below:\n1. Understand the user\'s requirements.\n2. Analyze the Agents that need to be used based on the user\'s requirements.\n3. Generate the Agent calling plan based on the analysis results.\n4. About agent name, please do not arbitrarily fabricate non-existent agent names.\n5. You only need to provide the steps to complete the user\'s task, key steps only, no need to be too detailed.\n6. Please strictly follow the output format and example output.\n7. The output language should follow the language corresponding to the user\'s task.\n\n## Agent list\n{agents}\n\n## Output Rules and Format\n<root>\n  \x3c!-- Task Name (Short) --\x3e\n  <name>Task Name</name>\n  \x3c!-- Need to break down the task into multi-agent collaboration. Please think step by step and output a detailed thought process. --\x3e\n  <thought>Your thought process on user demand planning</thought>\n  \x3c!-- Multiple Agents work together to complete the task --\x3e\n  <agents>\n    \x3c!--\n    Multi-Agent supports parallelism, coordinating parallel tasks through dependencies, and passing dependent context information through node variables.\n    name: The name of the Agent, where the name can only be an available name in the Agent list.\n    id: Use subscript order as ID for dependency relationships between multiple agents.\n    dependsOn: The IDs of agents that the current agent depends on, separated by commas when there are multiple dependencies.\n    --\x3e\n    <agent name="Agent name" id="0" dependsOn="">\n      \x3c!-- The current Agent needs to complete the task --\x3e\n      <task>current agent task</task>\n      <nodes>\n        \x3c!-- Nodes support input/output variables for parameter passing and dependency handling in multi-agent collaboration. --\x3e\n        <node>Complete the corresponding step nodes of the task</node>\n        <node input="variable name">...</node>\n        <node output="variable name">...</node>\n        \x3c!-- When including duplicate tasks, `forEach` can be used --\x3e\n        <forEach items="list or variable name">\n          <node>forEach step node</node>\n        </forEach>\n        \x3c!-- When you need to monitor changes in webpage DOM elements, you can use `Watch`, the loop attribute specifies whether to listen in a loop or listen once. --\x3e\n        <watch event="dom" loop="true">\n          <description>Monitor task description</description>\n          <trigger>\n            <node>Trigger step node</node>\n            <node>...</node>\n          </trigger>\n        </watch>\n      </nodes>\n    </agent>\n    \x3c!--\n    Multi-agent Collaboration Dependency Example:\n\n    Execution Flow:\n    1. Agent 0: Initial agent with no dependencies (executes first)\n    2. Agent 1: Depends on Agent 0 completion (executes after Agent 0)\n    3. Agent 2 & 3: Both depend on Agent 1 completion (execute in parallel after Agent 1)\n    4. Agent 4: Depends on both Agent 2 and Agent 3 completion (executes last)\n\n    Dependency Chain: Agent 0 → Agent 1 → (Agent 2 ∥ Agent 3) → Agent 4\n    --\x3e\n    <agent name="Agent name" id="0" dependsOn="">...</agent>\n    <agent name="Agent name" id="1" dependsOn="0">...</agent>\n    <agent name="Agent name" id="2" dependsOn="1">...</agent>\n    <agent name="Agent name" id="3" dependsOn="1">...</agent>\n    <agent name="Agent name" id="4" dependsOn="2,3">...</agent>\n  </agents>\n</root>\n\n{example_prompt}\n'
      .replace("{name}", "Eko")
      .replace("{agents}", t.trim())
      .replace("{example_prompt}", o)
      .trim();
  }
  function Tf(t, n, r) {
    let o = "";
    return (
      (o = n
        ? "\nUser Platform: {platform}\nTask Website: {task_website}\nCurrent datetime: {datetime}\nTask Description: {task_prompt}\n".replace(
            "{task_website}",
            n,
          )
        : "\nUser Platform: {platform}\nCurrent datetime: {datetime}\nTask Description: {task_prompt}\n"),
      (o = o
        .replace("{task_prompt}", t)
        .replace("{platform}", e)
        .replace("{datetime}", new Date().toLocaleString())
        .trim()),
      r && (o += `\n${r.trim()}`),
      o
    );
  }
  class Nf {
    constructor(e, t) {
      ((this.context = e),
        (this.taskId = e.taskId),
        (this.callback = t || e.config.callback));
    }
    async plan(e, t = !0) {
      let n, r;
      "string" == typeof e
        ? ((n = e),
          (r = {
            type: "text",
            text: Tf(
              e,
              this.context.variables.get("task_website"),
              this.context.variables.get("plan_ext_prompt"),
            ),
          }))
        : ((r = e), (n = e.text || ""));
      const o = [
        {
          role: "system",
          content:
            this.context.variables.get("plan_sys_prompt") ||
            (await Sf(this.context)),
        },
        { role: "user", content: [r] },
      ];
      return await this.doPlan(n, o, t);
    }
    async replan(e, t = !0) {
      const n = this.context.chain;
      if (n.planRequest && n.planResult) {
        const r = [
          ...n.planRequest.messages,
          {
            role: "assistant",
            content: [{ type: "text", text: n.planResult }],
          },
          { role: "user", content: [{ type: "text", text: e }] },
        ];
        return await this.doPlan(e, r, t);
      }
      return this.plan(e, t);
    }
    async doPlan(e, t, n) {
      const r = this.context.config,
        i = new $f(r.llms, r.planLlms),
        a = {
          maxTokens: 4096,
          temperature: 0.7,
          messages: t,
          abortSignal: this.context.controller.signal,
        },
        s = (await i.callStream(a)).stream.getReader();
      let l = "",
        u = "";
      try {
        for (;;) {
          await this.context.checkAborted(!0);
          const { done: e, value: t } = await s.read();
          if (e) break;
          let n = t;
          if ("error" == n.type)
            throw (
              o.error("Plan, LLM Error: ", n),
              new Error("LLM Error: " + n.error)
            );
          if (
            ("reasoning-delta" == n.type && (u += n.delta || ""),
            "text-delta" == n.type && (l += n.delta || ""),
            this.callback)
          ) {
            let e = pf(this.taskId, l, !1, u);
            e &&
              (await this.callback.onMessage({
                taskId: this.taskId,
                agentName: "Planer",
                type: "workflow",
                streamDone: !1,
                workflow: e,
              }));
          }
        }
      } finally {
        (s.releaseLock(), o.isEnableInfo() && o.info("Planner result: \n" + l));
      }
      if (n) {
        const e = this.context.chain;
        ((e.planRequest = a), (e.planResult = l));
      }
      let c = pf(this.taskId, l, !0, u);
      return (
        this.callback &&
          (await this.callback.onMessage({
            taskId: this.taskId,
            agentName: "Planer",
            type: "workflow",
            streamDone: !0,
            workflow: c,
          })),
        c.taskPrompt
          ? (c.taskPrompt += "\n" + e.trim())
          : (c.taskPrompt = e.trim()),
        c
      );
    }
  }
  class Of {
    constructor(e, t, n, r) {
      ((this.conversation = []),
        (this.pauseStatus = 0),
        (this.currentStepControllers = new Set()),
        (this.taskId = e),
        (this.config = t),
        (this.agents = n),
        (this.chain = r),
        (this.variables = new Map()),
        (this.controller = new AbortController()));
    }
    async checkAborted(e) {
      if (this.controller.signal.aborted) {
        const e = new Error("Operation was interrupted");
        throw ((e.name = "AbortError"), e);
      }
      for (; this.pauseStatus > 0 && !e; )
        if (
          (await gd(500),
          2 == this.pauseStatus &&
            (this.currentStepControllers.forEach((e) => {
              e.abort("Pause");
            }),
            this.currentStepControllers.clear()),
          this.controller.signal.aborted)
        ) {
          const e = new Error("Operation was interrupted");
          throw ((e.name = "AbortError"), e);
        }
    }
    currentAgent() {
      const e = this.chain.agents[this.chain.agents.length - 1];
      if (!e) return null;
      const t = this.agents.filter((t) => t.Name == e.agent.name)[0];
      if (!t) return null;
      const n = t.AgentContext;
      return [t, e.agent, n];
    }
    get pause() {
      return this.pauseStatus > 0;
    }
    setPause(e, t) {
      ((this.pauseStatus = e ? (t ? 2 : 1) : 0),
        2 == this.pauseStatus &&
          (this.currentStepControllers.forEach((e) => {
            e.abort("Pause");
          }),
          this.currentStepControllers.clear()));
    }
  }
  class Ef {
    constructor(e, t, n) {
      ((this.context = e),
        (this.agent = t),
        (this.agentChain = n),
        (this.variables = new Map()),
        (this.consecutiveErrorNum = 0));
    }
  }
  class Af {
    constructor(e, t) {
      ((this.toolName = e.toolName),
        (this.toolCallId = e.toolCallId),
        (this.request = JSON.parse(JSON.stringify(t))));
    }
    updateParams(e) {
      ((this.params = e), this.onUpdate && this.onUpdate());
    }
    updateToolResult(e) {
      ((this.toolResult = e), this.onUpdate && this.onUpdate());
    }
  }
  class Uf {
    constructor(e) {
      ((this.tools = []), (this.agent = e));
    }
    push(e) {
      ((e.onUpdate = () => {
        this.onUpdate && this.onUpdate({ type: "update", target: e });
      }),
        this.tools.push(e),
        this.onUpdate && this.onUpdate({ type: "update", target: this }));
    }
  }
  class Cf {
    constructor(e) {
      ((this.agents = []), (this.listeners = []), (this.taskPrompt = e));
    }
    push(e) {
      ((e.onUpdate = (e) => {
        this.pub(e);
      }),
        this.agents.push(e),
        this.pub({ type: "update", target: e }));
    }
    pub(e) {
      this.listeners.forEach((t) => t(this, e));
    }
    addListener(e) {
      this.listeners.push(e);
    }
    removeListener(e) {
      this.listeners = this.listeners.filter((t) => t !== e);
    }
  }
  class Pf {
    constructor(e) {
      ((this.config = e), (this.taskMap = new Map()));
    }
    async generate(e, t = fd(), n) {
      const r = [...(this.config.agents || [])],
        o = new Cf(e),
        i = new Of(t, this.config, r, o);
      n && Object.keys(n).forEach((e) => i.variables.set(e, n[e]));
      try {
        if ((this.taskMap.set(t, i), this.config.a2aClient)) {
          const t = await this.config.a2aClient.listAgents(e);
          i.agents = wd(i.agents, t);
        }
        const n = new Nf(i);
        return ((i.workflow = await n.plan(e)), i.workflow);
      } catch (e) {
        throw (this.deleteTask(t), e);
      }
    }
    async modify(e, t) {
      const n = this.taskMap.get(e);
      if (!n) return await this.generate(t, e);
      if (this.config.a2aClient) {
        const e = await this.config.a2aClient.listAgents(t);
        n.agents = wd(n.agents, e);
      }
      const r = new Nf(n);
      return ((n.workflow = await r.replan(t)), n.workflow);
    }
    async execute(e) {
      const t = this.getTask(e);
      if (!t) throw new Error("The task does not exist");
      (t.pause && t.setPause(!1),
        (t.conversation = []),
        t.controller.signal.aborted && (t.controller = new AbortController()));
      try {
        return await this.doRunWorkflow(t);
      } catch (t) {
        return (
          o.error("execute error", t),
          {
            taskId: e,
            success: !1,
            stopReason: "AbortError" == t?.name ? "abort" : "error",
            result: t ? t.name + ": " + t.message : "Error",
            error: t,
          }
        );
      }
    }
    async run(e, t = fd(), n) {
      return (await this.generate(e, t, n), await this.execute(t));
    }
    async initContext(e, t) {
      const n = this.config.agents || [],
        r = new Cf(e.taskPrompt || e.name),
        o = new Of(e.taskId, this.config, n, r);
      if (this.config.a2aClient) {
        const t = await this.config.a2aClient.listAgents(
          e.taskPrompt || e.name,
        );
        o.agents = wd(o.agents, t);
      }
      return (
        t && Object.keys(t).forEach((e) => o.variables.set(e, t[e])),
        (o.workflow = e),
        this.taskMap.set(e.taskId, o),
        o
      );
    }
    async doRunWorkflow(e) {
      const t = e.agents,
        n = e.workflow;
      if (!n || 0 == n.agents.length) throw new Error("Workflow error");
      const r = t.reduce((e, t) => ((e[t.Name] = t), e), {});
      let o = df(n.agents);
      const i = [];
      for (;;) {
        if ((await e.checkAborted(), "normal" === o.type)) {
          const t = r[o.agent.name];
          if (!t) throw new Error("Unknown Agent: " + o.agent.name);
          const n = o.agent,
            a = new Uf(n);
          (e.chain.push(a),
            (o.result = await this.runAgent(e, t, o, a)),
            i.push(o.result));
        } else {
          const t = o.agents,
            n = async (t, n) => {
              const o = r[t.agent.name];
              if (!o) throw new Error("Unknown Agent: " + t.agent.name);
              const i = new Uf(t.agent);
              return (
                e.chain.push(i),
                {
                  result: await this.runAgent(e, o, t, i),
                  agentChain: i,
                  index: n,
                }
              );
            };
          let a = [],
            s = e.variables.get("agentParallel");
          if ((void 0 === s && (s = false), s)) {
            const r = await Promise.all(t.map((e, t) => n(e, t)));
            (r.sort((e, t) => e.index - t.index),
              r.forEach(({ agentChain: t }) => {
                e.chain.push(t);
              }),
              (a = r.map(({ result: e }) => e)));
          } else
            for (let r = 0; r < t.length; r++) {
              const { result: o, agentChain: i } = await n(t[r], r);
              (e.chain.push(i), a.push(o));
            }
          i.push(a.join("\n\n"));
        }
        if ((e.conversation.splice(0, e.conversation.length), !o.nextAgent))
          break;
        o = o.nextAgent;
      }
      return {
        success: !0,
        stopReason: "done",
        taskId: e.taskId,
        result: i[i.length - 1] || "",
      };
    }
    async runAgent(e, t, n, r) {
      try {
        return (
          (n.agent.status = "running"),
          this.config.callback &&
            (await this.config.callback.onMessage({
              taskId: e.taskId,
              agentName: n.agent.name,
              nodeId: n.agent.id,
              type: "agent_start",
              agentNode: n.agent,
            })),
          (n.result = await t.run(e, r)),
          (n.agent.status = "done"),
          this.config.callback &&
            (await this.config.callback.onMessage(
              {
                taskId: e.taskId,
                agentName: n.agent.name,
                nodeId: n.agent.id,
                type: "agent_result",
                agentNode: n.agent,
                result: n.result,
              },
              t.AgentContext,
            )),
          n.result
        );
      } catch (r) {
        throw (
          (n.agent.status = "error"),
          this.config.callback &&
            (await this.config.callback.onMessage(
              {
                taskId: e.taskId,
                agentName: n.agent.name,
                nodeId: n.agent.id,
                type: "agent_result",
                agentNode: n.agent,
                error: r,
              },
              t.AgentContext,
            )),
          r
        );
      }
    }
    getTask(e) {
      return this.taskMap.get(e);
    }
    getAllTaskId() {
      return [...this.taskMap.keys()];
    }
    deleteTask(e) {
      this.abortTask(e);
      const t = this.taskMap.get(e);
      return (t && t.variables.clear(), this.taskMap.delete(e));
    }
    abortTask(e, t) {
      let n = this.taskMap.get(e);
      return (
        !!n &&
        (n.setPause(!1),
        this.onTaskStatus(n, "abort", t),
        n.controller.abort(t),
        !0)
      );
    }
    pauseTask(e, t, n, r) {
      const o = this.taskMap.get(e);
      return (
        !!o &&
        (this.onTaskStatus(o, t ? "pause" : "resume-pause", r),
        o.setPause(t, n),
        !0)
      );
    }
    chatTask(e, t) {
      const n = this.taskMap.get(e);
      if (n) return (n.conversation.push(t), n.conversation);
    }
    addAgent(e) {
      ((this.config.agents = this.config.agents || []),
        this.config.agents.push(e));
    }
    async onTaskStatus(e, t, n) {
      const [r] = e.currentAgent() || [];
      if (r) {
        const e = r.onTaskStatus;
        e && (await e.call(r, t, n));
      }
    }
    async continueExecution(workflow) {
      try {
        chrome.runtime.sendMessage({ type: "log", log: "Continuing execution with confirmed workflow..." });
        const taskId = workflow.taskId;
        if (!taskId) {
          throw new Error("No taskId found in workflow");
        }
        const result = await this.execute(taskId);
        chrome.runtime.sendMessage({ type: "log", log: result.success ? "Execution completed successfully" : "Execution failed: " + result.result });
        chrome.storage.local.set({ running: false });
        chrome.runtime.sendMessage({ type: "stop" });
        // 确保UI状态正确重置
        chrome.runtime.sendMessage({ type: "execution_finished", success: result.success, result: result.result });
      } catch (error) {
        chrome.runtime.sendMessage({ type: "log", log: "Execution error: " + error.message, level: "error" });
        chrome.storage.local.set({ running: false });
        chrome.runtime.sendMessage({ type: "stop" });
        // 确保UI状态正确重置
        chrome.runtime.sendMessage({ type: "execution_finished", success: false, result: error.message });
      }
    }
    async updateWorkflow(workflow) {
      try {
        chrome.runtime.sendMessage({ type: "log", log: "Applying workflow modifications..." });
        const taskId = workflow.taskId;
        if (!taskId) {
          throw new Error("No taskId found in workflow");
        }
        // 更新任务的工作流程
        const task = this.getTask(taskId);
        if (task) {
          task.workflow = workflow;
          chrome.runtime.sendMessage({ type: "log", log: "Workflow updated. Starting execution..." });
          const result = await this.execute(taskId);
          chrome.runtime.sendMessage({ type: "log", log: result.success ? "Execution completed successfully" : "Execution failed: " + result.result });
          // 确保UI状态正确重置
          chrome.runtime.sendMessage({ type: "execution_finished", success: result.success, result: result.result });
        } else {
          throw new Error("Task not found for taskId: " + taskId);
        }
        chrome.storage.local.set({ running: false });
        chrome.runtime.sendMessage({ type: "stop" });
      } catch (error) {
        chrome.runtime.sendMessage({ type: "log", log: "Update workflow error: " + error.message, level: "error" });
        chrome.storage.local.set({ running: false });
        chrome.runtime.sendMessage({ type: "stop" });
        // 确保UI状态正确重置
        chrome.runtime.sendMessage({ type: "execution_finished", success: false, result: error.message });
      }
    }
  }
  class Df {
    constructor(e, t) {
      var n;
      ((this.tool =
        "function" in (n = e)
          ? {
              type: "function",
              name: n.function.name,
              description: n.function.description,
              inputSchema: n.function.parameters,
            }
          : "input_schema" in n
            ? {
                type: "function",
                name: n.name,
                description: n.description,
                inputSchema: n.input_schema,
              }
            : "inputSchema" in n
              ? {
                  type: "function",
                  name: n.name,
                  description: n.description,
                  inputSchema: n.inputSchema,
                }
              : {
                  type: "function",
                  name: n.name,
                  description: n.description,
                  inputSchema: n.parameters,
                }),
        (this.execute = t));
    }
    get name() {
      return this.tool.name;
    }
    getTool() {
      return this.tool;
    }
    async callTool(e, t, n) {
      return await this.execute.execute(e, t, n);
    }
  }
  const jf = "foreach_task";
  class zf {
    constructor() {
      ((this.name = jf),
        (this.description =
          "When executing the `forEach` node, please use the current tool for counting to ensure tasks are executed sequentially, the tool needs to be called with each loop iteration."),
        (this.parameters = {
          type: "object",
          properties: {
            nodeId: { type: "number", description: "forEach node ID." },
            progress: {
              type: "string",
              description: "Current execution progress.",
            },
            next_step: {
              type: "string",
              description: "Next task description.",
            },
          },
          required: ["nodeId", "progress", "next_step"],
        }));
    }
    async execute(e, t) {
      let n = e.nodeId,
        r = ff(t.agentChain.agent.xml, n);
      if (null == r) throw new Error("Node ID does not exist: " + n);
      if ("forEach" !== r.tagName)
        throw new Error("Node ID is not a forEach node: " + n);
      let o = r.getAttribute("items"),
        i = null,
        a = "Recorded";
      if (o && "list" != o && ((i = t.context.variables.get(o.trim())), i)) {
        let e = "foreach_" + n,
          r = t.variables.get(e) || 0;
        (r % 5 == 0 &&
          (a = `Variable information associated with the current loop task.\nvariable_name: ${o.trim()}\nvariable_value: ${i}`),
          t.variables.set(e, ++r));
      }
      return { content: [{ type: "text", text: a }] };
    }
  }
  const Rf = "human_interact",
    Mf = "variable_storage";
  class qf {
    constructor() {
      ((this.name = Mf),
        (this.description =
          "Used for storing, reading, and retrieving variable data, and maintaining input/output variables in task nodes."),
        (this.parameters = {
          type: "object",
          properties: {
            operation: {
              type: "string",
              description: "variable storage operation type.",
              enum: ["read_variable", "write_variable", "list_all_variable"],
            },
            name: {
              type: "string",
              description:
                "variable name, required when reading and writing variables, If reading variables, it supports reading multiple variables separated by commas.",
            },
            value: {
              type: "string",
              description: "variable value, required when writing variables",
            },
          },
          required: ["operation"],
        }));
    }
    async execute(e, t) {
      let n = "";
      switch (e.operation) {
        case "read_variable":
          if (e.name) {
            let r = {},
              o = e.name.split(",");
            for (let e = 0; e < o.length; e++) {
              let n = o[e].trim(),
                i = t.context.variables.get(n);
              r[n] = i;
            }
            n = JSON.stringify(r);
          } else n = "Error: name is required";
          break;
        case "write_variable": {
          if (!e.name) {
            n = "Error: name is required";
            break;
          }
          if (null == e.value) {
            n = "Error: value is required";
            break;
          }
          let r = e.name;
          (t.context.variables.set(r.trim(), e.value), (n = "success"));
          break;
        }
        case "list_all_variable":
          n = JSON.stringify([...t.context.variables.keys()]);
      }
      return { content: [{ type: "text", text: n || "" }] };
    }
  }
  const Zf = "watch_trigger";
  class Lf {
    constructor() {
      ((this.name = Zf),
        (this.description =
          "When executing the `watch` node, please use it to monitor DOM element changes, it will block the listener until the element changes or times out."),
        (this.parameters = {
          type: "object",
          properties: {
            nodeId: { type: "number", description: "watch node ID." },
            watch_area: {
              type: "array",
              description:
                "Element changes in monitoring area, eg: [x, y, width, height].",
              items: { type: "number" },
            },
            watch_index: {
              type: "array",
              description:
                "The index of elements to be monitoring multiple elements simultaneously.",
              items: { type: "number" },
            },
            frequency: {
              type: "number",
              description:
                "Check frequency, how many seconds between each check, default 1 seconds.",
              default: 1,
              minimum: 0.5,
              maximum: 30,
            },
            timeout: {
              type: "number",
              description: "Timeout in minute, default 5 minutes.",
              default: 5,
              minimum: 1,
              maximum: 30,
            },
          },
          required: ["nodeId"],
        }));
    }
    async execute(e, t) {
      let n = e.nodeId,
        r = ff(t.agentChain.agent.xml, n);
      if (null == r) throw new Error("Node ID does not exist: " + n);
      if ("watch" !== r.tagName)
        throw new Error("Node ID is not a watch node: " + n);
      let o = r.getElementsByTagName("description")[0]?.textContent || "";
      if (!o)
        return {
          content: [
            {
              type: "text",
              text: "The watch node does not have a description, skip.",
            },
          ],
        };
      await this.init_eko_observer(t);
      const i = await this.get_screenshot(t),
        a = new Date().getTime(),
        s = 6e4 * (e.timeout || 5),
        l = Math.max(500, 1e3 * (e.frequency || 1));
      let u = new $f(t.context.config.llms, t.agent.Llms);
      for (; new Date().getTime() - a < s; ) {
        if (
          (await t.context.checkAborted(),
          await new Promise((e) => setTimeout(e, l)),
          "false" == (await this.has_eko_changed(t)))
        )
          continue;
        await this.init_eko_observer(t);
        const e = await this.get_screenshot(t),
          n = await this.is_dom_change(t, u, i, e, o);
        if (n.changed)
          return {
            content: [
              { type: "text", text: n.changeInfo || "DOM change detected." },
            ],
          };
      }
      return {
        content: [
          { type: "text", text: "Timeout reached, no DOM changes detected." },
        ],
      };
    }
    async get_screenshot(e) {
      const t = e.agent.screenshot,
        n = await t.call(e.agent, e);
      return { image: yd(n.imageBase64), imageType: n.imageType };
    }
    async init_eko_observer(e) {
      try {
        const t = e.agent.execute_script;
        await t.call(
          e.agent,
          e,
          () => {
            let e = window;
            ((e.has_eko_changed = !1),
              e.eko_observer && e.eko_observer.disconnect());
            let t = new MutationObserver(function (t) {
              e.has_eko_changed = !0;
            });
            (t.observe(document.body, {
              childList: !0,
              subtree: !0,
              attributes: !0,
              attributeOldValue: !0,
              characterData: !0,
              characterDataOldValue: !0,
            }),
              (e.eko_observer = t));
          },
          [],
        );
      } catch (e) {
        console.error("Error initializing Eko observer:", e);
      }
    }
    async has_eko_changed(e) {
      try {
        const t = e.agent.execute_script;
        return await t.call(e.agent, e, () => window.has_eko_changed + "", []);
      } catch (e) {
        return (console.error("Error checking Eko change:", e), "undefined");
      }
    }
    async is_dom_change(e, t, n, r, i) {
      try {
        let o = {
            messages: [
              {
                role: "system",
                content:
                  'You are a tool for detecting element changes. Given a task description, compare two images to determine whether the changes described in the task have occurred.\nIf the changes have occurred, return an json with `changed` set to true and `changeInfo` containing a description of the changes. If no changes have occurred, return an object with `changed` set to false.\n\n## Example\nUser: Monitor new messages in group chat\n### No changes detected\nOutput:\n{\n  "changed": false\n}\n### Change detected\nOutput:\n{\n  "changed": true,\n  "changeInfo": "New message received in the group chat. The message content is: \'Hello, how are you?\'"\n}',
              },
              {
                role: "user",
                content: [
                  { type: "file", data: n.image, mediaType: n.imageType },
                  { type: "file", data: r.image, mediaType: r.imageType },
                  { type: "text", text: i },
                ],
              },
            ],
            abortSignal: e.context.controller.signal,
          },
          a = (await t.call(o)).text || "{}";
        return (
          (a = a.substring(a.indexOf("{"), a.lastIndexOf("}") + 1)),
          JSON.parse(a)
        );
      } catch (e) {
        o.error("Error in is_dom_change:", e);
      }
      return { changed: !1 };
    }
  }
  class Ff {
    constructor(e) {
      ((this.toolWrapper = e),
        (this.name = e.name),
        (this.description = e.getTool().description),
        (this.parameters = e.getTool().inputSchema));
    }
    async execute(e, t, n) {
      return this.toolWrapper.callTool(e, t, n);
    }
  }
  const Bf = `\n* HUMAN INTERACT\nDuring the task execution process, you can use the \`${Rf}\` tool to interact with humans, please call it in the following situations:\n- When performing dangerous operations such as deleting files, confirmation from humans is required.\n- When encountering obstacles while accessing websites, such as requiring user login, captcha verification, QR code scanning, or human verification, you need to request manual assistance.\n- Please do not use the \`${Rf}\` tool frequently.\n`,
    Wf = `\n* VARIABLE STORAGE\nWhen a step node has input/output variable attributes, use the \`${Mf}\` tool to read from and write to these variables, these variables enable context sharing and coordination between multiple agents.\n`,
    Hf = `\n* forEach node\nrepetitive tasks, when executing to the forEach node, require the use of the \`${jf}\` tool.\n`,
    Vf = `\n* watch node\nmonitor changes in webpage DOM elements, when executing to the watch node, require the use of the \`${Zf}\` tool.\n`;
  function Jf(e, t, n, r) {
    let o =
      (r || e.Tools).filter((e) => "task_node_status" == e.name).length > 0;
    return gf(t.xml, n.chain.taskPrompt, (e, t) => {
      o && t.setAttribute("status", "todo");
    });
  }
  class Kf {
    constructor(e) {
      ((this.tools = []),
        (this.name = e.name),
        (this.description = e.description),
        (this.tools = e.tools),
        (this.llms = e.llms),
        (this.mcpClient = e.mcpClient),
        (this.planDescription = e.planDescription),
        (this.requestHandler = e.requestHandler));
    }
    async run(e, t) {
      let n = this.mcpClient || e.config.defaultMcpClient,
        r = new Ef(e, this, t);
      try {
        return (
          (this.agentContext = r),
          n && !n.isConnected() && (await n.connect(e.controller.signal)),
          this.runWithContext(r, n, 500)
        );
      } finally {
        n && (await n.close());
      }
    }
    async runWithContext(e, t, n = 100, r = []) {
      let o = 0;
      this.agentContext = e;
      const i = e.context,
        a = e.agentChain.agent,
        s = [...this.tools, ...this.system_auto_tools(a)],
        l = [
          {
            role: "system",
            content: await this.buildSystemPrompt(e, s),
            providerOptions: {
              anthropic: { cacheControl: { type: "ephemeral" } },
              bedrock: { cachePoint: { type: "default" } },
              openrouter: { cacheControl: { type: "ephemeral" } },
            },
          },
          ...r,
          {
            role: "user",
            content: await this.buildUserPrompt(e, s),
            providerOptions: {
              anthropic: { cacheControl: { type: "ephemeral" } },
              bedrock: { cachePoint: { type: "default" } },
              openrouter: { cacheControl: { type: "ephemeral" } },
            },
          },
        ];
      e.messages = l;
      const u = new $f(i.config.llms, this.llms);
      let c = s;
      for (; o < n; ) {
        if ((await i.checkAborted(), t)) {
          const n = await this.controlMcpTools(e, l, o);
          if (n.mcpTools) {
            const e = await this.listTools(i, t, a, n.mcpParams),
              r = _d(s, yf(l, c));
            c = _d(r, e);
          }
        }
        await this.handleMessages(e, l, s);
        const n = await xf(
            e,
            u,
            l,
            _f(c),
            !1,
            void 0,
            0,
            this.callback,
            this.requestHandler,
          ),
          r = await this.handleCallResult(e, l, c, n);
        if (r) return r;
        o++;
      }
      return "Unfinished";
    }
    async handleCallResult(e, t, n, r) {
      const i = e.variables.get("forceStop");
      if (i) return i;
      let a = null,
        s = e.context,
        l = [],
        u = [];
      if (
        0 ==
        (r = (function (e) {
          if (
            e.length <= 1 ||
            e.filter((e) => "tool-call" == e.type).length <= 1
          )
            return e;
          let t = [],
            n = [];
          for (let r = 0; r < e.length; r++)
            if ("tool-call" === e[r].type) {
              let o = e[r],
                i = o.toolName + o.input;
              -1 == n.indexOf(i) && (t.push(e[r]), n.push(i));
            } else t.push(e[r]);
          return t;
        })(r)).length
      )
        return null;
      for (let t = 0; t < r.length; t++) {
        let i,
          l = r[t];
        if ("text" == l.type) {
          a = l.text;
          continue;
        }
        let c = new Af(l, e.agentChain.agentRequest);
        e.agentChain.push(c);
        try {
          let t =
            "string" == typeof l.input
              ? JSON.parse(l.input || "{}")
              : l.input || {};
          c.params = t;
          let r = wf(n, l.toolName);
          if (!r) throw new Error(l.toolName + " tool does not exist");
          ((i = await r.execute(t, e, l)),
            c.updateToolResult(i),
            (e.consecutiveErrorNum = 0));
        } catch (t) {
          if (
            (o.error("tool call error: ", l.toolName, l.input, t),
            (i = { content: [{ type: "text", text: t + "" }], isError: !0 }),
            c.updateToolResult(i),
            ++e.consecutiveErrorNum >= 10)
          )
            throw t;
        }
        const d = this.callback || s.config.callback;
        d &&
          (await d.onMessage(
            {
              taskId: s.taskId,
              agentName: e.agent.Name,
              nodeId: e.agentChain.agent.id,
              type: "tool_result",
              toolId: l.toolCallId,
              toolName: l.toolName,
              params: l.input || {},
              toolResult: i,
            },
            e,
          ));
        const p = kf(l, i);
        u.push(p);
      }
      return (
        t.push({ role: "assistant", content: r }),
        u.length > 0
          ? (t.push({ role: "tool", content: u }),
            l.forEach((e) => t.push(e)),
            null)
          : a
      );
    }
    system_auto_tools(e) {
      let t = [],
        n = e.xml;
      ((n.indexOf("input=") > -1 || n.indexOf("output=") > -1) &&
        t.push(new qf()),
        n.indexOf("</forEach>") > -1 && t.push(new zf()),
        n.indexOf("</watch>") > -1 && t.push(new Lf()));
      let r = this.tools.map((e) => e.name);
      return t.filter((e) => -1 == r.indexOf(e.name));
    }
    async buildSystemPrompt(e, t) {
      return (function (e, t, n, r, o) {
        let i = "",
          a = "";
        r = r || e.Tools;
        let s = t.xml,
          l = s.indexOf("</watch>") > -1,
          u = s.indexOf("</forEach>") > -1,
          c = r.filter((e) => e.name == Rf).length > 0,
          d =
            s.indexOf("input=") > -1 ||
            s.indexOf("output=") > -1 ||
            r.filter((e) => e.name == Mf).length > 0;
        if (
          (c && (i += Bf),
          d && (i += Wf),
          u &&
            (r.filter((e) => e.name == jf).length > 0 && (i += Hf),
            (a +=
              '\n    \x3c!-- duplicate task node, items support list and variable --\x3e\n    <forEach items="list or variable name">\n      <node>forEach item step node</node>\n    </forEach>')),
          l &&
            (r.filter((e) => e.name == Zf).length > 0 && (i += Vf),
            (a +=
              '\n    \x3c!-- monitor task node, the loop attribute specifies whether to listen in a loop or listen once --\x3e\n    <watch event="dom" loop="true">\n      <description>Monitor task description</description>\n      <trigger>\n        <node>Trigger step node</node>\n        <node>...</node>\n      </trigger>\n    </watch>')),
          o && o.trim() && (i += "\n" + o.trim() + "\n"),
          (i += "\nCurrent datetime: {datetime}"),
          n.chain.agents.length > 1)
        ) {
          ((i += "\n Main task: " + n.chain.taskPrompt),
            (i += "\n\n# Pre-task execution results"));
          for (let e = 0; e < n.chain.agents.length; e++) {
            let t = n.chain.agents[e];
            t.agentResult &&
              (i += `\n## ${t.agent.task || t.agent.name}\n${kd(t.agentResult, 800, !0)}`);
          }
        }
        return '\nYou are {name}, an autonomous AI agent for {agent} agent.\n\n# Agent Description\n{description}\n{prompt}\n\n# User input task instructions\n<root>\n  \x3c!-- Main task, completed through the collaboration of multiple Agents --\x3e\n  <mainTask>main task</mainTask>\n  \x3c!-- The tasks that the current agent needs to complete, the current agent only needs to complete the currentTask --\x3e\n  <currentTask>specific task</currentTask>\n  \x3c!-- Complete the corresponding step nodes of the task, Only for reference --\x3e\n  <nodes>\n    \x3c!-- node supports input/output variables to pass dependencies --\x3e\n    <node input="variable name" output="variable name" status="todo / done">task step node</node>{nodePrompt}\n  </nodes>\n</root>\n\nThe output language should follow the language corresponding to the user\'s task.\n'
          .replace("{name}", "Eko")
          .replace("{agent}", e.Name)
          .replace("{description}", e.Description)
          .replace("{prompt}", "\n" + i.trim())
          .replace("{nodePrompt}", a)
          .replace("{datetime}", new Date().toLocaleString())
          .trim();
      })(this, e.agentChain.agent, e.context, t, await this.extSysPrompt(e, t));
    }
    async buildUserPrompt(e, t) {
      return [
        { type: "text", text: Jf(this, e.agentChain.agent, e.context, t) },
      ];
    }
    async extSysPrompt(e, t) {
      return "";
    }
    async listTools(t, n, r, i) {
      try {
        n.isConnected() || (await n.connect(t.controller.signal));
        let o = await n.listTools(
            {
              taskId: t.taskId,
              nodeId: r?.id,
              environment: e,
              agent_name: r?.name || this.name,
              params: {},
              prompt: r?.task || t.chain.taskPrompt,
              ...(i || {}),
            },
            t.controller.signal,
          ),
          a = [];
        for (let e = 0; e < o.length; e++) {
          let t = o[e],
            r = this.toolExecuter(n, t.name),
            i = new Df(t, r);
          a.push(new Ff(i));
        }
        return a;
      } catch (e) {
        return (o.error("Mcp listTools error", e), []);
      }
    }
    async controlMcpTools(e, t, n) {
      return { mcpTools: 0 == n };
    }
    toolExecuter(t, n) {
      return {
        execute: async function (r, o) {
          return await t.callTool(
            {
              name: n,
              arguments: r,
              extInfo: {
                taskId: o.context.taskId,
                nodeId: o.agentChain.agent.id,
                environment: e,
                agent_name: o.agent.Name,
              },
            },
            o.context.controller.signal,
          );
        },
      };
    }
    async handleMessages(e, t, n) {
      !(function (e) {
        let t = 0,
          n = 0,
          r = {};
        for (let o = e.length - 1; o >= 0; o--) {
          let i = e[o];
          if ("user" == i.role)
            for (let e = 0; e < i.content.length; e++) {
              let r = i.content[e];
              if ("file" == r.type && r.mediaType.startsWith("image/")) {
                if (++t <= 1) break;
                ((r = { type: "text", text: "[image]" }), (i.content[e] = r));
              } else if ("file" == r.type) {
                if (++n <= 1) break;
                ((r = { type: "text", text: "[file]" }), (i.content[e] = r));
              }
            }
          else if ("tool" == i.role)
            for (let e = 0; e < i.content.length; e++) {
              let n = i.content[e],
                o = n.output;
              if (o && "content" == o.type) {
                for (let e = 0; e < o.value.length; e++) {
                  let n = o.value[e];
                  if ("media" == n.type && n.mediaType.startsWith("image/")) {
                    if (++t <= 1) break;
                    ((n = { type: "text", text: "[image]" }), (o.value[e] = n));
                  }
                }
                for (let e = 0; e < o.value.length; e++) {
                  let t = o.value[e];
                  if ("text" == t.type && t.text?.length > 5e3) {
                    if (!r[n.toolName]) {
                      r[n.toolName] = 1;
                      break;
                    }
                    (r[n.toolName]++,
                      (t = {
                        type: "text",
                        text: t.text.substring(0, 5e3) + "...",
                      }),
                      (o.value[e] = t));
                  }
                }
              }
            }
        }
      })(t);
    }
    async callInnerTool(e) {
      let t = await e();
      return {
        content: [
          {
            type: "text",
            text: t
              ? "string" == typeof t
                ? t
                : JSON.stringify(t)
              : "Successful",
          },
        ],
      };
    }
    async loadTools(e) {
      if (this.mcpClient) {
        let t = await this.listTools(e, this.mcpClient);
        if (t && t.length > 0) return _d(this.tools, t);
      }
      return this.tools;
    }
    addTool(e) {
      this.tools.push(e);
    }
    async onTaskStatus(e, t) {
      "abort" == e && this.agentContext && this.agentContext?.variables.clear();
    }
    get Llms() {
      return this.llms;
    }
    get Name() {
      return this.name;
    }
    get Description() {
      return this.description;
    }
    get Tools() {
      return this.tools;
    }
    get PlanDescription() {
      return this.planDescription;
    }
    get McpClient() {
      return this.mcpClient;
    }
    get AgentContext() {
      return this.agentContext;
    }
  }
  function Gf(e = 200) {
    let t = "";
    e = e || 200;
    try {
      function n(r) {
        if (r.nodeType === Node.ELEMENT_NODE) {
          const e = r.tagName.toLowerCase();
          if (["script", "style", "noscript"].includes(e)) return;
          const t = window.getComputedStyle(r);
          if (
            "none" == t.display ||
            "hidden" == t.visibility ||
            "0" == t.opacity
          )
            return;
        }
        if (r.nodeType === Node.TEXT_NODE) {
          const e = r.textContent.trim();
          e && (t += e + " ");
        } else if (r.nodeType === Node.ELEMENT_NODE) {
          const o = r.tagName.toLowerCase();
          if (["input", "select", "textarea"].includes(o))
            "input" == o && "checkbox" == r.type
              ? (t += r.checked + " ")
              : "input" == o && "radio" == r.type
                ? r.checked && r.value && (t += r.value + " ")
                : r.value && (t += r.value + " ");
          else if ("img" === o) {
            const n =
                r.src || r.getAttribute("src") || r.getAttribute("data-src"),
              o = r.alt || r.title || "";
            n &&
              n.length <= e &&
              r.width * r.height >= 1e4 &&
              n.startsWith("http") &&
              (t += `![${o || "image"}](${n.trim()}) `);
          } else if ("a" === o && 0 == r.children.length) {
            const n = r.href || r.getAttribute("href"),
              o = r.innerText.trim() || r.title;
            o && n && n.length <= e && n.startsWith("http")
              ? (t += `[${o}](${n.trim()}) `)
              : (t += o + " ");
          } else if ("video" === o || "audio" == o) {
            let e = r.src || r.getAttribute("src");
            const n = r.querySelectorAll("source");
            (n.length > 0 &&
              n[0].src &&
              ((e = n[0].src),
              e && e.startsWith("http") && n[0].type && (t += n[0].type + " ")),
              e && e.startsWith("http") && (t += e.trim() + " "));
          } else if ("br" === o) t += "\n";
          else {
            if (["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"].includes(o)) {
              t += "\n";
              for (let e of r.childNodes) n(e);
              return void (t += "\n");
            }
            if ("hr" === o) t += "\n--------\n";
            else for (let e of r.childNodes) n(e);
          }
        }
      }
      n(document.body);
    } catch (r) {
      t = document.body.innerText;
    }
    return t.replace(/\s*\n/g, "\n").replace(/\n+/g, "\n").trim();
  }
  class Xf extends Kf {
    async go_back(e) {
      try {
        (await this.execute_script(e, () => {
          window.navigation.back();
        }, []),
          await gd(100));
      } catch (e) {}
    }
    async extract_page_content(e, t) {
      let n = await this.execute_script(e, Gf, []),
        r = await this.get_current_page(e),
        o = `title: ${r.title}\npage_url: ${r.url}\npage_content: \n${n}`;
      return (
        t && e.context.variables.set(t, o),
        { title: r.title || "", page_url: r.url, page_content: n }
      );
    }
    async controlMcpTools(e, t, n) {
      if (n > 0) {
        let t = null;
        try {
          t = (await this.get_current_page(e)).url;
        } catch (e) {}
        let r = e.variables.get("lastUrl");
        return (
          e.variables.set("lastUrl", t),
          {
            mcpTools: 0 == n || t != r,
            mcpParams: { environment: "browser", browser_url: t },
          }
        );
      }
      return { mcpTools: !0, mcpParams: { environment: "browser" } };
    }
    toolExecuter(e, t) {
      return {
        execute: async (n, r) => {
          let o = await e.callTool(
            {
              name: t,
              arguments: n,
              extInfo: {
                taskId: r.context.taskId,
                nodeId: r.agentChain.agent.id,
                environment: "browser",
                agent_name: r.agent.Name,
                browser_url: r.variables.get("lastUrl"),
              },
            },
            r.context.controller.signal,
          );
          if (
            o.extInfo &&
            o.extInfo.javascript &&
            "text" == o.content[0].type
          ) {
            let e,
              t = `${o.content[0].text};execute(${JSON.stringify(n)})`,
              i = await this.execute_mcp_script(r, t);
            return (
              (e =
                "string" == typeof i || "number" == typeof i
                  ? i + ""
                  : i
                    ? JSON.stringify(i)
                    : "Successful"),
              { content: [{ type: "text", text: e }] }
            );
          }
          return o;
        },
      };
    }
    async get_current_page(e) {
      return await this.execute_script(
        e,
        () => ({ url: window.location.href, title: window.document.title }),
        [],
      );
    }
    lastToolResult(e) {
      let t = e[e.length - 1];
      if ("tool" != t.role) return null;
      let n = t.content.filter((e) => "tool-result" == e.type)[0];
      if (!n) return null;
      let r = n.output.value;
      for (let t = e.length - 2; t > 0; t--)
        if ("assistant" === e[t].role && "string" != typeof e[t].content)
          for (let o = 0; o < e[t].content.length; o++) {
            let i = e[t].content[o];
            if ("string" != typeof i && "tool-call" !== i.type) continue;
            let a = i;
            if (n.toolCallId == a.toolCallId)
              return {
                id: n.toolCallId,
                toolName: a.toolName,
                args: a.input,
                result: r,
              };
          }
      return null;
    }
    toolUseNames(e) {
      let t = [];
      if (!e) return t;
      for (let n = 0; n < e.length; n++) {
        let r = e[n];
        "tool" == r.role && t.push(r.content[0].toolName);
      }
      return t;
    }
    async execute_mcp_script(e, t) {}
  }
  function Yf() {
    function e(t, n) {
      if (!t) return;
      if ("TEXT_NODE" == t.type)
        return { text: t.text || "", isVisible: t.isVisible || !1, parent: n };
      let r = {
        tagName: t.tagName,
        xpath: t.xpath,
        highlightIndex: t.highlightIndex,
        attributes: t.attributes || {},
        isVisible: t.isVisible || !1,
        isInteractive: t.isInteractive || !1,
        isTopElement: t.isTopElement || !1,
        shadowRoot: t.shadowRoot || !1,
        children: [],
        parent: n,
      };
      if (t.children) {
        let n = [];
        for (let o = 0; o < t.children.length; o++) {
          let i = t.children[o];
          if (i) {
            let t = e(i, r);
            t && n.push(t);
          }
        }
        r.children = n;
      }
      return r;
    }
    ((window.get_clickable_elements = function (t = !0, n) {
      ((window.clickable_elements = {}),
        document
          .querySelectorAll("[eko-user-highlight-id]")
          .forEach((e) => e.removeAttribute("eko-user-highlight-id")));
      let r = (function (e) {
          let t = 0;
          function n(e, t = !0) {
            const n = [];
            let r = e;
            for (
              ;
              r &&
              r.nodeType === Node.ELEMENT_NODE &&
              (!t ||
                !(
                  r.parentNode instanceof ShadowRoot ||
                  r.parentNode instanceof HTMLIFrameElement
                ));

            ) {
              let e = 0,
                t = r.previousSibling;
              for (; t; )
                (t.nodeType === Node.ELEMENT_NODE &&
                  t.nodeName === r.nodeName &&
                  e++,
                  (t = t.previousSibling));
              const o = r.nodeName.toLowerCase(),
                i = e > 0 ? `[${e + 1}]` : "";
              (n.unshift(`${o}${i}`), (r = r.parentNode));
            }
            return n.join("/");
          }
          return (function r(o, i = null) {
            if (!o) return null;
            if (o.nodeType === Node.TEXT_NODE) {
              const e = o.textContent.trim();
              return e &&
                (function (e) {
                  const t = document.createRange();
                  t.selectNodeContents(e);
                  const n = t.getBoundingClientRect();
                  return (
                    0 !== n.width &&
                    0 !== n.height &&
                    n.top >= 0 &&
                    n.top <= window.innerHeight &&
                    e.parentElement?.checkVisibility({
                      checkOpacity: !0,
                      checkVisibilityCSS: !0,
                    })
                  );
                })(o)
                ? { type: "TEXT_NODE", text: e, isVisible: !0 }
                : null;
            }
            if (
              o.nodeType === Node.ELEMENT_NODE &&
              ((a = o),
              new Set(["svg", "script", "style", "link", "meta"]).has(
                a.tagName.toLowerCase(),
              ))
            )
              return null;
            var a;
            const s = {
              tagName: o.tagName ? o.tagName.toLowerCase() : null,
              attributes: {},
              xpath: o.nodeType === Node.ELEMENT_NODE ? n(o, !0) : null,
              children: [],
            };
            if (o.nodeType === Node.ELEMENT_NODE && o.attributes) {
              const e = o.getAttributeNames?.() || [];
              for (const t of e) s.attributes[t] = o.getAttribute(t);
            }
            if (o.nodeType === Node.ELEMENT_NODE) {
              const n = (function (e) {
                  const t = new Set([
                      "a",
                      "button",
                      "details",
                      "embed",
                      "input",
                      "label",
                      "menu",
                      "menuitem",
                      "object",
                      "select",
                      "textarea",
                      "summary",
                    ]),
                    n = new Set([
                      "button",
                      "menu",
                      "menuitem",
                      "link",
                      "checkbox",
                      "radio",
                      "slider",
                      "tab",
                      "tabpanel",
                      "textbox",
                      "combobox",
                      "grid",
                      "listbox",
                      "option",
                      "progressbar",
                      "scrollbar",
                      "searchbox",
                      "switch",
                      "tree",
                      "treeitem",
                      "spinbutton",
                      "tooltip",
                      "a-button-inner",
                      "a-dropdown-button",
                      "click",
                      "menuitemcheckbox",
                      "menuitemradio",
                      "a-button-text",
                      "button-text",
                      "button-icon",
                      "button-icon-only",
                      "button-text-icon-only",
                      "dropdown",
                      "combobox",
                    ]),
                    r = e.tagName.toLowerCase(),
                    o = e.getAttribute("role"),
                    i = e.getAttribute("aria-role"),
                    a = e.getAttribute("tabindex");
                  if (
                    t.has(r) ||
                    n.has(o) ||
                    n.has(i) ||
                    (null !== a && "-1" !== a) ||
                    "a-dropdown-select" === e.getAttribute("data-action") ||
                    "a-dropdown-button" === e.getAttribute("data-action")
                  )
                    return !0;
                  const s = window.getComputedStyle(e),
                    l =
                      null !== e.onclick ||
                      null !== e.getAttribute("onclick") ||
                      e.hasAttribute("ng-click") ||
                      e.hasAttribute("@click") ||
                      e.hasAttribute("v-on:click"),
                    u = (function (e) {
                      try {
                        return window.getEventListeners?.(e) || {};
                      } catch (t) {
                        const n = {},
                          r = [
                            "click",
                            "mousedown",
                            "mouseup",
                            "touchstart",
                            "touchend",
                            "keydown",
                            "keyup",
                            "focus",
                            "blur",
                          ];
                        for (const t of r) {
                          const r = e[`on${t}`];
                          r && (n[t] = [{ listener: r, useCapture: !1 }]);
                        }
                        return n;
                      }
                    })(e),
                    c =
                      u &&
                      (u.click?.length > 0 ||
                        u.mousedown?.length > 0 ||
                        u.mouseup?.length > 0 ||
                        u.touchstart?.length > 0 ||
                        u.touchend?.length > 0),
                    d =
                      e.hasAttribute("aria-expanded") ||
                      e.hasAttribute("aria-pressed") ||
                      e.hasAttribute("aria-selected") ||
                      e.hasAttribute("aria-checked");
                  void 0 !== e.form ||
                    e.hasAttribute("contenteditable") ||
                    s.userSelect;
                  const p =
                    e.draggable || "true" === e.getAttribute("draggable");
                  return d || l || c || p;
                })(o),
                r = (function (e) {
                  const t = window.getComputedStyle(e);
                  return (
                    e.offsetWidth > 0 &&
                    e.offsetHeight > 0 &&
                    "hidden" !== t.visibility &&
                    "none" !== t.display
                  );
                })(o),
                a = (function (e) {
                  if (e.ownerDocument !== window.document) return !0;
                  const t = e.getRootNode();
                  if (t instanceof ShadowRoot) {
                    const n = e.getBoundingClientRect(),
                      r = { x: n.left + n.width / 2, y: n.top + n.height / 2 };
                    try {
                      const n = t.elementFromPoint(r.x, r.y);
                      if (!n) return !1;
                      let o = n;
                      for (; o && o !== t; ) {
                        if (o === e) return !0;
                        o = o.parentElement;
                      }
                      return !1;
                    } catch (e) {
                      return !0;
                    }
                  }
                  const n = e.getBoundingClientRect(),
                    r = { x: n.left + n.width / 2, y: n.top + n.height / 2 };
                  try {
                    const t = document.elementFromPoint(r.x, r.y);
                    if (!t) return !1;
                    let n = t;
                    for (; n && n !== document.documentElement; ) {
                      if (n === e) return !0;
                      n = n.parentElement;
                    }
                    return !1;
                  } catch (e) {
                    return !0;
                  }
                })(o);
              ((s.isInteractive = n),
                (s.isVisible = r),
                (s.isTopElement = a),
                n &&
                  r &&
                  a &&
                  ((s.highlightIndex = t++),
                  (window.clickable_elements[s.highlightIndex] = o),
                  e &&
                    (function (e, t, n = null) {
                      let r = document.getElementById(
                        "eko-highlight-container",
                      );
                      r ||
                        ((r = document.createElement("div")),
                        (r.id = "eko-highlight-container"),
                        (r.style.position = "fixed"),
                        (r.style.pointerEvents = "none"),
                        (r.style.top = "0"),
                        (r.style.left = "0"),
                        (r.style.width = "100%"),
                        (r.style.height = "100%"),
                        (r.style.zIndex = "2147483647"),
                        document.documentElement.appendChild(r));
                      const o = [
                          "#FF0000",
                          "#00FF00",
                          "#0000FF",
                          "#FFA500",
                          "#800080",
                          "#008080",
                          "#FF69B4",
                          "#4B0082",
                          "#FF4500",
                          "#2E8B57",
                          "#DC143C",
                          "#4682B4",
                        ],
                        i = o[t % o.length],
                        a = `${i}1A`,
                        s = document.createElement("div");
                      ((s.style.position = "absolute"),
                        (s.style.border = `2px solid ${i}`),
                        (s.style.pointerEvents = "none"),
                        (s.style.boxSizing = "border-box"));
                      const l = e.getBoundingClientRect();
                      let u = l.top,
                        c = l.left;
                      if (
                        ((l.width < window.innerWidth / 2 ||
                          l.height < window.innerHeight / 2) &&
                          (s.style.backgroundColor = a),
                        n)
                      ) {
                        const e = n.getBoundingClientRect();
                        ((u += e.top), (c += e.left));
                      }
                      ((s.style.top = `${u}px`),
                        (s.style.left = `${c}px`),
                        (s.style.width = `${l.width}px`),
                        (s.style.height = `${l.height}px`));
                      const d = document.createElement("div");
                      ((d.className = "eko-highlight-label"),
                        (d.style.position = "absolute"),
                        (d.style.background = i),
                        (d.style.color = "white"),
                        (d.style.padding = "1px 4px"),
                        (d.style.borderRadius = "4px"),
                        (d.style.fontSize = `${Math.min(12, Math.max(8, l.height / 2))}px`),
                        (d.textContent = t));
                      let p = u + 2,
                        m = c + l.width - 20 - 2;
                      ((l.width < 24 || l.height < 20) &&
                        ((p = u - 16 - 2), (m = c + l.width - 20)),
                        p < 0 && (p = u + 2),
                        m < 0 && (m = c + 2),
                        m + 20 > window.innerWidth &&
                          (m = c + l.width - 20 - 2),
                        (d.style.top = `${p}px`),
                        (d.style.left = `${m}px`),
                        r.appendChild(s),
                        r.appendChild(d),
                        e.setAttribute(
                          "eko-user-highlight-id",
                          `eko-highlight-${t}`,
                        ));
                    })(o, s.highlightIndex, i)));
            }
            if ((o.shadowRoot && (s.shadowRoot = !0), o.shadowRoot)) {
              const e = Array.from(o.shadowRoot.childNodes).map((e) => r(e, i));
              s.children.push(...e);
            }
            if ("IFRAME" === o.tagName)
              try {
                const e = o.contentDocument || o.contentWindow.document;
                if (e) {
                  const t = Array.from(e.body.childNodes).map((e) => r(e, o));
                  s.children.push(...t);
                }
              } catch (e) {
                console.warn("Unable to access iframe:", o);
              }
            else {
              const e = Array.from(o.childNodes).map((e) => r(e, i));
              s.children.push(...e);
            }
            return s;
          })(document.body);
        })(t),
        o = e(r),
        i = (function (e) {
          let t = {};
          return (
            (function e(n) {
              if (n.tagName) {
                null != n.highlightIndex && (t[n.highlightIndex] = n);
                for (let t = 0; t < n.children.length; t++) e(n.children[t]);
              }
            })(e),
            t
          );
        })(o);
      return {
        element_str: (function (e, t) {
          t ||
            (t = [
              "id",
              "title",
              "type",
              "name",
              "role",
              "class",
              "src",
              "href",
              "aria-label",
              "placeholder",
              "value",
              "alt",
              "aria-expanded",
            ]);
          let n = [];
          return (
            (function e(r, o) {
              if (null == r.text) {
                if (null != r.highlightIndex) {
                  let e = "";
                  if (t) {
                    for (let n = 0; n < t.length; n++) {
                      let o = t[n],
                        i = r.attributes[o];
                      if ("class" == o && i && i.length > 30) {
                        let e = i.split(" ").slice(0, 3);
                        i = e.join(" ");
                      } else {
                        if (("src" == o || "href" == o) && i && i.length > 200)
                          continue;
                        ("src" == o || "href" == o) &&
                          i &&
                          i.startsWith("/") &&
                          (i = window.location.origin + i);
                      }
                      o && i && (e += ` ${o}="${i}"`);
                    }
                    e = e.replace(/\n+/g, " ");
                  }
                  let o = (function (e) {
                    let t = [];
                    return (
                      (function n(r) {
                        if (!r.tagName || r == e || null == r.highlightIndex)
                          if (!r.tagName && r.text) t.push(r.text);
                          else if (r.tagName)
                            for (let e = 0; e < r.children.length; e++)
                              n(r.children[e]);
                      })(e),
                      t.join("\n").trim().replace(/\n+/g, " ")
                    );
                  })(r);
                  n.push(
                    `[${r.highlightIndex}]:<${r.tagName}${e}>${o}</${r.tagName}>`,
                  );
                }
                for (let t = 0; t < r.children.length; t++) e(r.children[t]);
              } else
                (function (e) {
                  let t = e.parent;
                  for (; t; ) {
                    if (null != t.highlightIndex) return !0;
                    t = t.parent;
                  }
                  return !1;
                })(r) || n.push(`[]:${r.text}`);
            })(e),
            n.join("\n")
          );
        })(o, n),
        selector_map: i,
      };
    }),
      (window.get_highlight_element = function (e) {
        return (
          document.querySelector(
            `[eko-user-highlight-id="eko-highlight-${e}"]`,
          ) || window.clickable_elements[e]
        );
      }),
      (window.remove_highlight = function () {
        let e = document.getElementById("eko-highlight-container");
        e && e.remove();
      }));
  }
  class Qf extends Xf {
    constructor(e, t, n) {
      const r = [];
      super({
        name: "Browser",
        description:
          "You are a browser operation agent, use structured commands to interact with the browser.\n* This is a browser GUI interface where you need to analyze webpages by taking screenshot and page element structures, and specify action sequences to complete designated tasks.\n* For your first visit, please start by calling either the `navigate_to` or `current_page` tool. After each action you perform, I will provide you with updated information about the current state, including page screenshots and structured element data that has been specially processed for easier analysis.\n* Screenshot description:\n  - Screenshot are used to understand page layouts, with labeled bounding boxes corresponding to element indexes. Each bounding box and its label share the same color, with labels typically positioned in the top-right corner of the box.\n  - Screenshot help verify element positions and relationships. Labels may sometimes overlap, so extracted elements are used to verify the correct elements.\n  - In addition to screenshot, simplified information about interactive elements is returned, with element indexes corresponding to those in the screenshot.\n  - This tool can ONLY screenshot the VISIBLE content. If a complete content is required, use 'extract_page_content' instead.\n  - If the webpage content hasn't loaded, please use the `wait` tool to allow time for the content to load.\n* ELEMENT INTERACTION:\n   - Only use indexes that exist in the provided element list\n   - Each element has a unique index number (e.g., \"[33]:<button>\")\n   - Elements marked with \"[]:\" are non-interactive (for context only)\n   - Use the latest element index, do not rely on historical outdated element indexes\n* ERROR HANDLING:\n   - If no suitable elements exist, use other functions to complete the task\n   - If stuck, try alternative approaches, don't refuse tasks\n   - Handle popups/cookies by accepting or closing them\n   - When encountering scenarios that require user assistance such as login, verification codes, QR code scanning, Payment, etc, you can request user help.\n* BROWSER OPERATION:\n   - Use scroll to find elements you are looking for, When extracting content, prioritize using extract_page_content, only scroll when you need to load more content\n* During execution, please output user-friendly step information. Do not output HTML-related element and index information to users, as this would cause user confusion.\n",
        tools: r,
        llms: e,
        mcpClient: n,
        planDescription:
          "Browser operation agent, interact with the browser using the mouse and keyboard.",
      });
      let o = this.buildInitTools();
      (t && t.length > 0 && (o = _d(o, t)), o.forEach((e) => r.push(e)));
    }
    async input_text(e, t, n, r) {
      (await this.execute_script(e, ev, [{ index: t, text: n, enter: r }]),
        r && (await gd(200)));
    }
    async click_element(e, t, n, r) {
      await this.execute_script(e, tv, [
        { index: t, num_clicks: n, button: r },
      ]);
    }
    async scroll_to_element(e, t) {
      (await this.execute_script(
        e,
        (e) =>
          window
            .get_highlight_element(e)
            .scrollIntoView({ behavior: "smooth" }),
        [t],
      ),
        await gd(200));
    }
    async scroll_mouse_wheel(e, t, n) {
      if (
        (await this.execute_script(e, iv, [{ amount: t }]), await gd(200), !n)
      ) {
        const t = this.toolUseNames(e.agentChain.agentRequest?.messages);
        let r = 0;
        for (let e = t.length - 1; e >= Math.max(t.length - 8, 0); e--)
          "scroll_mouse_wheel" == t[e] && r++;
        r >= 3 && (n = !0);
      }
      if (n) {
        let t = await this.extract_page_content(e);
        return {
          result:
            "The current page content has been extracted, latest page content:\ntitle: " +
            t.title +
            "\npage_url: " +
            t.page_url +
            "\npage_content: " +
            t.page_content,
        };
      }
    }
    async hover_to_element(e, t) {
      await this.execute_script(e, nv, [{ index: t }]);
    }
    async get_select_options(e, t) {
      return await this.execute_script(e, rv, [{ index: t }]);
    }
    async select_option(e, t, n) {
      return await this.execute_script(e, ov, [{ index: t, option: n }]);
    }
    async screenshot_and_html(e) {
      try {
        let t = null;
        for (
          let n = 0;
          n < 5 &&
          (await gd(200),
          await this.execute_script(e, Yf, []),
          await gd(50),
          (t = await this.execute_script(
            e,
            () => window.get_clickable_elements(!0),
            [],
          )),
          !t);
          n++
        );
        await gd(100);
        let n = await this.screenshot(e),
          r = t.element_str;
        return {
          imageBase64: n.imageBase64,
          imageType: n.imageType,
          pseudoHtml: r,
        };
      } finally {
        try {
          await this.execute_script(e, () => window.remove_highlight(), []);
        } catch (e) {}
      }
    }
    get_element_script(e) {
      return `window.get_highlight_element(${e});`;
    }
    buildInitTools() {
      return [
        {
          name: "navigate_to",
          description: "Navigate to a specific url",
          parameters: {
            type: "object",
            properties: {
              url: { type: "string", description: "The url to navigate to" },
            },
            required: ["url"],
          },
          execute: async (e, t) =>
            await this.callInnerTool(() => this.navigate_to(t, e.url)),
        },
        {
          name: "current_page",
          description:
            "Get the information of the current webpage (url, title)",
          parameters: { type: "object", properties: {} },
          execute: async (e, t) =>
            await this.callInnerTool(() => this.get_current_page(t)),
        },
        {
          name: "go_back",
          description: "Navigate back in browser history",
          parameters: { type: "object", properties: {} },
          execute: async (e, t) =>
            await this.callInnerTool(() => this.go_back(t)),
        },
        {
          name: "input_text",
          description: "Input text into an element",
          parameters: {
            type: "object",
            properties: {
              index: {
                type: "number",
                description: "The index of the element to input text into",
              },
              text: { type: "string", description: "The text to input" },
              enter: {
                type: "boolean",
                description:
                  "When text input is completed, press Enter (applicable to search boxes)",
                default: !1,
              },
            },
            required: ["index", "text"],
          },
          execute: async (e, t) =>
            await this.callInnerTool(() =>
              this.input_text(t, e.index, e.text, e.enter),
            ),
        },
        {
          name: "click_element",
          description: "Click on an element by index",
          parameters: {
            type: "object",
            properties: {
              index: {
                type: "number",
                description: "The index of the element to click",
              },
              num_clicks: {
                type: "number",
                description: "number of times to click the element, default 1",
              },
              button: {
                type: "string",
                description: "Mouse button type, default left",
                enum: ["left", "right", "middle"],
              },
            },
            required: ["index"],
          },
          execute: async (e, t) =>
            await this.callInnerTool(() =>
              this.click_element(
                t,
                e.index,
                e.num_clicks || 1,
                e.button || "left",
              ),
            ),
        },
        {
          name: "scroll_mouse_wheel",
          description:
            "Scroll the mouse wheel at current position, only scroll when you need to load more content",
          parameters: {
            type: "object",
            properties: {
              amount: {
                type: "number",
                description: "Scroll amount (up / down)",
                minimum: 1,
                maximum: 10,
              },
              direction: { type: "string", enum: ["up", "down"] },
              extract_page_content: {
                type: "boolean",
                default: !1,
                description:
                  "After scrolling is completed, whether to extract the current latest page content",
              },
            },
            required: ["amount", "direction", "extract_page_content"],
          },
          execute: async (e, t) =>
            await this.callInnerTool(async () => {
              let n = e.amount;
              await this.scroll_mouse_wheel(
                t,
                "up" == e.direction ? -n : n,
                1 == e.extract_page_content,
              );
            }),
        },
        {
          name: "hover_to_element",
          description: "Mouse hover over the element",
          parameters: {
            type: "object",
            properties: {
              index: {
                type: "number",
                description: "The index of the element to input text into",
              },
            },
            required: ["index"],
          },
          execute: async (e, t) =>
            await this.callInnerTool(() => this.hover_to_element(t, e.index)),
        },
        {
          name: "extract_page_content",
          description:
            "Extract the text content and image links of the current webpage, please use this tool to obtain webpage data.",
          parameters: { type: "object", properties: {} },
          execute: async (e, t) =>
            await this.callInnerTool(() => this.extract_page_content(t)),
        },
        {
          name: "get_select_options",
          description:
            "Get all options from a native dropdown element (<select>).",
          parameters: {
            type: "object",
            properties: {
              index: {
                type: "number",
                description: "The index of the element to select",
              },
            },
            required: ["index"],
          },
          execute: async (e, t) =>
            await this.callInnerTool(() => this.get_select_options(t, e.index)),
        },
        {
          name: "select_option",
          description:
            "Select the native dropdown option, Use this after get_select_options and when you need to select an option from a dropdown.",
          parameters: {
            type: "object",
            properties: {
              index: {
                type: "number",
                description: "The index of the element to select",
              },
              option: { type: "string", description: "Text option" },
            },
            required: ["index", "option"],
          },
          execute: async (e, t) =>
            await this.callInnerTool(() =>
              this.select_option(t, e.index, e.option),
            ),
        },
        {
          name: "get_all_tabs",
          description: "Get all tabs of the current browser",
          parameters: { type: "object", properties: {} },
          execute: async (e, t) =>
            await this.callInnerTool(() => this.get_all_tabs(t)),
        },
        {
          name: "switch_tab",
          description: "Switch to the specified tab page",
          parameters: {
            type: "object",
            properties: {
              tabId: {
                type: "number",
                description: "Tab ID, obtained through get_all_tabs",
              },
            },
            required: ["tabId"],
          },
          execute: async (e, t) =>
            await this.callInnerTool(() => this.switch_tab(t, e.tabId)),
        },
        {
          name: "wait",
          noPlan: !0,
          description: "Wait for specified duration",
          parameters: {
            type: "object",
            properties: {
              duration: {
                type: "number",
                description: "Duration in millisecond",
                default: 500,
                minimum: 200,
                maximum: 1e4,
              },
            },
            required: ["duration"],
          },
          execute: async (e, t) =>
            await this.callInnerTool(() => gd(e.duration || 200)),
        },
      ];
    }
    async double_screenshots(e, t, n) {
      return !0;
    }
    async handleMessages(e, t, n) {
      const r =
        "This is the environmental information after the operation, including the latest browser screenshot and page elements. Please perform the next operation based on the environmental information. Do not output the following elements and index information in your response.\n\nIndex and elements:\n";
      let o = this.lastToolResult(t);
      if (
        o &&
        "extract_page_content" !== o.toolName &&
        "get_all_tabs" !== o.toolName &&
        "variable_storage" !== o.toolName
      ) {
        await gd(300);
        let o = [];
        if (await this.double_screenshots(e, t, n)) {
          let t = await this.screenshot(e),
            n = yd(t.imageBase64);
          o.push({ type: "file", data: n, mediaType: t.imageType });
        }
        let i = await this.screenshot_and_html(e),
          a = yd(i.imageBase64);
        (o.push({ type: "file", data: a, mediaType: i.imageType }),
          t.push({
            role: "user",
            content: [
              ...o,
              { type: "text", text: r + "```html\n" + i.pseudoHtml + "\n```" },
            ],
          }));
      }
      (super.handleMessages(e, t, n), this.handlePseudoHtmlText(t, r));
    }
    handlePseudoHtmlText(e, t) {
      for (let n = 0; n < e.length; n++) {
        let r = e[n];
        if ("user" !== r.role || r.content.length <= 1) continue;
        let o = r.content;
        for (let r = 0; r < o.length; r++) {
          let i = o[r];
          "text" == i.type &&
            i.text.startsWith(t) &&
            n >= 2 &&
            n < e.length - 3 &&
            (i.text = this.removePseudoHtmlAttr(i.text, [
              "class",
              "src",
              "href",
            ]));
        }
        "[image]" == o[0].text && "[image]" == o[1].text && o.splice(0, 1);
      }
    }
    removePseudoHtmlAttr(e, t) {
      return e
        .split("\n")
        .map((e) => {
          if (!e.startsWith("[") || -1 == e.indexOf("]:<")) return e;
          e = e.substring(e.indexOf("]:<") + 2);
          for (let n = 0; n < t.length; n++) {
            let r = e.indexOf(t[n] + '="');
            if (-1 == r) continue;
            let o = e.indexOf('"', r + t[n].length + 3);
            -1 != o && (e = e.substring(0, r) + e.substring(o + 1).trim());
          }
          return e.replace('" >', '">').replace(" >", ">");
        })
        .join("\n");
    }
  }
  function ev(e) {
    let t,
      { index: n, text: r, enter: o } = e,
      i = window.get_highlight_element(n);
    if (!i) return !1;
    if ("IFRAME" == i.tagName) {
      let e = i.contentDocument || i.contentWindow.document;
      t =
        e.querySelector("textarea") ||
        e.querySelector('*[contenteditable="true"]') ||
        e.querySelector("input");
    } else
      "INPUT" == i.tagName ||
      "TEXTAREA" == i.tagName ||
      0 == i.childElementCount
        ? (t = i)
        : ((t = i.querySelector("input") || i.querySelector("textarea")),
          t ||
            ((t = i.querySelector('*[contenteditable="true"]') || i),
            "DIV" == t.tagName &&
              (t = t.querySelector("span") || t.querySelector("div") || t)));
    if ((t.focus && t.focus(), !r && o))
      return (
        ["keydown", "keypress", "keyup"].forEach((e) => {
          const n = new KeyboardEvent(e, {
            key: "Enter",
            code: "Enter",
            keyCode: 13,
            bubbles: !0,
            cancelable: !0,
          });
          t.dispatchEvent(n);
        }),
        !0
      );
    if (null == t.value) t.textContent = r;
    else if (((t.value = r), t.__proto__)) {
      let e = Object.getOwnPropertyDescriptor(t.__proto__, "value")?.set;
      e && e.call(t, r);
    }
    return (
      t.dispatchEvent(new Event("input", { bubbles: !0 })),
      o &&
        ["keydown", "keypress", "keyup"].forEach((e) => {
          const n = new KeyboardEvent(e, {
            key: "Enter",
            code: "Enter",
            keyCode: 13,
            bubbles: !0,
            cancelable: !0,
          });
          t.dispatchEvent(n);
        }),
      !0
    );
  }
  function tv(e) {
    let { index: t, button: n, num_clicks: r } = e;
    function o(e, n) {
      let o = window.get_highlight_element(t);
      if (!o) return !1;
      for (let t = 0; t < r; t++)
        for (let t = 0; t < e.length; t++) {
          const r = new MouseEvent(e[t], {
            view: window,
            bubbles: !0,
            cancelable: !0,
            button: n,
          });
          o.dispatchEvent(r);
        }
      return !0;
    }
    return "right" == n
      ? o(["mousedown", "mouseup", "contextmenu"], 2)
      : o(["mousedown", "mouseup", "click"], "middle" == n ? 1 : 0);
  }
  function nv(e) {
    let t = window.get_highlight_element(e.index);
    if (!t) return !1;
    const n = new MouseEvent("mouseenter", {
      bubbles: !0,
      cancelable: !0,
      view: window,
    });
    return (t.dispatchEvent(n), !0);
  }
  function rv(e) {
    let t = window.get_highlight_element(e.index);
    return t && "SELECT" === t.tagName.toUpperCase()
      ? {
          options: Array.from(t.options).map((e) => ({
            index: e.index,
            text: e.text.trim(),
            value: e.value,
          })),
          name: t.name,
        }
      : "Error: Not a select element";
  }
  function ov(e) {
    let t = window.get_highlight_element(e.index);
    if (!t || "SELECT" !== t.tagName.toUpperCase())
      return "Error: Not a select element";
    let n = e.option.trim(),
      r = Array.from(t.options).find((e) => e.text.trim() === n);
    return (
      r || (r = Array.from(t.options).find((e) => e.value.trim() === n)),
      r
        ? ((t.value = r.value),
          t.dispatchEvent(new Event("change")),
          { success: !0, selectedValue: r.value, selectedText: r.text.trim() })
        : {
            success: !1,
            error: "Select Option not found",
            availableOptions: Array.from(t.options).map((e) => e.text.trim()),
          }
    );
  }
  function iv(e) {
    const t = e.amount,
      n = document.documentElement || document.body;
    if (n.scrollHeight > 1.2 * window.innerHeight) {
      const e = Math.max(
        20,
        Math.min((window.innerHeight || n.clientHeight) / 10, 200),
      );
      return void window.scrollBy(0, e * t);
    }
    function r(e = document, t = []) {
      for (const n of Array.from(e.querySelectorAll("*")))
        "IFRAME" === n.tagName && n.contentDocument
          ? r(n.contentDocument, t)
          : t.push(n);
      return t;
    }
    function o(e) {
      const t = e.getBoundingClientRect(),
        r = window.innerHeight || n.clientHeight,
        o = window.innerWidth || n.clientWidth,
        i = Math.max(0, Math.min(t.left, o)),
        a = Math.max(0, Math.min(t.right, o)),
        s = Math.max(0, Math.min(t.top, r));
      return (a - i) * (Math.max(0, Math.min(t.bottom, r)) - s);
    }
    function i(e) {
      for (; e && e !== document.body && e !== document.body.parentElement; ) {
        const t = window.getComputedStyle(e);
        let n = "auto" === t.zIndex ? 0 : parseInt(t.zIndex) || 0;
        if (n > 0) return n;
        e = e.parentElement;
      }
      return 0;
    }
    const a = (function () {
      const e = r();
      let t = e.filter((e) => {
        const t = window.getComputedStyle(e).getPropertyValue("overflow-y");
        return (
          ("auto" === t || "scroll" === t) && e.scrollHeight > e.clientHeight
        );
      });
      return (
        0 == t.length &&
          (t = e.filter((e) => {
            const t = window.getComputedStyle(e).getPropertyValue("overflow-y");
            return (
              "auto" === t || "scroll" === t || e.scrollHeight > e.clientHeight
            );
          })),
        t
      );
    })();
    if (0 === a.length) {
      const e = Math.max(
        20,
        Math.min((window.innerHeight || n.clientHeight) / 10, 200),
      );
      return (window.scrollBy(0, e * t), !1);
    }
    const s = a.sort((e, t) => {
        let n = i(t) - i(e);
        if (n > 0) return 1;
        if (n < 0) return -1;
        let r = o(t) - o(e);
        return r > 0 ? 1 : r < 0 ? -1 : 0;
      }),
      l = s[0],
      u = l.clientHeight,
      c = Math.max(20, Math.min(u / 10, 200));
    l.scrollBy(0, c * t);
    const d = s.sort(
      (e, t) =>
        t.getBoundingClientRect().height - e.getBoundingClientRect().height,
    )[0];
    if (d != l) {
      const e = d.clientHeight,
        n = Math.max(20, Math.min(e / 10, 200));
      d.scrollBy(0, n * t);
    }
    return !0;
  }
  class av extends Qf {
    async screenshot(e) {
      let t,
        n = await this.getWindowId(e);
      try {
        t = await chrome.tabs.captureVisibleTab(n, {
          format: "jpeg",
          quality: 60,
        });
      } catch (e) {
        (await this.sleep(1e3),
          (t = await chrome.tabs.captureVisibleTab(n, {
            format: "jpeg",
            quality: 60,
          })));
      }
      return {
        imageBase64: t.substring(t.indexOf("base64,") + 7),
        imageType: "image/jpeg",
      };
    }
    async navigate_to(e, t) {
      let n = await this.getWindowId(e),
        r = await chrome.tabs.create({ url: t, windowId: n });
      ((r = await this.waitForTabComplete(r.id)),
        await this.sleep(200),
        e.variables.set("windowId", r.windowId));
      let o = e.variables.get("navigateTabIds") || [];
      return (
        o.push(r.id),
        e.variables.set("navigateTabIds", o),
        { url: t, title: r.title, tabId: r.id }
      );
    }
    async get_all_tabs(e) {
      let t = await this.getWindowId(e),
        n = await chrome.tabs.query({ windowId: t }),
        r = [];
      for (let e = 0; e < n.length; e++) {
        let t = n[e];
        r.push({ tabId: t.id, url: t.url, title: t.title });
      }
      return r;
    }
    async switch_tab(e, t) {
      let n = await chrome.tabs.update(t, { active: !0 });
      if (!n) throw new Error("tabId does not exist: " + t);
      return (
        e.variables.set("windowId", n.windowId),
        { tabId: n.id, url: n.url, title: n.title }
      );
    }
    async go_back(e) {
      try {
        if (
          (await this.execute_script(
            e,
            () => window.navigation.canGoBack,
            [],
          )) +
            "" ==
          "true"
        )
          return (
            await this.execute_script(e, () => {
              window.navigation.back();
            }, []),
            void (await this.sleep(100))
          );
        if ((await this.execute_script(e, () => window.history.length, [])) > 1)
          await this.execute_script(e, () => {
            window.history.back();
          }, []);
        else {
          let t = e.variables.get("navigateTabIds");
          if (t && t.length > 0)
            return await this.switch_tab(e, t[t.length - 1]);
        }
        await this.sleep(100);
      } catch (e) {
        console.error("BrowserAgent, go_back, error: ", e);
      }
    }
    async execute_script(e, t, n) {
      let r = await this.getTabId(e);
      return (
        await chrome.scripting.executeScript({
          target: { tabId: r },
          func: t,
          args: n,
        })
      )[0].result;
    }
    async getTabId(e) {
      let t = await this.getWindowId(e),
        n = await chrome.tabs.query({
          windowId: t,
          active: !0,
          windowType: "normal",
        });
      return (
        0 == n.length &&
          (n = await chrome.tabs.query({ windowId: t, windowType: "normal" })),
        n[n.length - 1].id
      );
    }
    async getWindowId(e) {
      let t = e.variables.get("windowId");
      if (t) return t;
      let n = await chrome.windows.getLastFocused({ windowTypes: ["normal"] });
      if (
        (n ||
          (n = await chrome.windows.getCurrent({ windowTypes: ["normal"] })),
        n)
      )
        return n.id;
      let r = await chrome.tabs.query({
        windowType: "normal",
        currentWindow: !0,
      });
      return (
        0 == r.length &&
          (r = await chrome.tabs.query({
            windowType: "normal",
            lastFocusedWindow: !0,
          })),
        r[r.length - 1].windowId
      );
    }
    async waitForTabComplete(e, t = 8e3) {
      return new Promise(async (n, r) => {
        const o = setTimeout(async () => {
            chrome.tabs.onUpdated.removeListener(i);
            let t = await chrome.tabs.get(e);
            (t.status, n(t));
          }, t),
          i = async (t, r, a) => {
            t == e &&
              "complete" === r.status &&
              (chrome.tabs.onUpdated.removeListener(i), clearTimeout(o), n(a));
          };
        let a = await chrome.tabs.get(e);
        if ("complete" === a.status) return (n(a), void clearTimeout(o));
        chrome.tabs.onUpdated.addListener(i);
      });
    }
    sleep(e) {
      return new Promise((t) => setTimeout(() => t(), e));
    }
  }
  function sv(e, t, n) {
    chrome.runtime.sendMessage({
      type: "log",
      log: e + "",
      level: t || "info",
      stream: n,
    });
  }
  var lv;
  (chrome.storage.local.set({ running: !1 }),
    chrome.runtime.onMessage.addListener(async function (e, t, n) {
      if ("run" == e.type)
        try {
          (chrome.runtime.sendMessage({ type: "log", log: "Generating plan..." }),
            chrome.storage.local.set({ waitingForConfirmation: false }),
            (lv = await (async function (e) {
              let t = await (async function (e = "llmConfig") {
                return (await chrome.storage.sync.get([e]))[e];
              })();
              if (!t || !t.apiKey)
                return (
                  sv(
                    "Please configure apiKey, configure in the eko extension options of the browser extensions.",
                    "error",
                  ),
                  chrome.runtime.openOptionsPage(),
                  chrome.storage.local.set({ running: !1 }),
                  void chrome.runtime.sendMessage({ type: "stop" })
                );
              const n = {
                default: {
                  provider: t.llm,
                  model: t.modelName,
                  apiKey: t.apiKey,
                  config: { baseURL: t.options.baseURL },
                },
              };
              let r = {
                  onMessage: async (e) => {
                    if ("workflow" == e.type) {
                      if (e.streamDone) {
                        // 发送完整的workflow给前端等待确认
                        chrome.runtime.sendMessage({
                          type: "workflow_confirmation",
                          workflow: e.workflow,
                          taskId: e.taskId
                        });
                        chrome.storage.local.set({ waitingForConfirmation: true });
                        sv("Plan generated. Please review and confirm to proceed.", "info");
                      } else {
                        sv("Plan\n" + e.workflow.xml, "info", !e.streamDone);
                      }
                    } else if ("text" == e.type) {
                      sv(e.text, "info", !e.streamDone);
                    } else if ("tool_streaming" == e.type) {
                      sv(
                        `${e.agentName} > ${e.toolName}\n${e.paramsText}`,
                        "info",
                        !0,
                      );
                    } else if ("tool_use" == e.type) {
                      sv(
                        `${e.agentName} > ${e.toolName}\n${JSON.stringify(e.params)}`,
                      );
                    }
                    console.log("message: ", JSON.stringify(e, null, 2));
                  },
                  onHumanConfirm: async (e, t) =>
                    (async function (e) {
                      let t = await chrome.tabs.query({
                        active: !0,
                        windowType: "normal",
                      });
                      return (
                        await chrome.scripting.executeScript({
                          target: { tabId: t[0].id },
                          func: (e) => window.confirm(e),
                          args: [e],
                        })
                      )[0].result;
                    })(t),
                },
                o = [new av()],
                i = new Pf({ llms: n, agents: o, callback: r });
              return (
                i
                  .generate(e)
                  .then((workflow) => {
                    // 只生成计划，不立即执行
                    sv("Plan generated successfully. Please review and confirm.", "success");
                  })
                  .catch((e) => {
                    sv(e, "error");
                    chrome.storage.local.set({ running: !1 });
                    chrome.runtime.sendMessage({ type: "stop" });
                  }),
                i
              );
            })(e.prompt)));
        } catch (e) {
          (console.error(e),
            chrome.runtime.sendMessage({
              type: "log",
              log: e + "",
              level: "error",
            }));
        }
      else
        "stop" == e.type
          ? (lv &&
              lv.getAllTaskId().forEach((e) => {
                (lv.abortTask(e),
                  chrome.runtime.sendMessage({
                    type: "log",
                    log: "Abort taskId: " + e,
                  }));
              }),
            chrome.runtime.sendMessage({ type: "log", log: "Stop" }))
          : "workflow_confirmed" == e.type
            ? (chrome.storage.local.set({ waitingForConfirmation: false }),
              lv && lv.continueExecution && lv.continueExecution(e.workflow))
            : "workflow_modified" == e.type &&
              (chrome.storage.local.set({ waitingForConfirmation: false }),
              lv && lv.updateWorkflow && lv.updateWorkflow(e.workflow));
    }),
    chrome.sidePanel &&
      chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: !0 }));
})();
