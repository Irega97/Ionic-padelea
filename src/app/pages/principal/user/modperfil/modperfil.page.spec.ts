import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModperfilPage } from './modperfil.page';

describe('ModperfilPage', () => {
  let component: ModperfilPage;
  let fixture: ComponentFixture<ModperfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModperfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
