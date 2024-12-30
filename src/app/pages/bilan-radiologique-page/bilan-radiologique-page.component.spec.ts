import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanRadiologiquePageComponent } from './bilan-radiologique-page.component';

describe('BilanRadiologiquePageComponent', () => {
  let component: BilanRadiologiquePageComponent;
  let fixture: ComponentFixture<BilanRadiologiquePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanRadiologiquePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BilanRadiologiquePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
