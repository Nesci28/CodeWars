export interface ProfileData {
  username: string;
  "1Kyu": any[];
  "2Kyu": any[];
  "3Kyu": any[];
  "4Kyu": any[];
  "5Kyu": any[];
  "6Kyu": any[];
  "7Kyu": any[];
  score: number;
  gold: number;
}

interface Login {
  admin: boolean;
  gold: number;
}

interface Data {
  message: string;
  code: number;
  profileData?: ProfileData;
  leaderboard?: Leaderboard[];
  katas?: CreateKata[];
  kata?: CreateKata;
  data?: Login;
  reviews: Review[];
  review: Review;
}

export interface backendResponse {
  data: Data;
}

export interface Kata {
  id: string;
  title: string;
  resolved: number;
  data: number;
  expand?: boolean;
  code: string;
}

export interface CreateKata {
  id?: string;
  title: string;
  level?: number;
  language: string;
  description: string;
  answers?: any;
  starting?: string;
  tests?: string;
  done?: boolean;
  date?: number;
  code?: string;
  hint1?: string;
  price1?: number;
  hint2?: string;
  price2?: number;
  show?: boolean;
}

export interface Leaderboard {
  id: number;
  username: string;
  score: number;
  rank: string;
}

interface Cookie {
  originalMaxAge: number;
  expires: string;
  secure: boolean;
  httpOnly: boolean;
  domain: any;
  path: string;
  sameSite: any;
}

export interface Session {
  cookie: Cookie;
  username: string;
  isAuthenticated: boolean;
  admin: boolean;
  gold: number;
}

export interface Review {
  username: string;
  id: string;
  title: string;
  code: string;
  answer?: string;
  date: number;
  checked?: boolean;
}

export interface Star {
  index: number;
  selected: boolean;
}
