"use client";

import type { AdminView } from "./nav";
import { ADMIN_NAV } from "./nav";
import { PageHeader } from "./ui";

type Props = {
  onNavigate: (view: AdminView) => void;
  productCount: number;
  slideCount: number;
  reviewCount: number;
};

export default function AdminHome({ onNavigate, productCount, slideCount, reviewCount }: Props) {
  const counts: Partial<Record<AdminView, number>> = {
    "hero-slides": slideCount,
    products: productCount,
    reviews: reviewCount,
  };

  return (
    <>
      <PageHeader
        title="Welcome to your website manager"
        description="Pick a section below to update text, photos, or prices. When you're done, click Save in the top-right corner."
      />

      <div style={{ marginBottom: "1.5rem" }} className="admin-card">
        <h3 className="admin-card-title">Quick tips</h3>
        <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem", color: "var(--admin-muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>
          <li>Upload photos by clicking or dragging them into the box</li>
          <li>Changes go live only after you press <strong>Save</strong></li>
          <li>Use <strong>Preview site</strong> to check how it looks</li>
          <li>Prices in the menu update automatically from your products</li>
        </ul>
      </div>

      <p className="admin-nav-label" style={{ color: "var(--admin-muted)", padding: "0 0 0.75rem" }}>
        WEBSITE CONTENT
      </p>
      <div className="admin-dash-grid" style={{ marginBottom: "2rem" }}>
        {ADMIN_NAV.filter((n) => n.group === "content").map((item) => (
          <button
            key={item.id}
            type="button"
            className="admin-dash-card"
            onClick={() => onNavigate(item.id)}
          >
            <div className="admin-dash-card-icon">{item.icon}</div>
            <h3>
              {item.label}
              {counts[item.id] != null && (
                <span style={{ fontWeight: 400, color: "var(--admin-muted)", fontSize: "0.8rem" }}>
                  {" "}
                  · {counts[item.id]}
                </span>
              )}
            </h3>
            <p>{item.description}</p>
          </button>
        ))}
      </div>

      <p className="admin-nav-label" style={{ color: "var(--admin-muted)", padding: "0 0 0.75rem" }}>
        SETTINGS
      </p>
      <div className="admin-dash-grid">
        {ADMIN_NAV.filter((n) => n.group === "settings").map((item) => (
          <button
            key={item.id}
            type="button"
            className="admin-dash-card"
            onClick={() => onNavigate(item.id)}
          >
            <div className="admin-dash-card-icon">{item.icon}</div>
            <h3>{item.label}</h3>
            <p>{item.description}</p>
          </button>
        ))}
      </div>
    </>
  );
}
