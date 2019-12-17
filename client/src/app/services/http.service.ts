import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { backendResponse, CreateKata, Session } from "../models/http.models";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  // Login System
  login(id: string, password: string): Observable<backendResponse> {
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/auth/login/${id}/${password}`,
      {
        withCredentials: true
      }
    );
  }

  session(): Observable<Session> {
    return this.httpClient.get<Session>(
      `${environment.url}/api/v1/auth/session`,
      {
        withCredentials: true
      }
    );
  }

  signup(id: string, password: string): Observable<backendResponse> {
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/auth/signup/${id}/${password}`
    );
  }

  logout(): Observable<backendResponse> {
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/auth/logout/`,
      {
        withCredentials: true
      }
    );
  }

  // Users
  getProfile(username: string): Observable<backendResponse> {
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/profile/${username}`
    );
  }

  getLeaderboard(): Observable<backendResponse> {
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/leaderboard/`
    );
  }

  getKata(id: string, username: string): Observable<backendResponse> {
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/kata/${id}/${username}`,
      {
        withCredentials: true
      }
    );
  }

  // Katas
  getKatas(level: number, username: string): Observable<backendResponse> {
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/kata/cat/${level}/${username}`,
      {
        withCredentials: true
      }
    );
  }

  getAllKatas(): Observable<backendResponse> {
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/kata`
    );
  }

  postKata(kata: CreateKata): Observable<backendResponse> {
    return this.httpClient.post<backendResponse>(
      `${environment.url}/api/v1/kata`,
      kata
    );
  }

  postAnswer(
    id: string,
    answer: string,
    code: string,
    username: string,
    level: number
  ): Observable<backendResponse> {
    const answerObj = {
      id,
      answer,
      code,
      username,
      level
    };
    return this.httpClient.post<backendResponse>(
      `${environment.url}/api/v1/kata/answer`,
      answerObj
    );
  }

  unlockHint(
    id: string,
    n: number,
    username: string
  ): Observable<backendResponse> {
    const obj = {
      id,
      n,
      username
    };
    return this.httpClient.post<backendResponse>(
      `${environment.url}/api/v1/kata/unlock`,
      obj,
      {
        withCredentials: true
      }
    );
  }

  // Admin
  getKataAdmin(id: string): Observable<backendResponse> {
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/admin/kata/${id}`,
      {
        withCredentials: true
      }
    );
  }
}
