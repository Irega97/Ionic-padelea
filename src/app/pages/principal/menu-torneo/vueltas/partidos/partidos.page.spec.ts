import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartidosPage } from './partidos.page';

describe('PartidosPage', () => {
  let component: PartidosPage;
  let fixture: ComponentFixture<PartidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
