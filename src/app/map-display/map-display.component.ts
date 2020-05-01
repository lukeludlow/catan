import { Component, OnInit, Input } from "@angular/core";
import { MapDisplayService } from "../_services/map-display.service";

@Component({
    selector: "app-map-display",
    templateUrl: "./map-display.component.html",
    styleUrls: ["./map-display.component.css"],
})
export class MapDisplayComponent implements OnInit {
    constructor(private mapDisplayService: MapDisplayService) {}

    ngOnInit(): void {
        this.generate();
    }

    generate(): void {
        console.log("map display component generate");
        this.mapDisplayService.generate();
    }
}
