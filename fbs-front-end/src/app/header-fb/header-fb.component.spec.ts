import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFbComponent } from './header-fb.component';

describe('HeaderFbComponent', () => {
  let component: HeaderFbComponent;
  let fixture: ComponentFixture<HeaderFbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderFbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
