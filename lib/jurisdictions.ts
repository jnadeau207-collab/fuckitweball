// lib/jurisdictions.ts
// Central place for "what jurisdiction are we in" + cannabis legal status
// + high-level access rules. Backend will enforce the same rules server-side.

export type RegionId =
  | 'unitedStates'
  | 'canada'
  | 'mexico'
  | 'netherlands'
  | 'uruguay'
  | 'germany'
  | 'southAfrica'
  | 'luxembourg'
  | 'malta'
  | 'georgia';

export type LegalStatus =
  | 'recreational'
  | 'medical'
  | 'mixed' // patchwork / partial
  | 'tolerated'
  | 'illegal';

export type UserRole = 'guest' | 'consumer' | 'operator' | 'gov';

export interface Jurisdiction {
  id: RegionId;
  name: string;
  legalStatus: LegalStatus;
  // This is the jurisdiction-level dataset you'll plug into your real backend.
  apiNamespace: string; // e.g. 'us', 'ca', 'mx', 'de', etc.
  defaultLandingAdminPath: string; // where admin "Open data tools" goes
  notes?: string;
}

export const JURISDICTIONS: Record<RegionId, Jurisdiction> = {
  unitedStates: {
    id: 'unitedStates',
    name: 'United States',
    legalStatus: 'mixed', // state-by-state
    apiNamespace: 'us',
    defaultLandingAdminPath: '/admin/us',
    notes: 'Patchwork of state-level laws; federal prohibition still in play.',
  },
  canada: {
    id: 'canada',
    name: 'Canada',
    legalStatus: 'recreational',
    apiNamespace: 'ca',
    defaultLandingAdminPath: '/admin/ca',
    notes: 'National recreational and medical framework.',
  },
  mexico: {
    id: 'mexico',
    name: 'Mexico',
    legalStatus: 'mixed',
    apiNamespace: 'mx',
    defaultLandingAdminPath: '/admin/mx',
    notes:
      'Supreme Court rulings enabling personal use; implementation is evolving.',
  },
  netherlands: {
    id: 'netherlands',
    name: 'Netherlands',
    legalStatus: 'tolerated',
    apiNamespace: 'nl',
    defaultLandingAdminPath: '/admin/nl',
    notes:
      'Famous for tolerance and coffeeshops, but technically a controlled substance.',
  },
  uruguay: {
    id: 'uruguay',
    name: 'Uruguay',
    legalStatus: 'recreational',
    apiNamespace: 'uy',
    defaultLandingAdminPath: '/admin/uy',
    notes: 'First country to fully legalize recreational cannabis.',
  },
  germany: {
    id: 'germany',
    name: 'Germany',
    legalStatus: 'recreational',
    apiNamespace: 'de',
    defaultLandingAdminPath: '/admin/de',
    notes:
      'Personal use and home grow legalized with non-profit social clubs; commercial retail still restricted.',
  },
  southAfrica: {
    id: 'southAfrica',
    name: 'South Africa',
    legalStatus: 'recreational',
    apiNamespace: 'za',
    defaultLandingAdminPath: '/admin/za',
    notes:
      'Private use and cultivation legalized; commercial sale is still prohibited.',
  },
  luxembourg: {
    id: 'luxembourg',
    name: 'Luxembourg',
    legalStatus: 'recreational',
    apiNamespace: 'lu',
    defaultLandingAdminPath: '/admin/lu',
    notes: 'Private home grow and use legalized; public use and sales limited.',
  },
  malta: {
    id: 'malta',
    name: 'Malta',
    legalStatus: 'recreational',
    apiNamespace: 'mt',
    defaultLandingAdminPath: '/admin/mt',
    notes:
      'First EU country to legalize recreational use; non-profit clubs allowed.',
  },
  georgia: {
    id: 'georgia',
    name: 'Georgia',
    legalStatus: 'recreational',
    apiNamespace: 'ge',
    defaultLandingAdminPath: '/admin/ge',
    notes: 'Private consumption legal; supply side remains restricted.',
  },
};

// Simple access model. Backend must enforce the same rules on every request.
export interface AccessProfile {
  canSeePII: boolean;
  canSeeGovDashboards: boolean;
  canSeeOperatorDashboards: boolean;
  canSeeAggregatedAnalytics: boolean;
}

// Baseline policy: you can tighten per-jurisdiction if needed.
const BASE_ACCESS_BY_ROLE: Record<UserRole, AccessProfile> = {
  guest: {
    canSeePII: false,
    canSeeGovDashboards: false,
    canSeeOperatorDashboards: false,
    canSeeAggregatedAnalytics: true,
  },
  consumer: {
    canSeePII: false,
    canSeeGovDashboards: false,
    canSeeOperatorDashboards: false,
    canSeeAggregatedAnalytics: true,
  },
  operator: {
    canSeePII: true,
    canSeeGovDashboards: false,
    canSeeOperatorDashboards: true,
    canSeeAggregatedAnalytics: true,
  },
  gov: {
    canSeePII: true,
    canSeeGovDashboards: true,
    canSeeOperatorDashboards: true,
    canSeeAggregatedAnalytics: true,
  },
};

// Per-jurisdiction overrides (e.g. US gov users can’t see Canada gov).
// Backend should enforce the same constraints.
export function getAccessProfile(
  jurisdiction: RegionId,
  role: UserRole,
): AccessProfile {
  const base = BASE_ACCESS_BY_ROLE[role];

  // Example of “US gov cannot see Canadian deep data” – tune as needed.
  if (jurisdiction === 'canada' && role === 'gov') {
    return {
      ...base,
      canSeeGovDashboards: false,
      canSeeAggregatedAnalytics: true,
      // canSeePII stays true or false depending on your privacy stance
    };
  }

  // You can branch on other jurisdictions here as your rules harden.
  return base;
}
