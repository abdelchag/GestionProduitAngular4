import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChercherComponent } from './chercher.component';

describe('ChercherComponent', () => {
  let component: ChercherComponent;
  let fixture: ComponentFixture<ChercherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChercherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChercherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
