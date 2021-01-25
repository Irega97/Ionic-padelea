import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublicacionComponent } from './publicacion.component';

describe('PublicacionComponent', () => {
  let component: PublicacionComponent;
  let fixture: ComponentFixture<PublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
