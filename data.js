import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'data');

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), 'utf8'));
}

export function loadPlatformData() {
  return {
    destinations: readJson('destinations.json'),
    sources: readJson('sources.json'),
    conditions: readJson('conditions.json'),
    weekend: readJson('weekend.json'),
    liveResources: readJson('live-resources.json')
  };
}

export function platformSummary() {
  const data = loadPlatformData();
  const destinations = data.destinations.destinations || [];
  return {
    destinations: destinations.length,
    staticProfilesReviewed: destinations.filter(item => item.verification?.profile_verified).length,
    coordinatesReviewed: destinations.filter(item => item.verification?.coordinates_verified).length,
    sources: data.sources.sources?.length || 0,
    liveConditionRecords: data.conditions.destination_conditions?.length || 0
  };
}
