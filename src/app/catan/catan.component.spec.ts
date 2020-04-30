import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatanComponent } from './catan.component';

describe('CatanComponent', () => {
  let component: CatanComponent;
  let fixture: ComponentFixture<CatanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
