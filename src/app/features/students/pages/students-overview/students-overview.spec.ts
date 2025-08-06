import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsOverview } from './students-overview';

describe('StudentsOverview', () => {
  let component: StudentsOverview;
  let fixture: ComponentFixture<StudentsOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
