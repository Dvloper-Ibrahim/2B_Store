import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaroseleShow1Component } from './carosele-show1.component';

describe('CaroseleShow1Component', () => {
  let component: CaroseleShow1Component;
  let fixture: ComponentFixture<CaroseleShow1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaroseleShow1Component]
    });
    fixture = TestBed.createComponent(CaroseleShow1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
