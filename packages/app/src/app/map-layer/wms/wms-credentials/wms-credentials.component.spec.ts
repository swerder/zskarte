import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WmsCredentialsComponent } from './wms-credentials.component';

describe('WmsCredentialsComponent', () => {
  let component: WmsCredentialsComponent;
  let fixture: ComponentFixture<WmsCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WmsCredentialsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WmsCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
