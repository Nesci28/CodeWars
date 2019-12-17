import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import * as uuid from "uuid";

import { BaseComponent } from "../../base/base/base.component";
import { CreateKata, backendResponse } from "../../models/http.models";
import { HttpService } from "../../services/http.service";
import { StateService } from "src/app/services/state.service";

@Component({
  selector: "app-admin-create",
  templateUrl: "./admin-create.component.html",
  styleUrls: ["./admin-create.component.scss"]
})
export class AdminCreateComponent extends BaseComponent implements OnInit {
  @Input() id: string;

  kata: CreateKata;

  count$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  count: number[] = [];

  editorOptions = {
    theme: "vs-dark",
    language: "javascript",
    fontFamily: "Fira Code",
    fontLigatures: true,
    wordWrap: "on"
  };
  functionEdit: string;
  testCases: string;

  form = new FormGroup({
    title: new FormControl("", Validators.required),
    level: new FormControl("", Validators.required),
    language: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    hint1: new FormControl(""),
    price1: new FormControl("", Validators.pattern("[0-9]*")),
    hint2: new FormControl(""),
    price2: new FormControl("", Validators.pattern("[0-9]*")),
    answer0: new FormControl("")
  });

  formData: FormData = new FormData();
  answers: any = {};

  constructor(
    private httpService: HttpService,
    private stateService: StateService
  ) {
    super();
  }

  ngOnInit() {
    this.count$.pipe(takeUntil(this.destroy$)).subscribe(count => {
      this.count.push(count);
    });
    if (this.id && this.stateService.admin$.value === true) {
      this.httpService
        .getKataAdmin(this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((kata: backendResponse) => {
          this.kata = kata.data.kata;
          this.setVariables(this.kata);
        });
    } else {
      this.setVariables();
    }
  }

  get title() {
    return this.form.get("title");
  }
  get level() {
    return this.form.get("level");
  }
  get language() {
    return this.form.get("language");
  }
  get description() {
    return this.form.get("description");
  }
  get test() {
    return this.form.get("test");
  }
  get hint1() {
    return this.form.get("hint1");
  }
  get price1() {
    return this.form.get("price1");
  }
  get hint2() {
    return this.form.get("hint2");
  }
  get price2() {
    return this.form.get("price2");
  }

  setVariables(kata?: CreateKata) {
    if (!kata) {
      this.functionEdit = `function isPangram() {

}`;
      this.testCases = `"The quick brown fox jumps over the lazy dog" === true,
"Lorem ipsum dolor sit amet" === false,
"Sphinx of black quartz, judge my vow" === true,
"This is a fake sentence to fake Pangrams" === false`;
    } else {
      this.title.setValue(this.kata.title);
      this.level.setValue(this.kata.level);
      this.language.setValue(this.kata.language);
      this.description.setValue(this.kata.description);
      this.hint1.setValue(this.kata.hint1);
      this.price1.setValue(this.kata.price1);
      this.hint2.setValue(this.kata.hint2);
      this.price2.setValue(this.kata.price2);
      // TODO: Set files
      this.functionEdit = this.kata.starting;
      this.testCases = this.kata.tests;
    }
  }

  addAFile(): void {
    this.count$.next(this.count$.value + 1);
    this.form.addControl(
      `answer${this.count$.value}`,
      new FormControl("", [Validators.required])
    );
  }

  removeAsset(x: number, i: number): void {
    this.count.splice(i, 1);
    delete this.answers[x];
  }

  fileChange(event: any, x: number, i: number) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      let fileReader = new FileReader();
      fileReader.onload = e => {
        const myId = uuid.v4();
        this.answers[x] = {
          id: myId,
          answer: this.form.get(`answer${i}`).value,
          asset: fileReader.result
        };
      };
      fileReader.readAsText(file);
    }
  }

  updateAnswer(x: number, i: number): void {
    if (!this.answers[x]) {
      this.answers[x] = {};
    }
    this.answers[x].answer = this.form.get(`answer${i}`).value;
  }

  preview(): void {
    // TODO: Preview
    console.log("preview");
  }

  save(): void {
    const kata: CreateKata = {
      title: this.title.value,
      level: this.level.value,
      language: this.language.value,
      description: this.description.value,
      answers: this.answers,
      starting: this.functionEdit,
      tests: this.testCases,
      hint1: this.hint1.value,
      price1: this.price1.value,
      hint2: this.hint2.value,
      price2: this.price2.value
    };
    this.httpService
      .postKata(kata)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        console.log("res :", res);
      });
  }
}
