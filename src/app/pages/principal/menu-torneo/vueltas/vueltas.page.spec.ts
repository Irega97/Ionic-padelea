import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VueltasPage } from './vueltas.page';

describe('VueltasPage', () => {
  let component: VueltasPage;
  let fixture: ComponentFixture<VueltasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueltasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VueltasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
