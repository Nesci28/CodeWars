import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";

import { BaseComponent } from "../base/base/base.component";
import { backendResponse, CreateKata } from "../models/http.models";
import { HttpService } from "../services/http.service";
import { StateService } from "../services/state.service";

@Component({
  selector: "app-kata-list",
  templateUrl: "./kata-list.component.html",
  styleUrls: ["./kata-list.component.scss"]
})
export class KataListComponent extends BaseComponent implements OnInit {
  katas: CreateKata[];

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private stateService: StateService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    const { level, username } = this.route.snapshot.params;
    this.httpService
      .getKatas(level, username)
      .pipe(takeUntil(this.destroy$))
      .subscribe((katas: backendResponse) => {
        this.katas = katas.data.katas;
      });
  }

  goToKata(kata: CreateKata): void {
    this.stateService.train$.next(false);
    kata.done
      ? this.stateService.isKataDone$.next(true)
      : this.stateService.isKataDone$.next(false);
    this.router.navigate([`/kata/${kata.id}`]);
  }
}
