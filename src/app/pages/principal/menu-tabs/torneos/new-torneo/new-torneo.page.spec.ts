import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewTorneoPage } from './new-torneo.page';

describe('NewTorneoPage', () => {
  let component: NewTorneoPage;
  let fixture: ComponentFixture<NewTorneoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTorneoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTorneoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
