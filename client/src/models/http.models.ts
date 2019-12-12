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
  data?: ProfileData;
}

export interface backendResponse {
  data: Data;
}
