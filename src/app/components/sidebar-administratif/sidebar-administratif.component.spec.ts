import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAdministratifComponent } from './sidebar-administratif.component';

describe('SidebarAdministratifComponent', () => {
  let component: SidebarAdministratifComponent;
  let fixture: ComponentFixture<SidebarAdministratifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarAdministratifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAdministratifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
