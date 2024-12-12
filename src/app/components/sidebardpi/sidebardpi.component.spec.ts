import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebardpiComponent } from './sidebardpi.component';

describe('SidebardpiComponent', () => {
  let component: SidebardpiComponent;
  let fixture: ComponentFixture<SidebardpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebardpiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebardpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
