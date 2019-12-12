import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoggedInGuard } from "./guards/logged-in.guard";
import { ProfileStatsComponent } from "./profile/profile-stats/profile-stats.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "profile/stats/:id",
    component: ProfileStatsComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [LoggedInGuard]
  },
  { path: "edit/:id", component: EditComponent, canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
