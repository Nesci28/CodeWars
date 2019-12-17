import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "src/app/base/base/base.component";
import { backendResponse, CreateKata } from "src/app/models/http.models";
import { HttpService } from "src/app/services/http.service";
import { StateService } from "src/app/services/state.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

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

  closeResult: string;
  price: number;
  hintNumber: number;
  hint: string;

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
    private stateService: StateService,
    private modalService: NgbModal
  ) {
    super();
  }

  ngOnInit() {
    if (this.kata) {
      this.code = this.kata.code || this.kata.starting;
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

  openHint(confirmModal, viewModal, n: number) {
    this.hintNumber = n;
    if (!this.kata[`hint${n}`]) {
      this.price = this.kata[`price${n}`];
      this.modalService
        .open(confirmModal, { ariaLabelledBy: "modal-basic-title" })
        .result.then(
          result => {
            if (result === "yes") {
              this.httpService
                .unlockHint(this.kata.id, n, this.stateService.username$.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe(hint => {
                  this.kata[`hint${n}`] = hint;
                });
            }
          },
          _ => {}
        );
    } else {
      this.hint = this.kata[`hint${n}`];
      this.modalService
        .open(viewModal, { ariaLabelledBy: "modal-basic-title" })
        .result.then(_ => {}, _ => {});
    }
  }

  getHintText(n: number): string {
    return this.kata[`hint${n}`] ? `View Hint #${n}` : `Get Hint #${n}`;
  }
}
