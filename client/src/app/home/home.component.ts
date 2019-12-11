import { Component, OnInit, isDevMode } from "@angular/core";
import { BaseComponent } from "../base/base/base.component";
import { StateService } from "../services/state.service";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { HttpService } from "../services/http.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { backendResponse } from "../../models/http.models";
import { Router } from "@angular/router";

interface Alert {
  type: string;
  message: string;
  reset: () => void;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent extends BaseComponent implements OnInit {
  opened: boolean;
  alert: Alert = {
    type: "",
    message: "",
    reset: () => {
      (this.alert.type = ""), (this.alert.message = "");
    }
  };

  form = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  constructor(
    private stateService: StateService,
    private httpService: HttpService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.stateService.opened$
      .pipe(takeUntil(this.destroy$))
      .subscribe(opened => {
        this.opened = opened;
      });

    // TODO: Delete
    if (isDevMode()) {
      this.username.setValue("test1");
      this.password.setValue("root");
      this.login();
    }
  }

  get username() {
    return this.form.get("username");
  }
  get password() {
    return this.form.get("password");
  }

  login(): void {
    this.alert.reset();
    this.httpService
      .login(this.username.value, this.password.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: backendResponse) => {
        if (res.data.code === 200) {
          this.stateService.loggedIn$.next(true);
          this.stateService.username$.next(this.username.value);
          this.router.navigate(["profile"]);
        }
        if (res.data.code === 401) {
          this.alert.message = "Wrong Credentials!";
          this.alert.type = "danger";
        }
      });
  }

  signup(): void {
    this.alert.reset();
    this.httpService
      .signup(this.username.value, this.password.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (res.data.code === 200) {
          this.alert.message = "Account created succesfully!";
          this.alert.type = "success";
        }
        if (res.data.code === 403) {
          this.alert.message = "Username already taken!";
          this.alert.type = "danger";
        }
      });
  }
}
