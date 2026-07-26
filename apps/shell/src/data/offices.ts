export type Office = {
  name: string;
  role?: string;
  address: string[];
  phone?: string;
  email?: string;
};

export type OfficeRegion = {
  id: string;
  name: string;
  offices: Office[];
};

/** Shanvai offices / contact points — CRIF-style regional directory, Shanvai content */
export const OFFICE_REGIONS: OfficeRegion[] = [
  {
    id: 'asia',
    name: 'Asia & Australia',
    offices: [
      {
        name: 'Shanvai Technologies — India',
        role: 'Primary delivery & solutions hub',
        address: ['India (remote-first delivery across major BFSI centres)'],
        email: 'solutions@shanvai.tech',
      },
      {
        name: 'Enterprise partnerships — India',
        role: 'Banks, NBFCs & fintechs',
        address: ['Pilot, RFP, and co-build inquiries'],
        email: 'solutions@shanvai.tech',
      },
    ],
  },
  {
    id: 'emea',
    name: 'Europe, Middle East & Africa',
    offices: [
      {
        name: 'Shanvai — EMEA desk',
        role: 'Coming online',
        address: ['Partnership and solution inquiries for EMEA institutions'],
        email: 'solutions@shanvai.tech',
      },
    ],
  },
  {
    id: 'americas',
    name: 'Americas',
    offices: [
      {
        name: 'Shanvai — Americas desk',
        role: 'Coming online',
        address: ['Partnership and solution inquiries for Americas institutions'],
        email: 'solutions@shanvai.tech',
      },
    ],
  },
];
