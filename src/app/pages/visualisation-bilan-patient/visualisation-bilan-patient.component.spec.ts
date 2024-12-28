import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationBilanPatientComponent } from './visualisation-bilan-patient.component';

describe('VisualisationBilanPatientComponent', () => {
  let component: VisualisationBilanPatientComponent;
  let fixture: ComponentFixture<VisualisationBilanPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualisationBilanPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualisationBilanPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
