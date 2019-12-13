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
}

interface Data {
  message: string;
  code: number;
  admin?: boolean;
  profileData?: ProfileData;
  leaderboard?: Leaderboard[];
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

export interface Leaderboard {
  id: number;
  username: string;
  score: number;
  rank: string;
}
