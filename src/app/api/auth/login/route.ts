import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createSessionToken,
  getAdminPassword,
  sessionCookieOptions,
  clearSessionCookieOptions,
} from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password !== getAdminPassword()) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createSessionToken();
  const jar = await cookies();
  jar.set(sessionCookieOptions(token));

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.set(clearSessionCookieOptions());
  return NextResponse.json({ ok: true });
}
