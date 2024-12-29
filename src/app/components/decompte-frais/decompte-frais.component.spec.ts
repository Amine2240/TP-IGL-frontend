import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecompteFraisComponent } from './decompte-frais.component';

describe('DecompteFraisComponent', () => {
  let component: DecompteFraisComponent;
  let fixture: ComponentFixture<DecompteFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecompteFraisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecompteFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
