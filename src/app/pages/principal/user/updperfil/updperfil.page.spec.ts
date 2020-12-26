import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdperfilPage } from './updperfil.page';

describe('UpdperfilPage', () => {
  let component: UpdperfilPage;
  let fixture: ComponentFixture<UpdperfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdperfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
