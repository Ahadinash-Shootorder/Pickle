"use client";

import type { AdminView } from "./nav";
import { ADMIN_NAV } from "./nav";

type Props = {
  view: AdminView;
  onNavigate: (view: AdminView) => void;
  onLogout: () => void;
  onPreview: () => void;
  isDirty?: boolean;
  children: React.ReactNode;
  topbarExtra?: React.ReactNode;
};

export default function AdminShell({
  view,
  onNavigate,
  onLogout,
  onPreview,
  children,
  topbarExtra,
}: Props) {
  const contentItems = ADMIN_NAV.filter((n) => n.group === "content");
  const settingsItems = ADMIN_NAV.filter((n) => n.group === "settings");

  const current = ADMIN_NAV.find((n) => n.id === view);

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h1>Content Manager</h1>
          <p>The Pachadi Project</p>
        </div>

        <nav>
          <div className="admin-nav-group">
            <button
              type="button"
              className={`admin-nav-item ${view === "home" ? "active" : ""}`}
              onClick={() => onNavigate("home")}
            >
              <span className="admin-nav-icon">🏠</span>
              Dashboard
            </button>
          </div>

          <div className="admin-nav-group">
            <p className="admin-nav-label">Website Content</p>
            {contentItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-item ${view === item.id ? "active" : ""}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          <div className="admin-nav-group">
            <p className="admin-nav-label">Settings</p>
            {settingsItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-item ${view === item.id ? "active" : ""}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="admin-sidebar-footer">
          <button
            type="button"
            className="admin-nav-item"
            onClick={onPreview}
            style={{ width: "100%" }}
          >
            <span className="admin-nav-icon">🌐</span>
            View live website
          </button>
          <button type="button" className="admin-nav-item" onClick={onLogout}>
            <span className="admin-nav-icon">🚪</span>
            Log out
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-mobile-nav">
          <select
            value={view}
            onChange={(e) => onNavigate(e.target.value as AdminView)}
          >
            <option value="home">🏠 Dashboard</option>
            {ADMIN_NAV.map((item) => (
              <option key={item.id} value={item.id}>
                {item.icon} {item.label}
              </option>
            ))}
          </select>
        </div>

        <header className="admin-topbar">
          <div>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--admin-muted)" }}>
              {view === "home" ? "Dashboard" : current?.group === "settings" ? "Settings" : "Content"}
            </p>
            <p style={{ margin: 0, fontWeight: 600, fontSize: "0.95rem" }}>
              {view === "home" ? "Welcome" : current?.label}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {topbarExtra}
            <button type="button" onClick={onPreview} className="admin-btn admin-btn-secondary">
              Preview site
            </button>
          </div>
        </header>

        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
