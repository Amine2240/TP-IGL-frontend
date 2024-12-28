import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLaboratinComponent } from './page-laboratin.component';

describe('PageLaboratinComponent', () => {
  let component: PageLaboratinComponent;
  let fixture: ComponentFixture<PageLaboratinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLaboratinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageLaboratinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
