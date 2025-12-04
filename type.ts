export type Review = {
  id: string;
  author: string;
  avatarId: string;
  date: string;
  comment: string;
  ratings: {
    overall: number;
    safety: number;
    service: number;
    punctuality: number;
    value: number;
  };
};

export type Operator = {
  id: string;
  name: string;
  logoId: string;
  description: string;
  hq: string;
  fleetSize: number;
  website: string;
  reviews: Review[];
};
