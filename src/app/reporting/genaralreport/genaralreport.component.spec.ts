import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenaralreportComponent } from './genaralreport.component';

describe('GenaralreportComponent', () => {
  let component: GenaralreportComponent;
  let fixture: ComponentFixture<GenaralreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenaralreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenaralreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
