import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformacionPage } from './informacion.page';

describe('InformacionPage', () => {
  let component: InformacionPage;
  let fixture: ComponentFixture<InformacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
