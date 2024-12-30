import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanRadiologiqueVisPageComponent } from './bilan-radiologique-vis-page.component';

describe('BilanRadiologiqueVisPageComponent', () => {
  let component: BilanRadiologiqueVisPageComponent;
  let fixture: ComponentFixture<BilanRadiologiqueVisPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanRadiologiqueVisPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanRadiologiqueVisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
