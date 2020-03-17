import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDirComponent } from './test-dir.component';

describe('TestDirComponent', () => {
  let component: TestDirComponent;
  let fixture: ComponentFixture<TestDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
