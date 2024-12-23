import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpiTableauComponent } from './dpi-tableau.component';

describe('DpiTableauComponent', () => {
  let component: DpiTableauComponent;
  let fixture: ComponentFixture<DpiTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpiTableauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DpiTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
