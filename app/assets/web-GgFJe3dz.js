import { r as reactExports, m as me, l as listServers, B as BASE_URL, p as preloadHubImages, d as mergeHubContent, A as APPS, j as jsxRuntimeExports, n as noblecoreLogo, f as NobleCoreAuthModal, e as AppIcon, N as NobleCoreView, h as heroBanner, S as ServerModal, i as client, R as React } from "./index-BQY5OmkW.js";
const STORE_URL = "https://apps.microsoft.com/detail/9NKLQ2P3X6DZ";
function WebApp() {
  const [token, setTokenState] = reactExports.useState(null);
  const [user, setUser] = reactExports.useState(null);
  const [servers, setServers] = reactExports.useState([]);
  const [activeServerId, setActiveServerId] = reactExports.useState(null);
  const [activeApp, setActiveApp] = reactExports.useState("hub");
  const [hubContent, setHubContent] = reactExports.useState({});
  const [authModalOpen, setAuthModalOpen] = reactExports.useState(false);
  const [serverModalOpen, setServerModalOpen] = reactExports.useState(false);
  const [checkingSession, setCheckingSession] = reactExports.useState(true);
  const [desktopPromptOpen, setDesktopPromptOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    window.api.getNobleCoreToken().then(async (savedToken) => {
      if (!savedToken || cancelled) {
        if (!cancelled) setCheckingSession(false);
        return;
      }
      try {
        const { user: savedUser } = await me(savedToken);
        if (cancelled) return;
        setTokenState(savedToken);
        setUser(savedUser);
        const { servers: savedServers } = await listServers(savedToken);
        if (!cancelled) setServers(savedServers);
      } catch {
      } finally {
        if (!cancelled) setCheckingSession(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);
  reactExports.useEffect(() => {
    let cancelled = false;
    fetch(`${BASE_URL}/content/hub`, { cache: "no-store" }).then((res) => res.ok ? res.json() : {}).then((data) => {
      if (!cancelled) {
        setHubContent(data || {});
        preloadHubImages(data);
      }
    }).catch(() => {
    });
    return () => {
      cancelled = true;
    };
  }, []);
  function handleAuthenticated(newToken, newUser) {
    setTokenState(newToken);
    setUser(newUser);
    setAuthModalOpen(false);
    listServers(newToken).then(({ servers: freshServers }) => setServers(freshServers)).catch(() => {
    });
    setServerModalOpen(true);
  }
  function handleServerReady(server) {
    setServerModalOpen(false);
    setServers((prev) => prev.some((s) => s.id === server.id) ? prev : [...prev, server]);
    setActiveServerId(server.id);
  }
  function handleServerRenamed(updated) {
    setServers((prev) => prev.map((s) => s.id === updated.id ? { ...s, name: updated.name } : s));
  }
  function handleServerLeftOrDeleted(serverId) {
    setServers((prev) => prev.filter((s) => s.id !== serverId));
    setActiveServerId((cur) => cur === serverId ? null : cur);
  }
  function handleLogout() {
    window.api.setNobleCoreToken("");
    setTokenState(null);
    setUser(null);
    setServers([]);
    setActiveServerId(null);
  }
  function handleAddServerClick() {
    if (token) setServerModalOpen(true);
    else setAuthModalOpen(true);
  }
  const activeServer = servers.find((s) => s.id === activeServerId);
  const app = mergeHubContent(APPS[activeApp], hubContent[activeApp]);
  if (checkingSession) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "web-landing" });
  }
  if (!token) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "web-landing", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "web-landing-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: noblecoreLogo, alt: "NobleCore", className: "web-landing-logo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "NobleCore" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Arkadaşlarınla sohbet et, sunucular kur, sesli kanallara katıl." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary web-landing-cta", onClick: () => setAuthModalOpen(true), children: "Giriş Yap / Kayıt Ol" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NobleCoreAuthModal, { open: authModalOpen, onClose: () => setAuthModalOpen(false), onAuthenticated: handleAuthenticated })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launcher", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launcher-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launcher-server-rail", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `launcher-rail-icon launcher-rail-brand${!activeServer && activeApp === "hub" ? " launcher-rail-icon-active" : ""}`,
            onClick: () => {
              setActiveServerId(null);
              setActiveApp("hub");
            },
            title: "Hub",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppIcon, { icon: APPS.hub.icon, className: "launcher-rail-brand-icon" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "launcher-rail-divider" }),
        servers.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `launcher-rail-icon launcher-rail-server${s.id === activeServerId ? " launcher-rail-icon-active" : ""}`,
            title: s.name,
            onClick: () => setActiveServerId(s.id),
            children: s.icon_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "launcher-rail-icon-img", src: s.icon_url, alt: "" }) : s.name.slice(0, 2).toUpperCase()
          },
          s.id
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "launcher-rail-icon launcher-rail-add", title: "Sunucu oluştur veya katıl", onClick: handleAddServerClick, children: "+" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "launcher-main-column", children: activeServer ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        NobleCoreView,
        {
          token,
          user,
          server: activeServer,
          onBack: () => setActiveServerId(null),
          onServerRenamed: handleServerRenamed,
          onServerLeftOrDeleted: handleServerLeftOrDeleted,
          onLogout: handleLogout,
          onUserUpdated: (patch) => setUser((prev) => ({ ...prev, ...patch })),
          onTokenRefresh: (newToken) => {
            window.api.setNobleCoreToken(newToken);
            setTokenState(newToken);
          }
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "launcher-topbar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launcher-tabs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `launcher-tab launcher-tab-ref${activeApp === "ref" ? " launcher-tab-active" : ""}`,
              onClick: () => setActiveApp("ref"),
              title: "NobleRef",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppIcon, { icon: APPS.ref.icon, className: "launcher-tab-icon" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `launcher-tab launcher-tab-ai${activeApp === "studio" ? " launcher-tab-active" : ""}`,
              onClick: () => setActiveApp("studio"),
              title: "NobleAi",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppIcon, { icon: APPS.studio.icon, className: "launcher-tab-icon" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `launcher-tab launcher-tab-board${activeApp === "board" ? " launcher-tab-active" : ""}`,
              onClick: () => setActiveApp("board"),
              title: "Kanban",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppIcon, { icon: APPS.board.icon, className: "launcher-tab-icon" })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launcher-body", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launcher-side-art", children: [
            app.banner ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "launcher-side-art-banner", src: app.banner, alt: app.title }, app.banner),
              activeApp !== "hub" && /* @__PURE__ */ jsxRuntimeExports.jsx(AppIcon, { icon: app.icon, className: "launcher-side-art-badge" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launcher-side-art-fallback", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AppIcon, { icon: app.icon, className: "launcher-side-art-logo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "launcher-side-art-title", children: app.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "launcher-side-art-fade" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launcher-side-art-footer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "launcher-play-btn", onClick: () => setDesktopPromptOpen(true), children: activeApp === "hub" ? "AI Studio" : app.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "launcher-side-art-version", children: "Sürüm: 1.0.0" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launcher-main", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "launcher-hero", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                className: "launcher-hero-banner-img",
                src: app.heroBannerOverride || heroBanner,
                alt: app.title
              },
              app.heroBannerOverride || heroBanner
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launcher-featured", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Öne Çıkanlar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "launcher-featured-grid", children: app.features.map((f, i) => {
                const Tag = f.url ? "button" : "div";
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Tag,
                  {
                    className: "launcher-featured-card",
                    ...f.url ? { onClick: () => window.api.openExternal(f.url) } : {},
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launcher-featured-thumb", children: [
                        f.thumb ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "launcher-featured-thumb-img", src: f.thumb, alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "launcher-featured-thumb-icon", children: f.icon }),
                        f.url && f.url.includes("youtube.com") && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "launcher-featured-play", children: "▶" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launcher-featured-body", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "launcher-featured-tag", style: { color: f.tagColor }, children: f.tag }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "launcher-featured-title", children: f.title })
                      ] })
                    ]
                  },
                  activeApp + "-" + i
                );
              }) })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NobleCoreAuthModal, { open: authModalOpen, onClose: () => setAuthModalOpen(false), onAuthenticated: handleAuthenticated }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ServerModal, { open: serverModalOpen, onClose: () => setServerModalOpen(false), token, username: user?.username, onServerReady: handleServerReady }),
    desktopPromptOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: () => setDesktopPromptOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Masaüstü uygulaması gerekiyor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "AI Studio, Kanban ve NobleRef gibi üretim araçları şu an sadece Windows masaüstü uygulamasında çalışıyor. Bu tarayıcı sürümü sadece sohbet özelliklerini içerir." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => setDesktopPromptOpen(false), children: "Kapat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "btn btn-primary", href: STORE_URL, target: "_blank", rel: "noopener", children: "Masaüstü Uygulamasını İndir" })
      ] })
    ] }) })
  ] });
}
const NOBLECORE_BASE_URL = "https://api.noblecore.net";
window.api = {
  getNobleCoreToken: async () => localStorage.getItem("nobleCoreToken") || "",
  setNobleCoreToken: async (token) => {
    if (token) localStorage.setItem("nobleCoreToken", token);
    else localStorage.removeItem("nobleCoreToken");
  },
  openExternal: (url) => window.open(url, "_blank", "noopener"),
  // Electron'daki nobleCore:loginWithGoogle handler'iyla ayni akis (bkz.
  // src/main/index.js): bir "state" uretip Google giris sayfasini yeni
  // sekmede acar, sonucu sunucudan periyodik yoklayarak (polling) alir.
  // Orijinali sistem tarayicisi acmak zorunda oldugu icin boyle tasarlanmisti
  // (Electron gomulu OAuth'a izin vermiyor) — ama akisin kendisi zaten sadece
  // fetch + window.open kullaniyor, tarayicida da oldugu gibi calisiyor.
  loginWithGoogle: async () => {
    const state = crypto.randomUUID();
    window.open(`${NOBLECORE_BASE_URL}/auth/google/start?state=${state}`, "_blank", "noopener");
    const deadline = Date.now() + 5 * 60 * 1e3;
    while (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 2e3));
      const res = await fetch(`${NOBLECORE_BASE_URL}/auth/google/poll?state=${state}`);
      const data = await res.json().catch(() => ({}));
      if (data.status === "done") {
        localStorage.setItem("nobleCoreToken", data.token);
        return { token: data.token, user: data.user };
      }
      if (data.status === "error") throw new Error(data.error || "Google ile giriş başarısız oldu.");
      if (data.status === "expired") throw new Error("Giriş bağlantısının süresi doldu, tekrar dene.");
    }
    throw new Error("Giriş zaman aşımına uğradı, tekrar dene.");
  },
  saveImage: async (dataUrl, fileName) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = fileName || "gorsel.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    return { saved: true };
  }
};
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(WebApp, {}) })
);
