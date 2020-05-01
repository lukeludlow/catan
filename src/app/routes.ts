import { Routes } from "@angular/router";
import { CatanComponent } from "./catan/catan.component";
import { MapDisplayComponent } from "./map-display/map-display.component";

export const appRoutes: Routes = [
    { path: "", component: CatanComponent },
    { path: "map", component: MapDisplayComponent },
    { path: "**", redirectTo: "", pathMatch: "full" },
];
