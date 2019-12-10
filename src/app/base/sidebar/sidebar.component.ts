import { Component, OnInit } from "@angular/core";
import { StateService } from "../../services/state.service";
import { BaseComponent } from "../base/base.component";
import { takeUntil } from "rxjs/internal/operators/takeUntil";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent extends BaseComponent implements OnInit {
  opened: boolean = false;

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

  toggleSidebar() {
    this.stateService.opened$.next(!this.stateService.opened$.value);
  }
}
