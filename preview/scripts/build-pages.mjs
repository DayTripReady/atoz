import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const source = fileURLToPath(new URL('../dist/', import.meta.url));
const output = fileURLToPath(new URL('../pages-dist/', import.meta.url));
const base = process.env.PAGES_BASE_PATH || '/atoz/';
if (!/^\/[a-zA-Z0-9_-]+\/$/.test(base)) throw new Error('Expected a project base path such as /atoz/');
const roots = (await readdir(source)).filter(name => !name.startsWith('.'));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
let files = 0;
async function rewrite(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { await rewrite(file); continue; }
    if (!/\.(html|css|js|json|svg)$/.test(entry.name)) continue;
    let content = await readFile(file, 'utf8');
    for (const root of roots) content = content.replaceAll('/' + root, base + root);
    await writeFile(file, content);
    files++;
  }
}
await rewrite(output);
await writeFile(path.join(output, '.nojekyll'), '');
console.log(`Prepared ${files} text assets for ${base}; local dist files are unchanged.`);
