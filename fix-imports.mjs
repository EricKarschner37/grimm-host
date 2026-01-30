import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

globSync('src/**/*.{ts,tsx,js,jsx}').forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const fileDir = path.dirname(file);

  content = content.replace(/from ['"]([^'"./][^'"]*)['"]/g, (match, importPath) => {
    // Skip node_modules imports (no slash or common packages)
    if (!importPath.includes('/') || importPath.startsWith('@')) return match;

    const absoluteImport = path.join('src', importPath);
    let relativePath = path.relative(fileDir, absoluteImport);

    if (!relativePath.startsWith('.')) {
      relativePath = './' + relativePath;
    }

    const quote = match.includes("'") ? "'" : '"';
    return `from ${quote}${relativePath}${quote}`;
  });

  fs.writeFileSync(file, content);
  console.log('Updated:', file);
});
