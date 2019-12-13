import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoggedInGuard } from "./guards/logged-in.guard";
import { ProfileStatsComponent } from "./profile/profile-stats/profile-stats.component";
import { EditComponent } from "./edit/edit.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { KataComponent } from "./kata/kata.component";
import { AdminGuard } from "./guards/admin.guard";
import { AdminComponent } from "./admin/admin.component";

const routes: Routes = [
  {
    path: "profile/stats/:id",
    component: ProfileStatsComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "profile/:username",
    component: ProfileComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [LoggedInGuard]
  },
  { path: "edit/:id", component: EditComponent, canActivate: [LoggedInGuard] },
  { path: "kata/:level", component: KataComponent },
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
