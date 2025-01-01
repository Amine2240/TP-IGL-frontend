import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueMedicaleComponent } from './historique-medicale.component';

describe('HistoriqueMedicaleComponent', () => {
  let component: HistoriqueMedicaleComponent;
  let fixture: ComponentFixture<HistoriqueMedicaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueMedicaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriqueMedicaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
