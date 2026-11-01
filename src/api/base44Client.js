import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';
import localData from '@/data/base44.generated.json';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

const remoteBase44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl: '',
  appBaseUrl,
});

const PUBLIC_ENTITIES = new Set([
  'Animal',
  'Era',
  'Etnia',
  'Evento',
  'GrupoAnimal',
  'Monumento',
  'Pergunta',
  'Tema',
]);

function compareValues(a, b) {
  if (a === b) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), 'pt', { numeric: true, sensitivity: 'base' });
}

function sortRows(rows, sort) {
  if (!sort) return [...rows];
  const descending = String(sort).startsWith('-');
  const key = descending ? String(sort).slice(1) : String(sort);
  return [...rows].sort((left, right) => {
    const result = compareValues(left?.[key], right?.[key]);
    return descending ? -result : result;
  });
}

function matchesOperator(value, condition) {
  if (condition && typeof condition === 'object' && !Array.isArray(condition)) {
    return Object.entries(condition).every(([operator, expected]) => {
      switch (operator) {
        case '$in':
          return Array.isArray(expected) && expected.includes(value);
        case '$nin':
          return Array.isArray(expected) && !expected.includes(value);
        case '$ne':
          return value !== expected;
        case '$gt':
          return value > expected;
        case '$gte':
          return value >= expected;
        case '$lt':
          return value < expected;
        case '$lte':
          return value <= expected;
        case '$exists':
          return expected ? value !== undefined && value !== null : value === undefined || value === null;
        default:
          return value === condition;
      }
    });
  }
  return value === condition;
}

function matchesQuery(row, query = {}) {
  return Object.entries(query || {}).every(([key, condition]) => {
    if (key === '$or' && Array.isArray(condition)) return condition.some((part) => matchesQuery(row, part));
    if (key === '$and' && Array.isArray(condition)) return condition.every((part) => matchesQuery(row, part));
    return matchesOperator(row?.[key], condition);
  });
}

function localRows(entityName) {
  const rows = localData?.[entityName];
  return Array.isArray(rows) ? rows : [];
}

function localEntity(entityName, remoteEntity) {
  const rows = localRows(entityName);
  if (!PUBLIC_ENTITIES.has(entityName) || rows.length === 0) return remoteEntity;

  return new Proxy(remoteEntity, {
    get(target, property) {
      if (property === 'list') {
        return async (sort, limit = 50, skip = 0) => sortRows(rows, sort).slice(skip, skip + limit);
      }
      if (property === 'filter') {
        return async (query = {}, sort, limit = 50, skip = 0) => {
          const filtered = rows.filter((row) => matchesQuery(row, query));
          return sortRows(filtered, sort).slice(skip, skip + limit);
        };
      }
      if (property === 'get') {
        return async (id) => rows.find((row) => row.id === id) || null;
      }
      return Reflect.get(target, property);
    },
  });
}

const entities = new Proxy(remoteBase44.entities, {
  get(target, entityName) {
    const remoteEntity = Reflect.get(target, entityName);
    if (typeof entityName !== 'string' || !remoteEntity) return remoteEntity;
    return localEntity(entityName, remoteEntity);
  },
});

export const base44 = new Proxy(remoteBase44, {
  get(target, property) {
    if (property === 'entities') return entities;
    return Reflect.get(target, property);
  },
});
