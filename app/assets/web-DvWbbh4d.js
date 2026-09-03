import { r as reactExports, u as useNobleCoreConnection, m as me, l as listServers, B as BASE_URL, p as preloadHubImages, b as mergeHubContent, c as APPS, j as jsxRuntimeExports, S as StudioApp, n as noblecoreLogo, N as NobleCoreAuthModal, d as AppIcon, e as NobleCoreView, h as heroBanner, f as ServerModal, V as VoiceStatusBar, R as ReactDOM, a as React } from "./App-CbRnlv73.js";
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
  const [showStudio, setShowStudio] = reactExports.useState(false);
  const connection = useNobleCoreConnection(token);
  function handlePlayClick() {
    if (activeApp === "board" || activeApp === "ref") setDesktopPromptOpen(true);
    else setShowStudio(true);
  }
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
  if (showStudio) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(StudioApp, { onExitStudio: () => setShowStudio(false) });
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
          },
          socket: connection.socket,
          joinServerRoom: connection.joinServerRoom,
          voiceCall: connection.voiceCall,
          myVoice: connection.myVoice,
          voiceJoinedAt: connection.voiceJoinedAt,
          voiceElapsed: connection.voiceElapsed,
          voiceParticipants: connection.voiceParticipants,
          onJoinVoice: connection.handleJoinVoice,
          onLeaveVoice: connection.handleLeaveVoice
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "launcher-play-btn", onClick: handlePlayClick, children: activeApp === "hub" ? "AI Studio" : app.title }),
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      VoiceStatusBar,
      {
        myVoice: connection.myVoice,
        voiceCall: connection.voiceCall,
        raised: true,
        hideBanner: !activeServer,
        onLeaveVoice: (channelId) => connection.handleLeaveVoice(channelId, user.id),
        onOpenServer: (serverId) => setActiveServerId(serverId)
      }
    ),
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
function getToken() {
  return localStorage.getItem("nobleCoreToken") || "";
}
async function callGenerateEndpoint(path, body) {
  const token = getToken();
  if (!token) throw new Error("Üretim yapabilmek için NobleCore hesabına giriş yapmalısın.");
  const res = await fetch(`${NOBLECORE_BASE_URL}/generate${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body)
  });
  if (res.status === 401) throw new Error("Oturumun sona ermiş, NobleCore'a tekrar giriş yap.");
  if (res.status === 402) throw new Error("Yetersiz kredi. Devam etmek için bakiyene kredi eklemen gerekiyor.");
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Üretim başarısız oldu.");
  return json;
}
function readProjects() {
  try {
    return JSON.parse(localStorage.getItem("aiStudioProjects") || "{}");
  } catch {
    return {};
  }
}
function writeProjects(projects) {
  localStorage.setItem("aiStudioProjects", JSON.stringify(projects));
}
function defaultProjectNodes() {
  return [{ id: "upload-1", type: "imageUpload", position: { x: 200, y: 200 }, data: {} }];
}
function downloadBlob(blob, fileName) {
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(blobUrl);
}
window.api = {
  getNobleCoreToken: async () => getToken(),
  setNobleCoreToken: async (token) => {
    if (token) localStorage.setItem("nobleCoreToken", token);
    else localStorage.removeItem("nobleCoreToken");
  },
  openExternal: (url) => window.open(url, "_blank", "noopener"),
  // Electron'daki nobleCore:loginWithGoogle handler'iyla ayni akis (bkz.
  // src/main/index.js): bir "state" uretip Google giris sayfasini yeni
  // sekmede acar, sonucu sunucudan periyodik yoklayarak (polling) alir.
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
  // ---- AI Studio: uretim (sunucuya proxy) ----
  extractProps: (imageDataUrl) => callGenerateEndpoint("/extract-props", { imageDataUrl }),
  generatePart: async (imageDataUrl, part) => (await callGenerateEndpoint("/part", { imageDataUrl, part })).dataUrl,
  generateView: async (imageDataUrl, view) => (await callGenerateEndpoint("/view", { imageDataUrl, view })).dataUrl,
  generateAngle: async (imageDataUrl, params) => (await callGenerateEndpoint("/angle", { imageDataUrl, ...params })).dataUrl,
  generateFromPrompt: async (prompt) => (await callGenerateEndpoint("/from-prompt", { prompt })).dataUrl,
  editImageWithPrompt: async (imageDataUrl, prompt) => (await callGenerateEndpoint("/edit-image", { imageDataUrl, prompt })).dataUrl,
  // 3D modeller: masaustu bunlari indirip yerel diske yaziyor (asil-file://
  // protokolu ile servis etmek icin), web'de buna gerek yok -- fal.ai/
  // WaveSpeedAI'nin kendi https URL'leri dogrudan <model-viewer src> ve
  // indirme linkleri icin kullanilabiliyor, hicbir proxy/onbellekleme gerekmez.
  generate3DModel: async (views) => {
    const { modelUrl, objUrl, fbxUrl, thumbnailDataUrl } = await callGenerateEndpoint("/model", { views });
    return {
      modelUrl,
      modelPath: modelUrl,
      objUrl: objUrl || null,
      objPath: objUrl || null,
      fbxUrl: fbxUrl || null,
      fbxPath: fbxUrl || null,
      thumbnailDataUrl
    };
  },
  generate3DModelCheap: async (views) => {
    const { modelUrl } = await callGenerateEndpoint("/model-cheap", { views });
    return { modelUrl, modelPath: modelUrl };
  },
  // ---- Dosya indirme (Electron'un "Farklı Kaydet" dialogunun karsiligi) ----
  saveImage: async (dataUrl, fileName) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = fileName || "gorsel.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    return { saved: true };
  },
  // sourceUrl burada yerel bir dosya yolu degil, yukaridaki generate3DModel'in
  // dondurdugu uzak (https) URL -- fetch'leyip Blob olarak indiriyoruz.
  save3DModel: async (sourceUrl, suggestedName) => {
    try {
      const res = await fetch(sourceUrl);
      if (!res.ok) return { saved: false };
      downloadBlob(await res.blob(), suggestedName || "model.glb");
      return { saved: true };
    } catch {
      return { saved: false };
    }
  },
  saveModelText: async (content, suggestedName) => {
    downloadBlob(new Blob([content], { type: "text/plain" }), suggestedName || "model.obj");
    return { saved: true };
  },
  // ---- Projeler (tarayicida localStorage — bkz. yukaridaki not) ----
  listProjects: async () => {
    const projects = readProjects();
    return Object.values(projects).sort((a, b) => b.updatedAt - a.updatedAt);
  },
  createProject: async () => {
    const id = `proj-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const now = Date.now();
    const project = { id, name: "İsimsiz Proje", createdAt: now, updatedAt: now, nodes: defaultProjectNodes(), edges: [] };
    const projects = readProjects();
    projects[id] = project;
    writeProjects(projects);
    return project;
  },
  saveProject: async ({ id, nodes, edges }) => {
    const projects = readProjects();
    const existing = projects[id];
    if (!existing) throw new Error("Proje bulunamadı.");
    existing.nodes = nodes;
    existing.edges = edges;
    existing.updatedAt = Date.now();
    writeProjects(projects);
    return existing;
  },
  renameProject: async (id, name) => {
    const projects = readProjects();
    const existing = projects[id];
    if (!existing) throw new Error("Proje bulunamadı.");
    existing.name = name;
    existing.updatedAt = Date.now();
    writeProjects(projects);
    return existing;
  },
  deleteProject: async (id) => {
    const projects = readProjects();
    delete projects[id];
    writeProjects(projects);
    return true;
  },
  // ---- Kredi ----
  getCreditBalance: async () => {
    const token = getToken();
    if (!token) return null;
    const res = await fetch(`${NOBLECORE_BASE_URL}/credits/me`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return null;
    const { balance, hasPendingRequest } = await res.json();
    return { balance, hasPendingRequest };
  },
  requestCredits: async () => {
    const token = getToken();
    if (!token) throw new Error("Kredi isteyebilmek için NobleCore hesabına giriş yapmalısın.");
    const res = await fetch(`${NOBLECORE_BASE_URL}/credits/request`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Kredi isteği gönderilemedi.");
    }
    return { ok: true };
  }
};
window.addEventListener("contextmenu", (e) => e.preventDefault());
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(WebApp, {}) })
);
