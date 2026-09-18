#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "content");
const target = path.join(root, "public", "api", "v1", "content");

if (!fs.existsSync(source)) {
  console.error(`[content-api] không tìm thấy thư mục nguồn: ${source}`);
  process.exit(1);
}

// Xoá bản cũ để file đã bị gỡ khỏi content/ không còn sót lại trong out/
fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });

let copied = 0;

function copyMarkdown(sourceDir, targetDir) {
  for (const dirent of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, dirent.name);
    const targetPath = path.join(targetDir, dirent.name);

    if (dirent.isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      copyMarkdown(sourcePath, targetPath);
      continue;
    }

    if (!dirent.isFile() || !dirent.name.endsWith(".md")) continue;

    fs.copyFileSync(sourcePath, targetPath);
    copied += 1;
  }
}

const startedAt = Date.now();
copyMarkdown(source, target);
const seconds = ((Date.now() - startedAt) / 1000).toFixed(1);

console.log(`[content-api] copy ${copied} file markdown trong ${seconds}s → public/api/v1/content`);
