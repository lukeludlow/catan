import { TestBed } from "@angular/core/testing";

import { CatanService } from "./catan.service";

describe("CatanService", () => {
    let service: CatanService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CatanService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
