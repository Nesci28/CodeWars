import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs/operators";

import { BaseComponent } from "../base/base/base.component";
import { backendResponse, CreateKata } from "../models/http.models";
import { HttpService } from "../services/http.service";
import { StateService } from "../services/state.service";

@Component({
  selector: "app-kata",
  templateUrl: "./kata.component.html",
  styleUrls: ["./kata.component.scss"]
})
export class KataComponent extends BaseComponent implements OnInit {
  kata: CreateKata;
  train: boolean;

  constructor(
    private stateService: StateService,
    private httpService: HttpService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.httpService
      .getKata(id, this.stateService.username$.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((kata: backendResponse) => {
        this.kata = kata.data.kata;
      });
    this.stateService.train$
      .pipe(takeUntil(this.destroy$))
      .subscribe((train: boolean) => {
        this.train = train;
      });
  }

  convertWithNewLines(str: string, type: string): string {
    str = type === "st" ? `<strong>${str}</strong>` : `<em>${str}</em>`;
    return str.replace(/\n/g, "<br />");
  }
}
