import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KataTrainComponent } from './kata-train.component';

describe('KataTrainComponent', () => {
  let component: KataTrainComponent;
  let fixture: ComponentFixture<KataTrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KataTrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KataTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
