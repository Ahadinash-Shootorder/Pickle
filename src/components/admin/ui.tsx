"use client";

import { useState, type ReactNode } from "react";

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="admin-page-header">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export function Card({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="admin-card">
      {title && <h3 className="admin-card-title">{title}</h3>}
      {description && <p className="admin-card-desc">{description}</p>}
      {children}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      {children}
      {hint && <p className="admin-field-hint">{hint}</p>}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="admin-input" {...props} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="admin-textarea" {...props} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className="admin-select" {...props} />;
}

export function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  if (!message) return null;
  return <div className={`admin-toast ${type}`}>{message}</div>;
}

export function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="admin-stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`admin-star-btn ${n <= value ? "on" : ""}`}
          onClick={() => onChange(n)}
          aria-label={`${n} stars`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export function LinkPicker({
  value,
  onChange,
  options,
  label,
  hint,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  label: string;
  hint?: string;
}) {
  const isPreset = options.some((o) => o.value === value);
  const [custom, setCustom] = useState(!isPreset && value !== "");

  return (
    <Field
      label={label}
      hint={hint || "Choose where the button should take visitors"}
    >
      <Select
        value={custom ? "__custom__" : value}
        onChange={(e) => {
          if (e.target.value === "__custom__") {
            setCustom(true);
          } else {
            setCustom(false);
            onChange(e.target.value);
          }
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
        <option value="__custom__">Type a custom link…</option>
      </Select>
      {custom && (
        <Input
          className="mt-2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. #collection or https://..."
          style={{ marginTop: "0.5rem" }}
        />
      )}
    </Field>
  );
}

export function CollectionLayout({
  title,
  count,
  onAdd,
  addLabel,
  list,
  editor,
}: {
  title: string;
  count: number;
  onAdd: () => void;
  addLabel: string;
  list: ReactNode;
  editor: ReactNode;
}) {
  return (
    <>
      <PageHeader
        title={title}
        description="Click an item on the left to edit it. Press Save when you're done."
      />
      <div className="admin-collection">
        <div className="admin-entry-list">
          <div className="admin-entry-list-header">
            <span>{count} entries</span>
            <button type="button" className="admin-btn admin-btn-ghost" onClick={onAdd}>
              + {addLabel}
            </button>
          </div>
          {list}
        </div>
        <div>{editor}</div>
      </div>
    </>
  );
}

export function EntryButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" className={`admin-entry-item ${active ? "active" : ""}`} onClick={onClick}>
      <span className="admin-entry-item-name">{children}</span>
    </button>
  );
}

export function AddRowButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" className="admin-btn admin-btn-secondary" onClick={onClick}>
      + {label}
    </button>
  );
}

export function RemoveButton({ onClick, label }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" className="admin-btn admin-btn-danger" onClick={onClick}>
      {label || "Delete"}
    </button>
  );
}
