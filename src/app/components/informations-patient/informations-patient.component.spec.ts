import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsPatientComponent } from './informations-patient.component';

describe('InformationsPatientComponent', () => {
  let component: InformationsPatientComponent;
  let fixture: ComponentFixture<InformationsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationsPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
