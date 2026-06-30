"use client";

import { useState } from "react";
import { Field, Input } from "./ui";

type Props = {
  onSuccess: () => void;
};

export default function AdminLogin({ onSuccess }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error("Invalid password");
      onSuccess();
    } catch {
      setError("Wrong password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrap">
      <form onSubmit={submit} className="admin-login-card">
        <div className="admin-login-logo">🫙</div>
        <h1>Welcome back</h1>
        <p>Sign in to update your pickle website — no tech skills needed.</p>
        <Field label="Password">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            autoFocus
          />
        </Field>
        {error && (
          <p style={{ color: "var(--admin-danger)", fontSize: "0.875rem", margin: "0 0 1rem" }}>
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="admin-btn admin-btn-primary"
          style={{ width: "100%", padding: "0.75rem" }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
