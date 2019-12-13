import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MonacoEditorModule } from "@materia-ui/ngx-monaco-editor";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SidebarModule } from "ng-sidebar";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BaseComponent } from "./base/base/base.component";
import { SidebarComponent } from "./base/sidebar/sidebar.component";
import { HomeComponent } from "./home/home.component";
import { ProfileStatsComponent } from "./profile/profile-stats/profile-stats.component";
import { ProfileComponent } from "./profile/profile.component";
import { EditComponent } from './edit/edit.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { KataComponent } from './kata/kata.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    SidebarComponent,
    HomeComponent,
    ProfileComponent,
    ProfileStatsComponent,
    EditComponent,
    LeaderboardComponent,
    KataComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
