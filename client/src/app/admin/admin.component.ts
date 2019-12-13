import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import * as uuid from "uuid";

import { BaseComponent } from "../base/base/base.component";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent extends BaseComponent implements OnInit {
  count$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  count: number[] = [];

  editorOptions = { theme: "vs-dark", language: "javascript" };
  functionEdit: string = `function isPangram() {

}`;
  testCases: string = `[
  "The quick brown fox jumps over the lazy dog",
  "Lorem ipsum dolor sit amet",
  "Sphinx of black quartz, judge my vow",
  "This is a fake sentence to fake Pangrams"
]`;

  form = new FormGroup({
    title: new FormControl("", Validators.required),
    level: new FormControl("", Validators.required),
    language: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    answer0: new FormControl("", Validators.required)
  });

  formData: FormData = new FormData();
  answers: any = {};

  constructor() {
    super();
  }

  ngOnInit() {
    this.count$.pipe(takeUntil(this.destroy$)).subscribe(count => {
      this.count.push(count);
    });
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

  addAFile(): void {
    this.count$.next(this.count$.value + 1);
    this.form.addControl(
      `answer${this.count$.value}`,
      new FormControl("", [Validators.required])
    );
  }

  fileChange(event: any, x: number, i: number) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const myId = uuid.v4();
      this.answers[x] = {
        id: i,
        uuid: myId
      };
      const ext = file.name.split(".").pop();
      this.formData.append("uploadFile", file, `${myId}.${ext}`);
    }
  }

  save(): void {
    console.log("this.form.controls :", this.form.controls);
    // const kata = {
    //   title: this.title.value,
    //   level: this.level.value,
    //   language: this.language.value,
    //   description: this.description.value,

    // }
  }
}
