import fs from 'node:fs/promises';
import path from 'node:path';

const APP_ID = process.env.BASE44_APP_ID || process.env.VITE_BASE44_APP_ID || '6ad9875bde181c92fc16e902';
const API_BASE = (process.env.BASE44_API_BASE_URL || 'https://app.base44.com').replace(/\/$/, '');
const OUTPUT = path.resolve('src/data/base44.generated.json');
const ENTITIES = ['Animal', 'Era', 'Etnia', 'Evento', 'GrupoAnimal', 'Monumento', 'Pergunta', 'Tema'];
const PAGE_SIZE = 500;

function extractRows(payload) {
  if (Array.isArray(payload)) return payload;
  for (const key of ['data', 'items', 'records', 'entities', 'results']) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }
  return null;
}

async function fetchPage(entity, skip) {
  const url = new URL(`${API_BASE}/api/apps/${APP_ID}/entities/${entity}`);
  url.searchParams.set('limit', String(PAGE_SIZE));
  url.searchParams.set('skip', String(skip));

  const response = await fetch(url, {
    headers: {
      'X-App-Id': APP_ID,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`${entity}: HTTP ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  const rows = extractRows(payload);
  if (!rows) throw new Error(`${entity}: formato de resposta não reconhecido`);
  return rows;
}

async function fetchEntity(entity) {
  const all = [];
  for (let skip = 0; ; skip += PAGE_SIZE) {
    const page = await fetchPage(entity, skip);
    all.push(...page);
    if (page.length < PAGE_SIZE) break;
  }
  return all;
}

async function loadExisting() {
  try {
    return JSON.parse(await fs.readFile(OUTPUT, 'utf8'));
  } catch {
    return {};
  }
}

const existing = await loadExisting();
const data = { ...existing, _meta: { appId: APP_ID, source: API_BASE, generatedAt: new Date().toISOString() } };
let failures = 0;

for (const entity of ENTITIES) {
  try {
    const rows = await fetchEntity(entity);
    data[entity] = rows;
    console.log(`✓ ${entity}: ${rows.length}`);
  } catch (error) {
    failures += 1;
    data[entity] = Array.isArray(existing[entity]) ? existing[entity] : [];
    console.warn(`⚠ ${error.message}; mantendo fallback com ${data[entity].length} registos.`);
  }
}

await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
await fs.writeFile(OUTPUT, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(`Dados gravados em ${OUTPUT}. Falhas: ${failures}.`);
