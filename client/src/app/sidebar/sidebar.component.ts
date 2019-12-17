import { Component, OnInit } from "@angular/core";
import { StateService } from "../services/state.service";
import { BaseComponent } from "../base/base/base.component";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent extends BaseComponent implements OnInit {
  opened: boolean = false;
  loggedIn: boolean = false;
  adminBool: boolean = false;
  username: string;
  gold: number;

  kataPopup: string = ``;

  constructor(private stateService: StateService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.stateService.opened$
      .pipe(takeUntil(this.destroy$))
      .subscribe((opened: boolean) => {
        this.opened = opened;
      });
    this.stateService.loggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loggedIn: boolean) => {
        this.loggedIn = loggedIn;
      });
    this.stateService.admin$
      .pipe(takeUntil(this.destroy$))
      .subscribe((admin: boolean) => {
        this.adminBool = admin;
      });
    this.stateService.username$
      .pipe(takeUntil(this.destroy$))
      .subscribe(username => {
        this.username = username;
      });
    this.stateService.gold$
      .pipe(takeUntil(this.destroy$))
      .subscribe((gold: number) => {
        this.gold = gold;
      });
  }

  toggleSidebar() {
    this.stateService.opened$.next(!this.stateService.opened$.value);
  }

  logout(): void {
    this.stateService.loggedIn$.next(false);
    this.stateService.username$.next("");
    this.router.navigate([""]);
  }
}
