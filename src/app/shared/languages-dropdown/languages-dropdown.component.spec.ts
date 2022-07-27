import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesDropdownComponent } from './languages-dropdown.component';

describe('LanguagesDropdownComponent', () => {
  let component: LanguagesDropdownComponent;
  let fixture: ComponentFixture<LanguagesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagesDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
