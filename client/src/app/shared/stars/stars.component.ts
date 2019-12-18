import { Component, OnInit, Input } from "@angular/core";
import { Star } from "src/app/models/http.models";

@Component({
  selector: "app-stars",
  templateUrl: "./stars.component.html",
  styleUrls: ["./stars.component.scss"]
})
export class StarsComponent implements OnInit {
  @Input() num: number;
  @Input() title: string;

  stars: Star[] = [];

  constructor() {}

  ngOnInit() {
    this.convertNumToObj();
  }

  convertNumToObj(): void {
    for (let i = 0; i < this.num; i++) {
      this.stars.push({
        index: i,
        selected: false
      });
    }
  }

  select(index: number): void {
    this.stars.forEach(star => (star.selected = false));
    for (let i = 0; i <= index; i++) {
      this.stars[i].selected = true;
    }
  }
}
