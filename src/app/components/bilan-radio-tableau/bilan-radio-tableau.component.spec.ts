import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanRadioTableauComponent } from './bilan-radio-tableau.component';

describe('BilanRadioTableauComponent', () => {
  let component: BilanRadioTableauComponent;
  let fixture: ComponentFixture<BilanRadioTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanRadioTableauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BilanRadioTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
