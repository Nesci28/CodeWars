import { Component, OnInit } from "@angular/core";
import { takeUntil } from "rxjs/internal/operators/takeUntil";

import { BaseComponent } from "../base/base/base.component";
import { HttpService } from "../services/http.service";
import { StateService } from "../services/state.service";
import { ProfileData } from "../../models/http.models";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent extends BaseComponent implements OnInit {
  profile: ProfileData;

  constructor(
    private httpService: HttpService,
    private stateService: StateService
  ) {
    super();
  }

  ngOnInit() {
    this.httpService
      .getProfile(this.stateService.username$.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.profile = profile.data.data;
      });
  }
}
