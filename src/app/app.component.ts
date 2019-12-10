import { Component, OnInit } from "@angular/core";
import { StateService } from "./services/state.service";
import { BaseComponent } from "./base/base/base.component";
import { takeUntil } from "rxjs/internal/operators/takeUntil";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent extends BaseComponent implements OnInit {
  title = "CodeWars";
  opened: boolean;

  constructor(private stateService: StateService) {
    super();
  }

  ngOnInit() {
    this.stateService.opened$
      .pipe(takeUntil(this.destroy$))
      .subscribe(opened => {
        this.opened = opened;
      });
  }
}
