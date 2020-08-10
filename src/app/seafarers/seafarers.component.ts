import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Renderer2,
    AfterViewInit,
    RendererFactory2,
} from "@angular/core";

@Component({
    selector: "app-seafarers",
    templateUrl: "./seafarers.component.html",
    styleUrls: ["./seafarers.component.css"],
})
export class SeafarersComponent implements OnInit, AfterViewInit {
    private widthHeightRatio = 903 / 1024;
    initialTopOffset = 10;
    @ViewChild("mapDiv") mapDiv: ElementRef;
    @ViewChild("versionInfoDiv") versionInfoDiv: ElementRef;
    // private renderer: Renderer2;

    constructor(private renderer: Renderer2) {}

    ngAfterViewInit() {
        const width = this.mapDiv.nativeElement.clientWidth;
        console.log("mapDiv width: " + width);
        console.log("mapDiv height: " + this.mapDiv.nativeElement.clientHeight);
        this.renderer.setStyle(this.mapDiv.nativeElement, "height", `${width}`);
        const newHeight = width * this.widthHeightRatio;
        this.mapDiv.nativeElement.style.height = `${newHeight}px`;
        console.log("updated mapDiv height: " + this.mapDiv.nativeElement.clientHeight);
        this.mapDiv.nativeElement.style.top = `${this.initialTopOffset}%`;
        this.drawBackground();
        this.drawHexes();
    }

    drawBackground(): void {
        const backgroundImage = this.renderer.createElement("img");
        this.renderer.setAttribute(backgroundImage, "src", "assets/images/seafarers/frame.png");
        this.renderer.setStyle(backgroundImage, "position", "absolute");
        this.renderer.setStyle(backgroundImage, "top", "0%");
        this.renderer.setStyle(backgroundImage, "left", "0%");
        this.renderer.setStyle(backgroundImage, "width", "100%");
        this.renderer.appendChild(this.mapDiv.nativeElement, backgroundImage);
        const loadedImage = backgroundImage as HTMLImageElement;
    }

    drawHexes(): void {
        const topRowOffsetStart = 10;
        const topRowOffsetIncrement = 15;
        const leftRowOffsetStart = 12;
        const leftRowOffsetIncrement = 7.5;
        const leftOffsetIncrement = 15.25;
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                // const hex = hexes[row][col];
                // if (hex.resource !== "") {
                    const topCoord = topRowOffsetStart + topRowOffsetIncrement * row;
                    const leftRowOffset =
                        leftRowOffsetStart + leftRowOffsetIncrement * Math.abs(2 - row);
                    let leftColOffset = leftOffsetIncrement * col;
                    if (row === 0 || row === 4) {
                        leftColOffset = leftOffsetIncrement * (col - 1);
                    }
                    const leftCoord = leftRowOffset + leftColOffset;
                    const image = this.createResourceTileImage("rock", topCoord, leftCoord);
                    this.renderer.appendChild(this.mapDiv.nativeElement, image);
                // }
            }
        }
    }

    createResourceTileImage(resource: string, topCoord: number, leftCoord: number): any {
        const tileImage = this.renderer.createElement("img");
        this.renderer.setAttribute(tileImage, "src", `assets/images/seafarers/${resource}.png`);
        this.renderer.setStyle(tileImage, "position", "absolute");
        this.renderer.setStyle(tileImage, "top", `${topCoord}%`);
        this.renderer.setStyle(tileImage, "left", `${leftCoord}%`);
        this.renderer.setStyle(tileImage, "width", "15.5%");
        return tileImage;
    }

    ngOnInit(): void {}

    reload(): void {
        console.log("map display component reload");
        // reload
        window.location.href = window.location.href;
    }
}
