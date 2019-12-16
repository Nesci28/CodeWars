import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KataSummaryComponent } from './kata-summary.component';

describe('KataSummaryComponent', () => {
  let component: KataSummaryComponent;
  let fixture: ComponentFixture<KataSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KataSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KataSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
