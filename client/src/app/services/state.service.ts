import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ProfileData, Kata } from "../../models/http.models";

@Injectable({
  providedIn: "root"
})
export class StateService {
  opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  username$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  admin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  profile$: BehaviorSubject<ProfileData> = new BehaviorSubject<ProfileData>(
    {} as ProfileData
  );
  kata$: BehaviorSubject<Kata> = new BehaviorSubject<Kata>({} as Kata);

  constructor() {}
}
