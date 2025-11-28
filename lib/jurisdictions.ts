// lib/jurisdictions.ts

export type JurisdictionId =
  | 'unitedStates'
  | 'canada'
  | 'mexico'
  | 'netherlands';

export interface JurisdictionSpec {
  id: JurisdictionId;
  label: string;
  code: string;
  description: string;
  region: string; // Added for filtering
  focus: { lat: number; lng: number; altitude: number };
  topoJsonUrl: string;
  featureIdProp: string;
}

export const JURISDICTIONS: JurisdictionSpec[] = [
  {
    id: 'unitedStates',
    label: 'United States',
    code: 'us',
    description: 'Patchwork of state-level laws.',
    region: 'north_america',
    focus: { lat: 39, lng: -98, altitude: 1.7 },
    topoJsonUrl: 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json',
    featureIdProp: 'name', 
  },
  {
    id: 'canada',
    label: 'Canada',
    code: 'ca',
    description: 'National recreational + medical framework.',
    region: 'north_america',
    focus: { lat: 56, lng: -106, altitude: 2.0 },
    topoJsonUrl: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/canada/canada-provinces.json',
    featureIdProp: 'NAME_1', 
  },
  {
    id: 'mexico',
    label: 'Mexico',
    code: 'mx',
    description: 'Federal reforms in motion.',
    region: 'north_america',
    focus: { lat: 23, lng: -102, altitude: 1.9 },
    topoJsonUrl: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/mexico/mexico-states.json',
    featureIdProp: 'NAME_1',
  },
  {
    id: 'netherlands',
    label: 'Netherlands',
    code: 'nl',
    description: 'Tolerated retail model with pilots.',
    region: 'europe',
    focus: { lat: 52.3, lng: 5.3, altitude: 4.0 },
    topoJsonUrl: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/netherlands/nl-provinces.json',
    featureIdProp: 'NAME_1',
  },
];

export const jurisdictionById: Record<JurisdictionId, JurisdictionSpec> =
  Object.fromEntries(JURISDICTIONS.map((j) => [j.id, j]));

// FIX: Export this so AdminStateExplorer can use it
export const DEFAULT_JURISDICTION = JURISDICTIONS[0];