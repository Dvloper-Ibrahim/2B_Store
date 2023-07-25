import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInDetailsPageComponent } from './card-in-details-page.component';

describe('CardInDetailsPageComponent', () => {
  let component: CardInDetailsPageComponent;
  let fixture: ComponentFixture<CardInDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardInDetailsPageComponent]
    });
    fixture = TestBed.createComponent(CardInDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
