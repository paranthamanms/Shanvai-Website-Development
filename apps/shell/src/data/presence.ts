export type PresenceLocation = {
  label: string;
  href?: string;
  available?: boolean;
};

export type PresenceRegion = {
  id: string;
  name: string;
  locations: PresenceLocation[];
};

export const PRESENCE_REGIONS: PresenceRegion[] = [
  {
    id: 'emea',
    name: 'Europe, Middle East & Africa',
    locations: [],
  },
  {
    id: 'asia',
    name: 'Asia & Australia',
    locations: [
      {
        label: 'India',
        href: '/presence/asia/india',
        available: true,
      },
    ],
  },
  {
    id: 'americas',
    name: 'Americas',
    locations: [],
  },
];
