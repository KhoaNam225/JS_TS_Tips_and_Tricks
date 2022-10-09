import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectMethodsComponent } from './object-methods.component';

describe('ObjectMethodsComponent', () => {
  let component: ObjectMethodsComponent;
  let fixture: ComponentFixture<ObjectMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
