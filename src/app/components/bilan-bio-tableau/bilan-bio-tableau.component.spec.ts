import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanBioTableauComponent } from './bilan-bio-tableau.component';

describe('BilanBioTableauComponent', () => {
  let component: BilanBioTableauComponent;
  let fixture: ComponentFixture<BilanBioTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanBioTableauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BilanBioTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
