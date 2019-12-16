import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "src/app/base/base/base.component";
import { backendResponse, CreateKata } from "src/app/models/http.models";
import { HttpService } from "src/app/services/http.service";
import { StateService } from "src/app/services/state.service";

@Component({
  selector: "app-kata-train",
  templateUrl: "./kata-train.component.html",
  styleUrls: ["./kata-train.component.scss"]
})
export class KataTrainComponent extends BaseComponent implements OnInit {
  @Input() kata: CreateKata;
  @Input() description: string;
  @Input() tests: string;

  rightAnswer: boolean;

  form = new FormGroup({
    answer: new FormControl("", Validators.required)
  });

  code: string;
  editorOptions = {
    theme: "vs-dark",
    language: "javascript",
    fontFamily: "Fira Code",
    fontLigatures: true,
    wordWrap: "on"
  };

  constructor(
    private httpService: HttpService,
    private stateService: StateService
  ) {
    super();
  }

  ngOnInit() {
    console.log("this.kata :", this.kata);
    if (this.kata) {
      this.code = this.kata.code;
    }
  }

  get answer() {
    return this.form.get("answer");
  }

  sendAnswer(): void {
    if (this.form.valid && this.code) {
      this.httpService
        .postAnswer(
          this.kata.id,
          this.answer.value,
          this.code,
          this.stateService.username$.value,
          this.kata.level
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: backendResponse) => {
          if (res.data.code === 403) {
            this.rightAnswer = false;
          } else {
            this.rightAnswer = true;
          }
        });
    }
  }
}
