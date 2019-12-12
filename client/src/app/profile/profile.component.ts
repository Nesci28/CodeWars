import { Component, OnInit } from "@angular/core";
import { takeUntil } from "rxjs/internal/operators/takeUntil";

import { BaseComponent } from "../base/base/base.component";
import { HttpService } from "../services/http.service";
import { StateService } from "../services/state.service";
import { ProfileData, backendResponse } from "../../models/http.models";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent extends BaseComponent implements OnInit {
  profile: ProfileData;

  constructor(
    private httpService: HttpService,
    private stateService: StateService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.httpService
      .getProfile(this.stateService.username$.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((profile: backendResponse) => {
        this.stateService.profile$.next(profile.data.data);
        this.profile = profile.data.data;
        console.log("this.profile :", this.profile);
      });
  }

  convertPointsToKyu(): number {
    const score = this.profile.score;
    let rank;
    if (score >= 0 && score < 200) rank = 7;
    if (score >= 200 && score < 400) rank = 6;
    if (score >= 400 && score < 600) rank = 5;
    if (score >= 600 && score < 800) rank = 4;
    if (score >= 800 && score < 1000) rank = 3;
    if (score >= 1000 && score < 1200) rank = 2;
    if (score >= 1200) rank = 1;
    return rank;
  }

  calcExp(): number {
    const score = this.profile.score / 200;
    const int = Math.trunc(score);
    return Number((score - int).toFixed(2)) * 100;
  }

  getAmountOfKyuDone(i: number): number {
    return this.profile[`${i}Kyu`].length;
  }
}
