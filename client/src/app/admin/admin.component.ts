import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs/internal/operators/takeUntil";

import { BaseComponent } from "../base/base/base.component";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent extends BaseComponent implements OnInit {
  type: string;
  id: string;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.type = params.type;
      this.id = params.id;
    });
  }
}
