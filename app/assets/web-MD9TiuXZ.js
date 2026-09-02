import { r as reactExports, m as me, l as listServers, j as jsxRuntimeExports, n as noblecoreLogo, d as NobleCoreAuthModal, N as NobleCoreView, S as ServerModal, e as client, R as React } from "./index-CFjSTMH6.js";
function WebApp() {
  const [token, setTokenState] = reactExports.useState(null);
  const [user, setUser] = reactExports.useState(null);
  const [servers, setServers] = reactExports.useState([]);
  const [activeServerId, setActiveServerId] = reactExports.useState(null);
  const [authModalOpen, setAuthModalOpen] = reactExports.useState(false);
  const [serverModalOpen, setServerModalOpen] = reactExports.useState(false);
  const [checkingSession, setCheckingSession] = reactExports.useState(true);
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
  const activeServer = servers.find((s) => s.id === activeServerId);
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
            className: `launcher-rail-icon launcher-rail-brand${!activeServer ? " launcher-rail-icon-active" : ""}`,
            onClick: () => setActiveServerId(null),
            title: "NobleCore",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: noblecoreLogo, className: "launcher-rail-brand-icon", alt: "" })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "launcher-rail-icon launcher-rail-add", title: "Sunucu oluştur veya katıl", onClick: () => setServerModalOpen(true), children: "+" })
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
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "web-empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: noblecoreLogo, alt: "", className: "web-empty-state-logo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Henüz bir sunucun yok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Soldaki + butonuna basarak yeni bir sunucu kur ya da bir davet koduyla katıl." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: () => setServerModalOpen(true), children: "Sunucu Oluştur / Katıl" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ServerModal,
      {
        open: serverModalOpen,
        onClose: () => setServerModalOpen(false),
        token,
        username: user?.username,
        onServerReady: handleServerReady
      }
    )
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
