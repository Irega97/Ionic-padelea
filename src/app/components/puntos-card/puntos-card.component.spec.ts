import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PuntosCardComponent } from './puntos-card.component';

describe('PuntosCardComponent', () => {
  let component: PuntosCardComponent;
  let fixture: ComponentFixture<PuntosCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntosCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PuntosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
