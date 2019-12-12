import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../base/base/base.component";
import { StateService } from "../../services/state.service";
import { ProfileData, Kata } from "../../../models/http.models";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-profile-stats",
  templateUrl: "./profile-stats.component.html",
  styleUrls: ["./profile-stats.component.scss"]
})
export class ProfileStatsComponent extends BaseComponent implements OnInit {
  katas: Kata[];
  kyu: number;
  editorOptions = { theme: "vs-dark", language: "javascript" };

  constructor(
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router
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

  goToEdit(kata: Kata): void {
    this.stateService.kata$.next(kata);
    this.router.navigate([`edit/${kata.id}`]);
  }
}
