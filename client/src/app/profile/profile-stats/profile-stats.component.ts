import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/base/base/base.component";
import { StateService } from "src/app/services/state.service";
import { ProfileData } from "src/models/http.models";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-profile-stats",
  templateUrl: "./profile-stats.component.html",
  styleUrls: ["./profile-stats.component.scss"]
})
export class ProfileStatsComponent extends BaseComponent implements OnInit {
  katas: any[];
  kyu: number;
  editorOptions = { theme: "vs-dark", language: "javascript" };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  originalCode: string = "function x() { // TODO }";

  constructor(
    private stateService: StateService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.stateService.profile$
      .pipe(takeUntil(this.destroy$))
      .subscribe((profile: ProfileData) => {
        this.kyu = this.route.snapshot.params.id;
        this.katas = profile[`${this.kyu}Kyu`];
        this.katas.forEach(kata => {
          kata.expand = false;
        });
      });
  }
}
