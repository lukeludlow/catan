import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SeafarersComponent } from "./seafarers.component";

describe("SeafarersComponent", () => {
    let component: SeafarersComponent;
    let fixture: ComponentFixture<SeafarersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SeafarersComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SeafarersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
