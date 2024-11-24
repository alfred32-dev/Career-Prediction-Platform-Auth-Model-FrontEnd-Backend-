import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolWorkComponent } from './school-work.component';

describe('SchoolWorkComponent', () => {
  let component: SchoolWorkComponent;
  let fixture: ComponentFixture<SchoolWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
