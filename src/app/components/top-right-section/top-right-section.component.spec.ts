import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRightSectionComponent } from './top-right-section.component';

describe('TopRightSectionComponent', () => {
  let component: TopRightSectionComponent;
  let fixture: ComponentFixture<TopRightSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRightSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopRightSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
