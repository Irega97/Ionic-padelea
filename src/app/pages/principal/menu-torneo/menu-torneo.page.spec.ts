import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuTorneoPage } from './menu-torneo.page';

describe('MenuTorneoPage', () => {
  let component: MenuTorneoPage;
  let fixture: ComponentFixture<MenuTorneoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTorneoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuTorneoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
