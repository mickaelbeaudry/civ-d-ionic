import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityDetailsPage } from './priority-details.page';

describe('PriorityDetailsPage', () => {
  let component: PriorityDetailsPage;
  let fixture: ComponentFixture<PriorityDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
