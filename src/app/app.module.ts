import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { BaseGameComponent } from "./base-game/base-game.component";
import { appRoutes } from "./routes";
import { SeafarersComponent } from "./seafarers/seafarers.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { InjectSeafarersSettings } from "./_maps/InjectionTokens";
import { SeafarersSettings } from "./_maps/Seafarers/SeafarersSettings";

@NgModule({
    declarations: [AppComponent, HomeComponent, BaseGameComponent, SeafarersComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ButtonsModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        NgxSliderModule,
        MatProgressSpinnerModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
