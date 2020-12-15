import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminTorneoPage } from './admin-torneo.page';

describe('AdminTorneoPage', () => {
  let component: AdminTorneoPage;
  let fixture: ComponentFixture<AdminTorneoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTorneoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTorneoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
