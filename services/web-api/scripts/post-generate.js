const now = Date.now();

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, "..");
const targets = [
  path.join(
    root,
    "src",
    "generated",
    "prisma",
    "internal",
    "prismaNamespace.ts"
  ),
  path.join(
    root,
    "src",
    "generated",
    "prisma",
    "internal",
    "prismaNamespaceBrowser.ts"
  )
];

const replacements = [
  {
    find: /\bconst DbNull\s*=/g,
    replace: "const DbNull: DbNull ="
  },
  {
    find: /\bconst JsonNull\s*=/g,
    replace: "const JsonNull: JsonNull ="
  },
  {
    find: /\bconst AnyNull\s*=/g,
    replace: "const AnyNull: AnyNull ="
  }
];

for (const file of targets) {
  if (!fs.existsSync(file)) {
    console.warn(`File not found: ${file}`);
    continue;
  }

  let content = fs.readFileSync(file, "utf8");

  for (const { find, replace } of replacements) {
    content = content.replace(find, replace);
  }

  fs.writeFileSync(file, content, "utf8");
}

const duration = Date.now() - now;
console.log(`✔ Post-generation patching completed in ${duration}ms\n`);

// const names = ["DbNull", "JsonNull", "AnyNull"];

// function addTypes() {
//   "const DbNull =";
// }

// function ensureTypes(content) {
//   let changed = false;

//   for (const name of names) {
//     // If the type is already present, skip
//     const typePresent = new RegExp(`export\\s+type\\s+${name}\\b`).test(
//       content
//     );
//     if (typePresent) continue;

//     // Try to find the export const line and insert before it
//     const constLineRegex = new RegExp(
//       `^\\s*export\\s+const\\s+${name}\\s*=\\s*runtime\\.${name}\\b.*$`,
//       "m"
//     );
//     if (constLineRegex.test(content)) {
//       content = content.replace(
//         constLineRegex,
//         `export type ${name} = typeof runtime.${name}\n\n$&`
//       );
//       changed = true;
//       continue;
//     }

//     // Fallback: if runtime.NAME exists somewhere, try to insert after the NullTypes block
//     const runtimeRef = new RegExp(`runtime\\.${name}\\b`);
//     if (runtimeRef.test(content)) {
//       const nullTypesBlock =
//         /export\s+const\s+NullTypes\s*=\s*{[\s\S]*?}\s*;?/m;
//       const m = content.match(nullTypesBlock);
//       if (m && typeof m.index === "number") {
//         const insertPos = m.index + m[0].length;
//         content =
//           content.slice(0, insertPos) +
//           `\n\nexport type ${name} = typeof runtime.${name}\n` +
//           content.slice(insertPos);
//         changed = true;
//         continue;
//       }

//       // Last resort: insert near the top after the first double newline (end of imports)
//       const firstGap = content.search(/\n\s*\n/);
//       const insertPos2 = firstGap === -1 ? 0 : firstGap + 2;
//       content =
//         content.slice(0, insertPos2) +
//         `\nexport type ${name} = typeof runtime.${name}\n\n` +
//         content.slice(insertPos2);
//       changed = true;
//       continue;
//     }

//     // If we get here, nothing to do for this name
//   }

//   return { content, changed };
// }

// async function run() {
//   const results = [];

//   for (const file of targets) {
//     try {
//       if (!fs.existsSync(file)) {
//         results.push({ file, ok: false, reason: "not found" });
//         continue;
//       }

//       const original = await fs.promises.readFile(file, "utf8");
//       const { content, changed } = ensureTypes(original);

//       if (changed) {
//         await fs.promises.writeFile(file, content, "utf8");
//         results.push({ file, ok: true, changed: true });
//       } else {
//         results.push({ file, ok: true, changed: false });
//       }
//     } catch (err) {
//       results.push({ file, ok: false, reason: String(err) });
//     }
//   }

//   for (const r of results) {
//     if (!r.ok) console.warn(`SKIP: ${r.file} (${r.reason})`);
//     else if (r.changed) console.log(`PATCHED: ${r.file}`);
//     else console.log(`UNCHANGED: ${r.file}`);
//   }

//   // do not call process.exit to be friendly when imported
// }

// if (import.meta.url) run();
