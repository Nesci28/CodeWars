import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { backendResponse } from "../../models/http.models";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  login(id: string, password: string): Observable<backendResponse> {
    console.log("id, password :", id, password);
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/auth/login/${id}/${password}`
    );
  }

  signup(id: string, password: string): Observable<backendResponse> {
    console.log("id, password :", id, password);
    return this.httpClient.get<backendResponse>(
      `${environment.url}/api/v1/auth/signup/${id}/${password}`
    );
  }
}