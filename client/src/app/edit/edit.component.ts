import { Component, OnInit } from "@angular/core";
import { Kata } from "../models/http.models";
import { BaseComponent } from "../base/base/base.component";
import { StateService } from "../services/state.service";
import { takeUntil } from "rxjs/internal/operators/takeUntil";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent extends BaseComponent implements OnInit {
  kata: Kata;
  editorOptions = {
    theme: "vs-dark",
    language: "javascript",
    fontFamily: "Fira Code",
    fontLigatures: true,
    wordWrap: "on"
  };

  constructor(private stateService: StateService) {
    super();
  }

  ngOnInit() {
    this.stateService.kata$
      .pipe(takeUntil(this.destroy$))
      .subscribe((kata: Kata) => {
        this.kata = kata;
      });
  }
}
