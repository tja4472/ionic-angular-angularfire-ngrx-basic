import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudFirestorePage } from './cloud-firestore.page';

describe('CloudFirestorePage', () => {
  let component: CloudFirestorePage;
  let fixture: ComponentFixture<CloudFirestorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudFirestorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudFirestorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
