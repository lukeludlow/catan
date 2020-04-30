import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CatanService } from "../_services/catan.service";

@Component({
    selector: "app-catan",
    templateUrl: "./catan.component.html",
    styleUrls: ["./catan.component.css"],
})
export class CatanComponent implements OnInit {
    gameOption = "base";

    constructor(private catanService: CatanService) {}

    ngOnInit(): void {}

    generate(): void {
        console.log("generate: " + this.gameOption);
    }
}
