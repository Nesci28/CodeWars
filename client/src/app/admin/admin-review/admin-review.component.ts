import { Component, OnInit, Input } from "@angular/core";
import { BaseComponent } from "src/app/base/base/base.component";
import { HttpService } from "src/app/services/http.service";
import { backendResponse, Review } from "src/app/models/http.models";
import { takeUntil } from "rxjs/internal/operators/takeUntil";

@Component({
  selector: "app-admin-review",
  templateUrl: "./admin-review.component.html",
  styleUrls: ["./admin-review.component.scss"]
})
export class AdminReviewComponent extends BaseComponent implements OnInit {
  @Input() id: string;

  review: Review;

  editorOptions = {
    theme: "vs-dark",
    language: "javascript",
    fontFamily: "Fira Code",
    fontLigatures: true,
    wordWrap: "on"
  };

  title = {
    "0": "Lisibility",
    "1": "Good pratice",
    "2": "Performance",
    "3": "TBD",
    "4": "TBD"
  };

  constructor(private httpService: HttpService) {
    super();
  }

  ngOnInit() {
    this.httpService
      .getReviewAdmin(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: backendResponse) => {
        this.review = res.data.review;
      });
  }

  getTitle(i: number): string {
    return this.title[`${i}`];
  }
}
