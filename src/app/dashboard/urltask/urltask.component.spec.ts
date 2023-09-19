import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrltaskComponent } from './urltask.component';

describe('UrltaskComponent', () => {
  let component: UrltaskComponent;
  let fixture: ComponentFixture<UrltaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrltaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrltaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
