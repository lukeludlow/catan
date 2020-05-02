import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MapDisplayService } from "../_services/map-display.service";

@Component({
    selector: "app-catan",
    templateUrl: "./catan.component.html",
    styleUrls: ["./catan.component.css"],
})
export class CatanComponent implements OnInit {
    gameOption = "base";

    constructor(private mapDisplayService: MapDisplayService, private router: Router) {}

    ngOnInit(): void {}

    generate(): void {
        console.log("generate: " + this.gameOption);
        this.mapDisplayService.setGameOption(this.gameOption);
        this.router.navigate(["/map"]);
    }
}
