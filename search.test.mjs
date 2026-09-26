import test from 'node:test';
import assert from 'node:assert/strict';
import { places, notices, sources } from './test-data.mjs';
test('place lookup finds the library', () => assert.equal(places.find(x => x.name.toLowerCase().includes('library')).id, 'library'));
test('official notice has a source provenance record', () => { const n=notices.find(x=>x.source==='official'); assert.ok(n); assert.equal(sources[n.source].level, 'Official'); });
test('demo source is visibly not official', () => assert.equal(sources.community.level, 'Demo data'));
