import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProvComponent } from './test-prov.component';

describe('TestProvComponent', () => {
  let component: TestProvComponent;
  let fixture: ComponentFixture<TestProvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestProvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
