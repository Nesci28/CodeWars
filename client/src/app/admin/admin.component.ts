import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  editorOptions = { theme: "vs-dark", language: "javascript" };
  function: string = `function isPangram() {

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
    test: new FormControl("", Validators.required)
  });

  constructor() {}

  ngOnInit() {}

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
}
