import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetHandlerComponent } from './asset-handler.component';

describe('AssetHandlerComponent', () => {
  let component: AssetHandlerComponent;
  let fixture: ComponentFixture<AssetHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
