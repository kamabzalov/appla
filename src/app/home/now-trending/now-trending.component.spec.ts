import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowTrendingComponent } from './now-trending.component';

describe('NowTrendingComponent', () => {
  let component: NowTrendingComponent;
  let fixture: ComponentFixture<NowTrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NowTrendingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NowTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
