import { TestBed } from "@angular/core/testing"

import { SeafarersMap } from "./seafarers-map.service"

describe("SeafarersMap", () => {
    let seafarersMap: SeafarersMap

    beforeEach(() => {
        TestBed.configureTestingModule({})
        seafarersMap = TestBed.inject(SeafarersMap)
    })

    it("should be created", () => {
        expect(seafarersMap).toBeTruthy()
    })

    it("should provide 13 rows", () => {
        expect(seafarersMap.getRows().length).toEqual(13)
    })

    it("first and thirteenth should have two hexes", () => {
        expect(seafarersMap.getRow(0).getLength()).toEqual(2)
        expect(seafarersMap.getRow(12).getLength()).toEqual(2)
    })

    it("second and twelfth should have three hexes", () => {
        expect(seafarersMap.getRow(1).getLength()).toEqual(3)
        expect(seafarersMap.getRow(11).getLength()).toEqual(3)
    })

    it("third and eleventh should have four hexes", () => {
        expect(seafarersMap.getRow(2).getLength()).toEqual(4)
        expect(seafarersMap.getRow(10).getLength()).toEqual(4)
    })

    it("fourth and tenth should have three hexes", () => {
        expect(seafarersMap.getRow(3).getLength()).toEqual(3)
        expect(seafarersMap.getRow(9).getLength()).toEqual(3)
    })

    it("fifth and ninth should have four hexes", () => {
        expect(seafarersMap.getRow(4).getLength()).toEqual(4)
        expect(seafarersMap.getRow(8).getLength()).toEqual(4)
    })

    it("sixth and eighth should have three hexes", () => {
        expect(seafarersMap.getRow(5).getLength()).toEqual(3)
        expect(seafarersMap.getRow(7).getLength()).toEqual(3)
    })

    it("seventh should have four hexes", () => {
        expect(seafarersMap.getRow(6).getLength()).toEqual(4)
    })

    it("test first row coords", () => {
        expect(seafarersMap.getRow(0)[0].getCol()).toEqual(-1)
    })

    it("origin is middle of second row", () => {
        expect(seafarersMap.getRow(1)[1].getCol()).toEqual(0)
        expect(seafarersMap.getRow(1)[1].getRow()).toEqual(0)
    })









})
