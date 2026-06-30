import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";
import type { SiteContent } from "./types";

const CONTENT_PATH = path.join(process.cwd(), "content", "site.json");

export function getContentPath() {
  return CONTENT_PATH;
}

export function getContent(): SiteContent {
  noStore();
  const raw = readFileSync(CONTENT_PATH, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export function saveContent(content: SiteContent): void {
  writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8");
}

export function contentExists(): boolean {
  return existsSync(CONTENT_PATH);
}
