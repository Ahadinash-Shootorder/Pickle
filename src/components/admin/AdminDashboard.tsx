"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { SiteContent } from "@/lib/types";
import type { AdminView } from "./nav";
import AdminShell from "./AdminShell";
import AdminHome from "./AdminHome";
import AdminEditors from "./AdminEditors";
import { Toast } from "./ui";

type Props = {
  initial: SiteContent;
};

function cloneContent(data: SiteContent): SiteContent {
  return JSON.parse(JSON.stringify(data)) as SiteContent;
}

export default function AdminDashboard({ initial }: Props) {
  const [saved, setSaved] = useState<SiteContent>(() => cloneContent(initial));
  const [draft, setDraft] = useState<SiteContent>(() => cloneContent(initial));
  const [view, setView] = useState<AdminView>("home");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const isDirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(saved),
    [draft, saved],
  );

  const update = useCallback(<K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    setDraft((c) => ({ ...c, [key]: value }));
  }, []);

  const discard = useCallback(() => {
    setDraft(cloneContent(saved));
    setToast({ msg: "Unsaved changes discarded.", type: "success" });
    setTimeout(() => setToast(null), 3000);
  }, [saved]);

  const confirmDiscard = useCallback(() => {
    if (!isDirty) return true;
    return window.confirm(
      "You have unsaved changes. Leave without saving? Your changes will be discarded.",
    );
  }, [isDirty]);

  const navigate = useCallback(
    (next: AdminView) => {
      if (next === view) return;
      if (!confirmDiscard()) return;
      if (isDirty) setDraft(cloneContent(saved));
      setView(next);
    },
    [view, confirmDiscard, isDirty, saved],
  );

  const save = async () => {
    setSaving(true);
    setToast(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) throw new Error("Save failed");
      const snapshot = cloneContent(draft);
      setSaved(snapshot);
      setDraft(snapshot);
      setToast({ msg: "✓ Saved! Your website is updated.", type: "success" });
      setTimeout(() => setToast(null), 4000);
    } catch {
      setToast({ msg: "Could not save. Please try again.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    if (!confirmDiscard()) return;
    await fetch("/api/auth/login", { method: "DELETE" });
    window.location.reload();
  };

  const previewSite = () => {
    if (isDirty) {
      const ok = window.confirm(
        "Preview shows the live saved website, not your unsaved edits. Continue?",
      );
      if (!ok) return;
    }
    window.open("/", "_blank");
  };

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  return (
    <AdminShell
      view={view}
      onNavigate={navigate}
      onLogout={logout}
      onPreview={previewSite}
      isDirty={isDirty}
      topbarExtra={
        <>
          {isDirty && (
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#b45309",
                background: "#fef3c7",
                padding: "0.35rem 0.65rem",
                borderRadius: 6,
              }}
            >
              Unsaved changes
            </span>
          )}
          {isDirty && (
            <button
              type="button"
              onClick={discard}
              className="admin-btn admin-btn-secondary"
            >
              Discard
            </button>
          )}
          <button
            type="button"
            onClick={save}
            disabled={saving || !isDirty}
            className="admin-btn admin-btn-primary"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </>
      }
    >
      {view === "home" ? (
        <AdminHome
          onNavigate={navigate}
          productCount={draft.products.length}
          slideCount={draft.heroBanners.length}
          reviewCount={draft.testimonialsSection.items.length}
        />
      ) : (
        <AdminEditors view={view} content={draft} update={update} />
      )}

      {toast && <Toast message={toast.msg} type={toast.type} />}
    </AdminShell>
  );
}
