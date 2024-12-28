import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdministratiffComponent } from './page-administratiff.component';

describe('PageAdministratiffComponent', () => {
  let component: PageAdministratiffComponent;
  let fixture: ComponentFixture<PageAdministratiffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAdministratiffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageAdministratiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
