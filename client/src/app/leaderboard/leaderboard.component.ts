import { Component, OnInit } from "@angular/core";
import { takeUntil } from "rxjs/operators";

import { backendResponse, Leaderboard } from "../models/http.models";
import { BaseComponent } from "../base/base/base.component";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.scss"]
})
export class LeaderboardComponent extends BaseComponent implements OnInit {
  leaderboard: Leaderboard[];

  constructor(private httpService: HttpService) {
    super();
  }

  ngOnInit() {
    this.httpService
      .getLeaderboard()
      .pipe(takeUntil(this.destroy$))
      .subscribe((leaderboard: backendResponse) => {
        this.leaderboard = leaderboard.data.leaderboard;
        this.leaderboard = this.leaderboard.sort((a, b) => b.score - a.score);
      });
  }
}
