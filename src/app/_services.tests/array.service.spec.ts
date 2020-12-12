import { TestBed } from "@angular/core/testing";

import { ArrayService } from "../_services/array.service";

describe("ArrayService", () => {
    let service: ArrayService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ArrayService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
