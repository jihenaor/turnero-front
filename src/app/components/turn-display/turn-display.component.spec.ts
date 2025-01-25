import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnDisplayComponent } from './turn-display.component';

describe('TurnDisplayComponent', () => {
  let component: TurnDisplayComponent;
  let fixture: ComponentFixture<TurnDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
