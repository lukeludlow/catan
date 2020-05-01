import { Component, OnInit, Renderer2, ElementRef } from "@angular/core";
import { MapDisplayService } from "../_services/map-display.service";

@Component({
    selector: "app-map-display",
    templateUrl: "./map-display.component.html",
    styleUrls: ["./map-display.component.css"],
})
export class MapDisplayComponent implements OnInit {
    private backgroundWidth: number;
    private backgroundHeight: number;
    private backgroundHeightOffset = 100;

    constructor(
        private mapDisplayService: MapDisplayService,
        private renderer: Renderer2,
        private el: ElementRef
    ) {}

    ngOnInit(): void {
        this.generate();
        this.drawBackground();
        this.drawTiles();
        this.drawPorts();
    }

    drawBackground(): void {
        const backgroundImage = this.renderer.createElement("img");
        this.renderer.setAttribute(backgroundImage, "src", "assets/images/background.png");
        this.renderer.setStyle(backgroundImage, "position", "absolute");
        this.renderer.setStyle(backgroundImage, "top", `${this.backgroundHeightOffset}px`);
        this.renderer.setStyle(backgroundImage, "left", "0px");
        this.renderer.setStyle(backgroundImage, "width", "100%");
        this.renderer.appendChild(this.el.nativeElement, backgroundImage);
        const loadedImage = backgroundImage as HTMLImageElement;
        this.backgroundWidth = loadedImage.width;
        // FIXME idk why height always returns 0
        // this.backgroundHeight = loadedImage.height;
        this.backgroundHeight = (1581 / 1800) * this.backgroundWidth;
        console.log("background width (pixels):" + this.backgroundWidth);
        console.log("background height (pixels):" + this.backgroundHeight);
    }

    drawTiles(): void {
        const row1TopOffset = 0.1;
        const row1LeftOffset = 0.275;
        for (let i = 0; i < 3; i++) {
            const leftOffset = row1LeftOffset + i * 0.15;
            const tile = this.createTile("rock", row1TopOffset, leftOffset);
            this.renderer.appendChild(this.el.nativeElement, tile);
        }
        const row2TopOffset = 0.25;
        const row2LeftOffset = 0.2;
        for (let i = 0; i < 4; i++) {
            const leftOffset = row2LeftOffset + i * 0.15;
            const tile = this.createTile("rock", row2TopOffset, leftOffset);
            this.renderer.appendChild(this.el.nativeElement, tile);
        }
        const row3TopOffset = 0.398;
        const row3LeftOffset = 0.123;
        for (let i = 0; i < 5; i++) {
            const leftOffset = row3LeftOffset + i * 0.15;
            const tile = this.createTile("rock", row3TopOffset, leftOffset);
            this.renderer.appendChild(this.el.nativeElement, tile);
        }
        const row4TopOffset = 0.55;
        const row4LeftOffset = 0.195;
        for (let i = 0; i < 4; i++) {
            const leftOffset = row4LeftOffset + i * 0.15;
            const tile = this.createTile("rock", row4TopOffset, leftOffset);
            this.renderer.appendChild(this.el.nativeElement, tile);
        }
        const row5TopOffset = 0.7;
        const row5LeftOffset = 0.27;
        for (let i = 0; i < 3; i++) {
            const leftOffset = row5LeftOffset + i * 0.15;
            const tile = this.createTile("rock", row5TopOffset, leftOffset);
            this.renderer.appendChild(this.el.nativeElement, tile);
        }
    }

    createTile(resource: string, top: number, left: number): any {
        const tileImage = this.renderer.createElement("img");
        this.renderer.setAttribute(tileImage, "src", `assets/images/${resource}.png`);
        this.renderer.setStyle(tileImage, "position", "absolute");
        const topCoord = this.backgroundHeight * top + this.backgroundHeightOffset;
        const leftCoord = this.backgroundWidth * left;
        this.renderer.setStyle(tileImage, "top", `${topCoord}px`);
        this.renderer.setStyle(tileImage, "left", `${leftCoord}px`);
        this.renderer.setStyle(tileImage, "width", "15.5%");
        return tileImage;
    }

    drawPorts(): void {
        const port1 = this.createPort("rock", 0.03, 0.255, 160);
        this.renderer.appendChild(this.el.nativeElement, port1);
        const port2 = this.createPort("rock", 0.88, 0.246, 45);
        this.renderer.appendChild(this.el.nativeElement, port2);
        const port3 = this.createPort("rock", 0.89, 0.535, -30);
        this.renderer.appendChild(this.el.nativeElement, port3);
        const port4 = this.createPort("rock", 0.465, 0.905, -75);
        this.renderer.appendChild(this.el.nativeElement, port4);
    }

    createPort(resource: string, top: number, left: number, rotation: number): any {
        const portImage = this.renderer.createElement("img");
        this.renderer.setAttribute(portImage, "src", `assets/images/port_${resource}.png`);
        this.renderer.setStyle(portImage, "position", "absolute");
        const topCoord = this.backgroundHeight * top + this.backgroundHeightOffset;
        const leftCoord = this.backgroundWidth * left;
        this.renderer.setStyle(portImage, "top", `${topCoord}px`);
        this.renderer.setStyle(portImage, "left", `${leftCoord}px`);
        this.renderer.setStyle(portImage, "width", "6%");
        this.renderer.setStyle(portImage, "transform", `rotate(${rotation}deg)`);
        return portImage;
    }

    generate(): void {
        console.log("map display component generate");
    }
}