import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-catan",
    templateUrl: "./catan.component.html",
    styleUrls: ["./catan.component.css"],
})
export class CatanComponent implements OnInit {
    gameOption = "base";

    constructor(private router: Router) {}

    ngOnInit(): void {}

    generate(): void {
        console.log("generate: " + this.gameOption);
        this.router.navigate(["/map"]);
    }
}
