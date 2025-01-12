import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskFromComponent } from './new-task-from.component';

describe('NewTaskFromComponent', () => {
  let component: NewTaskFromComponent;
  let fixture: ComponentFixture<NewTaskFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTaskFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTaskFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
