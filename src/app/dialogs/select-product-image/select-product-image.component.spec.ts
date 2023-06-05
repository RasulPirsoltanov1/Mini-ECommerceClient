import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductImageComponent } from './select-product-image.component';

describe('SelectProductImageComponent', () => {
  let component: SelectProductImageComponent;
  let fixture: ComponentFixture<SelectProductImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProductImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProductImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
