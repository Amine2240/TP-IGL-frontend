import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanBiologiquePageVisComponent } from './bilan-biologique-page-vis.component';

describe('BilanBiologiquePageVisComponent', () => {
  let component: BilanBiologiquePageVisComponent;
  let fixture: ComponentFixture<BilanBiologiquePageVisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanBiologiquePageVisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanBiologiquePageVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
