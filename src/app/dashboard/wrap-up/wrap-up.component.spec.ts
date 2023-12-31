import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapUpComponent } from './wrap-up.component';

describe('WrapUpComponent', () => {
  let component: WrapUpComponent;
  let fixture: ComponentFixture<WrapUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
