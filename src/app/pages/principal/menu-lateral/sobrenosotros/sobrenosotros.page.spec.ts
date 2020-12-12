import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SobrenosotrosPage } from './sobrenosotros.page';

describe('SobrenosotrosPage', () => {
  let component: SobrenosotrosPage;
  let fixture: ComponentFixture<SobrenosotrosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobrenosotrosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SobrenosotrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
