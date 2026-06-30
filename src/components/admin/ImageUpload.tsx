"use client";

import { useRef, useState } from "react";
import { Field } from "./ui";

type Props = {
  value: string;
  onChange: (path: string) => void;
  label?: string;
  hint?: string;
  aspect?: "square" | "wide" | "tall";
};

const previewSize = {
  square: { width: 160, height: 160 },
  wide: { width: 280, height: 187 },
  tall: { width: 200, height: 250 },
} as const;

function fileName(path: string) {
  if (!path) return "";
  return path.split("/").pop() || path;
}

export default function ImageUpload({
  value,
  onChange,
  label,
  hint,
  aspect = "tall",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const size = previewSize[aspect];

  const upload = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not upload photo");
      onChange(data.path);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) upload(file);
  };

  const inner = (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = "";
        }}
      />
      {value ? (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "1rem" }}>
          <div
            style={{
              width: size.width,
              height: size.height,
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid var(--admin-border)",
              background: "var(--admin-bg)",
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Current photo preview"
              width={size.width}
              height={size.height}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                color: "var(--admin-muted)",
                wordBreak: "break-all",
              }}
            >
              Current: <strong style={{ color: "var(--admin-text)" }}>{fileName(value)}</strong>
            </p>
            <button
              type="button"
              disabled={uploading}
              className="admin-btn admin-btn-secondary"
              onClick={() => inputRef.current?.click()}
            >
              {uploading ? "Uploading…" : "Change photo"}
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-danger"
              onClick={() => onChange("")}
            >
              Remove photo
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`admin-dropzone ${dragging ? "dragging" : ""}`}
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📷</div>
          <p style={{ fontWeight: 600, margin: "0 0 0.25rem" }}>
            {uploading ? "Uploading your photo…" : "Click or drag a photo here"}
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--admin-muted)", margin: 0 }}>
            JPG, PNG or WebP · Max 5 MB
          </p>
        </div>
      )}
      {error && (
        <p style={{ color: "var(--admin-danger)", fontSize: "0.8rem", marginTop: "0.5rem" }}>
          {error}
        </p>
      )}
    </>
  );

  if (label) {
    return (
      <Field label={label} hint={hint}>
        {inner}
      </Field>
    );
  }

  return <div>{inner}</div>;
}
