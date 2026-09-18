import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it, beforeAll } from "vitest";
import { buildIndex } from "@/lib/content-api";

const TARGET = path.join(process.cwd(), "public", "api", "v1", "content");

describe("build-content-api script", () => {
  beforeAll(() => {
    execFileSync("node", ["scripts/build-content-api.mjs"], { stdio: "inherit" });
  });

  it("copy được markdown sang public/api/v1/content", () => {
    expect(fs.existsSync(TARGET)).toBe(true);
  });

  it("mọi path trong index vi đều có bản copy tương ứng", () => {
    const missing = buildIndex("vi")
      .map((entry) => entry.path)
      .filter((p) => !fs.existsSync(path.join(process.cwd(), "public", "api", "v1", p)));
    expect(missing).toEqual([]);
  });

  it("nội dung bản copy giống hệt bản gốc", () => {
    const entry = buildIndex("vi")[0];
    const original = fs.readFileSync(path.join(process.cwd(), entry.path), "utf-8");
    const copied = fs.readFileSync(
      path.join(process.cwd(), "public", "api", "v1", entry.path),
      "utf-8"
    );
    expect(copied).toBe(original);
  });
});
