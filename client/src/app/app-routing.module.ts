import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoggedInGuard } from "./shared/guards/logged-in.guard";
import { ProfileStatsComponent } from "./profile/profile-stats/profile-stats.component";
import { EditComponent } from "./edit/edit.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { KataListComponent } from "./kata-list/kata-list.component";
import { AdminGuard } from "./shared/guards/admin.guard";
import { AdminComponent } from "./admin/admin.component";
import { KataComponent } from "./kata/kata.component";

const routes: Routes = [
  {
    path: "profile/stats/:id",
    component: ProfileStatsComponent
  },
  {
    path: "profile/:username",
    component: ProfileComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [LoggedInGuard]
  },
  { path: "edit/:id", component: EditComponent, canActivate: [LoggedInGuard] },
  { path: "kata/:id", component: KataComponent, canActivate: [LoggedInGuard] },
  {
    path: "kata/cat/:level/:username",
    component: KataListComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "leaderboard",
    component: LeaderboardComponent
  },
  {
    path: "admin/create",
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  { path: "", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
