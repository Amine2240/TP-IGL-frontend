import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilansPatientComponent } from './bilans-patient.component';

describe('BilansPatientComponent', () => {
  let component: BilansPatientComponent;
  let fixture: ComponentFixture<BilansPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilansPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BilansPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
