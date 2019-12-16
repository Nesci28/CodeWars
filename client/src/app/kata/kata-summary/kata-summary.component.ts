import { Component, Input, OnInit } from "@angular/core";
import { CreateKata } from "src/app/models/http.models";
import { StateService } from "src/app/services/state.service";

@Component({
  selector: "app-kata-summary",
  templateUrl: "./kata-summary.component.html",
  styleUrls: ["./kata-summary.component.scss"]
})
export class KataSummaryComponent implements OnInit {
  @Input() kata: CreateKata;
  @Input() description: string;
  @Input() tests: string;

  constructor(private stateService: StateService) {}

  ngOnInit() {}

  checkIfKataDone(): string {
    return this.stateService.isKataDone$.value ? "Refactor" : "Train";
  }

  goToTrain(): void {
    this.stateService.train$.next(true);
  }
}
