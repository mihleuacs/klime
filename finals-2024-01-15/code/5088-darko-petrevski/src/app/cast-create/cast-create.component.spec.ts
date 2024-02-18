import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastCreateComponent } from './cast-create.component';

describe('CastCreateComponent', () => {
  let component: CastCreateComponent;
  let fixture: ComponentFixture<CastCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CastCreateComponent]
    });
    fixture = TestBed.createComponent(CastCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
