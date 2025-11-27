// lib/stateSnapshots.ts

export type StateSnapshot = {
  id: string;              // 'CA'
  name: string;            // 'California'
  batchesTracked: number;  // total # of batches
  labsReporting: number;   // # of labs sending data
  coverageScore: number;   // 0–100, % of legal market covered
  recentRecalls: number;   // last 12 months, for example
};

export const STATE_SNAPSHOTS: Record<string, StateSnapshot> = {
  CA: {
    id: 'CA',
    name: 'California',
    batchesTracked: 18234,
    labsReporting: 97,
    coverageScore: 82,
    recentRecalls: 12,
  },
  ME: {
    id: 'ME',
    name: 'Maine',
    batchesTracked: 2045,
    labsReporting: 14,
    coverageScore: 68,
    recentRecalls: 1,
  },
  CO: {
    id: 'CO',
    name: 'Colorado',
    batchesTracked: 9412,
    labsReporting: 33,
    coverageScore: 76,
    recentRecalls: 4,
  },
  NY: {
    id: 'NY',
    name: 'New York',
    batchesTracked: 5110,
    labsReporting: 21,
    coverageScore: 59,
    recentRecalls: 3,
  },
  // Add more as you like. For any state not listed here
  // we’ll gracefully show a "coming soon" message.
};
