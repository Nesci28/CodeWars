import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StateService {
  opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  username$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() {}
}
