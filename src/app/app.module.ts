import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SidebarModule } from "ng-sidebar";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BaseComponent } from "./base/base/base.component";
import { SidebarComponent } from "./base/sidebar/sidebar.component";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [AppComponent, BaseComponent, SidebarComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
