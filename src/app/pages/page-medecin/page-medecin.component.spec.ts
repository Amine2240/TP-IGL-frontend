import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMedecinComponent } from './page-medecin.component';

describe('PageMedecinComponent', () => {
  let component: PageMedecinComponent;
  let fixture: ComponentFixture<PageMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
