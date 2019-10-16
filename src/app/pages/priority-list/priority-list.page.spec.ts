import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityListPage } from './priority-list.page';

describe('PriorityListPage', () => {
  let component: PriorityListPage;
  let fixture: ComponentFixture<PriorityListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
