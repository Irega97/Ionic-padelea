import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmigosPage } from './amigos.page';

describe('AmigosPage', () => {
  let component: AmigosPage;
  let fixture: ComponentFixture<AmigosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmigosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmigosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
