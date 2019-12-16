import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { BaseComponent } from "../../base/base/base.component";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { HttpService } from "../../services/http.service";
import { CreateKata, backendResponse } from "../../models/http.models";

@Component({
  selector: "app-admin-edit",
  templateUrl: "./admin-edit.component.html",
  styleUrls: ["./admin-edit.component.scss"]
})
export class AdminEditComponent extends BaseComponent implements OnInit {
  katas: CreateKata[];

  query: string;
  modelChanged: Subject<string> = new Subject<string>();

  constructor(private httpService: HttpService) {
    super();
    this.modelChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(model => {
        this.query = model;
      });
  }

  ngOnInit() {
    this.httpService
      .getAllKatas()
      .pipe(takeUntil(this.destroy$))
      .subscribe((katas: backendResponse) => {
        this.katas = katas.data.katas;
        this.katas.forEach(kata => {
          kata.show = true;
        });
      });
  }

  changed(text: string): void {
    this.modelChanged.next(text);
  }

  getKatas(i: number): CreateKata[] {
    return this.katas.filter(kata => +kata.level === i);
  }
}
