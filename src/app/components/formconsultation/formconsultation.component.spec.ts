import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormconsultationComponent } from './formconsultation.component';

describe('FormconsultationComponent', () => {
  let component: FormconsultationComponent;
  let fixture: ComponentFixture<FormconsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormconsultationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormconsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
