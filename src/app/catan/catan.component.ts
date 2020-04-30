import { Component, OnInit } from "@angular/core";
import { CatanService } from "../_services/catan.service";

@Component({
    selector: "app-catan",
    templateUrl: "./catan.component.html",
    styleUrls: ["./catan.component.css"],
})
export class CatanComponent implements OnInit {
    gameOption = "base";
    uncheckableRadioModel = "Middle";


    constructor(private catanService: CatanService) {}

    ngOnInit(): void {}

    generate(): void {
        console.log("generate: " + this.gameOption);
    }
}
