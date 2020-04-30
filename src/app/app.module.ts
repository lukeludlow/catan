import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { ButtonsModule } from "ngx-bootstrap/buttons";

import { AppComponent } from "./app.component";
import { CatanComponent } from "./catan/catan.component";
import { MapDisplayComponent } from "./map-display/map-display.component";

@NgModule({
    declarations: [AppComponent, CatanComponent, MapDisplayComponent],
    imports: [BrowserModule, FormsModule, ButtonsModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
