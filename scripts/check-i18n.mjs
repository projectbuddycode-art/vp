import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const locales = ["en", "hi", "gu"];
const requiredBlocks = [
  "confirm:",
  "whatsapp:",
  "bypass:",
  "serviceTitles:",
  "journeySteps:",
  "areas:",
  "whatsappBooking:",
  "bypassNote:",
];
const requiredPlaceholders = [
  { localeKey: "confirm", needle: "whatsappBooking", vars: ["{ref}", "{subject}", "{language}"] },
];

function extractObjectLiteral(source, exportName) {
  const marker = `export const ${exportName}`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`Missing export ${exportName}`);
  const brace = source.indexOf("{", start);
  let depth = 0;
  for (let i = brace; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(brace, i + 1);
    }
  }
  throw new Error(`Unclosed object for ${exportName}`);
}

function topLevelKeys(objectSource) {
  const keys = [];
  let depth = 0;
  let i = 1;
  while (i < objectSource.length - 1) {
    const ch = objectSource[i];
    if (ch === "{") depth += 1;
    if (ch === "}") depth -= 1;
    if (depth === 0) {
      const rest = objectSource.slice(i);
      const match = rest.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:/);
      if (match) {
        keys.push(match[1]);
        i += match[0].length;
        continue;
      }
    }
    i += 1;
  }
  return keys;
}

function findEmptyStrings(source, locale) {
  const empties = [];
  const re = /([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(""|'')/g;
  let match;
  while ((match = re.exec(source))) {
    empties.push(`${locale}.${match[1]}`);
  }
  return empties;
}

const sources = Object.fromEntries(
  locales.map((locale) => {
    const file = path.join(root, "src", "lib", "i18n", `${locale}.ts`);
    return [locale, fs.readFileSync(file, "utf8")];
  }),
);

const problems = [];

for (const locale of locales) {
  for (const needle of requiredBlocks) {
    if (!sources[locale].includes(needle)) problems.push(`${locale}: missing block ${needle}`);
  }
  problems.push(...findEmptyStrings(sources[locale], locale).map((item) => `${item}: empty value`));
}

const keySets = Object.fromEntries(
  locales.map((locale) => {
    const objectSource = extractObjectLiteral(sources[locale], locale);
    return [locale, new Set(topLevelKeys(objectSource))];
  }),
);

for (const locale of locales.slice(1)) {
  for (const key of keySets.en) {
    if (!keySets[locale].has(key)) problems.push(`${locale}: missing top-level key ${key}`);
  }
  for (const key of keySets[locale]) {
    if (!keySets.en.has(key)) problems.push(`${locale}: unexpected top-level key ${key}`);
  }
}

for (const locale of locales) {
  for (const rule of requiredPlaceholders) {
    const start = sources[locale].indexOf(`${rule.needle}:`);
    if (start < 0) {
      problems.push(`${locale}: missing ${rule.needle}`);
      continue;
    }
    const chunk = sources[locale].slice(start, start + 500);
    for (const variable of rule.vars) {
      if (!chunk.includes(variable)) problems.push(`${locale}.${rule.needle}: missing ${variable}`);
    }
  }
}

if (problems.length) {
  console.error("i18n check failed:");
  for (const item of problems) console.error(`- ${item}`);
  process.exit(1);
}

console.log("i18n check passed: en/hi/gu keys, blocks, placeholders and non-empty strings look aligned.");
