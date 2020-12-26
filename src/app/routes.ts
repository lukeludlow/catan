import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { BaseGameComponent } from "./base-game/base-game.component";
import { SeafarersComponent } from "./seafarers/seafarers.component";

export const appRoutes: Routes = [
    { path: "basegame", component: BaseGameComponent, pathMatch: "full" },
    { path: "seafarers", component: SeafarersComponent, pathMatch: "full" },
    { path: "**", component: HomeComponent, pathMatch: "full" },
];
