import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormChatPage } from './form-chat.page';

describe('FormChatPage', () => {
  let component: FormChatPage;
  let fixture: ComponentFixture<FormChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
