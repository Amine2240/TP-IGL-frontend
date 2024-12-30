import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoriqueMedicalePageComponent } from './historique-medicale-page.component';

describe('HistoriqueMedicalePageComponent', () => {
  let component: HistoriqueMedicalePageComponent;
  let fixture: ComponentFixture<HistoriqueMedicalePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueMedicalePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriqueMedicalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
