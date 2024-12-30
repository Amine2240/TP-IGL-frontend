import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanBiologiquePageComponent } from './bilan-biologique-page.component';

describe('BilanBiologiquePageComponent', () => {
  let component: BilanBiologiquePageComponent;
  let fixture: ComponentFixture<BilanBiologiquePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanBiologiquePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BilanBiologiquePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
