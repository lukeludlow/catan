import { TestBed } from "@angular/core/testing";

import { BoardGeneratorService } from "./board-generator.service";

describe("BoardGeneratorService", () => {
    let service: BoardGeneratorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BoardGeneratorService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("generate should return five by five array of hexes", () => {
        const hexes = service.generate();
        expect(hexes.length).toEqual(5);
        expect(hexes[0].length).toEqual(5);
        expect(hexes[1].length).toEqual(5);
        expect(hexes[2].length).toEqual(5);
        expect(hexes[3].length).toEqual(5);
        expect(hexes[4].length).toEqual(5);
    });

    it("generate should return 6 null hexes", () => {
        const hexes = service.generate();
        let count = 0;
        hexes.forEach((row) =>
            row.forEach((hex) => {
                if (hex.resource === "") {
                    count++;
                }
            })
        );
        expect(count).toEqual(6);
    });

    it("generate should return 18 resource hexes", () => {
        const hexes = service.generate();
        const resourceNames = ["rock", "wheat", "brick", "tree", "sheep"];
        let numResourceHexes = 0;
        console.log(hexes);
        hexes.forEach((row) =>
            row.forEach((hex) => {
                if (hex.resource && hex.resource !== "" && resourceNames.includes(hex.resource)) {
                    numResourceHexes = numResourceHexes + 1;
                }
            })
        );
        expect(numResourceHexes).toEqual(18);
    });

    it("generate should return one desert hex", () => {
        const hexes = service.generate();
        let numDesertTilesFound = 0;
        hexes.forEach((row) =>
            row.forEach((hex) => {
                if (hex.resource === "desert") {
                    numDesertTilesFound++;
                }
            })
        );
        expect(numDesertTilesFound).toEqual(1);
    });
});
