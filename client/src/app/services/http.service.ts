import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { backendResponse, CreateKata } from "../models/http.models";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  login(id: string, password: string): Observable<backendResponse> {
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/auth/login/${id}/${password}`
    );
  }

  signup(id: string, password: string): Observable<backendResponse> {
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/auth/signup/${id}/${password}`
    );
  }

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

  getKata(id: string): Observable<backendResponse> {
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/kata/${id}`
    );
  }

  getKatas(level: number, username: string): Observable<backendResponse> {
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/kata/cat/${level}/${username}`
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
}
