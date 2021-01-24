import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MiespacioPage } from './miespacio.page';

describe('MiespacioPage', () => {
  let component: MiespacioPage;
  let fixture: ComponentFixture<MiespacioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiespacioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MiespacioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
