import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetusernamePage } from './setusername.page';

describe('SetusernamePage', () => {
  let component: SetusernamePage;
  let fixture: ComponentFixture<SetusernamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetusernamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetusernamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
