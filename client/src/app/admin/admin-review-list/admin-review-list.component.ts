import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/base/base/base.component";
import { HttpService } from "src/app/services/http.service";
import { Review, backendResponse } from "src/app/models/http.models";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-review-list",
  templateUrl: "./admin-review-list.component.html",
  styleUrls: ["./admin-review-list.component.scss"]
})
export class AdminReviewListComponent extends BaseComponent implements OnInit {
  reviews: Review[];
  id: string;

  constructor(private httpService: HttpService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.httpService
      .getReviewsAdmin()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: backendResponse) => {
        this.reviews = res.data.reviews;
      });
  }

  goToReview(id: string): void {
    this.router.navigate([`/admin/review/${id}`]);
  }
}
