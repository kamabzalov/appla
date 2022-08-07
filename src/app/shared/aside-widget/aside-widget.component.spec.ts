import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideWidgetComponent } from './aside-widget.component';

describe('AsideWidgetComponent', () => {
  let component: AsideWidgetComponent;
  let fixture: ComponentFixture<AsideWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsideWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsideWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
